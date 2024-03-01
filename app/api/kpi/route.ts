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
  const kpi = await getQueryData(from, to, PY_from, PY_to, whereClause);
  const responseData = [
    {
      label: "MPN",
      value: {
        cy: kpi[0].cy_mpn,
        naik: kpi[0].naik_mpn,
        yoy: kpi[0].yoy_mpn,
      },
    },
    {
      label: "SPM",
      value: {
        cy: kpi[0].cy_spm,
        naik: kpi[0].naik_spm,
        yoy: kpi[0].yoy_spm,
      },
    },
    {
      label: "Restitusi",
      value: {
        cy: kpi[0].cy_restitusi,
        naik: kpi[0].naik_restitusi,
        yoy: kpi[0].yoy_restitusi,
      },
    },
    {
      label: "Bruto",
      value: {
        cy: kpi[0].cy_bruto,
        naik: kpi[0].naik_bruto,
        yoy: kpi[0].yoy_bruto,
      },
    },
    {
      label: "Netto",
      value: {
        cy: kpi[0].cy_netto,
        naik: kpi[0].naik_netto,
        yoy: kpi[0].yoy_netto,
      },
    },
  ];
  // console.log(cleanFilterConditions);

  // target
  // const target = await prisma.target.aggregate({
  //   _sum: {
  //     target: true,
  //   },
  //   where: {
  //     ...(cleanFilterConditions.admin && {
  //       admin: {
  //         in: cleanFilterConditions.admin.in,
  //       },
  //     }),
  //   },
  // });

  // const target_py = await prisma.target.aggregate({
  //   _sum: {
  //     target_py: true,
  //   },
  //   where: {
  //     ...(cleanFilterConditions.admin && {
  //       admin: {
  //         in: cleanFilterConditions.admin.in,
  //       },
  //     }),
  //   },
  // });

  //query db
  // const cy_mpn = await prisma.mpn.aggregate({
  //   _sum: {
  //     nominal: true,
  //   },
  //   where: {
  //     datebayar: {
  //       gte: new Date(cleanFilterConditions.from),
  //       lte: new Date(cleanFilterConditions.to),
  //     },
  //     ket: {
  //       in: ["MPN"],
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

  // const cy_spm = await prisma.mpn.aggregate({
  //   _sum: {
  //     nominal: true,
  //   },
  //   where: {
  //     datebayar: {
  //       gte: new Date(cleanFilterConditions.from),
  //       lte: new Date(cleanFilterConditions.to),
  //     },
  //     ket: {
  //       in: ["SPM"],
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

  // const cy_netto = await prisma.mpn.aggregate({
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

  // const cy_bruto = await prisma.mpn.aggregate({
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

  // const cy_restitusi = await prisma.mpn.aggregate({
  //   _sum: {
  //     nominal: true,
  //   },
  //   where: {
  //     datebayar: {
  //       gte: new Date(cleanFilterConditions.from),
  //       lte: new Date(cleanFilterConditions.to),
  //     },
  //     ket: {
  //       in: ["SPMKP"],
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

  // const from = new Date(cleanFilterConditions.from);
  // const to = new Date(cleanFilterConditions.to);

  // const PY_from = new Date(
  //   from.getFullYear() - 1,
  //   from.getMonth(),
  //   from.getDate()
  // );
  // const PY_to = new Date(to.getFullYear() - 1, to.getMonth(), to.getDate());

  // // TAHUN LALU
  // const py_mpn = await prisma.mpn.aggregate({
  //   _sum: {
  //     nominal: true,
  //   },
  //   where: {
  //     datebayar: {
  //       gte: PY_from,
  //       lte: PY_to,
  //     },
  //     ket: {
  //       in: ["MPN"],
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

  // const py_spm = await prisma.mpn.aggregate({
  //   _sum: {
  //     nominal: true,
  //   },
  //   where: {
  //     datebayar: {
  //       gte: PY_from,
  //       lte: PY_to,
  //     },
  //     ket: {
  //       in: ["SPM"],
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

  // const py_netto = await prisma.mpn.aggregate({
  //   _sum: {
  //     nominal: true,
  //   },
  //   where: {
  //     datebayar: {
  //       gte: PY_from,
  //       lte: PY_to,
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

  // const py_bruto = await prisma.mpn.aggregate({
  //   _sum: {
  //     nominal: true,
  //   },
  //   where: {
  //     datebayar: {
  //       gte: PY_from,
  //       lte: PY_to,
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

  // const py_restitusi = await prisma.mpn.aggregate({
  //   _sum: {
  //     nominal: true,
  //   },
  //   where: {
  //     datebayar: {
  //       gte: PY_from,
  //       lte: PY_to,
  //     },
  //     ket: {
  //       in: ["SPMKP"],
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

  // const naik_mpn = (cy_mpn?._sum?.nominal ?? 0) - (py_mpn?._sum?.nominal ?? 0);
  // const yoy_mpn = (naik_mpn / (py_mpn?._sum?.nominal ?? naik_mpn)) * 100;
  // const naik_spm = (cy_spm?._sum?.nominal ?? 0) - (py_spm?._sum?.nominal ?? 0);
  // const yoy_spm = (naik_spm / (py_spm?._sum?.nominal ?? naik_spm)) * 100;
  // const naik_netto =
  //   (cy_netto?._sum?.nominal ?? 0) - (py_netto?._sum?.nominal ?? 0);
  // const yoy_netto =
  //   (naik_netto / (py_netto?._sum?.nominal ?? naik_netto)) * 100;
  // const naik_bruto =
  //   (cy_bruto?._sum?.nominal ?? 0) - (py_bruto?._sum?.nominal ?? 0);
  // const yoy_bruto =
  //   (naik_bruto / (py_bruto?._sum?.nominal ?? naik_bruto)) * 100;
  // const naik_restitusi =
  //   (cy_restitusi?._sum?.nominal ?? 0) - (py_restitusi?._sum?.nominal ?? 0);
  // const yoy_restitusi =
  //   (naik_restitusi / (py_restitusi?._sum?.nominal ?? naik_restitusi)) * 100;

  // const capaian =
  //   BigInt(cy_netto?._sum?.nominal || 0n) / BigInt(target?._sum?.target || 0n);
  // const capaian_py =
  //   BigInt(py_netto?._sum?.nominal || 0n) /
  //   BigInt(target_py?._sum?.target_py || 0n);
  // const naik_capaian = capaian - capaian_py;
  // const responseData = [
  //   {
  //     label: "MPN",
  //     value: {
  //       cy: cy_mpn?._sum?.nominal || 0,
  //       naik: naik_mpn || 0,
  //       yoy: yoy_mpn || 0,
  //     },
  //   },
  //   {
  //     label: "SPM",
  //     value: {
  //       cy: cy_spm?._sum?.nominal || 0,
  //       naik: naik_spm || 0,
  //       yoy: yoy_spm || 0,
  //     },
  //   },
  //   {
  //     label: "Restitusi",
  //     value: {
  //       cy: cy_restitusi?._sum?.nominal || 0,
  //       naik: naik_restitusi || 0,
  //       yoy: yoy_restitusi || 0,
  //     },
  //   },
  //   {
  //     label: "Bruto",
  //     value: {
  //       cy: cy_bruto?._sum?.nominal || 0,
  //       naik: naik_bruto || 0,
  //       yoy: yoy_bruto || 0,
  //     },
  //   },
  //   {
  //     label: "Netto",
  //     value: {
  //       cy: cy_netto?._sum?.nominal || 0,
  //       naik: naik_netto || 0,
  //       yoy: yoy_netto || 0,
  //     },
  //   },
  // ];
  return NextResponse.json(responseData);
}
async function getQueryData(
  from: Date,
  to: Date,
  PY_from: Date,
  PY_to: Date,
  whereClause: string
): Promise<TKPI[]> {
  const kpi = await prisma.$queryRaw(
    Prisma.sql`WITH df as (
      SELECT
    sum(CASE WHEN m.datebayar >= ${from} AND m.datebayar <= ${to} AND ket IN ('MPN')  THEN m.nominal END) AS "cy_mpn",
    sum(CASE WHEN m.datebayar >= ${from} AND m.datebayar <= ${to} AND ket IN ('SPM')  THEN m.nominal END) AS "cy_spm",
    sum(CASE WHEN m.datebayar >= ${from} AND m.datebayar <= ${to} AND ket IN ('SPMKP')  THEN m.nominal END) AS "cy_restitusi",
    sum(CASE WHEN m.datebayar >= ${from} AND m.datebayar <= ${to} THEN m.nominal END) AS "cy_netto",
    sum(CASE WHEN m.datebayar >= ${from} AND m.datebayar <= ${to} AND ket IN ('MPN','SPM') THEN m.nominal END) AS "cy_bruto",
    sum(CASE WHEN m.datebayar >= ${PY_from} AND m.datebayar <= ${PY_to} AND ket IN ('MPN')  THEN m.nominal END) AS "py_mpn",
    sum(CASE WHEN m.datebayar >= ${PY_from} AND m.datebayar <= ${PY_to} AND ket IN ('SPM')  THEN m.nominal END) AS "py_spm",
    sum(CASE WHEN m.datebayar >= ${PY_from} AND m.datebayar <= ${PY_to} AND ket IN ('SPMKP')  THEN m.nominal END) AS "py_restitusi",
    sum(CASE WHEN m.datebayar >= ${PY_from} AND m.datebayar <= ${PY_to} THEN m.nominal END) AS "py_netto",
    sum(CASE WHEN m.datebayar >= ${PY_from} AND m.datebayar <= ${PY_to} AND ket IN ('MPN','SPM') THEN m.nominal END) AS "py_bruto"
    FROM mpn m
    ${Prisma.raw(whereClause)}
        )
        SELECT
        df.*,
        df.cy_mpn - df.py_mpn AS naik_mpn,
        coalesce((df.cy_mpn - df.py_mpn)/NULLIF(df.py_mpn, 0),0) as yoy_mpn,
        df.cy_spm - df.py_spm AS naik_spm,
        coalesce((df.cy_spm - df.py_spm)/NULLIF(df.py_spm, 0),0) as yoy_spm,
        df.cy_netto - df.py_netto AS naik_netto,
        coalesce((df.cy_netto - df.py_netto)/NULLIF(df.py_netto, 0),0) as yoy_netto,
        (df.cy_bruto - df.py_bruto) AS naik_bruto,
        COALESCE((df.cy_bruto - df.py_bruto) / NULLIF(df.cy_bruto, 0), 0) AS yoy_bruto,
        df.cy_restitusi - df.py_restitusi AS naik_restitusi,
        coalesce((df.cy_restitusi - df.py_restitusi)/NULLIF(df.py_restitusi, 0),0) as yoy_restitusi
    FROM df
   `
  );
  return kpi as TKPI[];
}
