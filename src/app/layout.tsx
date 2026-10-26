import type { Metadata } from "next";
import { headers } from "next/headers";
import { Archivo, Fraunces, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getLocale } from "@/lib/lang";
import { getPortfolioContent } from "@/lib/db";
import { pick } from "@/lib/i18n";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal"],
});
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});
export const metadata: Metadata = {
  title: "Bintang Yudhistira — Pengembang Perangkat Lunak",
  description:
    "Portofolio Bintang Yudhistira: pengembang perangkat lunak, mahasiswa Informatika Telkom University Purwokerto. Web, aplikasi mobile, dan machine learning.",
  metadataBase: new URL("https://bintangyudhis.my.id"),
  openGraph: {
    title: "Bintang Yudhistira — Pengembang Perangkat Lunak",
    description:
      "Pengembang perangkat lunak — web, aplikasi mobile, dan machine learning.",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Admin screens (proxy stamps x-pathname) get a bare shell — no public
  // site header/footer around the CMS.
  const pathname = (await headers()).get("x-pathname") ?? "";
  if (pathname.startsWith("/admin")) {
    return (
      <html lang="id" className="h-full">
        <body
          className={`${archivo.variable} ${fraunces.variable} ${plexMono.variable} flex min-h-full flex-col bg-paper text-ink antialiased`}
        >
          <main className="flex flex-1 flex-col">{children}</main>
        </body>
      </html>
    );
  }

  const locale = await getLocale();
  const { profile } = await getPortfolioContent();

  return (
    <html
      lang={locale === "jp" ? "ja" : locale}
      className="h-full"
      data-locale={locale}
    >
      <body
        className={`${archivo.variable} ${fraunces.variable} ${plexMono.variable} flex min-h-full flex-col bg-paper text-ink antialiased`}
      >
        <SiteHeader locale={locale} name={profile.name} role={pick(profile.role, locale)} />
        <main className="flex-1">{children}</main>
        <SiteFooter locale={locale} profile={profile} />
      </body>
    </html>
  );
}
