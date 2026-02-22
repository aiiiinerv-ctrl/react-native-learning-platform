'use client';
import { useState, useEffect } from 'react';
import AdminGuard from '@/components/AdminGuard';
import { useI18n } from '@/i18n/I18nProvider';
import { getAllUsers, getUserProgress, getTotalLessonCount, generateRecommendation, sendRecommendationToUser, UserProfile, getFirestoreUsageEstimate, SPARK_LIMITS, getSessionReads, getSessionWrites, FirestoreUsage } from '@/lib/admin';
import { curriculum } from '@/data/curriculum';
import NotificationSender from './components/NotificationSender';

type Tab = 'overview' | 'users' | 'firebase';

export default function AdminPage() {
    return (
        <AdminGuard>
            <AdminDashboard />
        </AdminGuard>
    );
}

function AdminDashboard() {
    const { locale } = useI18n();
    const [tab, setTab] = useState<Tab>('overview');
    const [users, setUsers] = useState<UserProfile[]>([]);

    const [loading, setLoading] = useState(true);
    const [sendingTo, setSendingTo] = useState<string | null>(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const u = await getAllUsers();
            setUsers(u);

        } catch (err) {
            console.error('Failed to load admin data:', err);
        }
        setLoading(false);
    };

    const totalLessons = getTotalLessonCount();
    const activeUsers = users.filter(u => {
        const lastActive = new Date(u.lastActive || 0);
        return Date.now() - lastActive.getTime() < 7 * 24 * 60 * 60 * 1000;
    });
    const avgProgress = users.length > 0
        ? Math.round(users.reduce((s, u) => s + getUserProgress(u.progress || {}), 0) / users.length)
        : 0;

    const handleSendRecommendation = async (user: UserProfile) => {
        setSendingTo(user.uid);
        try {
            const message = generateRecommendation(user.progress || {}, locale);
            await sendRecommendationToUser(user.uid, message);
            alert(locale === 'th' ? `ส่งคำแนะนำไปให้ ${user.displayName} แล้ว` : `Recommendation sent to ${user.displayName}`);
        } catch (err) {
            console.error('Failed to send recommendation:', err);
        }
        setSendingTo(null);
    };



    if (loading) return <div className="admin-layout"><div className="empty-state"><div className="empty-state-icon">⏳</div><p>Loading admin data...</p></div></div>;

    return (
        <>
            <div className="page-header">
                <h1>⚙ {locale === 'th' ? 'แดชบอร์ด Admin' : 'Admin Dashboard'}</h1>
                <p>{locale === 'th' ? 'จัดการผู้ใช้ ตรวจสอบความก้าวหน้า และดูข้อมูล Firebase' : 'Manage users, track progress, and view Firebase data'}</p>
            </div>

            <div className="admin-layout">
                <div className="admin-tabs">
                    {(['overview', 'users', 'firebase'] as Tab[]).map(t => (
                        <button key={t} className={`admin-tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
                            {t === 'overview' ? (locale === 'th' ? '📊 ภาพรวม' : '📊 Overview')
                                : t === 'users' ? (locale === 'th' ? '👥 ผู้ใช้' : '👥 Users')
                                    : '🔥 Firebase'}
                        </button>
                    ))}
                </div>

                {tab === 'overview' && (
                    <>
                        <div className="admin-stats">
                            <div className="admin-stat-card">
                                <div className="stat-value">{users.length}</div>
                                <div className="stat-label">{locale === 'th' ? 'ผู้ใช้ทั้งหมด' : 'Total Users'}</div>
                            </div>
                            <div className="admin-stat-card">
                                <div className="stat-value">{activeUsers.length}</div>
                                <div className="stat-label">{locale === 'th' ? 'ใช้งาน 7 วัน' : 'Active (7d)'}</div>
                            </div>
                            <div className="admin-stat-card">
                                <div className="stat-value">{avgProgress}%</div>
                                <div className="stat-label">{locale === 'th' ? 'ค่าเฉลี่ย Progress' : 'Avg Progress'}</div>
                            </div>
                            <div className="admin-stat-card">
                                <div className="stat-value">{totalLessons}</div>
                                <div className="stat-label">{locale === 'th' ? 'บทเรียนทั้งหมด' : 'Total Lessons'}</div>
                            </div>
                        </div>

                        {/* Notifications Module */}
                        <NotificationSender />

                        <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>{locale === 'th' ? 'ผู้ใช้ล่าสุด' : 'Recent Users'}</h3>
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>{locale === 'th' ? 'ผู้ใช้' : 'User'}</th>
                                    <th>{locale === 'th' ? 'ความก้าวหน้า' : 'Progress'}</th>
                                    <th>{locale === 'th' ? 'ใช้งานล่าสุด' : 'Last Active'}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.slice(0, 10).map(u => {
                                    const prog = getUserProgress(u.progress || {});
                                    return (
                                        <tr key={u.uid}>
                                            <td>
                                                <div className="admin-user-row">
                                                    {u.photoURL && <img src={u.photoURL} className="admin-user-avatar" alt="" referrerPolicy="no-referrer" />}
                                                    <div>
                                                        <div style={{ fontWeight: 600 }}>{u.displayName || 'Unknown'}</div>
                                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{u.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="admin-progress-bar">
                                                    <div className="admin-progress-fill" style={{ width: `${prog}%` }} />
                                                </div>
                                                {prog}%
                                            </td>
                                            <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                                {u.lastActive ? new Date(u.lastActive).toLocaleDateString() : '-'}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </>
                )
                }

                {
                    tab === 'users' && (
                        <>
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>{locale === 'th' ? 'ผู้ใช้' : 'User'}</th>
                                        <th>{locale === 'th' ? 'ความก้าวหน้า' : 'Progress'}</th>
                                        <th>{locale === 'th' ? 'บทที่เรียนจบ' : 'Completed'}</th>
                                        <th>{locale === 'th' ? 'คำแนะนำ' : 'Recommend'}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(u => {
                                        const prog = getUserProgress(u.progress || {});
                                        const completed = Object.values(u.progress || {}).filter(Boolean).length;
                                        return (
                                            <tr key={u.uid}>
                                                <td>
                                                    <div className="admin-user-row">
                                                        {u.photoURL && <img src={u.photoURL} className="admin-user-avatar" alt="" referrerPolicy="no-referrer" />}
                                                        <div>
                                                            <div style={{ fontWeight: 600 }}>{u.displayName || 'Unknown'}</div>
                                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{u.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="admin-progress-bar">
                                                        <div className="admin-progress-fill" style={{ width: `${prog}%` }} />
                                                    </div>
                                                    {prog}%
                                                </td>
                                                <td>{completed}/{totalLessons}</td>
                                                <td>
                                                    <button className="btn" style={{ padding: '4px 12px', fontSize: '0.8rem' }}
                                                        onClick={() => handleSendRecommendation(u)}
                                                        disabled={sendingTo === u.uid}>
                                                        {sendingTo === u.uid ? '⏳' : '📩'} {locale === 'th' ? 'ส่ง' : 'Send'}
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </>
                    )
                }

                {
                    tab === 'firebase' && (
                        <FirebaseUsageTab users={users} totalLessons={totalLessons} locale={locale} />
                    )
                }
            </div >
        </>
    );
}

/* ─── Pie Chart Component ─── */
function PieChart({ segments, size = 180 }: { segments: { label: string; value: number; color: string }[]; size?: number }) {
    const total = segments.reduce((s, seg) => s + seg.value, 0);
    if (total === 0) return <div style={{ width: size, height: size, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />;

    let cumulative = 0;
    const gradientParts = segments.map(seg => {
        const start = (cumulative / total) * 360;
        cumulative += seg.value;
        const end = (cumulative / total) * 360;
        return `${seg.color} ${start}deg ${end}deg`;
    });

    return (
        <div style={{
            width: size, height: size, borderRadius: '50%',
            background: `conic-gradient(${gradientParts.join(', ')})`,
            boxShadow: '0 0 30px rgba(108, 99, 255, 0.2)',
            position: 'relative',
        }}>
            <div style={{
                position: 'absolute', top: '15%', left: '15%', right: '15%', bottom: '15%',
                borderRadius: '50%', background: 'var(--bg-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column',
            }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)' }}>{total}</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>total</div>
            </div>
        </div>
    );
}

/* ─── Quota Card Component ─── */
function QuotaCard({ icon, label, used, limit, unit, limitUnit, detail, locale }: {
    icon: string; label: string; used: number; limit: number | null;
    unit?: string; limitUnit?: string; detail: string; locale: string;
}) {
    const [showDetail, setShowDetail] = useState(false);
    const pct = limit ? Math.min((used / limit) * 100, 100) : 0;
    const status = limit === null ? 'info' : pct < 50 ? 'safe' : pct < 80 ? 'warning' : 'danger';
    const barColor = status === 'safe' ? '#10b981' : status === 'warning' ? '#f59e0b' : status === 'danger' ? '#ef4444' : '#6366f1';

    return (
        <div className={`quota-card ${status}`} onClick={() => setShowDetail(!showDetail)} style={{ cursor: 'pointer' }}>
            <div className="quota-card-header">
                <span className="quota-card-icon">{icon}</span>
                <span className="quota-card-label">{label}</span>
            </div>
            <div className="quota-card-values">
                <span className="quota-card-used">{typeof used === 'number' && used < 1 && used > 0 ? used.toFixed(3) : used.toLocaleString()}</span>
                {limit !== null && (
                    <span className="quota-card-limit">/ {limitUnit || limit.toLocaleString()} {unit}</span>
                )}
                {limit === null && <span className="quota-card-limit">{unit || ''}</span>}
            </div>
            {limit !== null && (
                <div className="quota-bar">
                    <div className="quota-bar-fill" style={{ width: `${pct}%`, background: barColor }} />
                </div>
            )}
            <div className="quota-card-status">
                {status === 'safe' && <span style={{ color: '#10b981' }}>✅ {locale === 'th' ? 'ปกติ' : 'Normal'}</span>}
                {status === 'warning' && <span style={{ color: '#f59e0b' }}>⚠️ {locale === 'th' ? 'ใกล้ถึง quota' : 'Approaching limit'}</span>}
                {status === 'danger' && <span style={{ color: '#ef4444' }}>🔴 {locale === 'th' ? 'ใกล้เต็ม!' : 'Near limit!'}</span>}
                {status === 'info' && <span style={{ color: '#6366f1' }}>ℹ️</span>}
                {limit !== null && <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{pct.toFixed(1)}%</span>}
            </div>
            {showDetail && (
                <div className="quota-card-detail">{detail}</div>
            )}
        </div>
    );
}

/* ─── Firebase Usage Tab ─── */
function FirebaseUsageTab({ users, totalLessons, locale }: { users: UserProfile[]; totalLessons: number; locale: string }) {
    const [expanded, setExpanded] = useState<string | null>(null);
    const [usage, setUsage] = useState<FirestoreUsage | null>(null);
    const [loadingUsage, setLoadingUsage] = useState(true);

    useEffect(() => {
        setLoadingUsage(true);
        getFirestoreUsageEstimate().then(u => { setUsage(u); setLoadingUsage(false); }).catch(() => setLoadingUsage(false));
    }, []);

    // 1. Progress distribution
    const notStarted = users.filter(u => getUserProgress(u.progress || {}) === 0);
    const inProgress = users.filter(u => { const p = getUserProgress(u.progress || {}); return p > 0 && p < 100; });
    const completed = users.filter(u => getUserProgress(u.progress || {}) === 100);

    const progressSegments = [
        { label: locale === 'th' ? 'ยังไม่เริ่ม' : 'Not Started', value: notStarted.length, color: '#6366f1', users: notStarted },
        { label: locale === 'th' ? 'กำลังเรียน' : 'In Progress', value: inProgress.length, color: '#f59e0b', users: inProgress },
        { label: locale === 'th' ? 'เรียนจบ' : 'Completed', value: completed.length, color: '#10b981', users: completed },
    ];

    // 2. Level completion
    const levelStats = curriculum.map(level => {
        const lessonIds = level.modules.flatMap(m => m.lessons.map(l => l.id));
        const totalCompletions = users.reduce((sum, u) => {
            return sum + lessonIds.filter(id => (u.progress || {})[id]).length;
        }, 0);
        return {
            label: level.id.charAt(0).toUpperCase() + level.id.slice(1),
            value: totalCompletions,
            totalLessons: lessonIds.length,
            color: level.id === 'beginner' ? '#10b981' : level.id === 'intermediate' ? '#f59e0b' : '#ef4444',
        };
    });

    // 3. Activity
    const now = Date.now();
    const active24h = users.filter(u => now - new Date(u.lastActive || 0).getTime() < 24 * 60 * 60 * 1000);
    const active7d = users.filter(u => { const d = now - new Date(u.lastActive || 0).getTime(); return d >= 24 * 60 * 60 * 1000 && d < 7 * 24 * 60 * 60 * 1000; });
    const inactive = users.filter(u => now - new Date(u.lastActive || 0).getTime() >= 7 * 24 * 60 * 60 * 1000);

    const activitySegments = [
        { label: locale === 'th' ? 'ใช้งาน 24 ชม.' : 'Active 24h', value: active24h.length, color: '#10b981', users: active24h },
        { label: locale === 'th' ? 'ใช้งาน 7 วัน' : 'Active 7d', value: active7d.length, color: '#3b82f6', users: active7d },
        { label: locale === 'th' ? 'ไม่ใช้งาน' : 'Inactive', value: inactive.length, color: '#6b7280', users: inactive },
    ];

    const toggle = (key: string) => setExpanded(expanded === key ? null : key);

    const renderUserList = (userList: UserProfile[]) => (
        <div className="pie-detail-panel">
            {userList.length === 0 ? (
                <div style={{ padding: '12px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    {locale === 'th' ? 'ไม่มีผู้ใช้' : 'No users'}
                </div>
            ) : (
                userList.map(u => (
                    <div key={u.uid} className="pie-detail-user">
                        {u.photoURL && <img src={u.photoURL} className="admin-user-avatar" alt="" referrerPolicy="no-referrer" />}
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{u.displayName || 'Unknown'}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{u.email}</div>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--accent-blue)' }}>
                            {getUserProgress(u.progress || {})}%
                        </div>
                    </div>
                ))
            )}
        </div>
    );

    return (
        <>
            {/* Firestore Usage Quota Section */}
            <h3 style={{ marginBottom: '1.5rem' }}>
                ☁️ {locale === 'th' ? 'การใช้งาน Cloud Firestore' : 'Cloud Firestore Usage'}
            </h3>

            {loadingUsage ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>⏳ {locale === 'th' ? 'กำลังโหลดข้อมูล...' : 'Loading usage data...'}</div>
            ) : usage && (
                <div className="quota-grid">
                    <QuotaCard
                        icon="📄" label={locale === 'th' ? 'Documents ทั้งหมด' : 'Total Documents'}
                        used={usage.documents} limit={null}
                        detail={locale === 'th' ? `${usage.collections.map(c => `${c.name}: ${c.docCount} docs`).join(', ')}` : `${usage.collections.map(c => `${c.name}: ${c.docCount} docs`).join(', ')}`}
                        locale={locale}
                    />
                    <QuotaCard
                        icon="💾" label={locale === 'th' ? 'พื้นที่จัดเก็บ' : 'Storage Used'}
                        used={usage.estimatedStorageMB} limit={SPARK_LIMITS.storedDataGB * 1024}
                        unit="MB" limitUnit={`${SPARK_LIMITS.storedDataGB} GB`}
                        detail={locale === 'th' ? `ประมาณการจากขนาด documents` : `Estimated from document sizes`}
                        locale={locale}
                    />
                    <QuotaCard
                        icon="📖" label={locale === 'th' ? 'Reads (เซสชันนี้)' : 'Reads (this session)'}
                        used={getSessionReads()} limit={SPARK_LIMITS.reads}
                        unit="reads" limitUnit={`${(SPARK_LIMITS.reads / 1000).toFixed(0)}K/day`}
                        detail={locale === 'th' ? `Spark Plan: ${SPARK_LIMITS.reads.toLocaleString()} reads/วัน` : `Spark Plan: ${SPARK_LIMITS.reads.toLocaleString()} reads/day`}
                        locale={locale}
                    />
                    <QuotaCard
                        icon="✏️" label={locale === 'th' ? 'Writes (เซสชันนี้)' : 'Writes (this session)'}
                        used={getSessionWrites()} limit={SPARK_LIMITS.writes}
                        unit="writes" limitUnit={`${(SPARK_LIMITS.writes / 1000).toFixed(0)}K/day`}
                        detail={locale === 'th' ? `Spark Plan: ${SPARK_LIMITS.writes.toLocaleString()} writes/วัน` : `Spark Plan: ${SPARK_LIMITS.writes.toLocaleString()} writes/day`}
                        locale={locale}
                    />
                    <QuotaCard
                        icon="🌐" label={locale === 'th' ? 'Network Egress' : 'Network Egress'}
                        used={0} limit={SPARK_LIMITS.networkEgressGB * 1024}
                        unit="MB" limitUnit={`${SPARK_LIMITS.networkEgressGB} GB/mo`}
                        detail={locale === 'th' ? 'ไม่สามารถวัดจาก client ได้ (ดูที่ Firebase Console)' : 'Cannot measure from client (check Firebase Console)'}
                        locale={locale}
                    />
                    <QuotaCard
                        icon="🗑" label={locale === 'th' ? 'Deletes' : 'Deletes (daily limit)'}
                        used={0} limit={SPARK_LIMITS.deletes}
                        unit="deletes" limitUnit={`${(SPARK_LIMITS.deletes / 1000).toFixed(0)}K/day`}
                        detail={locale === 'th' ? `Spark Plan: ${SPARK_LIMITS.deletes.toLocaleString()} deletes/วัน` : `Spark Plan: ${SPARK_LIMITS.deletes.toLocaleString()} deletes/day`}
                        locale={locale}
                    />
                </div>
            )}

            {/* Collection Detail */}
            {usage && usage.collections.length > 0 && (
                <div style={{ marginTop: '1.5rem' }}>
                    <h4 style={{ marginBottom: '1rem' }}>📁 {locale === 'th' ? 'รายละเอียด Collections' : 'Collection Details'}</h4>
                    <div className="quota-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
                        {usage.collections.map(col => (
                            <div key={col.name} className="pie-chart-card" style={{ padding: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                    <span style={{ fontWeight: 600 }}>📁 {col.name}</span>
                                    <span style={{ color: 'var(--accent-blue)', fontSize: '0.85rem' }}>{col.docCount} docs</span>
                                </div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                    ~{col.estimatedSizeKB} KB
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div style={{ marginTop: '2rem', marginBottom: '1rem', borderTop: '1px solid var(--glass-border)', paddingTop: '2rem' }}>
                <h3 style={{ marginBottom: '1.5rem' }}>📊 {locale === 'th' ? 'สถิติการใช้งาน' : 'Usage Analytics'}</h3>
            </div>

            <div className="pie-charts-grid">
                {/* Chart 1: Progress Distribution */}
                <div className="pie-chart-card">
                    <h4>{locale === 'th' ? '📊 การกระจาย Progress' : '📊 Progress Distribution'}</h4>
                    <div className="pie-chart-center">
                        <PieChart segments={progressSegments} />
                    </div>
                    <div className="pie-legend">
                        {progressSegments.map(seg => (
                            <div key={seg.label}
                                className={`pie-legend-item ${expanded === `progress-${seg.label}` ? 'active' : ''}`}
                                onClick={() => toggle(`progress-${seg.label}`)}
                                style={{ cursor: 'pointer' }}>
                                <span className="pie-legend-dot" style={{ background: seg.color }} />
                                <span className="pie-legend-label">{seg.label}</span>
                                <span className="pie-legend-value">{seg.value}</span>
                            </div>
                        ))}
                    </div>
                    {progressSegments.map(seg => (
                        expanded === `progress-${seg.label}` && (
                            <div key={seg.label}>{renderUserList(seg.users)}</div>
                        )
                    ))}
                </div>

                {/* Chart 2: Level Completion */}
                <div className="pie-chart-card">
                    <h4>{locale === 'th' ? '🎯 Completion ตามระดับ' : '🎯 Level Completion'}</h4>
                    <div className="pie-chart-center">
                        <PieChart segments={levelStats} />
                    </div>
                    <div className="pie-legend">
                        {levelStats.map(seg => (
                            <div key={seg.label}
                                className={`pie-legend-item ${expanded === `level-${seg.label}` ? 'active' : ''}`}
                                onClick={() => toggle(`level-${seg.label}`)}
                                style={{ cursor: 'pointer' }}>
                                <span className="pie-legend-dot" style={{ background: seg.color }} />
                                <span className="pie-legend-label">{seg.label}</span>
                                <span className="pie-legend-value">{seg.value}/{seg.totalLessons * users.length}</span>
                            </div>
                        ))}
                    </div>
                    {levelStats.map(seg => (
                        expanded === `level-${seg.label}` && (
                            <div key={seg.label} className="pie-detail-panel">
                                <div style={{ padding: '12px', fontSize: '0.85rem' }}>
                                    <div><strong>{seg.label}</strong> — {seg.value} {locale === 'th' ? 'บทเรียนที่ถูกเรียนจบ' : 'lesson completions'}</div>
                                    <div style={{ color: 'var(--text-muted)', marginTop: '4px' }}>
                                        {locale === 'th' ? `จากทั้งหมด ${seg.totalLessons} บทเรียน × ${users.length} ผู้ใช้ = ${seg.totalLessons * users.length} ครั้ง`
                                            : `Out of ${seg.totalLessons} lessons × ${users.length} users = ${seg.totalLessons * users.length} possible`}
                                    </div>
                                    <div style={{ marginTop: '8px', color: 'var(--accent-blue)' }}>
                                        {locale === 'th' ? 'อัตรา' : 'Rate'}: {users.length > 0 ? Math.round((seg.value / (seg.totalLessons * users.length)) * 100) : 0}%
                                    </div>
                                </div>
                            </div>
                        )
                    ))}
                </div>

                {/* Chart 3: User Activity */}
                <div className="pie-chart-card">
                    <h4>{locale === 'th' ? '⚡ กิจกรรมผู้ใช้' : '⚡ User Activity'}</h4>
                    <div className="pie-chart-center">
                        <PieChart segments={activitySegments} />
                    </div>
                    <div className="pie-legend">
                        {activitySegments.map(seg => (
                            <div key={seg.label}
                                className={`pie-legend-item ${expanded === `activity-${seg.label}` ? 'active' : ''}`}
                                onClick={() => toggle(`activity-${seg.label}`)}
                                style={{ cursor: 'pointer' }}>
                                <span className="pie-legend-dot" style={{ background: seg.color }} />
                                <span className="pie-legend-label">{seg.label}</span>
                                <span className="pie-legend-value">{seg.value}</span>
                            </div>
                        ))}
                    </div>
                    {activitySegments.map(seg => (
                        expanded === `activity-${seg.label}` && (
                            <div key={seg.label}>{renderUserList(seg.users)}</div>
                        )
                    ))}
                </div>
            </div>
        </>
    );
}
