import { NextRequest, NextResponse } from 'next/server';
import { guestyClient } from '@/lib/guesty/client';

/**
 * GET /api/guesty/availability?listingId=xxx&from=YYYY-MM-DD&to=YYYY-MM-DD
 * Returns blocked/unavailable date ranges for a listing.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const listingId = searchParams.get('listingId');
    const from = searchParams.get('from');
    const to = searchParams.get('to');

    if (!listingId) {
      return NextResponse.json({ error: 'listingId is required' }, { status: 400 });
    }

    const query = new URLSearchParams({ listingId });
    if (from) query.set('startDate', from);
    if (to) query.set('endDate', to);

    const data = await guestyClient(`/availability-pricing/api/v3/listings/availability?${query.toString()}`);

    // Normalise blocked dates into a flat array of ISO date strings
    const blockedDates: string[] = [];
    const days = data?.data?.days ?? {};
    for (const [date, info] of Object.entries(days as Record<string, any>)) {
      if (!info.available) blockedDates.push(date);
    }

    return NextResponse.json({ blockedDates }, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (err: any) {
    console.error('[GET /api/guesty/availability]', err);
    return NextResponse.json(
      { error: err.message ?? 'Internal server error' },
      { status: 500 }
    );
  }
}
