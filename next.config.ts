import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.prismic.io" },
      { protocol: "https", hostname: "icomat.cdn.prismic.io" },
      { protocol: "https", hostname: "www.icomat.co.uk" },
      { protocol: "https", hostname: "icomat.b-cdn.net" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
