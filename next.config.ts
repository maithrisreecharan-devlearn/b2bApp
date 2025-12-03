import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  /* config options here */
  reactStrictMode: true,      // recommended in development/production
  // If deploying as a standalone server (Docker), uncomment:
  // output: 'standalone',

  // Images you load from external hosts (add yours)
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.mouser.com' },
      { protocol: 'https', hostname: 'media.mouser.com' },
      { protocol: 'https', hostname: 'your-cdn.example.com' },
    ],
  },
};



export default nextConfig;
