'use client'

import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const pillars = [
  {
    icon: 'fas fa-flag',
    color: '#2563eb',
    title: 'هوية سعودية خضراء',
    short: 'مصممة للسوق السعودي ومتوافقة مع الأنظمة المحلية.',
    desc: 'منتجاتنا خاصة للسوق السعودي ومتوافقة مع WPS وGOSI وZATCA ورؤية 2030. منظومة متكاملة سلسة وبدون تعقيدات أو اشتراطات.',
  },
  {
    icon: 'fas fa-cubes',
    color: '#2563eb',
    title: 'منظومة متكاملة سلسة وبدون تعقيدات',
    short: 'ثمانية منتجات تتبادل البيانات في الوقت الفعلي.',
    desc: 'ثمانية منتجات تعمل كشبكة رقمية عالية المستوى وتتبادل البيانات في الوقت الفعلي. موظف في HR يظهر تلقائياً في Payroll وTask وArchive.',
  },
  {
    icon: 'fas fa-robot',
    color: '#2563eb',
    title: 'ذكاء اصطناعي في كل منتج',
    short: 'الـ AI جزء أساسي من كل منتج وليس إضافة.',
    desc: 'محسّن الأوامر في Lipr، محاضر الاجتماعات في Meet، وبحث ذكي في Archive. الـ AI ليس إضافة، هو جزء أساسي من كل منتج.',
  },
  {
    icon: 'fas fa-shield-alt',
    color: '#2563eb',
    title: 'أمان مؤسسي لا مساومة فيه',
    short: 'تشفير كامل وبيانات داخل المملكة.',
    desc: 'تشفير JWT كامل، بيانات مُضافة داخل المملكة، صلاحيات دقيقة لكل مستخدم، ونسخ احتياطي تلقائي. بياناتك ملكك وحدك.',
  },
  {
    icon: 'fas fa-headset',
    color: '#2563eb',
    title: 'دعم فني باللغة العربية',
    short: 'فريق سعودي يصل إليك في نفس يوم العمل.',
    desc: 'فريق دعم سعودي يفهم بيئة عملك بدون تعقيدات. نصل إليك بالعربية في نفس يوم العمل.',
  },
  {
    icon: 'fas fa-chart-line',
    color: '#2563eb',
    title: 'نمو احترافي لمؤسستك',
    short: 'تكبر معك من الشركة الناشئة إلى الكبيرة.',
    desc: '8 تطبيقات تخدم الشركات، الناشئة والكبيرة. منتجاتنا تكبر معك دون إعادة بناء أو تغيير نظام.',
  },
]

function PillarCard({ p }: { p: (typeof pillars)[number] }) {
  return (
    <div
      className="rounded-2xl p-5 lg:p-6 h-full"
      style={{ background: 'rgba(13,21,37,0.9)', border: '1px solid rgba(148,163,184,0.09)' }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
        style={{ background: `${p.color}15`, color: p.color }}
      >
        <i className={`${p.icon} text-lg`} />
      </div>
      <h3 className="text-base font-bold text-[#e2e8f8] mb-2" style={{ fontFamily: 'Cairo' }}>
        {p.title}
      </h3>
      <p className="text-sm text-[#94a3b8] leading-relaxed mb-2 lg:hidden" style={{ fontFamily: 'Cairo' }}>
        {p.short}
      </p>
      <p className="hidden lg:block text-sm text-[#7a93bc] leading-relaxed" style={{ fontFamily: 'Cairo' }}>
        {p.desc}
      </p>
    </div>
  )
}

export default function WhySMAW() {
  return (
    <section id="why" className="section border-t border-[rgba(148,163,184,0.07)]">
      <div className="container-smaw">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: EASE }}
          className="text-center mb-8 lg:mb-16"
        >
          <p className="text-xs font-bold text-[#60a5fa] mb-3 tracking-wide" style={{ fontFamily: 'Cairo' }}>
            لماذا سماو
          </p>
          <h2
            className="text-2xl lg:text-4xl font-bold tracking-tight mb-3 lg:mb-4"
            style={{ fontFamily: 'Cairo', lineHeight: 1.2 }}
          >
            لماذا سماو؟{' '}
            <span className="gradient-text">الشريك التشغيلي الذكي</span>
          </h2>
          <p className="text-[#7a93bc] max-w-[520px] mx-auto text-sm lg:text-base leading-relaxed" style={{ fontFamily: 'Cairo' }}>
            نفهمك ونحقق لمؤسستك الاحترافية المطلوبة بالسوق السعودي
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: EASE }}
            >
              <PillarCard p={p} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="mt-8 lg:mt-12 rounded-2xl p-5 lg:p-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 lg:gap-6"
          style={{ background: 'rgba(37,99,235,0.07)', border: '1px solid rgba(37,99,235,0.18)' }}
        >
          <div>
            <h3 className="text-lg lg:text-xl font-bold text-[#e2e8f8] mb-1" style={{ fontFamily: 'Cairo' }}>
              مستعد للتحول الرقمي اللي بيطور شركتك؟
            </h3>
            <p className="text-sm text-[#7a93bc]" style={{ fontFamily: 'Cairo' }}>
              ابدأ بجلسة استشارية مجانية، نفهم احتياجاتك ونوصي بالمناسب لك
            </p>
          </div>
          <a
            href="#booking"
            className="w-full lg:w-auto inline-flex items-center justify-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold px-6 py-3.5 rounded-2xl lg:rounded-xl text-sm shadow-[0_4px_20px_rgba(37,99,235,0.3)]"
            style={{ fontFamily: 'Cairo' }}
          >
            احجز استشارة مجانية
            <i className="fas fa-arrow-left text-xs" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
