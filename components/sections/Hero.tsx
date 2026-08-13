'use client'

import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE, delay },
})

const stats = [
  { value: '8',    label: 'منتجات برمجية' },
  { value: '+50',  label: 'شركة سعودية' },
  { value: '4',    label: 'منتجات مكتملة' },
  { value: '100٪', label: 'سعودي الهوية' },
]

const products = [
  { name: 'HR',      live: true,  color: '#2563eb' },
  { name: 'Connect', live: true,  color: '#2563eb' },
  { name: 'Theme',   live: true,  color: '#2563eb' },
  { name: 'Lipr',    live: true,  color: '#2563eb' },
  { name: 'Meet',    live: false, color: '#2563eb' },
  { name: 'Finance', live: false, color: '#2563eb' },
  { name: 'Task',    live: false, color: '#2563eb' },
  { name: 'Archive', live: false, color: '#2563eb' },
]

const headlineWords = [
  { text: 'إدارة',   gradient: false },
  { text: 'منظومة', gradient: true  },
  { text: 'كاملة',  gradient: false },
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden mesh-bg pt-14 lg:pt-[68px] lg:min-h-screen lg:flex lg:items-center">
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#94a3b8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-[#2563eb]/5 blur-[100px]" />
      </div>

      {/* ── MOBILE HERO ─────────────────────────────────────────── */}
      <div className="lg:hidden relative z-10 px-4 pt-8 pb-6">
        <h1
          className="text-[2.35rem] font-bold leading-[1.25] tracking-tight mb-4"
          style={{ fontFamily: 'Cairo' }}
        >
          {headlineWords.map((word) => (
            <span key={word.text} className={`inline-block ml-1.5 ${word.gradient ? 'gradient-text' : ''}`}>
              {word.text}
            </span>
          ))}
        </h1>

        <motion.p
          {...fadeUp(0.2)}
          className="text-[#7a93bc] text-sm leading-[1.85] mb-6"
          style={{ fontFamily: 'Cairo' }}
        >
          متخصصين في أنظمة برمجة المؤسسات وتشغيل الشركات في السوق السعودي بما يتوافق مع رؤية السعودية للتشغيل الرقمي 2030 بحلول مبتكرة خاصة بنا.
        </motion.p>

        <motion.div {...fadeUp(0.35)} className="flex flex-col gap-2.5 mb-7">
          <a
            href="#products"
            className="w-full inline-flex items-center justify-center gap-2 bg-[#2563eb] text-white font-bold py-3.5 rounded-2xl text-sm shadow-[0_8px_28px_rgba(37,99,235,0.35)]"
            style={{ fontFamily: 'Cairo' }}
          >
            استكشف منتجاتنا
            <i className="fas fa-arrow-left text-xs" />
          </a>
          <a
            href="#booking"
            className="w-full inline-flex items-center justify-center gap-2 bg-white/[0.06] border border-[rgba(148,163,184,0.14)] text-[#e2e8f8] font-bold py-3.5 rounded-2xl text-sm"
            style={{ fontFamily: 'Cairo' }}
          >
            احجز استشارة مجانية
          </a>
        </motion.div>

        <motion.div {...fadeUp(0.45)} className="grid grid-cols-2 gap-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl px-3 py-4 text-center"
              style={{ background: 'rgba(13,21,37,0.95)', border: '1px solid rgba(148,163,184,0.1)' }}
            >
              <div className="text-xl font-bold gradient-text-blue mb-1" style={{ fontFamily: 'Cairo' }}>
                {s.value}
              </div>
              <div className="text-[11px] text-[#7a93bc]" style={{ fontFamily: 'Cairo' }}>{s.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.p {...fadeUp(0.55)} className="mt-5 text-xs text-[#3d5270] text-center" style={{ fontFamily: 'Cairo' }}>
          أكثر من 50 شركة تستخدم منتجاتنا في السعودية
        </motion.p>
      </div>

      {/* ── DESKTOP HERO ────────────────────────────────────────── */}
      <div className="hidden lg:block container-smaw relative z-10 py-20 w-full">
        <div className="grid grid-cols-2 gap-16 items-center">
          <div>
            <h1
              className="text-[3rem] font-bold leading-[1.3] tracking-[-0.02em] mb-5"
              style={{ fontFamily: 'Cairo', overflow: 'hidden' }}
            >
              {headlineWords.map((word, i) => (
                <motion.span
                  key={word.text}
                  initial={{ opacity: 0, y: 32, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.12, ease: EASE }}
                  className={`inline-block ml-2 ${word.gradient ? 'gradient-text' : ''}`}
                >
                  {word.text}
                </motion.span>
              ))}
            </h1>

            <motion.p
              {...fadeUp(0.85)}
              className="text-[#7a93bc] text-base leading-[1.9] max-w-[500px] mb-8"
              style={{ fontFamily: 'Cairo' }}
            >
              متخصصين في أنظمة برمجة المؤسسات وتشغيل الشركات في السوق السعودي بما يتوافق مع رؤية السعودية للتشغيل الرقمي 2030 بحلول مبتكرة خاصة بنا.
            </motion.p>

            <motion.div {...fadeUp(1.0)} className="flex flex-wrap gap-3 mb-12">
              <a
                href="#products"
                className="inline-flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold px-7 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-[0_4px_24px_rgba(37,99,235,0.35)] text-sm"
                style={{ fontFamily: 'Cairo' }}
              >
                استكشف منتجاتنا
                <i className="fas fa-arrow-left text-xs" />
              </a>
              <a
                href="#booking"
                className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/8 text-[#e2e8f8] border border-[rgba(148,163,184,0.12)] font-semibold px-7 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 text-sm"
                style={{ fontFamily: 'Cairo' }}
              >
                احجز استشارة مجانية
              </a>
            </motion.div>

            <motion.div {...fadeUp(1.1)} className="flex items-center gap-4">
              <div className="flex -space-x-2 space-x-reverse">
                {['م', 'ف', 'خ', 'ع', 'ن'].map((l, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-[#030712] bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ zIndex: 5 - i }}
                  >
                    {l}
                  </div>
                ))}
              </div>
              <p className="text-sm text-[#7a93bc]" style={{ fontFamily: 'Cairo' }}>
                <span className="text-[#e2e8f8] font-semibold">أكثر من 50 شركة</span> تستخدم منتجاتنا في السعودية
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute inset-[-40px] rounded-3xl bg-[#2563eb]/5 blur-[60px]" />
            <div
              className="relative rounded-2xl overflow-hidden border border-[rgba(148,163,184,0.1)] shadow-[0_32px_80px_rgba(0,0,0,0.55)]"
              style={{ background: 'rgba(13,21,37,0.97)' }}
            >
              <div
                className="flex items-center gap-2 px-4 py-3 border-b border-[rgba(148,163,184,0.08)]"
                style={{ background: 'rgba(10,16,32,0.9)' }}
              >
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3d5270]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3d5270]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
                </div>
                <div
                  className="flex-1 mx-4 py-1 px-3 rounded text-[10px] text-[#3d5270] border border-[rgba(148,163,184,0.06)] text-center"
                  style={{ fontFamily: 'Cairo', background: 'rgba(0,0,0,0.3)' }}
                >
                  smaww.com
                </div>
                <div
                  className="flex items-center gap-1 text-[10px] text-[#60a5fa] px-2 py-0.5 rounded bg-[#2563eb]/10 border border-[#2563eb]/20"
                  style={{ fontFamily: 'Cairo', fontWeight: 700 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb] animate-pulse" />
                  8 Products
                </div>
              </div>

              <div className="p-4" dir="rtl">
                <div className="text-[9px] text-[#3d5270] mb-3 font-bold uppercase tracking-[2px]" style={{ fontFamily: 'Cairo' }}>
                  SMAW Product Suite
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {products.map((p, i) => (
                    <motion.div
                      key={p.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.07, duration: 0.35, ease: EASE }}
                      className="flex flex-col items-center justify-center gap-1.5 py-3 px-2 rounded-xl"
                      style={{
                        background: p.live ? `${p.color}10` : 'rgba(7,11,20,0.55)',
                        border: p.live ? `1px solid ${p.color}25` : '1px solid rgba(148,163,184,0.07)',
                      }}
                    >
                      <span
                        className="text-[11px] font-bold leading-none"
                        style={{ fontFamily: 'Cairo', color: p.live ? '#e2e8f8' : '#3d5270' }}
                      >
                        {p.name}
                      </span>
                      <span
                        className="text-[8px] font-semibold uppercase tracking-wider"
                        style={{ fontFamily: 'Cairo', color: p.live ? '#60a5fa' : '#3d5270' }}
                      >
                        {p.live ? 'Live' : 'Soon'}
                      </span>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {[
                    { v: '4', l: 'منتجات نشطة', c: '#2563eb' },
                    { v: '50+', l: 'شركة', c: '#60a5fa' },
                    { v: '100%', l: 'سعودي', c: '#60a5fa' },
                  ].map((s) => (
                    <div
                      key={s.l}
                      className="rounded-lg p-2 text-center"
                      style={{ background: 'rgba(7,11,20,0.7)', border: '1px solid rgba(148,163,184,0.06)' }}
                    >
                      <div className="text-sm font-bold" style={{ fontFamily: 'Cairo', color: s.c }}>{s.v}</div>
                      <div className="text-[8px] text-[#3d5270]" style={{ fontFamily: 'Cairo' }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
          className="mt-16 grid grid-cols-4 gap-px rounded-2xl overflow-hidden border border-[rgba(148,163,184,0.08)]"
          style={{ background: 'rgba(148,163,184,0.06)' }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center py-6 px-4 text-center"
              style={{ background: 'rgba(13,21,37,0.9)' }}
            >
              <span
                className="block text-3xl font-bold mb-1 gradient-text-blue"
                style={{ fontFamily: 'Cairo', letterSpacing: '-0.03em' }}
              >
                {s.value}
              </span>
              <span className="text-xs text-[#7a93bc]" style={{ fontFamily: 'Cairo' }}>{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
