const { hostname } = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL);

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      hostname,                // your Supabase domain
      'images.pexels.com',     // any other domains you need
      'picsum.photos'          // picsum can be here instead of remotePatterns
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname,              // for Supabase URLs
      },
    ],
  },
};

module.exports = nextConfig;
