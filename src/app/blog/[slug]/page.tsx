import { getPostBySlug, getPublishedPosts } from '@/lib/notion';

//Markdown을 JSX 코드로 변환
import { compile } from '@mdx-js/mdx';

//자동으로 id생성해서 붙여줌
import withSlugs from 'rehype-slug';

//h1/h2/h3의 구조를 분석하여 TOC(목차) 데이터를 자동으로 생성
import withToc from '@stefanprobst/rehype-extract-toc';

//MDX 파일 안에서 export const toc = [...] 형태로 목차 데이터를 자동으로 내보내게 해주는 플러그인
import withTocExport from '@stefanprobst/rehype-extract-toc/mdx';

import rehypeSanitize from 'rehype-sanitize';
import BlogHeader from './components/BlogHeader';
import BlogContent from './components/BlogContent';
import BlogNavigation from './components/BlogNavigation';
import TocSection from './components/TocSection';
import { Separator } from '@radix-ui/react-separator';

//params는 next js에 저자리에 쓰면 자동으로 [slug]값이 들어감
export default async function Page({ params }: { params: { slug: string } }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const { post, markdown } = await getPostBySlug(slug);
  const allPosts = await getPublishedPosts();
  const index = allPosts.findIndex((p) => p.slug === slug);

  const newerPost = allPosts[index - 1] ?? null;
  const olderPost = allPosts[index + 1] ?? null;

  const { data } = await compile(markdown, {
    rehypePlugins: [withSlugs, rehypeSanitize, withToc, withTocExport],
  });

  return (
    <div className="container mx-auto grid grid-cols-[80%_20%] gap-8">
      <div>
        <BlogHeader post={post} />
        <Separator className="my-10 border-t border-black/20 dark:border-white/20" />
        <BlogContent markdown={markdown} />
        <BlogNavigation newerPost={newerPost} olderPost={olderPost} />
      </div>

      {/* 사이드 */}
      {/* 각 목차를 props로 보냄 */}
      <TocSection toc={data?.toc || []} />
    </div>
  );
}
