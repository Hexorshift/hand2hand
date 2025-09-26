import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { db } from './db';

export const auth = betterAuth({
  database: mongodbAdapter(db),
  trustedOrigins: ['http://localhost:5173'],
  session: {
    modelName: 'sessions',
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60
    }
  },
  user: { modelName: 'better_auth_users' },
  verification: { modelName: 'verifications' },
  emailAndPassword: { enabled: true },
  socialProviders: {
    google: {
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!
    }
  }
});
