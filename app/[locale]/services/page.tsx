import {useLocale, useTranslations} from 'next-intl';

const services = [
  {
    id: 'catering', name_en: 'Catering', name_ar: 'التموين',
    providers: [
      { id:'najd-cat', name_en: 'Najd Catering', name_ar: 'نجد للتموين', priceTag: 'from 35 SAR / person' },
      { id:'eastern-bites', name_en: 'Eastern Bites', name_ar: 'مذاقات الشرقية', priceTag: 'from 45 SAR / person' }
    ]
  },
  {
    id: 'photography', name_en: 'Photography', name_ar: 'التصوير',
    providers: [
      { id:'gulf-photo', name_en: 'Gulf Photographers', name_ar: 'مصورين الخليج', priceTag: 'from 900 SAR / event' },
      { id:'lightframe', name_en: 'LightFrame Studio', name_ar: 'ستوديو لايت فريم', priceTag: 'from 1200 SAR / event' }
    ]
  },
  {
    id: 'decoration', name_en: 'Decoration', name_ar: 'الديكور',
    providers: [
      { id:'decoart', name_en: 'DecoArt Events', name_ar: 'ديكو آرت', priceTag: 'custom quotes' },
      { id:'flora', name_en: 'Flora & Lights', name_ar: 'فلورا آند لايتس', priceTag: 'custom quotes' }
    ]
  }
];

function translatePriceTagToAr(tag:string){
  return tag
    .replace('from','ابتداءً من')
    .replace('SAR','ريال')
    .replace('/ person',' / للشخص')
    .replace('/ event',' / للفعالية');
}

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
                  <div className="text-xs text-slate-500">{locale==='en'?p.priceTag: translatePriceTagToAr(p.priceTag)}</div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
