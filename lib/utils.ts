import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
interface Filter {
  [key: string]: string | { in: string[] };
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function buildWhereClause(filters: Filter): [string, any[]] {
  const conditions: string[] = [];
  const values: any[] = [];
  for (const key in filters) {
    if (key !== "from" && key !== "to") {
      const value = filters[key];
      if (value !== undefined && value !== null) {
        if (
          typeof value === "object" &&
          "in" in value &&
          Array.isArray(value.in)
        ) {
          if (value.in.length > 0) {
            conditions.push(
              `${key} IN (${value.in
                .map((_, index) => `$${index + 1}`)
                .join(", ")})`
            );
            values.push(...value.in);
          }
        } else {
          conditions.push(`${key} = $${values.length + 1}`);
          values.push(value);
        }
      }
    }
  }
  const whereClause = conditions.length > 0 ? conditions.join(" AND ") : "1=1"; // Default to true if no conditions
  return [whereClause, values];
}
