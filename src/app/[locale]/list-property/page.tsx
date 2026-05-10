import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'ListProperty' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

const benefits = [
  {
    icon: '💰',
    title: 'Maximize Revenue',
    description: 'Dynamic pricing algorithms ensure you get the best rates year-round',
  },
  {
    icon: '🛡️',
    title: 'Full Protection',
    description: 'Comprehensive insurance and host guarantee up to €1,000,000',
  },
  {
    icon: '⚡',
    title: 'Instant Bookings',
    description: 'Get booked faster with our advanced marketing and SEO',
  },
  {
    icon: '🧹',
    title: 'Professional Management',
    description: 'Optional cleaning, maintenance, and guest services',
  },
  {
    icon: '📊',
    title: 'Analytics Dashboard',
    description: 'Track performance, earnings, and occupancy in real-time',
  },
  {
    icon: '🤝',
    title: 'Dedicated Support',
    description: '24/7 owner and guest support in multiple languages',
  },
];

const pricingTiers = [
  {
    name: 'Essential',
    price: '10%',
    description: 'Perfect for hands-on owners',
    features: [
      'Online booking platform',
      'Calendar management',
      'Payment processing',
      'Basic analytics',
      'Email support',
    ],
  },
  {
    name: 'Premium',
    price: '15%',
    description: 'Most popular choice',
    features: [
      'Everything in Essential',
      'Professional photography',
      'Dynamic pricing',
      'Priority support',
      'Marketing campaigns',
      'Guest screening',
    ],
    popular: true,
  },
  {
    name: 'Full Service',
    price: '20%',
    description: 'Completely hands-free',
    features: [
      'Everything in Premium',
      'Property management',
      'Cleaning services',
      'Maintenance coordination',
      'Concierge services',
      'Legal compliance',
    ],
  },
];

export default function ListPropertyPage() {
  const t = useTranslations('ListProperty');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-amber-600 to-amber-700">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              List Your Property in Malta
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Join Malta's premier property management platform and start earning more
            </p>
            <Link
              href="#get-started"
              className="inline-block px-8 py-4 bg-white text-amber-600 rounded-full font-semibold hover:bg-gray-100 transition text-lg"
            >
              Get Started - It's Free
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-amber-600 mb-2">2,500+</div>
              <div className="text-gray-600">Active Properties</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-600 mb-2">95%</div>
              <div className="text-gray-600">Occupancy Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-600 mb-2">€850</div>
              <div className="text-gray-600">Avg. Nightly Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-600 mb-2">4.9/5</div>
              <div className="text-gray-600">Owner Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition"
              >
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Simple, Transparent Pricing</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            No hidden fees. Only pay when you get paid. Cancel anytime.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-lg p-8 relative ${
                  tier.popular ? 'ring-2 ring-amber-600 transform scale-105' : ''
                }`}
              >
                {tier.popular && (
                  <div className="absolute top-0 right-0 bg-amber-600 text-white px-4 py-1 rounded-bl-xl rounded-tr-xl text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <div className="text-4xl font-bold text-amber-600 mb-2">{tier.price}</div>
                <p className="text-gray-600 mb-6">commission per booking</p>
                <p className="text-sm text-gray-500 mb-6">{tier.description}</p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg
                        className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="#get-started"
                  className={`block text-center px-6 py-3 rounded-lg font-semibold transition ${
                    tier.popular
                      ? 'bg-amber-600 text-white hover:bg-amber-700'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Choose {tier.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Started Form Section */}
      <section id="get-started" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Ready to Get Started?</h2>
            <p className="text-center text-gray-600 mb-12">
              Fill out the form below and our team will contact you within 24 hours
            </p>
            <form className="bg-gray-50 p-8 rounded-xl shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">First Name *</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Last Name *</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Email *</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Phone *</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Property Address *</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Property Type *</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent">
                    <option>Apartment</option>
                    <option>House</option>
                    <option>Villa</option>
                    <option>Townhouse</option>
                    <option>Farmhouse</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Bedrooms *</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent">
                    <option>Studio</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4+</option>
                  </select>
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Pricing Tier *</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent">
                  <option>Essential (10%)</option>
                  <option>Premium (15%)</option>
                  <option>Full Service (20%)</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Additional Information</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                  placeholder="Tell us more about your property..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-amber-600 text-white py-4 rounded-lg font-semibold hover:bg-amber-700 transition"
              >
                Submit Property Listing Request
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-lg font-bold mb-2">How quickly can I start receiving bookings?</h3>
              <p className="text-gray-600">
                Most properties are listed within 72 hours and start receiving bookings within the first week.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-lg font-bold mb-2">What if I want to use my property myself?</h3>
              <p className="text-gray-600">
                You have full control over your calendar and can block dates whenever you need personal use.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-lg font-bold mb-2">When do I receive payments?</h3>
              <p className="text-gray-600">
                Payments are processed within 24 hours after guest check-in and transferred to your account.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
