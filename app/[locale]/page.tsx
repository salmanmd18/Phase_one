import HomeClient from '@/components/HomeClient';

export default function Page() {
  return <HomeClient />;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: 'ar' | 'en' };
}) {
  const { locale } = params;
  const title =
    locale === 'ar'
      ? 'أماكن الدمام — الصفحة الرئيسية'
      : 'Dammam Venues — Home';
  const description =
    locale === 'ar'
      ? 'اكتشف أفضل الأماكن والخدمات في الدمام.'
      : 'Discover top venues and services in Dammam.';
  return {
    title,
    description,
    alternates: { canonical: `/${locale}`, languages: { ar: '/ar', en: '/en' } },
    openGraph: {
      title,
      description,
      locale,
      type: 'website',
      images: [
        'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&w=1200&auto=format&fit=crop',
      ],
    },
  } as const;
}

