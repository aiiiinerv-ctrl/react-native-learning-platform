import { Level } from './types';
import { beginnerModules } from './beginner';
import { intermediateModules } from './intermediate';
import { expertModules } from './expert';

export const curriculum: Level[] = [
  { id: 'beginner', modules: beginnerModules },
  { id: 'intermediate', modules: intermediateModules },
  { id: 'expert', modules: expertModules },
];

export function getLevelData(levelId: string) {
  return curriculum.find(l => l.id === levelId);
}

export function getModuleData(levelId: string, moduleId: string) {
  const level = getLevelData(levelId);
  return level?.modules.find(m => m.id === moduleId);
}

export function getLessonData(levelId: string, moduleId: string, lessonId: string) {
  const mod = getModuleData(levelId, moduleId);
  return mod?.lessons.find(l => l.id === lessonId);
}

export function getAllLessons() {
  return curriculum.flatMap(l => l.modules.flatMap(m => m.lessons));
}

export function getTotalLessonCount() {
  return getAllLessons().length;
}

export function getAllDeprecations() {
  return getAllLessons()
    .filter(l => l.deprecations && l.deprecations.length > 0)
    .flatMap(l => l.deprecations!.map(d => ({ ...d, lessonId: l.id, lessonTitleEn: l.titleEn, lessonTitleTh: l.titleTh })));
}
