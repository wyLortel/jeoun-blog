// next.config.mjs (또는 next.config.js)

// MDX 플러그인 불러오기
import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const baseConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',
      'plus.unsplash.com',
      'static.notion-static.com',
      'www.notion.so',
    ],
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
};

// MDX 플러그인 활성화
const withMDX = createMDX({
  // 필요하면 remark/rehype 플러그인 옵션 넣기
});

// MDX와 기존 설정 합치기
export default withMDX(baseConfig);
