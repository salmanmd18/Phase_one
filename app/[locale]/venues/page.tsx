import {venues} from '@/lib/data';
import VenueCard from '@/components/VenueCard';
import {useTranslations} from 'next-intl';

export default function Page(){
  const tV = useTranslations('Venues');
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{tV('title')}</h2>
        <div className="text-sm text-slate-500">{tV('filtersNote')}</div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {venues.map(v => (<VenueCard key={v.id} v={v} />))}
      </div>
    </section>
  )
}
