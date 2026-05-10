import type { Metadata } from 'next';
import { Home, Sparkles, Camera, Wrench, TrendingUp, FileText, Key, Droplet, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Our Services | Malta Stays Direct', description: 'Full-service property management including cleaning, maintenance, pricing, photography and more' };

export default function ServicesPage() {
  const services = [
    { icon: MessageCircle, title: 'Guest Communication', description: '24/7 support for all guest inquiries, check-ins, and support requests in multiple languages.' },
    { icon: Home, title: 'Property Management', description: 'Complete oversight of your property including regular inspections and maintenance coordination.' },
    { icon: Sparkles, title: 'Professional Cleaning', description: 'Thorough cleaning after every guest departure with hospitality-grade standards.' },
    { icon: Camera, title: 'Professional Photography', description: 'High-quality photos and virtual tours to showcase your property at its best.' },
    { icon: Wrench, title: 'Maintenance & Repairs', description: 'Fast response to maintenance issues with trusted local contractors.' },
    { icon: TrendingUp, title: 'Dynamic Pricing', description: 'Data-driven pricing strategies to maximize your revenue year-round.' },
    { icon: FileText, title: 'Monthly Reports', description: 'Detailed financial reporting with complete transparency on bookings and revenue.' },
    { icon: Key, title: 'Key Management', description: 'Secure key handling and seamless guest check-in/check-out coordination.' },
    { icon: Droplet, title: 'Linen & Amenities', description: 'Supply and management of hotel-quality linens, toiletries, and guest amenities.' },
  ];

  return (
    <main className="min-h-screen">
      <section className="bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 px-6 py-24 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 font-display text-5xl font-bold md:text-6xl">Our Services</h1>
          <p className="text-xl text-brand-50">Everything you need for hassle-free property management</p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <div key={i} className="rounded-2xl border border-surface-200 bg-white p-8 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
                <service.icon className="mb-4 h-12 w-12 text-brand-500" />
                <h3 className="mb-3 text-2xl font-bold text-surface-900">{service.title}</h3>
                <p className="text-surface-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-50 px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 font-display text-4xl font-bold">Ready to Maximize Your Property's Potential?</h2>
          <p className="mb-8 text-xl text-surface-600">Let us handle everything while you enjoy the returns</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/list-your-property" className="rounded-lg bg-brand-500 px-8 py-4 font-semibold text-white transition-colors hover:bg-brand-600">List Your Property</Link>
            <Link href="/contact" className="rounded-lg border-2 border-brand-500 px-8 py-4 font-semibold text-brand-500 transition-colors hover:bg-brand-50">Contact Us</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
