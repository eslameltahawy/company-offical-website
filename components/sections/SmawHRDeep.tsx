'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const modules = [
  {
    id: 'employees',
    icon: 'fas fa-users',
    label: 'إدارة الموظفين',
    color: '#2563eb',
    headline: 'ملف موظف شامل — مصدر حقيقة واحد',
    desc: 'قاعدة بيانات مركزية لكل موظف: بيانات شخصية، تاريخ توظيف، هيكل تنظيمي، عقود — مع سجل كامل لكل تغيير يحدث.',
    features: [
      'إضافة موظف جديد في أقل من 3 دقائق',
      'هيكل تنظيمي تلقائي مع شجرة التقارير',
      'استيراد جماعي من Excel/CSV',
      'بوابة موظف ذاتية الخدمة',
      'سجل تدقيق لكل تعديل',
    ],
    stat: { value: '3 دقائق', label: 'لإضافة موظف جديد' },
  },
  {
    id: 'attendance',
    icon: 'fas fa-fingerprint',
    label: 'الحضور والانصراف',
    color: '#7c3aed',
    headline: 'تتبع الحضور آنياً — صفر ورق',
    desc: 'سجّل حضور وانصراف فريقك من الجوال أو الويب، مع تقارير فورية للتأخر والغياب والأوفر تايم.',
    features: [
      'تسجيل دخول/خروج من الجوال',
      'تقارير الحضور اليومية والشهرية',
      'كشف الغياب والتأخر تلقائياً',
      'احتساب الأوفر تايم للرواتب',
      'تنبيهات فورية للمديرين',
    ],
    stat: { value: '100%', label: 'رؤية آنية للفريق' },
  },
  {
    id: 'leaves',
    icon: 'fas fa-calendar-alt',
    label: 'الإجازات',
    color: '#0891b2',
    headline: 'إدارة الإجازات بدون واتساب',
    desc: 'طلبات الإجازة والموافقات كلها في مكان واحد — رصيد تلقائي، سياسات مرنة، وتقويم الفريق للتنسيق.',
    features: [
      'طلب وموافقة إجازة بضغطة واحدة',
      'رصيد تراكمي تلقائي لكل نوع إجازة',
      'سياسات مخصصة لكل قسم',
      'تقويم الفريق لتجنب التعارض',
      'ربط تلقائي بالرواتب',
    ],
    stat: { value: '85%', label: 'توفير في وقت موافقات الإجازة' },
  },
  {
    id: 'payroll',
    icon: 'fas fa-money-bill-wave',
    label: 'الرواتب وWPS',
    color: '#10b981',
    headline: 'رواتب في 10 دقائق — متوافق مع WPS',
    desc: 'معالجة كاملة للرواتب مع احتساب المكافآت والخصومات والبدلات تلقائياً، وتصدير ملف WPS للبنك مباشرة.',
    features: [
      'احتساب الرواتب تلقائياً (بدلات، خصومات)',
      'تصدير ملف WPS متوافق مع جميع البنوك',
      'قسائم راتب إلكترونية للموظفين',
      'تقارير GOSI والتأمينات الاجتماعية',
      'سجل رواتب تاريخي كامل',
    ],
    stat: { value: '10 دقائق', label: 'لإتمام دورة الرواتب كاملة' },
  },
  {
    id: 'performance',
    icon: 'fas fa-chart-line',
    label: 'تقييم الأداء',
    color: '#d97706',
    headline: 'تقييمات هادفة — ليس مجرد نموذج سنوي',
    desc: 'نظام تقييم مستمر يربط أهداف الموظف بأهداف الشركة، مع تقارير أداء تساعدك على اتخاذ قرارات التطوير والترقية.',
    features: [
      'تقييمات دورية ومنظمة',
      'ربط الأهداف الفردية بأهداف القسم',
      'ملاحظات مديرين مستمرة (1-on-1)',
      'تقارير أداء قابلة للتصدير',
      'مؤشرات إنذار مبكر للأداء الضعيف',
    ],
    stat: { value: '3×', label: 'تحسن في تفاعل الموظفين' },
  },
  {
    id: 'documents',
    icon: 'fas fa-archive',
    label: 'الوثائق والامتثال',
    color: '#e11d48',
    headline: 'لا وثيقة تنتهي دون إشعار',
    desc: 'أرشفة رقمية لكل وثائق الموظفين مع تتبع صلاحية الإقامات والتصاريح وتنبيهات تلقائية قبل الانتهاء.',
    features: [
      'أرشفة رقمية آمنة لجميع الوثائق',
      'تنبيهات انتهاء الصلاحية (30/60/90 يوم)',
      'توقيع إلكتروني على العقود',
      'تحكم دقيق في الصلاحيات',
      'تقارير الامتثال جاهزة للتدقيق',
    ],
    stat: { value: 'صفر', label: 'وثائق تنتهي بلا إشعار' },
  },
]

const complianceBadges = [
  { icon: 'fas fa-shield-alt', label: 'متوافق مع WPS', color: '#10b981' },
  { icon: 'fas fa-building', label: 'GOSI & HRDF', color: '#2563eb' },
  { icon: 'fas fa-gavel', label: 'نظام العمل السعودي', color: '#7c3aed' },
  { icon: 'fas fa-flag', label: 'رؤية 2030', color: '#f59e0b' },
]

