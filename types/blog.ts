export interface NotionTag {
  id: string;
  name: string;
}

//이런 노션 프로퍼티의 타입은 노션 디벨로퍼 공식문서에 잇음
export interface NotionPost {
  id: string;
  title: string;
  description?: string;
  coverImage?: string;
  tags?: string[];
  author?: string;
  date?: string;
  modifiedData?: string;
  slug: string;
}
