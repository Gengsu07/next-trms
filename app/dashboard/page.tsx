import SideBar from "@/app/dashboard/Sidebar";
import Header from "@/components/Header";
import MainDashboard from "./MainDashboard";
import NavBar from "@/components/NavBar";
import { Separator } from "@/components/ui/separator";

const Dashboard = () => {
  return (
    <main className="w-screen h-screen ">
      <div className="flex  justify-center items-center ">
        <MainDashboard />
      </div>
    </main>
  );
};
export default Dashboard;
