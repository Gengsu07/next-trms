"use client";
import { useState } from "react";
import FilterForm from "./dashComp/filter_form";
import useFilterData from "../store/useFilterData";
import CollapsePage from "./dashComp/collapsed";

const FilterCollapse = () => {
  const { onFilter } = useFilterData();
  const [collapsed, setIsCollapsed] = useState(true);

  const onCollapsed = () => {
    setIsCollapsed(!collapsed);
  };
  return (
    <main className="w-full md:w-fit h-[100%] border-[2px] border-accent bg-card rounded-md shadow-md sticky bottom-0">
      {collapsed ? (
        <CollapsePage setIsCollapsed={onCollapsed} />
      ) : (
        <FilterForm onFilterForm={onFilter} setIsCollapsed={onCollapsed} />
      )}
    </main>
  );
};
export default FilterCollapse;
