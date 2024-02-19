import Capaian from "../dashboard/dashComp/gauge";
import dynamic from "next/dynamic";
const ReactEchart = dynamic(() => import("echarts-for-react"), { ssr: false });

const ReportPage = () => {
  return (
    <main className="w-1/2 h">
      <Capaian />
    </main>
  );
};
export default ReportPage;
