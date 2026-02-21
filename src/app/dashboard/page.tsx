'use client';
import Link from 'next/link';
import { useI18n } from '@/i18n/I18nProvider';
import { useProgress } from '@/context/ProgressContext';
import { curriculum, getAllLessons, getAllDeprecations, getTotalLessonCount } from '@/data/curriculum';

export default function DashboardPage() {
  const { locale, t } = useI18n();
  const { isCompleted, completedLessons, getCompletedCount } = useProgress();

  const totalLessons = getTotalLessonCount();
  const completedCount = getCompletedCount();
  const progressPct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const allDeprecations = getAllDeprecations();
  const completedDeprecations = allDeprecations.filter(d => completedLessons.includes(d.lessonId));

  const circumference = 2 * Math.PI * 60;
  const offset = circumference - (progressPct / 100) * circumference;

  const perLevel = curriculum.map(level => {
    const total = level.modules.reduce((a, m) => a + m.lessons.length, 0);
    const done = level.modules.reduce((a, m) => a + m.lessons.filter(l => isCompleted(l.id)).length, 0);
    return { id: level.id, total, done, pct: total > 0 ? Math.round((done / total) * 100) : 0 };
  });

  return (
    <>
      <div className="page-header">
        <h1>{t.dashboard.title}</h1>
      </div>

      <div className="dashboard">
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>{t.dashboard.overall_progress}</h3>
            <div className="progress-ring-container">
              <div className="progress-ring">
                <svg width="140" height="140">
                  <circle className="progress-ring-bg" cx="70" cy="70" r="60" strokeWidth="10" />
                  <circle className="progress-ring-fill" cx="70" cy="70" r="60" strokeWidth="10"
                    stroke="url(#grad)" strokeDasharray={circumference} strokeDashoffset={offset} />
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6c63ff" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="progress-ring-text">{progressPct}%</div>
              </div>
              <div className="progress-stats">
                <div className="progress-stat">
                  <div className="progress-stat-value" style={{ color: 'var(--accent-green)' }}>{completedCount}</div>
                  <div className="progress-stat-label">{t.dashboard.completed}</div>
                </div>
                <div className="progress-stat">
                  <div className="progress-stat-value" style={{ color: 'var(--text-muted)' }}>{totalLessons - completedCount}</div>
                  <div className="progress-stat-label">{t.dashboard.not_started}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <h3>{t.lesson.progress}</h3>
            {perLevel.map(lv => (
              <div key={lv.id} style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.9rem' }}>
                  <span style={{ textTransform: 'capitalize' }}>{lv.id}</span>
                  <span style={{ color: 'var(--text-muted)' }}>{lv.done}/{lv.total}</span>
                </div>
                <div className="module-progress-bar">
                  <div className="module-progress-fill" style={{ width: `${lv.pct}%` }} />
                </div>
              </div>
            ))}
            {completedCount === 0 && (
              <div className="empty-state" style={{ padding: '1rem' }}>
                <p>{t.dashboard.no_progress}</p>
              </div>
            )}
          </div>
        </div>

        <div className="dashboard-card" style={{ marginBottom: '2rem' }}>
          <h3>⚠️ {t.dashboard.deprecation_alerts}</h3>
          {completedDeprecations.length > 0 ? (
            completedDeprecations.map((dep, i) => (
              <div className={`deprecation-alert ${dep.severity}`} key={i} style={{ marginBottom: '1rem' }}>
                <div className="deprecation-alert-title">
                  {dep.feature}
                  <span className={`deprecation-badge ${dep.severity}`} style={{ marginLeft: '8px' }}>
                    {dep.severity}
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', marginBottom: '8px' }}>
                  <strong>{t.dashboard.affected_lesson}:</strong>{' '}
                  {locale === 'th' ? dep.lessonTitleTh : dep.lessonTitleEn}
                </p>
                <p>{locale === 'th' ? dep.descriptionTh : dep.descriptionEn}</p>
                <div className="deprecation-code-compare">
                  <div className="deprecation-code-block old">
                    <h5>❌ {t.lesson.deprecated_code}</h5>
                    <pre><code>{dep.oldCode}</code></pre>
                  </div>
                  <div className="deprecation-code-block new">
                    <h5>✅ {t.lesson.replacement_code}</h5>
                    <pre><code>{dep.newCode}</code></pre>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state" style={{ padding: '2rem' }}>
              <div className="empty-state-icon">✅</div>
              <p>{allDeprecations.length > 0
                ? t.dashboard.no_alerts
                : t.dashboard.no_alerts
              }</p>
            </div>
          )}
        </div>

        <div className="dashboard-card">
          <h3>📋 {t.dashboard.recently_updated}</h3>
          <div className="lesson-list">
            {getAllLessons()
              .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
              .slice(0, 10)
              .map(lesson => {
                const levelId = curriculum.find(l => l.modules.some(m => m.lessons.some(les => les.id === lesson.id)))?.id || '';
                const moduleId = curriculum.flatMap(l => l.modules).find(m => m.lessons.some(les => les.id === lesson.id))?.id || '';
                return (
                  <Link href={`/learn/${levelId}/${moduleId}/${lesson.id}`} className="lesson-item" key={lesson.id}>
                    <div className={`lesson-check ${isCompleted(lesson.id) ? 'completed' : ''}`}>
                      {isCompleted(lesson.id) && <span style={{ color: 'white', fontSize: '12px' }}>✓</span>}
                    </div>
                    <span className="lesson-title">
                      {locale === 'th' ? lesson.titleTh : lesson.titleEn}
                    </span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{lesson.lastUpdated}</span>
                    <span className="sdk-version-badge">v{lesson.sdkVersion}</span>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
