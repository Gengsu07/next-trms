"use client";
import useFilterData from "@/app/store/useFilterData";
import { TMap } from "@/app/types/types";
import { useQuery } from "@tanstack/react-query";
import querystring from "querystring";
import dynamic from "next/dynamic";
import { convertNominal } from "./nominalConverter";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const ReactEchart = dynamic(() => import("echarts-for-react"), { ssr: false });
const MapPage = ({ className }: { className?: string }) => {
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
  console.log(data);

  const mapChartOption = {
    // title: { text: "Per Jenis Pajak", left: "center", top: "auto" },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: ["tahun ini", "tahun lalu"],
      bottom: 0,
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
        stack: "total",
        label: {
          show: true,
          position: "inside",
          formatter: (params: any) => convertNominal(params.value),
        },
        emphasis: {
          focus: "series",
        },

        data: data?.cy.map((item) => item._sum.nominal),
      },
      {
        name: "tahun lalu",
        type: "bar",
        stack: "total",
        label: {
          show: true,
          position: "inside",
          formatter: (params: any) => convertNominal(params.value),
        },
        emphasis: {
          focus: "series",
        },
        data: data?.py.map((item) => item._sum.nominal),
      },
    ],
  };

  return (
    <div className={cn("w-full h-fit", className)}>
      <Card className="w-full py-3">
        <CardHeader className="text-center font-bold text-slate-700">
          Per Jenis Pajak
        </CardHeader>
        <CardContent>
          <ReactEchart option={mapChartOption} className="h-fit" />
        </CardContent>
      </Card>
    </div>
  );
};
export default MapPage;
