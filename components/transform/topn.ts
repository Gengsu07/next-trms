import { sektor } from "@/constant/initialData";
import { Item } from "@radix-ui/react-select";

export const MapTopn = (
  data: { map: string; _sum: { nominal: number } }[],
  n: number
) => {
  data.sort((a, b) => b._sum.nominal - a._sum.nominal);
  const topncy = data.slice(0, n);
  const restSum = data
    .slice(n)
    .reduce((acc, curr) => acc + curr._sum.nominal, 0);
  const lainnya = {
    _sum: {
      nominal: restSum,
    },
    map: "Lainnya",
  };
  topncy.push(lainnya);
  return topncy;
};

export const SektorTopn = (
  data: { sum: number; kd_kategori: string }[],
  n: number
) => {
  data.sort((a, b) => b.sum - a.sum);
  const topncy = data.slice(0, n);
  const restSum = data.slice(n).reduce((acc, curr) => acc + curr.sum, 0);

  const lainnya = {
    sum: restSum,
    kd_kategori: "Lainnya",
  };
  topncy.push(lainnya);
  
  const mergedSektor = 
    topncy.map(item => ({...item,
    nm_sektor:sektor.find(label=> label.value === item.kd_kategori)?.label || 'Lainnya'})
    )

  return mergedSektor;
};
