'use client'

import { motion } from 'framer-motion'

const features = [
  {
    icon: 'fas fa-cloud',
    title: 'البنية السحابية',
    desc: 'بنية تحتية مُهيَّأة للذروة — قواعد بيانات محسَّنة وشبكة CDN تضمن استجابة سريعة في أي وقت.',
    color: '#2563eb',
    from: { x: -30, y: -20 },
  },
  {
    icon: 'fas fa-store',
    title: 'التجارة الرقمية',
    desc: 'منصات تجارة إلكترونية مُختبرة في الإنتاج الفعلي مع نظام queue ذكي يعالج الطلبات دون فقدان.',
    color: '#7c3aed',
    from: { x: 0, y: -30 },
  },
  {
    icon: 'fas fa-cubes',
    title: 'تطبيقات SaaS',
    desc: 'أنظمة تشغيل مؤسسية تُوحّد سير العمل من HR إلى المالية وإدارة المهام في منصة واحدة.',
    color: '#0891b2',
    from: { x: 30, y: -20 },
  },
  {
    icon: 'fas fa-robot',
    title: 'أتمتة بالذكاء الاصطناعي',
    desc: 'دمج قدرات AI عملية تُقلّص المهام الروتينية — مساعد ذكي يقترح ويُنجز بناءً على بيانات شركتك.',
    color: '#059669',
    from: { x: -30, y: 20 },
  },
  {
    icon: 'fas fa-plug',
    title: 'ربط API والتكامل',
    desc: 'ربط مُتقَن مع بوابات الدفع وشركات الشحن وأي نظام خارجي، مع معالجة أخطاء لا تؤثر على المستخدم.',
    color: '#d97706',
    from: { x: 0, y: 30 },
  },
  {
    icon: 'fas fa-pen-nib',
    title: 'تصميم UI/UX',
    desc: 'واجهات مبنية بمنطق المنتج لا التزيين — تُبسّط العمليات وتُقلّص وقت تعلّم النظام.',
    color: '#e11d48',
    from: { x: 30, y: 20 },
  },
]

export default function Features() {
  return (
    <section id="features" className="section border-t border-[rgba(148,163,184,0.07)]">
      <div className="container-smaw">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="text-center mb-14"
        >
          <span className="badge mb-4">CAPABILITIES</span>
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
            style={{ fontFamily: 'Cairo', lineHeight: 1.2 }}
          >
            ما الذي{' '}
            <span className="gradient-text">نتقنه</span>
          </h2>
          <p
            className="text-[#7a93bc] max-w-[460px] mx-auto text-base leading-relaxed"
            style={{ fontFamily: 'Cairo' }}
          >
            ست كفاءات تغطي دورة المنتج الرقمي كاملة — من البنية التحتية حتى الواجهة التي يراها المستخدم.
          </p>
        </motion.div>

        {/* Cards — assembly animation: each card enters from a unique direction */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, x: f.from.x, y: f.from.y, scale: 0.88 }}
              whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                delay: i * 0.07,
              }}
              className="group relative rounded-2xl p-6 border border-[rgba(148,163,184,0.08)] hover:border-[rgba(148,163,184,0.16)] transition-all duration-300 hover:-translate-y-1 cursor-default"
              style={{ background: 'rgba(13,21,37,0.7)' }}
            >
              {/* Hover gradient */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `radial-gradient(circle at 0% 0%, ${f.color}0a 0%, transparent 60%)` }}
              />

              {/* Icon */}
              <motion.div
                className="relative w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{
                  background: `${f.color}15`,
                  border: `1px solid ${f.color}25`,
                  color: f.color,
                }}
                whileHover={{ scale: 1.12 }}
                transition={{ duration: 0.2 }}
              >
                <i className={`${f.icon} text-base`} />
              </motion.div>

              <h3
                className="relative text-base font-bold mb-2 text-[#e2e8f8]"
                style={{ fontFamily: 'Cairo' }}
              >
                {f.title}
              </h3>
              <p
                className="relative text-sm text-[#7a93bc] leading-relaxed"
                style={{ fontFamily: 'Cairo' }}
              >
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
