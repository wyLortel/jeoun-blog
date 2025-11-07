import * as React from 'react';
//ESModules 최신 모듈은 default export 그래서 import React from "react"는 타입스크립트에서 오류가 날수잇음
//안서도 되는데 왜쓰냐 타입스크립트에서 리액트 도구를 사용하기 위해

//clsx() 조건부 클래스 문자열을 깔끔하게 만들어줌 &&이런거 써서 조건문으로 스타일링 가능하게
//twMerge() 중복된 Tailwind 클래스 자동 병합 (p-2 p-4 → p-4)
// 저거 두개를 합쳐놓은게  cn
import { cn } from '@/src/lib/utils';

//div>가 가질 수 있는 모든 속성을 받아들일 수 있다. React.ComponentProps<'div'> 이건 div모든 타입 다받아 이런뜻
//props는 항상 객체
function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card" //내가 만드는 속성
      className={cn(
        'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm',
        className //클래스네임 밖에서서 컴포넌트로 사용하면 그걸 합쳐주는것
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
        className
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn('leading-none font-semibold', className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-content" className={cn('px-6', className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
      {...props}
    />
  );
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent };
