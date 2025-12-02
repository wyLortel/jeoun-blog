'use client';

import { useEffect } from 'react';

interface TocObserverProps {
  setActiveId: (id: string | null) => void;
  lock: boolean;
}

export default function TocObserver({ setActiveId, lock }: TocObserverProps) {
  useEffect(() => {
    if (lock) return; // 클릭 잠금 상태면 observer 중단

    const headings = document.querySelectorAll('h1, h2, h3');

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              a.target.getBoundingClientRect().top -
              b.target.getBoundingClientRect().top
          );

        if (visible.length > 0) {
          setActiveId((visible[0].target as HTMLElement).id);
        }
      },
      {
        rootMargin: '0px 0px -70% 0px',
        threshold: 0.1,
      }
    );

    headings.forEach((h) => observer.observe(h));

    return () => observer.disconnect();
  }, [setActiveId, lock]);

  return null;
}
