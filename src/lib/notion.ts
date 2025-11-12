//lib/notion.ts는 노션 API와 관련된 모든 백엔드 로직 데이터 관련 함수들을 모아둔 곳이에요.
//노션 공식 sdk 노션 api를 쉽게 호출할수록 도와줌
import { Client } from '@notionhq/client';

//타입을 자주 정의하기에 타입을 따로 파일로 만듥ㅎ import
import type { NotionPost } from '@/types/blog';

//노션에서 오는 형태를 타입스크립트 형태로 바꿈
import type {
  PageObjectResponse,
  PersonUserObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';

//노션api를 호출할 클라이언트 생성
//new Client({ auth: ... }): SDK가 요구하는 생성자.
//process.env.NOTION_TOKEN 프로세스는 Node.js 실행 프로세스 전역 객체 window같은 전역이라는것을 알려주기위해
//환경 변수는 운영체제나 서버가 실행될때 프로그램이 참고할 설정값 즉 코드 바깥에잇는 설정파일
//next js는 node js에서 돌아감 위도우가 아닌 그래서 서버nodejs에서 먼저 코드를 실행한뒤 html결과를 만들어 브라우저에 보내줌 즉 서버에서 먼저 들고 결과만 클라이언트로 보내준다
//이 구조 덕분에 브라우저로 안넘어가고 nextjs는 자동으로 클라이언트에 노출이 되지않게 보호함 그래서 api키나 비밀번호를 안전하게 보호 가능
//그럼 왜 리액트는 안되나? 리액트는 node js 서버같은게 없이 브라우저 위에서 돌아감 그래서 환경변수라는 개념이 아에없음
//process.env는 Node.js가 실행될 때 자동으로 만들어주는 전역 객체라서 우리가 직접 import를 하지않아도 항상 존재하는듯 하다
//export 한파일에서 여러 파일 보낼수잇음 export default 이건 대표로 하나만 보내는것 그리고 export는 이름이 같아야하지만 export default는 이름을 마음대로 바꿀수잇음
export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

//선택태그 최신순 불러오기 쿼리에 맞는것이 잇느면 post 형태로 리턴  만약 태그로 매개변수가 아니면 퍼블리쉬된 모든 글을 가져온다
//tag? 매게변수가 잇을수도 없을수도잇다
export const getPublishedPosts = async (): Promise<NotionPost[]> => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: 'Status',
      select: {
        equals: 'Published',
      },
    },
    sorts: [
      {
        property: 'Date',
        direction: 'descending',
      },
    ],
  });

  console.log(response.results);

  return response.results
    .filter((page): page is PageObjectResponse => 'properties' in page)
    .map((page) => {
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
          properties.Title.type === 'title' ? (properties.Title.title[0]?.plain_text ?? '') : '',
        description:
          properties.Description.type === 'rich_text'
            ? (properties.Description.rich_text[0]?.plain_text ?? '')
            : '',
        coverImage: getCoverImage(page.cover),
        tags:
          properties.Tags.type === 'multi_select'
            ? properties.Tags.multi_select.map((tag) => tag.name)
            : [],
        author:
          properties.Author.type === 'people'
            ? ((properties.Author.people[0] as PersonUserObjectResponse)?.name ?? '')
            : '',
        date: properties.Date.type === 'date' ? (properties.Date.date?.start ?? '') : '',
        modifiedDate: page.last_edited_time,
        slug:
          properties.Slug.type === 'rich_text'
            ? (properties.Slug.rich_text[0]?.plain_text ?? page.id)
            : page.id,
      };
    });
};
