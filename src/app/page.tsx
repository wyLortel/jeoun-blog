import { getPublishedPosts } from '@/lib/notion';
import type { Post } from '@/types/blog';
import HeroCarousel from './HeroCarousel';

export default async function page() {
  const posts: Post[] = await getPublishedPosts();

  return (
    <div className="container mx-auto px-10 py-8">
      <div className="space-y-20">
        <HeroCarousel posts={posts} />
        <p className="text-center text-3xl">
          "Always 幸せはここにある"
          <br />
          <span className="text-sm">"平井大－SLOW & EASY"</span>
        </p>
        <p className="text-center"></p>
      </div>
    </div>
  );
}
//앱 디렉토가 도메인에서 접근할떄 루트라고 보면 되고 이 하위에 페이지가 잇으면 루트를 햇을때 렌더링이 되는 페이지다
