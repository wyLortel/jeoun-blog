import { PostCard } from '@/features/blog/PostCard';
import Link from 'next/link';
import PopularPosts from './components/PopularPosts';
import TagSection from './components/TagSection';
import Image from 'next/image';

const mockTags = [
  { id: '1', name: '전체' },
  { id: '2', name: 'HTML' },
  { id: '3', name: 'CSS' },
  { id: '4', name: 'JavaScript' },
  { id: '5', name: 'React' },
  { id: '6', name: 'Next.js' },
];

const mockPosts = [
  {
    id: '1',
    title: 'Next.js 13으로 블로그 만들기',
    description: 'Next.js 13과 Notion API를 활용하여 개인 블로그를 만드는 방법을 알아봅니다.',
    coverImage: 'https://picsum.photos/800/400',
    tags: [
      { id: '1', name: 'Next.js' },
      { id: '2', name: 'React' },
    ],
    authors: '짐코딩',
    date: '2024-02-01',
  },
  {
    id: '2',
    title: 'TypeScript 기초 다지기',
    description: 'TypeScript의 기본 문법과 실전에서 자주 사용되는 패턴들을 살펴봅니다.',
    coverImage: 'https://picsum.photos/800/401',
    tags: [
      { id: '3', name: 'TypeScript' },
      { id: '4', name: 'JavaScript' },
    ],
    authors: '짐코딩',
    date: '2024-01-15',
  },
];

export default function Blog() {
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
            {mockPosts.map((post) => (
              <Link href={`/blog/${post.id}`} key={post.id} className="block">
                <PostCard post={post} />
              </Link>
            ))}
          </div>
        </div>

        {/* 사이드바 */}
        <aside className="ml-2 space-y-10">
          <PopularPosts />
          <TagSection tags={mockTags} />
        </aside>
      </div>
    </div>
  );
}

//앱 디렉토가 도메인에서 접근할떄 루트라고 보면 되고 이 하위에 페이지가 잇으면 루트를 햇을때 렌더링이 되는 페이지다
