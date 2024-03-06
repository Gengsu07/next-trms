"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useFilterData from "../store/useFilterData";
import { parsedData } from "../types/types";
import { kpp, sektor, map } from "@/constant/initialData";
import { cn } from "@/lib/utils";
import classNames from "classnames";
import { usePathname } from "next/navigation";

const DashboardInfo = () => {
  const PathName = usePathname().replace("/", "");
  const { filterData, parseFilterData } = useFilterData();
  const cleanFilterData: parsedData = parseFilterData(filterData) || {
    from: "" || undefined,
    to: "" || undefined,
  };

  const totalCount = Object.values(cleanFilterData).reduce((acc, curr) => {
    if (Array.isArray(curr)) {
      return acc + curr.length;
    }
    return acc + 1; // Count non-array values as 1
  }, 0);

  const unit = kpp.filter((item) =>
    cleanFilterData.admin?.some((admin) => admin === item.value)
  );
  const nm_sektor = sektor.filter((item) =>
    cleanFilterData.sektor?.some((sektor) => sektor === item.value)
  );
  const nm_map = map.filter((item) =>
    cleanFilterData.map?.some((map) => map === item.value)
  );
  console.log(typeof PathName);
  return (
    <Card
      className={classNames({
        "min-h-24 px-2 py-5": totalCount > 10,
        "h-full sm:h-10": totalCount <= 10,
        "flex justify-center items-center gap-0 w-full  py-1 px-2 h-full": true,
      })}
    >
      <CardContent className="w-full h-full flex flex-col sm:flex-row justify-center items-center space-y-1 sm:space-y-0 space-x-1 p-0">
        <p className="font-bold">
          {cleanFilterData.admin
            ? unit?.map((item) => item.label).join(" - ")
            : "Kanwil DJP Jakarta Timur"}
        </p>
        <p className="text-xs mt-0">
          {cleanFilterData.from} - {cleanFilterData.to}
        </p>

        <p className="text-xs p-0">
          {cleanFilterData.sektor
            ? nm_sektor.map((item) => item.label).join(" - ")
            : "All Sektor"}
        </p>
        <p>-</p>
        <p className="text-xs p-0">
          {cleanFilterData.map
            ? nm_map.map((item) => item.label).join(" - ")
            : "All MAP"}
        </p>
        <p>-</p>
        <p className="text-xs p-0">
          {cleanFilterData.kjs
            ? cleanFilterData.kjs.map((item) => item).join(" - ")
            : "All KJS"}
        </p>
        {cleanFilterData.npwp && <p>-</p>}
        <p className="text-xs p-0">
          {cleanFilterData.npwp ? cleanFilterData.npwp : ""}
        </p>
      </CardContent>
    </Card>
  );
};
export default DashboardInfo;
