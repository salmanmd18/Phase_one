'use client';

import {useEffect, useMemo, useState} from 'react';
import {useTranslations, useLocale} from 'next-intl';

function toISODate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth()+1).padStart(2,'0');
  const day = String(d.getDate()).padStart(2,'0');
  return `${y}-${m}-${day}`;
}

export default function AvailabilityPicker({value, onChange}:{value?: string; onChange:(v: string)=>void}){
  const tB = useTranslations('Booking');
  const locale = useLocale();
  const days = useMemo(()=>{
    const start = new Date();
    start.setHours(0,0,0,0);
    const arr: {date: Date; iso: string; disabled: boolean}[] = [];
    for(let i=0;i<30;i++){
      const d = new Date(start);
      d.setDate(start.getDate()+i);
      const day = d.getDay(); // 0 Sun .. 6 Sat
      const isFriSat = day === 5 || day === 6;
      arr.push({date: d, iso: toISODate(d), disabled: isFriSat});
    }
    return arr;
  },[]);
  const [selected, setSelected] = useState<string | undefined>(value);
  useEffect(()=>{ setSelected(value); },[value]);

  const labelId = 'avail-label';
  const hintId = 'avail-hint';

  return (
    <div>
      <div className="flex items-center justify-between">
        <label id={labelId} className="block text-sm font-medium">{tB('selectDate')}</label>
        <span id={hintId} className="text-xs text-slate-500">{tB('friSatDisabled')}</span>
      </div>
      <div role="group" aria-labelledby={labelId} aria-describedby={hintId} className="mt-2 grid grid-cols-7 gap-2">
        {days.map(({date, iso, disabled})=>{
          const isSelected = selected === iso;
          const dayNum = String(date.getDate());
          return (
            <button
              key={iso}
              type="button"
              onClick={()=>{ if(!disabled){ setSelected(iso); onChange(iso);} }}
              disabled={disabled}
              aria-pressed={isSelected}
              aria-label={date.toLocaleDateString(locale)}
              className={`h-10 rounded-[var(--radius-md)] border text-sm transition-base ${isSelected? 'bg-slate-900 text-white border-slate-900' : 'bg-white hover:bg-slate-50'} ${disabled? 'opacity-40 cursor-not-allowed' : ''}`}
            >
              {dayNum}
            </button>
          );
        })}
      </div>
    </div>
  );
}
