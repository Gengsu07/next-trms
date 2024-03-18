import { Prisma } from ".prisma/client";
import { prisma } from "@/prisma/client";
import { subYears } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

type cy_trend = {
  tanggalbayar: Date;
  CY_CUMSUM: number;
}[];
type py_trend = {
  tanggalbayar: Date;
  PY_CUMSUM: number;
}[];

export async function GET(req: NextRequest, res: NextResponse) {
  const searchParams = req.nextUrl.searchParams;
  const fromValue = searchParams.get("from");
  const toValue = searchParams.get("to");
  const sektorValues = searchParams.getAll("sektor");
  const adminValues = searchParams.getAll("admin");
  const kjsValues = searchParams.getAll("kjs");
  const npwpValues = searchParams.getAll("npwp");

  const filterConditions: Record<string, any> = {
    from: fromValue,
    to: toValue,
    sektor: sektorValues.length > 0 ? { in: sektorValues } : undefined,
    admin: adminValues.length > 0 ? { in: adminValues } : undefined,
    kjs: kjsValues.length > 0 ? { in: kjsValues } : undefined,
    npwp: npwpValues.length > 0 ? { in: npwpValues } : undefined,
  };

  //clean undefined field
  let cleanFilterConditions = Object.fromEntries(
    Object.entries(filterConditions).filter(([_, value]) => value !== undefined)
  );
  const from = cleanFilterConditions.from;
  const to = cleanFilterConditions.to;

  // const filterDate = `datebayar >= ${from} AND datebayar <= ${to}`;
  const filterSektor =
    cleanFilterConditions.sektor &&
    `kd_kategori IN (${cleanFilterConditions.sektor.in
      .map((v: string) => `'${v}'`)
      .join(", ")})`;
  const filterMap =
    cleanFilterConditions.map &&
    `kdmap IN (${cleanFilterConditions.map.in
      .map((v: string) => `'${v}'`)
      .join(", ")})`;
  const filterAdmin =
    cleanFilterConditions.admin &&
    `admin IN (${cleanFilterConditions.admin.in
      .map((v: string) => `'${v}'`)
      .join(", ")})`;
  const filterKjs =
    cleanFilterConditions.kjs &&
    `kdbayar IN (${cleanFilterConditions.kjs.in
      .map((v: string) => `'${v}'`)
      .join(", ")})`;
  const filterNpwp =
    cleanFilterConditions.npwp &&
    `npwp15 IN (${cleanFilterConditions.npwp.in
      .map((v: string) => `'${v}'`)
      .join(", ")})`;

  const fromDate = new Date(cleanFilterConditions.from);
  const toDate = new Date(cleanFilterConditions.to);

  const filterDate_cy = `datebayar >= '${fromDate.toISOString()}' and
      datebayar <= '${toDate.toISOString()}'`;
  let PY_from = new Date(
    fromDate.getFullYear() - 1,
    fromDate.getMonth(),
    fromDate.getDate()
  );
  let PY_from_str = fromDate.toISOString().split("T")[0];

  const PY_to = new Date(
    toDate.getFullYear() - 1,
    toDate.getMonth(),
    toDate.getDate()
  );

  const PY_to_str = toDate.toISOString().split("T")[0];

  const filterDate_py = `"datebayar" >= make_date(date_part('year','${PY_from_str}'::date)::int-1,1,1) and "datebayar" <= make_date(date_part('year','${PY_to_str}'::date)::int-1,
  date_part('month','${PY_to_str}'::date)::int,date_part('day','${PY_to_str}'::date)::int)`;

  const AllFilter = [
    filterSektor,
    filterMap,
    filterAdmin,
    filterKjs,
    filterNpwp,
  ]
    .filter(Boolean)
    .join(" AND ");

  const whereClause = AllFilter ? `AND ${AllFilter}` : ``;

  const whereClause_py = AllFilter
    ? `WHERE ${filterDate_py} AND ${AllFilter}`
    : `WHERE ${filterDate_py}`;

  cleanFilterConditions.from = new Date(cleanFilterConditions.from);
  cleanFilterConditions.to = new Date(cleanFilterConditions.to);

  const cy_trend: cy_trend = await prisma.$queryRaw(
    Prisma.sql`
    WITH df AS (
      SELECT 
        p."datebayar" ,
        sum(p."nominal") 
      FROM mpn p 
      WHERE p."datebayar" >= ${fromDate} AND
            p."datebayar" <= ${toDate}
            ${Prisma.raw(whereClause)} 
      GROUP BY p."datebayar" 
    )
    SELECT 
      df."datebayar" as tanggalbayar,
      SUM(df."sum") OVER (ORDER BY df."datebayar" ASC ) AS "CY_CUMSUM"
    FROM df
    GROUP BY df."datebayar",df."sum"
    `
  );

  const py_trend: py_trend = await prisma.$queryRaw(
    Prisma.sql`
    WITH df AS (
      SELECT
        p."datebayar" ,
        sum(p."nominal")
      FROM mpn p
      WHERE datebayar>=${PY_from} and
      datebayar<=${PY_to}
      ${Prisma.raw(whereClause)} 
      GROUP BY p."datebayar"
    )
    SELECT
      df."datebayar" as tanggalbayar,
      SUM(df.sum) OVER (ORDER BY df."datebayar" ASC ) AS "PY_CUMSUM"
    FROM df
    GROUP BY df."datebayar",df."sum"
    `
  );
  // const prevYearFrom = new Date(cleanFilterConditions.from);
  // const prevYearTo = new Date(cleanFilterConditions.to);

  // prevYearFrom.setFullYear(prevYearFrom.getFullYear() - 1);
  // prevYearTo.setFullYear(prevYearTo.getFullYear() - 1);

  // const cy_trend = await prisma.mpn.groupBy({
  //   by: ["datebayar"],
  //   orderBy: {
  //     datebayar: "asc",
  //   },
  //   _sum: {
  //     nominal: true,
  //   },
  //   where: {
  //     datebayar: {
  //       gte: cleanFilterConditions.from,
  //       lte: cleanFilterConditions.to,
  //     },
  //     AND: {
  //       ...(cleanFilterConditions.sektor && {
  //         kd_kategori: {
  //           in: cleanFilterConditions.sektor.in,
  //         },
  //       }),
  //       ...(cleanFilterConditions.admin && {
  //         admin: {
  //           in: cleanFilterConditions.admin.in,
  //         },
  //       }),
  //       ...(cleanFilterConditions.kjs && {
  //         kdbayar: {
  //           in: cleanFilterConditions.kjs.in,
  //         },
  //       }),
  //       ...(cleanFilterConditions.npwp && {
  //         npwp15: {
  //           in: cleanFilterConditions.npwp.in,
  //         },
  //       }),
  //     },
  //   },
  // });

  // const py_trend = await prisma.mpn.groupBy({
  //   by: ["datebayar"],
  //   orderBy: {
  //     datebayar: "asc",
  //   },
  //   _sum: {
  //     nominal: true,
  //   },
  //   where: {
  //     datebayar: {
  //       gte: prevYearFrom,
  //       lte: prevYearTo,
  //     },
  //     AND: {
  //       ...(cleanFilterConditions.sektor && {
  //         kd_kategori: {
  //           in: cleanFilterConditions.sektor.in,
  //         },
  //       }),
  //       ...(cleanFilterConditions.admin && {
  //         admin: {
  //           in: cleanFilterConditions.admin.in,
  //         },
  //       }),
  //       ...(cleanFilterConditions.kjs && {
  //         kdbayar: {
  //           in: cleanFilterConditions.kjs.in,
  //         },
  //       }),
  //       ...(cleanFilterConditions.npwp && {
  //         npwp15: {
  //           in: cleanFilterConditions.npwp.in,
  //         },
  //       }),
  //     },
  //   },
  // });
  // Create a Map from py_trend for efficient lookup
  let pyMap = new Map(
    py_trend.map((item) => [
      formatDateKey(item["tanggalbayar"]),
      item["PY_CUMSUM"],
    ])
  );

  // Combine results into desired structure
  type CombinedData = {
    tanggalbayar: Date;
    CY_CUMSUM: number;
    PY_CUMSUM?: number;
  }[];

  // Create an empty combinedData object
  let combinedData: CombinedData = [];

  cy_trend.forEach((item) => {
    const tanggalbayar = item["tanggalbayar"];
    const lastdate = subYears(tanggalbayar, 1);
    const CY_CUMSUM = item["CY_CUMSUM"];
    const PY_CUMSUM = pyMap.get(formatDateKey(lastdate));
    combinedData.push({ tanggalbayar, CY_CUMSUM, PY_CUMSUM });
  });
  return NextResponse.json(combinedData);
}

function formatDateKey(dateString: Date) {
  const date = new Date(dateString);
  return date.toISOString();
}
