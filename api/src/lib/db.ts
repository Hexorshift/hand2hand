import { MongoClient } from 'mongodb';

export const client = new MongoClient(process.env.MONGODB_URL!);
await client.connect();
export const db = client.db(process.env.NODE_ENV!);
