'use client';

import {useMemo, useRef, useState} from 'react';
import {useTranslations, useLocale} from 'next-intl';
import Image from 'next/image';
import {venues} from '@/lib/data';
import Toast from '@/components/Toast';

export default function Page(){
  const venue = venues[0];
  const tB = useTranslations('Booking');
  const tV = useTranslations('Venues');
  const locale = useLocale();

  const deposit = useMemo(()=> Math.round(venue.priceSAR * 0.2), [venue.priceSAR]);
  const remainder = useMemo(()=> venue.priceSAR - Math.round(venue.priceSAR * 0.2), [venue.priceSAR]);
  const [payMode, setPayMode] = useState<'online'|'offline'>('online');
  const [onlineMethod, setOnlineMethod] = useState<'stc'|'rajhi'>('stc');
  const [agree, setAgree] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [errName, setErrName] = useState('');
  const [errPhone, setErrPhone] = useState('');
  const [errEmail, setErrEmail] = useState('');
  const liveRef = useRef<HTMLDivElement>(null);

  const validate = () => {
    let ok = true;
    setErrName(''); setErrPhone(''); setErrEmail('');
    if (name.trim().length < 2) { setErrName(tB('errName')); ok = false; }
    const emailOk = /.+@.+\..+/.test(email.trim());
    if (!emailOk) { setErrEmail(tB('errEmail')); ok = false; }
    const digits = phone.replace(/\D/g,'');
    // Expect +966 5XXXXXXXX => 12 digits (966 + 9)
    const normalized = normalizeKsa(digits);
    if (!(normalized.startsWith('966') && normalized.length === 12 && normalized[3] === '5')) {
      setErrPhone(tB('errPhone'));
      ok = false;
    }
    return ok;
  };

  const reset = () => {
    setName(''); setPhone(''); setEmail(''); setNote(''); setAgree(false);
    setPayMode('online'); setOnlineMethod('stc');
  };

  function normalizeKsa(digits: string){
    // remove leading 00 (intl prefix)
    if(digits.startsWith('00')) digits = digits.slice(2);
    if(digits.startsWith('966')) {
      // ok
    } else if (digits.startsWith('0')) {
      digits = '966' + digits.slice(1);
    } else if (digits.startsWith('5')) {
      digits = '966' + digits;
    }
    // keep max 12 digits (966 + 9)
    return digits.slice(0, 12);
  }

  function formatKsa(input: string){
    let d = input.replace(/\D/g,'');
    d = normalizeKsa(d);
    if(d.length <= 3) return '+' + d;
    const cc = d.slice(0,3); // 966
    const rest = d.slice(3); // up to 9 digits
    const a = rest.slice(0,1);
    const b = rest.slice(1,4);
    const c = rest.slice(4,7);
    const e = rest.slice(7,9);
    let out = `+${cc}`;
    if(a) out += ` ${a}`;
    if(b) out += ` ${b}`;
    if(c) out += ` ${c}`;
    if(e) out += ` ${e}`;
    return out;
  }

  return (
    <section aria-labelledby="co-title">
      <h1 id="co-title" className="text-2xl font-bold mb-4">{tB('checkout')}</h1>
      <div className="grid lg:grid-cols-2 gap-6">
        <aside className="p-4 rounded-2xl border bg-white h-fit">
          <h2 className="font-semibold mb-3">{tB('summary')}</h2>
          <div className="flex items-center gap-3">
            <div className="relative w-24 h-16 rounded-lg overflow-hidden border">
              <Image src={venue.hero} alt="Venue hero" fill className="object-cover" sizes="96px" loading="eager" decoding="async"/>
            </div>
            <div>
              <div className="font-medium">{locale==='en'?venue.name_en:venue.name_ar}</div>
              <div className="text-sm text-slate-600">Dammam — {tV('capacity')}: {venue.capacity}</div>
            </div>
          </div>
          <div className="mt-4 space-y-1 text-sm">
            <div className="flex justify-between"><span>{tB('subtotal')}</span><span>{venue.priceSAR.toLocaleString(locale)} {tV('sar')}</span></div>
            <div className="flex justify-between"><span>{tB('payNow')}</span><span className="font-semibold">{deposit.toLocaleString(locale)} {tV('sar')}</span></div>
            <div className="flex justify-between"><span>{tB('payLater')}</span><span className="font-semibold">{remainder.toLocaleString(locale)} {tV('sar')}</span></div>
            <div className="pt-2 border-t mt-2 flex justify-between font-semibold"><span>{tB('total')}</span><span>{venue.priceSAR.toLocaleString(locale)} {tV('sar')}</span></div>
          </div>
        </aside>

        <form className="p-4 rounded-2xl border bg-white" onSubmit={(e)=>{
          e.preventDefault();
          const ok = validate();
          if(!ok){ setSubmitted(false); if(liveRef.current){ liveRef.current.textContent = tB('formError'); } return; }
          if(agree){ setSubmitted(true); setToastOpen(true); reset(); }
        }}>
          <h2 className="font-semibold mb-3">{tB('contact')}</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm mb-1" htmlFor="name">{tB('name')}</label>
              <input id="name" className="input" dir="auto" autoComplete="name" value={name} onChange={e=>{ setName(e.target.value); setErrName(''); }} aria-invalid={!!errName} aria-describedby={errName? 'err-name': undefined} />
              {errName && <p id="err-name" role="alert" className="mt-1 text-xs text-red-600">{errName}</p>}
            </div>
            <div>
              <label className="block text-sm mb-1" htmlFor="phone">{tB('phone')}</label>
              <input id="phone" className="input" dir="ltr" inputMode="tel" autoComplete="tel" placeholder="+966 5XX XXX XXX" value={phone} onChange={e=>{ setPhone(formatKsa(e.target.value)); setErrPhone(''); }} aria-invalid={!!errPhone} aria-describedby={errPhone? 'err-phone': undefined} />
              {errPhone && <p id="err-phone" role="alert" className="mt-1 text-xs text-red-600">{errPhone}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm mb-1" htmlFor="email">{tB('email')}</label>
              <input id="email" className="input" dir="auto" inputMode="email" autoComplete="email" value={email} onChange={e=>{ setEmail(e.target.value); setErrEmail(''); }} aria-invalid={!!errEmail} aria-describedby={errEmail? 'err-email': undefined} />
              {errEmail && <p id="err-email" role="alert" className="mt-1 text-xs text-red-600">{errEmail}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm mb-1" htmlFor="note">{tB('note')}</label>
              <textarea id="note" className="input" rows={3} dir="auto" value={note} onChange={e=> setNote(e.target.value)}></textarea>
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
                  <span>{tB('stcPay')}</span>
                </label>
                <label className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl border cursor-pointer ${onlineMethod==='rajhi'?'bg-slate-100':'hover:bg-slate-50'}`}>
                  <input type="radio" name="onlinemethod" value="rajhi" checked={onlineMethod==='rajhi'} onChange={()=>setOnlineMethod('rajhi')} />
                  <span>{tB('alRajhi')}</span>
                </label>
              </div>
            )}
            {payMode==='offline' && (
              <div className="mt-3 p-3 rounded-xl bg-slate-50 border text-sm text-slate-700">{tB('cashCollection')}</div>
            )}
          </fieldset>

          <label className="mt-4 inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={agree} onChange={(e)=>setAgree(e.target.checked)} />
            <span>{tB('agree')}</span>
          </label>

          <div className="mt-4">
            <button className="btn btn-primary disabled:opacity-50" disabled={!agree} title="Demo only">
              {tB('confirmDemo')}
            </button>
          </div>
          <div aria-live="polite" ref={liveRef} className="mt-3 text-sm text-green-700" role="status">
            {submitted ? tB('success') : ''}
          </div>
        </form>
      </div>
      <Toast open={toastOpen} onOpenChange={setToastOpen} message={tB('success')} />
    </section>
  )
}


