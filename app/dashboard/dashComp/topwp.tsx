"use client";
import useFilterData from "@/app/store/useFilterData";
import { TTopWP } from "@/app/types/types";
import { useQuery } from "@tanstack/react-query";
import querystring from "querystring";
import dynamic from "next/dynamic";
import { convertNominal } from "./nominalConverter";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SektorTopn } from "@/components/transform/topn";
import { dark, light_colorscale } from "@/constant/colorPallette";
import GenericSkeleton from "@/components/skeleton/SkeletonGeneral";
import { color } from "echarts";
import { useState } from "react";
import { DownloadCloud, Eye } from "lucide-react";
import { exportTopBotWP } from "@/lib/xlsx";
import TableView from "./TableView";
const ReactEchart = dynamic(() => import("echarts-for-react"), { ssr: false });

const Topwp = ({ className }: { className?: string }) => {
  const { filterData, parseFilterData } = useFilterData();
  const cleanFilterData = parseFilterData(filterData) || {};
  const [dataview, setViewData] = useState(false);
  const queryParamsString = querystring.stringify(cleanFilterData);

  const { data, isLoading, error } = useQuery<TTopWP>({
    queryKey: ["topwp", queryParamsString],
    queryFn: () =>
      fetch("http://127.0.0.1:3000/api/topwp?" + queryParamsString, {
        cache: "no-store",
      }).then((res) => res.json()),
  });

  const topwp_option = {
    tooltip: {
      trigger: "item",
      formatter: (params: any) =>
        `${params.name} :${convertNominal(params.value)}`,
    },
    toolbox: {
      show: false,
      feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {},
      },
    },

    series: [
      {
        name: "top",
        type: "funnel",
        left: "10%",
        top: "5%",
        width: "70%",
        height: "45%",
        sort: "descending",
        funnelAlign: "left",
        gap: 2,
        label: {
          show: true,
          position: "outside",
          formatter: (params: any) =>
            `${params.name}: ${convertNominal(params.value)}`,
        },
        labelLine: {
          length: 10,
          lineStyle: {
            width: 1,
            type: "solid",
          },
        },
        itemStyle: {
          borderColor: "#fff",
          borderWidth: 1,
        },
        emphasis: {
          label: {
            fontSize: 20,
          },
        },
        data: data?.top || [],
      },
      {
        name: "bottom",
        type: "funnel",
        width: "70%",
        height: "45%",
        left: "10%",
        top: "50%",
        funnelAlign: "left",
        sort: "descending",
        colorBy: data?.bottom,
        label: {
          show: true,
          position: "outside",
          formatter: (params: any) =>
            `${params.name}: ${convertNominal(params.value)}`,
        },
        data: data?.bottom || [],
      },
    ],
  };
  return (
    <main className={cn("w-full h-full", className)}>
      {isLoading || data?.top.length === 0 ? (
        <GenericSkeleton />
      ) : (
        <>
          {dataview ? (
            <div className="relative flex-col sm:flex-row gap-1 h-full ">
              <Card className="overflow-auto h-full flex-grow">
                <CardContent>
                  <TableView
                    columns={["name", "value"]}
                    data={data?.top}
                    className="overflow-y-scroll "
                  />
                  <TableView
                    columns={["name", "value"]}
                    data={data?.bottom}
                    className="overflow-y-scroll "
                  />
                </CardContent>
              </Card>
              <Eye
                className="absolute top-5 right-5 cursor-pointer dark:bg-foreground  bg-accent-foreground text-white dark:text-accent p-1 rounded-md z-50"
                size={25}
                onClick={() => setViewData(!dataview)}
                fill=""
              />
            </div>
          ) : (
            <Card className="w-full">
              <CardHeader className="text-center font-bold text-slate-700 dark:text-foreground mt-1 p-0 space-y-0">
                Top & Bottom 5 WP
              </CardHeader>
              <CardContent className="p-0 flex flex-col items-center justify-center relative">
                <ReactEchart
                  option={topwp_option}
                  className="w-full h-full p-0"
                  style={{
                    height: "500px",
                    padding: "0px",
                    bottom: "0px",
                  }}
                />

                <Eye
                  className="absolute top-0 right-12 cursor-pointer dark:bg-foreground  bg-accent-foreground text-white dark:text-accent p-1 rounded-md"
                  size={25}
                  onClick={() => setViewData(!dataview)}
                  fill=""
                />
                <DownloadCloud
                  className="absolute top-0 right-5 cursor-pointer dark:bg-foreground  bg-accent-foreground text-white dark:text-accent p-1 rounded-md"
                  size={25}
                  onClick={() => exportTopBotWP(data)}
                  fill=""
                />
              </CardContent>
            </Card>
          )}
        </>
      )}
    </main>
  );
};
export default Topwp;
