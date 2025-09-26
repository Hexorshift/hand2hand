import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URL!);

export const db = client.db(process.env.NODE_ENV!);
