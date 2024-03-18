import FilterSheet from "./dashComp/filterSheet";
import Capaian from "./dashComp/gauge";
import KPI from "./dashComp/kpi";
import Adm from "./dashComp/kpp";
import MapPage from "./dashComp/map";
import PerWPTablePage from "./dashComp/perwp/page";
import SektorPage from "./dashComp/sektor";
import SektorMap from "./dashComp/sektormap";
import Topwp from "./dashComp/topwp";
import TrendPage from "./dashComp/trend";
import DashboardInfo from "./dashboardState";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getServerSession();
  if (!session?.user) redirect("/auth/login");
  return (
    <main className="flex flex-col md:flex-row justify-start items-start gap-5 w-screen h-screen">
      <div className="flex flex-col md:flex-row justify-start items-start  gap-5 md:gap-2 mt-2 w-full h-screen px-5">
        {/* <div className="min-h-screen ">
          <FilterCollapse />
        </div> */}
        <div className="flex flex-col justify-start items-start gap-2 w-full h-full">
          <DashboardInfo />

          <KPI />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 w-full">
            <Capaian className="col-span-12 md:col-span-3 max-h-96" />
            <TrendPage className="col-span-12 md:col-span-6 max-h-96" />
            <Adm className="col-span-12 md:col-span-3 " />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 w-full max-h-[550px] ">
            <MapPage className="col-span-12 md:col-span-6 h-full" />
            <SektorPage className="col-span-12 md:col-span-6 h-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 w-full max-h-[550px] ">
            <SektorMap className="col-span-12 md:col-span-6 h-full" />
            <Topwp className="col-span-12 md:col-span-6 h-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 w-full ">
            <PerWPTablePage className="col-span-12" />
          </div>
          <FilterSheet />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
