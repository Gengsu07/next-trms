"use client";
import KPI from "./dashboard_component/kpi";
import { Controller, useForm } from "react-hook-form";

import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { Button } from "@/components/ui/button";

const kpp: Option[] = [
  { value: "001", label: "Matraman" },
  { value: "002", label: "Jatinegara" },
];

const Dashboard = () => {
  const form = useForm<Option>({});
  const onSubmit = (data: Option) => {
    console.log(data);
  };
  return (
    <main className="w-screen h-screen mt-1">
      <div className="flex  justify-center items-center ">
        {/* <KPI /> */}
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Controller
            control={form.control}
            name="kantor"
            render={({ field }) => (
              <MultipleSelector
                onChange={field.onChange}
                options={kpp}
                hidePlaceholderWhenSelected
                placeholder="Pilih Sektor"
                emptyIndicator={
                  <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                    Pilih yg ada aja ya.
                  </p>
                }
              />
            )}
          />
          <Button type="submit" className="cursor-pointer w-full">
            Analisa
          </Button>
        </form>
      </div>
    </main>
  );
};
export default Dashboard;
