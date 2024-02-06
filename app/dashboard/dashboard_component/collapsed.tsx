import { Button } from "@/components/ui/button";
import { AiFillFilter } from "react-icons/ai";

const CollapsePage = ({ setIsCollapsed }: { setIsCollapsed: () => void }) => {
  return (
    <div className="flex flex-col justify-start items-center  py-2 sm:py-14 px-3 w-full md:w-20 h-14 md:h-screen border-[2px] border-accent bg-card rounded-md shadow-md ">
      <Button onClick={setIsCollapsed}>
        <AiFillFilter />
      </Button>
    </div>
  );
};
export default CollapsePage;
