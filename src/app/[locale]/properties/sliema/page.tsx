import Link from 'next/link';

const sliemaProperties = [
  { id: 3, title: 'Sliema Marina View', price: 135, bedrooms: 2, bathrooms: 1, guests: 4, rating: 4.7, reviews: 65 },
  { id: 12, title: 'Sliema Promenade Apartment', price: 125, bedrooms: 1, bathrooms: 1, guests: 3, rating: 4.6, reviews: 48 },
export default function SliemaPropertiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-96 bg-gradient-to-r from-amber-600 to-amber-700 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Properties in Sliema</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto px-4">
            Stay in Malta's sophisticated shopping and residential district with stunning sea views
          </p>
        </div>
      </div>

      <div className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div><span className="text-2xl font-bold text-amber-600">{sliemaProperties.length}</span><span className="text-gray-600 ml-2">properties available</span></div>
            <div className="flex gap-2">
              <Link href="/properties/browse" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">View All Areas</Link>
              <Link href="/properties/map" className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition">Map View</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">About Sliema</h2>
          <p className="text-gray-700 leading-relaxed">Sliema is a cosmopolitan town with a beautiful promenade, excellent shopping, and waterfront dining. Perfect for those who want a modern, vibrant base with easy access to Valletta.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sliemaProperties.map((property) => (
            <div key={property.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-amber-100 to-amber-200 h-56" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{property.title}</h3>
                <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                  <span>{property.bedrooms} beds</span><span>{property.bathrooms} baths</span><span>{property.guests} guests</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center text-amber-600">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    <span className="ml-1 font-semibold">{property.rating}</span>
                  </div>
                  <span className="text-gray-500">({property.reviews} reviews)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div><span className="text-2xl font-bold text-amber-600">€{property.price}</span><span className="text-gray-600">/night</span></div>
                  <Link href={`/properties/${property.id}`} className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition">View</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-amber-600 to-amber-700 py-16 mt-12">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Explore More Properties</h2>
          <Link href="/properties/browse" className="inline-block px-8 py-3 bg-white text-amber-600 rounded-full font-semibold hover:bg-gray-100 transition">View All Properties</Link>
        </div>
      </div>
    </div>
  );
}
