import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import FilterForm from "./filter_form";

const SideBar = () => {
  return (
    <section className="shadow-lg  h-2 w-full ">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="text-xs px-5 py-2  bg-accent-foreground hover:bg-accent text-accent hover:text-accent-foreground  w-full h-2"
          >
            filter data disini ...
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="flex justify-start items-center gap-5">
            <Image src="/logo_djp.png" alt="logo" width="50" height="50" />
            <SheetHeader>
              <SheetTitle>Self Service Data Analytic</SheetTitle>
              <SheetDescription>
                filter data sesuai yang dibutuhkan
              </SheetDescription>
            </SheetHeader>
          </div>
          <Separator className="my-5" />
          <FilterForm />
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default SideBar;
