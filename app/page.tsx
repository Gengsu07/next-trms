import SideBar from "@/app/dashboard/Sidebar";
import MapPage from "./dashboard/dashComp/map";
import FilterCollapse from "./dashboard/filter_collapse";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();
  return (
    <main className="w-screen h-screen">
      {session?.user && redirect("/dashboard")}
    </main>
  );
}
