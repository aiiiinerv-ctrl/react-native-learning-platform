'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/i18n/I18nProvider';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import AuthButton from './AuthButton';
import NotificationBell from './NotificationBell';
import { messaging } from '@/lib/firebase';
import { onMessage } from 'firebase/messaging';

export default function Navbar() {
  const pathname = usePathname();
  const { t, toggleLocale } = useI18n();
  const { isAdmin } = useAuth();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (!messaging) return;
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log('Foreground push notification received:', payload);
      const title = payload.notification?.title || 'New Push Notification';
      const body = payload.notification?.body || '';
      // For a quick foreground alert, we just use window.alert
      // In a more complex app, we would use a toast library like react-hot-toast
      alert(`🔔 ${title}\n${body}`);
    });
    return () => unsubscribe();
  }, []);

  const links = [
    { href: '/', label: t.nav.home },
    { href: '/learn/beginner', label: t.nav.beginner },
    { href: '/learn/intermediate', label: t.nav.intermediate },
    { href: '/learn/expert', label: t.nav.expert },
    { href: '/dashboard', label: t.nav.dashboard },
  ];

  return (
    <nav className="navbar">
      <Link href="/" className="navbar-brand">
        <span className="navbar-brand-icon">⚛</span>
        RN Learn
      </Link>
      <ul className="navbar-links">
        {links.map(link => (
          <li key={link.href}>
            <Link href={link.href} className={pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href)) ? 'active' : ''}>
              {link.label}
            </Link>
          </li>
        ))}
        {isAdmin && (
          <li>
            <Link href="/admin" className={pathname.startsWith('/admin') ? 'active' : ''}>
              ⚙ Admin
            </Link>
          </li>
        )}
        <li>
          <button className="lang-toggle" onClick={toggleLocale}>
            {t.nav.language}
          </button>
        </li>
        <li>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme" style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', padding: '0 8px', color: 'var(--text-primary)' }}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </li>
        <li>
          <NotificationBell />
        </li>
        <li>
          <AuthButton />
        </li>
      </ul>
    </nav>
  );
}
