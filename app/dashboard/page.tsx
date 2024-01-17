"use client";
import { useState } from "react";
import useFilterData from "../store/useFilterData";
import FilterForm from "./dashboard_component/filter_form";
import CollapsePage from "./dashboard_component/collapsed";
import KPI from "./dashboard_component/kpi";
import TrendPage from "./dashboard_component/trend";
import MapPage from "./dashboard_component/map";

const Dashboard = () => {
  const { onFilter } = useFilterData();
  const [collapsed, setIsCollapsed] = useState(false);

  const onCollapsed = () => {
    setIsCollapsed(!collapsed);
  };

  return (
    <main className="w-screen h-screen">
      <div className="flex flex-col sm:flex-row justify-start items-start gap-5 w-full h-full sm:mr-5">
        {collapsed ? (
          <CollapsePage setIsCollapsed={onCollapsed} />
        ) : (
          <FilterForm onFilterForm={onFilter} setIsCollapsed={onCollapsed} />
        )}

        <div className="flex flex-col justify-start items-start mt-5 mr-5 w-full h-full">
          <KPI />
          <TrendPage />
          <MapPage />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
