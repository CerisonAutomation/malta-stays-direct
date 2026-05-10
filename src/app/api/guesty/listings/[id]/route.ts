import { NextRequest, NextResponse } from 'next/server';
import { guestyClient } from '@/lib/guesty/client';

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: 'Missing listing id' }, { status: 400 });
    }

    const listing = await guestyClient(`/listings/${id}?fields=_id,title,nickname,pictures,bedrooms,bathrooms,accommodates,address,amenities,publicDescription,prices,terms,checkInTime,checkOutTime,customFields,tags,accountId`);

    return NextResponse.json({ listing }, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (err: any) {
    console.error('[GET /api/guesty/listings/[id]]', err);
    const status = err.status ?? 500;
    return NextResponse.json(
      { error: err.message ?? 'Internal server error' },
      { status }
    );
  }
}
