import Link from 'next/link';
import { TocEntry } from '@/src/app/blog/[slug]/types';

interface TableOfContentsLinkProps {
  item: TocEntry;
  activeId: string | null;
  onClick?: () => void;          // TOC 클릭 핸들러 추가
}

export default function TableOfContentsLink({ item, activeId, onClick }: TableOfContentsLinkProps) {
  const isActive = item.id === activeId;

  return (
    <div className="py-1">
      <Link
        href={`#${item.id}`}
        onClick={onClick}          // 클릭 시 observer 잠금
        className={
          isActive ? 'text-foreground font-semibold' : 'text-muted-foreground hover:text-foreground'
        }
      >
        {item.value}
      </Link>

      {item.children && item.children.length > 0 && (
        <div className="ml-4 border-l pl-3">
          {item.children.map((sub) => (
            <TableOfContentsLink
              key={sub.id}
              item={sub}
              activeId={activeId}
              onClick={onClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}
