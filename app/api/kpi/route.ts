import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const bruto = await prisma.mpn.aggregate({
    _sum: {
      nominal: true,
    },
    where: {
      ket: {
        in: ["MPN", "SPM"],
      },
    },
  });
  return NextResponse.json(data);
}
