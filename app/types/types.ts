export type TResponseData = {
  label: string;
  value: { cy: number; naik: number; yoy: number };
};

export type TTrend = {
  cy: { datebayar: Date; _sum: { nominal: number } }[];
  py: { datebayar: Date; _sum: { nominal: number } }[];
};

export type TMap = {
  cy: {
    sum: number;
    map: string;
  }[];
  py: {
    sum: number;
    map: string;
  }[];
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

export type TTopWP = {
  top: {
    value: number;
    name: string;
  }[];
  bottom: {
    value: number;
    name: string;
  }[];
};

export type TSektorMap = {
  nodes: { name: string }[];
  links: { source: string; target: string; value: number }[];
};

export type TPerWP = {
  npwp15: string;
  nama_wp: "string";
  netto_cy: number;
  bruto_cy: number;
  netto_py: number;
  bruto_py: number;
};
