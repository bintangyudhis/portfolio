import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bintang Yudhistira — Software Developer",
  description:
    "Portfolio of Bintang Yudhistira: Software Developer, AI & Tech Enthusiast exploring Machine Learning & Computer Vision. Informatics student at Telkom University Purwokerto.",
  metadataBase: new URL("https://bintangyudhis.my.id"),
  openGraph: {
    title: "Bintang Yudhistira — Software Developer",
    description:
      "Software Developer, AI & Tech Enthusiast exploring Machine Learning & Computer Vision.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} min-h-full flex flex-col bg-ink-950 text-slate-200 antialiased`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
