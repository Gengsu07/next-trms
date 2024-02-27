"use client";

import { loginForm } from "@/app/validation/validation";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Suspense, useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const form = useForm<z.infer<typeof loginForm>>({
    resolver: zodResolver(loginForm),
    defaultValues: {
      nip: "",
      password: "",
    },
  });
  const { errors } = form.formState;
  const OnSubmitHandler: SubmitHandler<z.infer<typeof loginForm>> = async (
    values
  ) => {
    console.log(values);
    try {
      setSubmitting(true);

      const res = await signIn("credentials", {
        redirect: false,
        nip: values.nip,
        password: values.password,
        redirectTo: callbackUrl,
      });
      console.log(res);

      setSubmitting(false);

      if (!res?.error) {
        toast({ description: "login berhasil" });
        router.push(callbackUrl);
        console.log(callbackUrl);
      } else {
        form.reset({ password: "" });
        const message = `${errors}`;
        toast({ variant: "destructive", description: message });
        setError(message);
      }
    } catch (error: any) {
      toast({ description: error.message });
      setError(error.message);
      console.log(error.message);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center bg-accent-foreground">
      <div className="w-full max-w-md h-fit py-7 flex flex-col justify-start items-center bg-background rounded-md">
        <Suspense fallback={<>Loading...</>}>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(OnSubmitHandler)}
              className="flex flex-col justify-center items-center w-4/5 h-full"
            >
              <div className="flex justify-center items-center w-full gap-2">
                <Link href="/">
                  <Image
                    src="/logo_djp.png"
                    alt="logo"
                    width="40"
                    height="40"
                  />
                </Link>
                <p className="text-sm">
                  Tax Revenue
                  <br />
                  Monitoring System
                </p>
              </div>

              <div className="flex flex-col justify-center items-center gap-5 mt-12 w-full h-full">
                <FormField
                  control={form.control}
                  name="nip"
                  render={({ field }) => (
                    <FormItem className="w-full ">
                      <FormLabel className="text-slate-800">Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="NIP Pendek"
                          {...field}
                          className="outline-none"
                        />
                      </FormControl>
                      <FormMessage className="font-mono rounded-md bg-destructive/15 text-sm text-destructive py-1 px-1" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-slate-800">password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="******"
                          type="password"
                          className="outline-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="font-mono rounded-md bg-destructive/15 text-sm text-destructive py-1 px-1" />
                    </FormItem>
                  )}
                />
                <Button
                  variant="default"
                  type="submit"
                  disabled={submitting}
                  className="cursor-pointer w-full"
                >
                  Login
                </Button>

                <Button
                  variant="link"
                  className="text-sm font-mono text-foreground"
                >
                  Belum punya akun? kontak admin 😉
                </Button>
              </div>
            </form>
          </Form>
        </Suspense>
      </div>
    </div>
  );
};
export default LoginPage;
