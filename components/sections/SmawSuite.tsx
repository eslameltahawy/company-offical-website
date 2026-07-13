'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

/*
  5-SECOND STORY
  ──────────────
  When the section enters the viewport a staggered animation sequence fires:
  0.0s  Central hub fades + scales in
  0.3s  Tagline appears
  0.5s  SMAW HR pillar (live product) radiates outward — highlighted
  0.7s  Accounting pillar
  0.9s  Tasks pillar
  1.1s  Archive pillar
  1.3s  Meetings pillar
  1.8s  AI Agent badge pulses in
  2.1s  Saudi-native badge appears
*/

const pillars = [
  {
    id: 'hr',
    label: 'SMAW HR',
    sublabel: 'متاح الآن',
    icon: 'fas fa-users',
    color: '#2563eb',
    angle: -90,
    live: true,
    desc: 'إدارة الموظفين، الرواتب، الحضور والإجازات — المنتج الأول المطلق. مبني وفق نظام العمل السعودي ونظام حماية الأجور.',
    bullets: ['رواتب متوافقة مع WPS', 'تقارير GOSI والزكاة', 'بوابة موظف ذاتية الخدمة'],
  },
  {
    id: 'accounting',
    label: 'المحاسبة',
    sublabel: 'قريباً',
    icon: 'fas fa-file-invoice-dollar',
    color: '#7c3aed',
    angle: -18,
    live: false,
    desc: 'مسك الحسابات والفوترة الإلكترونية المتوافقة مع هيئة الزكاة والضريبة والجمارك — مع تقارير الأرباح والخسائر الفورية.',
    bullets: ['فاتورة إلكترونية ZATCA', 'مراكز التكلفة', 'تقارير مالية آنية'],
  },
  {
    id: 'tasks',
    label: 'إدارة المهام',
    sublabel: 'قريباً',
    icon: 'fas fa-tasks',
    color: '#0891b2',
    angle: 54,
    live: false,
    desc: 'إسناد المهام، تتبع التقدم، واكتشاف التأخير مبكراً — مع مساعد AI يرتّب الأولويات بناءً على بيانات فريقك.',
    bullets: ['لوحة Kanban مرنة', 'تنبيهات تأخير استباقية', 'ربط بوحدة HR'],
  },
  {
    id: 'archive',
    label: 'الأرشيف الرقمي',
    sublabel: 'قريباً',
    icon: 'fas fa-archive',
    color: '#059669',
    angle: 126,
    live: false,
    desc: 'تخزين سحابي آمن للملفات مع تصنيف ذكي واسترجاع فوري — بيئة عمل خالية من الورق بالكامل.',
    bullets: ['بحث داخل الملفات بـ AI', 'صلاحيات دقيقة لكل مستند', 'نسخ احتياطي تلقائي'],
  },
  {
    id: 'meetings',
    label: 'الاجتماعات',
    sublabel: 'قريباً',
    icon: 'fas fa-video',
    color: '#d97706',
    angle: 198,
    live: false,
    desc: 'مراسلات داخلية واجتماعات فيديو مشفرة مع توليد محاضر تلقائي — دون برامج خارجية.',
    bullets: ['فيديو مشفر end-to-end', 'محاضر اجتماعات تلقائية', 'ربط بإدارة المهام'],
  },
]

const RADIUS = 135

function polar(angle: number, r: number) {
  const rad = ((angle - 90) * Math.PI) / 180
  return { x: r * Math.cos(rad), y: r * Math.sin(rad) }
}

