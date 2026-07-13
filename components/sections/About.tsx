'use client'

import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const stats = [
  { value: '+50', label: 'شركة سعودية تستخدم منتجاتنا', color: '#2563eb' },
  { value: '8', label: 'منتجات برمجية متخصصة', color: '#7c3aed' },
  { value: '4+', label: 'سنوات خبرة في السوق', color: '#10b981' },
  { value: '100%', label: 'سعودي الهوية والفريق', color: '#f59e0b' },
]

const values5S = [
  { letter: 'Q', title: 'Quality', arabic: 'الجودة', desc: 'لا نُسلّم إلا ما يصمد تحت أقصى ضغط', color: '#2563eb' },
  { letter: 'Sp', title: 'Speed', arabic: 'السرعة', desc: 'نُنجز في ساعات ما يأخذ الآخرون أياماً', color: '#7c3aed' },
  { letter: 'Sk', title: 'Spark', arabic: 'الإبداع', desc: 'نفكر خارج الصندوق في كل مشروع', color: '#10b981' },
  { letter: 'Sc', title: 'Scale', arabic: 'التوسع', desc: 'نبني للنمو من اليوم الأول', color: '#f59e0b' },
  { letter: 'Su', title: 'Support', arabic: 'الدعم', desc: 'لسنا بائعي برمجيات — نحن شركاء نجاحك', color: '#ef4444' },
]

const services = [
  { icon: 'fas fa-code', title: 'تطوير برمجيات مخصص', desc: 'حلول مبنية من الصفر بأعلى معايير الجودة' },
  { icon: 'fas fa-cloud', title: 'هندسة SaaS', desc: 'منصات سحابية قابلة للتوسع بهندسة هجينة' },
  { icon: 'fas fa-plug', title: 'تكامل API', desc: 'ربط أنظمتك مع أي خدمة خارجية بسلاسة' },
  { icon: 'fas fa-server', title: 'DevOps & البنية التحتية', desc: 'CI/CD وإدارة الخوادم والسحابة' },
  { icon: 'fas fa-brain', title: 'الذكاء الاصطناعي', desc: 'دمج AI في منتجاتك لتعزيز الكفاءة' },
  { icon: 'fas fa-robot', title: 'الأتمتة الذكية', desc: 'أتمتة العمليات المتكررة لتحرير طاقة فريقك' },
  { icon: 'fas fa-lightbulb', title: 'استشارات تقنية', desc: 'نساعدك في الاختيار الصحيح من البداية' },
  { icon: 'fas fa-paint-brush', title: 'تصميم UI/UX', desc: 'واجهات أنيقة تُبهج المستخدم وتزيد التحويل' },
]

const methodologyPhases = [
  { num: '01', title: 'التخطيط الاستراتيجي', desc: 'تحليل المتطلبات وبناء خارطة المشروع الكاملة مع العميل', color: '#2563eb', icon: 'fas fa-map-marked-alt' },
  { num: '02', title: 'التطوير التكراري', desc: 'دورات Agile قصيرة مع تسليم مستمر وتغذية راجعة دورية', color: '#7c3aed', icon: 'fas fa-sync-alt' },
  { num: '03', title: 'ضمان الجودة', desc: 'اختبارات شاملة يدوية وآلية قبل كل إصدار', color: '#10b981', icon: 'fas fa-shield-check' },
  { num: '04', title: 'التواصل المستمر', desc: 'تقارير أسبوعية وقناة تواصل مباشرة طوال المشروع', color: '#f59e0b', icon: 'fas fa-comments' },
]

const aboutProducts = [
  {
    name: 'المنتجات المكتملة',
    tagline: 'جاهزة للاشتراك الآن',
    desc: 'SMAW HR وSMAW Connect وSMAW Theme وSMAW Lipr — أربعة منتجات مكتملة تخدم أكثر من 50 شركة سعودية. كل منتج يحل مشكلة حقيقية بأداء عالي وامتثال للوائح المحلية.',
    color: '#10b981',
    icon: 'fas fa-check-circle',
    stat: '4 منتجات',
    statLabel: 'متاحة الآن',
  },
  {
    name: 'المنتجات قيد التطوير',
    tagline: 'إطلاق قريب',
    desc: 'SMAW Meet وSMAW Finance وSMAW Task وSMAW Archive — أربعة منتجات في مراحل نهائية من التطوير. سجّل اهتمامك للحصول على وصول مبكر وأسعار إطلاق حصرية.',
    color: '#f59e0b',
    icon: 'fas fa-rocket',
    stat: '4 منتجات',
    statLabel: 'قيد التطوير',
  },
]

