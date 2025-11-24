'use client';

import { useEffect } from 'react';

interface TocObserverProps {
  setActiveId: (id: string | null) => void;
}

export default function TocObserver({ setActiveId }: TocObserverProps) {
  useEffect(() => {
    const headings = document.querySelectorAll('h2, h3');

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleHeadings = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top
          );

        if (visibleHeadings.length > 0) {
          setActiveId((visibleHeadings[0].target as HTMLElement).id);
        }
      },
      {
        rootMargin: '0px 0px -70% 0px',
        threshold: 0.1,
      }
    );

    headings.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [setActiveId]);

  return null;
}
