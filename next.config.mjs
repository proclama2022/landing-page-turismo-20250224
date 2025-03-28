/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['randomuser.me', 'images.unsplash.com'],
    unoptimized: true,
  },
  experimental: {
    // appDir è ora abilitato di default
  },
};

export default nextConfig;
