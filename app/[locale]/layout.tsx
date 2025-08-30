import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';
import '../globals.css';
import Header from '@/components/Header';

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

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body>
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
