"use client";
import useFilterData from "@/app/store/useFilterData";
import { TSektorRes } from "@/app/types/types";
import { useQuery } from "@tanstack/react-query";
import querystring from "querystring";
import dynamic from "next/dynamic";
import { convertNominal } from "./nominalConverter";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { dark, light } from "@/constant/colorPallette";
import GenericSkeleton from "@/components/skeleton/SkeletonGeneral";
import { useTheme } from "next-themes";
import { DownloadCloud } from "lucide-react";
import { perSektor } from "@/lib/xlsx";
const ReactEchart = dynamic(() => import("echarts-for-react"), { ssr: false });

const SektorPage = ({ className }: { className?: string }) => {
  const { theme } = useTheme();
  const { filterData, parseFilterData } = useFilterData();
  const cleanFilterData = parseFilterData(filterData) || {};
  const queryParamsString = querystring.stringify(cleanFilterData);

  const { data, isLoading, error } = useQuery<TSektorRes>({
    queryKey: ["sektor", queryParamsString],
    queryFn: () =>
      fetch("http://127.0.0.1:3000/api/sektor?" + queryParamsString, {
        cache: "no-store",
      }).then((res) => res.json()),
  });

  // const data_sektor = SektorTopn(data?.cy || [], data?.py || [], 5);
  let sektorlabel = data
    ?.sort((a, b) => a.CY - b.CY)
    .map((item) => item.nm_kategori);

  const SektorBarChartOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    toolbox: {
      show: false,
      feature: {
        // dataView: { show: true, readOnly: false },
        saveAsImage: { show: true },
      },
    },
    color: theme === "dark" ? dark : light,
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
      data: sektorlabel,
      //   filter(
      //   (item, index) => sektorlabel.indexOf(item) === index
      // ),
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
        data: data?.map((item) => item.CY),
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
        data: data?.map((item) => item.PY),
      },
    ],
  };

  return (
    <main className={cn("w-full h-full", className)}>
      {isLoading || data?.length === 0 ? (
        <GenericSkeleton />
      ) : (
        <Card className="w-full">
          <CardHeader className="text-center font-bold text-slate-700 dark:text-foreground mt-1 p-0 space-y-0">
            Per Sektor
          </CardHeader>
          <CardContent className="p-0 flex flex-col items-center justify-center relative">
            <ReactEchart
              option={SektorBarChartOption}
              className="w-full h-full p-0"
              style={{
                height: "500px",
                padding: "0px",
                bottom: "0px",
              }}
            />
            <DownloadCloud
              className="absolute top-0 right-5 cursor-pointer dark:bg-foreground  bg-accent-foreground text-white dark:text-accent p-1 rounded-md"
              size={25}
              onClick={() => perSektor(data || [])}
            />
          </CardContent>
        </Card>
      )}
    </main>
  );
};
export default SektorPage;
