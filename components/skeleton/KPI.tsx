import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const KPISkeleton = () => {
  const card = [1, 2, 3, 4, 5];
  return (
    <section className="flex flex-row items-center justify-between space-y-0 pb-2 gap-5 w-full">
      {card.map((item) => (
        <Card className="w-full md:w-auto" key={item}>
          <CardHeader>
            <Skeleton className="w-full h-5 p-0" />
          </CardHeader>
          <CardContent>
            <Skeleton className="w-full h-7 p-0 m-0" />
          </CardContent>
        </Card>
      ))}
    </section>
  );
};
export default KPISkeleton;
