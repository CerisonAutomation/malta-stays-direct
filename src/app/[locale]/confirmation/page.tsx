import { Suspense } from 'react';
import { Link } from '@/i18n/routing';

function ConfirmationContent({ searchParams }: { searchParams: Record<string, string> }) {
  const reservationId = searchParams.reservationId ?? '';
  const email = searchParams.email ?? '';

  return (
    <main className="min-h-screen bg-background flex items-center justify-center py-16 px-4">
      <div className="max-w-lg w-full text-center space-y-8">
        {/* Success Icon */}
        <div className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
          <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-foreground">Booking confirmed!</h1>
          <p className="text-surface-600">
            Thank you for choosing Malta Stays Direct. Your reservation request has been received.
          </p>
        </div>

        {reservationId && (
          <div className="bg-surface-50 border border-surface-200 rounded-2xl p-6 space-y-2">
            <p className="text-sm text-surface-500">Reservation ID</p>
            <p className="font-mono font-semibold text-lg text-foreground">{reservationId}</p>
            {email && (
              <p className="text-sm text-surface-500">
                A confirmation will be sent to <strong>{email}</strong>
              </p>
            )}
          </div>
        )}

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 text-left">
          <strong>What happens next?</strong>
          <ul className="mt-2 space-y-1 list-disc list-inside">
            <li>Our team will review your booking request within 24 hours.</li>
            <li>You will receive a confirmation email with payment details.</li>
            <li>Malta eco tax (&euro;0.50/adult/night) is collected at check-in.</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary px-8 py-3">
            Back to listings
          </Link>
          <a href="mailto:info@maltastaysdirect.com" className="btn-secondary px-8 py-3">
            Contact us
          </a>
        </div>
      </div>
    </main>
  );
}

export default function ConfirmationPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>}>
      <ConfirmationContent searchParams={searchParams} />
    </Suspense>
  );
}
