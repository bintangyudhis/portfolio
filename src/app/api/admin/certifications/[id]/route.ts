import { makeItemHandlers } from "@/lib/admin-crud";
import { certificationToRow, rowToCertification } from "@/lib/admin-db";
import { parseCertification } from "@/lib/admin-payloads";

export const { PUT, DELETE } = makeItemHandlers({
  table: "portfolio_certifications",
  label: "Sertifikasi",
  parse: parseCertification,
  toRow: certificationToRow,
  toItem: rowToCertification,
  invalidMessage:
    "Data sertifikasi tidak valid — judul, penerbit, dan tanggal terbit ID/EN/JP wajib diisi.",
});
