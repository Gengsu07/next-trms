"use client";
import { TPerWP } from "@/app/types/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<TPerWP> = [
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
    accessorKey: "bruto_cy",
    header: "Bruto Tahun Ini Tahun Ini",
  },
];
