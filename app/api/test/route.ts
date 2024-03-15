import { format } from "date-fns";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { TKPI } from "@/app/types/types";

export async function GET(req: NextRequest, res: NextResponse) {
  const searchParams = req.nextUrl.searchParams;
  const fromValue = searchParams.get("from");
  const toValue = searchParams.get("to");
  const sektorValues = searchParams.getAll("sektor");
  const mapValues = searchParams.getAll("map");
  const adminValues = searchParams.getAll("admin");
  const kjsValues = searchParams.getAll("kjs");
  const npwpValues = searchParams.getAll("npwp");

  const filterConditions: Record<string, any> = {
    from: fromValue,
    to: toValue,
    sektor: sektorValues.length > 0 ? { in: sektorValues } : undefined,
    map: mapValues.length > 0 ? { in: mapValues } : undefined,
    admin: adminValues.length > 0 ? { in: adminValues } : undefined,
    kjs: kjsValues.length > 0 ? { in: kjsValues } : undefined,
    npwp: npwpValues.length > 0 ? { in: npwpValues } : undefined,
  };

  //clean undefined field
  const cleanFilterConditions = Object.fromEntries(
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
  const PY_from = new Date(
    from.getFullYear() - 1,
    from.getMonth(),
    from.getDate()
  );
  const PY_to = new Date(to.getFullYear() - 1, to.getMonth(), to.getDate());
  //query db
  // const kpi = await getQueryData(from, to, PY_from, PY_to, whereClause);
  const kpi = await prisma.$queryRaw(
    Prisma.sql`
      SELECT
      m.bulanbayar,
    sum(CASE WHEN m.datebayar >= ${PY_from} AND m.datebayar <= ${PY_to} AND ket IN ('MPN')  THEN m.nominal END) AS "py_mpn",
    sum(CASE WHEN m.datebayar >= ${PY_from} AND m.datebayar <= ${PY_to} AND ket IN ('SPM')  THEN m.nominal END) AS "py_spm",
    sum(CASE WHEN m.datebayar >= ${PY_from} AND m.datebayar <= ${PY_to} AND ket IN ('SPMKP')  THEN m.nominal END) AS "py_restitusi",
    sum(CASE WHEN m.datebayar >= ${PY_from} AND m.datebayar <= ${PY_to} THEN m.nominal END) AS "py_netto",
    sum(CASE WHEN m.datebayar >= ${PY_from} AND m.datebayar <= ${PY_to} AND ket IN ('MPN','SPM') THEN m.nominal END) AS "py_bruto"
    FROM mpn m
    GROUP BY m.bulanbayar
   `
  );
  // const responseData = [
  //   {
  //     label: "MPN",
  //     value: {
  //       cy: kpi[0].cy_mpn,
  //       naik: kpi[0].naik_mpn,
  //       yoy: kpi[0].yoy_mpn,
  //     },
  //   },
  //   {
  //     label: "SPM",
  //     value: {
  //       cy: kpi[0].cy_spm,
  //       naik: kpi[0].naik_spm,
  //       yoy: kpi[0].yoy_spm,
  //     },
  //   },
  //   {
  //     label: "Restitusi",
  //     value: {
  //       cy: kpi[0].cy_restitusi,
  //       naik: kpi[0].naik_restitusi,
  //       yoy: kpi[0].yoy_restitusi,
  //     },
  //   },
  //   {
  //     label: "Bruto",
  //     value: {
  //       cy: kpi[0].cy_bruto,
  //       naik: kpi[0].naik_bruto,
  //       yoy: kpi[0].yoy_bruto,
  //     },
  //   },
  //   {
  //     label: "Netto",
  //     value: {
  //       cy: kpi[0].cy_netto,
  //       naik: kpi[0].naik_netto,
  //       yoy: kpi[0].yoy_netto,
  //     },
  //   },
  // ];
  return NextResponse.json(kpi);
}

// async function getQueryData(
//   from: Date,
//   to: Date,
//   PY_from: Date,
//   PY_to: Date,
//   whereClause: string
// ): Promise<TKPI[]> {
//   const kpi = await prisma.$queryRaw(
//     Prisma.sql`
//       SELECT
//     sum(CASE WHEN m.datebayar >= ${from} AND m.datebayar <= ${to} AND ket IN ('MPN')  THEN m.nominal END) AS "cy_mpn",
//     sum(CASE WHEN m.datebayar >= ${from} AND m.datebayar <= ${to} AND ket IN ('SPM')  THEN m.nominal END) AS "cy_spm",
//     sum(CASE WHEN m.datebayar >= ${from} AND m.datebayar <= ${to} AND ket IN ('SPMKP')  THEN m.nominal END) AS "cy_restitusi",
//     sum(CASE WHEN m.datebayar >= ${from} AND m.datebayar <= ${to} THEN m.nominal END) AS "cy_netto",
//     sum(CASE WHEN m.datebayar >= ${from} AND m.datebayar <= ${to} AND ket IN ('MPN','SPM') THEN m.nominal END) AS "cy_bruto",
//     sum(CASE WHEN m.datebayar >= ${PY_from} AND m.datebayar <= ${PY_to} AND ket IN ('MPN')  THEN m.nominal END) AS "py_mpn",
//     sum(CASE WHEN m.datebayar >= ${PY_from} AND m.datebayar <= ${PY_to} AND ket IN ('SPM')  THEN m.nominal END) AS "py_spm",
//     sum(CASE WHEN m.datebayar >= ${PY_from} AND m.datebayar <= ${PY_to} AND ket IN ('SPMKP')  THEN m.nominal END) AS "py_restitusi",
//     sum(CASE WHEN m.datebayar >= ${PY_from} AND m.datebayar <= ${PY_to} THEN m.nominal END) AS "py_netto",
//     sum(CASE WHEN m.datebayar >= ${PY_from} AND m.datebayar <= ${PY_to} AND ket IN ('MPN','SPM') THEN m.nominal END) AS "py_bruto"

//    `
//   );
//   return kpi;
// }

// FROM mpn m
// ${Prisma.raw(whereClause)}
//     )
//     SELECT
//     df.*,
//     df.cy_mpn - df.py_mpn AS naik_mpn,
//     coalesce((df.cy_mpn - df.py_mpn)/NULLIF(df.py_mpn, 0),0) as yoy_mpn,
//     df.cy_spm - df.py_spm AS naik_spm,
//     coalesce((df.cy_spm - df.py_spm)/NULLIF(df.py_spm, 0),0) as yoy_spm,
//     df.cy_netto - df.py_netto AS naik_netto,
//     coalesce((df.cy_netto - df.py_netto)/NULLIF(df.py_netto, 0),0) as yoy_netto,
//     (df.cy_bruto - df.py_bruto) AS naik_bruto,
//     COALESCE((df.cy_bruto - df.py_bruto) / NULLIF(df.cy_bruto, 0), 0) AS yoy_bruto,
//     df.cy_restitusi - df.py_restitusi AS naik_restitusi,
//     coalesce((df.cy_restitusi - df.py_restitusi)/NULLIF(df.py_restitusi, 0),0) as yoy_restitusi
// FROM df
