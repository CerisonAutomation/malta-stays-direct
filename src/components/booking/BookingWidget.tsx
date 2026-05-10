'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { DayPicker, DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { Minus, Plus, Calendar, Users, Loader2, Zap } from 'lucide-react';
import { cn, formatEur, nightsBetween, toISODate, calcEcoTax, ga4Value } from '@/lib/utils';
import type { Listing, Quote, GuestCounts } from '@/types';
import 'react-day-picker/dist/style.css';

interface BookingWidgetProps {
  listing: Listing;
  locale: string;
  blockedDates?: Date[];
}

type WidgetStep = 'dates' | 'guests' | 'quote' | 'error';

const DEFAULT_GUESTS: GuestCounts = { adults: 2, children: 0, infants: 0 };
const ECO_TAX_RATE = 0.5; // EUR per adult per night

export function BookingWidget({ listing, locale, blockedDates = [] }: BookingWidgetProps) {
  const router = useRouter();
  const [step, setStep] = useState<WidgetStep>('dates');
  const [range, setRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState<GuestCounts>(DEFAULT_GUESTS);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const nights = range?.from && range?.to
    ? nightsBetween(toISODate(range.from), toISODate(range.to))
    : 0;

  const totalGuests = guests.adults + guests.children;

  const adjustGuest = useCallback(
    (key: keyof GuestCounts, delta: number) => {
      setGuests((prev) => ({
        ...prev,
        [key]: Math.max(0, Math.min(
          key === 'adults' ? Math.max(1, prev[key] + delta) : prev[key] + delta,
          key === 'adults' ? listing.maxGuests : listing.maxGuests - prev.adults,
        )),
      }));
    },
    [listing.maxGuests],
  );

  const handleGetQuote = useCallback(async () => {
    if (!range?.from || !range?.to || nights < (listing.policy.minNights ?? 1)) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/guesty/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listingId: listing.id,
          checkIn: toISODate(range.from),
          checkOut: toISODate(range.to),
          guests,
        }),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error?.message ?? 'Failed to get quote');
      }

      const { data } = await res.json();
      setQuote(data);
      setStep('quote');

      // GA4 begin_checkout event
      window.gtag?.('event', 'begin_checkout', {
        currency: 'EUR',
        value: ga4Value(data.totalAmount),
        items: [{
          item_id: listing.id,
          item_name: listing.title,
          item_category: listing.type,
          price: ga4Value(listing.basePrice),
          quantity: nights,
        }],
      });
    } catch (err) {
      setError((err as Error).message);
      setStep('error');
    } finally {
      setLoading(false);
    }
  }, [range, nights, guests, listing]);

  const handleProceed = useCallback(() => {
    if (!quote || !range?.from || !range?.to) return;
    const params = new URLSearchParams({
      quoteId: quote.quoteId,
      listingId: listing.id,
      checkIn: toISODate(range.from),
      checkOut: toISODate(range.to),
      adults: String(guests.adults),
      children: String(guests.children),
      infants: String(guests.infants),
    });
    router.push(`/${locale}/checkout?${params.toString()}`);
  }, [quote, range, guests, listing, locale, router]);

  const ecoTax = calcEcoTax(guests.adults, nights);
  const baseTotal = listing.basePrice * nights;

  return (
    <div className="booking-widget" aria-label="Booking widget">
      {/* Price header */}
      <div className="mb-4 flex items-baseline gap-1">
        <span className="text-3xl font-bold text-surface-900">
          {formatEur(listing.basePrice)}
        </span>
        <span className="text-surface-500">/night</span>
        {listing.isInstantBook && (
          <span className="ml-auto flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-600">
            <Zap className="h-3 w-3" />
            Instant book
          </span>
        )}
      </div>

      {/* Date picker */}
      <div className="mb-4 rounded-xl border border-surface-200 overflow-hidden">
        <button
          className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium text-surface-700 hover:bg-surface-50 transition-colors"
          onClick={() => setStep(step === 'dates' ? 'guests' : 'dates')}
          aria-expanded={step === 'dates'}
        >
          <Calendar className="h-4 w-4 text-brand-500" />
          {range?.from && range?.to
            ? `${format(range.from, 'MMM d')} – ${format(range.to, 'MMM d, yyyy')}`
            : 'Select dates'}
        </button>

        {step === 'dates' && (
          <div className="border-t border-surface-100 p-2">
            <DayPicker
              mode="range"
              selected={range}
              onSelect={setRange}
              disabled={[
                { before: new Date() },
                ...blockedDates.map((d) => ({ from: d, to: d })),
              ]}
              numberOfMonths={1}
              className="mx-auto"
            />
          </div>
        )}
      </div>

      {/* Guest selector */}
      <div className="mb-4 rounded-xl border border-surface-200">
        <button
          className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium text-surface-700 hover:bg-surface-50 transition-colors"
          onClick={() => setStep(step === 'guests' ? 'dates' : 'guests')}
          aria-expanded={step === 'guests'}
        >
          <Users className="h-4 w-4 text-brand-500" />
          {totalGuests} guest{totalGuests !== 1 ? 's' : ''}
          {guests.infants > 0 ? `, ${guests.infants} infant${guests.infants !== 1 ? 's' : ''}` : ''}
        </button>

        {step === 'guests' && (
          <div className="border-t border-surface-100 divide-y divide-surface-100">
            {([
              { key: 'adults' as const, label: 'Adults', sub: 'Age 18+', min: 1 },
              { key: 'children' as const, label: 'Children', sub: 'Ages 2–17', min: 0 },
              { key: 'infants' as const, label: 'Infants', sub: 'Under 2', min: 0 },
            ]).map(({ key, label, sub, min }) => (
              <div key={key} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-surface-800">{label}</p>
                  <p className="text-xs text-surface-400">{sub}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => adjustGuest(key, -1)}
                    disabled={guests[key] <= min}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-surface-300 text-surface-600 disabled:opacity-30 hover:border-brand-500 hover:text-brand-500 transition-colors"
                    aria-label={`Decrease ${label}`}
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-4 text-center text-sm font-semibold">{guests[key]}</span>
                  <button
                    onClick={() => adjustGuest(key, 1)}
                    disabled={totalGuests >= listing.maxGuests}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-surface-300 text-surface-600 disabled:opacity-30 hover:border-brand-500 hover:text-brand-500 transition-colors"
                    aria-label={`Increase ${label}`}
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quote breakdown */}
      {step === 'quote' && quote && (
        <div className="mb-4 rounded-xl bg-surface-50 p-4 text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-surface-600">{formatEur(listing.basePrice)} x {nights} nights</span>
            <span className="font-medium">{formatEur(baseTotal)}</span>
          </div>
          {quote.fees.map((fee) => (
            <div key={fee.name} className="flex justify-between">
              <span className="text-surface-600">{fee.name}</span>
              <span className="font-medium">{formatEur(fee.amount)}</span>
            </div>
          ))}
          <div className="flex justify-between text-surface-400 text-xs">
            <span>Eco-tax (€0.50/adult/night — paid at check-in)</span>
            <span>{formatEur(ecoTax)}</span>
          </div>
          <div className="border-t border-surface-200 pt-2 flex justify-between font-bold">
            <span>Total</span>
            <span>{formatEur(quote.totalAmount)}</span>
          </div>
          <p className="text-xs text-surface-400">You won&apos;t be charged yet</p>
        </div>
      )}

      {/* Error state */}
      {step === 'error' && error && (
        <div className="mb-4 rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
          {error}
          <button
            className="mt-2 text-xs underline"
            onClick={() => { setStep('dates'); setError(null); }}
          >
            Try again
          </button>
        </div>
      )}

      {/* CTA */}
      {step !== 'quote' ? (
        <button
          onClick={handleGetQuote}
          disabled={loading || !range?.from || !range?.to || nights < (listing.policy.minNights ?? 1)}
          className="btn-primary w-full"
        >
          {loading ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Getting quote...</>
          ) : (
            'Check availability'
          )}
        </button>
      ) : (
        <button onClick={handleProceed} className="btn-primary w-full">
          {listing.isInstantBook ? 'Book now — instant confirm' : 'Request to book'}
        </button>
      )}

      {nights > 0 && nights < (listing.policy.minNights ?? 1) && (
        <p className="mt-2 text-center text-xs text-red-500">
          Minimum stay is {listing.policy.minNights} nights
        </p>
      )}

      <p className="mt-3 text-center text-xs text-surface-400">
        No booking fees. Best rate guaranteed.
      </p>
    </div>
  );
}
