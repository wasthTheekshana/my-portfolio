import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: no Cache Components / partial prefetching (they conflict with static params).
  poweredByHeader: false,
};

export default nextConfig;
