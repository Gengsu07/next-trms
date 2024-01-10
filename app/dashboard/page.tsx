"use client";

import { useEffect, useState } from "react";
import React from "react";
import useFilterData from "../store/useFilterData";
import SideBar from "./Sidebar";
import KPI from "./dashboard_component/kpi";

const Dashboard = () => {
  const { filterData, onFilter } = useFilterData();
  const [admin, setAdmin] = useState<String[]>([]);
  const [sektor, setSektor] = useState<String[]>([]);
  // console.log(filterData);

  useEffect(() => {
    if (filterData?.admin?.length !== 0) {
      setAdmin(
        (prevAdmin) => filterData.admin?.map((item) => item?.value) || prevAdmin
      );
    }

    if (filterData?.sektor?.length !== 0) {
      setSektor(
        (prevAdmin) =>
          filterData.sektor?.map((item) => item?.value) || prevAdmin
      );
    }
  }, [filterData]);

  console.log(sektor);
  return (
    <main className="w-screen h-screen mt-1">
      <div className="flex  flex-col justify-center items-center gap-5">
        <SideBar />
        {/* <KPI /> */}
      </div>
    </main>
  );
};
export default Dashboard;
