import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  // Use the Storage URL in production, otherwise use relative paths
  assetPrefix: isProd ? process.env.BLOB_URL : undefined,
};

export default nextConfig;
