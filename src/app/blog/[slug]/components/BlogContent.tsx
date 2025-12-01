// BlogContent.tsx
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface BlogContentProps {
  markdown: string;
}

export default function BlogContent({ markdown }: BlogContentProps) {
  // -----------------------------------------
  //   ID 중복 방지용 map
  // -----------------------------------------
  const idMap: Record<string, number> = {};

  function makeUniqueId(text: string) {
    const base = text.replace(/\s+/g, "-").trim();

    if (!idMap[base]) {
      idMap[base] = 1;
      return base;
    }

    const id = `${base}-${idMap[base]}`;
    idMap[base] += 1;
    return id;
  }

  return (
    <article className="prose dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        skipHtml={true}
        components={{
          /* ---------------------------
             H1~H3 자동 ID + 중복 해결
          ---------------------------- */
          h1({ children, ...props }) {
            const text = String(children);
            const id = makeUniqueId(text);
            return (
              <h1 id={id} {...props}>
                {children}
              </h1>
            );
          },

          h2({ children, ...props }) {
            const text = String(children);
            const id = makeUniqueId(text);
            return (
              <h2 id={id} {...props}>
                {children}
              </h2>
            );
          },

          h3({ children, ...props }) {
            const text = String(children);
            const id = makeUniqueId(text);
            return (
              <h3 id={id} {...props}>
                {children}
              </h3>
            );
          },

          /* ---------------------------
             코드 렌더러
          ---------------------------- */
          code({ children, className, ...rest }) {
            const isInline = !className;
            const match = /language-(\w+)/.exec(className || "");

            // Fenced code block
            if (!isInline && match) {
              return (
                <SyntaxHighlighter
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              );
            }

            // Inline code
            return (
              <code
                className="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-700"
                {...rest}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </article>
  );
}
