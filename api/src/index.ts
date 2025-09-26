import { Elysia } from 'elysia';
import { connect } from 'mongoose';
import { cors } from '@elysiajs/cors';

await connect(process.env.MONGODB_URL!);
console.log(`Connected to database: ${process.env.NODE_ENV!}`);

const app = new Elysia()
  .use(
    cors({
      origin: ['http://localhost:5173'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization']
    })
  )
  .get('/', () => 'Hello Elysia')
  .listen(process.env.PORT!);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
