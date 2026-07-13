'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const tiers = [
  {
    id: 'starter',
    name: 'أساسي',
    nameEn: 'Starter',
    priceMonthly: 19,
    priceAnnual: 15,
    unit: 'ر.س / موظف / شهر',
    target: 'للشركات الناشئة (10–50 موظف)',
    color: '#2563eb',
    popular: false,
    cta: 'ابدأ مجاناً',
    features: [
      'ملف موظف شامل',
      'تتبع الحضور والانصراف',
      'إدارة الإجازات',
      'أرشفة الوثائق (5 GB)',
      'تقارير أساسية',
      'تطبيق جوال',
      'دعم عبر البريد الإلكتروني',
    ],
    missing: ['معالجة الرواتب وWPS', 'تقييم الأداء', 'تقارير GOSI المتقدمة'],
  },
  {
    id: 'pro',
    name: 'احترافي',
    nameEn: 'Professional',
    priceMonthly: 45,
    priceAnnual: 36,
    unit: 'ر.س / موظف / شهر',
    target: 'للشركات النامية (50–200 موظف)',
    color: '#7c3aed',
    popular: true,
    cta: 'ابدأ تجربتك المجانية',
    features: [
      'كل مميزات الأساسي',
      'معالجة الرواتب الكاملة',
      'تصدير ملف WPS',
      'تقارير GOSI والتأمينات',
      'تقييم الأداء والأهداف',
      'أرشفة الوثائق (50 GB)',
      'تقارير مخصصة',
      'وصول API',
      'دعم أولوية (واتساب)',
    ],
    missing: [],
  },
  {
    id: 'enterprise',
    name: 'مؤسسي',
    nameEn: 'Enterprise',
    priceMonthly: 0,
    priceAnnual: 0,
    unit: 'تسعير مخصص',
    target: 'للمؤسسات الكبيرة (200+ موظف)',
    color: '#10b981',
    popular: false,
    cta: 'تواصل معنا',
    features: [
      'كل مميزات الاحترافي',
      'AI Agent لتحليل البيانات',
      'تحليلات متقدمة وتوقع الأداء',
      'أرشفة غير محدودة',
      'تسجيل دخول موحد (SSO)',
      'تكاملات مخصصة',
      'مدير حساب مخصص',
      'ضمان SLA 99.9%',
      'White-label خاص',
      'سجلات تدقيق شاملة',
    ],
    missing: [],
  },
]

