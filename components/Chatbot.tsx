'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Msg = { role: 'bot' | 'user'; text: string }

/* ── Smart keyword-based response engine ─────────────────────── */
const RULES: Array<{ pattern: RegExp; reply: string }> = [
  {
    pattern: /smaw hr|hr|موارد بشرية|رواتب|موظف|حضور|إجازة|wps|حماية الأجور/i,
    reply: 'SMAW HR هو منتجنا الأول المتاح الآن. يُغطي إدارة الموظفين، الرواتب، الحضور والإجازات — مبني وفق نظام العمل السعودي ونظام حماية الأجور. هل تريد حجز عرض توضيحي؟',
  },
  {
    pattern: /محاسب|فاتورة|مالي|zatca|ضريبة|زكاة|ميزانية/i,
    reply: 'وحدة المحاسبة في SMAW Suite ستدعم الفوترة الإلكترونية المتوافقة مع هيئة الزكاة والضريبة والجمارك. هي قيد التطوير حالياً وستطلق ضمن SMAW Suite.',
  },
  {
    pattern: /مهام|مشروع|task|project|متابعة/i,
    reply: 'وحدة إدارة المهام ستتيح إسناد المهام وتتبع التقدم مع مساعد AI يرتّب الأولويات تلقائياً. متوفرة قريباً ضمن SMAW Suite.',
  },
  {
    pattern: /أرشيف|وثيقة|ملف|تخزين|archive/i,
    reply: 'الأرشيف الرقمي يوفّر تخزيناً سحابياً آمناً مع تصنيف ذكي وبحث داخل الملفات بالذكاء الاصطناعي. قيد التطوير ضمن SMAW Suite.',
  },
  {
    pattern: /اجتماع|فيديو|meeting|مراسلة|دردشة/i,
    reply: 'وحدة الاجتماعات ستوفّر مكالمات فيديو مشفرة ومحاضر اجتماعات تلقائية دون الحاجة لأدوات خارجية. قادمة ضمن SMAW Suite.',
  },
  {
    pattern: /سعر|تكلفة|اشتراك|باقة|كم التكلفة|pricing/i,
    reply: 'الأسعار تعتمد على حجم الشركة وعدد المستخدمين. نُعدّ عروض أسعار مخصصة لكل شركة — تواصل معنا عبر نموذج الحجز وسنرسل لك عرضاً مفصلاً.',
  },
  {
    pattern: /demo|عرض|تجريب|تجربة|مجاني/i,
    reply: 'يمكنك حجز عرض توضيحي مجاني من قسم "احجز موعدك" في الأسفل. سيتواصل معك أحد مختصينا خلال يوم عمل واحد.',
  },
  {
    pattern: /suite|المنصة|كل المنتجات|الباقة/i,
    reply: 'SMAW Suite نظام شامل All-in-One يضم 5 وحدات: HR، المحاسبة، إدارة المهام، الأرشيف الرقمي، والاجتماعات — مع مساعد AI مدمج. SMAW HR هو المنتج الأول المتاح الآن.',
  },
  {
    pattern: /ai|ذكاء اصطناعي|مساعد ذكي|agent/i,
    reply: 'يتضمن SMAW Suite مساعد AI مدمج يُحلّل بيانات شركتك ويُقدّم توصيات تشغيلية — من تحليل الأداء إلى اكتشاف الاختناقات التشغيلية.',
  },
  {
    pattern: /رؤية 2030|سعودي|saudi|محلي|local/i,
    reply: 'سماو شركة سعودية 100٪ — منتجاتنا مبنية وفق اللوائح والمتطلبات المحلية، متوافقة مع هيئة الزكاة والضريبة ونظام العمل السعودي ورؤية 2030.',
  },
  {
    pattern: /من نحن|سماو|smaw|الشركة|تأسست|عمركم/i,
    reply: 'سماو بيت منتجات برمجية سعودي متخصص في بناء أنظمة تشغيل مؤسسية للشركات. نعمل منذ 2021 ونخدم أكثر من 50 شركة في المملكة.',
  },
  {
    pattern: /تواصل|اتصل|contact|جوال|ايميل|email/i,
    reply: 'يمكنك التواصل معنا عبر نموذج الحجز في الأسفل — أدخل رقم جوالك أو بريدك الإلكتروني وسيصلك رد خلال يوم عمل واحد.',
  },
  {
    pattern: /دعم|مشكلة|خطأ|support|bug/i,
    reply: 'لمتابعة طلبات الدعم الفني يرجى التواصل معنا مباشرةً عبر نموذج الحجز أو عبر البريد الإلكتروني المخصص للدعم. سيُحال طلبك للفريق التقني المعني.',
  },
]

const DEFAULT_REPLY =
  'شكراً على رسالتك. يمكنني مساعدتك في استفساراتك حول منتجاتنا أو حجز عرض توضيحي — اكتب سؤالك وسأُجيب بما في وسعي.'

function getReply(text: string): string {
  for (const rule of RULES) {
    if (rule.pattern.test(text)) return rule.reply
  }
  return DEFAULT_REPLY
}

const QUICK_ACTIONS = [
  { label: 'ما هو SMAW HR؟',       icon: 'fas fa-users' },
  { label: 'كيف أحجز عرضاً؟',     icon: 'fas fa-calendar-check' },
  { label: 'ما هو SMAW Suite؟',    icon: 'fas fa-th-large' },
  { label: 'الأسعار والباقات',     icon: 'fas fa-tag' },
]

