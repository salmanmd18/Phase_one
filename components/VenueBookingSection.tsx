'use client';

import {useMemo, useState} from 'react';
import {useLocale, useTranslations} from 'next-intl';
import AvailabilityPicker from '@/components/AvailabilityPicker';
import BookingWidget from '@/components/BookingWidget';

export default function VenueBookingSection({priceSAR}:{priceSAR:number}){
  const locale = useLocale();
  const tB = useTranslations('Booking');
  const [selected, setSelected] = useState<string | undefined>();

  const canReserve = useMemo(()=>{
    if(!selected) return false;
    const d = new Date(selected);
    const now = new Date(); now.setHours(0,0,0,0);
    const max = new Date(now); max.setDate(now.getDate()+30);
    const within = d >= now && d < max;
    const dow = d.getDay();
    const unavailable = dow === 5 || dow === 6; // Fri/Sat
    return within && !unavailable;
  }, [selected]);

  const helper = useMemo(()=>{
    if(!selected) return tB('selectDate');
    const d = new Date(selected);
    const dow = d.getDay();
    if(dow === 5 || dow === 6){
      return tB('friSatDisabled');
    }
    return '';
  }, [selected, tB]);

  return (
    <div>
      <div className="mt-4">
        <AvailabilityPicker value={selected} onChange={setSelected} />
      </div>
      <div className="mt-4">
        <BookingWidget priceSAR={priceSAR} canReserve={canReserve} helper={helper} />
      </div>
    </div>
  );
}

