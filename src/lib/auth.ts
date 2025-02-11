import { NextAuthOptions } from "next-auth";
import { APP_ROUTES } from "@/routes/paths";
import Credentials from "next-auth/providers/credentials";
import { api } from "./api";
import { AuthResponse } from "@/shared/types";

export const authConfigs: NextAuthOptions = {
  providers: [
    Credentials({
      type: 'credentials',
      credentials: {
        phone: { label: 'Telefone', type: 'text' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials) {
        const res = await api.post<AuthResponse>('/auth/sign-in', credentials)

        if (!res || !res.data || !res.data.user) {
          return null;
        }

        return { ...res.data, id: res.data.user.id }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user: authResponse }) => {
      return {
        ...token,
        ...authResponse,
      };
    },

    session: async ({ session, token }) => ({
      ...session,
      ...token,
    }),
  },
  pages: {
    signIn: APP_ROUTES.public.signIn,
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
}