import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://maltastaysdirect.com'),
  title: {
    default: 'Malta Stays Direct | Luxury Short-Term Rentals',
    template: '%s | Malta Stays Direct',
  },
  description:
    'Book luxury self-catering apartments and villas in Malta directly with Christiano Property Management. Best rates guaranteed, no booking fees.',
  keywords: ['Malta rentals', 'short term rental Malta', 'holiday apartments Malta', 'Swieqi rentals', "St Julian's apartments"],
  authors: [{ name: 'Christiano Property Management' }],
  openGraph: {
    type: 'website',
    locale: 'en_MT',
    siteName: 'Malta Stays Direct',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#db8a2c',
  width: 'device-width',
  initialScale: 1,
};

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  if (!routing.locales.includes(locale as 'en' | 'mt')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={cn(inter.variable, playfair.variable)}>
      <body className="min-h-screen bg-white font-sans text-surface-900 antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
