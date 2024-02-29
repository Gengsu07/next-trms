import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const GenericSkeleton = () => {
  return (
    <Card className="flex flex-col justify-center items-center gap-5 py-5">
      <Skeleton className="w-4/5 h-10 " />
      <Skeleton className="w-4/5 h-52" />
    </Card>
  );
};
export default GenericSkeleton;
