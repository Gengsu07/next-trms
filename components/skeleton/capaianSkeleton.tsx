import { Skeleton } from "../ui/skeleton";

const skeletonCapaian = () => {
  return (
    <div className="w-full h-full">
      <Skeleton className="w-full h-5 p-5 rounded-lg" />
      <Skeleton className="w-4/5 h-full p-5 rounded-full mt-5" />
    </div>
  );
};
export default skeletonCapaian;