export default function SmawHRDeep() {
  const [active, setActive] = useState('payroll')
  const mod = modules.find((m) => m.id === active)!

  return (
    <section
      id="hr"
      className="section border-t border-[rgba(148,163,184,0.07)]"
      style={{ background: 'rgba(10,16,32,0.8)' }}
    >
      <div className="container-smaw">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: EASE }}
          className="text-center mb-4"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="badge">FLAGSHIP PRODUCT</span>
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold"
              style={{ background: '#10b98120', color: '#10b981', border: '1px solid #10b98135' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
              متاح الآن
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
            style={{ fontFamily: 'Cairo', lineHeight: 1.2 }}
          >
            <span className="gradient-text">SMAW HR</span> — نظام الموارد البشرية
            <br />الأول المبني للسوق السعودي
          </h2>
          <p
            className="text-[#7a93bc] max-w-[540px] mx-auto text-base leading-relaxed"
            style={{ fontFamily: 'Cairo' }}
          >
            ستة وحدات متكاملة تُغطي دورة الموظف كاملة — من التوظيف حتى الراتب — في منصة
            واحدة مربوطة بمتطلبات المملكة
          </p>
        </motion.div>

        {/* Compliance badges */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {complianceBadges.map((b) => (
            <span
              key={b.label}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border"
              style={{
                fontFamily: 'Cairo',
                color: b.color,
                background: `${b.color}12`,
                borderColor: `${b.color}30`,
              }}
            >
              <i className={`${b.icon} text-[10px]`} />
              {b.label}
            </span>
          ))}
        </motion.div>

        {/* Module tabs + detail */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Module selector */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 flex-shrink-0 lg:w-52">
            {modules.map((m) => (
              <button
                key={m.id}
                onClick={() => setActive(m.id)}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap flex-shrink-0 lg:w-full lg:whitespace-normal text-right"
                style={{
                  fontFamily: 'Cairo',
                  background: active === m.id ? `${m.color}18` : 'rgba(13,21,37,0.5)',
                  border: `1px solid ${active === m.id ? m.color + '40' : 'rgba(148,163,184,0.08)'}`,
                  color: active === m.id ? m.color : '#7a93bc',
                  boxShadow: active === m.id ? `0 0 16px ${m.color}18` : 'none',
                }}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: active === m.id ? `${m.color}25` : 'rgba(148,163,184,0.06)',
                    color: active === m.id ? m.color : '#3d5270',
                  }}
                >
                  <i className={`${m.icon} text-[11px]`} />
                </div>
                {m.label}
              </button>
            ))}
          </div>

          {/* Module detail */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.28, ease: EASE }}
                className="h-full"
              >
                <div
                  className="rounded-2xl p-6 sm:p-8 border h-full"
                  style={{
                    background: 'rgba(13,21,37,0.7)',
                    borderColor: `${mod.color}20`,
                    boxShadow: `0 0 40px ${mod.color}08`,
                  }}
                >
                  <div className="flex flex-col sm:flex-row items-start gap-6">

                    {/* Left: content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: `${mod.color}18`, border: `1px solid ${mod.color}30`, color: mod.color }}
                        >
                          <i className={`${mod.icon} text-lg`} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[#e2e8f8]" style={{ fontFamily: 'Cairo' }}>
                            {mod.headline}
                          </h3>
                        </div>
                      </div>

                      <p className="text-sm text-[#7a93bc] leading-relaxed mb-6" style={{ fontFamily: 'Cairo' }}>
                        {mod.desc}
                      </p>

                      <ul className="space-y-2.5">
                        {mod.features.map((f, i) => (
                          <motion.li
                            key={f}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.06 }}
                            className="flex items-center gap-2.5 text-sm text-[#e2e8f8]"
                            style={{ fontFamily: 'Cairo' }}
                          >
                            <div
                              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{ background: `${mod.color}18`, border: `1px solid ${mod.color}30` }}
                            >
                              <i className="fas fa-check text-[8px]" style={{ color: mod.color }} />
                            </div>
                            {f}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Right: stat card */}
                    <div className="flex-shrink-0 sm:w-44">
                      <div
                        className="rounded-2xl p-5 text-center"
                        style={{
                          background: `${mod.color}10`,
                          border: `1px solid ${mod.color}25`,
                        }}
                      >
                        <p
                          className="text-3xl font-bold mb-1"
                          style={{ fontFamily: 'Inter', color: mod.color }}
                        >
                          {mod.stat.value}
                        </p>
                        <p className="text-xs text-[#7a93bc]" style={{ fontFamily: 'Cairo' }}>
                          {mod.stat.label}
                        </p>
                      </div>

                      <div className="mt-4 space-y-2">
                        <a
                          href="#booking"
                          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
                          style={{ background: mod.color, fontFamily: 'Cairo', boxShadow: `0 4px 20px ${mod.color}35` }}
                        >
                          احجز عرضاً <i className="fas fa-arrow-left text-xs" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8"
        >
          {[
            { value: '+50', label: 'شركة تستخدم SMAW HR', icon: 'fas fa-building' },
            { value: '10 د', label: 'متوسط وقت الرواتب', icon: 'fas fa-clock' },
            { value: '100%', label: 'توافق مع WPS', icon: 'fas fa-shield-alt' },
            { value: '48 س', label: 'وقت التطبيق والإعداد', icon: 'fas fa-rocket' },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl p-4 border text-center"
              style={{ background: 'rgba(13,21,37,0.6)', borderColor: 'rgba(148,163,184,0.07)' }}
            >
              <i className={`${s.icon} text-[#60a5fa] text-sm mb-2 block`} />
              <p className="text-xl font-bold text-[#e2e8f8] mb-0.5" style={{ fontFamily: 'Inter' }}>{s.value}</p>
              <p className="text-[10px] text-[#7a93bc]" style={{ fontFamily: 'Cairo' }}>{s.label}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