export default function SmawSuite() {
  const [active, setActive] = useState<string | null>(null)
  const activePillar = pillars.find((p) => p.id === active)

  return (
    <section
      id="suite"
      className="section border-t border-[rgba(148,163,184,0.07)]"
      style={{ background: 'rgba(10,16,32,0.6)' }}
    >
      <div className="container-smaw">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="text-center mb-16"
        >
          <span className="badge mb-4">THE SOLUTION</span>
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
            style={{ fontFamily: 'Cairo', lineHeight: 1.2 }}
          >
            SMAW Suite —{' '}
            <span className="gradient-text">قلبك التشغيلي النابض</span>
          </h2>
          <p
            className="text-[#7a93bc] max-w-[560px] mx-auto text-base leading-relaxed"
            style={{ fontFamily: 'Cairo' }}
          >
            نظام شامل All-in-One مبني أصلاً للسوق السعودي — يضم 5 ركائز متكاملة تُغطي عمليات شركتك بالكامل
            مع مساعد AI يساعدك في اتخاذ القرارات.
          </p>
        </motion.div>

        {/* Badges row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {[
            { icon: 'fas fa-flag',  label: 'Saudi-native 100٪', color: '#10b981' },
            { icon: 'fas fa-robot', label: 'AI Agent مدمج',      color: '#60a5fa' },
            { icon: 'fas fa-check', label: 'رؤية 2030 متوافق',   color: '#a78bfa' },
          ].map((b, i) => (
            <motion.span
              key={b.label}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border"
              style={{
                fontFamily: 'Cairo',
                color: b.color,
                background: `${b.color}12`,
                borderColor: `${b.color}30`,
              }}
            >
              <i className={`${b.icon} text-[10px]`} />
              {b.label}
            </motion.span>
          ))}
        </motion.div>

        {/* Hub + panel */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16">

          {/* SVG Hub — 5-second stagger story */}
          <div className="relative flex-shrink-0" style={{ width: 360, height: 360 }}>
            <svg
              viewBox="-180 -180 360 360"
              className="absolute inset-0 w-full h-full"
              style={{ overflow: 'visible' }}
            >
              {/* Rings */}
              <circle cx="0" cy="0" r="155" fill="none" stroke="rgba(37,99,235,0.06)" strokeWidth="1" strokeDasharray="4 5" />
              <circle cx="0" cy="0" r="105" fill="none" stroke="rgba(37,99,235,0.04)" strokeWidth="1" />

              {/* Connection lines */}
              {pillars.map((p, i) => {
                const pos = polar(p.angle, RADIUS)
                const isActive = active === p.id
                return (
                  <motion.line
                    key={`line-${p.id}`}
                    x1="0" y1="0" x2={pos.x} y2={pos.y}
                    stroke={isActive ? p.color : 'rgba(37,99,235,0.1)'}
                    strokeWidth={isActive ? 1.5 : 1}
                    strokeDasharray={isActive ? '0' : '3 4'}
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.2, duration: 0.5 }}
                    style={{ transition: 'stroke 0.3s' }}
                  />
                )
              })}

              {/* Center hub */}
              <motion.g
                initial={{ scale: 0.4, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              >
                <circle cx="0" cy="0" r="52" fill="rgba(13,21,37,0.97)" stroke="rgba(37,99,235,0.3)" strokeWidth="1.5" />
                <circle cx="0" cy="0" r="46" fill="rgba(37,99,235,0.08)" />
              </motion.g>
            </svg>

            {/* Center label */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="absolute flex flex-col items-center justify-center pointer-events-none"
              style={{ width: 104, height: 104, left: 'calc(50% - 52px)', top: 'calc(50% - 52px)' }}
            >
              <div className="w-8 h-8 rounded-lg bg-[#2563eb] flex items-center justify-center mb-1 glow-blue-sm">
                <span className="text-white font-bold text-sm" style={{ fontFamily: 'Cairo' }}>S</span>
              </div>
              <span className="text-[9px] text-[#60a5fa] font-bold tracking-[1.5px]" style={{ fontFamily: 'Cairo' }}>SUITE</span>
              <span className="text-[8px] text-[#10b981] mt-0.5" style={{ fontFamily: 'Cairo' }}>AI مدمج</span>
            </motion.div>

            {/* Pillar buttons — stagger outward from center (5-second story) */}
            {pillars.map((p, i) => {
              const pos = polar(p.angle, RADIUS)
              const isActive = active === p.id
              const cssX = ((pos.x + 180) / 360) * 100
              const cssY = ((pos.y + 180) / 360) * 100
              return (
                <motion.button
                  key={p.id}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  onClick={() => setActive(isActive ? null : p.id)}
                  className="absolute flex flex-col items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
                  style={{
                    width: 62,
                    height: 62,
                    left: `calc(${cssX}% - 31px)`,
                    top: `calc(${cssY}% - 31px)`,
                    background: isActive
                      ? `${p.color}22`
                      : p.live
                        ? 'rgba(37,99,235,0.08)'
                        : 'rgba(13,21,37,0.95)',
                    border: isActive
                      ? `2px solid ${p.color}`
                      : p.live
                        ? '1.5px solid rgba(37,99,235,0.4)'
                        : '1px solid rgba(148,163,184,0.12)',
                    boxShadow: isActive
                      ? `0 0 22px ${p.color}35`
                      : p.live
                        ? '0 0 12px rgba(37,99,235,0.2)'
                        : 'none',
                    color: isActive ? p.color : p.live ? '#60a5fa' : '#7a93bc',
                  }}
                  aria-label={p.label}
                >
                  <i className={`${p.icon} text-sm`} />
                  <span
                    className="text-[7.5px] font-bold mt-0.5 leading-tight text-center px-1"
                    style={{ fontFamily: 'Cairo', color: 'inherit' }}
                  >
                    {p.label}
                  </span>
                  {p.live && (
                    <span
                      className="absolute -top-1.5 -left-1 text-[6px] font-bold px-1.5 py-0.5 rounded-full bg-[#10b981] text-white"
                      style={{ fontFamily: 'Cairo' }}
                    >
                      LIVE
                    </span>
                  )}
                </motion.button>
              )
            })}
          </div>

          {/* Description panel */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.3 }}
            className="max-w-[420px] w-full"
          >
            {activePillar ? (
              <motion.div
                key={activePillar.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: `${activePillar.color}15`, border: `1px solid ${activePillar.color}30`, color: activePillar.color }}
                  >
                    <i className={`${activePillar.icon} text-lg`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold" style={{ fontFamily: 'Cairo', color: activePillar.color }}>
                      {activePillar.label}
                    </h3>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{
                        fontFamily: 'Cairo',
                        background: activePillar.live ? '#10b98120' : 'rgba(148,163,184,0.08)',
                        color: activePillar.live ? '#10b981' : '#7a93bc',
                        border: `1px solid ${activePillar.live ? '#10b98135' : 'rgba(148,163,184,0.1)'}`,
                      }}
                    >
                      {activePillar.sublabel}
                    </span>
                  </div>
                </div>

                <p className="text-[#7a93bc] text-sm leading-relaxed mb-5" style={{ fontFamily: 'Cairo' }}>
                  {activePillar.desc}
                </p>

                <ul className="space-y-2 mb-6">
                  {activePillar.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2.5 text-sm text-[#e2e8f8]" style={{ fontFamily: 'Cairo' }}>
                      <i className="fas fa-check text-[#10b981] text-xs flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>

                {activePillar.live ? (
                  <a
                    href="#booking"
                    className="inline-flex items-center gap-2 text-sm font-semibold bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-5 py-2.5 rounded-lg transition-colors"
                    style={{ fontFamily: 'Cairo' }}
                  >
                    احجز عرضاً الآن <i className="fas fa-arrow-left text-xs" />
                  </a>
                ) : (
                  <a
                    href="#booking"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#10b981] hover:text-white transition-colors"
                    style={{ fontFamily: 'Cairo' }}
                  >
                    سجّل اهتمامك <i className="fas fa-arrow-left text-xs" />
                  </a>
                )}
              </motion.div>
            ) : (
              <div>
                <span className="badge mb-4">اضغط على أي ركيزة</span>
                <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Cairo' }}>
                  خمس ركائز،<br />
                  <span className="gradient-text">نظام واحد متكامل</span>
                </h3>
                <p className="text-[#7a93bc] leading-relaxed mb-6 text-sm" style={{ fontFamily: 'Cairo' }}>
                  SMAW Suite يُلغي الحاجة لأدوات متعددة لا تتكامل — كل ركيزة تعمل مع الأخرى
                  ومساعد AI مدمج يُحلّل البيانات ويُقدّم توصيات تشغيلية.
                </p>

                <div className="grid grid-cols-1 gap-3 mb-6">
                  {[
                    { icon: 'fas fa-robot', label: 'AI Agent يساعد في اتخاذ القرارات بناءً على بيانات شركتك' },
                    { icon: 'fas fa-flag',  label: 'سعودي الهوية 100٪ — متوافق مع رؤية 2030 ومتطلبات العمل' },
                    { icon: 'fas fa-lock',  label: 'حماية مؤسسية للبيانات مع نسخ احتياطي سحابي' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#2563eb]/10 border border-[#2563eb]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <i className={`${item.icon} text-[#60a5fa] text-xs`} />
                      </div>
                      <p className="text-sm text-[#7a93bc] leading-relaxed" style={{ fontFamily: 'Cairo' }}>{item.label}</p>
                    </div>
                  ))}
                </div>

                {/* SMAW HR — live product highlight */}
                <div className="p-4 rounded-xl border border-[#2563eb]/25 bg-[#2563eb]/5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                    <span className="text-xs font-bold text-[#10b981]" style={{ fontFamily: 'Cairo' }}>متاح الآن للاشتراك</span>
                  </div>
                  <p className="text-sm text-[#e2e8f8] font-bold mb-1" style={{ fontFamily: 'Cairo' }}>SMAW HR</p>
                  <p className="text-xs text-[#7a93bc] mb-3" style={{ fontFamily: 'Cairo' }}>
                    المنتج الأول المطلق — إدارة الموارد البشرية والرواتب لشركات السوق السعودي.
                  </p>
                  <a
                    href="#booking"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#60a5fa] hover:text-white transition-colors"
                    style={{ fontFamily: 'Cairo' }}
                  >
                    احجز عرض مجاني <i className="fas fa-arrow-left text-[10px]" />
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

