'use client';
import { use } from 'react';
import Link from 'next/link';
import { useI18n } from '@/i18n/I18nProvider';
import { useProgress } from '@/context/ProgressContext';
import { getLevelData, getModuleData, getLessonData } from '@/data/curriculum';

export default function LessonPage({ params }: { params: Promise<{ level: string; moduleId: string; lessonId: string }> }) {
  const { level, moduleId, lessonId } = use(params);
  const { locale, t } = useI18n();
  const { isCompleted, toggleLesson } = useProgress();
  const mod = getModuleData(level, moduleId);
  const lesson = getLessonData(level, moduleId, lessonId);

  if (!lesson || !mod) return <div className="empty-state"><div className="empty-state-icon">🔍</div><p>Lesson not found</p></div>;

  const lessonIndex = mod.lessons.findIndex(l => l.id === lessonId);
  const prevLesson = lessonIndex > 0 ? mod.lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < mod.lessons.length - 1 ? mod.lessons[lessonIndex + 1] : null;
  const content = locale === 'th' ? lesson.contentTh : lesson.contentEn;
  const completed = isCompleted(lessonId);

  const renderContent = (text: string) => {
    const lines = text.split('\n');
    const result: React.ReactElement[] = [];
    let inCodeBlock = false;
    let codeLines: string[] = [];
    let codeKey = 0;

    lines.forEach((line, i) => {
      if (line.startsWith('```') && !inCodeBlock) {
        inCodeBlock = true;
        codeLines = [];
        return;
      }
      if (line.startsWith('```') && inCodeBlock) {
        inCodeBlock = false;
        result.push(<pre key={`code-${codeKey++}`}><code>{codeLines.join('\n')}</code></pre>);
        return;
      }
      if (inCodeBlock) { codeLines.push(line); return; }

      if (line.startsWith('# ')) {
        result.push(<h1 key={i}>{line.slice(2)}</h1>);
      } else if (line.startsWith('## ')) {
        result.push(<h2 key={i}>{line.slice(3)}</h2>);
      } else if (line.startsWith('### ')) {
        result.push(<h3 key={i}>{line.slice(4)}</h3>);
      } else if (line.startsWith('- ')) {
        result.push(<li key={i} dangerouslySetInnerHTML={{ __html: formatInline(line.slice(2)) }} />);
      } else if (line.match(/^\d+\. /)) {
        result.push(<li key={i} dangerouslySetInnerHTML={{ __html: formatInline(line.replace(/^\d+\. /, '')) }} />);
      } else if (line.startsWith('| ')) {
        // Simple table rendering - skip separator rows
        if (!line.includes('---')) {
          const cells = line.split('|').filter(c => c.trim()).map(c => c.trim());
          result.push(
            <tr key={i}>{cells.map((c, j) => <td key={j} dangerouslySetInnerHTML={{ __html: formatInline(c) }} />)}</tr>
          );
        }
      } else if (line.trim()) {
        result.push(<p key={i} dangerouslySetInnerHTML={{ __html: formatInline(line) }} />);
      }
    });
    return result;
  };

  const formatInline = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`(.*?)`/g, '<code>$1</code>');
  };

  return (
    <>
      <div className="page-header">
        <div className="breadcrumb">
          <Link href="/">{t.nav.home}</Link>
          <span>/</span>
          <Link href={`/learn/${level}`}>{level}</Link>
          <span>/</span>
          <span>{locale === 'th' ? lesson.titleTh : lesson.titleEn}</span>
        </div>
        <h1>{locale === 'th' ? lesson.titleTh : lesson.titleEn}</h1>
        <p style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
          <span className="sdk-version-badge">SDK {lesson.sdkVersion}</span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            {t.lesson.sdk_version}: {lesson.lastUpdated}
          </span>
        </p>
      </div>

      <div className="lesson-page">
        {lesson.deprecations && lesson.deprecations.length > 0 && (
          <div>
            {lesson.deprecations.map((dep, i) => (
              <div className={`deprecation-alert ${dep.severity}`} key={i}>
                <div className="deprecation-alert-title">
                  ⚠️ {t.lesson.deprecation_warning}: {dep.feature}
                </div>
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
            ))}
          </div>
        )}

        <div className="lesson-content">
          {renderContent(content)}
        </div>

        {lesson.codeExamples.length > 0 && (
          <div className="code-examples">
            {lesson.codeExamples.map((ex, i) => (
              <div className="code-example" key={i}>
                <div className="code-example-header">
                  💻 {ex.title} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({ex.language})</span>
                </div>
                <pre><code>{ex.code}</code></pre>
              </div>
            ))}
          </div>
        )}

        <div className="lesson-actions" style={{ marginTop: '2rem' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            {prevLesson && (
              <Link href={`/learn/${level}/${moduleId}/${prevLesson.id}`} className="btn">
                ← {t.lesson.prev_lesson}
              </Link>
            )}
            <Link href={`/learn/${level}`} className="btn">
              {t.lesson.back_to_module}
            </Link>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button className={`btn ${completed ? 'btn-success' : 'btn-primary'}`} onClick={() => toggleLesson(lessonId)}>
              {completed ? `✓ ${t.lesson.completed}` : t.lesson.mark_complete}
            </button>
            {nextLesson && (
              <Link href={`/learn/${level}/${moduleId}/${nextLesson.id}`} className="btn btn-primary">
                {t.lesson.next_lesson} →
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
