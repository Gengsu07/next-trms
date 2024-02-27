import NavBar from "./NavBar";
import Image from "next/image";
import { ModeToggle } from "./theme-switcher";
import MobileNav from "./MobileNavbar";
import Link from "next/link";
import IsolateToChild from "./IsolateToChild";
import { auth, signIn, signOut } from "@/auth";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const Header = async () => {
  const session = await auth();
  const user = session?.user;

  const logoutAction = async () => {
    "use server";
    await signOut();
  };
  return (
    <>
      <div className="flex justify-between items-center gap-5 w-full h-14 px-5 py-2  border-b-2 border-accent shadow-md bg-background">
        <div className="flex justify-center items-center gap-3">
          <Link href="/">
            <Image src="/logo_djp.png" alt="logo" width="40" height="40" />
          </Link>
          <p className="text-sm">
            Tax Revenue
            <br />
            Monitoring System
          </p>
          <div className="hidden md:flex">
            <NavBar />
          </div>
        </div>
        <div className="hidden md:flex justify-between gap-2 items-center">
          {user && (
            <form action={logoutAction} className="flex">
              <Button variant="link">Logout</Button>
            </form>
          )}
          {!user && (
            <Button
              className="text-sm text-foreground font-normal px-2 py-2"
              variant="outline"
            >
              <Link href="/auth/login">Sign in</Link>
            </Button>
          )}
          <IsolateToChild>
            <ModeToggle />
          </IsolateToChild>
        </div>
        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
      {/* <Separator className="bg-slate-300" /> */}
    </>
  );
};
export default Header;
