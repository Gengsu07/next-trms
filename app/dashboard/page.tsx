"use client";
import FilterForm from "./dashboard_component/filter_form";
import { useEffect, useState } from "react";
import React from "react";
import useFilterData from "../store/useFilterData";
import SideBar from "./Sidebar";
import KPI from "./dashboard_component/kpi";

const Dashboard = () => {
  const [sidebar, setSideBar] = useState(false);
  // const { filterData, onFilter } = useFilterData();
  // const [admin, setAdmin] = useState<String[]>([]);
  // const [sektor, setSektor] = useState<String[]>([]);

  // useEffect(() => {
  //   if (filterData?.admin?.length !== 0) {
  //     setAdmin(
  //       (prevAdmin) => filterData.admin?.map((item) => item?.value) || prevAdmin
  //     );
  //   }

  //   if (filterData?.sektor?.length !== 0) {
  //     setSektor(
  //       (prevAdmin) =>
  //         filterData.sektor?.map((item) => item?.value) || prevAdmin
  //     );
  //   }
  // }, [filterData]);

  return (
    <main className="w-screen h-screen mt-1">
      <div className="flex justify-start items-center gap-5">
        <div className="flex justify-center items-center  max-w-sm h-screen">
          <FilterForm />
        </div>
        <div className="flex justify-center items-center">dashboard</div>
        {/* <SideBar /> */}
        {/* <KPI /> */}
      </div>
    </main>
  );
};
export default Dashboard;
