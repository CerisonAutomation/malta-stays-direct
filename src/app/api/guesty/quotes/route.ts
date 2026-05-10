import { NextRequest, NextResponse } from 'next/server';
import { createQuote } from '@/lib/guesty/client';
import { z } from 'zod';

export const runtime = 'nodejs';

const QuoteBodySchema = z.object({
  listingId: z.string().min(1),
  checkIn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  checkOut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  guests: z.object({
    adults: z.number().int().min(1).max(20),
    children: z.number().int().min(0).max(20),
    infants: z.number().int().min(0).max(10),
  }),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = QuoteBodySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: { code: 'VALIDATION', message: 'Invalid request body', details: parsed.error.flatten() } },
        { status: 400 },
      );
    }

    const quote = await createQuote(parsed.data);
    return NextResponse.json({ data: quote });
  } catch (err) {
    const error = err as { code?: string; userMessage?: string; status?: number };
    return NextResponse.json(
      { error: { code: error.code ?? 'UNKNOWN', message: error.userMessage ?? 'Failed to create quote' } },
      { status: error.status ?? 500 },
    );
  }
}
