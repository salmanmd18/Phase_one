'use client';

import {useTranslations, useLocale} from 'next-intl';
import {venues} from '@/lib/data';
import VenueCard from '@/components/VenueCard';

export default function HomeClient(){
  const tH = useTranslations('Home');
  const locale = useLocale();
  return (
    <section>
      <div className="rounded-3xl p-8 bg-gradient-to-br from-indigo-50 to-sky-50 border">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold mb-2">{tH('title')}</h1>
          <p className="text-slate-600 mb-6">{tH('tag')}</p>
          <form className="flex flex-col sm:flex-row gap-3" action={`/${locale}/venues`}>
            <label className="sr-only" htmlFor="home-search">{tH('search')}</label>
            <input id="home-search" name="q" placeholder={tH('placeholder')} className="input flex-1" dir="auto" />
            <button type="submit" className="btn btn-primary font-medium">{tH('search')}</button>
          </form>
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-3">{tH('featured')}</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {venues.map(v => (<VenueCard key={v.id} v={v} />))}
      </div>
    </section>
  );
}

