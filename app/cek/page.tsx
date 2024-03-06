import FilterSheet from "../dashboard/dashComp/filterSheet";
import Capaian from "../dashboard/dashComp/gauge";
import KPI from "../dashboard/dashComp/kpi";
import Adm from "../dashboard/dashComp/kpp";
import MapPage from "../dashboard/dashComp/map";
import PerWPTablePage from "../dashboard/dashComp/perwp/page";
import SektorPage from "../dashboard/dashComp/sektor";
import SektorMap from "../dashboard/dashComp/sektormap";
import Topwp from "../dashboard/dashComp/topwp";
import TrendPage from "../dashboard/dashComp/trend";

const Dashboard = () => {
  return (
    <main className="flex flex-col md:flex-row md:mr-1 justify-start items-start gap-5 w-[297mm] h-[210mm]">
      <div className="flex flex-col md:flex-row justify-start items-start md:mx-2 gap-5 md:gap-2 mt-2 w-full h-screen ">
        {/* <div className="min-h-screen ">
          <FilterCollapse />
        </div> */}
        <FilterSheet />
        <div className="flex flex-col justify-start items-start gap-2 w-full h-full">
          <KPI />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 w-full">
            <Capaian className="col-span-12 md:col-span-3" />
            <TrendPage className="col-span-12 md:col-span-6 " />
            <Adm className="col-span-12 md:col-span-3 " />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 w-full ">
            <MapPage className="col-span-12 md:col-span-6" />
            <SektorPage className="col-span-12 md:col-span-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 w-full ">
            <SektorMap className="col-span-12 md:col-span-6" />
            <Topwp className="col-span-12 md:col-span-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 w-full ">
            <PerWPTablePage className="col-span-12" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
