import SideBar from "@/app/dashboard/Sidebar";
import MapPage from "./dashboard/dashComp/map";
import FilterCollapse from "./dashboard/filter_collapse";

export default function Home() {
  return (
    <main className="w-screen h-screen">
      <FilterCollapse />
    </main>
  );
}
