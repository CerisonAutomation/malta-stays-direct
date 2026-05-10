/**
 * Guesty Booking Engine API (BEAPI) - Server-side proxy client
 *
 * NEVER expose BEAPI_SECRET_KEY to the browser.
 * All calls go through /api/guesty/* Next.js route handlers.
 *
 * Rate limit: allow ~60s between reservation manipulation requests.
 * Reference: https://booking-api-docs.guesty.com/docs/booking-flow
 */

import axios, { AxiosInstance, AxiosError } from 'axios';
import type {
  Listing,
  ListingCard,
  AvailabilityWindow,
  Quote,
  QuoteRequest,
  Reservation,
  GuestInfo,
  PaginatedResponse,
  SearchFilters,
} from '@/types';

const BEAPI_BASE = 'https://booking.guesty.com/api/v1';
const TIMEOUT_MS = 15_000;
const MAX_RETRIES = 2;

function buildHeaders(apiKey: string) {
  return {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
}

function createAxiosInstance(apiKey: string): AxiosInstance {
  return axios.create({
    baseURL: BEAPI_BASE,
    timeout: TIMEOUT_MS,
    headers: buildHeaders(apiKey),
  });
}

// Exponential backoff retry for 429 / 5xx
async function withRetry<T>(fn: () => Promise<T>, retries = MAX_RETRIES): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    const axiosErr = err as AxiosError;
    const status = axiosErr.response?.status ?? 0;
    if (retries > 0 && (status === 429 || status >= 500)) {
      const delay = status === 429 ? 5000 : 1000 * (MAX_RETRIES - retries + 1);
      await new Promise((r) => setTimeout(r, delay));
      return withRetry(fn, retries - 1);
    }
    throw mapGuestyError(axiosErr);
  }
}

export interface GuestyApiError extends Error {
  code: string;
  status: number;
  userMessage: string;
}

function mapGuestyError(err: AxiosError): GuestyApiError {
  const status = err.response?.status ?? 0;
  const body = err.response?.data as Record<string, string> | undefined;

  const codeMap: Record<number, { code: string; userMessage: string }> = {
    400: { code: 'BAD_REQUEST', userMessage: 'Invalid booking request. Please check your dates and guest count.' },
    401: { code: 'AUTH_FAILED', userMessage: 'Booking service authentication failed. Please try again.' },
    403: { code: 'FORBIDDEN', userMessage: 'This action is not permitted.' },
    404: { code: 'NOT_FOUND', userMessage: 'The property or reservation was not found.' },
    409: { code: 'CONFLICT', userMessage: 'These dates are no longer available. Please choose different dates.' },
    422: { code: 'VALIDATION', userMessage: 'Booking details are invalid. Please review your information.' },
    429: { code: 'RATE_LIMITED', userMessage: 'Too many requests. Please wait a moment and try again.' },
    500: { code: 'SERVER_ERROR', userMessage: 'The booking service is temporarily unavailable. Please try again.' },
  };

  const mapped = codeMap[status] ?? { code: 'UNKNOWN', userMessage: 'An unexpected error occurred.' };
  const e = new Error(body?.message ?? mapped.userMessage) as GuestyApiError;
  e.code = mapped.code;
  e.status = status;
  e.userMessage = mapped.userMessage;
  return e;
}

// ---- Public API ----

const apiKey = () => {
  const key = process.env.GUESTY_BEAPI_KEY;
  if (!key) throw new Error('GUESTY_BEAPI_KEY env var is not set');
  return key;
};

export async function getListings(
  filters: SearchFilters = {},
  page = 1,
  limit = 20,
): Promise<PaginatedResponse<ListingCard>> {
  const client = createAxiosInstance(apiKey());
  return withRetry(async () => {
    const { data } = await client.get('/listings', {
      params: {
        skip: (page - 1) * limit,
        limit,
        checkIn: filters.checkIn,
        checkOut: filters.checkOut,
        guestsCount: filters.guests,
        minBedrooms: filters.bedrooms,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
      },
    });
    return {
      data: data.results as ListingCard[],
      total: data.count ?? 0,
      page,
      limit,
      hasMore: data.count > page * limit,
    };
  });
}

export async function getListing(listingId: string): Promise<Listing> {
  const client = createAxiosInstance(apiKey());
  return withRetry(async () => {
    const { data } = await client.get(`/listings/${listingId}`);
    return data as Listing;
  });
}

export async function getAvailability(
  listingId: string,
  from: string,
  to: string,
): Promise<AvailabilityWindow> {
  const client = createAxiosInstance(apiKey());
  return withRetry(async () => {
    const { data } = await client.get(`/listings/${listingId}/availability`, {
      params: { from, to },
    });
    return data as AvailabilityWindow;
  });
}

export async function createQuote(req: QuoteRequest): Promise<Quote> {
  const client = createAxiosInstance(apiKey());
  return withRetry(async () => {
    const { data } = await client.post('/quotes', {
      listingId: req.listingId,
      checkInDateLocalized: req.checkIn,
      checkOutDateLocalized: req.checkOut,
      guestsCount: req.guests.adults + req.guests.children,
      infants: req.guests.infants,
    });
    return data as Quote;
  });
}

export async function createReservation(
  quoteId: string,
  guestInfo: GuestInfo,
  paymentToken: string,
): Promise<Reservation> {
  const client = createAxiosInstance(apiKey());
  return withRetry(async () => {
    const { data } = await client.post('/reservations', {
      quoteId,
      guest: {
        firstName: guestInfo.firstName,
        lastName: guestInfo.lastName,
        email: guestInfo.email,
        phone: guestInfo.phone,
        address: { country: guestInfo.country },
      },
      payment: { token: paymentToken },
      specialRequests: guestInfo.specialRequests,
    });
    return data as Reservation;
  });
}

export async function getReservation(reservationId: string): Promise<Reservation> {
  const client = createAxiosInstance(apiKey());
  return withRetry(async () => {
    const { data } = await client.get(`/reservations/${reservationId}`);
    return data as Reservation;
  });
}
