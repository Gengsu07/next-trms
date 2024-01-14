import { create } from "zustand";
import { FilterType } from "../dashboard/dashboard_component/filter_form";
import { format } from "date-fns";

type FilterState = {
  filterData: FilterType;
  onFilter: (newFilterData: FilterType) => void;
  parseFilterData: (newFilterData: FilterType) => void | {};
};

const CurYear = new Date().getFullYear();
const useFilterData = create<FilterState>((set) => ({
  filterData: {
    tanggal: {
      from: new Date(CurYear, 0, 1),
      to: new Date(),
    },
    admin: [],
    sektor: [],
    map: [],
    kjs: [],
    npwp: undefined,
  },
  onFilter: (newFilterData) => {
    // console.log("updating:", newFilterData);
    set({ filterData: newFilterData });
  },
  parseFilterData: (filteredData) => {
    const { tanggal, admin, sektor, map, kjs, npwp } = filteredData;
    const formatDate = (dateString: Date) => {
      return dateString
        ? format(new Date(dateString), "yyyy-MM-dd")
        : undefined;
    };
    const parsedData = {
      from: formatDate(tanggal.from),
      to: formatDate(tanggal.to),
      ...(admin &&
        admin.length > 0 && { admin: admin.map(({ value }) => value) }),
      ...(sektor &&
        sektor.length > 0 && { sektor: sektor.map(({ value }) => value) }),
      ...(map && map.length > 0 && { map: map.map(({ value }) => value) }),
      ...(kjs && kjs.length > 0 && { kjs: kjs.map(({ value }) => value) }),
      ...(npwp !== undefined && npwp.trim().length > 0 && { npwp }),
    };

    return parsedData;
  },
}));
export default useFilterData;
