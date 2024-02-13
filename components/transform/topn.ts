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
