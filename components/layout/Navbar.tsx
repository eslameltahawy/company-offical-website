'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const links = [
  { label: 'منتجاتنا', href: '#products' },
  { label: 'لماذا سماو', href: '#why' },
  { label: 'عن سماو', href: '#about' },
  { label: 'العملاء', href: '#testimonials' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className="fixed top-0 left-0 right-0 z-50 h-14 lg:h-[68px]"
      style={{
        background: scrolled ? 'rgba(10,16,32,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(28px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(28px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(148,163,184,0.07)' : 'none',
        boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.35)' : 'none',
        transition: 'background 0.35s ease, backdrop-filter 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease',
      }}
    >
      <div className="container-smaw h-full flex items-center justify-between gap-4">
        <a href="#top" className="flex items-center flex-shrink-0">
          <img
            src="/smaw.png"
            alt="SMAW"
            className="h-7 lg:h-9 w-auto"
          />
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-8 list-none">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative text-[#7a93bc] hover:text-[#e2e8f8] text-sm font-semibold transition-colors duration-200 pb-1 group"
                style={{ fontFamily: 'Cairo' }}
              >
                {l.label}
                <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-[#2563eb] rounded-full transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#booking"
          className="inline-flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs lg:text-sm font-semibold px-3.5 lg:px-5 py-2 rounded-xl transition-all duration-200 shadow-[0_4px_16px_rgba(37,99,235,0.3)]"
          style={{ fontFamily: 'Cairo' }}
        >
          <i className="fas fa-calendar-alt text-[10px] lg:text-xs" />
          احجز
        </a>
      </div>
    </motion.nav>
  )
}
