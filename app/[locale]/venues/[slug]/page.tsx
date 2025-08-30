import Image from 'next/image';
import Link from 'next/link';
import {useLocale, useTranslations} from 'next-intl';
import {venues} from '@/lib/data';
import BookingWidget from '@/components/BookingWidget';

export default function Page({params}:{params:{locale:string; slug:string}}){
  const v = venues.find(x => x.slug === params.slug);
  const tV = useTranslations('Venues');
  const locale = useLocale();

  if(!v){
     return <div className="text-sm text-slate-500">Not found</div>
  }

  const am = locale==='en' ? v.amenities_en : v.amenities_ar;

  return (
    <section>
      <Link href={`/${params.locale}/venues`} className="mb-4 inline-block text-sm text-slate-600 hover:underline">{tV('back')}</Link>
      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 aspect-video rounded-2xl overflow-hidden relative">
              <Image src={v.hero} alt={(locale==='en'?v.name_en:v.name_ar) + ' — main photo'} fill className="object-cover"/>
            </div>
            {v.photos.map((p,i)=> (
              <div key={i} className="aspect-[4/3] rounded-2xl overflow-hidden relative">
                <Image src={p} alt={(locale==='en'?v.name_en:v.name_ar) + ' — photo ' + (i+1)} fill className="object-cover"/>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold">{locale==='en'?v.name_en:v.name_ar}</h1>
          <div className="text-slate-500 mt-1">Dammam • {tV('capacity')}: {v.capacity}</div>
          <p className="mt-4 text-slate-700">{locale==='en'?v.desc_en:v.desc_ar}</p>

          <div className="mt-5">
            <h3 className="font-semibold mb-2">{tV('amenities')}</h3>
            <div className="flex flex-wrap gap-2">
              {am.map((a)=> (<span key={a} className="px-3 py-1 rounded-xl border text-sm">{a}</span>))}
            </div>
          </div>

          <div className="mt-6 p-4 rounded-2xl border bg-white">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm text-slate-500">{tV('price')}</div>
                <div className="text-2xl font-bold">{v.priceSAR.toLocaleString(locale)} {tV('sar')}</div>
              </div>
            </div>
            <BookingWidget priceSAR={v.priceSAR} />
          </div>

          <div className="mt-8">
            <h3 className="font-semibold mb-2">{tV('similar')}</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {venues.filter(x=>x.id!==v.id).map(x=> (
                <div key={x.id} className="p-3 rounded-2xl border bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-video rounded-xl overflow-hidden relative">
                    <Image src={x.hero} alt={(locale==='en'?x.name_en:x.name_ar) + ' — hero image'} fill className="object-cover"/>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="font-medium">{locale==='en'?x.name_en:x.name_ar}</div>
                    <div className="text-sm font-semibold">{x.priceSAR.toLocaleString(locale)} {tV('sar')}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
