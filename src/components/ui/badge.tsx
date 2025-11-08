import * as React from 'react';
//Slot은 어떤 태그를 넣든 내가 지정한 스타일을 렌더링해줌 예를 들면 버튼 태그안에 a태그 같은건 유효하지않은 중첩이나 해줌 prop으로 받을때
import { Slot } from '@radix-ui/react-slot';
//여러 조건일 경우 조건문을 잔뜩 써야함 저걸 이름표를 묶어서 보기쉽게한것 테일윈드 css를 좀더 쉽게 쓸수잇음
//type VariantProps 요건 타입스크립트의 보너스 기능 우리가 만든 variant들을 타입으로 등록 오타치면 에러남
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/src/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
        destructive:
          'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline: 'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
      },
    },
    defaultVariants: {
      //기본스타일
      variant: 'default',
    },
  }
);

//클래스 같은 설계도인듯  Badge가 무엇을 받을수잇는가  asChild 이 컴포넌트의 겉모습(태그)을 바꾸되, 안에 있는 스타일과 동작은 그대로 유지하겠다
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  //React.ComponentProps<'span'> 스판태그의 기본 속성을 받을수잇음
  const Comp = asChild ? Slot : 'span'; //false면 그냥 <span> 사용 true면 Radix의 <Slot> 사용

  //data-slot="badge" 이건 그냥이 요소는 badge 역할이에요 라는 식별자  variant 이건 내가 만든거중 선택
  return (
    <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
