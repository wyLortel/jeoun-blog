import Image from 'next/image';

const contactInfo = [
  { label: 'Email', value: 'young99@g.yju.ac.kr' },
  { label: 'Birth', value: '1999-11-26' },
  { label: 'Phone', value: '010-0000-0000' },
];

export default function AboutHeader() {
  return (
    // md:items-center: 데스크탑에서만 세로 중앙 정렬
    // gap-10: 모바일에서 요소 사이 간격을 조금 더 확보
    <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:items-center">

      {/* 1. 이미지 영역: 모바일에서는 맨 위로 올리는 것이 시각적으로 안정적입니다 */}
      <div className="flex justify-center md:order-2 md:justify-end">
        <div className="relative">
          <Image
            src="/profile.png"
            alt="프로필 사진"
            width={300}
            height={300}
            className="border-primary h-48 w-48 rounded-full border-4 object-cover md:h-[300px] md:w-[300px]"
          />
          <div className="bg-primary absolute -bottom-2 -right-2 h-8 w-8 rounded-full border-4 border-white dark:border-gray-900" />
        </div>
      </div>

      <div className="order-2 space-y-6 text-center md:order-1 md:text-left">
        <div className="space-y-2">
          <span className="text-primary text-base font-bold tracking-wider uppercase md:text-lg">
            Software Developer
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight md:text-6xl">
            Jeoung <span className="text-primary">Wooyoung</span>
          </h2>
        </div>

        <p className="text-muted-foreground mx-auto max-w-md text-base leading-relaxed md:mx-0 md:text-lg">
          私は、チーム全体を支えるエンジニアになりたいです。<br className="hidden md:block" />
          技術だけでなく、人との信頼や調和を大切にし、<br className="hidden md:block" />
          周りが安心して働ける環境を作りたいと思っています。
        </p>

        <address className="border-primary mx-auto w-fit space-y-2 border-l-4 pl-4 text-left not-italic md:mx-0 md:text-base">
          {contactInfo.map((item) => (
            <p key={item.label} className="flex items-center">
              <span className="text-primary min-w-[60px] text-xs font-bold uppercase tracking-tighter">
                {item.label}
              </span>
              <span className="text-sm font-medium md:text-base">{item.value}</span>
            </p>
          ))}
        </address>
      </div>
    </div>
  );
}
