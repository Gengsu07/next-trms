"use client";

import { loginForm } from "@/app/validation/validation";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ModeToggle } from "@/components/theme-switcher";
import TsParticles from "@/components/animatedBackground";

const LoginPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof loginForm>>({
    resolver: zodResolver(loginForm),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { errors } = form.formState;

  const OnSubmit: SubmitHandler<z.infer<typeof loginForm>> = async (values) => {
    const result = await signIn("credentials", {
      redirect: false,
      username: values.username,
      password: values.password,
    });
    if (!result?.ok) {
      toast({ variant: "destructive", description: result?.error });
    }
    if (result?.ok) {
      startTransition(async () => {
        router.push("/dashboard");
        toast({ description: "login berhasil" });
      });
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center bg-border">
      <TsParticles />
      <div className="w-full max-w-md h-fit py-10 flex flex-col justify-start items-center bg-card rounded-lg shadow-lg shadow-white/10  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(OnSubmit)}
            className="flex flex-col justify-center items-center w-full px-5 h-full"
          >
            <div className="flex justify-center items-center w-full gap-2">
              <Link href="/">
                <Image src="/logo_djp.png" alt="logo" width="40" height="40" />
              </Link>
              <p className="text-sm text-accent-foreground">
                Tax Revenue
                <br />
                Monitoring System
              </p>
            </div>

            <div className="flex flex-col justify-center items-center gap-5 mt-12 w-full h-full">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="w-full ">
                    <FormLabel className="text-accent-foreground">
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="NIP Pendek"
                        {...field}
                        className="outline-none border-none bg-border text-accent-foreground"
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
                    <FormLabel className="text-accent-foreground">
                      password
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="******"
                        type="password"
                        className="outline-none border-none bg-border text-accent-foreground"
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
                disabled={isPending}
                className="cursor-pointer w-full text-white"
              >
                Login
              </Button>

              <div className="flex justify-start items-center w-full gap-0">
                <ModeToggle className="bg-muted" />
                <Button
                  variant="link"
                  className="text-sm font-mono text-accent-foreground"
                >
                  Belum punya akun? kontak admin 😉
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
export default LoginPage;
