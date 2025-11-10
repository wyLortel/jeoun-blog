export default function EducationTimeline() {
  const items = [
    { year: '2022', title: 'YMCA福岡日本語学校を卒業' },
    { year: '2024', title: '麻生建築＆デザイン専門学校を卒業' },
    { year: '2025–2028', title: '永進専門大学グローバルシステム融合科に在学中' },
  ];

  return (
    <div className="border-primary space-y-6 border-l-4 pl-6">
      {items.map((item) => (
        <div key={item.title}>
          <h3 className="font-semibold text-gray-900">{item.title}</h3>
          <p className="text-sm text-gray-500">{item.year}</p>
        </div>
      ))}
    </div>
  );
}
