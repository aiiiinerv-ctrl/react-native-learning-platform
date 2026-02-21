'use client';
import { use } from 'react';
import Link from 'next/link';
import { useI18n } from '@/i18n/I18nProvider';
import { useProgress } from '@/context/ProgressContext';
import { getLevelData } from '@/data/curriculum';
import { getWorkshopsForLesson } from '@/data/workshops';

export default function LevelPage({ params }: { params: Promise<{ level: string }> }) {
  const { level } = use(params);
  const { locale, t } = useI18n();
  const { isCompleted } = useProgress();
  const levelData = getLevelData(level);

  if (!levelData) return <div className="empty-state"><div className="empty-state-icon">🔍</div><p>Level not found</p></div>;

  const levelNames: Record<string, { en: string; th: string }> = {
    beginner: { en: 'Beginner', th: 'เริ่มต้น' },
    intermediate: { en: 'Intermediate', th: 'ปานกลาง' },
    expert: { en: 'Expert', th: 'ผู้เชี่ยวชาญ' },
  };

  const levelTitle = locale === 'th' ? levelNames[level]?.th : levelNames[level]?.en;

  return (
    <>
      <div className="page-header">
        <div className="breadcrumb">
          <Link href="/">{t.nav.home}</Link>
          <span>/</span>
          <span>{levelTitle}</span>
        </div>
        <h1>{levelTitle}</h1>
        <p>{(t.levels as any)[level]?.description}</p>
      </div>

      <div className="module-list">
        {levelData.modules.map(mod => {
          const completedInMod = mod.lessons.filter(l => isCompleted(l.id)).length;
          const progressPct = Math.round((completedInMod / mod.lessons.length) * 100);

          return (
            <div className="module-card animate-in" key={mod.id}>
              <div className="module-card-header">
                <h2>{locale === 'th' ? mod.titleTh : mod.titleEn}</h2>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  {completedInMod}/{mod.lessons.length} {t.common.lessons}
                </span>
              </div>
              <div className="module-progress-bar">
                <div className="module-progress-fill" style={{ width: `${progressPct}%` }} />
              </div>
              <div className="lesson-list">
                {mod.lessons.map(lesson => {
                  const linkedWorkshops = getWorkshopsForLesson(lesson.id);
                  return (
                    <div key={lesson.id}>
                      <Link href={`/learn/${level}/${mod.id}/${lesson.id}`} className="lesson-item">
                        <div className={`lesson-check ${isCompleted(lesson.id) ? 'completed' : ''}`}>
                          {isCompleted(lesson.id) && <span style={{ color: 'white', fontSize: '12px' }}>✓</span>}
                        </div>
                        <span className="lesson-title">
                          {locale === 'th' ? lesson.titleTh : lesson.titleEn}
                        </span>
                        {lesson.deprecations && lesson.deprecations.length > 0 && (
                          <span className={`deprecation-badge ${lesson.deprecations[0].severity}`}>
                            ⚠ {lesson.deprecations[0].severity === 'critical' ? 'Critical' : 'Update'}
                          </span>
                        )}
                      </Link>
                      {linkedWorkshops.map(ws => (
                        <Link href={`/workshop/${ws.id}`} className="workshop-badge" key={ws.id}>
                          🛠 {locale === 'th' ? ws.titleTh : ws.titleEn}
                          <span style={{ opacity: 0.6 }}>→</span>
                        </Link>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
