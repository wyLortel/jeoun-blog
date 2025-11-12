import { Badge } from '@/src/app/_components/ui/badge';
import { Separator } from '@/src/app/_components/ui/separator';
import { CalendarDays, Clock, User } from 'lucide-react';
import Link from 'next/link';

interface TableOfContentsItem {
  id: string;
  title: string;
  items?: TableOfContentsItem[];
}

const mockTableOfContents: TableOfContentsItem[] = [
  {
    id: 'intro',
    title: '소개',
    items: [],
  },
  {
    id: 'getting-started',
    title: '시작하기',
    items: [
      {
        id: 'prerequisites',
        title: '사전 준비사항',
        items: [
          {
            id: 'node-installation',
            title: 'Node.js 설치',
          },
          {
            id: 'npm-setup',
            title: 'NPM 설정',
          },
        ],
      },
      {
        id: 'project-setup',
        title: '프로젝트 설정',
        items: [
          {
            id: 'create-project',
            title: '프로젝트 생성',
          },
          {
            id: 'folder-structure',
            title: '폴더 구조',
          },
        ],
      },
    ],
  },
  {
    id: 'shadcn-ui-setup',
    title: 'Shadcn UI 설정하기',
    items: [
      {
        id: 'installation',
        title: '설치 방법',
        items: [
          {
            id: 'cli-installation',
            title: 'CLI 도구 설치',
          },
          {
            id: 'component-setup',
            title: '컴포넌트 설정',
          },
        ],
      },
      {
        id: 'configuration',
        title: '환경 설정',
        items: [
          {
            id: 'theme-setup',
            title: '테마 설정',
          },
          {
            id: 'typography',
            title: '타이포그래피',
          },
        ],
      },
    ],
  },
];

