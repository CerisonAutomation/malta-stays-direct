'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import PropertyGrid from '@/components/properties/PropertyGrid';
import type { GuestyListing } from '@/types';

const LOCATIONS = [
  { value: '', label: 'All Locations' },
  { value: 'valletta', label: 'Valletta' },
  { value: 'st-julians', label: "St Julian's" },
  { value: 'sliema', label: 'Sliema' },
  { value: 'mdina', label: 'Mdina' },
  { value: 'gozo', label: 'Gozo' },
];

const BEDS_OPTIONS = [
  { value: '', label: 'Any Beds' },
  { value: '1', label: '1+ Bed' },
  { value: '2', label: '2+ Beds' },
  { value: '3', label: '3+ Beds' },
  { value: '4', label: '4+ Beds' },
];

const BATHS_OPTIONS = [
  { value: '', label: 'Any Baths' },
  { value: '1', label: '1+' },
  { value: '2', label: '2+' },
  { value: '3', label: '3+' },
];

const SORT_OPTIONS = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'beds_desc', label: 'Most Bedrooms' },
];

function PropertiesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [listings, setListings] = useState<GuestyListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter state from URL params
  const location = searchParams.get('location') ?? '';
  const beds = searchParams.get('beds') ?? '';
  const baths = searchParams.get('baths') ?? '';
  const sort = searchParams.get('sort') ?? 'recommended';
  const checkIn = searchParams.get('checkIn') ?? '';
  const checkOut = searchParams.get('checkOut') ?? '';
  const guests = searchParams.get('guests') ?? '';

  const updateFilter = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`${pathname}?${params.toString()}`);
  }, [searchParams, router, pathname]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const params = new URLSearchParams();
    if (location) params.set('neighborhood', location);
    if (beds) params.set('minBedrooms', beds);
    if (baths) params.set('minBathrooms', baths);
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    if (guests) params.set('minOccupancy', guests);

    fetch(`/api/guesty/listings?${params.toString()}`)
      .then((r) => r.json())
      .then((data) => {
        let results: GuestyListing[] = data.listings ?? [];
        // Client-side sort
        if (sort === 'price_asc') results = [...results].sort((a, b) => (a.prices?.basePrice ?? 0) - (b.prices?.basePrice ?? 0));
        else if (sort === 'price_desc') results = [...results].sort((a, b) => (b.prices?.basePrice ?? 0) - (a.prices?.basePrice ?? 0));
        else if (sort === 'beds_desc') results = [...results].sort((a, b) => (b.bedrooms ?? 0) - (a.bedrooms ?? 0));
        setListings(results);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [location, beds, baths, sort, checkIn, checkOut, guests]);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-surface-900 text-white py-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-2">All Properties in Malta</h1>
          <p className="text-surface-400">{loading ? 'Loading...' : `${listings.length} properties available`}</p>

          {/* Search Widget */}
          <div className="mt-8 bg-surface-800 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-4 gap-4 max-w-3xl">
            <div>
              <label className="text-xs uppercase tracking-wider text-surface-400 mb-1 block">Location</label>
              <select
                value={location}
                onChange={(e) => updateFilter('location', e.target.value)}
                className="w-full bg-surface-700 text-white rounded-lg px-3 py-2 text-sm border border-surface-600"
              >
                {LOCATIONS.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-surface-400 mb-1 block">Check-in</label>
              <input
                type="date"
                value={checkIn}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => updateFilter('checkIn', e.target.value)}
                className="w-full bg-surface-700 text-white rounded-lg px-3 py-2 text-sm border border-surface-600"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-surface-400 mb-1 block">Check-out</label>
              <input
                type="date"
                value={checkOut}
                min={checkIn || new Date().toISOString().split('T')[0]}
                onChange={(e) => updateFilter('checkOut', e.target.value)}
                className="w-full bg-surface-700 text-white rounded-lg px-3 py-2 text-sm border border-surface-600"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-surface-400 mb-1 block">Guests</label>
              <div className="flex items-center gap-2">
                <button onClick={() => updateFilter('guests', String(Math.max(1, Number(guests || 2) - 1)))} className="w-8 h-8 bg-surface-600 rounded-lg text-white text-lg">-</button>
                <span className="flex-1 text-center text-sm">{guests || 2} Guests</span>
                <button onClick={() => updateFilter('guests', String(Number(guests || 2) + 1))} className="w-8 h-8 bg-surface-600 rounded-lg text-white text-lg">+</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="sticky top-16 z-40 bg-white dark:bg-surface-900 border-b border-surface-200 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3 flex-wrap">
          <select value={location} onChange={(e) => updateFilter('location', e.target.value)} className="filter-select">
            {LOCATIONS.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
          </select>
          <select value={beds} onChange={(e) => updateFilter('beds', e.target.value)} className="filter-select">
            {BEDS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <select value={baths} onChange={(e) => updateFilter('baths', e.target.value)} className="filter-select">
            {BATHS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>

          <div className="ml-auto flex items-center gap-3">
            <select value={sort} onChange={(e) => updateFilter('sort', e.target.value)} className="filter-select">
              {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <div className="flex border border-surface-200 rounded-lg overflow-hidden">
              <button onClick={() => setViewMode('grid')} className={`p-2 ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white text-surface-600'}`} title="Grid view">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16"><rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/><rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/></svg>
              </button>
              <button onClick={() => setViewMode('list')} className={`p-2 ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-white text-surface-600'}`} title="List view">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16"><rect x="1" y="2" width="14" height="2" rx="1"/><rect x="1" y="7" width="14" height="2" rx="1"/><rect x="1" y="12" width="14" height="2" rx="1"/></svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="container mx-auto px-4 py-10">
        {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6">{error}</div>}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-72 rounded-2xl bg-surface-100 animate-pulse" />
            ))}
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🏠</p>
            <h2 className="text-xl font-semibold mb-2">No properties found</h2>
            <p className="text-surface-500 mb-6">Try adjusting your filters</p>
            <button onClick={() => router.push(pathname)} className="btn-primary px-6 py-2">Clear filters</button>
          </div>
        ) : (
          <PropertyGrid listings={listings} viewMode={viewMode} />
        )}
      </section>
    </main>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p>Loading properties...</p></div>}>
      <PropertiesContent />
    </Suspense>
  );
}
