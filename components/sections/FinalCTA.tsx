'use client'

import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const socialProof = [
  { value: '+50', label: 'شركة تثق بنا' },
  { value: '4 سنوات', label: 'خبرة في السوق السعودي' },
  { value: '100٪', label: 'توافق مع اللوائح المحلية' },
]

export default function FinalCTA() {
  return (
    <section
      className="relative overflow-hidden border-t border-[rgba(148,163,184,0.07)]"
      style={{ padding: 'clamp(5rem,10vw,9rem) 0' }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(37,99,235,0.12), transparent 70%)',
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(37,99,235,0.4), transparent)' }}
      />

      <div className="container-smaw relative">
        <div className="max-w-3xl mx-auto text-center">

          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mb-6"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold"
              style={{
                background: 'rgba(16,185,129,0.1)',
                border: '1px solid rgba(16,185,129,0.25)',
                color: '#10b981',
                fontFamily: 'Cairo',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
              شركات جديدة تنضم كل أسبوع
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
            className="font-bold tracking-tight mb-6"
            style={{ fontFamily: 'Cairo', fontSize: 'clamp(2rem,5vw,3.5rem)', lineHeight: 1.15 }}
          >
            شركتك تستحق أدوات{' '}
            <span className="gradient-text">أفضل من Excel</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
            className="text-[#7a93bc] text-lg leading-relaxed mb-10"
            style={{ fontFamily: 'Cairo' }}
          >
            انضم لأكثر من 50 شركة سعودية وخليجية تدير موارد بشريتها بذكاء وكفاءة مع SMAW —
            بدون تعقيد ودون رسوم مخفية
          </motion.p>

          {/* Social proof numbers */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            {socialProof.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-bold mb-1" style={{ fontFamily: 'Cairo', color: '#60a5fa' }}>{s.value}</p>
                <p className="text-sm text-[#3d5270]" style={{ fontFamily: 'Cairo' }}>{s.label}</p>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#booking"
              className="inline-flex items-center gap-2.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold px-10 py-4 rounded-2xl transition-all duration-200 hover:-translate-y-1 text-base"
              style={{
                fontFamily: 'Cairo',
                boxShadow: '0 10px 40px rgba(37,99,235,0.4)',
              }}
            >
              <i className="fas fa-calendar-check text-sm" />
              احجز عرضك المجاني الآن
            </a>
            <a
              href="#hr"
              className="inline-flex items-center gap-2 text-[#60a5fa] hover:text-white transition-colors text-sm font-semibold"
              style={{ fontFamily: 'Cairo' }}
            >
              تعرّف على المنتج أولاً
              <i className="fas fa-arrow-up text-xs" />
            </a>
          </motion.div>

          {/* Trust micro-copy */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mt-6 text-xs text-[#3d5270]"
            style={{ fontFamily: 'Cairo' }}
          >
            لا بطاقة ائتمانية مطلوبة • عرض توضيحي مجاني 30 دقيقة • فريق دعم سعودي
          </motion.p>

        </div>
      </div>
    </section>
  )
}

