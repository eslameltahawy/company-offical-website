'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'


const links = [
  { label: 'منتجاتنا', href: '#products' },
  { label: 'لماذا سماو', href: '#why' },
  { label: 'عن سماو', href: '#about' },
  { label: 'العملاء', href: '#testimonials' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        className={`fixed top-0 left-0 right-0 z-50 h-[68px] transition-all duration-300 ${
          scrolled
            ? 'glass-strong shadow-[0_1px_24px_rgba(0,0,0,0.5)]'
            : 'bg-transparent'
        }`}
      >
        <div className="container-smaw h-full flex items-center justify-between gap-4">

          {/* Logo */}
          <a href="/" className="flex items-center flex-shrink-0">
            <img src="/smaw.png" alt="SMAW" height={36} style={{ height: 36, width: 'auto' }} />
          </a>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8 list-none">
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

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href="#booking"
              className="hidden sm:inline-flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-semibold px-5 py-2 rounded-lg transition-all duration-200 hover:-translate-y-px shadow-[0_4px_16px_rgba(37,99,235,0.3)]"
              style={{ fontFamily: 'Cairo' }}
            >
              <i className="fas fa-calendar-alt text-xs" />
              احجز عرضاً
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-[rgba(148,163,184,0.1)] text-[#7a93bc] hover:text-[#e2e8f8] hover:bg-white/5 transition-all"
              aria-label="القائمة"
            >
              <i className={`fas ${mobileOpen ? 'fa-times' : 'fa-bars'} text-sm`} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[68px] left-0 right-0 z-40 glass-strong border-b border-[rgba(148,163,184,0.08)] py-4"
          >
            <div className="container-smaw flex flex-col gap-3">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-[#7a93bc] hover:text-[#e2e8f8] font-semibold py-2 text-center transition-colors"
                  style={{ fontFamily: 'Cairo' }}
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#booking"
                onClick={() => setMobileOpen(false)}
                className="bg-[#2563eb] text-white font-semibold py-2.5 px-4 rounded-lg text-center mt-1 transition-colors hover:bg-[#1d4ed8]"
                style={{ fontFamily: 'Cairo' }}
              >
                احجز عرضاً
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
