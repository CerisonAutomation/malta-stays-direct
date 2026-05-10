'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, MapPin, Users, Search } from 'lucide-react';
import { format } from 'date-fns';

interface SearchBarProps {
  locale: string;
}

export function SearchBar({ locale }: SearchBarProps) {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(2);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (checkIn) params.append('checkIn', format(checkIn, 'yyyy-MM-dd'));
    if (checkOut) params.append('checkOut', format(checkOut, 'yyyy-MM-dd'));
    if (guests) params.append('guests', guests.toString());
    
    router.push(`/${locale}/properties?${params.toString()}`);
  };

  return (
    <div className="mx-auto mt-8 w-full max-w-6xl">
      <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-2xl md:flex-row md:items-end">
        <div className="flex-1">
          <label className="mb-2 block text-sm font-medium text-surface-700">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-surface-400" />
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Where are you going?" className="w-full rounded-lg border border-surface-200 py-3 pl-10 pr-4 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20" />
          </div>
        </div>
        <div className="flex-1">
          <label className="mb-2 block text-sm font-medium text-surface-700">Check-in</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-surface-400" />
            <input type="date" onChange={(e) => setCheckIn(e.target.valueAsDate)} className="w-full rounded-lg border border-surface-200 py-3 pl-10 pr-4 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20" />
          </div>
        </div>
        <div className="flex-1">
          <label className="mb-2 block text-sm font-medium text-surface-700">Check-out</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-surface-400" />
            <input type="date" onChange={(e) => setCheckOut(e.target.valueAsDate)} className="w-full rounded-lg border border-surface-200 py-3 pl-10 pr-4 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20" />
          </div>
        </div>
        <div className="flex-1">
          <label className="mb-2 block text-sm font-medium text-surface-700">Guests</label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-surface-400" />
            <input type="number" value={guests} onChange={(e) => setGuests(Number(e.target.value))} min="1" max="16" className="w-full rounded-lg border border-surface-200 py-3 pl-10 pr-4 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20" />
          </div>
        </div>
        <div>
          <button onClick={handleSearch} className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-500 px-8 py-3 font-semibold text-white transition-all hover:bg-brand-600 active:scale-95 md:w-auto">
            <Search className="h-5 w-5" />
            <span>Search</span>
          </button>
        </div>
      </div>
    </div>
  );
}
