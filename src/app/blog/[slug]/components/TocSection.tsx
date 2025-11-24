'use client';

import { useState } from 'react';
import TocObserver from './TocObserver';

import { TocEntry } from '@/src/app/blog/[slug]/types';
import TableOfContentsLink from './TableOfContentsLink';

export default function TocSection({ toc }: { toc: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <aside className="sticky top-24 self-start">
      <div className="space-y-4 rounded-lg p-6 backdrop-blur-sm">
        <h3 className="text-lg font-semibold">목차</h3>

        <TocObserver setActiveId={setActiveId} />

        <nav className="max-h-[80vh] space-y-3 overflow-y-auto text-sm">
          {toc?.map((item) => (
            <TableOfContentsLink key={item.id} item={item} activeId={activeId} />
          ))}
        </nav>
      </div>
    </aside>
  );
}
