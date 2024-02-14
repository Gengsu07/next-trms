"use client";
import useFilterData from "@/app/store/useFilterData";
import { useQuery } from "@tanstack/react-query";
import querystring from "querystring";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { convertNominal } from "./nominalConverter";
const ReactEchart = dynamic(() => import("echarts-for-react"), { ssr: false });
import { TKPP } from "@/app/types/types";
import { cn } from "@/lib/utils";
import { colors } from "@/constant/colorPallette";

const Adm = ({ className }: { className?: string }) => {
  const { filterData, parseFilterData } = useFilterData();
  const cleanFilterData = parseFilterData(filterData) || {};
  const queryParamsString = querystring.stringify(cleanFilterData);

  const { data, isFetching, error } = useQuery<TKPP>({
    queryKey: ["kpp", queryParamsString],
    queryFn: () =>
      fetch("http://127.0.0.1:3000/api/kpp?" + queryParamsString, {
        cache: "no-store",
      }).then((res) => res.json()),
  });

  const kppChartOption = {
    color: colors,
    tooltip: {
      trigger: "item",
    },
    toolbox: {
      show: true,
      feature: {
        dataView: { show: true, readOnly: false },
        saveAsImage: { show: true },
      },
    },
    legend: {
      show: false,
      top: "5%",
      left: "center",
    },
    series: [
      {
        name: "KPP",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
          position: "inside",
          formatter: `{b}`,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: data,
      },
    ],
  };
  return (
    <main className={cn("w-full h-full", className)}>
      <Card className="w-full">
        <CardHeader className="text-center font-bold text-slate-700 dark:text-foreground mt-1 p-0 space-y-0">
          Per KPP
        </CardHeader>
        <CardContent className="p-0 flex flex-col items-center justify-center">
          <ReactEchart
            option={kppChartOption}
            className="w-full h-full p-0"
            style={{
              height: "256px",
              padding: "0px",
              bottom: "0px",
            }}
          />
        </CardContent>
      </Card>
    </main>
  );
};
export default Adm;
