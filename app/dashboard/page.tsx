"use client";
import { useState } from "react";
import useFilterData from "../store/useFilterData";
import FilterForm from "./dashboard_component/filter_form";
import CollapsePage from "./dashboard_component/collapsed";
import KPI from "./dashboard_component/kpi";

const Dashboard = () => {
  const { filterData, onFilter, parseFilterData } = useFilterData();
  const [collapsed, setIsCollapsed] = useState(true);

  const onCollapsed = () => {
    setIsCollapsed(!collapsed);
  };
  const cleanFilterData = parseFilterData(filterData);

  // console.log("dashboard:", cleanFilterData);

  return (
    <main className="w-screen h-screen mt-1">
      <div className="flex flex-col sm:flex-row justify-start items-center gap-5 w-full h-full">
        {collapsed ? (
          <CollapsePage setIsCollapsed={onCollapsed} />
        ) : (
          <FilterForm onFilterForm={onFilter} setIsCollapsed={onCollapsed} />
        )}
        <div>
          <KPI />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
