import { AiFillFilter } from "react-icons/ai";
import { Prisma } from ".prisma/client";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

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
  const from = new Date(cleanFilterConditions.from);
  const to = new Date(cleanFilterConditions.to);

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

  // const filterDate_cy = `"datebayar" >= '${from}' and
  // "datebayar" <= '${to}'`;

  const fromDate = new Date(cleanFilterConditions.from);
  const toDate = new Date(cleanFilterConditions.to);
  const PY_from = new Date(
    from.getFullYear() - 1,
    from.getMonth(),
    from.getDate()
  );
  const PY_to = new Date(to.getFullYear() - 1, to.getMonth(), to.getDate());
  const from_str = fromDate.toISOString().split("T")[0];
  const to_str = toDate.toISOString().split("T")[0];
  const PY_to_str = toDate.toISOString().split("T")[0];
  let PY_from_str = fromDate.toISOString().split("T")[0];

  // const PY_to = new Date(
  //   toDate.getFullYear() - 1,
  //   toDate.getMonth(),
  //   toDate.getDate()
  // );

  // const filterDate_py = `"datebayar" >= make_date(date_part('year','${PY_from_str}'::date)::int-1,1,1) and "datebayar" <= make_date(date_part('year','${PY_to_str}'::date)::int-1,
  // date_part('month','${PY_to_str}'::date)::int,date_part('day','${PY_to_str}'::date)::int)`;

  const AllFilter = [
    filterSektor,
    filterMap,
    filterAdmin,
    filterKjs,
    filterNpwp,
  ]
    .filter(Boolean)
    .join(" AND ");

  // const whereClause_cy = AllFilter
  //   ? `WHERE ${filterDate_cy} AND ${AllFilter}`
  //   : `WHERE ${filterDate_cy}`;

  // const whereClause_py = AllFilter
  //   ? `WHERE ${filterDate_py} AND ${AllFilter}`
  //   : `WHERE ${filterDate_py}`;

  // cleanFilterConditions.from = new Date(cleanFilterConditions.from);
  // cleanFilterConditions.to = new Date(cleanFilterConditions.to);

  const filterDateUptoNow = `WHERE (datebayar >= ${from} AND datebayar <= ${to}) OR (datebayar >= ${PY_from} AND datebayar <= ${PY_to})`;
  // const whereClause = AllFilter ? `WHERE ${AllFilter}` : "";
  const whereClause = AllFilter
    ? `WHERE (datebayar >= ${from} AND datebayar <= ${to}) OR (datebayar >= ${PY_from} AND datebayar <= ${PY_to}) AND ${AllFilter}`
    : `WHERE (datebayar >= ${from} AND datebayar <= ${to}) OR (datebayar >= ${PY_from} AND datebayar <= ${PY_to})`;
  console.log(filterDateUptoNow);
  // sum(CASE WHEN p.datebayar >= ${from} AND p.datebayar <= ${to} THEN p.nominal END) AS "cy_netto",
  // sum(CASE WHEN p.datebayar >= ${PY_from} AND p.datebayar <= ${PY_to} THEN p.nominal END) AS "py_netto"
  // ${Prisma.raw(whereClause)}
  const cy_trend = await prisma.$queryRaw(
    Prisma.sql`
      SELECT 
        p."datebayar" ,
       sum(p.nominal)
      FROM mpn p 
      ${filterDateUptoNow}
      GROUP BY p."datebayar" 
    `
  );
  // WITH df AS (
  //   )
  //   SELECT
  //     df."datebayar",
  //     SUM(df."cy_netto") OVER (ORDER BY df."datebayar" ASC ) AS "CY_CUMSUM",
  //     SUM(df."py_netto") OVER (ORDER BY df."datebayar" ASC ) AS "PY_CUMSUM"
  //   FROM df
  //   GROUP BY df."datebayar",df."cy_netto",df."py_netto"
  //   ORDER by df."datebayar" ASC
  // df."datebayar",
  // SUM(CASE WHEN ${filterDate_cy} then df."sum") OVER (ORDER BY df."datebayar" ASC ) AS "CY_CUMSUM"
  // GROUP BY df."datebayar",df."sum"
  // const py_trend = await prisma.$queryRaw(
  //   Prisma.sql`
  //   WITH df AS (
  //     SELECT
  //       p."datebayar" ,
  //       sum(p."nominal")
  //     FROM mpn p
  //     ${Prisma.raw(whereClause_py)}
  //     GROUP BY p."datebayar"
  //   )
  //   SELECT
  //     df."datebayar",
  //     SUM(df.sum) OVER (ORDER BY df."datebayar" ASC ) AS "PY_CUMSUM"
  //   FROM df
  //   GROUP BY df."datebayar",df."sum"
  //   `
  // );
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

  return NextResponse.json(cy_trend);
}
