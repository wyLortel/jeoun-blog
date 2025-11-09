import Image from 'next/image';

export default function AboutHeader() {
  return (
    <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
      <div className="space-y-6">
        <span className="text-primary text-lg font-medium tracking-tight">Software Developer</span>
        <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">Jeoung Wooyoung</h2>
        <p className="text-base leading-relaxed text-gray-700 md:text-lg">
          私は、チーム全体を支えるエンジニアになりたいです。
          <br /> 技術だけでなく、人との信頼や調和を大切にし、
          <br /> 周りが安心して働ける環境を作りたいと思っています。
        </p>

        <address className="border-primary space-y-1 border-l-4 pl-4 text-sm leading-relaxed not-italic md:text-base">
          <p>
            <span className="text-primary mr-3 font-semibold">Email</span>
            young99@g.yju.ac.kr
          </p>
          <p>
            <span className="text-primary mr-3 font-semibold">Birth</span>
            1999-11-26
          </p>
          <p>
            <span className="text-primary mr-3 font-semibold">Phone</span>
            010-0000-0000
          </p>
        </address>
      </div>

      <div className="flex justify-center md:justify-end">
        <Image
          src="/profile.png"
          alt="프로필 사진"
          width={300}
          height={300}
          className="border-primary rounded-full border-4"
        />
      </div>
    </div>
  );
}
