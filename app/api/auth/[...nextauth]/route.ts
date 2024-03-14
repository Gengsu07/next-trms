import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import { prisma } from "@/prisma/client";
import * as bcrypt from "bcryptjs";
import NextAuth from "next-auth/next";
import { User } from "@prisma/client";

const authOption: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET as string,
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: {
          label: "NIP Pendek",
          type: "text",
          placeholder: "NIP Pendek",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            username: credentials?.username,
          },
        });
        if (!user) throw new Error("User tidak ditemukan");

        if (!credentials?.password) throw new Error("informasi tidak lengkap");

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isPasswordCorrect)
          throw new Error("User dan/atau Password tidak sesuai");

        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user as User;
      return token;
    },
    async session({ token, session }) {
      session.user = token.user;
      return session;
    },
  },
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
