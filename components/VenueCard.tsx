import Image from 'next/image';
import Link from 'next/link';
import {useTranslations, useLocale} from 'next-intl';
import {Venue} from '@/lib/data';

export default function VenueCard({v}:{v: Venue}){
  const tV = useTranslations('Venues');
  const locale = useLocale();
  return (
    <article className="p-3 rounded-2xl border bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-video rounded-xl overflow-hidden relative">
        <Image src={v.hero} alt={(locale==='en'?v.name_en:v.name_ar) + ' — hero image'} fill className="object-cover"/>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div>
          <h3 className="font-semibold">{locale==='en'?v.name_en:v.name_ar}</h3>
          <div className="text-sm text-slate-500">Dammam • {tV('capacity')}: {v.capacity}</div>
        </div>
        <div className="text-right">
          <div className="font-bold">{v.priceSAR.toLocaleString(locale)} {tV('sar')}</div>
          <div className="text-xs text-slate-500">{tV('perBooking')}</div>
        </div>
      </div>
      <div className="mt-3">
        <Link href={`/${locale}/venues/${v.slug}`} className="inline-flex items-center text-sm font-medium px-3 py-1 rounded-lg border hover:bg-slate-50">{tV('viewDetails')}</Link>
      </div>
    </article>
  )
}
