'use client';
// 여기 코드 분석
import { Badge } from '@/src/components/ui/badge';
import { Card, CardContent } from '@/src/components/ui/card';
import { NotionPost } from '@/types/notion';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Calendar, User } from 'lucide-react';
import Image from 'next/image';

interface PostCardProps {
  post: NotionPost;
}

export function PostCard({ post }: PostCardProps) {
  return (
    // group을 선언하고 부모에게 hover같은 이벤트 적용시 자식에게 그룹으로 지정된것들이 적용 트리거 같은셈
    <Card className="group bg-card/50 border-border/40 hover:border-primary/20 flex flex-col items-stretch overflow-hidden rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:scale-[1.01] hover:shadow-md md:flex-row md:gap-6">
      {/* 왼쪽: 텍스트 */}
      <CardContent className="flex flex-1 flex-col justify-between p-6">
        <div>
          <h2 className="group-hover:text-primary mb-2 text-xl font-bold transition-colors">
            {post.title}
          </h2>
          {post.description && (
            <p className="text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
              {post.description}
            </p>
          )}
        </div>

        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            {post.tags?.map((tag) => (
              <Badge
                key={tag.id}
                variant="secondary"
                className="bg-primary/10 text-primary hover:bg-primary/20 font-medium transition-colors"
              >
                {tag.name}
              </Badge>
            ))}
          </div>

          <div className="text-muted-foreground flex items-center gap-x-4 text-sm">
            {post.author && (
              <div className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
            )}
            {post.date && (
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <time>{format(new Date(post.date), 'PPP', { locale: ko })}</time>
              </div>
            )}
          </div>
        </div>
      </CardContent>

      {/* 오른쪽: 이미지 */}
      {post.coverImage && (
        <div className="p-6 md:w-1/3">
          {' '}
          {/* ✅ 텍스트와 동일 패딩 */}
          <div className="relative h-48 overflow-hidden rounded-2xl md:h-full">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>
      )}
    </Card>
  );
}
