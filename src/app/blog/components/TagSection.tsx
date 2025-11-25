'use client'; //클라이언트 컴포넌트로 선언하는 명령어 브라우저에서 실행됨  리액트 훅 사용가능함

import { Badge } from '@/src/app/_components/ui/badge';
import { NotionTag } from '@/types/blog';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'; //현재 브라우저의 rul 쿼리QueryString(?tag=React)을 읽는 훅 이경우 리액트가 됨
//현재 클릭하면 태그쪽으로 링크하므로 어떤 태그가 선택됫는지 알게하기위해 사용

interface TagSectionProps {
  tags: NotionTag[];
}

export default function TagSection({ tags }: TagSectionProps) {
  const searchParams = useSearchParams();
  const selectedTag = searchParams.get('tag');

  return (
    <div className="sticky top-20">
      <h3 className="mb-3 text-xl font-bold">Tag</h3>

      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => {
          const isSelected = selectedTag === tag.name;

          return (
            <Link href={`?tag=${tag.name}`} key={tag.name}>
              <Badge
                className={
                  isSelected
                    ? `bg-primary border-primary border px-4 py-1 text-white transition-colors duration-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white`
                    : `text-foreground border-border hover:bg-primary border bg-white px-4 py-1 transition-colors duration-200 hover:text-white dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:hover:bg-slate-700`
                }
              >
                {tag.name}
              </Badge>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
