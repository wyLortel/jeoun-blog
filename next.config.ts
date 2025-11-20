/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',
      'plus.unsplash.com',
      'static.notion-static.com',
      'www.notion.so',
    ],
  },
};

export default nextConfig;
