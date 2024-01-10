"use client";
import NavBar from "./NavBar";
import Image from "next/image";
import { ModeToggle } from "./theme-switcher";
import MobileNav from "./MobileNavbar";

const Header = () => {
  return (
    <>
      <div className="flex  justify-between items-center gap-5 w-full h-12 px-5 py-5  border-b-2 border-accent  shadow-lg ">
        <div className="flex justify-center items-center gap-3">
          <Image src="/logo_djp.png" alt="logo" width="25" height="25" />
          <h5>TRMS</h5>
          <div className="hidden md:flex">
            <NavBar />
          </div>
        </div>
        <div className="hidden md:flex justify-between gap-2 items-center">
          <h1>Hey, some user here</h1>
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
