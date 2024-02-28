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
import FilterForm from "./filter_form";

const FilterSheet = () => {
  const { onFilter } = useFilterData();
  return (
    <section className="w-full md:w-fit min-h-screen  bg-card rounded-md shadow-md border-[2px] border-accent z-10">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="absolute bottom-4 right-4 bg-accent-foreground  hover:bg-primary  text-white px-4 w-auto h-12  flex justify-center items-center gap-1 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none rounded-full"
          >
            <LucideBrainCircuit />
            <span className="text-sm font-mono">Filter Data</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="flex flex-col justify-start items-center px-0 w-full"
        >
          <SheetHeader className="flex flex-row justify-start items-center w-full gap-2 px-2">
            <Link href="/">
              <Image src="/logo_djp.png" alt="logo" width="40" height="40" />
            </Link>
            <h3 className="text-lg font-bold ">Filter Data</h3>
          </SheetHeader>
          <Separator className="" />
          <div className="overflow-y-scroll p-0 m-0 w-full mt-1">
            <FilterForm onFilterForm={onFilter} />
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default FilterSheet;
