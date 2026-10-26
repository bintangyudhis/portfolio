import { makeCollectionHandlers } from "@/lib/admin-crud";
import { projectToRow, rowToProject } from "@/lib/admin-db";
import { parseProject } from "@/lib/admin-payloads";

export const { GET, POST } = makeCollectionHandlers({
  table: "portfolio_projects",
  label: "Proyek",
  parse: parseProject,
  toRow: projectToRow,
  toItem: rowToProject,
  invalidMessage:
    "Data proyek tidak valid — slug (huruf kecil, angka, tanda hubung), judul, tahun, teknologi, dan deskripsi ID/EN/JP wajib diisi.",
});
