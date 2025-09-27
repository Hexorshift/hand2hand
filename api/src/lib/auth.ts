import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { db, client } from './db';
import { UserModel } from '../models/User';

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          const dbUser = await UserModel.findById(user.id);

          if (!dbUser) {
            await UserModel.create({
              _id: user.id,
              name: user.name,
              email: user.email,
              image: user.image ?? null
            });
          }
        }
      }
    }
  },
  advanced: {
    crossSubDomainCookies: {
      enabled: process.env.NODE_ENV === 'production',
      domain: '*'
    }
  },
  trustedOrigins: ['http://localhost:5173', 'https://hand2hand.pages.dev'],
  account: {
    modelName: 'accounts',
    accountLinking: {
      enabled: true,
      trustedProviders: ['google', 'discord']
    }
  },
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
