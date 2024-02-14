import Capaian from "./dashComp/gauge";
import KPI from "./dashComp/kpi";
import Adm from "./dashComp/kpp";
import MapPage from "./dashComp/map";
import SektorPage from "./dashComp/sektor";
import Topwp from "./dashComp/topwp";
import TrendPage from "./dashComp/trend";
import FilterCollapse from "./filter_collapse";

const Dashboard = () => {
  return (
    <main className="flex flex-col md:flex-row md:mr-1 justify-start items-start gap-5 w-full h-screen">
      <div className="flex flex-col md:flex-row justify-start items-start mx-5 md:mx-0 gap-5 md:gap-2 mt-2 w-full h-screen ">
        <FilterCollapse />
        <div className="flex flex-col justify-start items-start gap-2 w-full h-full">
          <KPI />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 w-full ">
            <Capaian className="col-span-12 md:col-span-3 " />
            <TrendPage className="col-span-12 md:col-span-6 " />
            <Adm className="col-span-12 md:col-span-3 " />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 w-full ">
            <MapPage className="col-span-12 md:col-span-5" />
            <SektorPage className="col-span-12 md:col-span-7" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 w-full ">
            <Topwp className="col-span-12 md:col-span-5" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
