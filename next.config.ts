import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  // Enable static export for deployment on static hosting platforms
  output: 'export',
  // Configure trailing slash for static export
  trailingSlash: true,
  // Optimize images for static export
  images: {
    unoptimized: true,
  },
  // Enable compression for production builds
  compress: true,
  // Configure Turbopack instead of webpack
  turbopack: {},
  // Remove headers configuration since it doesn't work with static export
  // Headers will need to be configured at the hosting level
};
export default nextConfig;