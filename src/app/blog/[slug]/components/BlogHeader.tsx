import { Badge } from '@/src/app/_components/ui/badge';
import { CalendarDays } from 'lucide-react';
import { formatDate } from '@/lib/date';
import type { Post } from '@/types/blog';

interface BlogHeaderProps {
  post: Post;
}

export default function BlogHeader({ post }: BlogHeaderProps) {
  return (
    <header className="mt-10 space-y-6">
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
