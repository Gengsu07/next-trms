import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type RowType = Record<string, any>;
const TableView = ({
  columns,
  data,
  className,
}: {
  columns: string[];
  data: RowType[] | undefined;
  className?: string;
}) => {
  return (
    <Table className={cn("h-fit table-auto", className)}>
      <TableHeader>
        <TableRow>
          {columns.map((column, index) => (
            <TableHead key={index}>{column}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((row, rowIndex) => (
          <TableRow
            key={rowIndex}
            className="odd:bg-white even:bg-gray-100 dark:odd:bg-slate-900 dark:even:bg-slate-800"
          >
            {columns.map((column, colIndex) => (
              <TableCell key={colIndex}>
                {row[column]?.toLocaleString()}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default TableView;
