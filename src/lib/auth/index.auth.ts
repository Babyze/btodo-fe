/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  InvalidParameterSigninErrorr,
  InvalidSigninError,
} from "@/errors/authentication.error";
import { ResponseError } from "@/errors/response.error";
import { ROUTES } from "@/routes";
import { AuthAPIService, ISigninRequest } from "@/services/apis/auth.api";
import { DateUtils } from "@/utils/date/date.util";
import * as Joi from "joi";
import NextAuth, { NextAuthConfig, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const SigninSchema = Joi.object<ISigninRequest>({
  email: Joi.string().required(),
  password: Joi.string().required(),
}).required();

const authConfig: NextAuthConfig = {
  pages: {
    signIn: ROUTES.SIGN_IN,
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials, _req): Promise<User | null> {
        try {
          const { email, password } =
            await SigninSchema.unknown(true).validateAsync(credentials);
          const res = await AuthAPIService.signIn({
            email,
            password,
          });

          return res.message;
        } catch (err) {
          if (err instanceof Joi.ValidationError) {
            throw new InvalidParameterSigninErrorr();
          }

          if (err instanceof ResponseError) {
            throw new InvalidSigninError(err.statusCode, err.message);
          }

          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    signIn({ _user }) {
      return true;
    },
    async jwt({ token, user }) {
      const now = DateUtils.now();
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.expireDate = now + user.expireDate;
      }

      if (now > token.expireDate) {
        const response = await AuthAPIService.refreshToken({
          refreshToken: token.refreshToken,
        });
        if (response?.message) {
          token.accessToken = response.message.accessToken;
          token.refreshToken = response.message.refreshToken;
          token.expireDate = now + response.message.expireDate;
        }
      }
      return token;
    },
    session({ session, token }) {
      return {
        ...session,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        expireDate: token.expireDate,
      };
    },
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
};

export const { auth, signIn, signOut, handlers } = NextAuth(authConfig);