export default function Chatbot() {
  const [open, setOpen]         = useState(false)
  const [msgs, setMsgs]         = useState<Msg[]>([
    { role: 'bot', text: 'مرحباً! كيف يمكنني مساعدتك اليوم؟' },
  ])
  const [input, setInput]       = useState('')
  const [typing, setTyping]     = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs, typing])

  function push(role: 'bot' | 'user', text: string) {
    setMsgs((p) => [...p, { role, text }])
  }

  function respond(userText: string) {
    push('user', userText)
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      push('bot', getReply(userText))
    }, 800 + Math.random() * 400)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim() || typing) return
    respond(input.trim())
  }

  const showQuickActions = msgs.length === 1

  return (
    <>
      {/* Floating trigger */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white flex items-center justify-center shadow-[0_8px_32px_rgba(37,99,235,0.45)] transition-colors duration-200"
        aria-label="مساعد سماو"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.i key="x" className="fas fa-times text-lg"
              initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}
            />
          ) : (
            <motion.i key="chat" className="fas fa-comment-dots text-lg"
              initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}
            />
          )}
        </AnimatePresence>
        {/* Unread indicator */}
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#10b981] border-2 border-[#030712] animate-pulse" />
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="fixed bottom-24 left-6 z-50 w-[340px] flex flex-col rounded-2xl overflow-hidden border border-[rgba(148,163,184,0.1)] shadow-[0_24px_60px_rgba(0,0,0,0.55)]"
            style={{ background: 'rgba(13,21,37,0.97)', backdropFilter: 'blur(24px)', maxHeight: 500 }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3 border-b border-[rgba(148,163,184,0.08)] flex-shrink-0"
              style={{ background: 'rgba(10,16,32,0.8)' }}
            >
              <div className="w-8 h-8 rounded-lg bg-[#2563eb] flex items-center justify-center glow-blue-sm flex-shrink-0">
                <span className="text-white font-bold text-xs" style={{ fontFamily: 'Inter' }}>S</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-[#e2e8f8]" style={{ fontFamily: 'Cairo' }}>مساعد سماو</p>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse flex-shrink-0" />
                  <span className="text-[10px] text-[#10b981]" style={{ fontFamily: 'Cairo' }}>متاح الآن</span>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-[#3d5270] hover:text-[#7a93bc] transition-colors text-sm flex-shrink-0"
              >
                <i className="fas fa-times" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ minHeight: 0 }}>
              {msgs.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${m.role === 'user' ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[82%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-[#2563eb]/20 text-[#e2e8f8] border border-[#2563eb]/20'
                        : 'bg-white/4 text-[#e2e8f8] border border-[rgba(148,163,184,0.07)]'
                    }`}
                    style={{ fontFamily: 'Cairo' }}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex justify-end"
                >
                  <div className="bg-white/4 border border-[rgba(148,163,184,0.07)] rounded-xl px-4 py-3 flex gap-1 items-center">
                    {[0, 0.18, 0.36].map((d) => (
                      <motion.span
                        key={d}
                        className="w-1.5 h-1.5 rounded-full bg-[#3d5270]"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.55, repeat: Infinity, delay: d }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Quick actions — shown only before first user message */}
              {showQuickActions && !typing && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-2 pt-1"
                >
                  <p className="text-[10px] text-[#3d5270] text-center" style={{ fontFamily: 'Cairo' }}>
                    اختر موضوعاً أو اكتب سؤالك مباشرة
                  </p>
                  {QUICK_ACTIONS.map((a) => (
                    <button
                      key={a.label}
                      onClick={() => respond(a.label)}
                      className="w-full flex items-center gap-2.5 text-right px-3 py-2.5 rounded-xl border border-[rgba(37,99,235,0.18)] bg-[#2563eb]/5 hover:bg-[#2563eb]/12 hover:border-[#2563eb]/35 transition-all duration-200 text-xs text-[#7a93bc] hover:text-[#e2e8f8]"
                      style={{ fontFamily: 'Cairo' }}
                    >
                      <div className="w-6 h-6 rounded-md bg-[#2563eb]/15 flex items-center justify-center flex-shrink-0">
                        <i className={`${a.icon} text-[#60a5fa] text-[10px]`} />
                      </div>
                      {a.label}
                    </button>
                  ))}
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-3 py-3 border-t border-[rgba(148,163,184,0.07)] flex-shrink-0">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text" value={input} onChange={(e) => setInput(e.target.value)}
                  placeholder="اكتب سؤالك هنا..."
                  className="flex-1 bg-white/5 border border-[rgba(148,163,184,0.1)] rounded-lg px-3 py-2 text-xs text-[#e2e8f8] placeholder:text-[#3d5270] focus:outline-none focus:border-[#2563eb]/40 transition-colors"
                  style={{ fontFamily: 'Cairo' }}
                />
                <button
                  type="submit" disabled={!input.trim() || typing}
                  className="w-8 h-8 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] disabled:opacity-35 text-white flex items-center justify-center flex-shrink-0 transition-colors"
                >
                  <i className="fas fa-arrow-left text-xs" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
