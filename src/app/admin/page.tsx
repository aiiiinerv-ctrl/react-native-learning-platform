'use client';
import { useState, useEffect } from 'react';
import AdminGuard from '@/components/AdminGuard';
import { useI18n } from '@/i18n/I18nProvider';
import { getAllUsers, getUserProgress, getTotalLessonCount, generateRecommendation, sendRecommendationToUser, getFirestoreCollections, deleteDocument, UserProfile } from '@/lib/admin';

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
    const [collections, setCollections] = useState<{ name: string; docs: { id: string; data: any }[] }[]>([]);
    const [loading, setLoading] = useState(true);
    const [sendingTo, setSendingTo] = useState<string | null>(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const [u, c] = await Promise.all([getAllUsers(), getFirestoreCollections()]);
            setUsers(u);
            setCollections(c);
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

    const handleDeleteDoc = async (colName: string, docId: string) => {
        if (!confirm(`Delete ${colName}/${docId}?`)) return;
        try {
            await deleteDocument(colName, docId);
            await loadData();
        } catch (err) {
            console.error('Delete failed:', err);
        }
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

                        <h3 style={{ marginBottom: '1rem' }}>{locale === 'th' ? 'ผู้ใช้ล่าสุด' : 'Recent Users'}</h3>
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
                )}

                {tab === 'users' && (
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
                )}

                {tab === 'firebase' && (
                    <>
                        <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3>🔥 Firestore Collections</h3>
                            <button className="btn" onClick={loadData} style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
                                🔄 {locale === 'th' ? 'รีเฟรช' : 'Refresh'}
                            </button>
                        </div>
                        {collections.map(col => (
                            <div className="crud-collection" key={col.name}>
                                <div className="crud-collection-header">
                                    <span>📁 {col.name}</span>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                                        {col.docs.length} {locale === 'th' ? 'รายการ' : 'documents'}
                                    </span>
                                </div>
                                {col.docs.map(d => (
                                    <div className="crud-doc" key={d.id}>
                                        <div style={{ flex: 1, overflow: 'hidden' }}>
                                            <span style={{ color: 'var(--accent-blue)' }}>{d.id}</span>
                                            <span style={{ marginLeft: '12px', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                                                {JSON.stringify(d.data).substring(0, 80)}...
                                            </span>
                                        </div>
                                        <button className="crud-doc-delete" onClick={() => handleDeleteDoc(col.name, d.id)}>
                                            🗑 {locale === 'th' ? 'ลบ' : 'Delete'}
                                        </button>
                                    </div>
                                ))}
                                {col.docs.length === 0 && (
                                    <div style={{ padding: '12px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                                        {locale === 'th' ? 'ไม่มีข้อมูล' : 'No documents'}
                                    </div>
                                )}
                            </div>
                        ))}
                    </>
                )}
            </div>
        </>
    );
}
