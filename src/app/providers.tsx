'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

//서버 데이터를 캐싱·관리·동기화하는 라이브러리 (API fetch 자동 처리 도구)
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

//React Query 내부 상태를 눈으로 디버깅할 수 있게 해주는 개발자 패널
import { ThemeProvider } from '@/src/app/_components/theme/ThemeProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
