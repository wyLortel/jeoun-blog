//기본적으로 mdx를 nextjs는 렌더하지못함 문자열 기반 markdown을 안전하게 React Component로 바꿔주는 라이브러리.
import { MDXRemote } from 'next-mdx-remote/rsc';

//체크 박스 표 등을 지원하는 마크다운 확장 마크다운에서 gfm문법을 기본적으로 지원하지않음
import remarkGfm from 'remark-gfm';

//Markdown의 제목 h1 h2같은거 그것에 자동으로 id를 붙여주는 플러그인 노션의 제목이 id로 작용 같은제목이면 숫자를 붙여서 구별한다함
import rehypeSlugs from 'rehype-slug';

import rehypePrettyCode from 'rehype-pretty-code';

//안에잇는 위험한테그 제거 예를들면 <script> 태그를 넣으면 브라우저에서 그대로 실행
import rehypeSanitize from 'rehype-sanitize';

//마크다운 사용패턴
export default function BlogContent({ markdown }: { markdown: string }) {
  return (
    <article className="prose prose-neutral prose-sm dark:prose-invert mt-10 max-w-none">
      <MDXRemote
        source={markdown} //MDXRemote에 렌더할 Markdown 문자열 전달.
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlugs, rehypeSanitize, rehypePrettyCode],
          },
        }}
      />
    </article>
  );
}
