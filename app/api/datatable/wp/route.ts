import { format } from "date-fns";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { buildWhereClause } from "@/lib/utils";

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

  const [where_cy, wherevalues_cy] = buildWhereClause(cleanFilterConditions);

  const from = new Date(cleanFilterConditions.from);
  const to = new Date(cleanFilterConditions.to);

  const PY_from = new Date(
    from.getFullYear() - 1,
    from.getMonth(),
    from.getDate()
  );
  const PY_to = new Date(to.getFullYear() - 1, to.getMonth(), to.getDate());

  const currentPage = 1; // Or the desired page number
  const perPage = 10; // Or the desired number of items per page
  const offset = (currentPage - 1) * perPage;

  const cy_netto = await prisma.$queryRaw(
    Prisma.sql`SELECT
    m.npwp15,
    m.nama_wp,
    sum(CASE WHEN m.datebayar BETWEEN ${new Date(
      cleanFilterConditions.from
    )} AND ${new Date(cleanFilterConditions.to)} THEN m.nominal END) AS "cy",
    sum(CASE WHEN m.datebayar BETWEEN ${PY_from} AND ${PY_to} THEN m.nominal END) AS "py"
    FROM mpn m
    WHERE 
    GROUP BY m.npwp15, m.nama_wp
    LIMIT ${perPage}
    OFFSET ${offset};`
  );

  //   await prisma.mpn.groupBy({
  //     by: ["npwp15", "nama_wp"],
  //     _sum: {
  //       nominal: true,
  //     },
  //     where: {
  //       datebayar: {
  //         gte: new Date(cleanFilterConditions.from),
  //         lte: new Date(cleanFilterConditions.to),
  //       },
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
  //   });

  //   const cy_bruto = await prisma.mpn.groupBy({
  //     by: ["npwp15", "nama_wp"],
  //     _sum: {
  //       nominal: true,
  //     },
  //     where: {
  //       datebayar: {
  //         gte: new Date(cleanFilterConditions.from),
  //         lte: new Date(cleanFilterConditions.to),
  //       },
  //       ket: {
  //         in: ["MPN", "SPM"],
  //       },
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
  //   });

  //   const from = new Date(cleanFilterConditions.from);
  //   const to = new Date(cleanFilterConditions.to);

  //   const PY_from = new Date(
  //     from.getFullYear() - 1,
  //     from.getMonth(),
  //     from.getDate()
  //   );
  //   const PY_to = new Date(to.getFullYear() - 1, to.getMonth(), to.getDate());

  //   const py_netto = await prisma.mpn.groupBy({
  //     by: ["npwp15", "nama_wp"],
  //     _sum: {
  //       nominal: true,
  //     },
  //     where: {
  //       datebayar: {
  //         gte: PY_from,
  //         lte: PY_to,
  //       },
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
  //   });

  //   const py_bruto = await prisma.mpn.groupBy({
  //     by: ["npwp15", "nama_wp"],
  //     _sum: {
  //       nominal: true,
  //     },
  //     where: {
  //       datebayar: {
  //         gte: PY_from,
  //         lte: PY_to,
  //       },
  //       ket: {
  //         in: ["MPN", "SPM"],
  //       },
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
  //   });

  // const naik_netto =cy_netto.?.map(())

  // (cy_netto?._sum?.nominal ?? 0) - (py_netto?._sum?.nominal ?? 0);
  // const yoy_netto =
  //   (naik_netto / (py_netto?._sum?.nominal ?? naik_netto)) * 100;
  // const naik_bruto =
  //   (cy_bruto?._sum?.nominal ?? 0) - (py_bruto?._sum?.nominal ?? 0);
  // const yoy_bruto =
  //   (naik_bruto / (py_bruto?._sum?.nominal ?? naik_bruto)) * 100;

  return NextResponse.json(cy_netto);
}
