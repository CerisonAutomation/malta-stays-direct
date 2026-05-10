import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, differenceInCalendarDays, parseISO } from 'date-fns';

/** Merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a price as EUR */
export function formatEur(amount: number): string {
  return new Intl.NumberFormat('en-MT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Format a date for display */
export function formatDate(dateStr: string, fmt = 'dd MMM yyyy'): string {
  return format(parseISO(dateStr), fmt);
}

/** Number of nights between two ISO date strings */
export function nightsBetween(checkIn: string, checkOut: string): number {
  return Math.max(0, differenceInCalendarDays(parseISO(checkOut), parseISO(checkIn)));
}

/** Convert a Date to YYYY-MM-DD */
export function toISODate(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

/** Malta eco-tax calculator (2025 rates) */
export function calcEcoTax(adults: number, nights: number): number {
  // €0.50 per adult per night; exempt under 18
  return adults * nights * 0.5;
}

/** Build an absolute URL from a path */
export function absoluteUrl(path: string): string {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (typeof window !== 'undefined' ? window.location.origin : 'https://maltastaysdirect.com');
  return `${base.replace(/\/$/, '')}${path}`;
}

/** Truncate a string to maxLen characters */
export function truncate(str: string, maxLen: number): string {
  return str.length <= maxLen ? str : `${str.slice(0, maxLen)}...`;
}

/** Build a GA4-compatible currency value (2 decimal places) */
export function ga4Value(amount: number): number {
  return Math.round(amount * 100) / 100;
}
