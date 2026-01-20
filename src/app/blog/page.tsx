import { PostCard } from '@/src/app/blog/components/PostCard';
import Link from 'next/link';
import TagSection from './components/TagSection';
import Image from 'next/image';
import { getPublishedPosts, getTags } from '../../../lib/notion';
import PaginationUI from './components/PaginationUI';

export const revalidate = 60;

interface HomeProps {
  searchParams: Promise<{ tag?: string; page?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { tag, page } = await searchParams;

  const selectedTag = tag ?? '전체';
  const currentPage = Math.max(Number(page) || 1, 1);
  const pageSize = 10;

  // ✅ 서버 캐시 적용된 호출
  const [{ posts: allPosts }, tags] = await Promise.all([getPublishedPosts(), getTags()]);

  const filteredPosts =
    selectedTag === '전체'
      ? allPosts
      : allPosts.filter((post) => (post.tags ?? []).includes(selectedTag));

  const totalCount = filteredPosts.length;
  const totalPages = Math.ceil(totalCount / pageSize);

  const start = (currentPage - 1) * pageSize;
  const paginatedPosts = filteredPosts.slice(start, start + pageSize);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6 md:grid md:grid-cols-[75%_25%]">
        <div className="order-2 space-y-6 md:order-1">
          <div className="relative hidden h-40 w-full overflow-hidden rounded-3xl md:block">
            <Image
              src="/blogHeader.jpeg"
              alt="Blog Header"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>

          <div className="space-y-6">
            {paginatedPosts.map((post, index) => (
              <Link href={`/blog/${post.slug}`} key={post.id} className="block">
                <PostCard post={post} isFirst={index === 0} />
              </Link>
            ))}
          </div>

          <PaginationUI
            currentPage={currentPage}
            totalPages={totalPages}
            selectedTag={selectedTag}
          />
        </div>

        <aside className="order-1 space-y-10 md:order-2 md:ml-2">
          <TagSection tags={tags} />
        </aside>
      </div>
    </div>
  );
}

//앱 디렉토가 도메인에서 접근할떄 루트라고 보면 되고 이 하위에 페이지가 잇으면 루트를 햇을때 렌더링이 되는 페이지다
