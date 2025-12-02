'use client';

import { TocEntry } from '@/src/app/blog/[slug]/types';

interface Props {
  item: TocEntry;
  activeId: string | null;
  onClick?: () => void;
}

export default function TableOfContentsLink({ item, activeId, onClick }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (onClick) onClick(); // lock 활성화

    const target = document.getElementById(item.id!);
    if (!target) return;

    window.history.replaceState(null, '', `#${item.id}`);
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="ml-2">
      <a
        href={`#${item.id}`}
        onClick={handleClick}
        className={activeId === item.id ? 'text-blue-500 font-semibold' : 'text-gray-700'}
      >
        {item.value}
      </a>

      {item.children && item.children.length > 0 && (
        <div className="ml-4 mt-2 space-y-1">
          {item.children.map((child) => (
            <TableOfContentsLink
              key={child.id}
              item={child}
              activeId={activeId}
              onClick={onClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}

