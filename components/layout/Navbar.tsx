'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function SmawLogo({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer orbit ring */}
      <ellipse cx="17" cy="17" rx="15.5" ry="6.5" stroke="#2563eb" strokeWidth="1.1" opacity="0.35" transform="rotate(-30 17 17)" />
      {/* Middle orbit ring */}
      <ellipse cx="17" cy="17" rx="11" ry="4.5" stroke="#3b82f6" strokeWidth="1" opacity="0.55" transform="rotate(20 17 17)" />
      {/* Central planet glow */}
      <circle cx="17" cy="17" r="8" fill="rgba(37,99,235,0.18)" />
      {/* Central planet */}
      <circle cx="17" cy="17" r="6" fill="#1d4ed8" />
      {/* Planet highlight */}
      <circle cx="17" cy="17" r="6" fill="url(#planetGrad)" />
      {/* S letter */}
      <text x="17" y="21.5" textAnchor="middle" fill="white" fontSize="9" fontWeight="800" fontFamily="Inter, sans-serif">S</text>
      {/* Orbiting dot 1 */}
      <circle cx="30" cy="11.5" r="2.2" fill="#60a5fa" opacity="0.9" />
      <circle cx="30" cy="11.5" r="1" fill="white" opacity="0.6" />
      {/* Orbiting dot 2 (small) */}
      <circle cx="5" cy="22" r="1.4" fill="#818cf8" opacity="0.7" />
      <defs>
        <radialGradient id="planetGrad" cx="38%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  )
}

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
          <a href="/" className="flex items-center gap-2 flex-shrink-0">
            <SmawLogo size={34} />
            <span
              className="font-bold text-[#e2e8f8]"
              style={{ fontFamily: 'Inter', fontSize: '1.1rem', letterSpacing: '-0.02em' }}
            >
              SMAW
            </span>
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
