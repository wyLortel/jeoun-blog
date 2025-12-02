import { PostCard } from '@/src/app/blog/components/PostCard';
import Link from 'next/link';
import TagSection from './components/TagSection';
import Image from 'next/image';
import { getPublishedPosts, getTags } from '../../../lib/notion';
import PaginationUI from './components/PaginationUI';


// Next.js 15 searchParams는 Promise
interface HomeProps {
  searchParams: Promise<{ tag?: string; page?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { tag, page } = await searchParams;
  const selectedTag = tag || '전체';
  const currentPage = Number(page) > 0 ? Number(page) : 1;
  const pageSize = 10;

  const { posts: allPosts } = await getPublishedPosts({});
  const tags = await getTags();

  const posts =
    selectedTag === '전체'
      ? allPosts
      : allPosts.filter((post) =>
          (post.tags || []).includes(selectedTag)
        );

  // 페이지네이션 계산
  const totalCount = posts.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  const start = (currentPage - 1) * pageSize;
  const paginatedPosts = posts.slice(start, start + pageSize);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-[75%_25%] gap-6">
        <div className="space-y-6">
          <div className="relative h-40 w-full overflow-hidden rounded-3xl">
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

        <aside className="ml-2 space-y-10">
          <TagSection tags={tags} />
        </aside>
      </div>
    </div>
  );
}


//앱 디렉토가 도메인에서 접근할떄 루트라고 보면 되고 이 하위에 페이지가 잇으면 루트를 햇을때 렌더링이 되는 페이지다
