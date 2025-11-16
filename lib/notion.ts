//lib/notion.ts는 노션 API와 관련된 모든 백엔드 로직, 데이터 관련 함수들을 모아둔 곳이에요.

//노션 공식 SDK — 노션 API를 더 쉽게 호출할 수 있도록 도와주는 라이브러리
import { Client } from '@notionhq/client';

//타입을 자주 정의하기 때문에 따로 파일로 만들어 import 해요 (유지보수 편하게)
import type { NotionPost, NotionTag } from '@/types/blog';

//노션에서 전달받는 데이터를 타입스크립트에서 사용하기 위해 필요한 타입들을 import
import type {
  PageObjectResponse,
  PersonUserObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';

//노션 API를 호출할 클라이언트 생성
// new Client({ auth: ... })는 SDK에서 제공하는 기본 생성자.
// process.env.NOTION_TOKEN은 환경 변수에 저장된 비밀 키를 불러오는 것.
// process.env는 Node.js 실행 프로세스에서 자동으로 제공되는 전역 객체로,
// 우리가 직접 import하지 않아도 항상 접근이 가능합.

// Next.js는 Node.js 위에서 실행되기 때문에 서버 환경에서 코드를 먼저 실행하고,
// 그 결과로 만들어진 HTML을 클라이언트(브라우저)로 전달해요.
// 이 구조 덕분에 클라이언트 쪽 코드에는 API 키나 비밀번호가 노출되지 않아요.
// (즉, React에서는 불가능한 환경변수 보안이 가능하다는 뜻)

// export는 여러 개 가능하지만, export default는 파일당 한 개만 가능.
// export default는 이름을 자유롭게 바꿔 import할 수 있고,
// 일반 export는 반드시 동일한 이름으로 import해야함.
export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

//선택태그 최신순 불러오기 쿼리에 맞는것이 잇느면 post 형태로 리턴  만약 태그로 매개변수가 아니면 퍼블리쉬된 모든 글을 가져온다
//tag? 매게변수가 잇을수도 없을수도잇다
export const getPublishedPosts = async (tag?: string): Promise<NotionPost[]> => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    //
    filter: {
      and: [
        {
          property: 'Status',
          select: {
            equals: 'Published',
          },
        }, //태그 전체가 아니고 그 태그글만
        ...(tag && tag !== '전체'
          ? [
              {
                property: 'Tags',
                multi_select: {
                  contains: tag, //페이지 테그에 내가 매개 변수로 넘긴 테그 찾기
                },
              },
            ]
          : []),
      ],
    },
    sorts: [
      {
        property: 'Date',
        direction: 'descending',
      },
    ],
  });

  // 노션에서 가져온 결과를 콘솔에 출력 (디버깅용)
  console.log(response.results);

  // 결과 중에서 'properties'를 가진 페이지 객체만 필터링
  // 타입 가드(page is PageObjectResponse)를 써서 타입스크립트가 확실하게 인식할 수 있게 함
  return response.results
    .filter((page): page is PageObjectResponse => 'properties' in page)
    .map((page) => {
      const { properties } = page;

      // 커버 이미지 URL을 가져오는 내부 함수
      // cover.type에 따라 external(외부 URL)인지 file(노션 내부 파일)인지 구분함
      const getCoverImage = (cover: PageObjectResponse['cover']) => {
        if (!cover) return ''; // 커버가 없으면 빈 문자열 반환

        switch (cover.type) {
          case 'external':
            return cover.external.url;
          case 'file':
            return cover.file.url;
          default:
            return '';
        }
      };

      // 필요한 데이터만 꺼내서 우리가 정의한 NotionPost 형태로 반환
      return {
        id: page.id,
        // title : 노션의 Title 프로퍼티는 배열 형태이므로 [0]으로 접근
        title:
          properties.Title.type === 'title' ? (properties.Title.title[0]?.plain_text ?? '') : '',
        // description : 리치 텍스트 타입의 첫 번째 텍스트 추출
        description:
          properties.Description.type === 'rich_text'
            ? (properties.Description.rich_text[0]?.plain_text ?? '')
            : '',
        // 커버 이미지 URL
        coverImage: getCoverImage(page.cover),
        // 태그 : multi_select 배열을 map()으로 이름만 추출
        tags:
          properties.Tags.type === 'multi_select'
            ? properties.Tags.multi_select.map((tag) => tag.name)
            : [],
        // 작성자 : people 타입에서 첫 번째 사람의 이름 추출
        author:
          properties.Author.type === 'people'
            ? ((properties.Author.people[0] as PersonUserObjectResponse)?.name ?? '')
            : '',
        // 날짜 : date 프로퍼티의 start 값만 가져옴
        date: properties.Date.type === 'date' ? (properties.Date.date?.start ?? '') : '',
        // 마지막 수정 시간 : 노션 시스템 필드
        modifiedDate: page.last_edited_time,
        // slug : rich_text 타입의 첫 번째 값 or page.id (fallback)
        slug:
          properties.Slug.type === 'rich_text'
            ? (properties.Slug.rich_text[0]?.plain_text ?? page.id)
            : page.id,
      };
    });
};

export const getTags = async (): Promise<NotionTag[]> => {
  //Promise<X> NotionTag[] 배열을 비동기로 반환한다는 뜻 저렇게 작성함으로 서 지금 당장은 타입이 없지만 나중에 받을거라 알려줌
  const posts = await getPublishedPosts();

  const tagSet = new Set<string>(); //이렇게 set으로 만들고 여기서 값을 넣음 중복된거잇으면 자동제거

  posts.forEach((post) => {
    post.tags?.forEach((tag) => tagSet.add(tag));
  });

  const tags: NotionTag[] = [...tagSet].map((name) => ({
    id: name,
    name, //단축속성명 키와값이 이름이 같으면 생략 가능
  }));

  tags.unshift({ id: 'all', name: '전체' });

  return tags;
};
