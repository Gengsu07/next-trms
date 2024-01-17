"use client";
import useFilterData from "@/app/store/useFilterData";
import { TMap } from "@/app/types/types";
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
  console.log(data?.cy);

  const mapChartOption = {
    title: { text: "Per Jenis Pajak" },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: ["tahun ini"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
      height: "600px",
    },
    xAxis: [
      {
        type: "value",
        sort: "descending",
        show: false,
      },
    ],
    yAxis: [
      {
        type: "category",
        axisTick: {
          show: false,
        },
        data: data?.cy.map((item) => item.map),
      },
    ],
    series: [
      {
        name: "tahun ini",
        type: "bar",
        label: {
          show: true,
          position: "inside",
        },
        emphasis: {
          focus: "series",
        },
        data: data?.cy.map((item) => item._sum.nominal),
      },
    ],
  };

  return (
    <div className="w-full h-fit mt-5">
      <ReactEchart option={mapChartOption} />
    </div>
  );
};
export default MapPage;
