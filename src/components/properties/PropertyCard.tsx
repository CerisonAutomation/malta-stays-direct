'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Users, BedDouble, Bath, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ListingCard } from '@/types';
import { cn } from '@/lib/utils';

interface PropertyCardProps {
  listing: ListingCard;
  locale: string;
  priority?: boolean;
}

export function PropertyCard({ listing, locale, priority = false }: PropertyCardProps) {
  const heroImage = listing.images.sort((a, b) => a.position - b.position)[0];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-card hover:shadow-card-hover transition-shadow duration-300"
    >
      {/* Image */}
      <Link href={`/${locale}/properties/${listing.id}`} className="block aspect-[4/3] overflow-hidden">
        {heroImage ? (
          <Image
            src={heroImage.url}
            alt={listing.title}
            fill
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="h-full w-full bg-surface-100" />
        )}

        {/* Instant book badge */}
        {listing.isInstantBook && (
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-brand-500 px-2.5 py-1 text-xs font-semibold text-white shadow">
            <Zap className="h-3 w-3" />
            Instant book
          </span>
        )}
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-medium uppercase tracking-widest text-surface-400">
          {listing.type} &bull; {listing.location.city}
        </p>

        <Link href={`/${locale}/properties/${listing.id}`}>
          <h3 className="mt-1 line-clamp-2 font-serif text-lg font-semibold text-surface-900 group-hover:text-brand-600 transition-colors">
            {listing.title}
          </h3>
        </Link>

        {/* Stats */}
        <dl className="mt-3 flex gap-4 text-sm text-surface-500">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" aria-hidden />
            <dt className="sr-only">Guests</dt>
            <dd>{listing.maxGuests}</dd>
          </div>
          <div className="flex items-center gap-1">
            <BedDouble className="h-4 w-4" aria-hidden />
            <dt className="sr-only">Bedrooms</dt>
            <dd>{listing.bedrooms} bed</dd>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" aria-hidden />
            <dt className="sr-only">Bathrooms</dt>
            <dd>{listing.bathrooms} bath</dd>
          </div>
        </dl>

        {/* Price */}
        <div className="mt-auto pt-4 flex items-baseline justify-between border-t border-surface-100">
          <p className="text-surface-500 text-sm">From</p>
          <p className="text-xl font-bold text-surface-900">
            <span className="text-brand-600">€{listing.basePrice.toLocaleString()}</span>
            <span className="text-sm font-normal text-surface-400"> / night</span>
          </p>
        </div>
      </div>
    </motion.article>
  );
}
