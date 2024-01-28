import useFilterData from "@/app/store/useFilterData";
import FilterForm, { FilterType } from "./filter_form";
import { use, useState } from "react";
import CollapsePage from "./collapsed";
import { Button } from "@/components/ui/button";
import { AiFillFilter } from "react-icons/ai";
const menus = [
  {
    nomor: 1,
    label: "Penerimaan",
  },
  { nomor: 1, label: "Pengawasan" },
];

const DashboardMenu = ({ setIsCollapsed }: { setIsCollapsed: () => void }) => {
  const { onFilter } = useFilterData();

  return (
    <div className="flex flex-col w-72">
      {menus.map((menu) => (
        <div
          key={menu.nomor}
          className="flex flex-col justify-start items-center gap-5 py-2 px-2"
        >
          <p className="text-md">{menu.label}</p>
        </div>
      ))}

      {/* <FilterForm
        onFilterForm={onFilter}
        setIsCollapsed={onCollapsedFilterForm}
      /> */}
    </div>
  );
};
export default DashboardMenu;
