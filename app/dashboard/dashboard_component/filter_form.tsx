"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { kpp, sektor, map, kjs } from "@/constant/initialData";
import { Input } from "@/components/ui/input";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { Controller } from "react-hook-form";
// import { Select, SelectItem } from "@nextui-org/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { Label } from "@radix-ui/react-dropdown-menu";

export const FilterSchema = z.object({
  tanggal_awal: z.date({ required_error: "Tanggal awal harus dipilih" }),
  tanggal_akhir: z.date({ required_error: "Tanggal awal harus dipilih" }),
  admin: z.string().optional(),
  sektor: z.array(z.string()).optional(),
  map: z.string().optional(),
  kjs: z.string().optional(),
  npwp: z.number({ required_error: "NPWP harus diisi" }).min(15).optional(),
});

export type FilterType = z.infer<typeof FilterSchema>;

const FilterForm = () => {
  const form = useForm<FilterType>({
    resolver: zodResolver(FilterSchema),
  });
  const onSubmit = (data: FilterType) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col md:flex-row flex-wrap  justify-center items-center gap-5 w-full">
          <FormField
            control={form.control}
            name="tanggal_awal"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                {/* TANGGAL */}
                <FormLabel>Tanggal Awal</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tanggal_akhir"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Tanggal Akhir</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* ADMIN */}
          <FormField
            control={form.control}
            name="admin"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>KPP</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="w-[240px]">
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih KPP" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {kpp.map((kpp) => (
                      <SelectItem key={kpp.value} value={kpp.value}>
                        {kpp.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* Sektor */}

          <Controller
            control={form.control}
            name="sektor"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>KPP</FormLabel>
                <FormControl>
                  <MultipleSelector
                    onChange={(e) => field.onChange(e)}
                    options={sektor}
                    hidePlaceholderWhenSelected
                    placeholder="Pilih Sektor"
                    emptyIndicator={
                      <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        Pilih yg ada aja ya.
                      </p>
                    }
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="w-[240px]">
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Sektor" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {sektor.map((sektor) => (
                      <SelectItem key={sektor.value} value={sektor.value}>
                        {sektor.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select> */}

          {/* MAP */}

          <FormField
            control={form.control}
            name="map"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Jenis Pajak</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="w-[240px]">
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Sektor" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {map.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* KJS */}
          <FormField
            control={form.control}
            name="kjs"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Jenis Setoran</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="w-[240px]">
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih KJS" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {kjs.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
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
                    type="number"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="cursor-pointer w-full">
          Analisa
        </Button>
      </form>
    </Form>
  );
};

export default FilterForm;
