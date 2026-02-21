'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/i18n/I18nProvider';

export default function Navbar() {
  const pathname = usePathname();
  const { t, toggleLocale } = useI18n();

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
        <li>
          <button className="lang-toggle" onClick={toggleLocale}>
            {t.nav.language}
          </button>
        </li>
      </ul>
    </nav>
  );
}
