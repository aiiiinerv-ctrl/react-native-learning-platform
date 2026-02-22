import { useState } from 'react';
import { queuePushNotification } from '@/lib/admin';
import { useI18n } from '@/i18n/I18nProvider';

export default function NotificationSender() {
    const { locale } = useI18n();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [link, setLink] = useState('');
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !body) return;

        setStatus('sending');
        try {
            await queuePushNotification(title, body, link);
            setStatus('success');
            setTitle('');
            setBody('');
            setLink('');

            // Auto reset success message
            setTimeout(() => setStatus('idle'), 3000);
        } catch (err) {
            console.error('Failed to queue Push Notification', err);
            setStatus('error');
        }
    };

    return (
        <div className="admin-card" style={{ marginTop: '20px' }}>
            <h2>📢 {locale === 'th' ? 'ส่ง Push Notification' : 'Send Push Notification'}</h2>
            <p style={{ color: 'var(--text-secondary)' }}>
                {locale === 'th'
                    ? 'แจ้งเตือนนี้จะเข้ามือถือ/เบราว์เซอร์ของทุกคนที่เปิดรับการแจ้งเตือนไว้'
                    : 'This notification will be sent to mobile/browsers of all subscribed users.'}
            </p>

            <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label htmlFor="title"><strong>{locale === 'th' ? 'หัวข้อ (Title)' : 'Title'}</strong> <span style={{ color: 'red' }}>*</span></label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder={locale === 'th' ? "เช่น: อัปเดตบทเรียนใหม่!" : "e.g. New Lesson Added!"}
                        style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-primary)' }}
                        maxLength={100}
                        required
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label htmlFor="body"><strong>{locale === 'th' ? 'ข้อความ (Body)' : 'Message Body'}</strong> <span style={{ color: 'red' }}>*</span></label>
                    <textarea
                        id="body"
                        value={body}
                        onChange={e => setBody(e.target.value)}
                        placeholder={locale === 'th' ? "เนื้อหาการแจ้งเตือน..." : "Notification content..."}
                        style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-primary)', minHeight: '80px', resize: 'vertical' }}
                        maxLength={500}
                        required
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label htmlFor="link"><strong>{locale === 'th' ? 'ลิ้งก์ (URL - ไม่บังคับ)' : 'Link (Optional)'}</strong></label>
                    <input
                        id="link"
                        type="url"
                        value={link}
                        onChange={e => setLink(e.target.value)}
                        placeholder="https:// หรือ /learn/..."
                        style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-primary)' }}
                    />
                </div>

                <button
                    type="submit"
                    disabled={status === 'sending' || !title || !body}
                    style={{
                        marginTop: '10px',
                        padding: '12px 24px',
                        borderRadius: '8px',
                        background: status === 'success' ? '#10b981' : 'var(--gradient-primary)',
                        color: 'white',
                        border: 'none',
                        cursor: status === 'sending' || (!title || !body) ? 'not-allowed' : 'pointer',
                        fontWeight: 'bold',
                        opacity: (!title || !body) ? 0.5 : 1
                    }}
                >
                    {status === 'sending'
                        ? 'กำลังส่ง...'
                        : status === 'success'
                            ? '✅ ส่งเข้าคิวสำเร็จ!'
                            : status === 'error'
                                ? '❌ เกิดข้อผิดพลาด ลองใหม่'
                                : (locale === 'th' ? '🚀 ยิง Notification ให้ทุกคน' : '🚀 Send Push to All Users')
                    }
                </button>
            </form>
        </div>
    );
}
