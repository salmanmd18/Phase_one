'use client';

import {useMemo, useState} from 'react';
import {useLocale, useTranslations} from 'next-intl';

export default function BookingWidget({priceSAR, canReserve = true, helper}:{priceSAR:number; canReserve?: boolean; helper?: string}){
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
        <a aria-disabled={!canReserve} tabIndex={canReserve ? 0 : -1} href={canReserve ? `/${locale}/checkout` : undefined} className={"btn btn-primary " + (!canReserve ? 'opacity-50 pointer-events-none' : '')}>{tB('reserveDemo')}</a>
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
              <span className="inline-flex items-center gap-1">
                <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M4 7h16v10H4z" opacity=".2"/><path d="M20 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 12H4V7h16Z"/></svg>
                {tB('stcPay')}
              </span>
            </label>
            <label className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl border cursor-pointer ${onlineMethod==='rajhi'?'bg-slate-100':'hover:bg-slate-50'}`}>
              <input type="radio" name="onlinemethod" value="rajhi" checked={onlineMethod==='rajhi'} onChange={()=>setOnlineMethod('rajhi')} />
              <span className="inline-flex items-center gap-1">
                <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M3 10l9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10z"/></svg>
                {tB('alRajhi')}
              </span>
            </label>
          </div>
        )}
        {payMode==='offline' && (
          <div className="mt-3 p-3 rounded-[var(--radius-md)] bg-slate-50 border text-sm text-slate-700 inline-flex items-center gap-2">
            <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M3 7h18v10H3z" opacity=".2"/><path d="M21 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 12H3V7h18Z"/><circle cx="12" cy="12" r="3"/></svg>
            {tB('cashCollection')}
          </div>
        )}
      </fieldset>
      <p className="mt-2 text-xs text-slate-600">{tB('cancellationNote')}</p>
      {helper ? (
        <p className="mt-2 text-sm text-slate-600" aria-live="polite">{helper}</p>
      ) : null}
    </div>
  )
}
