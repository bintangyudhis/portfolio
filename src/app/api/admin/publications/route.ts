import { makeCollectionHandlers } from "@/lib/admin-crud";
import { publicationToRow, rowToPublication } from "@/lib/admin-db";
import { parsePublication } from "@/lib/admin-payloads";

export const { GET, POST } = makeCollectionHandlers({
  table: "portfolio_publications",
  label: "Publikasi",
  parse: parsePublication,
  toRow: publicationToRow,
  toItem: rowToPublication,
  invalidMessage:
    "Data publikasi tidak valid — slug dan judul wajib diisi.",
});
