import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b">
      <div className="container mx-auto flex h-18 items-center justify-between px-4">
        <h1 className="text-2xl font-bold">
          Jeoung<span className="font-medium">Blog</span>
        </h1>
        <nav className="ml-auto flex items-center gap-8">
          <Link href="/" className="hover:text-primary font-medium">
            홈
          </Link>
          <Link href="/blog" className="hover:text-primary font-medium">
            공부 이야기
          </Link>
          <Link href="/about" className="hover:text-primary font-medium">
            자기 소개
          </Link>
          <Link
            href="https://github.com/wyLortel"
            className="hover:text-primary flex items-center gap-2 hover:opacity-80"
          >
            <Image
              src="/github-mark-white.png"
              alt="깃허브 이미지"
              width={24}
              height={24}
              className="invert"
            />
          </Link>
        </nav>
      </div>
    </header>
  );
}

//app폴더 부터 렌더링을 시작하기에 app이 루트가 됨
//a 태그로 하면 사이드 렌더링 Link 컴포넌트르 사용하면 클라이언트 사이드 렌더링 으로 렌더링
