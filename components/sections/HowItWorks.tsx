'use client'

import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

/* ── Saudi character SVGs ──────────────────────────── */

/** Step 01 — Saudi man holding phone, booking a demo */
function SaudiBooking() {
  return (
    <svg viewBox="0 0 140 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Body / thobe */}
      <ellipse cx="70" cy="130" rx="34" ry="18" fill="rgba(37,99,235,0.08)" />
      <rect x="38" y="85" width="64" height="52" rx="14" fill="#f1f5f9" />
      {/* Collar line */}
      <path d="M60 85 Q70 95 80 85" stroke="#cbd5e1" strokeWidth="1.5" fill="none" />
      {/* Left arm — holding phone */}
      <path d="M38 100 Q22 108 24 120" stroke="#f1f5f9" strokeWidth="12" strokeLinecap="round" />
      {/* Phone */}
      <rect x="10" y="110" width="20" height="32" rx="4" fill="#1e293b" stroke="#2563eb" strokeWidth="1.5" />
      <rect x="12" y="113" width="16" height="22" rx="2" fill="#0f172a" />
      {/* Screen glow — calendar icon */}
      <rect x="14" y="115" width="12" height="10" rx="1.5" fill="#2563eb" opacity="0.8" />
      <line x1="14" y1="118" x2="26" y2="118" stroke="#60a5fa" strokeWidth="0.8" />
      <line x1="14" y1="120.5" x2="26" y2="120.5" stroke="#60a5fa" strokeWidth="0.8" />
      <line x1="14" y1="123" x2="20" y2="123" stroke="#60a5fa" strokeWidth="0.8" />
      <circle cx="20" cy="132" r="1.5" fill="#2563eb" opacity="0.6" />
      {/* Right arm — relaxed */}
      <path d="M102 100 Q118 112 116 122" stroke="#f1f5f9" strokeWidth="12" strokeLinecap="round" />
      {/* Head */}
      <circle cx="70" cy="60" r="24" fill="#c2a278" />
      {/* Shemagh / غترة */}
      <path d="M48 52 Q48 28 70 26 Q92 28 92 52 Q84 44 70 44 Q56 44 48 52Z" fill="#e2e8f8" />
      {/* Red shemagh pattern stripes */}
      <path d="M50 44 Q58 36 70 34 Q82 36 90 44" stroke="#ef4444" strokeWidth="1.2" fill="none" opacity="0.5" />
      <path d="M51 48 Q59 40 70 38 Q81 40 89 48" stroke="#ef4444" strokeWidth="0.8" fill="none" opacity="0.35" />
      {/* Agal — عقال */}
      <ellipse cx="70" cy="44" rx="22" ry="7" fill="#1e293b" />
      <ellipse cx="70" cy="42" rx="20" ry="5" fill="#0f172a" />
      {/* Face */}
      <ellipse cx="63" cy="62" rx="3" ry="3.5" fill="#a8845c" />
      <ellipse cx="77" cy="62" rx="3" ry="3.5" fill="#a8845c" />
      {/* Eyes */}
      <ellipse cx="63" cy="61" rx="1.8" ry="2" fill="#1e293b" />
      <ellipse cx="77" cy="61" rx="1.8" ry="2" fill="#1e293b" />
      <circle cx="63.7" cy="60.3" r="0.6" fill="white" />
      <circle cx="77.7" cy="60.3" r="0.6" fill="white" />
      {/* Smile */}
      <path d="M64 69 Q70 74 76 69" stroke="#8b6040" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Eyebrows */}
      <path d="M60 57 Q63 55 66 57" stroke="#5c3d1e" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M74 57 Q77 55 80 57" stroke="#5c3d1e" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* Notification bubble */}
      <circle cx="30" cy="108" r="8" fill="#10b981" />
      <text x="30" y="112" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="Inter">✓</text>
    </svg>
  )
}

