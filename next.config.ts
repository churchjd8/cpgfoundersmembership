import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/90-day-breakthrough", destination: "/vip-day-apply", permanent: false },
      { source: "/90-day-breakthrough-apply", destination: "/vip-day-apply", permanent: false },
      { source: "/advisory", destination: "/vip-day-apply", permanent: false },
    ];
  },
};

export default nextConfig;
