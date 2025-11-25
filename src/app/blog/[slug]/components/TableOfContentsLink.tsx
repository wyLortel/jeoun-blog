import Link from 'next/link';
import { TocEntry } from '@/src/app/blog/[slug]/types';

interface TableOfContentsLinkProps {
  item: TocEntry;
  activeId: string | null;
}

export default function TableOfContentsLink({ item, activeId }: TableOfContentsLinkProps) {
  const isActive = item.id === activeId;

  return (
    <div className="py-1">
      <Link
        href={`#${item.id}`}
        className={
          isActive ? 'text-foreground font-semibold' : 'text-muted-foreground hover:text-foreground'
        }
      >
        {item.value}
      </Link>

      {item.children && item.children.length > 0 && (
        <div className="ml-4 border-l pl-3">
          {item.children.map((subItem) => (
            //하위 자식의 아이디  그리고 하위자식것들을 보내줌 (재귀 렌더링이기에 )
            <TableOfContentsLink key={subItem.id} item={subItem} activeId={activeId} />
          ))}
        </div>
      )}
    </div>
  );
}
