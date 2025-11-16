import { PostCard } from '@/src/app/blog/components/PostCard';
import Link from 'next/link';
import PopularPosts from './components/PopularPosts';
import TagSection from './components/TagSection';
import Image from 'next/image';
import { getPublishedPosts, getTags } from '../../../lib/notion';

//Promise.all 병렬실행 비동기 요청을 동시에 실행 둘다 끝날때까지 동시에 기다임
interface HomeProps {
  searchParams: Promise<{ tag?: string }>;
}

//전체면 태그가 없으니 필터 안 거쳐서 전체가 나온다. 태그가 있으면 필터가 걸린다.
export default async function Home({ searchParams }: HomeProps) {
  //searchParams 이 이름으로 하면 nextjs가 현재 searchParams의 객체를받음 페이지정보드같으거 url
  const { tag } = await searchParams;
  const selectedTag = tag || '전체';
  const [posts, tags] = await Promise.all([getPublishedPosts(selectedTag), getTags()]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-[75%_25%] gap-6">
        {/* 블로그 본문 영역 */}
        <div className="space-y-6">
          {/* 헤더 이미지 영역  Next.js의 <Image>는 레이아웃 계산까지 포함된 스마트 이미지 컴포넌트 width / height(고정) fill(부모크기에 맞추어 꼬가채움)중 하나를 꼭 지정해줘야함*/}
          {/*fill은 position: absolute 스타일을 자동 적용  absolute는 항상 기준이 되는 relative기 필요  object-cover 비율유지하면서 꽉채우기*/}
          {/* 뭔가 디자인할때 박스를 만들고 거기안에 이미지 집어넣는 그런느낌인듯object-cover러 비율 유지해 비져나올수잇으니 overflow-hidden으로맞춤    */}
          <div className="relative h-40 w-full overflow-hidden rounded-3xl">
            <Image
              src="/blogHeader.jpeg"
              alt="Blog Header"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* 게시글 목록 */}
          <div className="space-y-6">
            {posts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.id} className="block">
                <PostCard post={post} />
              </Link>
            ))}
          </div>
        </div>

        {/* 사이드바 */}
        <aside className="ml-2 space-y-10">
          <PopularPosts />
          <TagSection tags={tags} />
        </aside>
      </div>
    </div>
  );
}

//앱 디렉토가 도메인에서 접근할떄 루트라고 보면 되고 이 하위에 페이지가 잇으면 루트를 햇을때 렌더링이 되는 페이지다
