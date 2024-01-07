"use client";
import NavBar from "./NavBar";
import Image from "next/image";
import { ModeToggle } from "./theme-switcher";
import MobileNav from "./MobileNavbar";
import { Separator } from "./ui/separator";

const Header = () => {
  return (
    <>
      <div className="flex  justify-between items-center gap-5 w-full h-15 px-5 py-2  border-b-2 border-accent  shadow-lg ">
        <div className="flex justify-center items-center gap-3">
          <Image src="/logo_djp.png" alt="logo" width="50" height="50" />
          <h1>
            Tax Revenue <br />
            Monitoring System
          </h1>
        </div>
        <div className="hidden md:flex">
          <NavBar />
        </div>
        <div className="hidden md:flex justify-between gap-2 items-center">
          <h1>Hey, some user here</h1>
          <ModeToggle />
        </div>
        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
      <Separator className="bg-white" />
    </>
  );
};
export default Header;
