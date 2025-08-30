import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

// Can be imported from a shared config
export const locales = ['ar', 'en'];
export const defaultLocale = 'ar';

export default getRequestConfig(async ({locale}) => {
  // If middleware didn't run (e.g., for certain metadata or asset requests),
  // fall back to the default locale instead of throwing.
  const resolvedLocale = locales.includes(locale as any)
    ? (locale as any)
    : defaultLocale;

  return {
    messages: (await import(`./messages/${resolvedLocale}.json`)).default
  };
});
