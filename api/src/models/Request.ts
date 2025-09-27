import { Types, Schema, model } from 'mongoose';

export interface Request {
  _id: Types.ObjectId;
  flagged: Boolean;
  requester: Types.ObjectId;
  accepter: Types.ObjectId;
  request: string;
  offer: string;
  visiblity: string;
  duration: number;
  location: string;
  requesterCompleted: boolean;
  accepterCompleted: boolean;
  tags: [Types.ObjectId];
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const RequestSchema = new Schema<Request>(
  {
    flagged: { type: Boolean, default: false },
    requester: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    accepter: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
    requesterCompleted: { type: Boolean, default: false },
    accepterCompleted: { type: Boolean, default: false },
    request: { type: String, required: true },
    offer: { type: String, required: true },
    visiblity: { type: String, required: true },
    location: { type: String, required: true },
    duration: { type: Number, required: true },
    tags: {
      type: [Schema.Types.ObjectId],
      ref: 'Tag',
      default: []
    },
    dueDate: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

export const RequestModel = model<Request>('Request', RequestSchema);
