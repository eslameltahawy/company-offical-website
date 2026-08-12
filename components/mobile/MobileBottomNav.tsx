'use client'

import { useEffect, useState } from 'react'

const tabs = [
  { id: 'home',     label: 'الرئيسية',  href: '#top',      icon: 'fas fa-home' },
  { id: 'products', label: 'منتجاتنا',  href: '#products', icon: 'fas fa-th-large' },
  { id: 'why',      label: 'لماذا سماو', href: '#why',      icon: 'fas fa-star' },
  { id: 'booking',  label: 'احجز',      href: '#booking',  icon: 'fas fa-calendar-check' },
] as const

const SECTION_IDS = ['top', 'products', 'why', 'booking'] as const

export default function MobileBottomNav() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    const map: Record<string, string> = {
      top: 'home',
      products: 'products',
      why: 'why',
      booking: 'booking',
    }

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(map[id] || 'home')
        },
        { rootMargin: '-35% 0px -50% 0px', threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-[60] mobile-bottom-nav"
      aria-label="تنقل الموبايل"
    >
      <div
        className="mx-auto flex items-stretch justify-around px-1 pt-1.5"
        style={{
          background: 'rgba(10,16,32,0.94)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderTop: '1px solid rgba(148,163,184,0.1)',
          paddingBottom: 'max(8px, env(safe-area-inset-bottom))',
          boxShadow: '0 -8px 32px rgba(0,0,0,0.35)',
        }}
      >
        {tabs.map((tab) => {
          const isActive = active === tab.id
          return (
            <a
              key={tab.id}
              href={tab.href}
              onClick={() => setActive(tab.id)}
              className="flex flex-col items-center justify-center gap-0.5 flex-1 py-1.5 min-h-[52px] transition-colors"
              style={{ fontFamily: 'Cairo' }}
            >
              <span
                className="w-10 h-8 rounded-xl flex items-center justify-center transition-all"
                style={{
                  background: isActive ? 'rgba(37,99,235,0.18)' : 'transparent',
                  color: isActive ? '#60a5fa' : '#3d5270',
                }}
              >
                <i className={`${tab.icon} text-sm`} />
              </span>
              <span
                className="text-[10px] font-bold leading-none"
                style={{ color: isActive ? '#e2e8f8' : '#3d5270' }}
              >
                {tab.label}
              </span>
            </a>
          )
        })}
      </div>
    </nav>
  )
}
