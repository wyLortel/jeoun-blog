import { ReactNode } from 'react'; //React에서 렌더링 가능한 모든 노드(ReactNode) (JSX, 문자열, 숫자, 배열 등)TypeScript용 타입 정의로만 쓰이는듯
//lucide-react라이브러리를 사용하면 아이콘 사용할수잇음
import { User, Briefcase, Github } from 'lucide-react';
import Link from 'next/link'; // Next.js 라우팅용 Link 컴포넌트 추가

interface AboutLayoutProps {
  children: ReactNode;
}

const menuItems = [
  { icon: User, label: '프로필', href: '/about' },
  { icon: Briefcase, label: '프로젝트', href: '/about/projects' },
  { icon: Github, label: 'Github', href: 'https://github.com/wyLortel', external: true },
];

export default function AboutLayout({ children }: AboutLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">

        <aside className="w-full md:w-64 shrink-0">
          {/* md:sticky: 데스크탑에서만 스크롤을 따라오게 설정 */}
          <nav className="bg-card md:sticky md:top-8 space-y-1 rounded-lg border p-4">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-muted-foreground hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-md px-3 py-2 transition-colors"
                {...(item.external && {
                  target: '_blank',
                  rel: 'noopener noreferrer',
                })}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-lg font-medium md:text-xl">{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* 본문 콘텐츠 */}
        {/* w-full: 모바일에서 짤리지 않게 너비 보정 */}
        <main className="flex-1 w-full">{children}</main>
      </div>
    </div>
  );
}
