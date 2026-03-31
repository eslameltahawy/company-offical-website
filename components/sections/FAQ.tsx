'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const faqs = [
  {
    q: 'هل SMAW HR متوافق مع نظام حماية الأجور (WPS)؟',
    a: 'نعم، بالكامل. يُصدر النظام ملف WPS بالتنسيق الذي تقبله جميع البنوك السعودية مباشرةً — لا تحتاج لأي خطوات يدوية إضافية. كما يدعم ربط مباشر مع وزارة الموارد البشرية.',
  },
  {
    q: 'كم يستغرق الإعداد والتطبيق؟',
    a: 'معظم شركاؤنا يبدأون التشغيل الفعلي خلال 48 ساعة من توقيع الاشتراك. فريق الإعداد لدينا يتولى رفع بيانات الموظفين الحاليين وضبط السياسات وتدريب الفريق — كل ذلك مجاناً.',
  },
  {
    q: 'هل بيانات شركتنا محفوظة وآمنة؟',
    a: 'نعم. نستخدم تشفير AES-256 لجميع البيانات المخزنة، وTLS 1.3 لكل الاتصالات. البيانات محفوظة على خوادم في منطقة الشرق الأوسط، مع نسخ احتياطية يومية تلقائية.',
  },
  {
    q: 'هل يمكن الربط مع أنظمة أخرى (بنوك، GOSI، مدد)؟',
    a: 'نعم. نوفر API مفتوح يسمح بالتكامل مع معظم الأنظمة. حالياً ندعم التكامل المباشر مع تقارير GOSI وملفات الرواتب البنكية، وندعم ربط مدد ضمن الخطة المؤسسية.',
  },
  {
    q: 'ماذا يحدث إذا زاد عدد موظفينا؟',
    a: 'الأسعار تحتسب بناءً على عدد الموظفين النشطين شهرياً — تدفع فقط على ما تستخدم. إذا نما فريقك، تنتقل تلقائياً للباقة المناسبة دون انقطاع في الخدمة.',
  },
  {
    q: 'هل يوجد تطبيق جوال للموظفين؟',
    a: 'نعم، تطبيق الجوال متاح لنظامي iOS وAndroid. يستطيع الموظفون من خلاله تسجيل الحضور، طلب الإجازات، وعرض قسائم الراتب — بدون الحاجة للوصول للحاسوب.',
  },
  {
    q: 'هل يمكن تجربة النظام قبل الاشتراك؟',
    a: 'بالتأكيد. نقدم عرضاً توضيحياً مجانياً مخصصاً لشركتك مدته 30 دقيقة، يتبعه وصول تجريبي لمدة 14 يوم لتجربة النظام بالكامل قبل أي التزام مالي.',
  },
  {
    q: 'ما نوع الدعم المتاح بعد الاشتراك؟',
    a: 'نوفر دعماً كاملاً باللغة العربية عبر الواتساب والبريد الإلكتروني في أيام العمل (السبت–الخميس). الباقة المؤسسية تشمل مدير حساب مخصص ودعماً على مدار الساعة.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section
      id="faq"
      className="section border-t border-[rgba(148,163,184,0.07)]"
    >
      <div className="container-smaw">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-16 items-start">

          {/* Left — sticky header + illustration */}
          <div className="lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.65, ease: EASE }}
            >
              <span className="badge mb-4">FAQ</span>
              <h2
                className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
                style={{ fontFamily: 'Cairo', lineHeight: 1.2 }}
              >
                أسئلة{' '}
                <span className="gradient-text">يسألها الجميع</span>
              </h2>
              <p
                className="text-[#7a93bc] text-sm leading-relaxed mb-8"
                style={{ fontFamily: 'Cairo', maxWidth: 340 }}
              >
                لديك سؤال آخر؟ فريقنا يجيبك مباشرةً عبر الواتساب أو نموذج الحجز
              </p>

              {/* Illustration */}
              <div
                className="w-48 h-48 rounded-3xl overflow-hidden mx-auto lg:mx-0"
                style={{ background: 'rgba(13,21,37,0.6)', border: '1px solid rgba(148,163,184,0.08)' }}
              >
                <img src="/img/faq.png" alt="FAQ" className="w-full h-full object-cover" />
              </div>

              <div className="mt-6 space-y-3">
                {[
                  { icon: 'fab fa-whatsapp', text: 'تواصل عبر واتساب', color: '#10b981' },
                  { icon: 'fas fa-calendar-check', text: 'احجز موعداً الآن', color: '#2563eb' },
                ].map((item) => (
                  <a
                    key={item.text}
                    href="#booking"
                    className="flex items-center gap-2.5 text-sm font-semibold transition-colors hover:opacity-80"
                    style={{ fontFamily: 'Cairo', color: item.color }}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{ background: `${item.color}15`, border: `1px solid ${item.color}25` }}
                    >
                      <i className={`${item.icon} text-[11px]`} style={{ color: item.color }} />
                    </div>
                    {item.text}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — accordion */}
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, ease: EASE, delay: i * 0.05 }}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full text-right rounded-2xl px-5 py-4 flex items-start gap-3 transition-all duration-200"
                  style={{
                    background: open === i ? 'rgba(37,99,235,0.08)' : 'rgba(13,21,37,0.7)',
                    border: `1px solid ${open === i ? 'rgba(37,99,235,0.25)' : 'rgba(148,163,184,0.08)'}`,
                  }}
                >
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200"
                    style={{
                      background: open === i ? 'rgba(37,99,235,0.2)' : 'rgba(148,163,184,0.06)',
                      border: `1px solid ${open === i ? 'rgba(37,99,235,0.35)' : 'rgba(148,163,184,0.1)'}`,
                    }}
                  >
                    <i
                      className={`fas ${open === i ? 'fa-minus' : 'fa-plus'} text-[9px] transition-all duration-200`}
                      style={{ color: open === i ? '#60a5fa' : '#3d5270' }}
                    />
                  </div>
                  <span
                    className="text-sm font-semibold text-right flex-1"
                    style={{ fontFamily: 'Cairo', color: open === i ? '#e2e8f8' : '#7a93bc' }}
                  >
                    {faq.q}
                  </span>
                </button>

                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: EASE }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div
                        className="px-5 pb-4 pt-2 rounded-b-2xl -mt-1"
                        style={{
                          background: 'rgba(37,99,235,0.05)',
                          borderLeft: '1px solid rgba(37,99,235,0.15)',
                          borderRight: '1px solid rgba(37,99,235,0.15)',
                          borderBottom: '1px solid rgba(37,99,235,0.15)',
                        }}
                      >
                        <p
                          className="text-sm text-[#7a93bc] leading-relaxed pr-9"
                          style={{ fontFamily: 'Cairo' }}
                        >
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
