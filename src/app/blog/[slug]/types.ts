export interface TocEntry {
  value: string; //제목
  depth: number; //hheading 예를 들어 h1이면  1
  id?: string; //slug로 만든 고유 id
  children?: Array<TocEntry>; //하위목차
}
