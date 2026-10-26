import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // CMS-uploaded media lives in the public Supabase Storage bucket
    // `portfolio-media` on the shared `dompetku` project.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
