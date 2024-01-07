import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await prisma.mpn.findMany({
    skip: 0,
    take: 10,
  });
  return NextResponse.json(data);
}
