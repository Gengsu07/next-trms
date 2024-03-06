import DashboardInfo from "@/app/dashboard/dashboardState";
import FilterSheet from "../../dashboard/dashComp/filterSheet";
import Capaian from "../../dashboard/dashComp/gauge";
import KPI from "../../dashboard/dashComp/kpi";
import Adm from "../../dashboard/dashComp/kpp";
import MapPage from "../../dashboard/dashComp/map";
import PerWPTablePage from "../../dashboard/dashComp/perwp/page";
import SektorPage from "../../dashboard/dashComp/sektor";
import SektorMap from "../../dashboard/dashComp/sektormap";
import Topwp from "../../dashboard/dashComp/topwp";
import TrendPage from "../../dashboard/dashComp/trend";

const Dashboard = () => {
  // Set the viewport and prevent page breaks
  // const { height, width } =
  //   window.document.documentElement.getBoundingClientRect();
  // document.documentElement.style.setProperty(
  //   "--viewport-height",
  //   `${height}px`
  // );
  // document.documentElement.style.setProperty("--viewport-width", `${width}px`);

  return (
    <main className="flex flex-col md:flex-row justify-start items-start gap-5 w-[297mm] h-[210mm]">
      {/* Adjust main content area for proper A4 layout */}
      <div className="flex flex-col md:flex-row justify-start items-start  gap-5 md:gap-2 mt-2 w-full">
        {/* FilterSheet placement and size adjustments */}
        <FilterSheet className="fixed top-0 left-0 w-full h-full z-50 bg-gray-900/75 flex items-center justify-center" />

        <div className="flex flex-col justify-start items-start gap-2 w-full h-full">
          <div className="flex flex-col md:flex-row gap-2 w-full h-full">
            <DashboardInfo />
          </div>
          <KPI />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 w-full h-full">
            <Capaian className="col-span-12 md:col-span-3 h-full" />
            <TrendPage className="col-span-12 md:col-span-6 overflow-auto h-full" />
            <Adm className="col-span-12 md:col-span-3 h-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 w-full">
            <MapPage className="col-span-12 md:col-span-6 overflow-auto h-full" />
            <SektorPage className="col-span-12 md:col-span-6 overflow-auto h-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 w-full">
            <SektorMap className="col-span-12 md:col-span-6 overflow-auto h-full" />
            <Topwp className="col-span-12 md:col-span-6 overflow-auto h-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 w-full">
            <PerWPTablePage className="col-span-12 overflow-auto h-full" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
