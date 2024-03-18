import { prisma } from "@/prisma/client";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { sektor } from "@/constant/initialData";
import { subYears } from "date-fns";

type TSektorAPI = {
  kd_kategori: string;
  CY: string;
  PY: string;
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

  cleanFilterConditions.from = new Date(cleanFilterConditions.from);
  cleanFilterConditions.to = new Date(cleanFilterConditions.to);
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

  const AllFilter = [
    filterSektor,
    filterMap,
    filterAdmin,
    filterKjs,
    filterNpwp,
  ]
    .filter(Boolean)
    .join(" AND ");

  const whereClause = AllFilter ? `WHERE ${AllFilter}` : "";

  const PY_from = subYears(from, 1);
  const PY_to = subYears(to, 1);

  const sektor_data: TSektorAPI = await prisma.$queryRaw(
    Prisma.sql`WITH df AS (
      SELECT 
        m."kd_kategori" , 
        ROW_NUMBER () OVER (ORDER BY 
          sum(CASE WHEN m.datebayar >= ${from} AND m.datebayar <=${to} THEN  m.nominal END ) DESC NULLS LAST) "RANK",
        sum(CASE WHEN m.datebayar >= ${from} AND m.datebayar <=${to} THEN  m.nominal END ) "CY" ,
        sum(CASE WHEN m.datebayar >= ${PY_from} AND m.datebayar <=${PY_to} THEN  m.nominal END ) "PY" 
      FROM mpn m 
      ${Prisma.raw(whereClause)}
      GROUP BY m."kd_kategori" )
      SELECT 
        df."kd_kategori",
        df."CY",
        df."PY"
      FROM df
      WHERE df."RANK" <=9
      UNION ALL 
      SELECT 
        'Lainnya' ,
        sum(df."CY") "CY",
        sum(df."PY") "PY"
      FROM df
      WHERE df."RANK" >=10`
  );

  const sektor_pendek = sektor_data.map((item) => ({
    nm_kategori:
      sektor.find((label) => label.value === item.kd_kategori)?.label ||
      "Lainnya",
    ...item,
  }));

  // const prevYearFrom = new Date(cleanFilterConditions.from);
  // const prevYearTo = new Date(cleanFilterConditions.to);

  // prevYearFrom.setFullYear(prevYearFrom.getFullYear() - 1);
  // prevYearTo.setFullYear(prevYearTo.getFullYear() - 1);

  // const cy = await prisma.mpn.groupBy({
  //   by: ["kd_kategori"],
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
  //       ...(cleanFilterConditions.map && {
  //         kdmap: {
  //           in: cleanFilterConditions.map.in,
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

  // const py = await prisma.mpn.groupBy({
  //   by: ["kd_kategori"],
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
  //       ...(cleanFilterConditions.map && {
  //         kdmap: {
  //           in: cleanFilterConditions.map.in,
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
  // const cy_res = cy.map((item) => ({
  //   sum: item._sum.nominal,
  //   kd_kategori: item.kd_kategori,
  // }));
  // const py_res = py.map((item) => ({
  //   sum: item._sum.nominal,
  //   kd_kategori: item.kd_kategori,
  // }));
  return NextResponse.json(sektor_pendek);
}
