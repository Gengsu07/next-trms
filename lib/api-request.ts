import useFilterData from "@/app/store/useFilterData";
import querystring from "querystring";
import { TResponseData } from "@/app/types/types";

export async function GetKPI() {
  const { filterData, parseFilterData } = useFilterData();
  const cleanFilterData = parseFilterData(filterData) || {};
  const queryParamsString = querystring.stringify(cleanFilterData);

  const res = await fetch(
    "http://localhost:3000/api/kpi?" + queryParamsString,
    {
      cache: "no-store",
    }
  ).then((res) => res.json());
  const kpis = res as TResponseData[];
  return kpis;
}
