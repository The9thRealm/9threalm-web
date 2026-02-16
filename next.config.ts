import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: '/omnifusionai/:path*',
        destination: '/OmnifusionAI/:path*',
        permanent: true,
      },
      {
        source: '/OmnifusionAi/:path*',
        destination: '/OmnifusionAI/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
