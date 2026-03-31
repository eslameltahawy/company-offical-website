'use client'

import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const pains = [
  {
    icon: 'fas fa-file-excel',
    title: 'Excel لا يكفي',
    desc: 'إعداد الرواتب يدوياً في جداول بيانات يستغرق أياماً كل شهر ومعرض للأخطاء المكلفة.',
    color: '#ef4444',
  },
  {
    icon: 'fab fa-whatsapp',
    title: 'إجازات عبر واتساب',
    desc: 'طلبات الإجازة والموافقات تضيع في المحادثات — لا سجل موحد ولا توازن دقيق للرصيد.',
    color: '#f97316',
  },
  {
    icon: 'fas fa-user-slash',
    title: 'لا تعرف من غائب الآن',
    desc: 'لا رؤية آنية لحضور الفريق — تكتشف المشكلة فقط عند مراجعة الكشف في نهاية الشهر.',
    color: '#eab308',
  },
  {
    icon: 'fas fa-file-invoice',
    title: 'تقارير GOSI تأكل وقتك',
    desc: 'جمع بيانات التأمينات الاجتماعية ونظام حماية الأجور من مصادر متعددة يستنزف فريق HR.',
    color: '#ef4444',
  },
  {
    icon: 'fas fa-folder-open',
    title: 'وثائق تنتهي دون إشعار',
    desc: 'إقامات وعقود وتصاريح عمل تنتهي فجأة لأنه لا يوجد نظام تنبيه واضح ومسبق.',
    color: '#f97316',
  },
  {
    icon: 'fas fa-clock',
    title: '70% من وقت HR مهدر',
    desc: 'فرق الموارد البشرية غارقة في المهام الإدارية المتكررة بدلاً من الاستراتيجية والتطوير.',
    color: '#eab308',
  },
]

export default function PainPoints() {
  return (
    <section
      className="section border-t border-[rgba(148,163,184,0.07)]"
      style={{ background: 'rgba(15,6,28,0.6)' }}
    >
      <div className="container-smaw">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: EASE }}
          className="text-center mb-14"
        >
          <span className="badge mb-4" style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', borderColor: 'rgba(239,68,68,0.25)' }}>
            THE PROBLEM
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
            style={{ fontFamily: 'Cairo', lineHeight: 1.25 }}
          >
            هل تعاني من{' '}
            <span style={{ color: '#f87171' }}>هذه المشاكل</span> كل يوم؟
          </h2>
          <p
            className="text-[#7a93bc] max-w-[520px] mx-auto text-base leading-relaxed"
            style={{ fontFamily: 'Cairo' }}
          >
            الشركات السعودية تخسر آلاف ساعات العمل سنوياً بسبب أنظمة HR متقادمة
            وعمليات يدوية لا تنتهي
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {pains.map((pain, i) => (
            <motion.div
              key={pain.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.07 }}
              className="group rounded-2xl p-5 border transition-all duration-300 cursor-default"
              style={{
                background: 'rgba(239,68,68,0.03)',
                borderColor: 'rgba(239,68,68,0.1)',
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300"
                  style={{
                    background: `${pain.color}18`,
                    border: `1px solid ${pain.color}30`,
                  }}
                >
                  <i className={`${pain.icon} text-sm`} style={{ color: pain.color }} />
                </div>
                <div>
                  <h3
                    className="font-bold text-[#e2e8f8] mb-1 text-sm"
                    style={{ fontFamily: 'Cairo' }}
                  >
                    {pain.title}
                  </h3>
                  <p
                    className="text-xs text-[#7a93bc] leading-relaxed"
                    style={{ fontFamily: 'Cairo' }}
                  >
                    {pain.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Solution bridge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <div
            className="flex items-center gap-3 px-6 py-3.5 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(37,99,235,0.1), rgba(16,185,129,0.08))',
              border: '1px solid rgba(37,99,235,0.2)',
            }}
          >
            <div className="w-8 h-8 rounded-full bg-[#10b981]/15 border border-[#10b981]/30 flex items-center justify-center flex-shrink-0">
              <i className="fas fa-check text-[#10b981] text-xs" />
            </div>
            <p className="text-sm font-semibold text-[#e2e8f8]" style={{ fontFamily: 'Cairo' }}>
              SMAW HR يحل كل هذه المشاكل — في منصة واحدة مبنية أصلاً للسوق السعودي
            </p>
          </div>
          <a
            href="#suite"
            className="flex items-center gap-2 text-sm font-semibold text-[#60a5fa] hover:text-white transition-colors whitespace-nowrap"
            style={{ fontFamily: 'Cairo' }}
          >
            اكتشف الحل <i className="fas fa-arrow-down text-xs" />
          </a>
        </motion.div>

      </div>
    </section>
  )
}