// hover:text-foreground 자동으로 색이 바귐 다크모드 일땐 흰 라이트는 검정
//text-muted-foreground 위에 기본 색보다는 밝거나 흐릿한 보조 텍스트 색상 부제목이나 상세 정보 절 강조되는부분에 사용
function TableOfContentsLink({ item }: { item: TableOfContentsItem }) {
  return (
    <div className="py-1">
      <Link
        href={`#${item.id}`}
        className="text-muted-foreground hover:text-foreground block text-sm transition-colors"
      >
        {item.title}
      </Link>

      {/* 요소가 안에 있으면 재귀 호출을 통해 하위 목차를 렌더링 */}
      {item.items && item.items.length > 0 && (
        <div className="border-border/70 mt-1 ml-4 space-y-1 border-l pl-3">
          {item.items.map((subItem) => (
            //  key는 리액트 엔진이 Virtual DOM을 비교할 때
            // 항목이 바뀌었는지 구별하기 위한 식별자
            // key가 같으면 재사용, 다르면 새로 렌더링
            <TableOfContentsLink key={subItem.id} item={subItem} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function BlogPost() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-[80%_20%] gap-8">
        <section>
          {/* 블로그 헤더 */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold">Next.js와 Shadcn UI로 블로그 만들기</h1>
            </div>
          </div>

          {/* 메타정보 */}
          <div className="text-muted-foreground text-l mt-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>정우영</span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarDays className=",w-4 h-4" />
                <span>2025년 11월 8일</span>
              </div>
              <div>
                <Badge>프론트 엔드</Badge>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>5분 읽기</span>
            </div>
          </div>

          <Separator className="my-8" />

          {/* 블로그 본문 */}
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="lead">
              Next.js와 Shadcn UI를 사용하여 모던하고 아름다운 블로그를 만드는 방법을
              알아보겠습니다. 이 튜토리얼에서는 기본적인 설정부터 배포까지 전 과정을 다룹니다.
            </p>

            <h2>시작하기</h2>
            <p>
              Next.js는 React 기반의 풀스택 웹 프레임워크입니다. 서버 사이드 렌더링, 정적 사이트
              생성 등 다양한 렌더링 전략을 제공하며, 개발자 경험을 극대화시켜주는 여러 기능들을
              제공합니다.
            </p>

            <h2>Shadcn UI 설정하기</h2>
            <p>
              Shadcn UI는 재사용 가능한 컴포넌트 모음으로, 아름다운 디자인과 접근성을 모두 갖추고
              있습니다. 컴포넌트를 직접 소유할 수 있어 커스터마이징이 자유롭다는 장점이 있습니다.
            </p>

            <p className="lead">
              Next.js와 Shadcn UI를 사용하여 모던하고 아름다운 블로그를 만드는 방법을
              알아보겠습니다. 이 튜토리얼에서는 기본적인 설정부터 배포까지 전 과정을 다룹니다.
            </p>

            <h2>시작하기</h2>
            <p>
              Next.js는 React 기반의 풀스택 웹 프레임워크입니다. 서버 사이드 렌더링, 정적 사이트
              생성 등 다양한 렌더링 전략을 제공하며, 개발자 경험을 극대화시켜주는 여러 기능들을
              제공합니다.
            </p>

            <h2>Shadcn UI 설정하기</h2>
            <p>
              Shadcn UI는 재사용 가능한 컴포넌트 모음으로, 아름다운 디자인과 접근성을 모두 갖추고
              있습니다. 컴포넌트를 직접 소유할 수 있어 커스터마이징이 자유롭다는 장점이 있습니다.
            </p>

            <p className="lead">
              Next.js와 Shadcn UI를 사용하여 모던하고 아름다운 블로그를 만드는 방법을
              알아보겠습니다. 이 튜토리얼에서는 기본적인 설정부터 배포까지 전 과정을 다룹니다.
            </p>

            <h2>시작하기</h2>
            <p>
              Next.js는 React 기반의 풀스택 웹 프레임워크입니다. 서버 사이드 렌더링, 정적 사이트
              생성 등 다양한 렌더링 전략을 제공하며, 개발자 경험을 극대화시켜주는 여러 기능들을
              제공합니다.
            </p>

            <h2>Shadcn UI 설정하기</h2>
            <p>
              Shadcn UI는 재사용 가능한 컴포넌트 모음으로, 아름다운 디자인과 접근성을 모두 갖추고
              있습니다. 컴포넌트를 직접 소유할 수 있어 커스터마이징이 자유롭다는 장점이 있습니다.
            </p>

            <p className="lead">
              Next.js와 Shadcn UI를 사용하여 모던하고 아름다운 블로그를 만드는 방법을
              알아보겠습니다. 이 튜토리얼에서는 기본적인 설정부터 배포까지 전 과정을 다룹니다.
            </p>

            <h2>시작하기</h2>
            <p>
              Next.js는 React 기반의 풀스택 웹 프레임워크입니다. 서버 사이드 렌더링, 정적 사이트
              생성 등 다양한 렌더링 전략을 제공하며, 개발자 경험을 극대화시켜주는 여러 기능들을
              제공합니다.
            </p>

            <h2>Shadcn UI 설정하기</h2>
            <p>
              Shadcn UI는 재사용 가능한 컴포넌트 모음으로, 아름다운 디자인과 접근성을 모두 갖추고
              있습니다. 컴포넌트를 직접 소유할 수 있어 커스터마이징이 자유롭다는 장점이 있습니다.
            </p>

            <p className="lead">
              Next.js와 Shadcn UI를 사용하여 모던하고 아름다운 블로그를 만드는 방법을
              알아보겠습니다. 이 튜토리얼에서는 기본적인 설정부터 배포까지 전 과정을 다룹니다.
            </p>

            <h2>시작하기</h2>
            <p>
              Next.js는 React 기반의 풀스택 웹 프레임워크입니다. 서버 사이드 렌더링, 정적 사이트
              생성 등 다양한 렌더링 전략을 제공하며, 개발자 경험을 극대화시켜주는 여러 기능들을
              제공합니다.
            </p>

            <h2>Shadcn UI 설정하기</h2>
            <p>
              Shadcn UI는 재사용 가능한 컴포넌트 모음으로, 아름다운 디자인과 접근성을 모두 갖추고
              있습니다. 컴포넌트를 직접 소유할 수 있어 커스터마이징이 자유롭다는 장점이 있습니다.
            </p>

            <p className="lead">
              Next.js와 Shadcn UI를 사용하여 모던하고 아름다운 블로그를 만드는 방법을
              알아보겠습니다. 이 튜토리얼에서는 기본적인 설정부터 배포까지 전 과정을 다룹니다.
            </p>

            <h2>시작하기</h2>
            <p>
              Next.js는 React 기반의 풀스택 웹 프레임워크입니다. 서버 사이드 렌더링, 정적 사이트
              생성 등 다양한 렌더링 전략을 제공하며, 개발자 경험을 극대화시켜주는 여러 기능들을
              제공합니다.
            </p>

            <h2>Shadcn UI 설정하기</h2>
            <p>
              Shadcn UI는 재사용 가능한 컴포넌트 모음으로, 아름다운 디자인과 접근성을 모두 갖추고
              있습니다. 컴포넌트를 직접 소유할 수 있어 커스터마이징이 자유롭다는 장점이 있습니다.
            </p>

            <p className="lead">
              Next.js와 Shadcn UI를 사용하여 모던하고 아름다운 블로그를 만드는 방법을
              알아보겠습니다. 이 튜토리얼에서는 기본적인 설정부터 배포까지 전 과정을 다룹니다.
            </p>

            <h2>시작하기</h2>
            <p>
              Next.js는 React 기반의 풀스택 웹 프레임워크입니다. 서버 사이드 렌더링, 정적 사이트
              생성 등 다양한 렌더링 전략을 제공하며, 개발자 경험을 극대화시켜주는 여러 기능들을
              제공합니다.
            </p>

            <h2>Shadcn UI 설정하기</h2>
            <p>
              Shadcn UI는 재사용 가능한 컴포넌트 모음으로, 아름다운 디자인과 접근성을 모두 갖추고
              있습니다. 컴포넌트를 직접 소유할 수 있어 커스터마이징이 자유롭다는 장점이 있습니다.
            </p>
          </div>
          <Separator className="my-16" />

          {/* 이전 다음 포스트 네비게이션 */}
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
        <aside className="relative">
          {/* 헤더 높이 고려해서 top 설정 */}
          <div className="top- sticky top-[var(--header-hight)]">
            <div className="space-y-4 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold">목차</h3>
              <nav className="space-y-3 text-sm">
                {mockTableOfContents.map((item) => (
                  <TableOfContentsLink key={item.id} item={item} />
                ))}
              </nav>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* 
//객체 타입을 정의하는 문법 interface
//동적 라우트페이지는 자동으로  params는 url 변수를 props로 넘겨줌 /blog/nextjs/intro이면  slug: ['nextjs', 'intro'] } 이런식
//Promise<>로 감싸면 비동기 함수가 나중에 { slug: string[] } 객체를 리턴한다 라는뜻 Promise는 미래에 받을 값이기에
interface BlogPostProps {
  params: Promise<{
    slug: string[];
  }>;
}

//14까지는 next가 동기로 렌더링을 햇는데 15부터는 부터는 비동기 렌더링으로 바뀌어서 준비 될대마다 부분적 렌더링하므로 비동기로 받아주어야함
export default async function BlogPost({ params }: BlogPostProps) {
  const slug = (await params).slug;
  return <div>BlogPost</div>;
} */
