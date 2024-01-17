import useFilterData from "@/app/store/useFilterData";
import { TMap, TTrend } from "@/app/types/types";
import { useQuery } from "@tanstack/react-query";
import querystring from "querystring";
import dynamic from "next/dynamic";

const ReactEchart = dynamic(() => import("echarts-for-react"), { ssr: false });
const MapPage = () => {
  const { filterData, parseFilterData } = useFilterData();
  const cleanFilterData = parseFilterData(filterData) || {};
  const queryParamsString = querystring.stringify(cleanFilterData);

  const { data, isFetching, error } = useQuery<TMap>({
    queryKey: ["map", queryParamsString],
    queryFn: () =>
      fetch("http://localhost:3000/api/map?" + queryParamsString, {
        cache: "no-store",
      }).then((res) => res.json()),
  });
  const mapChartOption = {
    title: { text: "Per Jenis Pajak" },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {},
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      boundaryGap: [0, 0.01],
    },
    yAxis: {
      type: "category",
      data: data?.cy.map((item) => item.map),
    },
    series: [
      {
        name: "tahun ini",
        type: "bar",
        stack: "total",
        data: data?.cy.map((item) => item._sum.nominal),
      },
      {
        name: "tahun lalu",
        type: "bar",
        stack: "total",
        data: data?.py.map((item) => item._sum.nominal),
      },
    ],
  };
  return (
    <div className="w-full h-fit">
      <ReactEchart option={mapChartOption} />
    </div>
  );
};
export default MapPage;
