import { TPerWP } from "@/app/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { convertNominal } from "../nominalConverter";
import { capitalizeWord_fromUpper } from "@/lib/utils";

export const columns: ColumnDef<TPerWP>[] = [
  {
    accessorKey: "npwp15",
    header: "NPWP",
  },
  {
    accessorKey: "nama_wp",
    header: "Nama WP",
    cell: ({ row }) => {
      const curdata: string = row.getValue("nama_wp");
      const formatted = capitalizeWord_fromUpper(curdata);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "netto_cy",
    header: "Netto CY",
    cell: ({ row }) => {
      const curdata: number = row.getValue("netto_cy");
      const formatted = convertNominal(curdata);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "netto_py",
    header: "Netto PY",
    cell: ({ row }) => {
      const curdata: number = row.getValue("netto_cy");
      const formatted = convertNominal(curdata);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "naik_netto",
    header: "Naik Netto",
    cell: ({ row }) => {
      const curdata: number = row.getValue("netto_cy");
      const formatted = convertNominal(curdata);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "naik_netto_pct",
    header: "Naik Netto (%)",
    cell: ({ row }) => {
      const curdata: number = row.getValue("naik_netto_pct");
      const formatted = (curdata * 100).toFixed(2);
      return <div className="font-medium">{formatted}%</div>;
    },
  },
  {
    accessorKey: "bruto_cy",
    header: "Bruto CY",
    cell: ({ row }) => {
      const curdata: number = row.getValue("netto_cy");
      const formatted = convertNominal(curdata);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "bruto_py",
    header: "Bruto PY",
    cell: ({ row }) => {
      const curdata: number = row.getValue("netto_cy");
      const formatted = convertNominal(curdata);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "naik_bruto",
    header: "Naik Bruto",
    cell: ({ row }) => {
      const curdata: number = row.getValue("netto_cy");
      const formatted = convertNominal(curdata);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "naik_bruto_pct",
    header: "Naik Bruto (%)",
    cell: ({ row }) => {
      const curdata: number = row.getValue("naik_netto_pct");
      const formatted = (curdata * 100).toFixed(2);
      return <div className="font-medium">{formatted}%</div>;
    },
  },
];
