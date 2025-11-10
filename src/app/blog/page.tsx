import { PostCard } from '@/features/blog/PostCard';
import { Badge } from '@/src/components/ui/badge';
import Link from 'next/link';

const mockTags = [
  { name: '전체' },
  { name: 'HTML' },
  { name: 'CSS' },
  { name: 'JavaScript' },
  { name: 'React' },
  { name: 'Next.js' },
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
        <div className="space-y-8">
          <h2 className="text-3xl font-bold tracking-tight">블로그 목록</h2>
          {mockPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {/*사이드바 */}
        <aside className="space-y-10">
          {/* 인기글 */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">인기 글</h3>
            <p>인기글 입니다</p>
            <p>인기글 입니다</p>
            <p>인기글 입니다</p>
          </div>

          {/* 태그 검색 */}
          <div>
            <h3 className="mb-3 text-xl font-bold">Tag</h3>
            <div className="grid grid-cols-3 gap-3">
              {mockTags.map((tag) => (
                <Link href={`?tag=${tag.name}`} key={tag.name}>
                  <Badge className="px-4 py-1">{tag.name}</Badge>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

//앱 디렉토가 도메인에서 접근할떄 루트라고 보면 되고 이 하위에 페이지가 잇으면 루트를 햇을때 렌더링이 되는 페이지다
