export const convertNominal = (nominal: number) => {
  if (nominal / 1000000000000 === 1 || -1)
    return `${(nominal / 1000000000000).toFixed(2)} T`;
  if (nominal / 1000000000 === 1 || -1)
    return `${(nominal / 1000000000).toFixed(2)} M`;
  if (nominal / 1000000 == 1 || -1)
    return `${(nominal / 1000000).toFixed(2)} Jt`;
};
