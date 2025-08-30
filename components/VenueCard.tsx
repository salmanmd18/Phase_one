import Image from 'next/image';
import Link from 'next/link';
import {useTranslations, useLocale} from 'next-intl';
import {Venue} from '@/lib/data';

export default function VenueCard({v}:{v: Venue}){
  const tV = useTranslations('Venues');
  const locale = useLocale();
  return (
    <article className="p-3 rounded-[var(--radius-md)] border bg-white shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-base">
      <div className="aspect-video rounded-xl overflow-hidden relative">
        <Image src={v.hero} alt={`${locale==='en'?v.name_en:v.name_ar} hero image`} fill className="object-cover" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" loading="lazy" decoding="async"/>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div>
          <h3 className="font-semibold">{locale==='en'?v.name_en:v.name_ar}</h3>
          <div className="text-sm text-slate-600">Dammam — {tV('capacity')}: {v.capacity}</div>
        </div>
        <div className="text-right">
          <div className="font-bold">{v.priceSAR.toLocaleString(locale)} {tV('sar')}</div>
          <div className="text-xs text-slate-500">{tV('perBooking')}</div>
        </div>
      </div>
      <div className="mt-3">
        <Link href={`/${locale}/venues/${v.slug}`} className="btn px-3 py-1 text-sm">{tV('viewDetails')}</Link>
      </div>
    </article>
  )
}
