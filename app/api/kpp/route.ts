import { prisma } from "@/prisma/client";
import { ItemText } from "@radix-ui/react-select";
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
  const cleanFilterConditions = Object.fromEntries(
    Object.entries(filterConditions).filter(([_, value]) => value !== undefined)
  );

  const perkpp = await prisma.mpn.groupBy({
    by: ["admin"],
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
  });
  const perkpp_res = perkpp.map((item) => ({
    name: item.admin,
    value: item._sum.nominal,
  }));

  return NextResponse.json(perkpp_res);
}
