"use client";
import useFilterData from "@/app/store/useFilterData";
import { TSektorMap } from "@/app/types/types";
import { useQuery } from "@tanstack/react-query";
import querystring from "querystring";
import dynamic from "next/dynamic";
import { convertNominal } from "./nominalConverter";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { dark } from "@/constant/colorPallette";
import { DownloadCloud } from "lucide-react";
import GenericSkeleton from "@/components/skeleton/SkeletonGeneral";
const ReactEchart = dynamic(() => import("echarts-for-react"), { ssr: false });
import { SektorMAP_data } from "@/lib/xlsx";

const SektorMap = ({ className }: { className?: string }) => {
  // const { theme } = useTheme();
  const { filterData, parseFilterData } = useFilterData();
  const cleanFilterData = parseFilterData(filterData) || {};
  const queryParamsString = querystring.stringify(cleanFilterData);

  const { data, isLoading, error } = useQuery<TSektorMap>({
    queryKey: ["sektormap", queryParamsString],
    queryFn: () =>
      fetch("http://127.0.0.1:3000/api/sektormap?" + queryParamsString, {
        cache: "no-store",
      }).then((res) => res.json()),
  });
  // console.log("http://127.0.0.1:3000/api/sektormap?" + queryParamsString);

  const sektormapoption = {
    // title: {
    //   text: "Node Align Left",
    // },
    tooltip: {
      trigger: "item",
      triggerOn: "mousemove",
    },
    toolbox: {
      show: false,
      feature: {
        dataView: { show: true, readOnly: false },
        saveAsImage: { show: true },
      },
    },
    animation: false,
    series: [
      {
        type: "sankey",
        emphasis: {
          focus: "adjacency",
        },
        nodeAlign: "right",
        data: data?.nodes || [],
        links: data?.links || [],
        lineStyle: {
          color: "source",
          curveness: 0.5,
        },
      },
    ],
  };
  return (
    <main className={cn("w-full h-full", className)}>
      {isLoading || data?.nodes.length === 0 ? (
        <GenericSkeleton />
      ) : (
        <Card className="w-full">
          <CardHeader className="text-center font-bold text-slate-700 dark:text-foreground mt-1 p-0 space-y-0">
            Sebaran Sektor ke Jenis Pajak
          </CardHeader>
          <CardContent className="p-0 flex flex-col items-center justify-center relative">
            <ReactEchart
              option={sektormapoption}
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
              onClick={() => SektorMAP_data(data?.links || [])}
            />
          </CardContent>
        </Card>
      )}
    </main>
  );
};
export default SektorMap;
