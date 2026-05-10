import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'mt'],
  defaultLocale: 'en',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/properties': {
      en: '/properties',
      mt: '/propjetajiet',
    },
    '/properties/[id]': {
      en: '/properties/[id]',
      mt: '/propjetajiet/[id]',
    },
    '/checkout': {
      en: '/checkout',
      mt: '/hlas',
    },
    '/confirm': {
      en: '/confirm',
      mt: '/konferm',
    },
    '/property-owners': {
      en: '/property-owners',
      mt: '/sidien-ta-propjeta',
    },
    '/privacy-policy': '/privacy-policy',
    '/terms': '/terms',
  },
});

export type AppPathnames = keyof typeof routing.pathnames;
