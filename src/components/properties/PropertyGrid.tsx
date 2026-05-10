import type { ListingCard } from '@/types';
import { PropertyCard } from './PropertyCard';

interface PropertyGridProps {
  listings: ListingCard[];
  locale: string;
}

export function PropertyGrid({ listings, locale }: PropertyGridProps) {
  if (listings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-lg font-medium text-surface-700">No properties found</p>
        <p className="mt-2 text-sm text-surface-400">Try adjusting your filters or dates.</p>
      </div>
    );
  }

  return (
    <ul
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      aria-label="Available properties"
    >
      {listings.map((listing, index) => (
        <li key={listing.id}>
          <PropertyCard
            listing={listing}
            locale={locale}
            priority={index < 3}
          />
        </li>
      ))}
    </ul>
  );
}
