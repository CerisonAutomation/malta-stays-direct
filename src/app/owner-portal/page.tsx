'use client';

import { useState } from 'react';
import Link from 'next/link';

const MOCK_STATS = [
  { label: 'Properties', value: '3' },
  { label: 'This Month Revenue', value: '\u20ac1,240' },
  { label: 'Occupancy Rate', value: '78%' },
  { label: 'Pending Payouts', value: '\u20ac620' },
];

const MOCK_RESERVATIONS = [
  { id: 'RES001', property: 'Valletta Apartment', guest: 'John Smith', checkIn: '2025-07-10', checkOut: '2025-07-17', amount: '\u20ac1,050', status: 'confirmed' },
  { id: 'RES002', property: 'Sliema Sea View', guest: 'Maria Rossi', checkIn: '2025-07-15', checkOut: '2025-07-22', amount: '\u20ac840', status: 'confirmed' },
  { id: 'RES003', property: 'St Julian\'s Studio', guest: 'Alex Brown', checkIn: '2025-07-28', checkOut: '2025-08-04', amount: '\u20ac700', status: 'pending' },
];

export default function OwnerPortalPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'reservations' | 'payouts'>('overview');

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Owner Portal</h1>
            <p className="text-gray-400 text-sm mt-1">Manage your properties and track earnings</p>
          </div>
          <Link href="/" className="text-amber-400 hover:text-amber-300 text-sm font-medium">
            &larr; Back to Site
          </Link>
        </div>
        {/* Tabs */}
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1 border-b border-gray-700">
            {(['overview', 'reservations', 'payouts'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 text-sm font-medium capitalize transition border-b-2 -mb-px ${
                  activeTab === tab
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-gray-400 hover:text-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {MOCK_STATS.map((stat) => (
                <div key={stat.label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Recent Reservations */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">Recent Reservations</h2>
                <button onClick={() => setActiveTab('reservations')} className="text-amber-600 text-sm hover:underline">View all</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      {['Property', 'Guest', 'Check-in', 'Check-out', 'Amount', 'Status'].map((h) => (
                        <th key={h} className="px-5 py-3 text-left font-medium text-gray-500">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {MOCK_RESERVATIONS.map((res) => (
                      <tr key={res.id} className="hover:bg-gray-50 transition">
                        <td className="px-5 py-3 font-medium text-gray-900">{res.property}</td>
                        <td className="px-5 py-3 text-gray-600">{res.guest}</td>
                        <td className="px-5 py-3 text-gray-600">{res.checkIn}</td>
                        <td className="px-5 py-3 text-gray-600">{res.checkOut}</td>
                        <td className="px-5 py-3 font-semibold text-gray-900">{res.amount}</td>
                        <td className="px-5 py-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            res.status === 'confirmed'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}>
                            {res.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reservations' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">All Reservations</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    {['ID', 'Property', 'Guest', 'Check-in', 'Check-out', 'Amount', 'Status'].map((h) => (
                      <th key={h} className="px-5 py-3 text-left font-medium text-gray-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {MOCK_RESERVATIONS.map((res) => (
                    <tr key={res.id} className="hover:bg-gray-50 transition">
                      <td className="px-5 py-3 text-gray-400 font-mono text-xs">{res.id}</td>
                      <td className="px-5 py-3 font-medium text-gray-900">{res.property}</td>
                      <td className="px-5 py-3 text-gray-600">{res.guest}</td>
                      <td className="px-5 py-3 text-gray-600">{res.checkIn}</td>
                      <td className="px-5 py-3 text-gray-600">{res.checkOut}</td>
                      <td className="px-5 py-3 font-semibold text-gray-900">{res.amount}</td>
                      <td className="px-5 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          res.status === 'confirmed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {res.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'payouts' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <div className="text-4xl mb-4">\uD83D\uDCB0</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Payouts</h2>
            <p className="text-gray-500 mb-6">Your payout history and upcoming payments will appear here once integrated with your payment provider.</p>
            <Link href="/contact" className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-xl transition">
              Contact Us to Set Up Payouts
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
