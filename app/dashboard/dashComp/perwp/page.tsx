"use client";
import useFilterData from "@/app/store/useFilterData";
import { useQuery } from "@tanstack/react-query";
import querystring from "querystring";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import PerWPTableData from "./data-table";
import { columns } from "./columns";
import { TPerWP } from "@/app/types/types";
import { cn } from "@/lib/utils";

const PerWPTablePage = ({ className }: { className?: string }) => {
  const { filterData, parseFilterData } = useFilterData();
  const cleanFilterData = parseFilterData(filterData) || {};
  const queryParamsString = querystring.stringify(cleanFilterData);

  const { data, isFetching, error } = useQuery<TPerWP[]>({
    queryKey: ["perwp", queryParamsString],
    queryFn: () =>
      fetch("http://127.0.0.1:3000/api/datatable/wp?" + queryParamsString, {
        cache: "no-store",
      }).then((res) => res.json()),
  });
  return (
    <div className={cn("w-full h-full", className)}>
      <PerWPTableData columns={columns} data={data || []} />
    </div>
  );
};
export default PerWPTablePage;
