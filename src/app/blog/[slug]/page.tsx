import { Badge } from '@/src/app/_components/ui/badge';
import { Separator } from '@/src/app/_components/ui/separator';
import { CalendarDays } from 'lucide-react';
import Link from 'next/link';
import { getPostBySlug } from '@/lib/notion';
import { formatDate } from '@/lib/date';
import { MDXRemote } from 'next-mdx-remote/rsc';

import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';

import { compile } from '@mdx-js/mdx';
import withSlugs from 'rehype-slug';
import withToc from '@stefanprobst/rehype-extract-toc';
import withTocExport from '@stefanprobst/rehype-extract-toc/mdx';

interface TocEntry {
  value: string;
  depth: number;
  id?: string;
  children?: Array<TocEntry>;
}

type Toc = Array<TocEntry>;

// text-muted-foreground 밝은 보조 텍스트 색상
function TableOfContentsLink({ item }: { item: TocEntry }) {
  return (
    <div className="py-1">
      <Link
        href={`#${item.id}`}
        className="text-muted-foreground hover:text-foreground block text-sm transition-colors"
      >
        {item.value}
      </Link>

      {item.children && item.children.length > 0 && (
        <div className="border-border/70 mt-1 ml-4 space-y-1 border-l pl-3">
          {item.children.map((subItem) => (
            <TableOfContentsLink key={subItem.id} item={subItem} />
          ))}
        </div>
      )}
    </div>
  );
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // 포스트와 마크다운 가져오기
  const { post, markdown } = await getPostBySlug(slug);

  // TOC 추출용 컴파일 (slug 부여 + sanitize + toc 추출)
  const { data } = await compile(markdown, {
    rehypePlugins: [
      withSlugs, // 제목에 id 부여
      rehypeSanitize, // HTML 필터링
      withToc, // heading 구조 분석
      withTocExport, // mdx로 export
    ],
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-[80%_20%] gap-8">
        <section>
          {/* 블로그 헤더 */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">{post.title}</h1>
          </div>

          {/* 메타 정보 */}
          <div className="text-muted-foreground text-l mt-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <CalendarDays className=",w-4 h-4" />
                <span>{formatDate(post.date)}</span>
              </div>

              <div className="flex gap-2">
                {post.tags?.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          {/* 블로그 본문 */}
          <div className="prose prose-neutral prose-sm dark:prose-invert prose-headings:mt-10 prose-h1:mb-6 prose-h2:mt-12 prose-h2:mb-4 max-w-none">
            <MDXRemote
              source={markdown}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    rehypeSlug, // ← 실제 렌더링되는 heading에 id 부여
                    rehypeSanitize, // HTML 정화
                    rehypePrettyCode, // 코드 하이라이트
                  ],
                },
              }}
            />
          </div>

          <Separator className="my-16" />

          {/* 이전/다음 포스트 네비게이션 */}
          <nav className="flex flex-col gap-10">
            <Link href="/blog/previous-post">
              <span>다음 글</span>
              <div className="flex gap-5">
                <div>이미지</div>
                <div>
                  <h2>이것은 제목입니다</h2>
                  <p>2025년 11월 8일</p>
                </div>
              </div>
            </Link>

            <Link href="/blog/previous-post">
              <span>이전 글</span>
              <div className="flex gap-5">
                <div>이미지</div>
                <div>
                  <h2>이것은 제목입니다</h2>
                  <p>2025년 11월 8일</p>
                </div>
              </div>
            </Link>
          </nav>
        </section>

        {/* 목차 */}
        <aside className="sticky top-24 self-start">
          <div className="space-y-4 rounded-lg p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold">목차</h3>
            <nav className="max-h-[80vh] space-y-3 overflow-y-auto text-sm">
              {data?.toc?.map((item) => (
                <TableOfContentsLink key={item.id} item={item} />
              ))}
            </nav>
          </div>
        </aside>
      </div>
    </div>
  );
}
