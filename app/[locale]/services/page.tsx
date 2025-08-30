import {useLocale, useTranslations} from 'next-intl';

type Provider = { id: string; name_en: string; name_ar: string; priceTag_en: string; priceTag_ar: string };
type Category = { id: string; name_en: string; name_ar: string; providers: Provider[] };

const services: Category[] = [
  {
    id: 'catering', name_en: 'Catering', name_ar: 'الضيافة',
    providers: [
      { id:'najd-cat', name_en: 'Najd Catering', name_ar: 'نجد للضيافة', priceTag_en: 'from 35 SAR / person', priceTag_ar: 'ابتداءً من 35 ريال / للفرد' },
      { id:'eastern-bites', name_en: 'Eastern Bites', name_ar: 'لقيمات الشرقية', priceTag_en: 'from 45 SAR / person', priceTag_ar: 'ابتداءً من 45 ريال / للفرد' }
    ]
  },
  {
    id: 'photography', name_en: 'Photography', name_ar: 'التصوير',
    providers: [
      { id:'gulf-photo', name_en: 'Gulf Photographers', name_ar: 'مصورو الخليج', priceTag_en: 'from 900 SAR / event', priceTag_ar: 'ابتداءً من 900 ريال / للفعالية' },
      { id:'lightframe', name_en: 'LightFrame Studio', name_ar: 'لايت فريم ستوديو', priceTag_en: 'from 1200 SAR / event', priceTag_ar: 'ابتداءً من 1200 ريال / للفعالية' }
    ]
  },
  {
    id: 'decoration', name_en: 'Decoration', name_ar: 'الديكور',
    providers: [
      { id:'decoart', name_en: 'DecoArt Events', name_ar: 'ديكو آرت للمناسبات', priceTag_en: 'custom quotes', priceTag_ar: 'أسعار حسب الطلب' },
      { id:'flora', name_en: 'Flora & Lights', name_ar: 'فلورا آند لايتس', priceTag_en: 'custom quotes', priceTag_ar: 'أسعار حسب الطلب' }
    ]
  }
];

export default function Page(){
  const tS = useTranslations('Services');
  const locale = useLocale();
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">{tS('title')}</h2>
      <div className="grid lg:grid-cols-3 gap-4">
        {services.map(cat => (
          <article key={cat.id} className="p-3 rounded-2xl border bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">{locale==='en'?cat.name_en:cat.name_ar}</div>
              <span className="text-xs rounded-full px-2 py-1 border">{tS('category')}</span>
            </div>
            <div className="mt-3 space-y-2">
              {cat.providers.map(p => (
                <div key={p.id} className="p-3 rounded-xl border hover:bg-slate-50">
                  <div className="font-medium">{locale==='en'?p.name_en:p.name_ar}</div>
                  <div className="text-xs text-slate-500">{locale==='en'?p.priceTag_en:p.priceTag_ar}</div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export async function generateMetadata({params}:{params:{locale:'ar'|'en'}}){
  const {locale} = params;
  const title = locale==='ar' ? 'الخدمات — الدمام' : 'Services — Dammam';
  const description = locale==='ar' ? 'مزودو خدمات الضيافة، التصوير، والديكور في الدمام.' : 'Catering, photography, and decoration services in Dammam.';
  return {
    title,
    description,
    alternates: { languages: { ar: '/ar/services', en: '/en/services' } },
    openGraph: { title, description, locale, type: 'website' }
  } as const;
}
