"use client";
import useFilterData from "@/app/store/useFilterData";
import querystring from "querystring";
import { TiMinus, TiPlus } from "react-icons/ti";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { TResponseData } from "@/app/types/types";

const KPI = () => {
  const { filterData, parseFilterData } = useFilterData();
  const cleanFilterData = parseFilterData(filterData) || {};
  const queryParamsString = querystring.stringify(cleanFilterData);

  // console.log("http://localhost:3000/api/kpi?" + queryParamsString);
  const { data, isFetching, error } = useQuery<TResponseData[]>({
    queryKey: ["kpi", queryParamsString],
    queryFn: () =>
      fetch("http://localhost:3000/api/kpi?" + queryParamsString, {
        cache: "no-store",
      }).then((res) => res.json()),
  });

  // const { netto, bruto, restitusi } = data || {};

  const convertNominal = (nominal: number) => {
    if (nominal > 1000000000000)
      return `${(nominal / 1000000000000).toFixed(2)} T`;
    if (nominal / 1000000000 === 1 || -1)
      return `${(nominal / 1000000000).toFixed(2)} M`;
    if (nominal / 1000000 == 1 || -1)
      return `${(nominal / 1000000).toFixed(2)} Jt`;
  };

  return (
    <section className="flex flex-col sm:flex-row justify-around items-start gap-5  w-full h-full mx-auto  bg-background-primary">
      {data?.map((item) => (
        <Card className="w-full" key={item.label}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className=" flex justify-between items-center flex-nowrap gap-5">
              <p className="text-xl md:text-2xl font-bold">
                {convertNominal(item?.value?.cy)}
              </p>
              <div className="flex justify-start items-center space-x-2">
                {item?.label === "Restitusi" ? (
                  item.value.yoy > 0 ? (
                    <TiPlus color="red" />
                  ) : (
                    <TiMinus color="green" />
                  )
                ) : item.value.yoy > 0 ? (
                  <TiPlus color="green" />
                ) : (
                  <TiMinus color="red" />
                )}

                <p>{`${item.value.yoy.toFixed(2)}%`}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};
export default KPI;
