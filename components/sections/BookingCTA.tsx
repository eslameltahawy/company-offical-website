'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── Types ──────────────────────────────────────────────────────────────── */

interface SlotInfo {
  id: string
  date: string
  time: string
  label: string
  booked: boolean
  durationMins: number
}

type Field = { name: string; phone: string; email: string; company: string; message: string }
type Errors = Partial<Record<keyof Field, string>>

const PHONE_RE = /^\+?[0-9\s\-().]{7,20}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const AR_DAYS = ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت']
const AR_MONTHS = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر']

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
    if (hasPhone && !PHONE_RE.test(f.phone.trim()))
      e.phone = 'رقم الجوال غير صحيح (مثال: +201012345678)'
    if (hasEmail && !EMAIL_RE.test(f.email.trim()))
      e.email = 'صيغة البريد الإلكتروني غير صحيحة'
  }
  return e
}

const INIT: Field = { name: '', phone: '', email: '', company: '', message: '' }

/** Group slots by date */
function groupByDate(slots: SlotInfo[]) {
  const map = new Map<string, SlotInfo[]>()
  for (const s of slots) {
    if (!map.has(s.date)) map.set(s.date, [])
    map.get(s.date)!.push(s)
  }
  return Array.from(map.entries()).map(([date, times]) => ({ date, times }))
}

function dateLabel(dateStr: string) {
  const d = new Date(dateStr + 'T12:00:00+03:00')
  return `${AR_DAYS[d.getDay()]} ${d.getDate()} ${AR_MONTHS[d.getMonth()]}`
}

/* ── Component ──────────────────────────────────────────────────────────── */

