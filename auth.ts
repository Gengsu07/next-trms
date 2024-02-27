import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma/client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    CredentialProvider({
      name: "Login TRMS",
      id: "credentials",
      credentials: {
        nip: {
          label: "NIP Pendek",
          type: "text",
          placeholder: "81020XXXX",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.nip || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            nip: String(credentials.nip),
          },
        });

        if (
          !user ||
          !(await bcrypt.compare(String(credentials.password), user.password!))
        ) {
          return null;
        }
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          randomKey: "gengsudev",
        };
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          randomKey: token.email,
        },
      };
    },
    jwt: async ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }
      return token;
    },
  },
});
