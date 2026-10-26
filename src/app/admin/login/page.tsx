import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-guard";
import LoginForm from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Masuk Admin — Portofolio",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-5 py-16">
      <p className="font-mono text-xs tracking-wide text-faded uppercase">
        CMS Portofolio
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink">
        Masuk sebagai pemilik
      </h1>
      <p className="mt-2 leading-relaxed text-faded">
        Halaman ini untuk mengelola seluruh konten situs. Masukkan kata sandi
        admin untuk melanjutkan.
      </p>
      <div className="mt-8 border border-line bg-panel/60 p-6">
        <LoginForm />
      </div>
    </div>
  );
}
