"use client";
import useFilterData from "@/app/store/useFilterData";
import { TTrend } from "@/app/types/types";
import GenericSkeleton from "@/components/skeleton/SkeletonGeneral";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import querystring from "querystring";
import { symbol } from "zod";
import TableView from "../dashboard/dashComp/TableView";

const CekPage = ({ className }: { className?: string }) => {
  const { filterData, parseFilterData } = useFilterData();
  const cleanFilterData = parseFilterData(filterData) || {};
  const queryParamsString = querystring.stringify(cleanFilterData);

  const { data, isLoading, error } = useQuery<TTrend>({
    queryKey: ["tren", queryParamsString],
    queryFn: () =>
      fetch("http://127.0.0.1:3000/api/map?" + queryParamsString, {
        cache: "no-store",
      }).then((res) => res.json()),
  });

  return (
    <div>
      <TableView columns={["map", "CY", "PY"]} data={data} />
    </div>
  );
};
export default CekPage;
