export interface TocEntry {
  value: string;
  depth: number;
  id: string;           // ← ? 제거 (id 반드시 존재!)
  children?: Array<TocEntry>;
}
