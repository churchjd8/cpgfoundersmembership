import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/vip-day-apply", destination: "/work-with-jeff", permanent: true },
      { source: "/vip-day-apply/:path*", destination: "/work-with-jeff/:path*", permanent: true },
      { source: "/vipday", destination: "/work-with-jeff", permanent: true },
      { source: "/90-day-breakthrough", destination: "/work-with-jeff", permanent: false },
      { source: "/90-day-breakthrough-apply", destination: "/work-with-jeff", permanent: false },
      { source: "/advisory", destination: "/work-with-jeff", permanent: false },
    ];
  },
};

export default nextConfig;
