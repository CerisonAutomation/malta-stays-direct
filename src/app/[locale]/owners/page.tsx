import { Link } from '@/i18n/routing';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'List Your Property | Malta Stays Direct',
  description: 'Partner with Malta\'s premier property management company. 9+ years Superhost experience, dynamic pricing, 24/7 guest support. 15% or 18% commission.',
};

const SERVICES = [
  { icon: '📊', title: 'Dynamic Pricing', description: 'AI-driven pricing engine adjusts rates daily based on demand, seasonality, and competitor data to maximise your revenue.' },
  { icon: '🤝', title: 'Guest Screening', description: 'Rigorous vetting of every guest before confirmation. ID verification, review history checks, and deposit collection.' },
  { icon: '🧹', title: 'Hotel-Standard Cleaning', description: 'Professional cleaning team between every stay, with linen service, restocking, and full inspection reports.' },
  { icon: '🛡️', title: 'Maintenance Management', description: 'Rapid response to maintenance issues. Trusted contractor network across Malta, 24/7 on-call support.' },
  { icon: '📊', title: 'Monthly Reports', description: 'Detailed income statements, occupancy data, guest reviews, and tax-ready documentation every month.' },
  { icon: '📸', title: 'Professional Photography', description: 'High-quality photography and listing copywriting to maximise your listing\'s click-through and conversion rates.' },
];

const STATS = [
  { value: '9+', label: 'Years Superhost' },
  { value: '100%', label: 'Response Rate' },
  { value: '4.9', label: 'Avg. Rating' },
  { value: '+40%', label: 'Revenue Boost' },
];

const PLANS = [
  {
    name: 'Essentials',
    rate: '15%',
    subtitle: 'Per booking — no monthly fees',
    features: ['Dynamic pricing engine', 'Guest screening & ID check', 'Listing optimisation', 'Monthly income report', 'Direct booking site'],
    cta: 'Get started',
    featured: false,
  },
  {
    name: 'Complete',
    rate: '18%',
    subtitle: 'All-inclusive, fully hands-off',
    features: ['Everything in Essentials', '24/7 dedicated guest support', 'Hotel-standard cleaning', 'Maintenance coordination', 'Professional photography', 'Tax-ready statements'],
    cta: 'Get started',
    featured: true,
  },
];

const STEPS = [
  { step: '01', title: 'Book a free consultation', description: 'We visit your property, assess its potential, and walk you through our process.' },
  { step: '02', title: 'We handle setup', description: 'Professional photography, listing creation, pricing strategy — all done for you.' },
  { step: '03', title: 'Start earning', description: 'Guests book, we manage everything. You receive monthly payouts and reports.' },
];

export default function OwnersPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative bg-surface-900 text-white py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-surface-900 via-surface-800 to-surface-900 opacity-90" />
        <div className="relative container mx-auto max-w-4xl">
          <p className="text-xs uppercase tracking-widest text-amber-400 mb-4">FOR PROPERTY OWNERS</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Maximize Your Property&apos;s{' '}
            <span className="text-amber-400 italic">Full Potential</span>
          </h1>
          <p className="text-lg text-surface-300 max-w-xl mb-8">
            Malta&apos;s most trusted short-term rental management. Completely hands-off for you.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link href="/contact?type=owner" className="bg-amber-400 text-black font-semibold px-8 py-3 rounded-lg hover:bg-amber-300 transition-colors">
              List Your Property
            </Link>
            <a href="#pricing" className="border border-white/30 text-white px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">
              View Pricing Plans
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="text-4xl font-bold text-amber-400">{s.value}</p>
                <p className="text-xs text-surface-400 uppercase tracking-wider mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <p className="text-xs uppercase tracking-widest text-amber-600 mb-2">THE DIFFERENCE</p>
          <h2 className="text-4xl font-bold mb-4">Why Property Owners Choose Us</h2>
          <p className="text-surface-600 max-w-xl mb-12">
            We treat every property like it&apos;s our own. Selective portfolio, personal service, exceptional results.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.map((s) => (
              <div key={s.title} className="bg-surface-50 border border-surface-200 rounded-2xl p-6">
                <span className="text-3xl mb-4 block">{s.icon}</span>
                <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-surface-600 text-sm leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-surface-50">
        <div className="container mx-auto max-w-4xl">
          <p className="text-xs uppercase tracking-widest text-amber-600 mb-2">SIMPLE PROCESS</p>
          <h2 className="text-4xl font-bold mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((s) => (
              <div key={s.step} className="relative">
                <p className="text-6xl font-bold text-surface-200 mb-2">{s.step}</p>
                <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-surface-600 text-sm">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 bg-surface-900 text-white">
        <div className="container mx-auto max-w-4xl">
          <p className="text-xs uppercase tracking-widest text-amber-400 mb-2">TRANSPARENT PRICING</p>
          <h2 className="text-4xl font-bold mb-4">Simple, Performance-Based Fees</h2>
          <p className="text-surface-400 mb-12">We only earn when you earn. No hidden fees, no surprises.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 border ${
                  plan.featured ? 'border-amber-400 bg-surface-800' : 'border-surface-700 bg-surface-800/40'
                }`}
              >
                {plan.featured && (
                  <span className="text-xs bg-amber-400 text-black font-semibold px-3 py-1 rounded-full mb-4 inline-block">
                    Most Popular
                  </span>
                )}
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="text-amber-400 text-5xl font-bold mt-2">{plan.rate}</p>
                <p className="text-surface-400 text-sm mb-6">{plan.subtitle}</p>
                <ul className="space-y-2 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <span className="text-amber-400">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact?type=owner"
                  className={`block text-center py-3 px-6 rounded-lg font-semibold transition-colors ${
                    plan.featured
                      ? 'bg-amber-400 text-black hover:bg-amber-300'
                      : 'border border-white/30 text-white hover:bg-white/10'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center">
        <div className="container mx-auto max-w-xl">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-surface-600 mb-8">
            Book a free consultation and we&apos;ll assess your property&apos;s earning potential.
          </p>
          <Link href="/contact?type=owner" className="bg-amber-400 text-black font-semibold px-8 py-4 rounded-lg text-lg hover:bg-amber-300 transition-colors inline-block">
            Book Free Consultation
          </Link>
        </div>
      </section>
    </main>
  );
}
