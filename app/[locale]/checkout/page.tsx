'use client';

import {useMemo, useState} from 'react';
import {useTranslations, useLocale} from 'next-intl';
import Image from 'next/image';
import {venues} from '@/lib/data';

export default function Page(){
  // For demo, use first venue
  const venue = venues[0];
  const tB = useTranslations('Booking');
  const tV = useTranslations('Venues');
  const locale = useLocale();

  const deposit = useMemo(()=> Math.round(venue.priceSAR * 0.2), []);
  const remainder = useMemo(()=> venue.priceSAR - Math.round(venue.priceSAR * 0.2), []);
  const [payMode, setPayMode] = useState<'online'|'offline'>('online');
  const [onlineMethod, setOnlineMethod] = useState<'stc'|'rajhi'>('stc');
  const [agree, setAgree] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <section aria-labelledby="co-title">
      <h1 id="co-title" className="text-2xl font-bold mb-4">{tB('checkout')}</h1>
      <div className="grid lg:grid-cols-2 gap-6">
        <aside className="p-4 rounded-2xl border bg-white h-fit">
          <h2 className="font-semibold mb-3">{tB('summary')}</h2>
          <div className="flex items-center gap-3">
            <div className="relative w-24 h-16 rounded-lg overflow-hidden border">
              <Image src={venue.hero} alt="Venue hero" fill className="object-cover"/>
            </div>
            <div>
              <div className="font-medium">{locale==='en'?venue.name_en:venue.name_ar}</div>
              <div className="text-sm text-slate-500">Dammam • {tV('capacity')}: {venue.capacity}</div>
            </div>
          </div>
          <div className="mt-4 space-y-1 text-sm">
            <div className="flex justify-between"><span>{tB('subtotal')}</span><span>{venue.priceSAR.toLocaleString(locale)} {tV('sar')}</span></div>
            <div className="flex justify-between"><span>{tB('payNow')}</span><span className="font-semibold">{deposit.toLocaleString(locale)} {tV('sar')}</span></div>
            <div className="flex justify-between"><span>{tB('payLater')}</span><span className="font-semibold">{remainder.toLocaleString(locale)} {tV('sar')}</span></div>
            <div className="pt-2 border-t mt-2 flex justify-between font-semibold"><span>{tB('total')}</span><span>{venue.priceSAR.toLocaleString(locale)} {tV('sar')}</span></div>
          </div>
        </aside>

        <form className="p-4 rounded-2xl border bg-white" onSubmit={(e)=>{e.preventDefault(); if(agree){ setSubmitted(true); }}}>
          <h2 className="font-semibold mb-3">{tB('contact')}</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm mb-1" htmlFor="name">{tB('name')}</label>
              <input id="name" className="w-full rounded-xl border px-3 py-2" dir="auto" required/>
            </div>
            <div>
              <label className="block text-sm mb-1" htmlFor="phone">{tB('phone')}</label>
              <input id="phone" className="w-full rounded-xl border px-3 py-2" dir="auto" inputMode="tel" placeholder="+966" required/>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm mb-1" htmlFor="email">{tB('email')}</label>
              <input id="email" className="w-full rounded-xl border px-3 py-2" dir="auto" inputMode="email" required/>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm mb-1" htmlFor="note">{tB('note')}</label>
              <textarea id="note" className="w-full rounded-xl border px-3 py-2" rows={3} dir="auto"></textarea>
            </div>
          </div>

          <fieldset className="mt-4">
            <legend className="font-semibold mb-2">{tB('paymentOptions')}</legend>
            <div className="flex gap-3 flex-wrap">
              <label className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl border cursor-pointer ${payMode==='online'?'bg-slate-100':'hover:bg-slate-50'}`}>
                <input type="radio" name="paymode" value="online" checked={payMode==='online'} onChange={()=>setPayMode('online')} />
                <span>{tB('online')}</span>
              </label>
              <label className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl border cursor-pointer ${payMode==='offline'?'bg-slate-100':'hover:bg-slate-50'}`}>
                <input type="radio" name="paymode" value="offline" checked={payMode==='offline'} onChange={()=>setPayMode('offline')} />
                <span>{tB('offline')}</span>
              </label>
            </div>
            {payMode==='online' && (
              <div className="mt-3 flex gap-3 flex-wrap">
                <label className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl border cursor-pointer ${onlineMethod==='stc'?'bg-slate-100':'hover:bg-slate-50'}`}>
                  <input type="radio" name="onlinemethod" value="stc" checked={onlineMethod==='stc'} onChange={()=>setOnlineMethod('stc')} />
                  <span>📱 {tB('stcPay')}</span>
                </label>
                <label className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl border cursor-pointer ${onlineMethod==='rajhi'?'bg-slate-100':'hover:bg-slate-50'}`}>
                  <input type="radio" name="onlinemethod" value="rajhi" checked={onlineMethod==='rajhi'} onChange={()=>setOnlineMethod('rajhi')} />
                  <span>🏦 {tB('alRajhi')}</span>
                </label>
              </div>
            )}
            {payMode==='offline' && (
              <div className="mt-3 p-3 rounded-xl bg-slate-50 border text-sm text-slate-700">🧾 {tB('cashCollection')}</div>
            )}
          </fieldset>

          <label className="mt-4 inline-flex items-center gap-2 text-sm">
            <input type="checkbox" onChange={(e)=>setAgree(e.target.checked)} />
            <span>{tB('agree')}</span>
          </label>

          <div className="mt-4">
            <button className="px-4 py-2 rounded-xl bg-slate-900 text-white disabled:opacity-50" disabled={!agree} title="Demo only">
              {tB('confirmDemo')}
            </button>
          </div>
          <div aria-live="polite" className="mt-3 text-sm text-green-700" role="status">
            {submitted ? tB('success') : ''}
          </div>
        </form>
      </div>
    </section>
  )
}

