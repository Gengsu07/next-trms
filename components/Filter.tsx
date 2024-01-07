"use client";
import FilterForm from "@/app/dashboard/dashboard_component/filter_form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

const FilterData = () => {
  return (
    <section className="shadow-lg rounded-full h-5 w-5 fixed top-1/2 right-8">
      <div className="flex items-center justify-center ">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="text-xs px-3 py-5 rounded-full bg-accent-foreground hover:bg-accent text-accent hover:text-accent-foreground "
            >
              filter data
            </Button>
          </DialogTrigger>
          <DialogContent className="w-full md:w-3/4 xl:w-1/2">
            <DialogHeader>
              <DialogTitle>Filter Data</DialogTitle>
              <DialogDescription>
                Sesuaikan filter untuk analisis data sesuai keinginan
              </DialogDescription>
            </DialogHeader>
            <FilterForm />
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};
export default FilterData;
