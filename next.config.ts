import type { NextConfig } from 'next';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com', // 일반 Unsplash
      'plus.unsplash.com', // 프리미엄 Unsplash (지금 에러 원인)
      'static.notion-static.com', // Notion 이미지
      'www.notion.so', // Notion 내부 경로
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
