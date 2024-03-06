"use client";

import useFilterData from "@/app/store/useFilterData";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LucideBrainCircuit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import FilterForm from "./filter_form";
import { cn } from "@/lib/utils";

const FilterSheet = ({ className }: { className?: string }) => {
  const { onFilter } = useFilterData();
  const [open, setOpen] = useState(false);
  return (
    <section
      className={cn(
        "w-full md:w-fit min-h-screen  bg-card rounded-md shadow-md border-[2px] border-accent z-10",
        className
      )}
    >
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="fixed bottom-10 right-4 dark:bg-foreground  bg-accent-foreground text-white dark:text-accent px-4 w-auto h-12  border-0 outline-none flex justify-center items-center gap-1 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none rounded-full hover:bg-primary cursor-pointer"
          >
            <LucideBrainCircuit />
            <span className="text-sm font-mono">Filter Data</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="flex flex-col justify-start items-center px-0 w-full bg-card rounded-md"
        >
          <SheetHeader className="flex flex-col md:flex-row justify-center items-center w-full gap-2 space-y-0 py-5">
            <Link href="/">
              <Image src="/logo_djp.png" alt="logo" width="40" height="40" />
            </Link>
            <p className="text-sm mt-0">
              Tax Revenue
              <br />
              Monitoring System
            </p>
          </SheetHeader>
          <Separator className="bg-foreground border-0 outline-none" />
          <div className=" p-0 m-0 w-full mt-1 h-full overflow-y-scroll">
            <FilterForm onFilterForm={onFilter} />
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default FilterSheet;
// overflow-y-scroll
