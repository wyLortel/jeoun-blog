import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from '../theme/ThemeToggle';

export default function Header() {
  return (
    <header className="bg-background sticky top-0 z-50 border-b">
      <div className="container mx-auto flex h-[var(--header-hight)] items-center justify-between px-4">
        <Link href="/">
          <h1 className="text-2xl font-bold">
            Jeoung<span className="font-medium">Blog</span>
          </h1>
        </Link>
        <nav className="ml-auto flex items-center gap-8">
          <Link href="/" className="hover:text-primary font-medium">
            Home
          </Link>
          <Link href="/blog" className="hover:text-primary font-medium">
            Study
          </Link>
          <Link href="/about" className="hover:text-primary font-medium">
            About me
          </Link>
          <div className="flex items-center justify-end gap-6">
            <ThemeToggle />
            <Link
              href="https://github.com/wyLortel"
              className="hover:text-primary flex items-center gap-2 hover:opacity-80"
            >
              <div className="relative">
                {/* 라이트 모드 이미지 */}
                <Image
                  src="/github.jpg"
                  alt="GitHub"
                  width={28}
                  height={28}
                  className="block dark:hidden"
                />

                {/* 다크 모드 이미지 */}
                <Image
                  src="/github-mark-white.png"
                  alt="GitHub Dark"
                  width={24}
                  height={24}
                  className="hidden dark:block"
                />
              </div>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

//app폴더 부터 렌더링을 시작하기에 app이 루트가 됨
//a 태그로 하면 사이드 렌더링 Link 컴포넌트르 사용하면 클라이언트 사이드 렌더링 으로 렌더링
