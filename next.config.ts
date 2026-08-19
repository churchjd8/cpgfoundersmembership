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

      // /toolbox is printed in "The Cold-Pressed Truth" — catch the near misses
      // so a mistyped URL from the page still lands.
      { source: "/tools", destination: "/toolbox", permanent: true },
      { source: "/thetoolbox", destination: "/toolbox", permanent: true },
      { source: "/book-toolbox", destination: "/toolbox", permanent: true },
      { source: "/booktoolbox", destination: "/toolbox", permanent: true },
    ];
  },
};

export default nextConfig;
