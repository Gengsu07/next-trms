"use client";
import { ModeToggle } from "./theme-switcher";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import Link from "next/link";

const AuthToggleNav = () => {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-2">
      {session && session.user ? (
        <>
          <p className="text-sm font-mono font-normal text-black">
            {session.user.name}
          </p>
          <Button variant="link">
            <Link href="/api/auth/signout">Logout</Link>
          </Button>
        </>
      ) : (
        <Button variant="link">
          <Link href="/api/auth/signin">Login</Link>
        </Button>
      )}
      <ModeToggle />
    </div>
  );
};
export default AuthToggleNav;
