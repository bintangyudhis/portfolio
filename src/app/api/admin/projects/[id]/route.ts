import { makeItemHandlers } from "@/lib/admin-crud";
import { projectToRow, rowToProject } from "@/lib/admin-db";
import { parseProject } from "@/lib/admin-payloads";

export const { PUT, DELETE } = makeItemHandlers({
  table: "portfolio_projects",
  label: "Proyek",
  parse: parseProject,
  toRow: projectToRow,
  toItem: rowToProject,
  invalidMessage:
    "Data proyek tidak valid — judul, tahun, teknologi, dan deskripsi ID/EN/JP wajib diisi.",
});
