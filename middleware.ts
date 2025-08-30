import createMiddleware from 'next-intl/middleware';
import {locales, defaultLocale} from './i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
  // Force default to Arabic instead of browser language detection
  localeDetection: false
});

export const config = {
  matcher: ['/', '/(ar|en)/:path*']
};
