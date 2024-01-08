import FilterData from "@/components/Filter";
import { prisma } from "@/prisma/client";

const KPI = async () => {
  const bruto = await prisma.mpn.aggregate({
    _sum: {
      nominal: true,
    },
    where: {
      ket: {
        in: ["MPN", "SPM"],
      },
    },
  });
  return (
    <section className="flex flex-col justify-center items-center gap-1  w-full h-full mx-auto bg-background-primary">
      <FilterData />
      <div className="flex justify-center items-center w-full h-full ">
        <p>{data._sum.nominal}</p>
      </div>
    </section>
  );
};
export default KPI;
