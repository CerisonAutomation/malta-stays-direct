'use client';

import { useState } from 'react';
import { Link, usePathname } from '@/i18n/routing';
import { useLocale } from 'next-intl';

const NAV_LINKS = [
  { href: '/', label: 'Properties' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-surface-900/95 backdrop-blur border-b border-surface-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-foreground hover:text-primary transition-colors">
          <span className="text-2xl">🏖️</span>
          <span>Malta Stays Direct</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href as any}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === href ? 'text-primary' : 'text-surface-600'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-3">
          <Link href="/" className="hidden md:inline-flex btn-primary text-sm px-4 py-2">
            Book now
          </Link>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden p-2 rounded-lg text-surface-600 hover:bg-surface-100"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-surface-200 bg-white dark:bg-surface-900 px-4 py-4 space-y-1">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href as any}
              onClick={() => setMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-surface-100 ${
                pathname === href ? 'text-primary bg-surface-50' : 'text-surface-700'
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="block mt-2 btn-primary text-center text-sm px-4 py-2"
          >
            Book now
          </Link>
        </div>
      )}
    </header>
  );
}
