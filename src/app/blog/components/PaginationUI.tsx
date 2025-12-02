"use client";

import Link from "next/link";

interface Props {
  currentPage: number;
  totalPages: number;
  selectedTag: string;
}

export default function PaginationUI({
  currentPage,
  totalPages,
  selectedTag,
}: Props) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const makeLink = (page: number) => {
    const tagParam = selectedTag !== "전체" ? `&tag=${selectedTag}` : "";
    return `/blog?page=${page}${tagParam}`;
  };

  return (
    <div className="flex justify-center space-x-2 mt-10">
      {pages.map((p) => (
        <Link
          key={p}
          href={makeLink(p)}
          className={`px-4 py-2 border rounded-lg ${
            p === currentPage
              ? "bg-primary text-white"
              : "bg-white dark:bg-zinc-800"
          }`}
        >
          {p}
        </Link>
      ))}
    </div>
  );
}
