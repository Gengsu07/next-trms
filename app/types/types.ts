export type TResponseData = {
  label: string;
  value: { cy: number; naik: number; yoy: number };
};

export type TTrend = {
  cy: { datebayar: Date; _sum: { nominal: number } }[];
  py: { datebayar: Date; _sum: { nominal: number } }[];
};

export type TMap = {
  cy: { map: string; _sum: { nominal: number } }[];
  py: { map: string; _sum: { nominal: number } }[];
};

export type TKPP = {
  _sum: { nominal: number };
  admin: string;
};

export type TSektor = {
  cy: {
    sum: number;
    kd_kategori: string;
  }[];
  py: {
    sum: number;
    kd_kategori: string;
  }[];
};
