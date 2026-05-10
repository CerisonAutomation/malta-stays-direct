import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'Portfolio' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

const properties = [
  {
    id: 1,
    title: 'Luxury Valletta Penthouse',
    location: 'Valletta',
    image: '/images/properties/valletta-1.jpg',
    price: '€150',
    bedrooms: 2,
    bathrooms: 2,
    featured: true,
  },
  {
    id: 2,
    title: 'St Julian\'s Seafront Apartment',
    location: 'St Julian\'s',
    image: '/images/properties/st-julians-1.jpg',
    price: '€120',
    bedrooms: 1,
    bathrooms: 1,
    featured: true,
  },
  {
    id: 3,
    title: 'Sliema Marina View',
    location: 'Sliema',
    image: '/images/properties/sliema-1.jpg',
    price: '€135',
    bedrooms: 2,
    bathrooms: 1,
    featured: false,
  },
  {
    id: 4,
    title: 'Mdina Historic House',
    location: 'Mdina',
    image: '/images/properties/mdina-1.jpg',
    price: '€180',
    bedrooms: 3,
    bathrooms: 2,
    featured: true,
  },
  {
    id: 5,
    title: 'Gozo Farmhouse Villa',
    location: 'Gozo',
    image: '/images/properties/gozo-1.jpg',
    price: '€200',
    bedrooms: 4,
    bathrooms: 3,
    featured: false,
  },
  {
    id: 6,
    title: 'Marsaxlokk Harbour View',
    location: 'Marsaxlokk',
    image: '/images/properties/marsaxlokk-1.jpg',
    price: '€110',
    bedrooms: 1,
    bathrooms: 1,
    featured: false,
  },
];

export default function PortfolioPage() {
  const t = useTranslations('Portfolio');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-amber-600 to-amber-700">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('title')}
            </h1>
            <p className="text-xl opacity-90">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-6 py-2 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition">
              All Properties
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition">
              Valletta
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition">
              St Julian's
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition">
              Sliema
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition">
              Featured Only
            </button>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <div
                key={property.id}
                className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative h-64 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200" />
                  {property.featured && (
                    <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-amber-600 transition">
                    {property.title}
                  </h3>
                  <p className="text-gray-600 mb-4 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {property.location}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        {property.bedrooms} beds
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {property.bathrooms} baths
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-amber-600">{property.price}</span>
                      <span className="text-gray-600">/night</span>
                    </div>
                    <Link
                      href={`/properties/${property.id}`}
                      className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-amber-700">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Malta?</h2>
          <p className="text-xl mb-8 opacity-90">
            Book your perfect accommodation today
          </p>
          <Link
            href="/book"
            className="inline-block px-8 py-3 bg-white text-amber-600 rounded-full font-semibold hover:bg-gray-100 transition"
          >>
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
}
