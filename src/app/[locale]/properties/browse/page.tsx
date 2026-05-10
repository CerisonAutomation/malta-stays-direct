'use client';

import { useState } from 'react';
import Link from 'next/link';
import SearchBar from '@/components/search/SearchBar';

const allProperties = [
  {
    id: 1,
    title: 'Luxury Valletta Penthouse',
    location: 'Valletta',
    area: 'Valletta',
    price: 150,
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    rating: 4.9,
    reviews: 127,
    amenities: ['WiFi', 'Pool', 'Parking', 'AC'],
    featured: true,
  },
  {
    id: 2,
    title: "St Julian's Seafront Apartment",
    location: "St Julian's",
    area: 'St Julians',
    price: 120,
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    rating: 4.8,
    reviews: 89,
    amenities: ['WiFi', 'Sea View', 'AC'],
    featured: true,
  },
  {
    id: 3,
    title: 'Sliema Marina View',
    location: 'Sliema',
    area: 'Sliema',
    price: 135,
    bedrooms: 2,
    bathrooms: 1,
    guests: 4,
    rating: 4.7,
    reviews: 65,
    amenities: ['WiFi', 'Balcony', 'AC'],
    featured: false,
  },
  {
    id: 4,
    title: 'Mdina Historic House',
    location: 'Mdina',
    area: 'Mdina',
    price: 180,
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    rating: 5.0,
    reviews: 43,
    amenities: ['WiFi', 'Garden', 'Parking', 'AC'],
    featured: true,
  },
  {
    id: 5,
    title: 'Gozo Farmhouse Villa',
    location: 'Gozo',
    area: 'Gozo',
    price: 200,
    bedrooms: 4,
    bathrooms: 3,
    guests: 8,
    rating: 4.9,
    reviews: 156,
    amenities: ['WiFi', 'Pool', 'Garden', 'BBQ', 'Parking'],
    featured: false,
  },
  {
    id: 6,
    title: 'Marsaxlokk Harbour View',
    location: 'Marsaxlokk',
    area: 'Marsaxlokk',
    price: 110,
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    rating: 4.6,
    reviews: 92,
    amenities: ['WiFi', 'Sea View', 'Balcony'],
    featured: false,
  },
  {
    id: 7,
    title: 'Valletta Traditional Townhouse',
    location: 'Valletta',
    area: 'Valletta',
    price: 165,
    bedrooms: 3,
    bathrooms: 2,
    guests: 5,
    rating: 4.8,
    reviews: 78,
    amenities: ['WiFi', 'Terrace', 'AC'],
    featured: true,
  },
  {
    id: 8,
    title: "St Julian's Modern Studio",
    location: "St Julian's",
    area: 'St Julians',
    price: 95,
    bedrooms: 0,
    bathrooms: 1,
    guests: 2,
    rating: 4.5,
    reviews: 34,
    amenities: ['WiFi', 'AC'],
    featured: false,
  },
];

export default function BrowsePropertiesPage() {
  const [filters, setFilters] = useState({
    area: 'all',
    minPrice: 0,
    maxPrice: 500,
    bedrooms: 'all',
    sortBy: 'recommended',
  });
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filteredProperties = allProperties.filter((property) => {
    if (filters.area !== 'all' && property.area !== filters.area) return false;
    if (property.price < filters.minPrice || property.price > filters.maxPrice) return false;
    if (filters.bedrooms !== 'all') {
      const bedroomCount = parseInt(filters.bedrooms);
      if (property.bedrooms !== bedroomCount) return false;
    }
    return true;
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return b.featured ? 1 : -1;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with SearchBar */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-6 text-center">
            Browse All Properties
          </h1>
          <SearchBar />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-6">Filters</h2>

              {/* Area Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Area</label>
                <select
                  value={filters.area}
                  onChange={(e) => setFilters({ ...filters, area: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600"
                >
                  <option value="all">All Areas</option>
                  <option value="Valletta">Valletta</option>
                  <option value="St Julians">St Julian's</option>
                  <option value="Sliema">Sliema</option>
                  <option value="Mdina">Mdina</option>
                  <option value="Gozo">Gozo</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">
                  Price Range (€{filters.minPrice} - €{filters.maxPrice})
                </label>
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, maxPrice: parseInt(e.target.value) })
                  }
                  className="w-full"
                />
              </div>

              {/* Bedrooms */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Bedrooms</label>
                <select
                  value={filters.bedrooms}
                  onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600"
                >
                  <option value="all">Any</option>
                  <option value="0">Studio</option>
                  <option value="1">1 Bedroom</option>
                  <option value="2">2 Bedrooms</option>
                  <option value="3">3 Bedrooms</option>
                  <option value="4">4+ Bedrooms</option>
                </select>
              </div>

              <button
                onClick={() =>
                  setFilters({
                    area: 'all',
                    minPrice: 0,
                    maxPrice: 500,
                    bedrooms: 'all',
                    sortBy: 'recommended',
                  })
                }
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
              >
                Reset Filters
              </button>
            </div>
          </aside>

          {/* Results */}
          <main className="lg:w-3/4">
            {/* Toolbar */}
            <div className="bg-white rounded-xl shadow-lg p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="text-gray-600">
                <span className="font-semibold">{sortedProperties.length}</span> properties found
              </div>
              <div className="flex items-center gap-4">
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <div className="flex gap-2">
                  <button
                    onClick={() => setView('grid')}
                    className={`p-2 rounded-lg ${
                      view === 'grid' ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setView('list')}
                    className={`p-2 rounded-lg ${
                      view === 'list' ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Property Grid/List */}
            <div
              className={`grid ${
                view === 'grid' ? 'grid-cols-1 md:grid-cols-2 gap-6' : 'grid-cols-1 gap-4'
              }`}
            >
              {sortedProperties.map((property) => (
                <div
                  key={property.id}
                  className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition ${
                    view === 'list' ? 'flex flex-row' : ''
                  }`}
                >
                  <div
                    className={`bg-gradient-to-br from-amber-100 to-amber-200 ${
                      view === 'list' ? 'w-1/3' : 'h-48'
                    }`}
                  />
                  <div className={`p-6 ${view === 'list' ? 'w-2/3' : ''}`}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold">{property.title}</h3>
                      {property.featured && (
                        <span className="bg-amber-600 text-white px-2 py-1 rounded text-xs font-semibold">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-2 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {property.location}
                    </p>
                    <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                      <span>{property.bedrooms === 0 ? 'Studio' : `${property.bedrooms} beds`}</span>
                      <span>{property.bathrooms} baths</span>
                      <span>{property.guests} guests</span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center text-amber-600">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="ml-1 font-semibold">{property.rating}</span>
                      </div>
                      <span className="text-gray-500">({property.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-amber-600">€{property.price}</span>
                        <span className="text-gray-600">/night</span>
                      </div>
                      <Link
                        href={`/properties/${property.id}`}
                        className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
