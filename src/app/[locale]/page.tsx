import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import { SearchBar } from '@/components/search/SearchBar';
import { PropertyGrid } from '@/components/properties/PropertyGrid';
import { getListings } from '@/lib/guesty/client';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('home');
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  // ISR: revalidate every 5 minutes
  const { data: featuredProperties } = await getListings({}, 1, 6);

  return (
    <main>
      {/* Hero */}
      <section className="relative isolate min-h-[70vh] flex items-center">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/malta-hero.jpg"
            alt="Malta coastline"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        </div>

        <div className="mx-auto w-full max-w-6xl px-4 py-24 text-white">
          <h1 className="font-serif text-4xl font-bold leading-tight md:text-6xl">
            Discover Malta&apos;s
            <br />
            <span className="text-brand-400">Finest Stays</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/80">
            Book directly with Christiano Property Management.
            No booking fees. Best rates guaranteed.
          </p>

          <div className="mt-10">
            <SearchBar locale={locale} />
          </div>
        </div>
      </section>

      {/* Featured properties */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-500">
              Hand-picked for you
            </p>
            <h2 className="mt-1 font-serif text-3xl font-bold text-surface-900">
              Our Properties
            </h2>
          </div>
          <Link
            href={`/${locale}/properties`}
            className="text-sm font-medium text-brand-600 hover:text-brand-700 underline-offset-4 hover:underline"
          >
            View all &rarr;
          </Link>
        </div>
        <PropertyGrid listings={featuredProperties} locale={locale} />
      </section>

      {/* Trust strip */}
      <section className="border-y border-surface-100 bg-surface-50 py-12">
        <div className="mx-auto max-w-5xl px-4">
          <dl className="grid grid-cols-2 gap-8 md:grid-cols-4 text-center">
            {[
              { value: '100%', label: 'Direct booking' },
              { value: 'No fees', label: 'Zero booking fees' },
              { value: '24/7', label: 'Guest support' },
              { value: '5★', label: 'Rated stays' },
            ].map(({ value, label }) => (
              <div key={label}>
                <dt className="text-3xl font-serif font-bold text-brand-500">{value}</dt>
                <dd className="mt-1 text-sm text-surface-600">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  );
}

export const revalidate = 300; // 5-minute ISR