export default function BookingCTA() {
  const [step, setStep]           = useState<'slot' | 'form'>('slot')
  const [slots, setSlots]         = useState<SlotInfo[]>([])
  const [slotsLoading, setSlotsLoading] = useState(true)
  const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null)
  const [fields, setFields]       = useState<Field>(INIT)
  const [errors, setErrors]       = useState<Errors>({})
  const [loading, setLoading]     = useState(false)
  const [sent, setSent]           = useState(false)
  const [calendarLink, setCalendarLink] = useState('')
  const [clientEmailSent, setClientEmailSent] = useState(false)

  useEffect(() => {
    fetch('/api/slots')
      .then((r) => r.json())
      .then((d) => { setSlots(d.slots || []); setSlotsLoading(false) })
      .catch(() => setSlotsLoading(false))
  }, [])

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
        body: JSON.stringify({ ...fields, slotId: selectedSlot?.id || '' }),
      })
      const data = await res.json()
      if (data.calendarLink) setCalendarLink(data.calendarLink)
      if (data.clientEmailSent) setClientEmailSent(true)
    } catch { /* still show success */ }
    setLoading(false)
    setSent(true)
  }

  const inputCls = (field: keyof Field) =>
    `w-full bg-white/5 border rounded-lg px-4 py-2.5 text-sm text-[#e2e8f8] placeholder:text-[#3d5270] focus:outline-none transition-colors ${
      errors[field]
        ? 'border-red-500/50 focus:border-red-500/70'
        : 'border-[rgba(148,163,184,0.1)] focus:border-[#2563eb]/50'
    }`

  const grouped = groupByDate(slots)

  /* ── Left info column (shared across all steps) ─── */
  const leftCol = (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
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
      <p className="text-[#7a93bc] text-sm leading-relaxed mb-8 max-w-[400px]" style={{ fontFamily: 'Cairo' }}>
        اختر الوقت المناسب من المواعيد المتاحة، ثم أدخل بياناتك وسيصلك تأكيد فوري مع رابط Google Meet.
      </p>
      <div className="space-y-4">
        {[
          { icon: 'fas fa-calendar-check', text: 'اختر موعدك من الأوقات المتاحة' },
          { icon: 'fas fa-video',          text: 'رابط Google Meet يصلك على إيميلك' },
          { icon: 'fas fa-bell',           text: 'تأكيد فوري على تقويم Google' },
          { icon: 'fas fa-shield-alt',     text: 'بياناتك لن تُشارك مع أي طرف ثالث' },
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
  )

  return (
    <section
      id="booking"
      className="section border-t border-[rgba(148,163,184,0.07)]"
      style={{ background: 'rgba(10,16,32,0.7)' }}
    >
      <div className="container-smaw">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {leftCol}

          {/* Right — dynamic panel */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <div
              className="rounded-2xl border border-[rgba(148,163,184,0.08)] overflow-hidden"
              style={{ background: 'rgba(13,21,37,0.9)' }}
            >
              <AnimatePresence mode="wait">

                {/* ── SUCCESS ──────────────────────────────────── */}
                {sent && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.93 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center text-center p-10"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#2563eb]/15 border border-[#2563eb]/30 flex items-center justify-center mb-5">
                      <i className="fas fa-check text-[#2563eb] text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-[#e2e8f8] mb-2" style={{ fontFamily: 'Cairo' }}>
                      تم تأكيد موعدك!
                    </h3>
                    {selectedSlot && (
                      <div
                        className="my-3 px-4 py-2 rounded-lg text-sm font-semibold"
                        style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.2)', color: '#60a5fa', fontFamily: 'Cairo' }}
                      >
                        <i className="fas fa-calendar-check me-2" />
                        {selectedSlot.label}
                      </div>
                    )}
                    <p className="text-[#7a93bc] text-sm leading-relaxed max-w-[300px] mb-6" style={{ fontFamily: 'Cairo' }}>
                      {clientEmailSent
                        ? 'تم إرسال تأكيد ورابط الاجتماع على بريدك الإلكتروني.'
                        : 'سيتواصل معك فريقنا قريباً بتفاصيل الاجتماع.'}
                    </p>
                    {calendarLink && (
                      <a
                        href={calendarLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5"
                        style={{ background: '#2563eb', color: '#fff', fontFamily: 'Cairo' }}
                      >
                        <i className="fas fa-calendar-plus text-sm" />
                        أضف للتقويم
                      </a>
                    )}
                  </motion.div>
                )}

                {/* ── STEP 1: Slot Picker ───────────────────────── */}
                {!sent && step === 'slot' && (
                  <motion.div key="slot-picker" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {/* Header */}
                    <div
                      className="px-6 py-4 border-b flex items-center gap-2"
                      style={{ borderColor: 'rgba(148,163,184,0.08)' }}
                    >
                      <i className="fas fa-calendar-alt text-[#2563eb] text-sm" />
                      <span className="text-sm font-bold text-[#e2e8f8]" style={{ fontFamily: 'Cairo' }}>
                        اختر الموعد المناسب
                      </span>
                    </div>

                    <div className="p-6 space-y-5 max-h-[480px] overflow-y-auto">
                      {slotsLoading ? (
                        <div className="flex items-center justify-center py-12">
                          <i className="fas fa-spinner fa-spin text-[#2563eb] text-xl" />
                        </div>
                      ) : grouped.length === 0 ? (
                        <div className="text-center py-10">
                          <i className="fas fa-calendar-times text-[#3d5270] text-3xl mb-3" />
                          <p className="text-sm text-[#7a93bc]" style={{ fontFamily: 'Cairo' }}>
                            لا توجد مواعيد متاحة حالياً. تواصل معنا مباشرة.
                          </p>
                          <a
                            href="https://wa.me/966554520700"
                            className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:-translate-y-0.5"
                            style={{ background: 'rgba(37,99,235,0.12)', color: '#60a5fa', border: '1px solid rgba(37,99,235,0.2)', fontFamily: 'Cairo' }}
                          >
                            <i className="fab fa-whatsapp" />
                            تواصل عبر واتساب
                          </a>
                        </div>
                      ) : (
                        grouped.map(({ date, times }) => (
                          <div key={date}>
                            <p
                              className="text-[11px] font-bold uppercase tracking-widest mb-3"
                              style={{ color: '#3d5270', fontFamily: 'Cairo' }}
                            >
                              {dateLabel(date)}
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                              {times.map((slot) => {
                                const isSelected = selectedSlot?.id === slot.id
                                return (
                                  <button
                                    key={slot.id}
                                    disabled={slot.booked}
                                    onClick={() => setSelectedSlot(isSelected ? null : slot)}
                                    className="relative rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 text-right"
                                    style={{
                                      fontFamily: 'Cairo',
                                      background: slot.booked
                                        ? 'rgba(148,163,184,0.04)'
                                        : isSelected
                                        ? 'rgba(37,99,235,0.2)'
                                        : 'rgba(13,21,37,0.8)',
                                      border: `1px solid ${
                                        slot.booked
                                          ? 'rgba(148,163,184,0.06)'
                                          : isSelected
                                          ? 'rgba(37,99,235,0.5)'
                                          : 'rgba(148,163,184,0.1)'
                                      }`,
                                      color: slot.booked ? '#3d5270' : isSelected ? '#60a5fa' : '#e2e8f8',
                                      cursor: slot.booked ? 'not-allowed' : 'pointer',
                                      opacity: slot.booked ? 0.5 : 1,
                                    }}
                                  >
                                    <span className="block">
                                      {slot.time.split(':').map(Number).reduce((h, m, i) => i === 0
                                        ? (h === 0 ? 12 : h > 12 ? h - 12 : h)
                                        : h, 0) + ':' + slot.time.split(':')[1]}
                                      {' '}
                                      {parseInt(slot.time) < 12 ? 'ص' : 'م'}
                                    </span>
                                    {slot.booked && (
                                      <span className="block text-[10px] mt-0.5" style={{ color: '#3d5270' }}>محجوز</span>
                                    )}
                                    {isSelected && !slot.booked && (
                                      <i className="fas fa-check-circle absolute top-2 left-2 text-[#2563eb] text-xs" />
                                    )}
                                  </button>
                                )
                              })}
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Footer */}
                    <div
                      className="px-6 py-4 border-t flex items-center justify-between gap-3"
                      style={{ borderColor: 'rgba(148,163,184,0.08)' }}
                    >
                      {selectedSlot ? (
                        <div className="flex items-center gap-2 text-xs" style={{ color: '#60a5fa', fontFamily: 'Cairo' }}>
                          <i className="fas fa-calendar-check" />
                          <span>{selectedSlot.label}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-[#3d5270]" style={{ fontFamily: 'Cairo' }}>اختر موعداً للمتابعة</span>
                      )}
                      <button
                        onClick={() => setStep('form')}
                        disabled={!selectedSlot}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5"
                        style={{
                          background: '#2563eb',
                          color: '#fff',
                          fontFamily: 'Cairo',
                          boxShadow: selectedSlot ? '0 4px 16px rgba(37,99,235,0.3)' : 'none',
                        }}
                      >
                        التالي
                        <i className="fas fa-arrow-left text-xs" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 2: Form ─────────────────────────────── */}
                {!sent && step === 'form' && (
                  <motion.div key="form" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                    {/* Header */}
                    <div
                      className="px-6 py-4 border-b flex items-center justify-between"
                      style={{ borderColor: 'rgba(148,163,184,0.08)' }}
                    >
                      <button
                        onClick={() => setStep('slot')}
                        className="flex items-center gap-1.5 text-xs text-[#7a93bc] hover:text-[#e2e8f8] transition-colors"
                        style={{ fontFamily: 'Cairo' }}
                      >
                        <i className="fas fa-arrow-right text-[10px]" />
                        تغيير الموعد
                      </button>
                      {selectedSlot && (
                        <div
                          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg"
                          style={{ background: 'rgba(37,99,235,0.1)', color: '#60a5fa', border: '1px solid rgba(37,99,235,0.2)', fontFamily: 'Cairo' }}
                        >
                          <i className="fas fa-calendar-check text-[10px]" />
                          {selectedSlot.label}
                        </div>
                      )}
                    </div>

                    <form onSubmit={onSubmit} className="p-6 space-y-4" noValidate>
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-semibold text-[#7a93bc] mb-1.5" style={{ fontFamily: 'Cairo' }}>
                          الاسم الكامل <span className="text-red-400">*</span>
                        </label>
                        <input type="text" name="name" value={fields.name} onChange={onChange}
                          placeholder="محمد العمري" className={inputCls('name')} style={{ fontFamily: 'Cairo' }} />
                        {errors.name && <p className="text-xs text-red-400 mt-1" style={{ fontFamily: 'Cairo' }}>{errors.name}</p>}
                      </div>

                      {/* Company */}
                      <div>
                        <label className="block text-xs font-semibold text-[#7a93bc] mb-1.5" style={{ fontFamily: 'Cairo' }}>
                          اسم الشركة <span className="text-red-400">*</span>
                        </label>
                        <input type="text" name="company" value={fields.company} onChange={onChange}
                          placeholder="شركة الأفق للتجارة" className={inputCls('company')} style={{ fontFamily: 'Cairo' }} />
                        {errors.company && <p className="text-xs text-red-400 mt-1" style={{ fontFamily: 'Cairo' }}>{errors.company}</p>}
                      </div>

                      {/* Phone + Email row */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-[#7a93bc] mb-1.5" style={{ fontFamily: 'Cairo' }}>
                            الجوال
                          </label>
                          <input type="tel" name="phone" value={fields.phone} onChange={onChange}
                            placeholder="+201012345678" className={inputCls('phone')}
                            style={{ fontFamily: 'Cairo', direction: 'ltr', textAlign: 'left' }} />
                          {errors.phone && <p className="text-xs text-red-400 mt-1" style={{ fontFamily: 'Cairo' }}>{errors.phone}</p>}
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#7a93bc] mb-1.5" style={{ fontFamily: 'Cairo' }}>
                            الإيميل <span className="text-[#3d5270] font-normal">(للرابط)</span>
                          </label>
                          <input type="email" name="email" value={fields.email} onChange={onChange}
                            placeholder="name@co.com" className={inputCls('email')}
                            style={{ fontFamily: 'Cairo', direction: 'ltr', textAlign: 'left' }} />
                          {errors.email && !errors.phone && <p className="text-xs text-red-400 mt-1" style={{ fontFamily: 'Cairo' }}>{errors.email}</p>}
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-xs font-semibold text-[#7a93bc] mb-1.5" style={{ fontFamily: 'Cairo' }}>
                          ما الذي تودّ مناقشته؟ <span className="text-[#3d5270] font-normal">(اختياري)</span>
                        </label>
                        <textarea name="message" value={fields.message} onChange={onChange} rows={3}
                          placeholder="مثلاً: نبحث عن نظام رواتب متوافق مع WPS..."
                          className="w-full bg-white/5 border border-[rgba(148,163,184,0.1)] rounded-lg px-4 py-2.5 text-sm text-[#e2e8f8] placeholder:text-[#3d5270] focus:outline-none focus:border-[#2563eb]/50 transition-colors resize-none"
                          style={{ fontFamily: 'Cairo' }} />
                      </div>

                      <button
                        type="submit" disabled={loading}
                        className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] disabled:opacity-60 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(37,99,235,0.3)] flex items-center justify-center gap-2"
                        style={{ fontFamily: 'Cairo' }}
                      >
                        {loading ? (
                          <><i className="fas fa-spinner fa-spin text-sm" /> جارٍ التأكيد...</>
                        ) : (
                          <>تأكيد الحجز <i className="fas fa-arrow-left text-sm" /></>
                        )}
                      </button>

                      <p className="text-center text-[10px] text-[#3d5270]" style={{ fontFamily: 'Cairo' }}>
                        بإرسال هذا النموذج توافق على سياسة الخصوصية الخاصة بنا
                      </p>
                    </form>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
