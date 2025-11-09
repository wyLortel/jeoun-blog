import AboutHeader from '@/src/components/about/AboutHeader';
import EducationTimeline from '@/src/components/about/EducationTimeline';
import SkillSection from '@/src/components/about/SkillSection';

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-screen-lg space-y-16 px-4 py-12">
      <AboutHeader />

      <section className="mt grid grid-cols-1 items-start gap-16 md:grid-cols-2">
        <EducationTimeline />
        <SkillSection />
      </section>
    </div>
  );
}

//앱 디렉토가 도메인에서 접근할떄 루트라고 보면 되고 이 하위에 페이지가 잇으면 루트를 햇을때 렌더링이 되는 페이지다
