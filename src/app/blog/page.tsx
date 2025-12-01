import { PostCard } from '@/src/app/blog/components/PostCard';
import Link from 'next/link';
import TagSection from './components/TagSection';
import Image from 'next/image';
import { getPublishedPosts, getTags } from '../../../lib/notion';

// Next.js 15 요구 타입: searchParams는 Promise
interface HomeProps {
  searchParams: Promise<{ tag?: string }>;
}

// 전체면 태그가 없으니 필터 안 거쳐서 전체가 나온다.
// 태그가 있으면 필터가 걸린다.
export default async function Home({ searchParams }: HomeProps) {
  const { tag } = await searchParams; // 중요!!
  const selectedTag = tag || '전체';

  const [posts, tags] = await Promise.all([getPublishedPosts(selectedTag), getTags()]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-[75%_25%] gap-6">
        {/* 블로그 본문 영역 */}
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

          {/* 게시글 목록 */}
          <div className="space-y-6">
            {posts.map((post, index) => (
              <Link href={`/blog/${post.slug}`} key={post.id} className="block">
                <PostCard post={post} isFirst={index === 0} />
              </Link>
            ))}
          </div>
        </div>

        {/* 사이드바 */}
        <aside className="ml-2 space-y-10">
          <TagSection tags={tags} />
        </aside>
      </div>
    </div>
  );
}

//앱 디렉토가 도메인에서 접근할떄 루트라고 보면 되고 이 하위에 페이지가 잇으면 루트를 햇을때 렌더링이 되는 페이지다
