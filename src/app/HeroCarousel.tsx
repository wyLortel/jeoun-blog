'use client';
import { Swiper, SwiperSlide } from 'swiper/react'; // 이게 브라우저에서만 사용되느 클라이언트 전용 라이브러리
import { Autoplay } from 'swiper/modules';
import type { Post } from '@/types/blog';

import 'swiper/css';
import 'swiper/css/navigation';
import Link from 'next/link';

interface HeroCarouselProps {
  posts: Post[];
}

export default function HeroCarousel({ posts }: HeroCarouselProps) {
  return (
    //Swiper  전체 슬라이드 컨테이너  SwiperSlid 개별 슬라이드  마우스 드래그/터치 스와이프 이것도 자동으로 기능을 제공
    <Swiper
      modules={[Autoplay]}
      slidesPerView={1} // 한화면에 슬라이드 한개만표시
      loop={posts.length > 1} // 트루면  슬라이드가 끝가지 가도 처음으로 루프 거짓이면 끝가지 가면 멈춤 한개일 경우 1이 계속순환하니 한개일때는 끄는게 좋앗음
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      className="mt-20 w-full"
    >
      {posts.map((post) => (
        <SwiperSlide key={post.id}>
          <Link href={`/blog/${post.slug}`}>
            <div
              className="relative flex h-[40rem] w-full items-end rounded-2xl bg-cover bg-center bg-no-repeat p-10"
              style={{
                // 리액트에서는 JS로 CSS 값을 만들어 DOM에 넣는 것이 가능 대신 style={{}}이형식으로 넣어줘야함 그래야 js 표현식이 가능하며 동적으로 값변경가능
                backgroundImage: `url('${post.coverImage}')`,
              }}
            >
              {/* inset-0  위 아래 오른쪽 왼쪽 0으로 맞춤 즉 부모를 전무 덮음*/}
              <div className="absolute inset-0 rounded-2xl bg-black/40"></div>
              <div className="space-y-2 text-white drop-shadow-lg">
                <h2 className="text-4xl font-bold">{post.title}</h2>
                <p className="max-w-xl opacity-90">{post.description}</p>
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
