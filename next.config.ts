import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  assetPrefix: process.env.NODE_ENV === 'production' 
    ? process.env.BLOB_URL
    : undefined,
    
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.BLOB_URL!,
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
