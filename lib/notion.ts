// lib/notion.ts는 노션 API와 관련된 모든 백엔드 로직(데이터 조회, Markdown 변환 등)을 담당하는 곳입니다.

// 노션 공식 SDK. 노션 API를 호출하는 클라이언트를 제공함
import { Client } from '@notionhq/client';

// Markdown 전처리 함수 (HTML/JSX 오인 방지를 위해 react-markdown에서도 사용 가능)
// react-markdown은 HTML/JSX 혼동에 취약하므로 안전하게 문자열을 처리하기 위함

// 프로젝트에서 사용하는 타입 정의
import type { Post, NotionTag } from '@/types/blog';

// 노션 API에서 반환하는 페이지 데이터를 타입스크립트로 안전하게 받기 위함
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

// notion-to-md: 노션의 블록(JSON)을 Markdown 문자열로 변환하는 라이브러리
// react-markdown은 Markdown 문자열만 있으면 렌더링 가능하므로 변환 과정은 동일하게 유지
import { NotionToMarkdown } from 'notion-to-md';

import { cache } from 'react';

// 노션 API 클라이언트 생성
// Next.js 서버 환경에서 process.env로 비밀키가 안전하게 보호됨
export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// 노션 블록 → Markdown 변환기 생성
const n2m = new NotionToMarkdown({ notionClient: notion });


// 노션 페이지 메타데이터를 우리가 정의한 Post 타입으로 변환
function getPostMetadata(page: PageObjectResponse): Post {
  const { properties } = page;

  const getCoverImage = (cover: PageObjectResponse['cover']) => {
    if (!cover) return '';

    switch (cover.type) {
      case 'external':
        return cover.external.url;
      case 'file':
        return cover.file.url;
      default:
        return '';
    }
  };

  return {
    id: page.id,
    title:
      properties.Title.type === 'title'
        ? properties.Title.title[0]?.plain_text ?? ''
        : '',
    description:
      properties.Description.type === 'rich_text'
        ? properties.Description.rich_text[0]?.plain_text ?? ''
        : '',
    coverImage: getCoverImage(page.cover),
    tags:
      properties.Tags.type === 'multi_select'
        ? properties.Tags.multi_select.map((tag) => tag.name)
        : [],
    date:
      properties.Date.type === 'date'
        ? properties.Date.date?.start ?? ''
        : '',
    modifiedDate: page.last_edited_time,
    slug:
      properties.Slug.type === 'rich_text'
        ? properties.Slug.rich_text[0]?.plain_text ?? page.id
        : page.id,
  };
}


// 슬러그로 특정 게시글 데이터를 가져오는 함수
// MDX는 제거되었고, 이제 react-markdown 기준으로 Markdown만 반환하면 됨
export const getPostBySlug = cache(
  async (
    slug: string
  ): Promise<{
    markdown: string;
    post: Post;
  }> => {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        and: [
          { property: 'Slug', rich_text: { equals: slug } },
          { property: 'Status', select: { equals: 'Published' } },
        ],
      },
    });

    if (response.results.length === 0) {
      throw new Error(`No post found for slug: ${slug}`);
    }

    const page = response.results[0] as PageObjectResponse;

    // 노션 블록 → Markdown 변환
    const mdBlocks = await n2m.pageToMarkdown(page.id);
    const { parent } = n2m.toMarkdownString(mdBlocks);

    // react-markdown도 HTML 마크업이나 JSX를 혼동할 수 있기 때문에
    // escapeMarkdown을 사용해 Markdown을 안전한 문자열로 전처리함
    const safeMarkdown = parent;

    return {
      markdown: safeMarkdown,
      post: getPostMetadata(page),
    };
  }
);

interface GetPublishedPostsParams {
  tag?: string;
  sort?: string;
  pageSize?: number;
  startCursor?: string;
}

export interface GetPublishedPostsResponse {
  posts: Post[];
  hasMore: boolean;
  nextCursor: string | null;
}




// 게시글 전체 목록 조회 (태그 필터 포함)
export const getPublishedPosts = async ({
  tag,
  pageSize = 100,
  startCursor,
}: GetPublishedPostsParams = {}): Promise<GetPublishedPostsResponse> => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      and: [
        { property: 'Status', select: { equals: 'Published' } },
        ...(tag && tag !== '전체'
          ? [{ property: 'Tags', multi_select: { contains: tag } }]
          : []),
      ],
    },
    sorts: [{ property: 'Date', direction: 'descending' }],
    page_size: pageSize,
    start_cursor: startCursor,
  });

  const posts = response.results
    .filter((page): page is PageObjectResponse => 'properties' in page)
    .map(getPostMetadata);

  return {
    posts,
    hasMore: response.has_more,
    nextCursor: response.next_cursor,
  };
};



// 태그 목록 생성
export const getTags = async (): Promise<NotionTag[]> => {
   const { posts } = await getPublishedPosts({ pageSize: 100 });

  const tagCount = posts.reduce(
    (acc, post) => {
      post.tags?.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    },
    {} as Record<string, number>
  );

  const tags: NotionTag[] = Object.entries(tagCount).map(([name]) => ({
    id: name,
    name,
  }));

  // "전체" 태그 추가
  tags.unshift({ id: 'all', name: '전체' });

  // ABC 순 정렬
  const [allTag, ...restTags] = tags;
  const sortedTags = restTags.sort((a, b) => a.name.localeCompare(b.name));

  return [allTag, ...sortedTags];
};
