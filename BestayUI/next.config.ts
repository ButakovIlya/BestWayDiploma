import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "37.252.17.61",
        pathname: "/media/**",
      },
    ],
    domains: ["images.unsplash.com"],
  },
};

export default nextConfig;
