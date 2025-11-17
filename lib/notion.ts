//lib/notion.ts는 노션 API와 관련된 모든 백엔드 로직 데이터 관련 함수들을 모아둔 곳이에요.

//노션 공식 sdk 노션 api를 쉽게 호출할수록 도와줌
import { Client } from '@notionhq/client';

//타입을 자주 정의하기에 타입을 따로 파일로 만듥ㅎ import
import type { Post, NotionTag } from '@/types/blog';

//노션에서 오는 형태를 타입스크립트 형태로 바꿈
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

//노션api에서 가져온 데이터를 마크다운 텍스트로 바궈주는 라이브러리
//원래 노션은 모든 요소(제목 문단)을 json블록으로 저장 하지만 브라우저로 html로 렌더링하면 복잡하다
//하지만 마크다운으로 변경하면 문자열만 렌더링하면됨으로 Markdown 렌더러로 한방에 렌더링 할수잇다
//각 블록마다 구조가 다르기 때문에 → 타입별로 분기(if문) 를 써야함.
// 그렇지 않으면 어떤 블록은 text 필드가 없고, 어떤 건 file이 있고...
import { NotionToMarkdown } from 'notion-to-md';

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
  auth: process.env.NOTION_TOKEN, //이건 생성자
});

//notion은 아까 우리가 api키를 넘겨 줘서 만든Notion API 객체
//notionClient: notion(이건 내가 정한거)  이런 형식으로(노션에서 정해준 형식) 내가만든 노션을 NotionToMarkdown생성자로 넘기면 마크다운으로 변경할 준비를하게된것
const n2m = new NotionToMarkdown({ notionClient: notion });

//즉 이 함수는 우리가 가져온 (아래함수에서 만들 page안에 여러 프로퍼티들을 나누어서 쓸수도잇게)하는 함수
//page(나중에 받을 페이지 노션글 값들 그거의 형태가 PageObjectResponse))
//Post 우리가 타입을 인터페이스로 선언해줫던것 그것으로 값을 받겟다
function getPostMetadata(page: PageObjectResponse): Post {
  //구조 분해 할당으로 page.properties만 꺼냄
  //프로파티 안에는 내가 노션에서 정해준 프로파티들이 들어가잇음
  const { properties } = page;

  //cover은 PageObjectResponse의['cover']을 매개변수 타입으로 지정
  //노션에들어오는 커버이미지가 여러개일수잇으니 방식을 구분해서 받아줘야함 그래서 그걸 위한 내부함수구현
  const getCoverImage = (cover: PageObjectResponse['cover']) => {
    if (!cover) return ''; //

    switch (cover.type) {
      case 'external': //외부url 연결 경우
        return cover.external.url;
      case 'file': //내부 url 연결경우
        return cover.file.url;
      default: // 아니면 없음
        return '';
    }
  };

  //이렇게해서 노션 api에서 내가 원하는 인터페이스로 지정햇던 값들만 반환가능
  return {
    id: page.id,
    //타입은 노션 공식문서에서 확인이 가능 ??는 없으면 빈값넣기 [0]쓰는이유는 타이틀 배열의 첫번째 객체에 제목이 들어잇음 만약 빈값이들어잇어도 실행되게 하기위해서 넣어놈
    title: properties.Title.type === 'title' ? (properties.Title.title[0]?.plain_text ?? '') : '',
    description:
      properties.Description.type === 'rich_text'
        ? (properties.Description.rich_text[0]?.plain_text ?? '')
        : '',
    coverImage: getCoverImage(page.cover),
    //태그는 맵함수로 원래 배열에서 태그만 빼내어 새로운 배열 만들음
    tags:
      properties.Tags.type === 'multi_select'
        ? properties.Tags.multi_select.map((tag) => tag.name)
        : [],
    date: properties.Date.type === 'date' ? (properties.Date.date?.start ?? '') : '',
    modifiedDate: page.last_edited_time,
    slug:
      properties.Slug.type === 'rich_text'
        ? (properties.Slug.rich_text[0]?.plain_text ?? page.id)
        : page.id,
  };
}

