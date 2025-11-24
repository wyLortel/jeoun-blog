import Link from 'next/link';
import Image from 'next/image';
import type { Post } from '@/types/blog';
import { formatDate } from '@/lib/date';

interface BlogNavigationProps {
  newerPost: Post | null;
  olderPost: Post | null;
}

interface PostCardProps {
  post: Post;
}

export default function BlogNavigation({ newerPost, olderPost }: BlogNavigationProps) {
  return (
    <nav className="my-16 flex flex-col gap-10">
      {newerPost && (
        <Link href={`/blog/${newerPost.slug}`}>
          <span className="mb-4 block font-bold">다음 글</span>
          <PostCard post={newerPost} />
        </Link>
      )}

      {olderPost && (
        <Link href={`/blog/${olderPost.slug}`}>
          <span className="mb-4 block font-bold">이전 글</span>
          <PostCard post={olderPost} />
        </Link>
      )}
    </nav>
  );
}

function PostCard({ post }: PostCardProps) {
  return (
    <div className="flex gap-5">
      <div className="relative h-24 w-24">
        <Image
          src={post.coverImage ?? '/default-cover.png'}
          alt={post.title}
          fill
          className="rounded-md object-cover"
        />
      </div>

      <div className="flex flex-col justify-center gap-2">
        <h2 className="text-xl">{post.title}</h2>
        <p className="text-sm text-zinc-500">{formatDate(post.date)}</p>
      </div>
    </div>
  );
}
