import { Badge } from '@/src/app/_components/ui/badge';

const skills = ['React', 'JavaScript', 'Python', 'Next.js', 'Java', 'TypeScript'];

const japaneseSkills = [
  { date: '2021.12', title: 'JLPT N1' },
  { date: '2023.12', title: 'サービス接遇検定３級' },
];

export default function SkillSection() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-primary text-2xl font-bold">日本語能力</h3>
        <div className="mt-2 text-base leading-loose">
          {japaneseSkills.map((skill) => (
            <p key={skill.date}>
              <span className="mr-3 font-semibold">{skill.date}</span>
              {skill.title}
            </p>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-primary text-2xl font-bold">Programming</h3>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-3">
          {skills.map((skill) => (
            <Badge key={skill} className="text-l px-5 py-3 font-semibold dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:hover:bg-slate-700">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
