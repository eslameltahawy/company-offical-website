'use client'

import { motion } from 'framer-motion'

const testimonials = [
  {
    quote: 'قبل SMAW HR كنا نُعدّ الرواتب يدوياً في Excel. الآن العملية كلها تتم تلقائياً ونراجعها فقط.',
    author: 'أحمد القحطاني',
    role: 'مدير الموارد البشرية',
    company: 'شركة مقاولات — الرياض',
    initial: 'أ',
    color: '#2563eb',
  },
  {
    quote: 'الدعم الفني سريع الاستجابة ويفهم متطلبات الشركات السعودية. لم نحتج لشرح السياق مطوّلاً.',
    author: 'منى الزهراني',
    role: 'المديرة التنفيذية',
    company: 'شركة خدمات لوجستية — جدة',
    initial: 'م',
    color: '#2563eb',
  },
  {
    quote: 'عملية إعداد نظام حماية الأجور كانت مقلقة، لكن الفريق أرشدنا خطوة بخطوة حتى الاعتماد.',
    author: 'فيصل العمري',
    role: 'CFO',
    company: 'شركة تقنية ناشئة — الدمام',
    initial: 'ف',
    color: '#2563eb',
  },
  {
    quote: 'وفّر علينا النظام ساعات طويلة كل شهر في إعداد الشؤون الإدارية. بسيط وعملي.',
    author: 'هند السهلي',
    role: 'مسؤولة الموارد البشرية',
    company: 'شركة تجزئة — الرياض',
    initial: 'هـ',
    color: '#2563eb',
  },
  {
    quote: 'أعجبني أن النظام يفهم اللوائح المحلية. لم أكن أتوقع هذا المستوى من التوافق مع نظام العمل السعودي.',
    author: 'خالد المطيري',
    role: 'مدير العمليات',
    company: 'شركة توزيع غذائي — القصيم',
    initial: 'خ',
    color: '#2563eb',
  },
  {
    quote: 'الواجهة واضحة ولا تحتاج لتدريب مطوّل. الموظفون تكيّفوا معها بسرعة.',
    author: 'نورة العتيبي',
    role: 'مديرة الإدارة',
    company: 'مكتب استشارات — الرياض',
    initial: 'ن',
    color: '#e11d48',
  },
  {
    quote: 'كنا نبحث عن نظام يناسب حجمنا كشركة متوسطة دون تكاليف ضخمة. وجدنا ما نحتاجه.',
    author: 'عبدالله الدوسري',
    role: 'صاحب المنشأة',
    company: 'مصنع صغير — المدينة المنورة',
    initial: 'ع',
    color: '#2563eb',
  },
  {
    quote: 'التقارير الشهرية أصبحت تُنجز في دقائق. سهّل علينا التدقيق السنوي بشكل واضح.',
    author: 'سلطان الشريف',
    role: 'المحاسب الرئيسي',
    company: 'شركة خدمات طبية — الرياض',
    initial: 'س',
    color: '#2563eb',
  },
]

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="section border-t border-[rgba(148,163,184,0.07)]"
      style={{ background: 'rgba(10,16,32,0.5)' }}
    >
      <div className="container-smaw">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="text-center mb-14"
        >
          <span className="badge mb-4">CLIENT STORIES</span>
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
            style={{ fontFamily: 'Cairo', lineHeight: 1.2 }}
          >
            ماذا يقول{' '}
            <span className="gradient-text">عملاؤنا</span>
          </h2>
          <p className="text-[#7a93bc] max-w-[440px] mx-auto text-sm" style={{ fontFamily: 'Cairo' }}>
            تجارب حقيقية من شركات تستخدم منتجاتنا في بيئة العمل اليومية
          </p>
        </motion.div>

        {/* Grid — 4 cols on xl, 3 on lg, 2 on md, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: i * 0.05 }}
              className="relative rounded-2xl p-5 border border-[rgba(148,163,184,0.08)] hover:border-[rgba(148,163,184,0.14)] transition-all duration-300 hover:-translate-y-0.5 flex flex-col"
              style={{ background: 'rgba(13,21,37,0.8)' }}
            >
              {/* Decorative quote mark */}
              <div
                className="absolute top-3 left-4 text-5xl leading-none font-serif opacity-[0.07] pointer-events-none select-none"
                style={{ color: t.color }}
              >
                "
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <i key={j} className="fas fa-star text-[#60a5fa] text-[10px]" />
                ))}
              </div>

              <p
                className="relative z-10 text-[#c8d6ee] text-xs leading-relaxed mb-4 flex-1"
                style={{ fontFamily: 'Cairo' }}
              >
                "{t.quote}"
              </p>

              <div className="flex items-center gap-2.5 border-t border-[rgba(148,163,184,0.07)] pt-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                  style={{ background: t.color }}
                >
                  {t.initial}
                </div>
                <div>
                  <p className="text-xs font-bold text-[#e2e8f8]" style={{ fontFamily: 'Cairo' }}>
                    {t.author}
                  </p>
                  <p className="text-[10px] text-[#7a93bc] leading-tight" style={{ fontFamily: 'Cairo' }}>
                    {t.role}
                  </p>
                  <p className="text-[9px] text-[#3d5270]" style={{ fontFamily: 'Cairo' }}>
                    {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

