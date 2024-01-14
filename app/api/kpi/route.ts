import { format } from "date-fns";
import { sektor } from "@/constant/initialData";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export type TResponseData = {
  label: string;
  value: { cy: number; naik: number; yoy: number };
};

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
  console.log(cleanFilterConditions);
  //query db
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

  const cy_bruto = await prisma.mpn.aggregate({
    _sum: {
      nominal: true,
    },
    where: {
      datebayar: {
        gte: new Date(cleanFilterConditions.from),
        lte: new Date(cleanFilterConditions.to),
      },
      ket: {
        in: ["MPN", "SPM"],
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

  const cy_restitusi = await prisma.mpn.aggregate({
    _sum: {
      nominal: true,
    },
    where: {
      datebayar: {
        gte: new Date(cleanFilterConditions.from),
        lte: new Date(cleanFilterConditions.to),
      },
      ket: {
        in: ["SPMKP"],
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

  const py_bruto = await prisma.mpn.aggregate({
    _sum: {
      nominal: true,
    },
    where: {
      datebayar: {
        gte: PY_from,
        lte: PY_to,
      },
      ket: {
        in: ["MPN", "SPM"],
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

  const py_restitusi = await prisma.mpn.aggregate({
    _sum: {
      nominal: true,
    },
    where: {
      datebayar: {
        gte: PY_from,
        lte: PY_to,
      },
      ket: {
        in: ["SPMKP"],
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

  const naik_netto =
    (cy_netto?._sum?.nominal ?? 0) - (py_netto?._sum?.nominal ?? 0);
  const yoy_netto =
    (naik_netto / (py_netto?._sum?.nominal ?? naik_netto)) * 100;
  const naik_bruto =
    (cy_bruto?._sum?.nominal ?? 0) - (py_bruto?._sum?.nominal ?? 0);
  const yoy_bruto =
    (naik_bruto / (py_bruto?._sum?.nominal ?? naik_bruto)) * 100;
  const naik_restitusi =
    (cy_restitusi?._sum?.nominal ?? 0) - (py_bruto?._sum?.nominal ?? 0);
  const yoy_restitusi =
    (naik_restitusi / (py_bruto?._sum?.nominal ?? naik_restitusi)) * 100;

  const responseData = [
    {
      label: "Netto",
      value: {
        cy: cy_netto?._sum?.nominal || 0,
        naik: naik_netto || 0,
        yoy: yoy_netto || 0,
      },
    },

    {
      label: "Bruto",
      value: {
        cy: cy_bruto?._sum?.nominal || 0,
        naik: naik_bruto || 0,
        yoy: yoy_bruto || 0,
      },
    },

    {
      label: "Restitusi",
      value: {
        cy: cy_restitusi?._sum?.nominal || 0,
        naik: naik_restitusi || 0,
        yoy: yoy_restitusi || 0,
      },
    },
  ];
  return NextResponse.json(responseData);
}
