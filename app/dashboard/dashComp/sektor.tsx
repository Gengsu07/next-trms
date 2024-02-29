"use client";
import useFilterData from "@/app/store/useFilterData";
import { TSektor } from "@/app/types/types";
import { useQuery } from "@tanstack/react-query";
import querystring from "querystring";
import dynamic from "next/dynamic";
import { convertNominal } from "./nominalConverter";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SektorTopn } from "@/components/transform/topn";
import { dark } from "@/constant/colorPallette";
import GenericSkeleton from "@/components/skeleton/SkeletonGeneral";
const ReactEchart = dynamic(() => import("echarts-for-react"), { ssr: false });

const SektorPage = ({ className }: { className?: string }) => {
  // const { theme } = useTheme();
  const { filterData, parseFilterData } = useFilterData();
  const cleanFilterData = parseFilterData(filterData) || {};
  const queryParamsString = querystring.stringify(cleanFilterData);

  const { data, isLoading, error } = useQuery<TSektor>({
    queryKey: ["sektor", queryParamsString],
    queryFn: () =>
      fetch("http://127.0.0.1:3000/api/sektor?" + queryParamsString, {
        cache: "no-store",
      }).then((res) => res.json()),
  });

  const data_sektor = SektorTopn(data?.cy || [], data?.py || [], 5);
  let sektorlabel = data_sektor?.cy
    ?.sort((a, b) => a.sum - b.sum)
    .map((item) => item.nm_sektor);

  const SektorBarChartOption = {
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
    color: dark,
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
        barMinWidth: 23,
        label: {
          show: true,
          fontSize: 11,
          formatter: (params: any) => `${convertNominal(params.value)}`,
          align: "right",
        },
        data: data_sektor.cy?.map((item) => item.sum),
      },
      {
        name: "tahun lalu",
        type: "bar",
        barMinWidth: 23,
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
        data: data_sektor.py?.map((item) => item.sum),
      },
    ],
  };

  return (
    <main className={cn("w-full h-full", className)}>
      {isLoading || data?.cy?.length === 0 ? (
        <GenericSkeleton />
      ) : (
        <Card className="w-full">
          <CardHeader className="text-center font-bold text-slate-700 dark:text-foreground mt-1 p-0 space-y-0">
            Per Sektor
          </CardHeader>
          <CardContent className="p-0 flex flex-col items-center justify-center">
            <ReactEchart
              option={SektorBarChartOption}
              className="w-full h-full p-0"
              style={{
                height: "450px",
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
export default SektorPage;
