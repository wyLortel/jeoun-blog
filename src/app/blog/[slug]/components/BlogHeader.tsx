import { Badge } from '@/src/app/_components/ui/badge';
import { CalendarDays } from 'lucide-react';
import { formatDate } from '@/lib/date';
import type { Post } from '@/types/blog';

//컴포넌트 Props 타입은 항상 별도로 분리하는것이 추천됨 프롭스타입을 독립적으로 수정 가능하고 팀원 모두가 보기쉬움
interface BlogHeaderProps {
  post: Post;
}

export default function BlogHeader({ post }: BlogHeaderProps) {
  return (
    <header className="mt-10 space-y-6 mb-25">
      <h1 className="text-4xl font-bold">{post.title}</h1>

      <div className="text-muted-foreground flex items-center gap-4 text-sm">
        <CalendarDays className="h-4 w-4" />
        <span>{formatDate(post.date)}</span>

        <div className="flex gap-2">
          {post.tags?.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </div>
    </header>
  );
}

//key값 정리
// map()으로 리스트를 만들 때 각 요소에 key를 넣으면,
// React는 key를 기준으로 이전 렌더와 새 렌더를 매칭한다.
// key가 같으면 DOM을 재사용하고,
// key가 다르면 새 DOM을 생성한다.
// 그래서 실제로 “바뀐 부분만” 업데이트된다.
