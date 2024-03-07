import { TKPP, TMap, TPerWP, TSektorRes, TTrend } from "@/app/types/types";
import xlsx, { IJsonSheet } from "json-as-xlsx";

export function downloadToExcel(content: TPerWP[]) {
  let data: IJsonSheet[] = [
    {
      sheet: "perwp-TRMS",
      columns: [
        {
          label: "NPWP",
          value: "npwp15",
        },
        {
          label: "Nama WP",
          value: "nama_wp",
        },
        {
          label: "Netto Tahun Berjalan",
          value: "netto_cy",
        },
        {
          label: "Bruto Tahun Berjalan",
          value: "bruto_cy",
        },
        {
          label: "Netto Tahun Lalu",
          value: "netto_py",
        },
        {
          label: "Bruto Tahun Lalu",
          value: "bruto_py",
        },
        {
          label: "Naik Netto",
          value: "naik_netto",
        },
        {
          label: "Naik Netto(%)",
          value: "naik_netto_pct",
        },
        {
          label: "Naik Bruto",
          value: "naik_bruto",
        },
        {
          label: "Naik Bruto(%)",
          value: "naik_bruto_pct",
        },
      ],
      content: content,
    },
  ];
  let setting = {
    fileName: "perwp-TRMS",
    extralenght: 5,
  };
  return xlsx(data, setting);
}

export function perSektor(content: TSektorRes) {
  let data: IJsonSheet[] = [
    {
      sheet: "perSektor-TRMS",
      columns: [
        {
          label: "Nama Kategori",
          value: "nm_kategori",
        },
        {
          label: "Kode Kategori",
          value: "kd_kategori",
        },
        {
          label: "Tahun Ini",
          value: "CY",
        },
        {
          label: "Tahun Lalu",
          value: "PY",
        },
      ],
      content: content,
    },
  ];
  let setting = {
    fileName: "perSektor-TRMS",
    extralenght: 5,
  };
  return xlsx(data, setting);
}
export function perMap(content: TMap) {
  let data: IJsonSheet[] = [
    {
      sheet: "perSektor-TRMS",
      columns: [
        {
          label: "Jenis Pajak",
          value: "nm_kategori",
        },
        {
          label: "Tahun Ini",
          value: "CY",
        },
        {
          label: "Tahun Lalu",
          value: "PY",
        },
      ],
      content: content,
    },
  ];
  let setting = {
    fileName: "perMAP-TRMS",
    extralenght: 5,
  };
  return xlsx(data, setting);
}

export function perUnit(content: TKPP) {
  let data: IJsonSheet[] = [
    {
      sheet: "perKPP-TRMS",
      columns: [
        {
          label: "KPP",
          value: "name",
        },
        {
          label: "Penerimaan",
          value: "value",
        },
      ],
      content: content,
    },
  ];
  let setting = {
    fileName: "perKPP-TRMS",
    extralenght: 5,
  };
  return xlsx(data, setting);
}

export function SektorMAP_data(
  content: { source: string; target: string; value: number }[]
) {
  let data: IJsonSheet[] = [
    {
      sheet: "SektorMAP-TRMS",
      columns: [
        {
          label: "Sektor",
          value: "source",
        },
        {
          label: "MAP",
          value: "target",
        },
        {
          label: "Nominal",
          value: "value",
        },
      ],
      content: content,
    },
  ];
  let setting = {
    fileName: "SektorMAP-TRMS",
    extralenght: 5,
  };
  return xlsx(data, setting);
}
