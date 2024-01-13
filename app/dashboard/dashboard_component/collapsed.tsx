import { Button } from "@/components/ui/button";
import { RxDashboard } from "react-icons/rx";

const CollapsePage = ({ setIsCollapsed }: { setIsCollapsed: () => void }) => {
  return (
    <div className="flex flex-col justify-start items-center py-2 sm:py-14 px-3 w-full sm:w-16 h-14 sm:h-full border-[2px] border-accent bg-card rounded-md shadow-md ">
      <Button onClick={setIsCollapsed}>
        <RxDashboard />
      </Button>
    </div>
  );
};
export default CollapsePage;
