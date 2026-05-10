import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Validate the locale is supported, fallback to default
  if (!locale || !routing.locales.includes(locale as 'en' | 'mt')) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
    timeZone: 'Europe/Malta',
    now: new Date(),
    formats: {
      dateTime: {
        short: {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        },
      },
      number: {
        precise: {
          maximumFractionDigits: 5,
        },
      },
    },
  };
});
