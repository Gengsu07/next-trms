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
    npwp: npwpValues.length > 0 ? { in: kjsValues } : undefined,
  };

  //clean undefined field
  const cleanFilterConditions = Object.fromEntries(
    Object.entries(filterConditions).filter(([_, value]) => value !== undefined)
  );

  //query db
  const data = await prisma.mpn.aggregate({
    _sum: {
      nominal: true,
    },
    where: {
     
    },
  });
  return NextResponse.json(data);
}

// const bruto = await prisma.mpn.aggregate({
//   _sum: {
//     nominal: true,
//   },
//   where: {
//     ket: {
//       in: ["MPN", "SPM"],
//     },
//   },
// });
