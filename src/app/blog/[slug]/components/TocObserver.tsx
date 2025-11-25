'use client';

import { useEffect } from 'react';

//string 또는 null 값을 받아서 아무 것도 반환하지 않는 함수 함수가 무슨값을 받는지도 표시해야함
interface TocObserverProps {
  setActiveId: (id: string | null) => void;
}

export default function TocObserver({ setActiveId }: TocObserverProps) {
  useEffect(() => {
    //돔에서 다찾고 이때 노드리스트라는 유사 배열 형태로 들어옴
    const headings = document.querySelectorAll('h1,h2, h3');

    //등록된 DOM 요소가 화면에 들어오거나 나가면 그때 부터 실행 또는 화면 변화(스크롤 등)가 발생할 때 실행되면 실행
    const observer = new IntersectionObserver(
      (entries) => {
        //entries 스크롤 변화로 화면에 보이는지 안 보이는지 변한 요소들
        const visibleHeadings = entries
          .filter((e) => e.isIntersecting) // 지금 보이는것만 걸러네고  isIntersecting이 보이는지 안보이는지 보이면 true 반환
          //a = entries[0] b = entries[1] 이걸로인해 각 화면내 top좌표를 비교해 가장 위쪽에 잇는것이 먼저오도록 안그러면 이벤트순서로 진행되 ui가 튈수잇음
          .sort(
            (a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top
          );

        //정렬된 visibleHeadings에서가장 위에 있는 heading의 id를 꺼내서setActiveId로 상태에 넣는 것.
        if (visibleHeadings.length > 0) {
          setActiveId((visibleHeadings[0].target as HTMLElement).id);
        }
      },
      {
        rootMargin: '0px 0px -70% 0px', //전체뷰에서 상위 30퍼만 추적 나머지 무시
        threshold: 0.1, //10%만 보여도 isIntersecting 를 true 로
      }
    );

    headings.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [setActiveId]); //빈배열이여도 괜찮으나 리액트의 규칙 안전을 위해 넣음

  return null;
}

//실행순서
//컴포넌트 렌더링 = > useEffect 실행 -> observer 생성 -> headings.forEach로 모든 헤딩 옵저버 등록 -> 등록된 DOM 요소가 화면에 들어왓으니 실행  ->이후 변화 감지하면 다시
