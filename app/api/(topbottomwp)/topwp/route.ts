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

  cleanFilterConditions.from = new Date(cleanFilterConditions.from);
  cleanFilterConditions.to = new Date(cleanFilterConditions.to);

  const prevYearFrom = new Date(cleanFilterConditions.from);
  const prevYearTo = new Date(cleanFilterConditions.to);

  prevYearFrom.setFullYear(prevYearFrom.getFullYear() - 1);
  prevYearTo.setFullYear(prevYearTo.getFullYear() - 1);

  const top5 = await prisma.mpn.groupBy({
    by: ["npwp15", "nama_wp"],
    _sum: {
      nominal: true,
    },
    where: {
      datebayar: {
        gte: cleanFilterConditions.from,
        lte: cleanFilterConditions.to,
      },
      AND: {
        ...(cleanFilterConditions.sektor && {
          kd_kategori: {
            in: cleanFilterConditions.sektor.in,
          },
        }),
        ...(cleanFilterConditions.map && {
          kdmap: {
            in: cleanFilterConditions.map.in,
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
    },
    orderBy: {
      _sum: {
        nominal: "desc",
      },
    },
    take: 5,
  });

  const bot5 = await prisma.mpn.groupBy({
    by: ["npwp15", "nama_wp"],
    _sum: {
      nominal: true,
    },
    where: {
      datebayar: {
        gte: cleanFilterConditions.from,
        lte: cleanFilterConditions.to,
      },
      AND: {
        ...(cleanFilterConditions.sektor && {
          kd_kategori: {
            in: cleanFilterConditions.sektor.in,
          },
        }),
        ...(cleanFilterConditions.map && {
          kdmap: {
            in: cleanFilterConditions.map.in,
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
    },
    orderBy: {
      _sum: {
        nominal: "asc",
      },
    },
    take: 5,
  });

  const top5_res = top5.map((item) => ({
    value: item._sum.nominal,
    name: item.nama_wp,
  }));
  const bot5_res = bot5.map((item) => ({
    value: item._sum.nominal,
    name: item.nama_wp,
  }));
  return NextResponse.json({ top: top5_res, bottom: bot5_res });
}