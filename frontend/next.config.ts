import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The Powering Canada Strong assessment was retitled in November 2026 and its
  // slug changed with it. Inbound links to the old path keep working.
  async redirects() {
    return [
      {
        source: "/assessments/powering-canada-strong-financing-the-build",
        destination: "/assessments/powering-canada-strong-from-strategy-to-action",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
