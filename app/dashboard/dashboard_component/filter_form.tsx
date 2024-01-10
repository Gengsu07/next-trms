"use client";
import useFilterData from "@/app/store/useFilterData";
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
import { on } from "events";
import { CalendarIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

export const FilterSchema = z.object({
  tanggal: z.object({ from: z.date(), to: z.date() }),
  admin: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
  sektor: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .optional(),
  map: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
  kjs: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
  npwp: z
    .string()
    .refine((value) => /^\d+$/.test(value) && value.length === 15, {
      message: "NPWP harus 15 digit dan berisi hanya karakter angka (0-9)",
    })
    .optional(),
});

export type FilterType = z.infer<typeof FilterSchema>;

const FilterForm = () => {
  const { onFilter } = useFilterData();
  const form = useForm<FilterType>({
    resolver: zodResolver(FilterSchema),
  });
  const onSubmit = (data: FilterType) => {
    onFilter(data);
  };

  return (
    <div className="flex flex-col justify-start items-start  w-full h-full ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full "
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
                  placeholder="KPP "
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

          <Button type="submit" className="cursor-pointer w-full">
            Analisa
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FilterForm;
