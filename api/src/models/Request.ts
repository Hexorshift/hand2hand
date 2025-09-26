import { Types, Schema, model } from 'mongoose';

export interface Request {
  _id: Types.ObjectId;
  flagged: Boolean;
  requesterId: Types.ObjectId;
  accepterId: Types.ObjectId;
  content: string;
  requesterCompleted: boolean;
  accepterCompleted: boolean;
  tags: [Types.ObjectId];
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const RequestSchema = new Schema<Request>(
  {
    requesterId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    accepterId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    requesterCompleted: { type: Boolean, default: false },
    accepterCompleted: { type: Boolean, default: false },
    content: { type: String, required: true },
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
