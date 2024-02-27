"use client";
import { ModeToggle } from "./theme-switcher";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { User } from "lucide-react";

const AuthToggleNav = () => {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col md:flex-row justify-end items-center gap-1">
      {session && session.user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-sm font-normal text-black w-full"
            >
              <Link href={session && session.user ? "" : "/api/auth/signin"}>
                {session && session.user ? session.user.name : "Sign In"}
              </Link>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 text-sm mr-5">
            <DropdownMenuLabel>Profile</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup className="space-y-2">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>{session?.user.username}</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>{session?.user.name}</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button className="w-full py-2">
                  <Link href="/api/auth/signout">Sign Out</Link>
                </Button>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button variant="ghost" className="text-sm font-normal text-black ">
          <Link href="/api/auth/signin">Sign In</Link>
        </Button>
      )}

      {/* {session && session.user ? (
        <>
          <p className="text-sm font-mono font-normal text-black">
            {session.user.name}
          </p>
          <Button variant="link" className="text-sm font-normal text-black">
            <Link href="/api/auth/signout">Sign Out</Link>
          </Button>
        </>
      ) : (
        <Button variant="ghost" className="text-sm font-normal text-black ">
          <Link href="/api/auth/signin">Sign In</Link>
        </Button>
      )} */}
      <ModeToggle />
    </div>
  );
};
export default AuthToggleNav;
