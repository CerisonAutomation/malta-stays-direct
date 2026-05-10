import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Pricing Plans | Malta Stays Direct', description: '15% Essentials or 18% Complete management plans for your Malta property' };

export default function PricingPage() {
  const plans = [
    {
      name: 'Essentials',
      commission: '15%',
      description: 'Perfect for hands-on owners who want support with guest bookings',
      features: ['Guest Communication', 'Booking Management', 'Payment Processing', 'Calendar Synchronization', 'Basic Listing Optimization', '24/7 Guest Support'],
    },
    {
      name: 'Complete',
      commission: '18%',
      description: 'Full-service management for maximum revenue and zero hassle',
      features: ['Everything in Essentials', 'Professional Cleaning Service', 'Maintenance & Repairs', 'Linen & Toiletries Supply', 'Dynamic Pricing Strategy', 'Professional Photography', 'Property Inspections', 'Key Management', 'Utility Management', 'Monthly Financial Reports'],
      highlighted: true,
    },
  ];

  return (
    <main className="min-h-screen">
      <section className="bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 px-6 py-24 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 font-display text-5xl font-bold md:text-6xl">Pricing Plans</h1>
          <p className="text-xl text-brand-50">Simple, transparent pricing with no hidden fees</p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2">
            {plans.map((plan) => (
              <div key={plan.name} className={`rounded-3xl border-2 p-10 transition-all ${ plan.highlighted ? 'border-brand-500 bg-white shadow-2xl scale-105' : 'border-surface-200 bg-white shadow-lg' }`}>
                {plan.highlighted && <div className="mb-4 inline-block rounded-full bg-brand-500 px-4 py-1 text-sm font-semibold text-white">Most Popular</div>}
                <h2 className="mb-2 text-3xl font-bold text-surface-900">{plan.name}</h2>
                <div className="mb-4 text-5xl font-bold text-brand-500">{plan.commission}<span className="text-2xl text-surface-600"> commission</span></div>
                <p className="mb-8 text-surface-600">{plan.description}</p>
                <ul className="mb-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-500" />
                      <span className="text-surface-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/list-your-property" className={`block w-full rounded-lg py-4 text-center font-semibold transition-colors ${plan.highlighted ? 'bg-brand-500 text-white hover:bg-brand-600' : 'border-2 border-brand-500 text-brand-500 hover:bg-brand-50'}`}>Get Started</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-50 px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold">No Setup Fees. No Hidden Costs.</h2>
          <p className="text-lg text-surface-600">We only succeed when you succeed. Our commission-based model ensures we're always working to maximize your revenue.</p>
        </div>
      </section>
    </main>
  );
}
