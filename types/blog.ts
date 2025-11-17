export interface NotionTag {
  id: string;
  name: string;
}

//이런 노션 프로퍼티의 타입은 노션 디벨로퍼 공식문서에 잇음
export interface Post {
  id: string;
  title: string;
  description?: string;
  coverImage?: string;
  tags?: string[]; // ← 변경해야 하는 부분
  author?: string;
  date?: string;
  modifiedDate?: string;
  slug: string;
}
