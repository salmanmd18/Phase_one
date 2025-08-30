export default function CheckoutLayout({children}:{children: React.ReactNode}){
  return children as React.ReactElement;
}

export async function generateMetadata({params}:{params:{locale:'ar'|'en'}}){
  const {locale} = params;
  const title = locale==='ar' ? 'الدفع — الدمام' : 'Checkout — Dammam';
  const description = locale==='ar' ? 'ملخص الحجز ومعلومات التواصل (تجريبي).' : 'Booking summary and contact info (demo).';
  return {
    title,
    description,
    alternates: { canonical: `/${locale}/checkout`, languages: { ar: '/ar/checkout', en: '/en/checkout' } },
    openGraph: { title, description, locale, type: 'website', images: ['https://images.unsplash.com/photo-1556906772-0d5056c614a6?q=80&w=1200&auto=format&fit=crop'] }
  } as const;
}

