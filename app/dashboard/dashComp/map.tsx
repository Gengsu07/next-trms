"use client";
import useFilterData from "@/app/store/useFilterData";
import { TMap } from "@/app/types/types";
import { useQuery } from "@tanstack/react-query";
import querystring from "querystring";
import dynamic from "next/dynamic";
import { convertNominal } from "./nominalConverter";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MapTopn } from "@/components/transform/topn";
const ReactEchart = dynamic(() => import("echarts-for-react"), { ssr: false });

const MapPage = ({ className }: { className?: string }) => {
  const { filterData, parseFilterData } = useFilterData();
  const cleanFilterData = parseFilterData(filterData) || {};
  const queryParamsString = querystring.stringify(cleanFilterData);

  const { data, isFetching, error } = useQuery<TMap>({
    queryKey: ["map", queryParamsString],
    queryFn: () =>
      fetch("http://127.0.0.1:3000/api/map?" + queryParamsString, {
        cache: "no-store",
      }).then((res) => res.json()),
  });

  // console.log("http://127.0.0.1:3000/api/map?" + queryParamsString);
  const topcy = MapTopn(data?.cy || [], 5);
  const toppy = MapTopn(data?.py || [], 5);

  let maplabel = [
    ...(topcy?.map((item) => item.map) || []),
    ...(toppy?.map((item) => item.map) || []),
  ];

  const mapChartOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    toolbox: {
      show: true,
      feature: {
        dataView: { show: true, readOnly: false },
        saveAsImage: { show: true },
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
      show: false,
    },
    yAxis: {
      type: "category",
      axisTick: { show: false },
      data: maplabel.filter((item, index) => maplabel.indexOf(item) === index),
    },
    series: [
      {
        name: "tahun ini",
        type: "bar",
        barMinWidth: 20,
        label: {
          show: true,
          fontSize: 11,
          formatter: (params: any) => `${convertNominal(params.value)}`,
          align: "right",
        },
        // itemStyle: {
        //   // Moved itemStyle here
        //   color: function (params) {
        //     return params.dataIndex % 2 === 0 ? "#02275d" : "#ffc91b";
        //   },
        // },
        data: data?.cy?.map((item) => item._sum.nominal),
      },
      {
        name: "tahun lalu",
        type: "bar",
        barMinWidth: 20,
        label: {
          show: true,
          fontSize: 11,
          formatter: (params: any) => `${convertNominal(params.value)}`,
          align: "right",
        },
        // itemStyle: {
        //   // Moved itemStyle here
        //   color: function (params) {
        //     return params.dataIndex % 2 === 0 ? "#02275d" : "#ffc91b";
        //   },
        // },
        data: data?.py?.map((item) => item._sum.nominal),
      },
    ],
  };

  return (
    <div className={cn("w-full h-full", className)}>
      <Card className="w-full">
        <CardHeader className="text-center font-bold text-slate-700 dark:text-foreground mt-1 p-0 space-y-0">
          Per Jenis Pajak
        </CardHeader>
        <CardContent className="p-0 flex flex-col items-center justify-center">
          <ReactEchart
            option={mapChartOption}
            className="w-full h-full p-0"
            style={{
              height: "500px",
              padding: "0px",
              bottom: "0px",
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};
export default MapPage;
