'use client';

import {useEffect, useState} from 'react';
import clsx from 'clsx';

export default function Toast({open, onOpenChange, message}:{open:boolean; onOpenChange:(v:boolean)=>void; message:string}){
  const [visible, setVisible] = useState(open);
  useEffect(()=>{
    setVisible(open);
    if(open){
      const id = setTimeout(()=> onOpenChange(false), 3000);
      return ()=> clearTimeout(id);
    }
  },[open, onOpenChange]);
  return (
    <div className={clsx('pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center transition-base', !visible && 'opacity-0 translate-y-2')}>
      <div role="status" aria-live="polite" className="pointer-events-auto rounded-xl border bg-white text-slate-800 shadow-md px-4 py-2 text-sm">
        {message}
      </div>
    </div>
  );
}

