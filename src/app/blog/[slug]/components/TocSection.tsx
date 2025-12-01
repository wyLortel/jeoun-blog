'use client';

import { useState } from 'react';
import TocObserver from './TocObserver';

import { TocEntry } from '@/src/app/blog/[slug]/types';
import TableOfContentsLink from './TableOfContentsLink';

export default function TocSection({ toc }: { toc: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  // observer 잠금 (TOC 클릭 시 활성화)
  const [lock, setLock] = useState(false);

  // TOC에서 링크를 클릭하면 observer 300ms 잠금
  const handleClick = () => {
    setLock(true);
    setTimeout(() => setLock(false), 300);
  };

  return (
    <aside className="sticky top-24 self-start">
      <div className="space-y-4 rounded-lg p-6 backdrop-blur-sm">
        <h3 className="text-lg font-semibold">목차</h3>

        {/* observer에게 lock 전달 */}
        <TocObserver setActiveId={setActiveId} lock={lock} />

        <nav className="max-h-[80vh] space-y-3 overflow-y-auto text-sm">
          {toc?.map((item, index) => (
            <TableOfContentsLink
              key={`${item.id}-${index}`}
              item={item}
              activeId={activeId}
              onClick={handleClick}         // 링크 클릭 이벤트
            />
          ))}
        </nav>
      </div>
    </aside>
  );
}
