import { getPostBySlug, getPublishedPosts } from '@/lib/notion';
import { compile } from '@mdx-js/mdx';
import withSlugs from 'rehype-slug';
import withToc from '@stefanprobst/rehype-extract-toc';
import withTocExport from '@stefanprobst/rehype-extract-toc/mdx';
import rehypeSanitize from 'rehype-sanitize';
import BlogHeader from './components/BlogHeader';
import BlogContent from './components/BlogContent';
import BlogNavigation from './components/BlogNavigation';
import TocSection from './components/TocSection';
import { Separator } from '@radix-ui/react-separator';

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

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
      <TocSection toc={data?.toc || []} />
    </div>
  );
}
