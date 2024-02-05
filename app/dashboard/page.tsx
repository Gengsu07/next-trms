import Capaian from "./dashboard_component/gauge";
import KPI from "./dashboard_component/kpi";
import MapPage from "./dashboard_component/map";
import TrendPage from "./dashboard_component/trend";
import FilterCollapse from "./filter_collapse";

const Dashboard = () => {
  return (
    <main className="flex flex-col md:flex-row md:mr-1 justify-start items-start gap-5 px-2 w-screen h-screen">
      <div className="flex flex-col md:flex-row justify-start items-start gap-10 md:gap-5 mt-5 w-full h-full">
        <FilterCollapse />
        <div className="flex flex-col justify-start items-start w-full h-full">
          <KPI />
          <div className="flex flex-col md:flex-row justify-center items-start gap-5 w-full h-full mt-5">
            <Capaian className="w-full md:w-3/12 max-h-full" />
            <TrendPage className="w-full md:w-9/12" />
          </div>
          <MapPage className="w-full md:w-5/12" />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
