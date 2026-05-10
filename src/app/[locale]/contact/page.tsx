'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ContactContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') ?? 'guest'; // 'guest' | 'owner'

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', type });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Submission failed');
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">Message sent!</h1>
          <p className="text-surface-600">We&apos;ll get back to you within 24 hours.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Form */}
          <div>
            <p className="text-xs uppercase tracking-widest text-primary mb-2">GET IN TOUCH</p>
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-surface-600 mb-8">
              Whether you want to book a stay, list your property, or just have a question &mdash; we&apos;re here.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1">I am a *</label>
                <select name="type" value={form.type} onChange={handleChange} className="input w-full">
                  <option value="guest">Guest looking to book</option>
                  <option value="owner">Property owner</option>
                  <option value="other">Other enquiry</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full name *</label>
                  <input required name="name" value={form.name} onChange={handleChange} className="input w-full" placeholder="John Smith" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="input w-full" placeholder="+356 9999 0000" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email *</label>
                <input required type="email" name="email" value={form.email} onChange={handleChange} className="input w-full" placeholder="john@example.com" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Message *</label>
                <textarea required name="message" value={form.message} onChange={handleChange} rows={5} className="input w-full resize-none" placeholder="How can we help?" />
              </div>

              {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 text-sm">{error}</div>}

              <button type="submit" disabled={loading} className="btn-primary w-full py-3">
                {loading ? 'Sending...' : 'Send message'}
              </button>
            </form>
          </div>

          {/* Right: Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-6">Our details</h2>
              <div className="space-y-4">
                {[
                  { icon: '📞', label: 'Phone', value: '+356 7979 0202', href: 'tel:+35679790202' },
                  { icon: '💬', label: 'WhatsApp', value: 'Chat on WhatsApp', href: 'https://wa.me/35679790202' },
                  { icon: '✉️', label: 'Email', value: 'info@christianopropertymanagement.com', href: 'mailto:info@christianopropertymanagement.com' },
                  { icon: '📍', label: 'Address', value: 'The Fives A7, Triq Charles Sciberras, St Julian\'s, Malta', href: 'https://maps.google.com/?q=St+Julian%27s+Malta' },
                ].map(({ icon, label, value, href }) => (
                  <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="flex items-start gap-4 p-4 bg-surface-50 border border-surface-200 rounded-xl hover:bg-surface-100 transition-colors">
                    <span className="text-2xl">{icon}</span>
                    <div>
                      <p className="text-xs text-surface-500 uppercase tracking-wider">{label}</p>
                      <p className="font-medium text-sm">{value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <h3 className="font-semibold text-amber-800 mb-2">Response time</h3>
              <p className="text-sm text-amber-700">
                We aim to respond to all enquiries within <strong>2 hours</strong> during business hours (Mon&ndash;Sun, 8am&ndash;9pm Malta time).
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>}>
      <ContactContent />
    </Suspense>
  );
}
