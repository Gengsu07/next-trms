import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import { prisma } from "@/prisma/client";
import * as bcrypt from "bcrypt";
import NextAuth from "next-auth/next";

export const authOption: AuthOptions = {
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
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
