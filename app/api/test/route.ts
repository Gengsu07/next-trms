import { format } from "date-fns";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { mpn_aggregate_ket } from "@/lib/query/mpnaggregate";

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

  //query db
  const cy_mpn = await mpn_aggregate_ket(cleanFilterConditions, ["MPN", "SPM"]);
  return NextResponse.json(cy_mpn);
}
