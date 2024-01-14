import { z } from "zod";

export const FilterSchema = z.object({
  tanggal: z.object({ from: z.date(), to: z.date() }),
  admin: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
  sektor: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .optional(),
  map: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
  kjs: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
  npwp: z
    .string()
    .refine((value) => /^\d+$/.test(value) && value.length === 15, {
      message: "NPWP harus 15 digit dan berisi hanya karakter angka (0-9)",
    })
    .optional(),
});