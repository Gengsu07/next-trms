"use client";
import useFilterData from "@/app/store/useFilterData";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import querystring from "querystring";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import PerWPTableData from "./data-table";
import { columns } from "./columns";
import { TPerWP } from "@/app/types/types";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TbReload } from "react-icons/tb";
import classNames from "classnames";

const PerWPTablePage = ({ className }: { className?: string }) => {
  const [page, setPage] = useState(1);
  const { filterData, parseFilterData } = useFilterData();
  const cleanFilterData = parseFilterData(filterData) || {};
  const queryParamsString = querystring.stringify(cleanFilterData);
  const paginatedQueryString = queryParamsString + `&page=${page}`;

  const { data, isFetching, error } = useQuery<TPerWP[]>({
    queryKey: ["perwp", paginatedQueryString],
    queryFn: () =>
      fetch(`http://127.0.0.1:3000/api/datatable/wp?${paginatedQueryString}`, {
        cache: "no-store",
      }).then((res) => res.json()),
    placeholderData: keepPreviousData,
  });
  return (
    <main className={cn("w-full h-full", className)}>
      <Card className="w-full px-5 border-2 border-foreground">
        <CardHeader className="text-center font-bold text-background  p-0 space-y-0 bg-foreground py-3 rounded-md mt-1">
          Detail per Wajib Pajak YoY
        </CardHeader>
        <CardContent className="p-0 flex flex-col items-center justify-center w-full h-full">
          <PerWPTableData columns={columns} data={data || []} />
          <div className="flex justify-center items-center gap-2 py-4 w-full px-5 bg-foreground rounded-md">
            <Button variant="outline" className="font-medium font-mono ">
              <TbReload
                className={classNames({
                  "mr-2 h-4 w-4": true,
                  "animate-spin": isFetching,
                })}
              />
              Halaman: {page}
            </Button>
            <Button onClick={() => setPage(page - 1)}>Previous</Button>

            <Button onClick={() => setPage(page + 1)}>Next</Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};
export default PerWPTablePage;
