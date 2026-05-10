import { NextRequest, NextResponse } from 'next/server';
import { getListings } from '@/lib/guesty/client';
import type { SearchFilters } from '@/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;

    const filters: SearchFilters = {
      checkIn: searchParams.get('checkIn') ?? undefined,
      checkOut: searchParams.get('checkOut') ?? undefined,
      guests: searchParams.get('guests') ? Number(searchParams.get('guests')) : undefined,
      bedrooms: searchParams.get('bedrooms') ? Number(searchParams.get('bedrooms')) : undefined,
      minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
      maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
    };

    const page = Number(searchParams.get('page') ?? 1);
    const limit = Math.min(Number(searchParams.get('limit') ?? 20), 50);

    const result = await getListings(filters, page, limit);

    return NextResponse.json(result, {
      headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=300' },
    });
  } catch (err) {
    const error = err as { code?: string; userMessage?: string; status?: number };
    return NextResponse.json(
      { error: { code: error.code ?? 'UNKNOWN', message: error.userMessage ?? 'Failed to fetch listings' } },
      { status: error.status ?? 500 },
    );
  }
}
