import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from '../theme/ThemeToggle';
import { Menu } from 'lucide-react'; // Menu 아이콘만 가져옵니다.
// Sheet(부모), SheetContent, SheetTitle, SheetTrigger를 모두 여기서 가져와야 합니다.
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export default function Header() {
  const NavLinks = () => (
    <>
      <Link href="/" className="hover:text-primary font-medium">Home</Link>
      <Link href="/blog" className="hover:text-primary font-medium">Study</Link>
      <Link href="/about" className="hover:text-primary font-medium">About me</Link>
    </>
  );

  return (
    <header className="bg-background sticky top-0 z-50 border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/">
          <h1 className="text-2xl font-bold">
            Jeoung<span className="font-medium">Blog</span>
          </h1>
        </Link>

        {/* 데스크탑 내비게이션 */}
        <nav className="hidden md:flex items-center gap-8 ml-auto mr-8">
          <NavLinks />
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          {/* GitHub 링크 (데스크탑) */}
          <Link href="https://github.com/wyLortel" className="hidden md:block">
            <GitHubIcon />
          </Link>

          {/* 모바일 햄버거 메뉴 */}
          <div className="md:hidden">
            {/* 반드시 @/components/ui/sheet에서 가져온 Sheet로 감싸야 합니다 */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2"><Menu className="h-6 w-6" /></button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px]">
                <SheetTitle className="text-left mb-8">Menu</SheetTitle>
                <nav className="flex flex-col gap-6 mt-10">
                  <NavLinks />
                  <Link href="https://github.com/wyLortel" className="flex items-center gap-2 pt-4 border-t">
                    <GitHubIcon /> GitHub
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

function GitHubIcon() {
  return (
    <div className="relative">
      <Image src="/github.jpg" alt="GitHub" width={28} height={28} className="block dark:hidden" />
      <Image src="/github-mark-white.png" alt="GitHub Dark" width={24} height={24} className="hidden dark:block" />
    </div>
  );
}

//app폴더 부터 렌더링을 시작하기에 app이 루트가 됨
//a 태그로 하면 사이드 렌더링 Link 컴포넌트르 사용하면 클라이언트 사이드 렌더링 으로 렌더링
