import { makeItemHandlers } from "@/lib/admin-crud";
import { experienceToRow, rowToExperience } from "@/lib/admin-db";
import { parseExperience } from "@/lib/admin-payloads";

export const { PUT, DELETE } = makeItemHandlers({
  table: "portfolio_experiences",
  label: "Pengalaman",
  parse: parseExperience,
  toRow: experienceToRow,
  toItem: rowToExperience,
  invalidMessage:
    "Data pengalaman tidak valid — organisasi, jenis, dan semua teks ID/EN/JP wajib diisi.",
});
