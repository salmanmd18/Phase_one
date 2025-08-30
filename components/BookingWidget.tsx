'use client';

import {useMemo, useState} from 'react';
import {useLocale, useTranslations} from 'next-intl';

export default function BookingWidget({priceSAR}:{priceSAR:number}){
  const tB = useTranslations('Booking');
  const locale = useLocale();
  const deposit = useMemo(()=> Math.round(priceSAR * 0.2), [priceSAR]);
  const remainder = useMemo(()=> priceSAR - Math.round(priceSAR * 0.2), [priceSAR]);
  const [payMode, setPayMode] = useState<'online'|'offline'>('online');
  const [onlineMethod, setOnlineMethod] = useState<'stc'|'rajhi'>('stc');

  return (
    <div className="mt-6 p-4 rounded-2xl border bg-white">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm text-slate-500">{tB('depositPolicy')}</div>
          <div className="mt-2 text-sm p-3 rounded-xl bg-slate-50 border">
            <div className="flex items-center justify-between">
              <span>{tB('payNow')}</span>
              <strong>{deposit.toLocaleString(locale)}</strong>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span>{tB('payLater')}</span>
              <strong>{remainder.toLocaleString(locale)}</strong>
            </div>
          </div>
        </div>
        <a href={`/${locale}/checkout`} className="btn btn-primary">{tB('reserveDemo')}</a>
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
          <div className="mt-3 p-3 rounded-[var(--radius-md)] bg-slate-50 border text-sm text-slate-700">{tB('cashCollection')}</div>
        )}
      </fieldset>
    </div>
  )
}
