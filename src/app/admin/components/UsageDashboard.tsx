'use client';
import { useState, useEffect } from 'react';
import { useI18n } from '@/i18n/I18nProvider';
import { getFirestoreUsageEstimate, FirestoreUsage, SPARK_LIMITS } from '@/lib/admin';

function getPTResetCountdown(): string {
    const now = new Date();
    // PST/PDT offset from UTC is generally -8/-7. We can use Intl.DateTimeFormat to force calculation.
    // Easier way: Create a string in PT, then parse.
    const ptTimeString = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Los_Angeles',
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        hour12: false
    }).format(now);

    const ptDate = new Date(ptTimeString);
    const ptTomorrow = new Date(ptDate);
    ptTomorrow.setHours(24, 0, 0, 0); // Midnight PT

    const diffMs = ptTomorrow.getTime() - ptDate.getTime();

    const h = Math.floor(diffMs / 3600000);
    const m = Math.floor((diffMs % 3600000) / 60000);
    const s = Math.floor((diffMs % 60000) / 1000);

    return `${h.toString().padStart(2, '0')}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`;
}

export default function UsageDashboard() {
    const { locale } = useI18n();
    const [usage, setUsage] = useState<FirestoreUsage | null>(null);
    const [timeLeft, setTimeLeft] = useState(getPTResetCountdown());

    useEffect(() => {
        getFirestoreUsageEstimate().then(setUsage);

        const timer = setInterval(() => {
            setTimeLeft(getPTResetCountdown());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const ProgressCircle = ({ percent, label, value, max, unit }: any) => {
        const radius = 35;
        const circumference = 2 * Math.PI * radius;
        const strokeDashoffset = circumference - (percent / 100) * circumference;
        const isDanger = percent > 80;
        const isWarning = percent > 50 && percent <= 80;
        const color = isDanger ? '#ef4444' : isWarning ? '#f59e0b' : '#3b82f6';

        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ position: 'relative', width: '80px', height: '80px' }}>
                    <svg width="80" height="80" style={{ transform: 'rotate(-90deg)' }}>
                        <circle cx="40" cy="40" r={radius} stroke="var(--bg-secondary)" strokeWidth="8" fill="none" />
                        <circle cx="40" cy="40" r={radius} stroke={color} strokeWidth="8" fill="none"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            style={{ transition: 'stroke-dashoffset 1s ease-in-out' }} />
                    </svg>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 600 }}>
                        {Math.round(percent)}%
                    </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{label}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{value.toLocaleString()} / {max.toLocaleString()} {unit}</div>
                </div>
            </div>
        );
    };

    if (!usage) return null;

    return (
        <div style={{
            background: 'var(--bg-secondary)',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '2rem',
            border: '1px solid var(--border-color)'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    ⚡ {locale === 'th' ? 'โควต้าใช้งานรายวัน (Free Tier)' : 'Free Tier Usage (Daily)'}
                </h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', background: 'var(--bg-primary)', padding: '0.4rem 0.8rem', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    ⏱ Reset in: <span style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--text-primary)' }}>{timeLeft}</span>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                <ProgressCircle
                    percent={usage.readsPercent}
                    label={locale === 'th' ? 'อ่านข้อมูล (Reads)' : 'Reads'}
                    value={usage.reads}
                    max={SPARK_LIMITS.reads}
                    unit=""
                />
                <ProgressCircle
                    percent={usage.writesPercent}
                    label={locale === 'th' ? 'เขียนข้อมูล (Writes)' : 'Writes'}
                    value={usage.writes}
                    max={SPARK_LIMITS.writes}
                    unit=""
                />
                <ProgressCircle
                    percent={usage.storagePercent}
                    label={locale === 'th' ? 'พื้นที่ (Storage)' : 'Storage'}
                    value={usage.estimatedStorageMB}
                    max={SPARK_LIMITS.storedDataGB * 1024}
                    unit="MB"
                />
            </div>

            <div style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                {locale === 'th'
                    ? '* โควต้าจะรีเซ็ตตอนเที่ยงคืนเวลาแปซิฟิก (PT) โปรดระมัดระวังหน้า Admin นี้ เพราะการโหลดหน้านี้ 1 ครั้ง จะใช้ Reads อย่างน้อยเท่ากับจำนวน User ทั้งหมด'
                    : '* Quota resets at Midnight Pacific Time (PT). Note: Loading this Admin page consumes at least 1 Read per registered User.'}
            </div>
        </div>
    );
}
