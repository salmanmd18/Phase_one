'use client';
import {venues} from '@/lib/data';
import VenueCard from '@/components/VenueCard';
import {useTranslations, useLocale} from 'next-intl';
import {useMemo, useState, useEffect} from 'react';
import {useRouter, usePathname, useSearchParams} from 'next/navigation';

type Filters = {
  q?: string;
  capMin?: number;
  priceMin?: number;
  priceMax?: number;
  amenities?: string[]; // values: pool,garden,sound,sea,parking,lighting
};

const AMENITY_MAP: Record<string, string> = {
  pool: 'Pool',
  garden: 'Garden',
  sound: 'Sound System',
  sea: 'Sea View',
  parking: 'Parking',
  lighting: 'Lighting'
};

export default function Page(){
  const tV = useTranslations('Venues');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const [q, setQ] = useState(sp.get('q') || '');
  const [capMin, setCapMin] = useState<number | undefined>(sp.get('capMin') ? Number(sp.get('capMin')) : undefined);
  const [priceMin, setPriceMin] = useState<number | undefined>(sp.get('priceMin') ? Number(sp.get('priceMin')) : undefined);
  const [priceMax, setPriceMax] = useState<number | undefined>(sp.get('priceMax') ? Number(sp.get('priceMax')) : undefined);
  const [amenities, setAmenities] = useState<string[]>(() => (sp.get('amenities')?.split(',').filter(Boolean) || []));

  useEffect(() => {
    const params = new URLSearchParams(sp.toString());
    const setOrDelete = (key: string, val?: string) => {
      if (val && val.trim() !== '') params.set(key, val);
      else params.delete(key);
    };
    setOrDelete('q', q);
    setOrDelete('capMin', capMin !== undefined ? String(capMin) : undefined);
    setOrDelete('priceMin', priceMin !== undefined ? String(priceMin) : undefined);
    setOrDelete('priceMax', priceMax !== undefined ? String(priceMax) : undefined);
    setOrDelete('amenities', amenities.length ? amenities.join(',') : undefined);
    router.replace(`${pathname}?${params.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, capMin, priceMin, priceMax, amenities]);

  const amenityOptions = useMemo(() => (
    [
      {value: 'pool', label: locale==='en' ? 'Pool' : 'مسبح'},
      {value: 'garden', label: locale==='en' ? 'Garden' : 'حديقة'},
      {value: 'sound', label: locale==='en' ? 'Sound System' : 'نظام صوتي'},
      {value: 'sea', label: locale==='en' ? 'Sea View' : 'إطلالة بحرية'},
      {value: 'parking', label: locale==='en' ? 'Parking' : 'مواقف سيارات'},
      {value: 'lighting', label: locale==='en' ? 'Lighting' : 'إضاءة'}
    ]
  ), [locale]);

  const list = useMemo(() => {
    const qv = q.trim().toLowerCase();
    return venues.filter(v => {
      if (qv) {
        const name = (locale==='en'?v.name_en:v.name_ar).toLowerCase();
        if (!name.includes(qv)) return false;
      }
      if (capMin !== undefined && v.capacity < capMin) return false;
      if (priceMin !== undefined && v.priceSAR < priceMin) return false;
      if (priceMax !== undefined && v.priceSAR > priceMax) return false;
      if (amenities.length) {
        const have = v.amenities_en; // compare using English keys
        const needed = amenities.map(a => AMENITY_MAP[a]);
        const allIncluded = needed.every(n => have.includes(n));
        if (!allIncluded) return false;
      }
      return true;
    });
  }, [q, capMin, priceMin, priceMax, amenities, locale]);

  const onAmenityToggle = (val: string) => {
    setAmenities(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]);
  };

  const clearFilters = () => {
    setQ('');
    setCapMin(undefined);
    setPriceMin(undefined);
    setPriceMax(undefined);
    setAmenities([]);
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{tV('title')}</h2>
        <div className="text-sm text-slate-500">{tV('filtersNote')}</div>
      </div>

      <form className="mb-4 grid gap-3 lg:grid-cols-4 p-3 rounded-[var(--radius-lg)] border bg-white shadow-[var(--shadow-sm)]" onSubmit={(e)=>e.preventDefault()} aria-label="Filters">
        <div>
          <label className="block text-sm mb-1" htmlFor="q">{tV('search') ?? 'Search'}</label>
          <input id="q" className="input" value={q} onChange={e=>setQ(e.target.value)} dir="auto"/>
        </div>
        <div>
          <label className="block text-sm mb-1" htmlFor="capMin">{tV('capacityMin') ?? 'Min capacity'}</label>
          <input id="capMin" className="input" inputMode="numeric" pattern="[0-9]*" value={capMin ?? ''} onChange={e=> setCapMin(e.target.value? Number(e.target.value): undefined)} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm mb-1" htmlFor="priceMin">{tV('priceMin') ?? 'Min price'}</label>
            <input id="priceMin" className="input" inputMode="numeric" pattern="[0-9]*" value={priceMin ?? ''} onChange={e=> setPriceMin(e.target.value? Number(e.target.value): undefined)} />
          </div>
          <div>
            <label className="block text-sm mb-1" htmlFor="priceMax">{tV('priceMax') ?? 'Max price'}</label>
            <input id="priceMax" className="input" inputMode="numeric" pattern="[0-9]*" value={priceMax ?? ''} onChange={e=> setPriceMax(e.target.value? Number(e.target.value): undefined)} />
          </div>
        </div>
        <fieldset className="lg:col-span-4">
          <legend className="block text-sm mb-2">{tV('amenities') ?? 'Amenities'}</legend>
          <div className="flex flex-wrap gap-2">
            {amenityOptions.map(opt => (
              <label key={opt.value} className="inline-flex items-center gap-2 px-3 py-2 rounded-[var(--radius-md)] border cursor-pointer text-sm">
                <input type="checkbox" checked={amenities.includes(opt.value)} onChange={()=> onAmenityToggle(opt.value)} />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="lg:col-span-4 flex justify-end">
          <button className="btn" onClick={clearFilters} type="button">{tV('clear') ?? 'Clear'}</button>
        </div>
      </form>

      {list.length === 0 ? (
        <div className="rounded-xl border bg-white p-6 text-slate-600">
          {tV('empty')}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map(v => (<VenueCard key={v.id} v={v} />))}
        </div>
      )}
    </section>
  )
}

export async function generateMetadata({params}:{params:{locale:'ar'|'en'}}){
  const {locale} = params;
  const title = locale==='ar' ? 'أماكن الدمام — المنتجعات والقاعات' : 'Dammam Venues — Resorts & Halls';
  const description = locale==='ar' ? 'تصفح قائمة الأماكن في الدمام مع فلاتر بسيطة.' : 'Browse Dammam venues with simple filters.';
  return {
    title,
    description,
    alternates: { languages: { ar: '/ar/venues', en: '/en/venues' } },
    openGraph: { title, description, locale, type: 'website' }
  } as const;
}
