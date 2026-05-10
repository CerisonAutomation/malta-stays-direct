'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { formatCurrency } from '@/lib/utils';

interface GuestDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const listingId = searchParams.get('listingId') ?? '';
  const checkIn = searchParams.get('checkIn') ?? '';
  const checkOut = searchParams.get('checkOut') ?? '';
  const guests = Number(searchParams.get('guests') ?? 1);
  const totalPrice = Number(searchParams.get('total') ?? 0);
  const nights = Number(searchParams.get('nights') ?? 1);
  const pricePerNight = Number(searchParams.get('pricePerNight') ?? 150);
  const listingTitle = searchParams.get('title') ?? 'Malta Property';

  const [guest, setGuest] = useState<GuestDetails>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ecoTax = guests * nights * 0.5;
  const grandTotal = totalPrice + ecoTax;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setGuest((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!listingId || !checkIn || !checkOut) {
      setError('Missing booking details. Please go back and try again.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/guesty/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listingId,
          checkIn,
          checkOut,
          guestsCount: guests,
          guest: {
            firstName: guest.firstName,
            lastName: guest.lastName,
            email: guest.email,
            phone: guest.phone,
          },
          specialRequests: guest.specialRequests,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Reservation failed');
      router.push(`/confirmation?reservationId=${data.reservationId}&email=${encodeURIComponent(guest.email)}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <Link href="/" className="text-primary text-sm mb-8 inline-flex items-center gap-1 hover:underline">
          &larr; Back to listings
        </Link>
        <h1 className="text-3xl font-bold mb-8">Complete your booking</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Guest Details Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-surface-100 rounded-2xl border border-surface-200 p-8 space-y-6">
              <h2 className="text-xl font-semibold">Guest details</h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">First name *</label>
                  <input
                    required
                    name="firstName"
                    value={guest.firstName}
                    onChange={handleChange}
                    className="input w-full"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Last name *</label>
                  <input
                    required
                    name="lastName"
                    value={guest.lastName}
                    onChange={handleChange}
                    className="input w-full"
                    placeholder="Smith"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email address *</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={guest.email}
                  onChange={handleChange}
                  className="input w-full"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone number *</label>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={guest.phone}
                  onChange={handleChange}
                  className="input w-full"
                  placeholder="+356 9999 0000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Special requests (optional)</label>
                <textarea
                  name="specialRequests"
                  value={guest.specialRequests}
                  onChange={handleChange}
                  rows={3}
                  className="input w-full resize-none"
                  placeholder="Early check-in, cot, etc."
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 text-lg font-semibold"
            >
              {loading ? 'Processing...' : 'Confirm booking'}
            </button>

            <p className="text-xs text-surface-500 text-center">
              By confirming you agree to our cancellation policy. No payment is taken here &mdash;
              our team will follow up with secure payment instructions.
            </p>
          </form>

          {/* Booking Summary */}
          <aside className="lg:col-span-1">
            <div className="bg-white dark:bg-surface-100 rounded-2xl border border-surface-200 p-6 sticky top-24 space-y-4">
              <h2 className="text-lg font-semibold">Booking summary</h2>
              <p className="text-surface-600 text-sm font-medium">{listingTitle}</p>

              <div className="border-t border-surface-200 pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-surface-500">Check-in</span>
                  <span className="font-medium">{checkIn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-surface-500">Check-out</span>
                  <span className="font-medium">{checkOut}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-surface-500">Guests</span>
                  <span className="font-medium">{guests}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-surface-500">{nights} night{nights !== 1 ? 's' : ''} &times; {formatCurrency(pricePerNight)}</span>
                  <span className="font-medium">{formatCurrency(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-green-700">
                  <span>Eco tax (pay at check-in)</span>
                  <span>{formatCurrency(ecoTax)}</span>
                </div>
              </div>

              <div className="border-t border-surface-200 pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{formatCurrency(grandTotal)}</span>
              </div>

              <p className="text-xs text-surface-400">
                Eco tax of &euro;0.50/adult/night collected at property. Exempt under 18.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>}>
      <CheckoutContent />
    </Suspense>
  );
}
