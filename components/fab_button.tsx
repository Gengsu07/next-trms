import { LucideBrainCircuit } from "lucide-react";
import { Button } from "./ui/button";

const FAB_Filter = () => {
  return (
    <Button
      variant="outline"
      className="absolute bottom-4 right-4 bg-accent-foreground  hover:bg-primary  text-white px-4 w-auto h-12  flex justify-center items-center gap-1 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none rounded-full"
    >
      <LucideBrainCircuit />
      <span className="text-sm font-mono">Filter Data</span>
    </Button>
  );
};
export default FAB_Filter;
