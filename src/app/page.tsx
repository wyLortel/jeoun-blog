import { Card, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card';
import Link from 'next/link';

export default function page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <h2 className="text-3xl font-bold tracking-tight">블로그 목록</h2>
        {/** 블로그 카드 그리드 */}
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <Link href={`/blog/${i}`} key={i}>
              <Card key={i}>
                <CardHeader>
                  <CardTitle>블로그 제목{i}</CardTitle>
                  <CardDescription>
                    이것은 블로그 포스트에 대한 간단한 설명입니다 여러 줄의 설명이 잇을수잇습니다
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
//앱 디렉토가 도메인에서 접근할떄 루트라고 보면 되고 이 하위에 페이지가 잇으면 루트를 햇을때 렌더링이 되는 페이지다
