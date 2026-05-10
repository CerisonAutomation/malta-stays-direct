import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

/**
 * next-intl middleware handles:
 * - Locale detection (accept-language header)
 * - Locale prefix routing (/en, /mt)
 * - Redirect / → /en (configured in next.config.ts)
 */
export default createMiddleware(routing);

export const config = {
  // Match all routes except:
  // - Next.js internals (_next/*)
  // - Static assets
  // - API routes (handled separately)
  matcher: [
    '/((?!_next|_vercel|api|.*\\..*).*)'
  ],
};
