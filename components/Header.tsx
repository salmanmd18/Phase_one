'use client';

import {useLocale, useTranslations} from 'next-intl';
import {usePathname} from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import {useEffect, useState} from 'react';

export default function Header({active}:{active?: string}){
  const [elevated, setElevated] = useState(false);
  useEffect(()=>{
    const onScroll = () => setElevated(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive:true});
    return ()=> window.removeEventListener('scroll', onScroll);
  },[]);
  const locale = useLocale();
  const t = useTranslations('Header');
  const pathname = usePathname();
  const other = locale === 'ar' ? 'en' : 'ar';
  const href = pathname.replace(/^\/(ar|en)/, `/${other}`);

  return (
    <header className={clsx('sticky top-0 z-30 backdrop-blur bg-white/70 border-b transition-base', elevated && 'shadow-md')}>
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-2xl bg-slate-900 text-white grid place-items-center font-bold" aria-label="Brand">DV</div>
          <div className="text-sm text-slate-500">{t('dammamOnly')}</div>
        </div>
        <div className="flex items-center gap-2">
          <Link href={href} hrefLang={other} prefetch className="px-3 py-1.5 rounded-xl border hover:bg-slate-100 text-sm font-medium transition-base" aria-label={t(locale==='en'?'ariaSwitchToAr':'ariaSwitchToEn')}>
            {locale==='en'? t('toggleAr') : t('toggleEn')}
          </Link>
          <nav className="hidden sm:flex items-center gap-2" aria-label="Primary">
            <Link href={`/${locale}`} aria-current={pathname===`/${locale}`? 'page': undefined} className={clsx('px-3 py-1.5 rounded-xl text-sm border hover:bg-slate-100 transition-base', pathname===`/${locale}` && 'bg-slate-900 text-white border-transparent')}>{t('home')}</Link>
            <Link href={`/${locale}/venues`} aria-current={pathname.startsWith(`/${locale}/venues`)? 'page': undefined} className={clsx('px-3 py-1.5 rounded-xl text-sm border hover:bg-slate-100 transition-base', pathname.startsWith(`/${locale}/venues`) && 'bg-slate-900 text-white border-transparent')}>{t('venues')}</Link>
            <Link href={`/${locale}/services`} aria-current={pathname.startsWith(`/${locale}/services`)? 'page': undefined} className={clsx('px-3 py-1.5 rounded-xl text-sm border hover:bg-slate-100 transition-base', pathname.startsWith(`/${locale}/services`) && 'bg-slate-900 text-white border-transparent')}>{t('services')}</Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
