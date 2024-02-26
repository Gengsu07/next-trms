import { TPerWP } from "@/app/types/types";
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
