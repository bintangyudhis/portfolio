import { makeCollectionHandlers } from "@/lib/admin-crud";
import { experienceToRow, rowToExperience } from "@/lib/admin-db";
import { parseExperience } from "@/lib/admin-payloads";

export const { GET, POST } = makeCollectionHandlers({
  table: "portfolio_experiences",
  label: "Pengalaman",
  parse: parseExperience,
  toRow: experienceToRow,
  toItem: rowToExperience,
  invalidMessage:
    "Data pengalaman tidak valid — slug (huruf kecil, angka, tanda hubung), organisasi, jenis, dan semua teks ID/EN/JP wajib diisi.",
});
