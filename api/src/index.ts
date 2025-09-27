import { Elysia } from 'elysia';
import { connect } from 'mongoose';
import { cors } from '@elysiajs/cors';
import { auth } from './lib/auth';
import { RequestsController } from './routes/Requests';

await connect(process.env.MONGODB_URL!, { dbName: process.env.NODE_ENV! });
console.log(`Connected to database: ${process.env.NODE_ENV!}`);

const app = new Elysia()
  .use(
    cors({
      origin: ['http://localhost:5173', 'https://hand2hand.pages.dev'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization']
    })
  )
  .mount(auth.handler)
  .get('/', () => 'Hello Elysia')
  .use(RequestsController)
  .listen(process.env.PORT!);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
