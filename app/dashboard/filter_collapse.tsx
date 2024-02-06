"use client";
import { useState } from "react";
import FilterForm from "./dashboard_component/filter_form";
import useFilterData from "../store/useFilterData";
import CollapsePage from "./dashboard_component/collapsed";

const FilterCollapse = () => {
  const { onFilter } = useFilterData();
  const [collapsed, setIsCollapsed] = useState(true);

  const onCollapsed = () => {
    setIsCollapsed(!collapsed);
  };
  return (
    <main className="w-full md:w-fit h-screen">
      {collapsed ? (
        <CollapsePage setIsCollapsed={onCollapsed} />
      ) : (
        <FilterForm onFilterForm={onFilter} setIsCollapsed={onCollapsed} />
      )}
    </main>
  );
};
export default FilterCollapse;
