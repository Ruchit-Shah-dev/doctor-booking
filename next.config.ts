import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Enables strict mode to catch errors early
  output: "standalone", // Helps in Vercel deployments by making the app independent of node_modules
  pageExtensions: ["tsx", "ts"], // Ensures Next.js correctly detects page files
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
