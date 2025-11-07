import { Card, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card';
import Image from 'next/image';

export default function page() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header 영역 */}
      <header className="sticky top-0 z-50 border-b">
        <div className="container mx-auto flex h-18 items-center justify-between px-4">
          <h1 className="text-2xl font-bold">
            Jeoung<span className="font-medium">Blog</span>
          </h1>
          <nav className="ml-auto flex items-center gap-5">
            <a href="#" className="hover:text-primary font-bold">
              공부 이야기
            </a>
            <a
              href="https://github.com"
              className="hover:text-primary flex items-center gap-2 hover:opacity-80"
            >
              <Image
                src="/github-mark-white.png"
                alt="깃허브 이미지"
                width={24}
                height={24}
                className="invert"
              />
            </a>
          </nav>
        </div>
      </header>
      {/* Main 영역 */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight">블로그 목록</h2>
            {/** 블로그 카드 그리드 */}
            <div className="space-y-4"></div>
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle>블로그 제목{i}</CardTitle>
                  <CardDescription>
                    이것은 블로그 포스트에 대한 간단한 설명입니다 여러 줄의 설명이 잇을수잇습니다
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Footer 영역 */}
      <footer className="border-t">
        <div className="container mx-auto flex h-14 items-center justify-center">
          <p className="text-sm font-bold">Jeoung Blog</p>
        </div>
      </footer>
    </div>
  );
}
//22까지 22 마지막 실습 부분
