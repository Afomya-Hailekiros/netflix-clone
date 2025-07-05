import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ This disables ESLint blocking the Vercel build
  },
  experimental: {
    serverActions: {}, // ✅ Optional: enable server actions with default options
  },
};

export default nextConfig;
