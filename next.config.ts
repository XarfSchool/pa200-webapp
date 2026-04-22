import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  assetPrefix: process.env.NODE_ENV === 'production' 
    ? process.env.BLOB_URL
    : undefined,
    
  // Optional: If you use the <Image /> component, you must whitelist the domain
  images: {
    domains: [process.env.BLOB_URL!],
    // Or use remotePatterns for better security
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
