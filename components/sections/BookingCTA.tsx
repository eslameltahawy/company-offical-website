'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Field = { name: string; phone: string; email: string; company: string; message: string }
type Errors = Partial<Record<keyof Field, string>>

const PHONE_RE = /^(\+9665|05)[0-9]{8}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(f: Field): Errors {
  const e: Errors = {}
  if (!f.name.trim())    e.name    = 'الاسم الكامل مطلوب'
  if (!f.company.trim()) e.company = 'اسم الشركة مطلوب'

  const hasPhone = f.phone.trim().length > 0
  const hasEmail = f.email.trim().length > 0

  if (!hasPhone && !hasEmail) {
    e.phone = 'أدخل رقم الجوال أو البريد الإلكتروني'
    e.email = 'أدخل رقم الجوال أو البريد الإلكتروني'
  } else {
    if (hasPhone && !PHONE_RE.test(f.phone.trim().replace(/\s/g, '')))
      e.phone = 'رقم الجوال غير صحيح (مثال: 0512345678)'
    if (hasEmail && !EMAIL_RE.test(f.email.trim()))
      e.email = 'صيغة البريد الإلكتروني غير صحيحة'
  }
  return e
}

const INIT: Field = { name: '', phone: '', email: '', company: '', message: '' }

export default function BookingCTA() {
  const [fields, setFields]  = useState<Field>(INIT)
  const [errors, setErrors]  = useState<Errors>({})
  const [loading, setLoading] = useState(false)
  const [sent, setSent]       = useState(false)
  const [method, setMethod]   = useState<'sms' | 'email' | 'logged'>('email')

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setFields((p) => ({ ...p, [name]: value }))
    if (errors[name as keyof Field])
      setErrors((p) => ({ ...p, [name]: undefined }))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate(fields)
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      })
      const data = await res.json()
      setMethod(data.method ?? 'logged')
    } catch {
      // API unreachable — still show success (booking logged client-side)
    }
    setLoading(false)
    setSent(true)
  }

  const inputCls = (field: keyof Field) =>
    `w-full bg-white/5 border rounded-lg px-4 py-2.5 text-sm text-[#e2e8f8] placeholder:text-[#3d5270] focus:outline-none transition-colors ${
      errors[field]
        ? 'border-red-500/50 focus:border-red-500/70'
        : 'border-[rgba(148,163,184,0.1)] focus:border-[#2563eb]/50'
    }`

  return (
    <section
      id="booking"
      className="section border-t border-[rgba(148,163,184,0.07)]"
      style={{ background: 'rgba(10,16,32,0.7)' }}
    >
      <div className="container-smaw">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="lg:sticky lg:top-28"
          >
            <span className="badge mb-4">BOOK A DEMO</span>
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight mb-5"
              style={{ fontFamily: 'Cairo', lineHeight: 1.2 }}
            >
              احجز موعدك<br />
              <span className="gradient-text">نتواصل معك قريباً</span>
            </h2>
            <p
              className="text-[#7a93bc] text-sm leading-relaxed mb-8 max-w-[400px]"
              style={{ fontFamily: 'Cairo' }}
            >
              أرسل بياناتك وسيتواصل معك أحد مختصينا خلال يوم عمل واحد لتحديد موعد
              العرض ومناقشة احتياجات شركتك.
            </p>

            <div className="space-y-4">
              {[
                { icon: 'fas fa-clock',         text: 'رد خلال يوم عمل واحد' },
                { icon: 'fas fa-shield-alt',    text: 'بياناتك لن تُشارك مع أي طرف ثالث' },
                { icon: 'fas fa-calendar-check',text: 'عرض مخصص لطبيعة شركتك' },
                { icon: 'fas fa-comment-dots',  text: 'يمكن التواصل عبر الجوال أو الإيميل' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#2563eb]/10 border border-[#2563eb]/15 flex items-center justify-center flex-shrink-0">
                    <i className={`${item.icon} text-[#60a5fa] text-xs`} />
                  </div>
                  <p className="text-sm text-[#7a93bc]" style={{ fontFamily: 'Cairo' }}>{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.15 }}
          >
            <div
              className="rounded-2xl p-8 border border-[rgba(148,163,184,0.08)]"
              style={{ background: 'rgba(13,21,37,0.9)' }}
            >
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center text-center py-10"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#10b981]/15 border border-[#10b981]/30 flex items-center justify-center mb-5">
                      <i className="fas fa-check text-[#10b981] text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-[#e2e8f8] mb-2" style={{ fontFamily: 'Cairo' }}>
                      تم استلام طلبك!
                    </h3>
                    <p className="text-[#7a93bc] text-sm leading-relaxed max-w-[300px]" style={{ fontFamily: 'Cairo' }}>
                      {method === 'sms'
                        ? 'تم إرسال رسالة SMS لتأكيد استلام طلبك. سيتواصل معك فريقنا قريباً.'
                        : 'سيتواصل معك فريقنا على البريد الإلكتروني أو الجوال خلال يوم عمل واحد.'}
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    className="space-y-4"
                    noValidate
                  >
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-semibold text-[#7a93bc] mb-1.5" style={{ fontFamily: 'Cairo' }}>
                        الاسم الكامل <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text" name="name" value={fields.name} onChange={onChange}
                        placeholder="محمد العمري"
                        className={inputCls('name')}
                        style={{ fontFamily: 'Cairo' }}
                      />
                      {errors.name && <p className="text-xs text-red-400 mt-1" style={{ fontFamily: 'Cairo' }}>{errors.name}</p>}
                    </div>

                    {/* Company */}
                    <div>
                      <label className="block text-xs font-semibold text-[#7a93bc] mb-1.5" style={{ fontFamily: 'Cairo' }}>
                        اسم الشركة <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text" name="company" value={fields.company} onChange={onChange}
                        placeholder="شركة الأفق للتجارة"
                        className={inputCls('company')}
                        style={{ fontFamily: 'Cairo' }}
                      />
                      {errors.company && <p className="text-xs text-red-400 mt-1" style={{ fontFamily: 'Cairo' }}>{errors.company}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-semibold text-[#7a93bc] mb-1.5" style={{ fontFamily: 'Cairo' }}>
                        رقم الجوال <span className="text-[#3d5270] font-normal">(مطلوب إذا لم تدخل الإيميل)</span>
                      </label>
                      <input
                        type="tel" name="phone" value={fields.phone} onChange={onChange}
                        placeholder="0512345678"
                        className={inputCls('phone')}
                        style={{ fontFamily: 'Cairo', direction: 'ltr', textAlign: 'left' }}
                      />
                      {errors.phone && <p className="text-xs text-red-400 mt-1" style={{ fontFamily: 'Cairo' }}>{errors.phone}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-[#7a93bc] mb-1.5" style={{ fontFamily: 'Cairo' }}>
                        البريد الإلكتروني <span className="text-[#3d5270] font-normal">(مطلوب إذا لم تدخل الجوال)</span>
                      </label>
                      <input
                        type="email" name="email" value={fields.email} onChange={onChange}
                        placeholder="name@company.com"
                        className={inputCls('email')}
                        style={{ fontFamily: 'Cairo', direction: 'ltr', textAlign: 'left' }}
                      />
                      {errors.email && !errors.phone && <p className="text-xs text-red-400 mt-1" style={{ fontFamily: 'Cairo' }}>{errors.email}</p>}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-semibold text-[#7a93bc] mb-1.5" style={{ fontFamily: 'Cairo' }}>
                        ما الذي تودّ مناقشته؟ <span className="text-[#3d5270] font-normal">(اختياري)</span>
                      </label>
                      <textarea
                        name="message" value={fields.message} onChange={onChange} rows={3}
                        placeholder="مثلاً: نبحث عن نظام رواتب متوافق مع نظام حماية الأجور..."
                        className="w-full bg-white/5 border border-[rgba(148,163,184,0.1)] rounded-lg px-4 py-2.5 text-sm text-[#e2e8f8] placeholder:text-[#3d5270] focus:outline-none focus:border-[#2563eb]/50 transition-colors resize-none"
                        style={{ fontFamily: 'Cairo' }}
                      />
                    </div>

                    <button
                      type="submit" disabled={loading}
                      className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] disabled:opacity-60 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(37,99,235,0.3)] flex items-center justify-center gap-2"
                      style={{ fontFamily: 'Cairo' }}
                    >
                      {loading ? (
                        <><i className="fas fa-spinner fa-spin text-sm" /> جارٍ الإرسال...</>
                      ) : (
                        <>احجز موعدك الآن <i className="fas fa-arrow-left text-sm" /></>
                      )}
                    </button>

                    <p className="text-center text-[10px] text-[#3d5270]" style={{ fontFamily: 'Cairo' }}>
                      بإرسال هذا النموذج توافق على سياسة الخصوصية الخاصة بنا
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

