import type { Metadata } from "next";
import { headers } from "next/headers";
import Script from "next/script";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getLocale } from "@/lib/lang";
import { getPortfolioContent } from "@/lib/db";
import { pick } from "@/lib/i18n";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});
export const metadata: Metadata = {
  title: "Bintang Yudhistira · Pengembang Perangkat Lunak",
  description:
    "Portofolio Bintang Yudhistira: pengembang perangkat lunak, mahasiswa Informatika Telkom University Purwokerto. Web, aplikasi mobile, dan machine learning.",
  metadataBase: new URL("https://bintangyudhis.my.id"),
  openGraph: {
    title: "Bintang Yudhistira · Pengembang Perangkat Lunak",
    description:
      "Pengembang perangkat lunak: web, aplikasi mobile, dan machine learning.",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Admin screens (proxy stamps x-pathname) get a bare shell: no public
  // site header/footer around the CMS.
  const pathname = (await headers()).get("x-pathname") ?? "";
  if (pathname.startsWith("/admin")) {
    return (
      <html lang="id" className="h-full">
        <body
          className={`${archivo.variable} ${plexMono.variable} flex min-h-full flex-col bg-paper text-ink antialiased`}
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
      suppressHydrationWarning
    >
      <body
        className={`${archivo.variable} ${plexMono.variable} site-body flex min-h-full flex-col bg-paper text-ink antialiased`}
      >
        {/* Pre-paint theme: apply the stored choice before first render so
            the dark theme never flashes light. Light is the default;
            admin gets no script and stays on the light tokens. */}
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{if(localStorage.getItem("theme")==="dark"){document.documentElement.classList.add("dark")}}catch(e){}})();`}
        </Script>
        <SiteHeader
          locale={locale}
          name={profile.name}
          role={pick(profile.role, locale)}
          githubUrl={profile.githubUrl}
          photoUrl={profile.photoUrl}
        />
        <main className="flex-1">{children}</main>
        <SiteFooter locale={locale} profile={profile} />
      </body>
    </html>
  );
}
