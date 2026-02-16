import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: '/OmnifusionAI/:path*',
        destination: '/omnifusionai/:path*',
        permanent: true,
      },
      {
        source: '/OmnifusionAi/:path*',
        destination: '/omnifusionai/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
