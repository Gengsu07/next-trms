export type TResponseData = {
  label: string;
  value: { cy: number; naik: number; yoy: number };
};
export type TKPI = {
  cy_mpn: number;
  cy_spm: number;
  cy_restitusi: number;
  cy_netto: number;
  cy_bruto: number;
  py_mpn: number;
  py_spm: number;
  py_restitusi: number;
  py_netto: number;
  py_bruto: number;
  naik_mpn: number;
  yoy_mpn: number;
  naik_spm: number;
  yoy_spm: number;
  naik_netto: number;
  yoy_netto: number;
  naik_bruto: number;
  yoy_bruto: number;
  naik_restitusi: number;
  yoy_restitusi: number;
};

export type parsedData = {
  npwp?: string | undefined;
  kjs?: string[] | undefined;
  map?: string[] | undefined;
  sektor?: string[] | undefined;
  admin?: string[] | undefined;
  from?: string | undefined;
  to?: string | undefined;
};
export type TTrend = {
  cy: { datebayar: Date; CY_CUMSUM: number }[];
  py: { datebayar: Date; PY_CUMSUM: number }[];
};

export type TMap = {
  map: string;
  CY: number;
  PY: number;
}[];

export type TKPP = {
  value: number;
  name: string;
}[];

export type TSektorRes = {
  nm_kategori: string;
  kd_kategori: string;
  CY: number;
  PY: number;
}[];

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
  naik_netto: number;
  naik_netto_pct: number;
  naik_bruto: number;
  naik_bruto_pct: number;
};

export type TPerWPData = {
  records: number;
  content: TPerWP[];
};
