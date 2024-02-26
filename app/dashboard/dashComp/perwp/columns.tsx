import { TPerWP } from "@/app/types/types";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { convertNominal } from "../nominalConverter";
import { capitalizeWord_fromUpper } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

const columnHelper = createColumnHelper<TPerWP>();
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
    header: "Netto",
    columns: [
      {
        accessorKey: "netto_cy",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => {
                column.toggleSorting(column.getIsSorted() === "asc");
              }}
            >
              CY
              <ArrowUpDown className="ml-1 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const curdata: number = row.getValue("netto_cy");
          const formatted = convertNominal(curdata);
          return <div className="font-medium">{formatted}</div>;
        },
      },
      {
        accessorKey: "netto_py",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => {
                column.toggleSorting(column.getIsSorted() === "asc");
              }}
            >
              PY
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const curdata: number = row.getValue("netto_cy");
          const formatted = convertNominal(curdata);
          return <div className="font-medium">{formatted}</div>;
        },
      },
      {
        accessorKey: "naik_netto",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => {
                column.toggleSorting(column.getIsSorted() === "asc");
              }}
            >
              Naik Netto
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const curdata: number = row.getValue("netto_cy");
          const formatted = convertNominal(curdata);
          return <div className="font-medium">{formatted}</div>;
        },
      },
      {
        accessorKey: "naik_netto_pct",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => {
                column.toggleSorting(column.getIsSorted() === "asc");
              }}
            >
              Naik Netto(%)
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const curdata: number = row.getValue("naik_netto_pct");
          const formatted = (curdata * 100).toFixed(2);
          return <div className="font-medium">{formatted}%</div>;
        },
      },
    ],
  },

  {
    header: "Bruto",
    columns: [
      {
        accessorKey: "bruto_cy",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => {
                column.toggleSorting(column.getIsSorted() === "asc");
              }}
            >
              Bruto CY
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const curdata: number = row.getValue("netto_cy");
          const formatted = convertNominal(curdata);
          return <div className="font-medium">{formatted}</div>;
        },
      },
      {
        accessorKey: "bruto_py",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => {
                column.toggleSorting(column.getIsSorted() === "asc");
              }}
            >
              Bruto PY
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const curdata: number = row.getValue("netto_cy");
          const formatted = convertNominal(curdata);
          return <div className="font-medium">{formatted}</div>;
        },
      },
      {
        accessorKey: "naik_bruto",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => {
                column.toggleSorting(column.getIsSorted() === "asc");
              }}
            >
              Naik Bruto
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const curdata: number = row.getValue("netto_cy");
          const formatted = convertNominal(curdata);
          return <div className="font-medium">{formatted}</div>;
        },
      },
      {
        accessorKey: "naik_bruto_pct",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => {
                column.toggleSorting(column.getIsSorted() === "asc");
              }}
            >
              Naik Bruto(%)
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const curdata: number = row.getValue("naik_netto_pct");
          const formatted = (curdata * 100).toFixed(2);
          return <div className="font-medium">{formatted}%</div>;
        },
      },
    ],
  },
];
