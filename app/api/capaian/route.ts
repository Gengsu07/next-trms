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
  //   const kd_kpp =
  //     filterConditions.admin === undefined ? ["110"] : filterConditions.admin;
  //clean undefined field
  const cleanFilterConditions = Object.fromEntries(
    Object.entries(filterConditions).filter(([_, value]) => value !== undefined)
  );
  // console.log(cleanFilterConditions);
  // target
  //   const admin = cleanFilterConditions?.admin?.in;
  //   console.log(admin);
  const target = await prisma.target.aggregate({
    _sum: {
      target: true,
    },
    where: {
      ...(cleanFilterConditions.admin && {
        admin: {
          in: cleanFilterConditions.admin.in ?? ["110"],
        },
      }),
    },
  });

  const target_internal = await prisma.target.aggregate({
    _sum: {
      target_internal: true,
    },
    where: {
      ...(cleanFilterConditions.admin && {
        admin: {
          in: cleanFilterConditions.admin.in ?? ["110"],
        },
      }),
    },
  });

  const target_py = await prisma.target.aggregate({
    _sum: {
      target_py: true,
    },
    where: {
      ...(cleanFilterConditions.admin && {
        admin: {
          in: cleanFilterConditions.admin.in ?? ["110"],
        },
      }),
    },
  });

  const cy_netto = await prisma.mpn.aggregate({
    _sum: {
      nominal: true,
    },
    where: {
      datebayar: {
        gte: new Date(cleanFilterConditions.from),
        lte: new Date(cleanFilterConditions.to),
      },
      ...(cleanFilterConditions.sektor && {
        kd_kategori: {
          in: cleanFilterConditions.sektor.in,
        },
      }),
      ...(cleanFilterConditions.admin && {
        admin: {
          in: cleanFilterConditions.admin.in,
        },
      }),
      ...(cleanFilterConditions.kjs && {
        kdbayar: {
          in: cleanFilterConditions.kjs.in,
        },
      }),
      ...(cleanFilterConditions.npwp && {
        npwp15: {
          in: cleanFilterConditions.npwp.in,
        },
      }),
    },
  });

  const from = new Date(cleanFilterConditions.from);
  const to = new Date(cleanFilterConditions.to);

  const PY_from = new Date(
    from.getFullYear() - 1,
    from.getMonth(),
    from.getDate()
  );
  const PY_to = new Date(to.getFullYear() - 1, to.getMonth(), to.getDate());
  const py_netto = await prisma.mpn.aggregate({
    _sum: {
      nominal: true,
    },
    where: {
      datebayar: {
        gte: PY_from,
        lte: PY_to,
      },
      ...(cleanFilterConditions.sektor && {
        kd_kategori: {
          in: cleanFilterConditions.sektor.in,
        },
      }),
      ...(cleanFilterConditions.admin && {
        admin: {
          in: cleanFilterConditions.admin.in,
        },
      }),
      ...(cleanFilterConditions.kjs && {
        kdbayar: {
          in: cleanFilterConditions.kjs.in,
        },
      }),
      ...(cleanFilterConditions.npwp && {
        npwp15: {
          in: cleanFilterConditions.npwp.in,
        },
      }),
    },
  });
  //   console.log(cy_netto);
  //   console.log(target);

  const capaian =
    (cy_netto?._sum?.nominal ?? 0) /
    Number(target?._sum?.target ?? cy_netto?._sum?.nominal);
  const capaian_internal =
    (cy_netto?._sum?.nominal ?? 0) /
    Number(target_internal?._sum?.target_internal ?? cy_netto?._sum?.nominal);

  const capaian_py =
    (py_netto?._sum?.nominal ?? 0) /
    Number(target_py?._sum?.target_py ?? py_netto?._sum?.nominal);
  const naik_capaian = capaian - capaian_py;

  const responseData = {
    label: "Capaian",
    value: {
      cy: Number(capaian) * 100 || 0,
      py: Number(capaian_py) * 100 || 0,
      cy_internal: Number(capaian_internal) * 100,
      naik: Number(naik_capaian) * 100 || 0,
      yoy: 0,
    },
  };
  //   const responseData = {
  //     label: "NEtto",
  //     value: {
  //       cy: cy_netto?._sum?.nominal || 0,
  //       naik: target._sum.target,
  //       yoy: 0,
  //     },
  //   };
  return NextResponse.json(responseData);
  //   return NextResponse.json(target);
}