/** Step 02 — Saudi man at laptop, setting up system */
function SaudiSetup() {
  return (
    <svg viewBox="0 0 140 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Desk shadow */}
      <ellipse cx="70" cy="138" rx="50" ry="10" fill="rgba(37,99,235,0.06)" />
      {/* Laptop base */}
      <rect x="20" y="112" width="100" height="8" rx="4" fill="#334155" />
      {/* Laptop screen */}
      <rect x="28" y="78" width="84" height="38" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
      <rect x="31" y="81" width="78" height="32" rx="4" fill="#0f172a" />
      {/* Screen content — dashboard */}
      <rect x="33" y="83" width="30" height="20" rx="2" fill="rgba(37,99,235,0.3)" />
      <rect x="65" y="83" width="20" height="9" rx="2" fill="rgba(16,185,129,0.3)" />
      <rect x="65" y="94" width="20" height="9" rx="2" fill="rgba(124,58,237,0.3)" />
      <rect x="87" y="83" width="20" height="20" rx="2" fill="rgba(245,158,11,0.2)" />
      {/* Chart bars inside left panel */}
      <rect x="36" y="97" width="4" height="4" rx="0.5" fill="#2563eb" />
      <rect x="42" y="93" width="4" height="8" rx="0.5" fill="#60a5fa" />
      <rect x="48" y="90" width="4" height="11" rx="0.5" fill="#2563eb" />
      <rect x="54" y="95" width="4" height="6" rx="0.5" fill="#60a5fa" />
      {/* Gear icon on right panel */}
      <circle cx="97" cy="93" r="4" stroke="#f59e0b" strokeWidth="1.2" fill="none" />
      <circle cx="97" cy="93" r="2" fill="#f59e0b" opacity="0.5" />
      {/* Body / thobe */}
      <rect x="42" y="55" width="56" height="30" rx="10" fill="#f1f5f9" />
      <path d="M60 55 Q70 63 80 55" stroke="#cbd5e1" strokeWidth="1.5" fill="none" />
      {/* Arms on keyboard */}
      <path d="M42 68 Q30 80 34 112" stroke="#f1f5f9" strokeWidth="11" strokeLinecap="round" />
      <path d="M98 68 Q110 80 106 112" stroke="#f1f5f9" strokeWidth="11" strokeLinecap="round" />
      {/* Hands */}
      <ellipse cx="36" cy="112" rx="8" ry="5" fill="#c2a278" />
      <ellipse cx="104" cy="112" rx="8" ry="5" fill="#c2a278" />
      {/* Head */}
      <circle cx="70" cy="36" r="21" fill="#c2a278" />
      {/* Shemagh */}
      <path d="M51 29 Q51 10 70 9 Q89 10 89 29 Q82 22 70 22 Q58 22 51 29Z" fill="#f8fafc" />
      <path d="M52 26 Q60 18 70 16 Q80 18 88 26" stroke="#ef4444" strokeWidth="1.2" fill="none" opacity="0.5" />
      <path d="M52 30 Q60 22 70 20 Q80 22 88 30" stroke="#ef4444" strokeWidth="0.8" fill="none" opacity="0.35" />
      {/* Agal */}
      <ellipse cx="70" cy="22" rx="20" ry="6" fill="#1e293b" />
      <ellipse cx="70" cy="20" rx="18" ry="4.5" fill="#0f172a" />
      {/* Eyes */}
      <ellipse cx="63" cy="37" rx="2" ry="2.2" fill="#1e293b" />
      <ellipse cx="77" cy="37" rx="2" ry="2.2" fill="#1e293b" />
      <circle cx="63.7" cy="36.3" r="0.6" fill="white" />
      <circle cx="77.7" cy="36.3" r="0.6" fill="white" />
      {/* Focused look — slight squint */}
      <path d="M60.5 34 Q63 32.5 65.5 34" stroke="#5c3d1e" strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M74.5 34 Q77 32.5 79.5 34" stroke="#5c3d1e" strokeWidth="1" fill="none" strokeLinecap="round" />
      {/* Mouth — neutral focus */}
      <path d="M65 44 Q70 46 75 44" stroke="#8b6040" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      {/* Progress badge */}
      <circle cx="108" cy="72" r="10" fill="#7c3aed" />
      <text x="108" y="76" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="Inter">⚙</text>
    </svg>
  )
}

