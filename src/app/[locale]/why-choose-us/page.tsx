import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Award, TrendingUp, Users, Shield, Heart, Star } from 'lucide-react';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta');
  return { title: t('whyChooseUs.title'), description: t('whyChooseUs.description') };
}

export default function WhyChooseUsPage() {
  const t = useTranslations('whyChooseUs');
  
  const reasons = [
    { icon: Award, title: '9+ Years Superhost Experience', description: 'Consistent 5-star ratings and exceptional guest satisfaction across all managed properties.' },
    { icon: TrendingUp, title: 'Maximize Your Revenue', description: 'Dynamic pricing strategies and year-round booking optimization to ensure maximum returns.' },
    { icon: Users, title: 'Full-Service Management', description: 'From guest communications to maintenance, we handle everything so you don\'t have to.' },
    { icon: Shield, title: 'Property Protection', description: 'Comprehensive insurance, guest vetting, and damage protection for complete peace of mind.' },
    { icon: Heart, title: 'Personal Touch', description: 'We treat every property as if it were our own, ensuring the highest standards of care.' },
    { icon: Star, title: 'Proven Track Record', description: '100% response rate and consistently outstanding reviews from both owners and guests.' },
  ];

  return (
    <main className="min-h-screen">
      <section className="bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 px-6 py-24 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 font-display text-5xl font-bold md:text-6xl">Why Choose Us</h1>
          <p className="text-xl text-brand-50">9+ years of Superhost experience managing luxury properties across Malta</p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {reasons.map((reason, i) => (
              <div key={i} className="rounded-2xl border border-surface-200 bg-white p-8 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
                <reason.icon className="mb-4 h-12 w-12 text-brand-500" />
                <h3 className="mb-3 text-2xl font-bold text-surface-900">{reason.title}</h3>
                <p className="text-surface-600">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-50 px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 font-display text-4xl font-bold">Ready to Get Started?</h2>
          <p className="mb-8 text-xl text-surface-600">Join our portfolio of successfully managed properties</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/list-your-property" className="rounded-lg bg-brand-500 px-8 py-4 font-semibold text-white transition-colors hover:bg-brand-600">List Your Property</Link>
            <Link href="/pricing" className="rounded-lg border-2 border-brand-500 px-8 py-4 font-semibold text-brand-500 transition-colors hover:bg-brand-50">View Pricing</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
