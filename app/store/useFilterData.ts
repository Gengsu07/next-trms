import { create } from "zustand";
import { FilterType } from "../dashboard/dashboard_component/filter_form";

type FilterState = {
  filterData: FilterType;
  onFilter: (newFilterData: FilterType) => void;
};

const useFilterData = create<FilterState>((set) => ({
  filterData: {
    tanggal: {
      from: new Date(),
      to: new Date(),
    },
    admin: [],
    sektor: [],
    map: [],
    kjs: [],
    npwp: undefined,
  },
  onFilter: (newFilterData) => set({ filterData: newFilterData }),
}));
export default useFilterData;
