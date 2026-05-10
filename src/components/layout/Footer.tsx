import { Link } from '@/i18n/routing';

const FOOTER_LINKS = {
  Company: [
    { href: '/about', label: 'About us' },
    { href: '/contact', label: 'Contact' },
  ],
  Legal: [
    { href: '/privacy', label: 'Privacy policy' },
    { href: '/terms', label: 'Terms of service' },
    { href: '/cancellation', label: 'Cancellation policy' },
  ],
  Support: [
    { href: '/faq', label: 'FAQ' },
    { href: 'mailto:info@maltastaysdirect.com', label: 'Email us', external: true },
    { href: 'tel:+35699990000', label: '+356 9999 0000', external: true },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface-900 text-surface-300 mt-24">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="text-white font-bold text-xl flex items-center gap-2 mb-4">
              <span>🏖️</span>
              <span>Malta Stays Direct</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Luxury self-catering apartments in Malta.
              Book direct for the best rates, guaranteed.
            </p>
            <p className="text-xs mt-4 text-surface-500">
              No booking fees. No middleman.
            </p>
          </div>

          {/* Link groups */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">{group}</h4>
              <ul className="space-y-2">
                {links.map(({ href, label, external }) => (
                  <li key={href}>
                    {external ? (
                      <a
                        href={href}
                        className="text-sm hover:text-white transition-colors"
                        {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {label}
                      </a>
                    ) : (
                      <Link href={href as any} className="text-sm hover:text-white transition-colors">
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-surface-700 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-surface-500">
          <p>&copy; {year} Malta Stays Direct. All rights reserved.</p>
          <p>
            Malta eco tax &euro;0.50/adult/night &mdash; collected at check-in &mdash; exempt under 18.
          </p>
        </div>
      </div>
    </footer>
  );
}
