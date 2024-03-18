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
const ReactEchart = dynamic(() => import("echarts-for-react"), { ssr: false });

const Topwp = ({ className }: { className?: string }) => {
  const { filterData, parseFilterData } = useFilterData();
  const cleanFilterData = parseFilterData(filterData) || {};
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
        <Card className="w-full">
          <CardHeader className="text-center font-bold text-slate-700 dark:text-foreground mt-1 p-0 space-y-0">
            Top & Bottom 5 WP
          </CardHeader>
          <CardContent className="p-0 flex flex-col items-center justify-center">
            <ReactEchart
              option={topwp_option}
              className="w-full h-full p-0"
              style={{
                height: "350px",
                padding: "0px",
                bottom: "0px",
              }}
            />
          </CardContent>
        </Card>
      )}
    </main>
  );
};
export default Topwp;
