"use server";

import * as z from "zod";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { loginForm } from "@/app/validation/validation";

export const login = async (
  values: z.infer<typeof loginForm>,
  callbakUrl?: string | null
) => {
  const validatedFields = loginForm.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { nip, password } = validatedFields.data;
};
