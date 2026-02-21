import { curriculum } from '@/data/curriculum';
import LevelPageClient from './LevelPageClient';

export function generateStaticParams() {
  return curriculum.map(level => ({ level: level.id }));
}

export default function LevelPage({ params }: { params: Promise<{ level: string }> }) {
  return <LevelPageClient params={params} />;
}
