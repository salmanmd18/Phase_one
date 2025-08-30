import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';
import '../globals.css';
import Header from '@/components/Header';
import {Inter, IBM_Plex_Sans_Arabic} from 'next/font/google';

const inter = Inter({subsets: ['latin'], display: 'swap'});
const ibmArabic = IBM_Plex_Sans_Arabic({subsets: ['arabic'], weight: ['400','500','600','700'], display: 'swap'});

export default async function LocaleLayout({
  children, params: {locale}
}: {children: React.ReactNode; params: {locale: string}}) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }
  const dir = locale.startsWith('ar') ? 'rtl' : 'ltr';
  const fontClass = dir === 'rtl' ? ibmArabic.className : inter.className;

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning className={fontClass}>
      <body className="antialiased bg-slate-50 text-slate-800">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
          <footer className="border-t mt-8">
            <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-slate-500 flex flex-col sm:flex-row gap-2 sm:items-center justify-between">
              <div>{/* demo note from messages */}</div>
              <div>© 2025 Dammam Venues</div>
            </div>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export async function generateMetadata({params}:{params:{locale:'ar'|'en'}}) {
  const {locale} = params;
  const title = locale === 'ar' ? 'أماكن الدمام — حجز منتجعات وقاعات' : 'Dammam Venues — Resorts & Halls';
  const description = locale === 'ar'
    ? 'احجز أماكنك في الدمام بسهولة: منتجعات، قاعات، وخدمات مميزة.'
    : 'Book premium venues in Dammam with ease: resorts, halls, and services.';
  return {
    title,
    description,
    alternates: {
      languages: {
        ar: '/ar',
        en: '/en'
      }
    },
    openGraph: {
      title,
      description,
      locale,
      type: 'website'
    }
  } as const;
}
