'use client';
import { use, useState } from 'react';
import Link from 'next/link';
import { useI18n } from '@/i18n/I18nProvider';
import { getWorkshop } from '@/data/workshops';
import CodeEditor from '@/components/CodeEditor';

export default function WorkshopPageClient({ params }: { params: Promise<{ workshopId: string }> }) {
    const { workshopId } = use(params);
    const { locale } = useI18n();
    const workshop = getWorkshop(workshopId);

    const [code, setCode] = useState(workshop?.starterCode || '');
    const [showSolution, setShowSolution] = useState(false);
    const [testResults, setTestResults] = useState<{ name: string; passed: boolean }[] | null>(null);

    if (!workshop) return <div className="empty-state"><div className="empty-state-icon">🔍</div><p>Workshop not found</p></div>;

    const title = locale === 'th' ? workshop.titleTh : workshop.titleEn;
    const instructions = locale === 'th' ? workshop.instructionsTh : workshop.instructionsEn;

    const runTests = () => {
        const results = workshop.tests.map(test => ({
            name: test.name,
            passed: new RegExp(test.pattern).test(code),
        }));
        setTestResults(results);
    };

    const resetCode = () => {
        setCode(workshop.starterCode);
        setTestResults(null);
        setShowSolution(false);
    };

    const passedCount = testResults?.filter(r => r.passed).length || 0;
    const totalTests = workshop.tests.length;
    const allPassed = passedCount === totalTests;

    const renderInstructions = (text: string) => {
        return text.split('\n').map((line, i) => {
            if (line.startsWith('# ')) return <h2 key={i} className="workshop-inst-title">{line.slice(2)}</h2>;
            if (line.startsWith('## ')) return <h3 key={i} className="workshop-inst-subtitle">{line.slice(3)}</h3>;
            if (line.startsWith('- ')) return <li key={i}>{line.slice(2)}</li>;
            if (line.match(/^\d+\. /)) return <li key={i}>{line.replace(/^\d+\. /, '')}</li>;
            if (line.trim()) return <p key={i}>{line}</p>;
            return null;
        });
    };

    return (
        <>
            <div className="page-header">
                <div className="breadcrumb">
                    <Link href="/">Home</Link>
                    <span>/</span>
                    <span>Workshop</span>
                    <span>/</span>
                    <span>{title}</span>
                </div>
                <h1>🛠 {title}</h1>
                <p style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
                    <span className="workshop-difficulty">
                        {'⭐'.repeat(workshop.difficulty)}
                    </span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        ~{workshop.estimatedMinutes} min
                    </span>
                </p>
            </div>

            <div className="workshop-layout">
                <div className="workshop-instructions">
                    <div className="lesson-content">
                        {renderInstructions(instructions)}
                    </div>

                    {testResults && (
                        <div className={`workshop-results ${allPassed ? 'success' : ''}`}>
                            <h4>{allPassed ? '🎉 All tests passed!' : `${passedCount}/${totalTests} tests passed`}</h4>
                            <div className="workshop-test-list">
                                {testResults.map((r, i) => (
                                    <div key={i} className={`workshop-test ${r.passed ? 'passed' : 'failed'}`}>
                                        <span>{r.passed ? '✅' : '❌'}</span>
                                        <span>{r.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="workshop-editor">
                    <div className="workshop-editor-header">
                        <span>{locale === 'th' ? 'โค้ดของคุณ' : 'Your Code'}</span>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button className="btn" onClick={resetCode} style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                                🔄 Reset
                            </button>
                            <button className="btn btn-primary" onClick={runTests} style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                                ▶ {locale === 'th' ? 'ตรวจสอบ' : 'Check'}
                            </button>
                        </div>
                    </div>
                    <CodeEditor value={code} onChange={setCode} language={workshop.language} />

                    <div className="workshop-solution-toggle">
                        <button className="btn" onClick={() => setShowSolution(!showSolution)}
                            style={{ width: '100%', justifyContent: 'center' }}>
                            {showSolution
                                ? (locale === 'th' ? '🙈 ซ่อนเฉลย' : '🙈 Hide Solution')
                                : (locale === 'th' ? '👁 ดูเฉลย' : '👁 Show Solution')
                            }
                        </button>
                    </div>

                    {showSolution && (
                        <div style={{ marginTop: '1rem' }}>
                            <h4 style={{ marginBottom: '8px', color: 'var(--accent-green)' }}>
                                ✅ {locale === 'th' ? 'เฉลย' : 'Solution'}
                            </h4>
                            <CodeEditor value={workshop.solutionCode} onChange={() => { }} language={workshop.language} readOnly />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
