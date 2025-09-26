import { Types, Schema, model } from 'mongoose';

export interface User {
  _id: Types.ObjectId;
  name: string;
  email: string;
  requests: Types.ObjectId[];
  acceptedRequests: Types.ObjectId[];
  strikes: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    requests: { type: [Types.ObjectId], default: [] },
    acceptedRequests: { type: [Types.ObjectId], default: [] },
    strikes: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const UserModel = model<User>('User', UserSchema);
