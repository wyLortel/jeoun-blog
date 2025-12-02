import { getPostBySlug, getPublishedPosts } from "@/lib/notion";
import BlogHeader from "./components/BlogHeader";
import BlogContent from "./components/BlogContent";
import BlogNavigation from "./components/BlogNavigation";
import TocSection from "./components/TocSection";
import { TocEntry } from "./types";

export const revalidate = 3600;

/* -----------------------------
   Markdown에서 TOC 직접 추출하는 함수
------------------------------ */

function buildNestedToc(flatList: TocEntry[]): TocEntry[] {
  const root: TocEntry[] = [];
  const stack: TocEntry[] = [];

  for (const item of flatList) {
    while (stack.length && stack[stack.length - 1].depth >= item.depth) {
      stack.pop();
    }

    if (stack.length === 0) {
      root.push(item);
      stack.push(item);
    } else {
      const parent = stack[stack.length - 1];

      // children이 undefined면 초기화
      if (!parent.children) parent.children = [];

      parent.children.push(item);
      stack.push(item);
    }
  }

  return root;
}


// 메인 함수
function extractToc(markdown: string) {
  const lines = markdown.split("\n");

  const flat: TocEntry[] = [];
  const idCount: Record<string, number> = {}; // 중복방지

  function createUniqueId(base: string) {
    if (!idCount[base]) {
      idCount[base] = 1;
      return base;
    }
    const id = `${base}-${idCount[base]}`;
    idCount[base] += 1;
    return id;
  }

  for (const line of lines) {
    const h1 = /^# (.*)/.exec(line);
    const h2 = /^## (.*)/.exec(line);
    const h3 = /^### (.*)/.exec(line);

    if (h1) {
      const text = h1[1].trim();
      const base = text.replace(/\s+/g, "-");
      const id = createUniqueId(base);
      flat.push({ id, value: text, depth: 1, children: [] });
    }
    if (h2) {
      const text = h2[1].trim();
      const base = text.replace(/\s+/g, "-");
      const id = createUniqueId(base);
      flat.push({ id, value: text, depth: 2, children: [] });
    }
    if (h3) {
      const text = h3[1].trim();
      const base = text.replace(/\s+/g, "-");
      const id = createUniqueId(base);
      flat.push({ id, value: text, depth: 3, children: [] });
    }
  }

  return buildNestedToc(flat);
}



/* -----------------------------
   🔥 정적 파라미터 생성
------------------------------ */
export async function generateStaticParams() {
  const { posts } = await getPublishedPosts({});
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

/* -----------------------------
   페이지 컴포넌트
------------------------------ */
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { post, markdown } = await getPostBySlug(slug);
  const { posts: allPosts } = await getPublishedPosts({});

  const index = allPosts.findIndex((p) => p.slug === slug);
  const newerPost = allPosts[index - 1] ?? null;
  const olderPost = allPosts[index + 1] ?? null;

  return (
    <div className="container mx-auto grid grid-cols-[80%_20%] gap-8">
      <div>
        <BlogHeader post={post} />
        <BlogContent markdown={markdown} />
        <BlogNavigation newerPost={newerPost} olderPost={olderPost} />
      </div>

      <TocSection toc={extractToc(markdown)} />
    </div>
  );
}
