"use client";

import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { downloadToExcel } from "@/lib/xlsx";
import { TPerWP } from "@/app/types/types";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const PerWPTableData = <TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),

    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnVisibility,
    },
  });

  return (
    <div className="rounded-md">
      {/* <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline">Filter Kolom</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu> */}
      <Table>
        <TableHeader className="bg-background">
          {table.getHeaderGroups().map((headergroup) => {
            return (
              <TableRow key={headergroup.id}>
                {headergroup.headers
                  .filter(
                    (header) =>
                      header.id !== "npwp15" && header.id !== "nama_wp"
                  )
                  .map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        colSpan={header.colSpan}
                        rowSpan={
                          header.id === "1_npwp15_npwp15" ||
                          header.id === "1_nama_wp_nama_wp"
                            ? 2
                            : 1
                        }
                        className="text-center font-bold text-foreground"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableHead>
                    );
                  })}
              </TableRow>
            );
          })}
          {/* <TableRow>
            <TableHead
              rowSpan={2}
              className="text-center font-bold text-accent"
            >
              NPWP
            </TableHead>
            <TableHead
              rowSpan={2}
              className="text-center font-bold text-accent"
            >
              Nama WP
            </TableHead>
            <TableHead
              colSpan={4}
              className="text-center font-bold text-accent"
            >
              Netto
            </TableHead>
            <TableHead
              colSpan={4}
              className="text-center font-bold text-accent"
            >
              Bruto
            </TableHead>
          </TableRow>
          <TableRow>
            <TableHead className="text-center font-bold text-accent">
              CY
            </TableHead>
            <TableHead className="text-center font-bold text-accent">
              PY
            </TableHead>
            <TableHead className="text-center font-bold text-accent">
              Naik Netto
            </TableHead>
            <TableHead className="text-center font-bold text-accent">
              Naik Netto %
            </TableHead>
            <TableHead className="text-center font-bold text-accent">
              CY
            </TableHead>
            <TableHead className="text-center font-bold text-accent">
              PY
            </TableHead>
            <TableHead className="text-center font-bold text-accent">
              Naik Netto
            </TableHead>
            <TableHead className="text-center font-bold text-accent">
              Naik Netto %
            </TableHead>
          </TableRow> */}
        </TableHeader>
        <TableBody className="bg-background">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="text-foreground">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length}>
                data belum tersedia...
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* <div className="flex items-center justify-center space-x-2 py-4 rounded-md border">
        <Button
          variant="outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div> */}
    </div>
  );
};
export default PerWPTableData;
