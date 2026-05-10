// ============================================================
// Malta Stays Direct — Core TypeScript Types
// ============================================================

export type Locale = 'en' | 'mt';

// --- Listing / Property ---
export interface ListingImage {
  url: string;
  caption?: string;
  position: number;
}

export interface ListingLocation {
  city: string;
  country: string;
  lat?: number;
  lng?: number;
  address?: string;
  neighbourhood?: string;
}

export interface ListingAmenity {
  category: string;
  name: string;
}

export interface ListingPolicy {
  checkInTime: string;   // e.g. "15:00"
  checkOutTime: string;  // e.g. "11:00"
  minNights: number;
  maxNights?: number;
  cancellationPolicy: string;
  houseRules?: string[];
  petsAllowed: boolean;
  smokingAllowed: boolean;
  eventsAllowed: boolean;
  infantsAllowed: boolean;
  childrenAllowed: boolean;
}

export interface Listing {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: string;
  images: ListingImage[];
  location: ListingLocation;
  amenities: ListingAmenity[];
  policy: ListingPolicy;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  beds: number;
  basePrice: number;     // EUR, per night
  currency: 'EUR';
  cleaningFee?: number;
  securityDeposit?: number;
  isInstantBook: boolean;
  isActive: boolean;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export type ListingCard = Pick<
  Listing,
  'id' | 'slug' | 'title' | 'type' | 'location' | 'images' |
  'maxGuests' | 'bedrooms' | 'bathrooms' | 'basePrice' | 'currency' | 'isInstantBook'
>;

// --- Availability ---
export interface AvailabilityWindow {
  listingId: string;
  blockedDates: string[];   // ISO date strings YYYY-MM-DD
  minNightsByDate: Record<string, number>;
}

// --- Quote ---
export interface QuoteRequest {
  listingId: string;
  checkIn: string;   // YYYY-MM-DD
  checkOut: string;  // YYYY-MM-DD
  guests: GuestCounts;
}

export interface GuestCounts {
  adults: number;
  children: number;
  infants: number;
  pets?: number;
}

export interface QuoteFee {
  name: string;
  amount: number;
  type: 'CLEANING' | 'ECO_TAX' | 'SERVICE' | 'OTHER';
  isIncluded: boolean;  // false = collected separately
  note?: string;
}

export interface Quote {
  quoteId: string;
  listingId: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: GuestCounts;
  baseAmount: number;
  fees: QuoteFee[];
  taxes: QuoteFee[];
  totalAmount: number;
  currency: 'EUR';
  expiresAt: string;   // ISO datetime; Guesty BEAPI ~60s window
  isInstantBook: boolean;
}

// --- Reservation ---
export interface GuestInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  specialRequests?: string;
}

export interface PaymentInfo {
  method: 'STRIPE' | 'CARD';
  token: string;        // tokenized; never raw card data
  lastFour?: string;
  brand?: string;
}

export type ReservationStatus =
  | 'INQUIRY'
  | 'PENDING'
  | 'CONFIRMED'
  | 'DECLINED'
  | 'CANCELED'
  | 'CHECKED_IN'
  | 'CHECKED_OUT';

export interface Reservation {
  reservationId: string;
  confirmationCode: string;
  listingId: string;
  quoteId: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: GuestCounts;
  guestInfo: GuestInfo;
  status: ReservationStatus;
  totalAmount: number;
  currency: 'EUR';
  isInstantBook: boolean;
  createdAt: string;
}

// --- API Responses ---
export interface ApiSuccess<T> {
  data: T;
  meta?: Record<string, unknown>;
}

export interface ApiError {
  code: string;
  message: string;
  field?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// --- Search / Filters ---
export interface SearchFilters {
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  amenities?: string[];
  type?: string;
}

// --- GA4 Ecommerce ---
export interface GA4Item {
  item_id: string;
  item_name: string;
  item_category: string;
  price: number;
  quantity: number;
}