/** Step 03 — Saudi man giving thumbs-up, success */
function SaudiSuccess() {
  return (
    <svg viewBox="0 0 140 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Shadow */}
      <ellipse cx="70" cy="140" rx="36" ry="10" fill="rgba(16,185,129,0.08)" />
      {/* Body / thobe */}
      <rect x="36" y="82" width="68" height="55" rx="14" fill="#f1f5f9" />
      <path d="M58 82 Q70 93 82 82" stroke="#cbd5e1" strokeWidth="1.5" fill="none" />
      {/* Left arm — thumbs up */}
      <path d="M36 98 Q18 92 16 80" stroke="#f1f5f9" strokeWidth="12" strokeLinecap="round" />
      {/* Thumb-up hand */}
      <rect x="8" y="62" width="14" height="20" rx="6" fill="#c2a278" />
      <path d="M10 62 Q14 52 18 58 L22 62" fill="#c2a278" />
      <path d="M10 62 Q14 52 18 58" stroke="#a8845c" strokeWidth="0.8" fill="none" />
      {/* Right arm — raised celebration */}
      <path d="M104 98 Q120 86 118 72" stroke="#f1f5f9" strokeWidth="12" strokeLinecap="round" />
      {/* Open hand right */}
      <ellipse cx="118" cy="66" rx="9" ry="7" fill="#c2a278" />
      {/* Stars / sparkles */}
      <path d="M118 50 L119.5 46 L121 50 L125 51.5 L121 53 L119.5 57 L118 53 L114 51.5Z" fill="#f59e0b" opacity="0.8" />
      <path d="M128 60 L129 57.5 L130 60 L132.5 61 L130 62 L129 64.5 L128 62 L125.5 61Z" fill="#10b981" opacity="0.7" />
      <circle cx="110" cy="48" r="2.5" fill="#2563eb" opacity="0.6" />
      {/* Head */}
      <circle cx="70" cy="58" r="23" fill="#c2a278" />
      {/* Shemagh */}
      <path d="M49 50 Q49 28 70 26 Q91 28 91 50 Q83 42 70 42 Q57 42 49 50Z" fill="#f8fafc" />
      <path d="M50 46 Q59 37 70 35 Q81 37 90 46" stroke="#ef4444" strokeWidth="1.3" fill="none" opacity="0.55" />
      <path d="M50 50 Q59 41 70 39 Q81 41 90 50" stroke="#ef4444" strokeWidth="0.8" fill="none" opacity="0.35" />
      {/* Shemagh side drape */}
      <path d="M49 50 Q44 62 48 78" stroke="#f1f5f9" strokeWidth="8" strokeLinecap="round" />
      {/* Agal */}
      <ellipse cx="70" cy="42" rx="21" ry="6.5" fill="#1e293b" />
      <ellipse cx="70" cy="40" rx="19" ry="5" fill="#0f172a" />
      {/* Big happy eyes */}
      <ellipse cx="62" cy="59" rx="3.5" ry="4" fill="#1e293b" />
      <ellipse cx="78" cy="59" rx="3.5" ry="4" fill="#1e293b" />
      <circle cx="63.2" cy="58" r="1.2" fill="white" />
      <circle cx="79.2" cy="58" r="1.2" fill="white" />
      {/* Big smile */}
      <path d="M62 68 Q70 76 78 68" stroke="#8b6040" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Cheek blush */}
      <ellipse cx="57" cy="65" rx="4" ry="2.5" fill="#f87171" opacity="0.25" />
      <ellipse cx="83" cy="65" rx="4" ry="2.5" fill="#f87171" opacity="0.25" />
      {/* Eyebrows — raised happy */}
      <path d="M58.5 54 Q62 51 65.5 54" stroke="#5c3d1e" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <path d="M74.5 54 Q78 51 81.5 54" stroke="#5c3d1e" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      {/* Success badge */}
      <circle cx="100" cy="78" r="12" fill="#10b981" />
      <path d="M94 78 L98 82 L106 74" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ── Steps data ───────────────────────────────────── */
const steps = [
  {
    num: '01',
    title: 'احجز عرضاً مجانياً',
    desc: 'أرسل بياناتك عبر النموذج في الأسفل ويتواصل معك أحد مختصينا خلال يوم عمل لترتيب جلسة عرض 30 دقيقة مخصصة لشركتك.',
    icon: 'fas fa-calendar-check',
    color: '#2563eb',
    Character: SaudiBooking,
    bullets: ['مكالمة 30 دقيقة مع متخصص', 'عرض مخصص لاحتياجاتك', 'بدون أي التزام'],
  },
  {
    num: '02',
    title: 'إعداد النظام في 48 ساعة',
    desc: 'فريق الإعداد لدينا يساعدك في رفع بيانات الموظفين وضبط الإعدادات والسياسات — النظام جاهز للاستخدام خلال يومين.',
    icon: 'fas fa-cogs',
    color: '#7c3aed',
    Character: SaudiSetup,
    bullets: ['رفع بيانات الموظفين الحاليين', 'ضبط الرواتب والسياسات', 'تدريب الفريق مجاناً'],
  },
  {
    num: '03',
    title: 'انطلق بثقة كاملة',
    desc: 'رواتب تُصرف بضغطة زر، إجازات تُعتمد من الجوال، وتقارير WPS وGOSI جاهزة في ثوانٍ — مع دعم مستمر على مدار الساعة.',
    icon: 'fas fa-rocket',
    color: '#10b981',
    Character: SaudiSuccess,
    bullets: ['رواتب في 10 دقائق', 'تقارير WPS تلقائية', 'دعم سعودي مستمر'],
  },
]

export default function HowItWorks() {
  return (
    <section
      id="how"
      className="section border-t border-[rgba(148,163,184,0.07)]"
    >
      <div className="container-smaw">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: EASE }}
          className="text-center mb-16"
        >
          <span className="badge mb-4">HOW IT WORKS</span>
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
            style={{ fontFamily: 'Cairo', lineHeight: 1.2 }}
          >
            ابدأ في{' '}
            <span className="gradient-text">3 خطوات بسيطة</span>
          </h2>
          <p
            className="text-[#7a93bc] max-w-[480px] mx-auto text-base leading-relaxed"
            style={{ fontFamily: 'Cairo' }}
          >
            لا تحتاج لمشروع تقني معقد أو أشهر من الإعداد —
            فريقنا يُرافقك من الخطوة الأولى حتى التشغيل الكامل
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line — desktop only, below character cards */}
          <motion.div
            className="hidden lg:block absolute h-[2px] overflow-hidden rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.5 }}
            style={{
              top: '156px',
              right: 'calc(16.66% + 52px)',
              width: 'calc(66.66% - 104px)',
              transformOrigin: 'right',
              background: 'linear-gradient(to left, rgba(16,185,129,0.6), rgba(124,58,237,0.5), rgba(37,99,235,0.6))',
              boxShadow: '0 0 8px rgba(37,99,235,0.3)',
            }}
          >
            {/* Moving shimmer dot */}
            <motion.div
              className="absolute top-0 h-full w-8 rounded-full"
              initial={{ right: '100%' }}
              whileInView={{ right: '-2rem' }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: EASE, delay: 0.5 }}
              style={{ background: 'linear-gradient(to left, transparent, rgba(255,255,255,0.7), transparent)' }}
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.65, ease: EASE, delay: i * 0.15 }}
                className="flex flex-col items-center text-center"
              >
                {/* Character illustration */}
                <div className="relative mb-6 z-10">
                  <div
                    className="w-[140px] h-[140px] rounded-3xl mx-auto flex items-center justify-center overflow-visible"
                    style={{
                      background: `${step.color}0c`,
                      border: `1.5px solid ${step.color}28`,
                      boxShadow: `0 8px 30px ${step.color}12`,
                    }}
                  >
                    <step.Character />
                  </div>
                  {/* Step number badge */}
                  <div
                    className="absolute -top-2 -right-2 w-9 h-9 rounded-xl flex items-center justify-center border-2 border-[#030712] font-bold text-white text-xs"
                    style={{ background: step.color, fontFamily: 'Cairo', boxShadow: `0 4px 12px ${step.color}50` }}
                  >
                    {step.num}
                  </div>
                </div>

                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${step.color}15`, border: `1px solid ${step.color}30`, color: step.color }}
                >
                  <i className={`${step.icon} text-sm`} />
                </div>

                <h3
                  className="text-lg font-bold mb-3 text-[#e2e8f8]"
                  style={{ fontFamily: 'Cairo' }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-sm text-[#7a93bc] leading-relaxed mb-5"
                  style={{ fontFamily: 'Cairo', maxWidth: 280 }}
                >
                  {step.desc}
                </p>

                {/* Bullets */}
                <ul className="space-y-1.5 text-right w-full max-w-[240px]">
                  {step.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-xs" style={{ fontFamily: 'Cairo', color: '#7a93bc' }}>
                      <i className="fas fa-check text-[8px] flex-shrink-0" style={{ color: step.color }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-14"
        >
          <a
            href="#booking"
            className="inline-flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-[0_8px_30px_rgba(37,99,235,0.35)]"
            style={{ fontFamily: 'Cairo' }}
          >
            <i className="fas fa-calendar-check text-sm" />
            ابدأ الخطوة الأولى مجاناً
          </a>
          <div className="flex items-center gap-2 text-xs text-[#3d5270]" style={{ fontFamily: 'Cairo' }}>
            <i className="fas fa-lock text-[10px]" />
            لا يوجد التزام — عرض مجاني بالكامل
          </div>
        </motion.div>

      </div>
    </section>
  )
}

