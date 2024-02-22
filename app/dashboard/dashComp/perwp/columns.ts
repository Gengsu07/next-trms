import { TPerWP } from "@/app/types/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<TPerWP>[] = [
  {
    accessorKey: "npwp15",
    header: "NPWP",
  },
  {
    accessorKey: "nama_wp",
    header: "NAMA WP",
  },
  {
    accessorKey: "netto_cy",
    header: "Netto Tahun Ini",
  },
  {
    accessorKey: "netto_py",
    header: "Netto Tahun Lalu",
  },
  {
    accessorKey: "naik_netto",
    header: "Naik Netto",
  },
  {
    accessorKey: "naik_netto_pct",
    header: "Naik Netto (%)",
  },
  {
    accessorKey: "bruto_cy",
    header: "Bruto Tahun Ini",
  },
  {
    accessorKey: "bruto_py",
    header: "Bruto Tahun Lalu",
  },
  {
    accessorKey: "naik_bruto",
    header: "Naik Bruto",
  },
  {
    accessorKey: "naik_bruto_pct",
    header: "Naik Bruto (%)",
  },
];
