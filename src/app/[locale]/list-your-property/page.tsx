'use client';

import { useState } from 'react';
import Link from 'next/link';

const STEPS = [
  { number: '01', title: 'Submit Your Property', description: 'Fill in the form below with your property details. Our team reviews all submissions within 24 hours.' },
  { number: '02', title: 'Professional Photography', description: 'We arrange a free professional photoshoot of your property to showcase it at its best.' },
  { number: '03', title: 'Go Live & Earn', description: 'Your property goes live on our platform and we start managing bookings, guests and payments for you.' },
];

const BENEFITS = [
  { icon: '\uD83D\uDCB0', title: 'Up to 30% More Revenue', description: 'Our dynamic pricing engine maximises your earnings across all seasons.' },
  { icon: '\uD83D\uDE4C', title: 'Zero Hassle Management', description: 'We handle everything: check-in, cleaning, guest support, and maintenance.' },
  { icon: '\uD83D\uDCCA', title: 'Real-Time Dashboard', description: 'Monitor bookings, occupancy and revenue from your owner portal anytime.' },
  { icon: '\uD83D\uDD12', title: 'Fully Insured', description: 'All properties are covered by our comprehensive insurance programme.' },
];

export default function ListYourPropertyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', propertyType: '', bedrooms: '', address: '', message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          type: 'owner',
          message: `Property Listing Request\n\nProperty Type: ${form.propertyType}\nBedrooms: ${form.bedrooms}\nAddress: ${form.address}\n\n${form.message}`,
        }),
      });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-gray-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4">For Property Owners</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">List Your Malta Property</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Join our curated portfolio of holiday rentals and let us manage everything while you earn passive income.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-8">
            <a href="#apply" className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-7 py-3 rounded-xl transition">Apply Now</a>
            <Link href="/owners" className="border border-white/30 hover:bg-white/10 text-white font-semibold px-7 py-3 rounded-xl transition">Learn More</Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why List With Us?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((b) => (
              <div key={b.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
                <div className="text-4xl mb-3">{b.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{b.title}</h3>
                <p className="text-sm text-gray-500">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
          <div className="space-y-8">
            {STEPS.map((step) => (
              <div key={step.number} className="flex gap-6 items-start">
                <div className="flex-none w-14 h-14 bg-amber-500 text-white rounded-full flex items-center justify-center text-lg font-bold">{step.number}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                  <p className="text-gray-500 mt-1">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-16 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Apply to List Your Property</h2>
          <p className="text-gray-500 text-center mb-10">We\'ll get back to you within 24 hours with next steps.</p>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
              <div className="text-5xl mb-4">\u2705</div>
              <h3 className="text-xl font-bold text-green-800 mb-2">Application Received!</h3>
              <p className="text-green-700">Thank you for your interest. Our team will be in touch within 24 hours.</p>
              <Link href="/owners" className="inline-block mt-6 bg-amber-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-amber-600 transition">Learn More About Ownership</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input name="name" required value={form.name} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder="John Smith" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <input name="email" type="email" required value={form.email} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder="john@example.com" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input name="phone" value={form.phone} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder="+356 7979 0202" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Property Type *</label>
                  <select name="propertyType" required value={form.propertyType} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400">
                    <option value="">Select type...</option>
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                    <option value="townhouse">Townhouse</option>
                    <option value="farmhouse">Farmhouse</option>
                    <option value="studio">Studio</option>
                    <option value="penthouse">Penthouse</option>
                  </select>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Bedrooms *</label>
                  <select name="bedrooms" required value={form.bedrooms} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400">
                    <option value="">Select...</option>
                    {['Studio', '1', '2', '3', '4', '5+'].map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Property Address *</label>
                  <input name="address" required value={form.address} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder="Triq ..., Valletta" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Information</label>
                <textarea name="message" rows={4} value={form.message} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none" placeholder="Tell us anything else about your property or requirements..." />
              </div>
              <button type="submit" disabled={loading} className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition">
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
