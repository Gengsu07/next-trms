"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";

const OPTIONS: Option[] = [
  { label: "nextjs", value: "Nextjs" },
  { label: "Vite", value: "vite", disable: true },
  { label: "Nuxt", value: "nuxt", disable: true },
  { label: "Vue", value: "vue, disable: true", disable: true },
  { label: "Remix", value: "remix" },
  { label: "Svelte", value: "svelte", disable: true },
  { label: "Angular", value: "angular", disable: true },
  { label: "Ember", value: "ember", disable: true },
  { label: "React", value: "react" },
  { label: "Gatsby", value: "gatsby", disable: true },
  { label: "Astro", value: "astro", disable: true },
];

const MultipleSelectorWithDisabledOption = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    // Handle form submission with the selected values
    console.log(data.selectedFrameworks);
  };

  return (
    <div className="flex w-full flex-col gap-5 px-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="selectedFrameworks"
          control={control}
          defaultValue={[]} // Set the default value to an empty array or any default value you want
          render={({ field }) => (
            <MultipleSelector
              options={OPTIONS}
              placeholder="Select frameworks you like..."
              emptyIndicator={
                <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                  no results found.
                </p>
              }
              {...field}
            />
          )}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MultipleSelectorWithDisabledOption;
