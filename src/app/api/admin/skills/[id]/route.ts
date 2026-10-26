import { makeItemHandlers } from "@/lib/admin-crud";
import { rowToSkillGroup, skillGroupToRow } from "@/lib/admin-db";
import { parseSkillGroup } from "@/lib/admin-payloads";

export const { PUT, DELETE } = makeItemHandlers({
  table: "portfolio_skills",
  label: "Kelompok keahlian",
  parse: parseSkillGroup,
  toRow: skillGroupToRow,
  toItem: rowToSkillGroup,
  invalidMessage:
    "Data keahlian tidak valid — nama dan ringkasan ID/EN/JP, serta daftar skill (nama + tingkat) wajib diisi.",
});
