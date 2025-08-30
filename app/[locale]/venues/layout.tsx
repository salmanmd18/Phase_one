export default function VenuesLayout({children}:{children: React.ReactNode}){
  return children as React.ReactElement;
}

export async function generateMetadata({params}:{params:{locale:'ar'|'en'}}){
  const {locale} = params;
  const title = locale==='ar' ? 'أماكن الدمام — المنتجعات والقاعات' : 'Dammam Venues — Resorts & Halls';
  const description = locale==='ar' ? 'تصفح قائمة الأماكن في الدمام مع فلاتر بسيطة.' : 'Browse Dammam venues with simple filters.';
  return {
    title,
    description,
    alternates: { canonical: `/${locale}/venues`, languages: { ar: '/ar/venues', en: '/en/venues' } },
    openGraph: { title, description, locale, type: 'website', images: ['https://images.unsplash.com/photo-1501117716987-c8e86df5382f?q=80&w=1200&auto=format&fit=crop'] }
  } as const;
}

