import { Badge } from '@/src/app/_components/ui/badge';
import { NotionTag } from '@/types/blog';
import Link from 'next/link';

interface TagSectionProps {
  tags: NotionTag[];
}

export default function TagSection({ tags }: TagSectionProps) {
  return (
    <div>
      <h3 className="mb-3 text-xl font-bold">Tag</h3>
      <div className="grid grid-cols-3 gap-3">
        {tags.map((tag) => (
          <Link href={`?tag=${tag.name}`} key={tag.name}>
            <Badge className="px-4 py-1">{tag.name}</Badge>
          </Link>
        ))}
      </div>
    </div>
  );
}
