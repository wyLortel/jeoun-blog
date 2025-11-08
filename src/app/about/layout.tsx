import { ReactNode } from 'react'; //React에서 렌더링 가능한 모든 노드(ReactNode) (JSX, 문자열, 숫자, 배열 등)TypeScript용 타입 정의로만 쓰이는듯
//lucide-react라이브러리를 사용하면 아이콘 사용할수잇음
import { Code2, User, Briefcase, Newspaper, Coffee, Github } from 'lucide-react';
import Link from 'next/link'; // Next.js 라우팅용 Link 컴포넌트 추가

interface AboutLayoutProps {
  children: ReactNode;
}

const menuItems = [
  { icon: User, label: '프로필', href: '/about' },
  { icon: Code2, label: '기술 스택', href: '/about/skills' },
  { icon: Briefcase, label: '프로젝트', href: '/about/projects' },
  { icon: Coffee, label: '컨택트', href: '/about/contact' },
  { icon: Github, label: 'Github', href: 'https://github.com/wyLortel', external: true },
];

export default function AboutLayout({ children }: AboutLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* 사이드바 */}
        {/* shrink-0" 해당 요소가 절대 줄어들지 않게함 */}
        <aside className="w-64 shrink-0">
          <nav className="bg-card sticky top-8 space-y-1 rounded-lg border p-4">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-muted-foreground hover:bg-accent hover:text-accent-foreground flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors" // ✅ gap2 → gap-2 수정
                {...(item.external && {
                  //자바스크립트는 A가 falsy면 A를, truthy면 B를 반환하는 연산으로 &&을 사용 ...을 사용해 트루면 뒤에잇는것들이 실행되니 들어갈수잇고 아니면 false므로 아무것도 props로 반환안함
                  target: '_blank',
                  rel: 'noopener noreferrer', //새탭에서 원래 창 접근 차단
                })}
              >
                <item.icon className="h-4 w-4" />
                <span className="text-xl">{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
