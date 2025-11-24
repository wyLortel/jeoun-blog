'use client'; //next js는 모든 컴포턴트가 서버에서 렌더링 되지만 use client을 사용하면 클라이언트 사이드 렌더링을 사용
import { formatDate } from '@/lib/date';
//리액트 훅 이나 이벤트는 브라우저가 실행하기에 use cilent를 적어줘야함

import { Badge } from '@/src/app/_components/ui/badge';
import { Card, CardContent } from '@/src/app/_components/ui/card';
import { Post } from '@/types/blog';
import { Calendar } from 'lucide-react';
import Image from 'next/image';

interface PostCardProps {
  post: Post;
  isFirst?: boolean;
}

export function PostCard({ post, isFirst = false }: PostCardProps) {
  return (
    // group을 선언하고 부모에게 hover같은 이벤트 적용시 자식에게 그룹으로 지정된것들이 적용 트리거 같은셈
    <Card className="group bg-card/50 border-border/40 hover:border-primary/20 flex flex-col items-stretch overflow-hidden rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:scale-[1.01] hover:shadow-md md:flex-row md:gap-6">
      {/* 왼쪽: 텍스트 */}
      <CardContent className="flex flex-1 flex-col justify-between p-6">
        <div>
          <h2 className="group-hover:text-primary mb-2 text-xl font-bold transition-colors">
            {post.title}
          </h2>
          {/*line-clamp-2 두줄까지만 보여주고 넘어가면 .. 처리 leading-relaxed줄 간격처리 여유롭게  */}
          {post.description && (
            <p className="text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
              {post.description}
            </p>
          )}
        </div>

        <div>
          <div className="mb-5 flex flex-wrap gap-2">
            {post.tags?.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-primary/10 text-primary hover:bg-primary/20 font-medium transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="text-muted-foreground flex items-center gap-x-4 text-sm">
            {post.date && (
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {/* format(날짜객체, 'PPP', { locale: ko }) 이런 문법으로 사용  ppp 는 년 월 일 p하나 더붙으면 요일까지*/}
                <time>{formatDate(post.date)}</time>
              </div>
            )}
          </div>
        </div>
      </CardContent>

      {/* 오른쪽: 이미지 */}
      {post.coverImage && (
        <div className="p-6 md:w-1/3">
          {/* 텍스트와 동일 패딩 */}
          <div className="relative h-48 overflow-hidden rounded-2xl md:h-full">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill //next img 전용속성 으로 제공 이미지를 부모요소에 맞게 채움  position: absolute가 자동적용됨 그래서 relative가 필요
              priority={isFirst}
              sizes="(max-width: 768px) 100vw,
                      (max-width: 1200px) 50vw,
                      33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>
      )}
    </Card>
  );
}
