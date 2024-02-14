import { prisma } from "@/prisma/client";

type Tket = {
  ket: "MPN" | "SPM" | "SPMKP" | (Tket | string)[];
};
export async function mpn_aggregate_ket(
  cleanFilterConditions: any,
  ket: Tket | string[]
) {
  const cy_mpn = await prisma.mpn.aggregate({
    _sum: {
      nominal: true,
    },
    where: {
      datebayar: {
        gte: new Date(cleanFilterConditions.from),
        lte: new Date(cleanFilterConditions.to),
      },
      ket: {
        in: [`${ket}`],
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
  return cy_mpn;
}