export default function About() {
  return (
    <section
      id="about"
      className="section border-t border-[rgba(148,163,184,0.07)]"
    >
      <div className="container-smaw">

        {/* ── Header ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: EASE }}
          className="text-center mb-16"
        >
          <span className="badge mb-4">ABOUT</span>
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
            style={{ fontFamily: 'Cairo', lineHeight: 1.2 }}
          >
            من نحن —{' '}
            <span className="gradient-text">بيت منتجات تقنية سعودي</span>
          </h2>
          <p
            className="text-[#7a93bc] max-w-[560px] mx-auto text-base leading-relaxed"
            style={{ fontFamily: 'Cairo' }}
          >
            SMAW Software شركة سعودية متخصصة في بناء منتجات وأنظمة برمجية عالية الأداء
            — نؤمن أن التقنية يجب أن تُحل مشاكل حقيقية، لا أن تخلق تعقيداً إضافياً.
          </p>
        </motion.div>

        {/* ── Stats ──────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.1 }}
              className="text-center p-5 rounded-2xl"
              style={{
                background: `${s.color}08`,
                border: `1px solid ${s.color}20`,
              }}
            >
              <p className="text-3xl font-bold mb-1" style={{ fontFamily: 'Inter', color: s.color }}>{s.value}</p>
              <p className="text-xs text-[#3d5270] leading-snug" style={{ fontFamily: 'Cairo' }}>{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* ── Vision & Mission ──────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {[
            {
              icon: 'fas fa-eye',
              title: 'رؤيتنا',
              titleEn: 'Vision',
              body: 'بناء أنظمة رقمية ذكية وقابلة للتوسع تُشكّل مستقبل الشركات في المنطقة — عبر تقنيات هجينة تجمع بين الموثوقية والابتكار.',
              color: '#2563eb',
            },
            {
              icon: 'fas fa-bullseye',
              title: 'مهمتنا',
              titleEn: 'Mission',
              body: 'تسليم منتجات وأنظمة برمجية عالية الأداء تُشغّل شركات حقيقية وتصمد تحت أقصى ضغط — بدون تعقيد، وبدون مفاجآت.',
              color: '#7c3aed',
            },
            {
              icon: 'fas fa-flag',
              title: 'هدفنا الاستراتيجي',
              titleEn: 'Goal',
              body: 'قيادة السوق في مجال البنية التقنية الهجينة والأدوات المدعومة بالذكاء الاصطناعي — مع الحفاظ على هويتنا السعودية 100%.',
              color: '#10b981',
            },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.12 }}
              className="p-6 rounded-2xl"
              style={{
                background: `${card.color}07`,
                border: `1px solid ${card.color}22`,
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${card.color}15`, border: `1px solid ${card.color}30` }}
              >
                <i className={`${card.icon} text-sm`} style={{ color: card.color }} />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: card.color, fontFamily: 'Inter' }}>{card.titleEn}</p>
              <h3 className="text-lg font-bold text-[#e2e8f8] mb-3" style={{ fontFamily: 'Cairo' }}>{card.title}</h3>
              <p className="text-sm text-[#7a93bc] leading-relaxed" style={{ fontFamily: 'Cairo' }}>{card.body}</p>
            </motion.div>
          ))}
        </div>

        {/* ── 5S Values ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-20"
        >
          <div className="text-center mb-10">
            <span className="badge mb-3">CORE VALUES</span>
            <h3 className="text-2xl font-bold text-[#e2e8f8]" style={{ fontFamily: 'Cairo' }}>
              قيمنا الخمس — <span className="gradient-text">5S Framework</span>
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {values5S.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
                className="p-5 rounded-2xl text-center"
                style={{
                  background: `${v.color}08`,
                  border: `1px solid ${v.color}22`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 font-black text-lg"
                  style={{ background: `${v.color}18`, border: `1px solid ${v.color}35`, color: v.color, fontFamily: 'Inter' }}
                >
                  {v.letter}
                </div>
                <p className="font-bold text-xs text-[#e2e8f8] mb-0.5" style={{ fontFamily: 'Inter' }}>{v.title}</p>
                <p className="text-[10px] font-semibold mb-2" style={{ color: v.color, fontFamily: 'Cairo' }}>{v.arabic}</p>
                <p className="text-[11px] text-[#3d5270] leading-snug" style={{ fontFamily: 'Cairo' }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Products ──────────────────────────── */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <span className="badge mb-3">PRODUCTS</span>
            <h3 className="text-2xl font-bold text-[#e2e8f8]" style={{ fontFamily: 'Cairo' }}>
              منتجاتنا — <span className="gradient-text">8 حلول لإدارة شركتك</span>
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aboutProducts.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, x: i === 0 ? 24 : -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.65, ease: EASE, delay: i * 0.1 }}
                className="p-7 rounded-2xl"
                style={{
                  background: `${p.color}06`,
                  border: `1px solid ${p.color}22`,
                  boxShadow: `0 0 40px ${p.color}08`,
                }}
              >
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{ background: `${p.color}15`, border: `1px solid ${p.color}30` }}
                      >
                        <i className={`${p.icon} text-sm`} style={{ color: p.color }} />
                      </div>
                      <h4 className="text-xl font-bold text-[#e2e8f8]" style={{ fontFamily: 'Inter' }}>{p.name}</h4>
                    </div>
                    <p className="text-xs font-semibold" style={{ color: p.color, fontFamily: 'Cairo' }}>{p.tagline}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-2xl font-bold" style={{ color: p.color, fontFamily: 'Inter' }}>{p.stat}</p>
                    <p className="text-[10px] text-[#3d5270]" style={{ fontFamily: 'Cairo' }}>{p.statLabel}</p>
                  </div>
                </div>
                <p className="text-sm text-[#7a93bc] leading-relaxed" style={{ fontFamily: 'Cairo' }}>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Services ──────────────────────────── */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <span className="badge mb-3">SERVICES</span>
            <h3 className="text-2xl font-bold text-[#e2e8f8]" style={{ fontFamily: 'Cairo' }}>
              خدماتنا — <span className="gradient-text">نُتقن ثمانية تخصصات</span>
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, ease: EASE, delay: (i % 4) * 0.08 }}
                className="p-5 rounded-2xl"
                style={{
                  background: 'rgba(13,21,37,0.7)',
                  border: '1px solid rgba(148,163,184,0.08)',
                }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: 'rgba(37,99,235,0.12)', border: '1px solid rgba(37,99,235,0.2)' }}
                >
                  <i className={`${s.icon} text-sm text-[#60a5fa]`} />
                </div>
                <h4 className="text-sm font-bold text-[#e2e8f8] mb-1.5" style={{ fontFamily: 'Cairo' }}>{s.title}</h4>
                <p className="text-xs text-[#3d5270] leading-snug" style={{ fontFamily: 'Cairo' }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Methodology ───────────────────────── */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <span className="badge mb-3">METHODOLOGY</span>
            <h3 className="text-2xl font-bold text-[#e2e8f8]" style={{ fontFamily: 'Cairo' }}>
              منهجيتنا — <span className="gradient-text">Hybrid Waterfall + Agile</span>
            </h3>
            <p className="text-[#7a93bc] text-sm mt-3 max-w-md mx-auto" style={{ fontFamily: 'Cairo' }}>
              نجمع بين الانضباط الهيكلي لـ Waterfall وسرعة الاستجابة في Agile — لنحقق التسليم في الوقت مع مرونة التكيف مع متطلباتك المتغيرة.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {methodologyPhases.map((phase, i) => (
              <motion.div
                key={phase.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.1 }}
                className="p-5 rounded-2xl"
                style={{
                  background: `${phase.color}07`,
                  border: `1px solid ${phase.color}22`,
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs"
                    style={{ background: `${phase.color}20`, color: phase.color, fontFamily: 'Inter' }}
                  >
                    {phase.num}
                  </div>
                  <i className={`${phase.icon} text-sm`} style={{ color: phase.color }} />
                </div>
                <h4 className="text-sm font-bold text-[#e2e8f8] mb-2" style={{ fontFamily: 'Cairo' }}>{phase.title}</h4>
                <p className="text-xs text-[#3d5270] leading-snug" style={{ fontFamily: 'Cairo' }}>{phase.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Contact Info ──────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="p-6 rounded-2xl flex flex-wrap items-center justify-between gap-6"
          style={{
            background: 'rgba(37,99,235,0.05)',
            border: '1px solid rgba(37,99,235,0.15)',
          }}
        >
          <div>
            <p className="text-xs text-[#3d5270] mb-1" style={{ fontFamily: 'Cairo' }}>الرقم الضريبي</p>
            <p className="font-bold text-[#e2e8f8] text-sm" style={{ fontFamily: 'Inter' }}>7033115739</p>
          </div>
          {[
            { icon: 'fas fa-envelope', label: 'البريد الإلكتروني', value: 'smaw@smaww.com', href: 'mailto:smaw@smaww.com' },
            { icon: 'fas fa-phone', label: 'الهاتف', value: '+966 55 452 0700', href: 'tel:+966554520700' },
            { icon: 'fas fa-globe', label: 'الموقع', value: 'smaww.com', href: 'https://smaww.com' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(37,99,235,0.12)', border: '1px solid rgba(37,99,235,0.2)' }}
              >
                <i className={`${item.icon} text-xs text-[#60a5fa]`} />
              </div>
              <div>
                <p className="text-[10px] text-[#3d5270]" style={{ fontFamily: 'Cairo' }}>{item.label}</p>
                <p className="text-sm font-semibold text-[#e2e8f8]" style={{ fontFamily: 'Inter' }}>{item.value}</p>
              </div>
            </a>
          ))}
          <a
            href="/company-profile.pdf"
            download="SMAW-Company-Profile.pdf"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5"
            style={{
              fontFamily: 'Cairo',
              background: 'rgba(37,99,235,0.15)',
              border: '1px solid rgba(37,99,235,0.3)',
              color: '#60a5fa',
              boxShadow: '0 4px 16px rgba(37,99,235,0.15)',
            }}
          >
            <i className="fas fa-download text-xs" />
            تحميل بروفايل الشركة
          </a>
        </motion.div>

      </div>
    </section>
  )
}
