'use client'

import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE, delay },
})

const stats = [
  { value: '+50',  label: 'شركة تعمل بمنتجاتنا' },
  { value: '4',    label: 'سنوات في السوق' },
  { value: '3',    label: 'منتجات SaaS نشطة' },
  { value: '100٪', label: 'سعودي الهوية' },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden mesh-bg pt-[68px]">

      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
        <svg className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#94a3b8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-[#2563eb]/6 blur-[90px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-purple-600/4 blur-[70px]" />
      </div>

      <div className="container-smaw relative z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Text column */}
          <div>
            <motion.div {...fadeUp(0)}>
              <span className="badge mb-6 inline-flex gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                Software Product House · Saudi-native
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp(0.1)}
              className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3rem] font-bold leading-[1.18] tracking-[-0.02em] mb-5"
              style={{ fontFamily: 'Cairo' }}
            >
              منصة برمجية واحدة{' '}
              <span className="gradient-text">لتشغيل شركتك</span>{' '}
              بالكامل
            </motion.h1>

            <motion.p
              {...fadeUp(0.2)}
              className="text-[#7a93bc] text-base leading-[1.9] max-w-[500px] mb-8"
              style={{ fontFamily: 'Cairo' }}
            >
              سماو بيت منتجات برمجية سعودي — نبني أنظمة تشغيل مؤسسية تُغطي الموارد البشرية
              والمحاسبة وإدارة المهام والأرشفة الرقمية في منصة واحدة متكاملة تدعم رؤية 2030.
            </motion.p>

            <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-3 mb-12">
              <a
                href="#booking"
                className="inline-flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold px-7 py-3 rounded-lg transition-all duration-200 hover:-translate-y-0.5 shadow-[0_4px_24px_rgba(37,99,235,0.35)] text-sm"
                style={{ fontFamily: 'Cairo' }}
              >
                احجز موعد عرض مجاني
                <i className="fas fa-arrow-left text-xs" />
              </a>
              <a
                href="#suite"
                className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/8 text-[#e2e8f8] border border-[rgba(148,163,184,0.12)] font-semibold px-7 py-3 rounded-lg transition-all duration-200 hover:-translate-y-0.5 text-sm"
                style={{ fontFamily: 'Cairo' }}
              >
                تعرف على SMAW Suite
              </a>
            </motion.div>

            {/* Social proof avatars */}
            <motion.div {...fadeUp(0.4)} className="flex items-center gap-4">
              <div className="flex -space-x-2 space-x-reverse">
                {['م', 'ف', 'خ', 'ع', 'ن'].map((l, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-[#030712] bg-gradient-to-br from-[#2563eb] to-[#7c3aed] flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
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

          {/* Dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              <div className="absolute inset-[-40px] rounded-3xl bg-[#2563eb]/5 blur-[50px]" />

              <div
                className="relative rounded-2xl overflow-hidden border border-[rgba(148,163,184,0.1)] shadow-[0_32px_80px_rgba(0,0,0,0.55)]"
                style={{ background: 'rgba(13,21,37,0.97)' }}
              >
                {/* Browser chrome */}
                <div
                  className="flex items-center gap-2 px-4 py-3 border-b border-[rgba(148,163,184,0.08)]"
                  style={{ background: 'rgba(10,16,32,0.9)' }}
                >
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
                  </div>
                  <div
                    className="flex-1 mx-4 py-1 px-3 rounded text-[10px] text-[#3d5270] border border-[rgba(148,163,184,0.06)] text-center"
                    style={{ fontFamily: 'Inter', background: 'rgba(0,0,0,0.3)' }}
                  >
                    app.smaw.io · لوحة التحكم
                  </div>
                  <div
                    className="flex items-center gap-1 text-[10px] text-[#10b981] px-2 py-0.5 rounded bg-[#10b981]/10 border border-[#10b981]/20"
                    style={{ fontFamily: 'Inter', fontWeight: 700 }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                    Live
                  </div>
                </div>

                {/* Body */}
                <div className="flex" style={{ height: 320 }}>
                  {/* Sidebar */}
                  <div
                    className="w-11 border-r border-[rgba(148,163,184,0.06)] flex flex-col items-center gap-1 py-3"
                    style={{ background: 'rgba(7,11,20,0.8)' }}
                  >
                    {['fa-th-large', 'fa-users', 'fa-tasks', 'fa-chart-bar', 'fa-file-invoice-dollar', 'fa-archive'].map((icon, i) => (
                      <div
                        key={icon}
                        className={`w-7 h-7 rounded-md flex items-center justify-center text-[10px] transition-all ${
                          i === 0
                            ? 'bg-[#2563eb]/15 text-[#60a5fa] border border-[#2563eb]/25'
                            : 'text-[#3d5270] hover:text-[#7a93bc]'
                        }`}
                      >
                        <i className={`fas ${icon}`} />
                      </div>
                    ))}
                  </div>

                  {/* Main panel */}
                  <div className="flex-1 p-3 flex flex-col gap-2 overflow-hidden" dir="rtl">
                    {/* KPIs */}
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { v: '48', l: 'موظف نشط' },
                        { v: '+8٪', l: 'نمو هذا الشهر', green: true },
                        { v: '5',  l: 'مهام معلقة' },
                      ].map((k) => (
                        <div
                          key={k.l}
                          className="rounded-lg p-2 border border-[rgba(148,163,184,0.06)]"
                          style={{ background: 'rgba(7,11,20,0.7)' }}
                        >
                          <div className={`text-sm font-bold font-[Inter] ${k.green ? 'text-[#10b981]' : 'text-[#e2e8f8]'}`}>{k.v}</div>
                          <div className="text-[9px] text-[#3d5270]" style={{ fontFamily: 'Cairo' }}>{k.l}</div>
                        </div>
                      ))}
                    </div>

                    {/* Chart */}
                    <div
                      className="rounded-lg p-2.5 border border-[rgba(148,163,184,0.06)]"
                      style={{ background: 'rgba(7,11,20,0.7)' }}
                    >
                      <div className="text-[9px] text-[#3d5270] mb-2 flex justify-between" style={{ fontFamily: 'Cairo' }}>
                        <span>الأداء الشهري</span>
                        <span className="text-[#60a5fa]">2026</span>
                      </div>
                      <div className="flex items-end gap-1" style={{ height: 44 }}>
                        {[38, 55, 42, 70, 50, 85, 64].map((h, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-t-sm"
                            style={{
                              height: `${h}%`,
                              background: i === 5 ? 'rgba(37,99,235,0.75)' : 'rgba(37,99,235,0.18)',
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Activity */}
                    <div className="flex flex-col gap-1.5">
                      {[
                        { dot: 'bg-[#2563eb]', text: 'إضافة موظف جديد', time: 'الآن' },
                        { dot: 'bg-[#10b981]', text: 'كشف رواتب معتمد', time: '3د' },
                        { dot: 'bg-[#f59e0b]', text: 'مهمة تقترب من الموعد', time: '15د' },
                      ].map((item) => (
                        <div
                          key={item.text}
                          className="flex items-center gap-2 rounded-lg px-2 py-1.5 border border-[rgba(148,163,184,0.05)]"
                          style={{ background: 'rgba(7,11,20,0.6)', fontFamily: 'Cairo', fontSize: 9 }}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.dot}`} />
                          <span className="flex-1 text-[#7a93bc]">{item.text}</span>
                          <span className="text-[#3d5270]" style={{ fontFamily: 'Inter' }}>{item.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 right-8 glass rounded-xl px-3 py-2 flex items-center gap-2 text-xs font-semibold shadow-xl"
                style={{ fontFamily: 'Cairo' }}
              >
                <i className="fas fa-check-circle text-[#10b981] text-sm" />
                متوافق مع رؤية 2030
              </motion.div>

              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -top-4 left-4 glass rounded-xl px-3 py-2 flex items-center gap-2 shadow-xl"
              >
                <i className="fas fa-robot text-[#60a5fa] text-sm" />
                <span className="text-[10px] text-[#7a93bc]" style={{ fontFamily: 'Cairo' }}>AI Agent مدمج</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-[rgba(148,163,184,0.08)]"
          style={{ background: 'rgba(148,163,184,0.06)' }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center py-6 px-4 text-center"
              style={{ background: 'rgba(13,21,37,0.9)' }}
            >
              <span
                className="block text-2xl sm:text-3xl font-bold mb-1 gradient-text-blue"
                style={{ fontFamily: 'Inter', letterSpacing: '-0.03em' }}
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
