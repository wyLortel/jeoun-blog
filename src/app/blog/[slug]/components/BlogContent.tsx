import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlugs from 'rehype-slug';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSanitize from 'rehype-sanitize';

export default function BlogContent({ markdown }: { markdown: string }) {
  return (
    <article className="prose prose-neutral prose-sm dark:prose-invert mt-10 max-w-none">
      <MDXRemote
        source={markdown}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlugs, rehypeSanitize, rehypePrettyCode],
          },
        }}
      />
    </article>
  );
}
