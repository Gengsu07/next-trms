import Capaian from "./dashboard_component/gauge";
import KPI from "./dashboard_component/kpi";
import MapPage from "./dashboard_component/map";
import TrendPage from "./dashboard_component/trend";
import FilterCollapse from "./filter_collapse";

const Dashboard = () => {
  return (
    <main className="flex flex-col md:flex-row md:mr-1 justify-start items-start gap-5 w-full h-screen">
      <div className="flex flex-col md:flex-row justify-start items-start mx-5 md:mx-0 gap-5 md:gap-2 mt-2 w-full h-screen">
        <FilterCollapse />
        <div className="flex flex-col justify-start items-start gap-2 w-full h-full">
          <KPI />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 w-full h-full">
            <Capaian className="col-span-full md:col-span-3 w-full h-full" />
            <TrendPage className="col-span-full md:col-span-9 w-full" />
          </div>
          <MapPage className="w-full md:w-5/12" />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
