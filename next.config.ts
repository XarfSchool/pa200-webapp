import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  assetPrefix: process.env.NODE_ENV === 'production' 
    ? process.env.BLOB_URL as string
    : undefined,
    
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.BLOB_URL as string,
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
