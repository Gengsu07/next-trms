import { Button } from "@/components/ui/button";
import { DivideSquare } from "lucide-react";
import { AiFillFilter } from "react-icons/ai";

const CollapsePage = ({ setIsCollapsed }: { setIsCollapsed: () => void }) => {
  return (
    <div className="flex flex-col justify-start items-center py-2 sm:py-14 w-full md:w-16 h-14 md:h-screen  sticky">
      <div
        onClick={setIsCollapsed}
        className="flex justify-end items-center gap-0 mx-1 w-full h-8 cursor-pointer border-[1px]-slate-100 border-foreground hover:bg-transparent hover:opacity-10 rounded-md"
      >
        <div className="flex justify-center items-center w-full h-full pl-1">
          <AiFillFilter size={20} />
        </div>
        {/* <p className="text-xs font-mono w-11">filter</p> */}
      </div>
    </div>
  );
};
export default CollapsePage;
