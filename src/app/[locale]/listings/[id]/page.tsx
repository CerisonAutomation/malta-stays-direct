import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import BookingWidget from '@/components/booking/BookingWidget';
import { formatCurrency, cn } from '@/lib/utils';
import type { GuestyListing } from '@/types';

interface Props {
  params: { locale: string; id: string };
}

async function getListing(id: string): Promise<GuestyListing | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/guesty/listings/${id}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.listing ?? null;
  } catch {
    return null;
  }
}

export default async function ListingPage({ params }: Props) {
  const { id, locale } = params;
  const t = await getTranslations('listing');
  const listing = await getListing(id);

  if (!listing) notFound();

  const pictures = listing.pictures ?? [];
  const amenities = listing.amenities ?? [];
  const bedrooms = listing.bedrooms ?? 0;
  const bathrooms = listing.bathrooms ?? 0;
  const accommodates = listing.accommodates ?? 0;
  const address = listing.address?.full ?? listing.address?.city ?? 'Malta';

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Gallery */}
      <section className="relative h-[60vh] bg-surface-200 overflow-hidden">
        {pictures[0] ? (
          <Image
            src={pictures[0].large ?? pictures[0].original}
            alt={listing.title}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-surface-300 flex items-center justify-center">
            <span className="text-surface-500 text-lg">No image available</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-8 left-8 text-white">
          <h1 className="text-4xl font-bold mb-2">{listing.title}</h1>
          <p className="text-lg opacity-90">{address}</p>
        </div>
      </section>

      {/* Thumbnail Strip */}
      {pictures.length > 1 && (
        <section className="bg-surface-100 border-b border-surface-200">
          <div className="container mx-auto px-4 py-3">
            <div className="flex gap-2 overflow-x-auto scrollbar-thin">
              {pictures.slice(1, 7).map((pic, i) => (
                <div key={i} className="relative flex-shrink-0 w-24 h-16 rounded overflow-hidden">
                  <Image
                    src={pic.thumbnail ?? pic.original}
                    alt={`${listing.title} photo ${i + 2}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Details */}
          <div className="lg:col-span-2 space-y-10">
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Guests', value: accommodates },
                { label: 'Bedrooms', value: bedrooms },
                { label: 'Bathrooms', value: bathrooms },
              ].map(({ label, value }) => (
                <div key={label} className="bg-surface-100 rounded-xl p-4 text-center border border-surface-200">
                  <p className="text-3xl font-bold text-primary">{value}</p>
                  <p className="text-sm text-surface-500 mt-1">{label}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            {listing.publicDescription?.summary && (
              <section>
                <h2 className="text-2xl font-semibold mb-4">About this property</h2>
                <p className="text-surface-600 leading-relaxed whitespace-pre-line">
                  {listing.publicDescription.summary}
                </p>
              </section>
            )}

            {/* Amenities */}
            {amenities.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2 text-surface-600">
                      <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-sm capitalize">{amenity.replace(/_/g, ' ')}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* House Rules */}
            {listing.terms && (
              <section>
                <h2 className="text-2xl font-semibold mb-4">House Rules</h2>
                <div className="bg-surface-50 rounded-xl p-6 border border-surface-200 space-y-2 text-sm text-surface-600">
                  {listing.terms.minNights && (
                    <p>Minimum stay: <strong>{listing.terms.minNights} nights</strong></p>
                  )}
                  {listing.checkInTime && (
                    <p>Check-in: <strong>from {listing.checkInTime}</strong></p>
                  )}
                  {listing.checkOutTime && (
                    <p>Check-out: <strong>by {listing.checkOutTime}</strong></p>
                  )}
                </div>
              </section>
            )}

            {/* Eco Tax Notice */}
            <section className="bg-green-50 border border-green-200 rounded-xl p-5">
              <h3 className="font-semibold text-green-800 mb-1">Malta Eco Tax</h3>
              <p className="text-sm text-green-700">
                A Malta eco tax of <strong>&euro;0.50 per adult per night</strong> applies to all guests aged 18 and over.
                This is collected directly at check-in and is not included in the booking price.
              </p>
            </section>
          </div>

          {/* Right: Booking Widget */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <Suspense fallback={<div className="h-96 bg-surface-100 rounded-2xl animate-pulse" />}>
                <BookingWidget listing={listing} />
              </Suspense>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
