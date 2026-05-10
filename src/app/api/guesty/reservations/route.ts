import { NextRequest, NextResponse } from 'next/server';
import { guestyClient } from '@/lib/guesty/client';

interface ReservationBody {
  listingId: string;
  checkIn: string;
  checkOut: string;
  guestsCount: number;
  guest: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  specialRequests?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: ReservationBody = await req.json();
    const { listingId, checkIn, checkOut, guestsCount, guest, specialRequests } = body;

    if (!listingId || !checkIn || !checkOut || !guest?.email) {
      return NextResponse.json(
        { error: 'Missing required fields: listingId, checkIn, checkOut, guest.email' },
        { status: 400 }
      );
    }

    // Create or find guest in Guesty
    const guestPayload = {
      firstName: guest.firstName,
      lastName: guest.lastName,
      email: guest.email,
      phone: guest.phone,
    };

    let guestId: string;
    try {
      const guestRes = await guestyClient('/guests-crud', {
        method: 'POST',
        body: JSON.stringify(guestPayload),
      });
      guestId = guestRes._id;
    } catch {
      // Guest may already exist; search by email
      const search = await guestyClient(`/guests-crud?email=${encodeURIComponent(guest.email)}`);
      const existing = search.results?.[0];
      if (!existing) throw new Error('Could not create or find guest');
      guestId = existing._id;
    }

    // Create the reservation
    const reservationPayload = {
      listingId,
      checkInDateLocalized: checkIn,
      checkOutDateLocalized: checkOut,
      guestsCount,
      guestId,
      status: 'inquiry',
      source: 'direct',
      ...(specialRequests ? { notes: specialRequests } : {}),
    };

    const reservation = await guestyClient('/reservations', {
      method: 'POST',
      body: JSON.stringify(reservationPayload),
    });

    return NextResponse.json(
      { reservationId: reservation._id, status: reservation.status },
      { status: 201 }
    );
  } catch (err: any) {
    console.error('[POST /api/guesty/reservations]', err);
    return NextResponse.json(
      { error: err.message ?? 'Internal server error' },
      { status: 500 }
    );
  }
}
