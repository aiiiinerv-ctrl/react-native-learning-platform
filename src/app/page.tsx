'use client';
import Link from 'next/link';
import { useI18n } from '@/i18n/I18nProvider';
import { useProgress } from '@/context/ProgressContext';
import { getTotalLessonCount, curriculum } from '@/data/curriculum';
import { sdkReleases, latestSdkVersion } from '@/data/sdk-versions';

export default function HomePage() {
  const { t, locale } = useI18n();
  const { getCompletedCount } = useProgress();
  const totalLessons = getTotalLessonCount();

  const levelMeta = [
    { id: 'beginner', icon: '🌱', cls: 'beginner', t: t.levels.beginner, count: curriculum[0].modules.reduce((a, m) => a + m.lessons.length, 0), mods: curriculum[0].modules.length },
    { id: 'intermediate', icon: '⚡', cls: 'intermediate', t: t.levels.intermediate, count: curriculum[1].modules.reduce((a, m) => a + m.lessons.length, 0), mods: curriculum[1].modules.length },
    { id: 'expert', icon: '🚀', cls: 'expert', t: t.levels.expert, count: curriculum[2].modules.reduce((a, m) => a + m.lessons.length, 0), mods: curriculum[2].modules.length },
  ];

  return (
    <>
      <section className="hero">
        <h1>{t.home.hero_title}</h1>
        <p>{t.home.hero_subtitle}</p>
        <Link href="/learn/beginner" className="hero-cta">
          {t.home.hero_cta} →
        </Link>
        <div className="stats-bar">
          <div className="stat-item">
            <div className="stat-value">v{latestSdkVersion}</div>
            <div className="stat-label">{t.home.latest_sdk}</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{totalLessons}</div>
            <div className="stat-label">{t.home.total_lessons}</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">✓</div>
            <div className="stat-label">{t.home.auto_updated}</div>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">{t.home.levels_title}</h2>
      </section>

      <div className="level-cards">
        {levelMeta.map(lm => (
          <Link href={`/learn/${lm.id}`} key={lm.id} className={`level-card ${lm.cls}`}>
            <div className="level-card-icon">{lm.icon}</div>
            <h3>{lm.t.title}</h3>
            <p>{lm.t.description}</p>
            <div className="level-card-meta">
              <span>{lm.mods} {lm.t.modules_count}</span>
              <span>•</span>
              <span>{lm.count} {lm.t.lessons_count}</span>
            </div>
          </Link>
        ))}
      </div>

      <section className="section">
        <h2 className="section-title">{t.home.features_title}</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h4>{t.home.feature_auto_update}</h4>
            <p>{t.home.feature_auto_update_desc}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h4>{t.home.feature_progress}</h4>
            <p>{t.home.feature_progress_desc}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚠️</div>
            <h4>{t.home.feature_deprecation}</h4>
            <p>{t.home.feature_deprecation_desc}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌐</div>
            <h4>{t.home.feature_bilingual}</h4>
            <p>{t.home.feature_bilingual_desc}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">{t.home.updates_title}</h2>
        <div className="sdk-updates">
          {sdkReleases.slice(0, 3).map(r => (
            <div className="sdk-release" key={r.version}>
              <div className="sdk-release-header">
                <span className="sdk-version-badge">v{r.version}</span>
                <span className="sdk-date">{r.releaseDate}</span>
              </div>
              <ul className="sdk-highlights">
                {r.highlights.map((h, i) => <li key={i}>{h}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
