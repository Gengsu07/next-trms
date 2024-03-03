"use client";
import useFilterData from "@/app/store/useFilterData";
import querystring from "querystring";
import { TiMinus, TiPlus } from "react-icons/ti";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { TKPI, TResponseData } from "@/app/types/types";
import { convertNominal } from "./nominalConverter";
import { Skeleton } from "@/components/ui/skeleton";
import KPISkeleton from "@/components/skeleton/KPI";

const KPI = () => {
  const { filterData, parseFilterData } = useFilterData();
  const cleanFilterData = parseFilterData(filterData) || {};
  const queryParamsString = querystring.stringify(cleanFilterData);

  // console.log("http://localhost:3000/api/kpi?" + queryParamsString);

  const {
    data: data_kpi,
    isLoading,
    error,
  } = useQuery<TResponseData[]>({
    queryKey: ["kpi", queryParamsString],
    queryFn: () =>
      fetch("http://127.0.0.1:3000/api/test?" + queryParamsString, {
        cache: "no-store",
      }).then((res) => res.json()),
  });
  const skeletonkpi = [1, 2, 3, 4, 5];
  // const { netto, bruto, restitusi } = data || {};
  // console.log(data_kpi);
  return (
    <section className="grid grid-cols-1 md:grid-cols-5 gap-2  w-full h-fit bg-background-primary">
      {isLoading ? (
        skeletonkpi.map((item) => (
          <Card className="w-full md:w-auto" key={item}>
            <CardHeader>
              <Skeleton className="w-full h-5 p-0" />
            </CardHeader>
            <CardContent>
              <Skeleton className="w-full h-7 p-0 m-0" />
            </CardContent>
          </Card>
        ))
      ) : (
        <>
          {data_kpi?.map((item) => (
            <Card className="w-full md:w-auto" key={item.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium ">
                  {item.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className=" flex flex-col md:flex-row justify-between items-center flex-nowrap gap-2 ">
                  <p className="text-sm md:text-md lg:text-lg font-bold">
                    {convertNominal(item?.value?.cy)}
                  </p>
                  <div className="flex justify-start items-center space-x-2">
                    {item?.label === "Restitusi" ? (
                      item?.value?.yoy > 0 ? (
                        <TiPlus color="red" />
                      ) : (
                        <TiMinus color="green" />
                      )
                    ) : item?.value?.yoy > 0 ? (
                      <TiPlus color="green" />
                    ) : (
                      <TiMinus color="red" />
                    )}

                    <p>{`${item?.value?.yoy?.toFixed(2)}%`}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </>
      )}
    </section>
  );
};
export default KPI;
