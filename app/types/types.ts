export type TResponseData = {
  label: string;
  value: { cy: number; naik: number; yoy: number };
};

export type TTrend = {
  _sum: { nominal: number };
  datebayar: Date;
};
