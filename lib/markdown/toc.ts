export interface TocEntry {
  id: string;
  value: string;
  level: number;
  children: TocEntry[];
}

// Markdown에서 TOC 정보 추출
export function extractToc(markdown: string): TocEntry[] {
  const lines = markdown.split("\n");

  const toc: TocEntry[] = [];
  const stack: TocEntry[] = [];

  for (const line of lines) {
    const match = /^(#{1,3})\s+(.*)$/.exec(line);
    if (!match) continue;

    const level = match[1].length; // # 개수
    const text = match[2].trim();
    const id = text.replace(/\s+/g, "-"); // 스페이스 → -

    const entry: TocEntry = {
      id,
      value: text,
      level,
      children: [],
    };

    // 레벨 구조에 따라 계층 생성
    while (stack.length > 0 && stack[stack.length - 1].level >= level) {
      stack.pop();
    }

    if (stack.length === 0) {
      toc.push(entry);
    } else {
      stack[stack.length - 1].children.push(entry);
    }

    stack.push(entry);
  }

  return toc;
}
