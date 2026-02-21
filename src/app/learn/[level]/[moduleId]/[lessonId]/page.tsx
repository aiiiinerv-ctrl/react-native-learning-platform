import { curriculum } from '@/data/curriculum';
import LessonPageClient from './LessonPageClient';

export function generateStaticParams() {
  const params: { level: string; moduleId: string; lessonId: string }[] = [];
  for (const level of curriculum) {
    for (const mod of level.modules) {
      for (const lesson of mod.lessons) {
        params.push({ level: level.id, moduleId: mod.id, lessonId: lesson.id });
      }
    }
  }
  return params;
}

export default function LessonPage({ params }: { params: Promise<{ level: string; moduleId: string; lessonId: string }> }) {
  return <LessonPageClient params={params} />;
}
