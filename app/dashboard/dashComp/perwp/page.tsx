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
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { downloadToExcel } from "@/lib/xlsx";
import GenericSkeleton from "@/components/skeleton/SkeletonGeneral";

const PerWPTablePage = ({ className }: { className?: string }) => {
  const [page, setPage] = useState(1);
  const { filterData, parseFilterData } = useFilterData();
  const cleanFilterData = parseFilterData(filterData) || {};
  const queryParamsString = querystring.stringify(cleanFilterData);
  const paginatedQueryString = queryParamsString + `&page=${page}`;

  const { data, isLoading, error } = useQuery<TPerWP[]>({
    queryKey: ["perwp", paginatedQueryString],
    queryFn: () =>
      fetch(`http://127.0.0.1:3000/api/datatable/wp?${paginatedQueryString}`, {
        cache: "no-store",
      }).then((res) => res.json()),
    placeholderData: keepPreviousData,
  });
  return (
    <main
      className={cn(
        "w-full h-full border-[1px] border-foreground-10 rounded-md shadow-md bg-background",
        className
      )}
    >
      {isLoading || data?.length === 0 ? (
        <GenericSkeleton />
      ) : (
        <>
          <div className="text-center text-background  p-0 space-y-0 py-3 rounded-t-md bg-accent-foreground">
            <p className="font-bold text-background ">
              Detail per Wajib Pajak YoY
            </p>
            <p className="font-mono text-sm text-backgroundd">
              10 Wajib Pajak Besar berdasarkan penerimaan netto
            </p>
          </div>

          <PerWPTableData columns={columns} data={data || []} />
          <div className="flex justify-start items-center gap-2 px-2 rounded-md mt-2 bg-accent-foreground py-5">
            <Button
              onClick={() => setPage(page - 1)}
              className="bg-primary-foreground text-accent-foreground"
            >
              Previous
            </Button>
            <Button
              onClick={() => setPage(page + 1)}
              className="bg-primary-foreground text-accent-foreground"
            >
              Next
            </Button>
            <Button
              variant="default"
              onClick={() => downloadToExcel(data || [])}
              className="bg-primary-foreground text-accent-foreground"
            >
              Export Excel
            </Button>

            <Button variant="outline" className="font-medium font-mono ">
              <TbReload
                className={classNames({
                  "mr-2 h-4 w-4": true,
                  "animate-spin": isLoading,
                })}
              />
              Halaman: {page}
            </Button>
          </div>
        </>
      )}

      {/* </CardContent>
      </Card> */}
    </main>
  );
};
export default PerWPTablePage;

{
  /* <Card className="w-full px-5 ">
        <CardHeader className="text-center font-bold text-background  p-0 space-y-0 bg-foreground py-3 rounded-md mt-1">
          Detail per Wajib Pajak YoY
        </CardHeader>
        <CardContent className="p-0 flex flex-col items-center justify-center max-w-full h-full"> */
}
