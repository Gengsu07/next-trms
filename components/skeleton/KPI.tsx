import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const KPISkeleton = () => {
  const card = [1, 2, 3, 4, 5];
  return (
    <section className="grid grid-cols-1 md:grid-cols-5 gap-2  w-full h-fit bg-background-primary">
      {card.map((item) => (
        <Card className="w-full md:w-auto" key={item}>
          <Skeleton />
        </Card>
      ))}
    </section>
  );
};
export default KPISkeleton;
