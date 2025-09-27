import { Elysia, status, t } from 'elysia';
import { authenticate } from '../macro/authenticate';
import { RequestModel } from '../models/Request';
import { Types } from 'mongoose';
import { UserModel } from '../models/User';

export const RequestsController = new Elysia({ prefix: 'requests' })
  .use(authenticate)
  .get(
    '/',
    async ({ query: { hours } }) => {
      let filter: any = { accepter: null };

      if (hours !== undefined) {
        filter.duration = { $lte: hours };
      }

      const requests = await RequestModel.find(filter)
        .populate('requester', '_id name image')
        .lean();

      return requests;
    },
    { query: t.Object({ hours: t.Optional(t.Number()) }) }
  )
  .get(
    '/user/pending',
    async ({ user }) => {
      const pending = await RequestModel.find({
        requester: user.id,
        $or: [{ requesterCompleted: false }, { accepterCompleted: false }]
      })
        .populate('accepter', '_id name image')
        .populate('requester', '_id name image')
        .lean();

      return pending;
    },
    { auth: true }
  )
  .get(
    '/user/accepted/requests',
    async ({ user }) => {
      const requests = await RequestModel.find({
        requester: user.id,
        accepter: { $ne: null },
        requesterCompleted: false
      })
        .populate('accepter', '_id name image')
        .populate('requester', '_id name image')
        .lean();

      return requests;
    },
    { auth: true }
  )
  .get(
    '/user/accepted/offers',
    async ({ user }) => {
      const offers = await RequestModel.find({
        accepter: user.id,
        accepterCompleted: false
      })
        .populate('accepter', '_id name image')
        .populate('requester', '_id name image')
        .lean();

      return offers;
    },
    { auth: true }
  )
  .get(
    '/user/created',
    async ({ user }) => {
      const userRequests = await RequestModel.find({
        requester: user.id
      })
        .populate('requester', '_id name image')
        .lean();

      return userRequests;
    },
    { auth: true }
  )
  .get(
    '/user/completed',
    async ({ user }) => {
      const userRequests = await RequestModel.find({
        $or: [{ requester: user.id }, { accepter: user.id }],
        requesterCompleted: true,
        accepterCompleted: true
      })
        .populate('requester', '_id name image')
        .lean();

      return userRequests;
    },
    { auth: true }
  )
  .post(
    '/:id/accept',
    async ({ user, params: { id } }) => {
      const acceptingRequest = await RequestModel.findById(id)
        .populate('requester')
        .lean();

      if (!acceptingRequest) return status(404);

      await RequestModel.findByIdAndUpdate(acceptingRequest._id, {
        accepter: new Types.ObjectId(user.id)
      });
      await UserModel.updateOne(
        { _id: new Types.ObjectId(user.id) },
        { $addToSet: { accepted: acceptingRequest._id } }
      );

      return { success: true };
    },
    {
      auth: true,
      params: t.Object({ id: t.String() })
    }
  )
  .post(
    '/:id/complete',
    async ({ user, params: { id } }) => {
      const request = await RequestModel.findById(id);

      if (!request) return status(404);

      if (request.requester.equals(new Types.ObjectId(user.id))) {
        await RequestModel.findByIdAndUpdate(request._id, {
          requesterCompleted: true
        });
      } else if (request.accepter.equals(new Types.ObjectId(user.id))) {
        await RequestModel.findByIdAndUpdate(request._id, {
          accepterCompleted: true
        });
      }

      return { success: true };
    },
    { auth: true, params: t.Object({ id: t.String() }) }
  )
  .post(
    '/',
    async ({
      user,
      body: { request, offer, duration, dueDate, location, visiblity }
    }) => {
      const dbRequest = await RequestModel.create({
        requester: new Types.ObjectId(user.id),
        accepter: null,
        request,
        offer,
        duration,
        dueDate,
        location,
        visiblity
      });

      return {
        success: true,
        request: dbRequest.toJSON()
      };
    },
    {
      auth: true,
      body: t.Object({
        request: t.String(),
        offer: t.String(),
        duration: t.Number(),
        dueDate: t.Date(),
        location: t.String(),
        visiblity: t.String()
      })
    }
  );