export default function Pricing() {
  const [annual, setAnnual] = useState(false)

  return (
    <section
      id="pricing"
      className="section border-t border-[rgba(148,163,184,0.07)]"
      style={{ background: 'rgba(10,16,32,0.6)' }}
    >
      <div className="container-smaw">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: EASE }}
          className="text-center mb-12"
        >
          <span className="badge mb-4">PRICING</span>
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
            style={{ fontFamily: 'Cairo', lineHeight: 1.2 }}
          >
            باقات تناسب{' '}
            <span className="gradient-text">كل حجم شركة</span>
          </h2>
          <p
            className="text-[#7a93bc] max-w-[480px] mx-auto text-base leading-relaxed mb-8"
            style={{ fontFamily: 'Cairo' }}
          >
            ادفع فقط عن المستخدمين الفعليين — لا رسوم خفية، لا عقود طويلة
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3 p-1 rounded-xl" style={{ background: 'rgba(13,21,37,0.8)', border: '1px solid rgba(148,163,184,0.1)' }}>
            <button
              onClick={() => setAnnual(false)}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{
                fontFamily: 'Cairo',
                background: !annual ? 'rgba(37,99,235,0.2)' : 'transparent',
                color: !annual ? '#60a5fa' : '#3d5270',
                border: !annual ? '1px solid rgba(37,99,235,0.3)' : '1px solid transparent',
              }}
            >
              شهري
            </button>
            <button
              onClick={() => setAnnual(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{
                fontFamily: 'Cairo',
                background: annual ? 'rgba(37,99,235,0.2)' : 'transparent',
                color: annual ? '#60a5fa' : '#3d5270',
                border: annual ? '1px solid rgba(37,99,235,0.3)' : '1px solid transparent',
              }}
            >
              سنوي
              <span
                className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                style={{ background: '#10b98120', color: '#10b981', border: '1px solid #10b98130' }}
              >
                وفّر 20٪
              </span>
            </button>
          </div>
        </motion.div>

        {/* Tier cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
              className="relative rounded-2xl p-6 border flex flex-col"
              style={{
                background: tier.popular ? 'rgba(124,58,237,0.06)' : 'rgba(13,21,37,0.7)',
                borderColor: tier.popular ? 'rgba(124,58,237,0.35)' : 'rgba(148,163,184,0.08)',
                boxShadow: tier.popular ? '0 0 40px rgba(124,58,237,0.12)' : 'none',
              }}
            >
              {/* Popular badge */}
              {tier.popular && (
                <div
                  className="absolute -top-3 right-6 px-3 py-1 rounded-full text-[10px] font-bold"
                  style={{ background: tier.color, color: '#fff', fontFamily: 'Cairo' }}
                >
                  الأكثر مبيعاً
                </div>
              )}

              {/* Tier header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-lg"
                    style={{ background: `${tier.color}15`, color: tier.color, border: `1px solid ${tier.color}25`, fontFamily: 'Cairo' }}
                  >
                    {tier.nameEn}
                  </span>
                  <span className="text-base font-bold text-[#e2e8f8]" style={{ fontFamily: 'Cairo' }}>{tier.name}</span>
                </div>

                {tier.priceMonthly > 0 ? (
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-4xl font-bold" style={{ fontFamily: 'Cairo', color: tier.color }}>
                      {annual ? tier.priceAnnual : tier.priceMonthly}
                    </span>
                    <span className="text-sm text-[#3d5270]" style={{ fontFamily: 'Cairo' }}>{tier.unit}</span>
                  </div>
                ) : (
                  <p className="text-xl font-bold mb-1" style={{ fontFamily: 'Cairo', color: tier.color }}>
                    {tier.unit}
                  </p>
                )}
                <p className="text-xs text-[#3d5270]" style={{ fontFamily: 'Cairo' }}>{tier.target}</p>
              </div>

              {/* Features */}
              <ul className="space-y-2.5 flex-1 mb-6">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-[#e2e8f8]" style={{ fontFamily: 'Cairo' }}>
                    <i className="fas fa-check text-[9px] flex-shrink-0" style={{ color: tier.color }} />
                    {f}
                  </li>
                ))}
                {tier.missing.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-[#3d5270] line-through" style={{ fontFamily: 'Cairo' }}>
                    <i className="fas fa-times text-[9px] flex-shrink-0 text-[#3d5270]" />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#booking"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  fontFamily: 'Cairo',
                  background: tier.popular ? tier.color : `${tier.color}15`,
                  color: tier.popular ? '#fff' : tier.color,
                  border: `1px solid ${tier.color}30`,
                  boxShadow: tier.popular ? `0 6px 24px ${tier.color}35` : 'none',
                }}
              >
                {tier.cta} <i className="fas fa-arrow-left text-xs" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Trust footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-6 mt-10"
        >
          {[
            { icon: 'fas fa-lock', text: 'لا رسوم خفية' },
            { icon: 'fas fa-undo', text: 'إلغاء في أي وقت' },
            { icon: 'fas fa-headset', text: 'دعم سعودي' },
            { icon: 'fas fa-shield-alt', text: 'بيانات آمنة 100٪' },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-1.5 text-xs text-[#3d5270]" style={{ fontFamily: 'Cairo' }}>
              <i className={`${item.icon} text-[10px] text-[#2563eb]`} />
              {item.text}
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

