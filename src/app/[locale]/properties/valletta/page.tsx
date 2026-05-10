import Link from 'next/link';

const vallettaProperties = [
  {
    id: 1,
    title: 'Luxury Valletta Penthouse',
    price: 150,
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    rating: 4.9,
    reviews: 127,
  },
  {
    id: 7,
    title: 'Traditional Valletta Townhouse',
    price: 165,
    bedrooms: 3,
    bathrooms: 2,
    guests: 5,
    rating: 4.8,
    reviews: 78,
  },
  {
    id: 10,
    title: 'Valletta Harbor View Apartment',
    price: 145,
    bedrooms: 2,
    bathrooms: 1,
    guests: 4,
    rating: 4.7,
    reviews: 92,
  },
];

export default function VallettaPropertiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="relative h-96 bg-gradient-to-r from-amber-600 to-amber-700 flex items-center justify-center"
        style={{ backgroundImage: 'linear-gradient(rgba(217, 119, 6, 0.8), rgba(180, 83, 9, 0.8))' }}
      >
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Properties in Valletta</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto px-4">
            Discover luxury accommodations in Malta's historic capital city, a UNESCO World Heritage Site
          </p>
        </div>
      </div>

      {/* Info Bar */}
      <div className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-2xl font-bold text-amber-600">{vallettaProperties.length}</span>
              <span className="text-gray-600 ml-2">properties available</span>
            </div>
            <div className="flex gap-2">
              <Link
                href="/properties/browse"
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
              >
                View All Areas
              </Link>
              <Link
                href="/properties/map"
                className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
              >
                Map View
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* About Valletta */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">About Valletta</h2>
          <p className="text-gray-700 leading-relaxed">
            Valletta, Malta's capital, is a fortified city located on a peninsula in the central-eastern
            portion of Malta. Built by the Knights of St. John, it is one of the most concentrated historic
            areas in the world. Staying in Valletta puts you at the heart of Maltese culture, history, and
            nightlife, with baroque architecture, museums, and stunning harbor views.
          </p>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vallettaProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="bg-gradient-to-br from-amber-100 to-amber-200 h-56" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{property.title}</h3>
                <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                  <span>{property.bedrooms} beds</span>
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
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 py-16 mt-12">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-xl mb-8 opacity-90">
            Browse all properties or contact us for personalized recommendations
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/properties/browse"
              className="px-8 py-3 bg-white text-amber-600 rounded-full font-semibold hover:bg-gray-100 transition"
            >
              View All Properties
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-amber-600 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
