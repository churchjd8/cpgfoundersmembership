import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // /apply is the canonical application URL. /work-with-jeff is its own
      // page now (the offer ladder), so only its old subpaths still redirect.
      { source: "/work-with-jeff/:path+", destination: "/apply/:path+", permanent: true },
      // /intensive was the old unlisted advisory breakdown; /advisory replaced it.
      // The unlisted two-tier pricing page is retired: the price is public now
      // and VIP is offered on the intro call.
      { source: "/advisory", destination: "/work-with-jeff", permanent: false },
      { source: "/advisory/:path+", destination: "/work-with-jeff", permanent: false },
      { source: "/workwithjeff-2", destination: "/work-with-jeff", permanent: true },
      { source: "/work-with-jeff-preview", destination: "/work-with-jeff", permanent: false },
      { source: "/intensive", destination: "/work-with-jeff", permanent: false },
      { source: "/intensive/:path+", destination: "/work-with-jeff", permanent: false },
      { source: "/vip-advisory", destination: "/work-with-jeff", permanent: false },
      { source: "/vip-advisory/:path+", destination: "/work-with-jeff", permanent: false },
      { source: "/vip-day-apply", destination: "/apply", permanent: true },
      { source: "/vip-day-apply/:path*", destination: "/apply/:path*", permanent: true },
      { source: "/vipday", destination: "/apply", permanent: true },
      { source: "/90-day-breakthrough", destination: "/work-with-jeff", permanent: false },
      { source: "/90-day-breakthrough-apply", destination: "/apply", permanent: false },

      // The dictionary is the canonical public name; preserve old glossary links.
      { source: "/cpg-glossary", destination: "/cpg-dictionary", permanent: true },

      // /toolbox is printed in "The Cold Pressed Truth" — catch the near misses
      // so a mistyped URL from the page still lands.
      { source: "/tools", destination: "/toolbox", permanent: true },
      { source: "/toolkit", destination: "/toolbox", permanent: true },
      { source: "/thetoolbox", destination: "/toolbox", permanent: true },
      { source: "/book-toolbox", destination: "/toolbox", permanent: true },
      { source: "/booktoolbox", destination: "/toolbox", permanent: true },
    ];
  },
};

export default nextConfig;
