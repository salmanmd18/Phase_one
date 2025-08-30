'use client';
import {venues} from '@/lib/data';
import VenueCard from '@/components/VenueCard';
import {useTranslations, useLocale} from 'next-intl';

export default function Page({searchParams}:{searchParams?:{q?:string}}){
  const tV = useTranslations('Venues');
  const locale = useLocale();
  const q = (searchParams?.q || '').toLowerCase();
  const list = q
    ? venues.filter(v => (locale==='en'?v.name_en:v.name_ar).toLowerCase().includes(q))
    : venues;
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{tV('title')}</h2>
        <div className="text-sm text-slate-500">{tV('filtersNote')}</div>
      </div>
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
