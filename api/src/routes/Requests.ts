import Elysia from 'elysia';
import { authenticate } from '../macro/authenticate';

export const RequestsController = new Elysia({ prefix: 'requests' })
  .use(authenticate)
  .post('/', async ({ user }) => {}, { auth: true });
