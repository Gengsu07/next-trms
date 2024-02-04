import KPI from "./dashboard_component/kpi";
import MapPage from "./dashboard_component/map";
import TrendPage from "./dashboard_component/trend";
import FilterCollapse from "./filter_collapse";

const Dashboard = () => {
  return (
    <main className="w-screen h-screen  dark:bg-[#0e1012]">
      <div className="flex flex-col sm:flex-row justify-start items-start gap-5 mt-5 w-full h-full sm:mr-5">
        <FilterCollapse />

        <div className="flex flex-col justify-start items-start  mr-5 px-5 w-full h-full">
          <KPI />
          <div className="flex flex-col md:flex-row justify-center items-start gap-5 w-full h-full mt-5">
            <TrendPage className="w-full md:w-7/12" />
            <MapPage className="w-full md:w-5/12" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
