import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // /apply is the canonical application URL — everything funnels there.
      { source: "/work-with-jeff", destination: "/apply", permanent: true },
      { source: "/work-with-jeff/:path*", destination: "/apply/:path*", permanent: true },
      { source: "/vip-day-apply", destination: "/apply", permanent: true },
      { source: "/vip-day-apply/:path*", destination: "/apply/:path*", permanent: true },
      { source: "/vipday", destination: "/apply", permanent: true },
      { source: "/90-day-breakthrough", destination: "/apply", permanent: false },
      { source: "/90-day-breakthrough-apply", destination: "/apply", permanent: false },
      { source: "/advisory", destination: "/apply", permanent: false },
    ];
  },
};

export default nextConfig;
