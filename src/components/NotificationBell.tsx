'use client';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useI18n } from '@/i18n/I18nProvider';
import { AppNotification, getNotifications, markAllRead, markNotificationRead } from '@/lib/notifications';

export default function NotificationBell() {
    const { user } = useAuth();
    const { locale } = useI18n();
    const [notifications, setNotifications] = useState<AppNotification[]>([]);
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!user) return;
        const load = async () => {
            const notifs = await getNotifications(user.uid);
            setNotifications(notifs);
        };
        load();
        const interval = setInterval(load, 10000); // refresh every 10s
        return () => clearInterval(interval);
    }, [user]);

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    if (!user) return null;

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleOpen = () => setOpen(!open);

    const handleMarkAllRead = async () => {
        await markAllRead(user.uid);
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const handleClick = async (notif: AppNotification) => {
        if (!notif.read) {
            await markNotificationRead(user.uid, notif.id);
            setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n));
        }
    };

    const timeAgo = (dateStr: string) => {
        const diff = Date.now() - new Date(dateStr).getTime();
        const mins = Math.floor(diff / 60000);
        if (mins < 1) return locale === 'th' ? 'เมื่อสักครู่' : 'just now';
        if (mins < 60) return `${mins}m`;
        const hrs = Math.floor(mins / 60);
        if (hrs < 24) return `${hrs}h`;
        return `${Math.floor(hrs / 24)}d`;
    };

    return (
        <div className="notification-bell" ref={ref}>
            <button onClick={handleOpen} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}>
                🔔
                {unreadCount > 0 && <span className="notification-badge-count">{unreadCount}</span>}
            </button>

            {open && (
                <div className="notification-dropdown">
                    <div className="notification-dropdown-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>{locale === 'th' ? 'การแจ้งเตือน' : 'Notifications'}</span>
                        {unreadCount > 0 && (
                            <button onClick={handleMarkAllRead} style={{
                                background: 'none', border: 'none', color: 'var(--accent-blue)',
                                fontSize: '0.75rem', cursor: 'pointer'
                            }}>
                                {locale === 'th' ? 'อ่านทั้งหมด' : 'Mark all read'}
                            </button>
                        )}
                    </div>
                    {notifications.length === 0 ? (
                        <div className="notification-empty">
                            {locale === 'th' ? 'ยังไม่มีการแจ้งเตือน' : 'No notifications yet'}
                        </div>
                    ) : (
                        notifications.slice(0, 20).map(notif => (
                            <div key={notif.id}
                                className={`notification-item ${!notif.read ? 'unread' : ''}`}
                                onClick={() => handleClick(notif)}>
                                <div className="notification-item-title">{notif.title}</div>
                                <div className="notification-item-body">{notif.body}</div>
                                <div className="notification-item-time">{timeAgo(notif.createdAt)}</div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
