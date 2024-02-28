"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MultipleSelector from "@/components/ui/multiple-selector";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { kjs, kpp, map, sektor } from "@/constant/initialData";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { FilterSchema } from "@/app/validation/validation";
import { z } from "zod";
import { RxDoubleArrowLeft } from "react-icons/rx";
import { TbFilterOff } from "react-icons/tb";
import { SheetClose } from "@/components/ui/sheet";

export type FilterType = z.infer<typeof FilterSchema>;

const FilterForm = ({
  onFilterForm,
  setIsCollapsed,
}: {
  onFilterForm: (data: FilterType) => void;
  setIsCollapsed?: () => void;
}) => {
  const form = useForm<FilterType>({
    resolver: zodResolver(FilterSchema),
  });
  const onSubmit = (data: FilterType) => {
    // console.log("filterform:", data);
    onFilterForm(data);
  };
  return (
    <div className="flex flex-col justify-start items-start min-w-full sm:w-60 xl:w-80 h-fit sm:h-screen border-[2px] border-accent bg-card rounded-md shadow-md py-2">
      {/* <div className="flex justify-between items-center w-full h-10 mb-5">
        <h3 className="text-lg font-bold">Filter data</h3>

        <Button onClick={setIsCollapsed}>
          <RxDoubleArrowLeft />
        </Button>
      </div> */}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full px-2 "
        >
          <FormField
            control={form.control}
            name="tanggal"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Tanggal</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      name="dob"
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value?.from ? (
                        field.value.to ? (
                          <>
                            {format(field.value.from, "LLL dd, y")} -{" "}
                            {format(field.value.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(field.value.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Rentang waktu</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={field.value?.from}
                      selected={field.value}
                      onSelect={field.onChange}
                      numberOfMonths={3}
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* ADMIN */}
          <Controller
            control={form.control}
            name="admin"
            defaultValue={[]}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kantor</FormLabel>
                <MultipleSelector
                  options={kpp}
                  placeholder="KPP"
                  hidePlaceholderWhenSelected
                  emptyIndicator={
                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                      Pilih yg ada aja ya.
                    </p>
                  }
                  {...field}
                />
              </FormItem>
            )}
          />

          {/* Sektor */}

          <Controller
            control={form.control}
            name="sektor"
            defaultValue={[]}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sektor</FormLabel>
                <MultipleSelector
                  options={sektor}
                  placeholder="Pilih Sektor"
                  hidePlaceholderWhenSelected
                  emptyIndicator={
                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                      Pilih yg ada aja ya.
                    </p>
                  }
                  {...field}
                />
              </FormItem>
            )}
          />

          {/* MAP */}
          <Controller
            control={form.control}
            name="map"
            defaultValue={[]}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jenis Pajak</FormLabel>
                <MultipleSelector
                  options={map}
                  placeholder="MAP"
                  hidePlaceholderWhenSelected
                  emptyIndicator={
                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                      Pilih yg ada aja ya.
                    </p>
                  }
                  {...field}
                />
              </FormItem>
            )}
          />

          {/* KJS */}
          <Controller
            control={form.control}
            name="kjs"
            defaultValue={[]}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kode Bayar</FormLabel>
                <MultipleSelector
                  options={kjs}
                  placeholder="Kode Jenis Setoran"
                  hidePlaceholderWhenSelected
                  emptyIndicator={
                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                      Pilih yg ada aja ya.
                    </p>
                  }
                  {...field}
                />
              </FormItem>
            )}
          />

          {/* NPWP */}
          <FormField
            control={form.control}
            name="npwp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NPWP</FormLabel>
                <FormControl>
                  <Input
                    placeholder="NPWP 15 Digit"
                    type="text"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between items-center gap-5">
            <SheetClose asChild>
              <Button type="submit" className="cursor-pointer w-full">
                Analisa
              </Button>
            </SheetClose>
            <Button onClick={() => form.reset()} className="cursor-pointer">
              <TbFilterOff />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FilterForm;
