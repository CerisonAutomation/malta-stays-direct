'use client';

import { useState } from 'react';
import Link from 'next/link';

const properties = [
  { id: 1, title: 'Valletta Penthouse', location: 'Valletta', lat: 35.8989, lng: 14.5146, price: 150 },
  { id: 2, title: "St Julian's Apartment", location: "St Julian's", lat: 35.9188, lng: 14.4894, price: 120 },
  { id: 3, title: 'Sliema Marina View', location: 'Sliema', lat: 35.9122, lng: 14.5019, price: 135 },
  { id: 4, title: 'Mdina House', location: 'Mdina', lat: 35.8867, lng: 14.4034, price: 180 },
];

export default function MapViewPage() {
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null);

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white">Properties Map View</h1>
          <p className="text-white opacity-90 mt-2">Explore properties across Malta</p>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Map Placeholder */}
        <div className="flex-1 relative bg-gray-100">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <svg
                className="w-24 h-24 mx-auto mb-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
              <h2 className="text-2xl font-bold text-gray-700 mb-2">Interactive Map</h2>
              <p className="text-gray-600 max-w-md">
                Map integration with Leaflet or Mapbox coming soon. For now, browse properties below.
              </p>
            </div>
          </div>

          {/* Map Markers Simulation */}
          <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2">
            {properties.map((property) => (
              <button
                key={property.id}
                onClick={() => setSelectedProperty(property.id)}
                className={`px-4 py-2 rounded-full shadow-lg transition ${
                  selectedProperty === property.id
                    ? 'bg-amber-600 text-white'
                    : 'bg-white text-gray-800 hover:bg-gray-100'
                }`}
              >
                📍 {property.location}
              </button>
            ))}
          </div>
        </div>

        {/* Property List Sidebar */}
        <div className="w-96 bg-white shadow-xl overflow-y-auto">
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4">{properties.length} Properties</h3>
            <div className="space-y-4">
              {properties.map((property) => (
                <div
                  key={property.id}
                  className={`p-4 rounded-xl border-2 transition cursor-pointer ${
                    selectedProperty === property.id
                      ? 'border-amber-600 bg-amber-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedProperty(property.id)}
                >
                  <div className="bg-gradient-to-br from-amber-100 to-amber-200 h-32 rounded-lg mb-3" />
                  <h4 className="font-bold mb-1">{property.title}</h4>
                  <p className="text-sm text-gray-600 mb-2 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {property.location}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-amber-600">€{property.price}</span>
                      <span className="text-gray-600 text-sm">/night</span>
                    </div>
                    <Link
                      href={`/properties/${property.id}`}
                      className="px-3 py-1 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition text-sm"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
