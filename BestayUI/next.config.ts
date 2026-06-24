import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "201.51.25.82",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
