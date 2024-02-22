import { sektor } from "./../../../../constant/initialData";
import { format } from "date-fns";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

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

  const currentPage = 1; // Or the desired page number
  const perPage = 10; // Or the desired number of items per page
  const offset = (currentPage - 1) * perPage;

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

  const from = new Date(cleanFilterConditions.from);
  const to = new Date(cleanFilterConditions.to);

  const PY_from = new Date(
    from.getFullYear() - 1,
    from.getMonth(),
    from.getDate()
  );
  const PY_to = new Date(to.getFullYear() - 1, to.getMonth(), to.getDate());
  const perwp = await prisma.$queryRaw(
    Prisma.sql`SELECT
    m.npwp15,
    m.nama_wp,
    sum(CASE WHEN m.datebayar >= ${new Date(
      cleanFilterConditions.from
    )} AND m.datebayar <= ${new Date(
      cleanFilterConditions.to
    )}  THEN m.nominal END) AS "netto_cy",
    sum(CASE WHEN m.datebayar >= ${new Date(
      cleanFilterConditions.from
    )} AND m.datebayar <= ${new Date(
      cleanFilterConditions.to
    )} and ket IN ('MPN','SPM')  THEN m.nominal END) AS "bruto_cy",
    sum(CASE WHEN m.datebayar >= ${PY_from} AND m.datebayar <= ${PY_to} THEN m.nominal END) AS "netto_py",
    sum(CASE WHEN m.datebayar >= ${PY_from} AND m.datebayar <= ${PY_to} and  ket IN ('MPN','SPM') THEN m.nominal END) AS "bruto_py"
    FROM mpn m
    ${Prisma.raw(whereClause)}
    GROUP BY m.npwp15, m.nama_wp 
    ORDER BY sum(CASE WHEN m.datebayar >= ${new Date(
      cleanFilterConditions.from
    )} AND m.datebayar <= ${new Date(
      cleanFilterConditions.to
    )}  THEN m.nominal END) DESC NULLS LAST
    LIMIT ${perPage}
    OFFSET ${offset};
   `
  );

  // const cy_netto = await prisma.mpn.groupBy({
  //   by: ["npwp15", "nama_wp"],
  //   _sum: {
  //     nominal: true,
  //   },
  //   where: {
  //     datebayar: {
  //       gte: new Date(cleanFilterConditions.from),
  //       lte: new Date(cleanFilterConditions.to),
  //     },
  //     ...(cleanFilterConditions.sektor && {
  //       kd_kategori: {
  //         in: cleanFilterConditions.sektor.in,
  //       },
  //     }),
  //     ...(cleanFilterConditions.map && {
  //       kdmap: {
  //         in: cleanFilterConditions.map.in,
  //       },
  //     }),
  //     ...(cleanFilterConditions.admin && {
  //       admin: {
  //         in: cleanFilterConditions.admin.in,
  //       },
  //     }),
  //     ...(cleanFilterConditions.kjs && {
  //       kdbayar: {
  //         in: cleanFilterConditions.kjs.in,
  //       },
  //     }),
  //     ...(cleanFilterConditions.npwp && {
  //       npwp15: {
  //         in: cleanFilterConditions.npwp.in,
  //       },
  //     }),
  //   },
  // });

  // const cy_bruto = await prisma.mpn.groupBy({
  //   by: ["npwp15", "nama_wp"],
  //   _sum: {
  //     nominal: true,
  //   },
  //   where: {
  //     datebayar: {
  //       gte: new Date(cleanFilterConditions.from),
  //       lte: new Date(cleanFilterConditions.to),
  //     },
  //     ket: {
  //       in: ["MPN", "SPM"],
  //     },
  //     ...(cleanFilterConditions.sektor && {
  //       kd_kategori: {
  //         in: cleanFilterConditions.sektor.in,
  //       },
  //     }),
  //     ...(cleanFilterConditions.map && {
  //       kdmap: {
  //         in: cleanFilterConditions.map.in,
  //       },
  //     }),
  //     ...(cleanFilterConditions.admin && {
  //       admin: {
  //         in: cleanFilterConditions.admin.in,
  //       },
  //     }),
  //     ...(cleanFilterConditions.kjs && {
  //       kdbayar: {
  //         in: cleanFilterConditions.kjs.in,
  //       },
  //     }),
  //     ...(cleanFilterConditions.npwp && {
  //       npwp15: {
  //         in: cleanFilterConditions.npwp.in,
  //       },
  //     }),
  //   },
  // });

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

  // // const naik_netto =cy_netto.?.map(())

  // // (cy_netto?._sum?.nominal ?? 0) - (py_netto?._sum?.nominal ?? 0);
  // // const yoy_netto =
  // //   (naik_netto / (py_netto?._sum?.nominal ?? naik_netto)) * 100;
  // // const naik_bruto =
  // //   (cy_bruto?._sum?.nominal ?? 0) - (py_bruto?._sum?.nominal ?? 0);
  // // const yoy_bruto =
  // //   (naik_bruto / (py_bruto?._sum?.nominal ?? naik_bruto)) * 100;

  // const df_cy_netto = new DataFrame(cy_netto);
  // const df_py_netto = new DataFrame(py_netto);
  // const df_cy_bruto = new DataFrame(cy_bruto);
  // const df_py_bruto = new DataFrame(py_bruto);

  // // Merge the two dataframes on 'npwp15' and 'nama_wp'
  // const merged_netto = df_cy_netto.joinOuter(
  //   df_py_netto,
  //   (leftRow) => leftRow.npwp15,
  //   (rightRow) => rightRow.npwp15,
  //   (leftRow, rightRow) => ({
  //     npwp15: leftRow ? leftRow.npwp15 : rightRow.npwp15,
  //     nama_wp: leftRow ? leftRow.nama_wp : rightRow.nama_wp,
  //     cy : leftRow ? leftRow?._sum.nominal : null,
  //     py: rightRow ? rightRow?._sum_nominal : null,
  //     naik_netto: (leftRow?._sum?.nominal || 0) - (rightRow?._sum.nominal || 0),
  //   })
  // );

  // // Extract the merged data as an array
  // const mergedData = merged_df.toArray();

  return NextResponse.json(perwp);
}
