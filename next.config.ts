import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "193.56.240.84",
        port: "1337",
        pathname: "/uploads/**/*",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
