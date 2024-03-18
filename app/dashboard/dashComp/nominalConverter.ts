export const convertNominal = (nominal: number | null) => {
  if (nominal === null) {
    return "-";
  }
  // if (nominal / 1000000000000 === 1 || -1)
  //   return `${(nominal / 1000000000000).toFixed(2)} T`;
  // if (nominal / 1000000000 === 1 || -1)
  //   return `${(nominal / 1000000000).toFixed(2)} M`;
  // if (nominal / 1000000 == 1 || -1)
  //   return `${(nominal / 1000000).toFixed(2)} Jt`;
  if (nominal! >= 1000000000000 || nominal! <= -1000000000000)
    return `${(nominal! / 1000000000000).toFixed(2)} T`;
  if (nominal! >= 1000000000 || nominal! <= -1000000000)
    return `${(nominal! / 1000000000).toFixed(2)} M`;
  if (nominal! >= 1000000 || nominal! <= -1000000)
    return `${(nominal! / 1000000).toFixed(2)} Jt`;
  return nominal?.toString();
};
