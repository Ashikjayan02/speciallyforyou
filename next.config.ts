import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for static hosting
  output: 'export',

  // Trailing slash helps Netlify handle static routes
  trailingSlash: true,

  // Image optimization not supported in static export
  images: {
    unoptimized: true,
  },

  // Enable compression for production
  compress: true,
};

export default nextConfig;
