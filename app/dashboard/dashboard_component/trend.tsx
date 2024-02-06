"use client";
import useFilterData from "@/app/store/useFilterData";
import { TTrend } from "@/app/types/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import querystring from "querystring";

const ReactEchart = dynamic(() => import("echarts-for-react"), { ssr: false });

const TrendPage = ({ className }: { className?: string }) => {
  const { filterData, parseFilterData } = useFilterData();
  const cleanFilterData = parseFilterData(filterData) || {};
  const queryParamsString = querystring.stringify(cleanFilterData);

  const { data, isFetching, error } = useQuery<TTrend>({
    queryKey: ["trend", queryParamsString],
    queryFn: () =>
      fetch("http://127.0.0.1:3000/api/trend?" + queryParamsString, {
        cache: "no-store",
      }).then((res) => res.json()),
  });

  const areaChartOption = {
    // title: { text: "Trend Penerimaan YoY", left: "center", top: "auto" },
    xAxis: {
      type: "category",
      data: data?.cy.map((item) => item.datebayar),
      axisLabel: {
        show: true,
        formatter: function (value: Date) {
          // Customize the date format as needed
          const date = new Date(value);
          const formattedDate = `${date.getFullYear()}-${
            date.getMonth() + 1
          }-${date.getDate()}`;
          return formattedDate;
        },
        rotate: 45, // Rotate the labels for better visibility
        interval: 7, // Display all labels
      },
    },
    yAxis: {
      type: "value",
      show: false,
    },
    tooltip: {
      show: true,
      trigger: "axis",
      formatter: function (params: any) {
        const date = new Date(params[0].axisValue);
        const formattedDate = `${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()}`;
        const formattedValue = Number(params[0].value).toLocaleString("id-ID");
        return `Date: ${formattedDate}<br />Value: ${formattedValue}`;
      },
    },
    legend: {
      data: ["tahun ini", "tahun lalu"],
      show: true,
      orient: "vertical",
      right: 5,
    },
    series: [
      {
        name: "tahun ini",
        data: data?.cy.map((item) => item._sum.nominal),
        type: "line",
        areaStyle: { color: "rgba(255,202,25,1)" },
        itemStyle: {
          color: "rgba(255,202,25,1)",
        },
        smooth: true,
      },
      {
        name: "tahun lalu",
        data: data?.py.map((item) => item._sum.nominal),
        type: "line",
        areaStyle: { color: "rgb(0,95,173)" },
        itemStyle: { color: "rgb(0,95,173)" },
        smooth: true,
      },
    ],
  };
  return (
    <div className={cn("w-full h-fit", className)}>
      <Card className="w-full h-full">
        <CardHeader className="text-center font-bold text-slate-700 mt-1 p-0 space-y-0">
          Trend
        </CardHeader>
        <CardContent className="p-0 flex flex-col items-center justify-center">
          <ReactEchart
            option={areaChartOption}
            className="w-full h-full p-0"
            style={{
              padding: "0px",
              bottom: "0px",
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};
export default TrendPage;
