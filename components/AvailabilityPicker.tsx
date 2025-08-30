'use client';

import {useEffect, useMemo, useRef, useState} from 'react';
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
  const [focusIndex, setFocusIndex] = useState<number>(0);
  const btnRefs = useRef<HTMLButtonElement[]>([]);
  useEffect(()=>{ setSelected(value); },[value]);
  useEffect(()=>{
    // initialize focus to first non-disabled day
    const idx = days.findIndex(d=> !d.disabled);
    setFocusIndex(idx >= 0 ? idx : 0);
  }, [days]);

  const labelId = 'avail-label';
  const hintId = 'avail-hint';

  // chunk into rows of 7 for grid semantics
  const rows = useMemo(()=>{
    const r: typeof days[] = [] as any;
    for(let i=0;i<days.length;i+=7){ r.push(days.slice(i,i+7)); }
    return r;
  },[days]);

  const moveFocus = (delta: number) => {
    let i = focusIndex + delta;
    if (i < 0) i = 0; if (i > days.length-1) i = days.length-1;
    // skip disabled in direction of travel
    const step = delta === 0 ? 1 : Math.sign(delta);
    while (days[i] && days[i].disabled) {
      i += step; if (i < 0 || i > days.length-1) break;
    }
    if (days[i]) {
      setFocusIndex(i);
      btnRefs.current[i]?.focus();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <label id={labelId} className="block text-sm font-medium">{tB('selectDate')}</label>
        <span id={hintId} className="text-xs text-slate-500">{tB('friSatDisabled')}</span>
      </div>
      <div role="grid" aria-labelledby={labelId} aria-describedby={hintId} className="mt-2 space-y-2">
        {rows.map((row, rIdx)=> (
          <div key={rIdx} role="row" className="grid grid-cols-7 gap-2">
            {row.map(({date, iso, disabled}, idx)=>{
              const globalIdx = rIdx*7 + idx;
              const isSelected = selected === iso;
              const isFocused = focusIndex === globalIdx;
              const dayNum = String(date.getDate());
              return (
                <button
                  key={iso}
                  ref={(el)=>{ if (el) btnRefs.current[globalIdx] = el; }}
                  type="button"
                  role="gridcell"
                  tabIndex={isFocused ? 0 : -1}
                  onKeyDown={(e)=>{
                    if(e.key==='ArrowRight') { e.preventDefault(); moveFocus(1); }
                    else if(e.key==='ArrowLeft') { e.preventDefault(); moveFocus(-1); }
                    else if(e.key==='ArrowDown') { e.preventDefault(); moveFocus(7); }
                    else if(e.key==='ArrowUp') { e.preventDefault(); moveFocus(-7); }
                    else if(e.key==='Home') { e.preventDefault(); moveFocus(-globalIdx); }
                    else if(e.key==='End') { e.preventDefault(); moveFocus(days.length-1-globalIdx); }
                    else if(e.key==='Enter' || e.key===' ') { e.preventDefault(); if(!disabled){ setSelected(iso); onChange(iso);} }
                  }}
                  onClick={()=>{ if(!disabled){ setSelected(iso); onChange(iso); setFocusIndex(globalIdx);} }}
                  disabled={disabled}
                  aria-selected={isSelected}
                  aria-label={date.toLocaleDateString(locale)}
                  className={`h-10 rounded-[var(--radius-md)] border text-sm transition-base ${isSelected? 'bg-slate-900 text-white border-slate-900' : 'bg-white hover:bg-slate-50'} ${disabled? 'opacity-40 cursor-not-allowed' : ''}`}
                >
                  {dayNum}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
