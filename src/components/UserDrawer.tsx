'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useI18n } from '@/i18n/I18nProvider';
import { useTheme } from '@/context/ThemeContext';

interface UserDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function UserDrawer({ isOpen, onClose }: UserDrawerProps) {
    const { user, isAdmin, signOut } = useAuth();
    const { t, toggleLocale } = useI18n();
    const { theme, toggleTheme } = useTheme();
    const pathname = usePathname();

    // Prevent scrolling when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Close on route change
    useEffect(() => {
        onClose();
    }, [pathname, onClose]);

    const links = [
        { href: '/', label: t.nav.home },
        { href: '/learn/beginner', label: t.nav.beginner },
        { href: '/learn/intermediate', label: t.nav.intermediate },
        { href: '/learn/expert', label: t.nav.expert },
        { href: '/dashboard', label: t.nav.dashboard },
    ];

    if (!isOpen) return null;

    return (
        <>
            <div className="drawer-overlay" onClick={onClose} />
            <div className={`drawer-panel ${isOpen ? 'open' : ''}`}>
                <div className="drawer-header">
                    {user ? (
                        <>
                            <img src={user.photoURL || ''} alt="User Avatar" className="drawer-avatar" referrerPolicy="no-referrer" />
                            <div className="drawer-user-info">
                                <span className="drawer-displayName">{user.displayName}</span>
                                <span className="drawer-email">{user.email}</span>
                            </div>
                        </>
                    ) : (
                        <div className="drawer-user-info">
                            <span className="drawer-displayName">Guest User</span>
                            <span className="drawer-email">Not logged in</span>
                        </div>
                    )}
                    <button className="drawer-close" onClick={onClose}>×</button>
                </div>

                <div className="drawer-content">
                    {/* Mobile Only Links (Hidden on Desktop Drawer) */}
                    <div className="drawer-section mobile-only">
                        <h4 className="drawer-section-title">Navigation</h4>
                        <ul className="drawer-links">
                            {links.map(link => (
                                <li key={link.href}>
                                    <Link href={link.href} className={`drawer-link ${pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href)) ? 'active' : ''}`}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="drawer-section">
                        <h4 className="drawer-section-title">Settings</h4>
                        <ul className="drawer-links">
                            <li>
                                <button className="drawer-action" onClick={toggleTheme}>
                                    <span>{theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}</span>
                                </button>
                            </li>
                            <li>
                                <button className="drawer-action" onClick={toggleLocale}>
                                    <span>🌐 {t.nav.language}</span>
                                </button>
                            </li>
                            {isAdmin && (
                                <li>
                                    <Link href="/admin" className={`drawer-link ${pathname.startsWith('/admin') ? 'active' : ''}`}>
                                        ⚙️ Admin Dashboard
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>

                    {user && (
                        <div className="drawer-section drawer-footer">
                            <button className="drawer-signout btn-danger" onClick={() => { signOut(); onClose(); }}>
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