export const getPostBySlug = async (
  slug: string //이글의 식별자 slug(url될애)를 매개 변수로 받음
): Promise<{
  markdown: string;
  post: Post; //나중에 이런 형태의 객체를 반환할것이다 제너릭  Promise지금은 없지만비동기로 나중의 값을 약속하는것 무조건 저구조로 반환
}> => {
  //notion.databases.query()데이터베이스에서 여러 페이지 검색하기
  //await이 붙엇으니 같은 함수에서는 이거 끝날때가지 멈춤
  const response = await notion.databases.query({
    //이게 데이터 베이스라 잇기에 아래 쿼리문이 먹음
    database_id: process.env.NOTION_DATABASE_ID!, //환경변수라서 오류를 띄움 그래서 !를 붙여서 null이나 undefined이 아니라고 알려줘야함

    //Notion API의 쿼리 옵션 filter SQL로 치면 WHERE 절 검색조건
    filter: {
      and: [
        {
          //첫번째 조건
          property: 'Slug',
          rich_text: {
            equals: slug,
          }, //슬러그거 내 슬러그랑 일치
        },
        {
          //두번재 조건 스테이터스가 퍼블리시 일것
          property: 'Status',
          select: {
            equals: 'Published',
          },
        },
      ],
    },
  });

  //만약 일치하는게 없으면 찾을수 없다고 서버 에러 띄어줌 화면에
  if (response.results.length === 0) {
    throw new Error(`No post found for slug: ${slug}`);
  }

  //response.results[0]에 여러 객체들의 배열이 들어져잇고 (프로퍼티 아이디 등)
  //저기서 타입이 여러가지일수잇으니  PageObjectResponse 타입이 온다하는것
  const page = response.results[0] as PageObjectResponse;

  // Markdown 변환
  //이 id에 해당하는 노션 페이지 블록들을 마크다운 블록형태로 변환 api에 요청해야하기때문에 네트워크필요 그래서 await사용
  const mdBlocks = await n2m.pageToMarkdown(page.id);

  //그걸 마크블록형식으로 변환
  const { parent } = n2m.toMarkdownString(mdBlocks);

  // ====== MDX에서 import/export 에러 방지용 escape 처리 ======
  // next-mdx-remote 및 MDX 컴파일러는 import/export 문을 코드 블록이 아닌 경우 에러를 발생시키기 때문에
  // 여기서 임시로 다른 문자열로 바꿔준다.
  const safeMarkdown = parent.replace(/import /g, '〈import〉 ').replace(/export /g, '〈export〉 ');
  // ====== escape 끝 ======

  return {
    markdown: safeMarkdown, // escape 처리된 문자열을 반환함
    post: getPostMetadata(page), //그래서 여러가지 페이지에서 여러 객체가 동시에 잇지만 그걸 필요한 부분만 반환해서 받음
  };
};

//선택태그 최신순 불러오기 쿼리에 맞는것이 잇느면 post 형태로 리턴  만약 태그로 매개변수가 아니면 퍼블리쉬된 모든 글을 가져온다
//tag? 매게변수가 잇을수도 없을수도잇다
export const getPublishedPosts = async (tag?: string): Promise<Post[]> => {
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

  //노션에 방금 쿼리 조건에 맞는 것들을 리절트에 담아줌
  //먼저 페이지인것만 필터함수로 걸러주고(필터가 아닌것이 잇을것을 방지) 타입을 명시해둿는데 타입가드로 한번더 확인하는 이유가 뭔데
  return (
    response.results
      .filter((page): page is PageObjectResponse => 'properties' in page) // properties' in page페이지 타입이라고 선언 //커스텀 타입가드
      //  타입스크립트 타입 명시를 햇으나 컴파일시점에는 아직 어떤값이 올지모르니   page is PageObjectResponse이건 함수의 반환타입 근데 진짜 이게 올지모르니 타입스크립트에 타입가드를 안해주면 오류남
      //  타입가드 : 여러타입중 원하는 타입으로 걸러내는것
      .map(getPostMetadata)
  );
};

//그니까 이함수는 태그를객체 전체를 하나 만들고 다른것도 태그별 이름별로 정리해서 갯수를 붙여 반환하는테그
export const getTags = async (): Promise<NotionTag[]> => {
  const posts = await getPublishedPosts(); //게시글 데이터를 다 불러옴

  // 모든 태그를 추출하고 각 태그의 출현 횟수를 계산
  const tagCount = posts.reduce(
    //acc 누적변수
    (acc, post) => {
      post.tags?.forEach((tag) => {
        //리듀서 함수
        acc[tag] = (acc[tag] || 0) + 1; //(acc[tag] || 0) + 1; (acc[tag] || 0)이게없으면 0이니까 처음에는 0으로 잇으면 1로 시작
      });
      return acc;
    },
    {} as Record<string, number> //{} 빈객체를 만들되 타입스크립트에게 키와 밸류의 타입을 알려줘야함 뭐가 올지 타입스크립트가 모름으로
    // Record<키의타입, 값의타입> 타입스크립트에서 자주 사용하는 초기설정 as 이 타입으로 취급하라 는 TypeScript 단언 리듀스는 초기값을 설정함 acc의 초기값을 설정한것
  );

  //여기까지
  // TagFilterItem 형식으로 변환 //({ … }) 는 “객체를 바로 반환
  const tags: NotionTag[] = Object.entries(tagCount).map(([name, count]) => ({
    //Object.entries(객체) 객체의 “키-값 쌍”을 [key, value] 형태의 배열로 바꿔줌
    id: name,
    name,
    count,
  }));

  // "전체" 태그 추가 .unshift배열 맨 앞에 추가
  tags.unshift({
    id: 'all',
    name: '전체',
  });

  // 태그 이름 기준으로 정렬 ("전체" 태그는 항상 첫 번째에 위치하도록 제외) 그래서 일부러 나누어서 함
  const [allTag, ...restTags] = tags;
  const sortedTags = restTags.sort((a, b) => a.name.localeCompare(b.name));

  return [allTag, ...sortedTags];
};
