import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import NavBar from "./NavBar";
import { RxHamburgerMenu } from "react-icons/rx";
import { ModeToggle } from "./theme-switcher";
import IsolateToChild from "./isolateClient";
import AuthToggleNav from "./AuthToggleNav";

const MobileNav = () => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <RxHamburgerMenu />
        </SheetTrigger>
        <SheetContent className="flex flex-col justify-start items-center gap-5 w-full">
          <Image src="/placeholder.png" alt="Logo" width={128} height={38} />
          <Separator className="border-gray-50" />
          <NavBar />
          <IsolateToChild>
            <AuthToggleNav />
          </IsolateToChild>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
