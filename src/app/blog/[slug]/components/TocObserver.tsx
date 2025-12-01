'use client';

import { useEffect, useRef } from 'react';

interface TocObserverProps {
  setActiveId: (id: string | null) => void;
  lock: boolean;
}

export default function TocObserver({ setActiveId, lock }: TocObserverProps) {
  // lock 값을 ref로 관리 → dependency array 변경 방지
  const lockRef = useRef(lock);
  lockRef.current = lock;

  useEffect(() => {
    const headings = document.querySelectorAll('h1,h2,h3');

    const observer = new IntersectionObserver(
      (entries) => {
        if (lockRef.current) return; // ref 기반 → dependency 변화 없음

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
  }, [setActiveId]); // ← 배열 크기 절대 변하지 않음

  return null;
}
