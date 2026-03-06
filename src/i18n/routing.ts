import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'pl'],
  defaultLocale: 'pl',
  localePrefix: 'always', // prefiks w URL dla KAŻDEGO języka
  pathnames: {
    '/': '/',

    // lokalizowane slugi
    '/about': { en: '/about', pl: '/o-nas' }
  }
});
