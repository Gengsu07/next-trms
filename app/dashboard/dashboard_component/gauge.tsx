"use client";
import useFilterData from "@/app/store/useFilterData";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import querystring from "querystring";
const ReactEchart = dynamic(() => import("echarts-for-react"), { ssr: false });

interface TCapaian {
  label: string;
  value: {
    cy: number;
    cy_internal: number;
    py: number;
    naik: number;
    yoy: number;
  };
}

const Capaian = ({ className }: { className?: string }) => {
  const { filterData, parseFilterData } = useFilterData();
  const cleanFilterData = parseFilterData(filterData) || {};
  const queryParamsString = querystring.stringify(cleanFilterData);

  //   console.log("http://localhost:3000/api/capaian?" + queryParamsString);
  const { data, isFetching, error } = useQuery<TCapaian>({
    queryKey: ["capaian", queryParamsString],
    queryFn: () =>
      fetch("http://127.0.0.1:3000/api/capaian?" + queryParamsString, {
        cache: "no-store",
      }).then((res) => res.json()),
  });
  const gaugeData = [
    {
      value: data?.value?.cy.toFixed(2),
      name: "APBN",
      title: {
        offsetCenter: ["-40%", "80%"],
      },
      detail: {
        offsetCenter: ["-40%", "95%"],
      },
    },
    {
      value: data?.value?.cy_internal.toFixed(2),
      name: "Internal",
      title: {
        offsetCenter: ["40%", "80%"],
      },
      detail: {
        offsetCenter: ["40%", "95%"],
      },
    },
  ];
  const gaugeChartOption = {
    series: [
      {
        type: "gauge",
        anchor: {
          show: true,
          showAbove: true,
          size: 18,
          itemStyle: {
            color: "#FAC858",
          },
        },
        pointer: {
          icon: "path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z",
          width: 8,
          length: "80%",
          offsetCenter: [0, "8%"],
        },
        progress: {
          show: true,
          overlap: true,
          roundCap: true,
        },
        axisLine: {
          roundCap: true,
        },
        data: gaugeData,
        title: {
          fontSize: 14,
        },
        detail: {
          width: 40,
          height: 14,
          fontSize: 14,
          color: "#fff",
          backgroundColor: "inherit",
          borderRadius: 3,
          formatter: "{value}%",
        },
      },
    ],
  };
  return (
    <main className={cn("w-full", className)}>
      <Card className="w-full h-full">
        <CardHeader className="text-center font-bold text-slate-700 mt-1 p-0 space-y-0">
          Capaian
        </CardHeader>
        <CardContent className="p-0 flex flex-col items-center justify-center">
          <ReactEchart
            option={gaugeChartOption}
            className="w-full h-full p-0"
            style={{
              height: "300px",
              width: "400px",
              padding: "0px",
              bottom: "0px",
            }}
          />
        </CardContent>
      </Card>
    </main>
  );
};
export default Capaian;
