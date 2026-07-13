'use client'

import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const pillars = [
  {
    icon: 'fas fa-flag',
    color: '#2563eb',
    title: 'سعودي الهوية 100٪',
    desc: 'منتجاتنا مبنية أصلاً للسوق السعودي — متوافقة مع WPS وGOSI وZATCA ورؤية 2030. لا تعديلات إضافية ولا اشتراطات دولية لا تناسبك.',
  },
  {
    icon: 'fas fa-cubes',
    color: '#2563eb',
    title: 'منظومة متكاملة لا أدوات مبعثرة',
    desc: 'ثمانية منتجات تعمل معاً وتتبادل البيانات في الوقت الفعلي — موظف في HR يظهر تلقائياً في Payroll وTask وArchive.',
  },
  {
    icon: 'fas fa-robot',
    color: '#2563eb',
    title: 'ذكاء اصطناعي في كل منتج',
    desc: 'من محسّن الأوامر في Lipr إلى محاضر الاجتماعات في Meet والبحث الذكي في Archive — الـ AI ليس إضافة، هو جزء أساسي من كل منتج.',
  },
  {
    icon: 'fas fa-shield-alt',
    color: '#2563eb',
    title: 'أمان مؤسسي لا مساومة فيه',
    desc: 'تشفير JWT كامل، بيانات مُستضافة داخل المملكة، صلاحيات دقيقة لكل مستخدم، ونسخ احتياطي تلقائي. بياناتك ملكك وحدك.',
  },
  {
    icon: 'fas fa-headset',
    color: '#2563eb',
    title: 'دعم فني باللغة العربية',
    desc: 'فريق دعم سعودي يفهم بيئة عملك — لا تذاكر دولية ولا أوقات انتظار طويلة. نصل إليك بالعربية في نفس يوم العمل.',
  },
  {
    icon: 'fas fa-chart-line',
    color: '#2563eb',
    title: 'نمو بدون تعقيد',
    desc: 'سواء كنت شركة ناشئة من 10 موظفين أو مؤسسة من 500 — منتجاتنا تكبر معك دون إعادة بناء أو تغيير نظام.',
  },
]

export default function WhySMAW() {
  return (
    <section id="why" className="section border-t border-[rgba(148,163,184,0.07)]">
      <div className="container-smaw">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: EASE }}
          className="text-center mb-16"
        >
          <span className="badge mb-4">لماذا سماو</span>
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
            style={{ fontFamily: 'Cairo', lineHeight: 1.2 }}
          >
            ليس مجرد برنامج —{' '}
            <span className="gradient-text">شريك تشغيلي</span>
          </h2>
          <p
            className="text-[#7a93bc] max-w-[520px] mx-auto text-base leading-relaxed"
            style={{ fontFamily: 'Cairo' }}
          >
            الفرق بين سماو وغيرها ليس في الميزات فقط — بل في أننا نعرف السوق السعودي من الداخل ونبني له، لا نترجم له.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
              className="rounded-2xl p-6"
              style={{ background: 'rgba(13,21,37,0.8)', border: '1px solid rgba(148,163,184,0.09)' }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${p.color}15`, color: p.color }}
              >
                <i className={`${p.icon} text-base`} />
              </div>
              <h3
                className="text-base font-bold text-[#e2e8f8] mb-2"
                style={{ fontFamily: 'Cairo' }}
              >
                {p.title}
              </h3>
              <p
                className="text-sm text-[#7a93bc] leading-relaxed"
                style={{ fontFamily: 'Cairo' }}
              >
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="mt-12 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{ background: 'rgba(37,99,235,0.07)', border: '1px solid rgba(37,99,235,0.18)' }}
        >
          <div>
            <h3 className="text-xl font-bold text-[#e2e8f8] mb-1" style={{ fontFamily: 'Cairo' }}>
              هل أنت مستعد لتحويل شركتك رقمياً؟
            </h3>
            <p className="text-sm text-[#7a93bc]" style={{ fontFamily: 'Cairo' }}>
              ابدأ بجلسة استشارية مجانية — نفهم احتياجاتك ونوصي بالمنتجات المناسبة.
            </p>
          </div>
          <a
            href="#booking"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 text-sm shadow-[0_4px_20px_rgba(37,99,235,0.3)] whitespace-nowrap"
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

