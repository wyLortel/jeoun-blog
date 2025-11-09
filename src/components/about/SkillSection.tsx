import { Badge } from '@/src/components/ui/badge';
import { Separator } from '@radix-ui/react-separator';

export default function SkillSection() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-primary text-2xl font-bold">日本語能力</h3>
        <div className="mt-2 text-base leading-loose">
          <p>
            <span className="mr-3 font-semibold">2021.12</span> JLPT N1
          </p>
          <p>
            <span className="mr-3 font-semibold">2023.12</span> サービス接遇検定３級
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-primary text-2xl font-bold">Programming</h3>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          <Badge>React</Badge>
          <Badge>JavaScript</Badge>
          <Badge>Python</Badge>
          <Badge>Next.js</Badge>
          <Badge>Java</Badge>
          <Badge>TypeScript</Badge>
        </div>
      </div>
    </div>
  );
}
