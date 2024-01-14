"use client";
import NavBar from "./NavBar";
import Image from "next/image";
import { ModeToggle } from "./theme-switcher";
import MobileNav from "./MobileNavbar";

const Header = () => {
  return (
    <>
      <div className="flex  justify-between items-center gap-5 w-full h-14 px-5 py-2  border-b-2 border-accent  shadow-lg ">
        <div className="flex justify-center items-center gap-3">
          <Image src="/logo_djp.png" alt="logo" width="40" height="40" />
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
          <p className="text-sm">Hey, some user here</p>
          <ModeToggle />
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
