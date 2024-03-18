import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { SektorSingkat } from "@/components/transform/topn";
import { sektor } from "@/constant/initialData";
import { subYears } from "date-fns";

interface resData {
  _sum: {
    nominal: number | null;
  };
  kd_kategori: string | null;
  map: string | null;
}
function filterTopN(data: resData[], n: number): resData[] {
  return data.sort((a, b) => b._sum.nominal! - a._sum.nominal!).slice(0, n);
}

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

  // const prevYearFrom = subYears(cleanFilterConditions.from, 1);
  // const prevYearTo = subYears(cleanFilterConditions.to, 1);

  const cy = await prisma.mpn.groupBy({
    by: ["kd_kategori", "map"],
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
  });

  const topn = filterTopN(cy, 20);
  const name_res = topn.map((item) => ({
    kd_kategori: item.kd_kategori,
  }));

  const mergedSektor = SektorSingkat(name_res);

  const sektor_res = mergedSektor.map((item) => ({
    name: item.nm_sektor,
  }));
  const map_res = topn.map((item) => ({ name: item.map }));
  const nodes = [...sektor_res, ...map_res].filter(
    (value, index, self) =>
      self.findIndex((t) => t.name === value.name) === index
  );
  const links = topn.map((item) => ({
    source:
      sektor.find((label) => label.value === item.kd_kategori)?.label ||
      "Lainnya",
    target: item.map,
    value: item._sum.nominal,
  }));

  // return NextResponse.json(map_res);
  return NextResponse.json({ nodes, links });
}
