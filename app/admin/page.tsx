'use client'

import { useState, useEffect, useCallback } from 'react'

/* ── Types ─────────────────────────────────────────────────────────────── */

interface Booking {
  id: string
  name: string
  phone: string
  email: string
  company: string
  message: string
  slotId?: string
  slotLabel?: string
  calendarLink?: string
  meetLink?: string
  gcalEventId?: string
  createdAt: string
  method: string
}

interface GcalStatus {
  configured: boolean
  hasClientId: boolean
  hasClientSecret: boolean
  hasRefreshToken: boolean
  hasCalendarId: boolean
  hasSlackWebhook: boolean
  hasSmtp: boolean
  storageMode: 'kv' | 'fs'
  hasKV: boolean
  authUrl: string | null
}

interface SlotItem {
  id: string
  date: string
  time: string
  label: string
  booked: boolean
  isCustom?: boolean
  durationMins: number
}

/* ── Helpers ────────────────────────────────────────────────────────────── */

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('ar-SA', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function isToday(iso: string) {
  const d = new Date(iso), n = new Date()
  return d.getDate() === n.getDate() && d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear()
}

const STAT_COLOR = '#2563eb'

function StatusRow({ label, ok, okText, failText, helpUrl, helpLabel }: {
  label: string; ok: boolean; okText: string; failText: string; helpUrl?: string; helpLabel?: string
}) {
  return (
    <div className="flex items-start justify-between gap-3 py-2.5 px-3 rounded-lg" style={{
      background: ok ? 'rgba(37,99,235,0.06)' : 'rgba(251,191,36,0.06)',
      border: `1px solid ${ok ? 'rgba(37,99,235,0.18)' : 'rgba(251,191,36,0.18)'}`,
    }}>
      <div>
        <p className="text-[11px] font-mono font-bold" style={{ color: ok ? '#60a5fa' : '#fbbf24' }}>{label}</p>
        <p className="text-[10px] mt-0.5" style={{ color: ok ? '#7a93bc' : '#d97706' }}>
          {ok ? okText : failText}
          {!ok && helpUrl && (
            <> — <a href={helpUrl} target="_blank" className="underline" style={{ color: '#fbbf24' }}>{helpLabel}</a></>
          )}
        </p>
      </div>
      <span className="text-sm flex-shrink-0">{ok ? '✅' : '⚠️'}</span>
    </div>
  )
}

/* ── Admin Page ─────────────────────────────────────────────────────────── */

export default function AdminPage() {
  const [pw, setPw]               = useState('')
  const [authed, setAuthed]       = useState(false)
  const [authError, setAuthError] = useState(false)
  const [tab, setTab]             = useState<'bookings' | 'slots' | 'google'>('bookings')
  const [gcalStatus, setGcalStatus] = useState<GcalStatus | null>(null)

  /* bookings */
  const [bookings, setBookings]   = useState<Booking[]>([])
  const [bLoading, setBLoading]   = useState(false)
  const [deleting, setDeleting]   = useState<string | null>(null)
  const [search, setSearch]       = useState('')
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null)

  /* slots */
  const [slots, setSlots]         = useState<SlotItem[]>([])
  const [sLoading, setSLoading]   = useState(false)
  const [newDate, setNewDate]     = useState('')
  const [newTime, setNewTime]     = useState('')
  const [newDur, setNewDur]       = useState(30)
  const [addingSlot, setAddingSlot] = useState(false)
  const [deletingSlot, setDeletingSlot] = useState<string | null>(null)
  const [slotError, setSlotError] = useState('')

  /* ── Data fetchers ─────────────────────────────────────────────────── */

  const fetchBookings = useCallback(async (password: string) => {
    setBLoading(true)
    try {
      const res = await fetch(`/api/admin/bookings?pw=${encodeURIComponent(password)}`)
      if (res.status === 401) { setAuthed(false); return }
      const data = await res.json()
      setBookings(data.bookings || [])
      setLastRefresh(new Date())
    } catch { /* keep existing */ }
    setBLoading(false)
  }, [])

  const fetchGcalStatus = useCallback(async (password: string) => {
    try {
      const res = await fetch(`/api/admin/google-status?pw=${encodeURIComponent(password)}`)
      if (!res.ok) return
      setGcalStatus(await res.json())
    } catch { /* ignore */ }
  }, [])

  const fetchSlots = useCallback(async (password: string) => {
    setSLoading(true)
    try {
      const res = await fetch(`/api/admin/slots?pw=${encodeURIComponent(password)}`)
      if (!res.ok) return
      const data = await res.json()
      setSlots(data.slots || [])
    } catch { /* keep existing */ }
    setSLoading(false)
  }, [])

  /* ── Auth ──────────────────────────────────────────────────────────── */

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setAuthError(false)
    const res = await fetch(`/api/admin/bookings?pw=${encodeURIComponent(pw)}`)
    if (res.status === 401) { setAuthError(true); return }
    const data = await res.json()
    setBookings(data.bookings || [])
    setLastRefresh(new Date())
    setAuthed(true)
    fetchSlots(pw)
    fetchGcalStatus(pw)

    // Handle Google OAuth callback result in URL
    const params = new URLSearchParams(window.location.search)
    if (params.get('gcal') === 'success') {
      setTab('google')
      window.history.replaceState({}, '', '/admin')
    }
  }

  /* Auto-refresh */
  useEffect(() => {
    if (!authed) return
    const iv = setInterval(() => { fetchBookings(pw); fetchSlots(pw) }, 30_000)
    return () => clearInterval(iv)
  }, [authed, pw, fetchBookings, fetchSlots])

  /* ── Bookings actions ──────────────────────────────────────────────── */

  async function handleDelete(id: string) {
    setDeleting(id)
    await fetch(`/api/admin/bookings?pw=${encodeURIComponent(pw)}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    setBookings((prev) => prev.filter((b) => b.id !== id))
    setDeleting(null)
  }

  function exportCSV() {
    const headers = ['الاسم', 'الشركة', 'الجوال', 'الإيميل', 'الموعد', 'الرسالة', 'التاريخ', 'الطريقة']
    const rows = filtered.map((b) => [
      b.name, b.company, b.phone, b.email,
      b.slotLabel || '—',
      b.message.replace(/,/g, '؛'),
      new Date(b.createdAt).toLocaleString('ar-SA'),
      b.method,
    ])
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(',')).join('\n')
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `smaw-bookings-${new Date().toISOString().slice(0, 10)}.csv`; a.click()
    URL.revokeObjectURL(url)
  }

  const filtered = bookings.filter((b) => {
    if (!search.trim()) return true
    const q = search.toLowerCase()
    return b.name.toLowerCase().includes(q) || b.company.toLowerCase().includes(q) ||
      b.phone.includes(q) || b.email.toLowerCase().includes(q) ||
      (b.slotLabel || '').includes(q)
  })

  /* ── Slots actions ─────────────────────────────────────────────────── */

  async function handleAddSlot(e: React.FormEvent) {
    e.preventDefault()
    setSlotError('')
    if (!newDate || !newTime) { setSlotError('أدخل التاريخ والوقت'); return }
    setAddingSlot(true)
    const res = await fetch(`/api/admin/slots?pw=${encodeURIComponent(pw)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: newDate, time: newTime, durationMins: newDur }),
    })
    if (res.status === 409) { setSlotError('هذا الموعد موجود بالفعل'); setAddingSlot(false); return }
    if (!res.ok) { setSlotError('حدث خطأ، حاول مجدداً'); setAddingSlot(false); return }
    setNewDate(''); setNewTime(''); setNewDur(30)
    fetchSlots(pw)
    setAddingSlot(false)
  }

  async function handleDeleteSlot(id: string) {
    setDeletingSlot(id)
    await fetch(`/api/admin/slots?pw=${encodeURIComponent(pw)}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    setSlots((prev) => prev.filter((s) => s.id !== id))
    setDeletingSlot(null)
  }

  // Read Google OAuth result from URL on mount (client-only)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    if (params.get('gcal') === 'success') {
      const rt = params.get('rt')
      if (rt) {
        setGcalStatus((prev) => prev ? { ...prev, hasRefreshToken: true, configured: prev.hasClientId && prev.hasClientSecret } : null)
      }
      window.history.replaceState({}, '', '/admin')
    }
  }, [])

  const todayCount = bookings.filter((b) => isToday(b.createdAt)).length
  const bookedSlots = slots.filter((s) => s.booked).length
  const freeSlots   = slots.filter((s) => !s.booked).length

  /* ── Shared card style ─────────────────────────────────────────────── */
  const card = { background: 'rgba(13,21,37,0.8)', border: '1px solid rgba(148,163,184,0.08)', borderRadius: 12 }
  const inputStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(148,163,184,0.12)',
    color: '#e2e8f8',
    fontFamily: 'Cairo',
    borderRadius: 8,
    outline: 'none',
    padding: '8px 12px',
    fontSize: 13,
  }

  /* ── LOGIN ─────────────────────────────────────────────────────────── */

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#030712', fontFamily: 'Cairo' }}>
        <div className="w-full max-w-sm rounded-2xl p-8" style={card}>
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#2563eb' }}>
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <div>
              <p className="text-white font-bold text-sm">SMAW Admin</p>
              <p className="text-xs" style={{ color: '#3d5270' }}>Bookings Dashboard</p>
            </div>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: '#7a93bc' }}>Admin Password</label>
              <input
                type="password" value={pw} onChange={(e) => setPw(e.target.value)}
                placeholder="••••••••" autoFocus
                className="w-full rounded-lg px-4 py-2.5 text-sm outline-none transition-colors"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: `1px solid ${authError ? 'rgba(239,68,68,0.5)' : 'rgba(148,163,184,0.1)'}`,
                  color: '#e2e8f8',
                }}
              />
              {authError && <p className="text-xs mt-1" style={{ color: '#f87171' }}>كلمة المرور غير صحيحة</p>}
            </div>
            <button type="submit" className="w-full py-2.5 rounded-lg text-sm font-semibold text-white" style={{ background: '#2563eb' }}>
              دخول
            </button>
          </form>
        </div>
      </div>
    )
  }

  /* ── DASHBOARD ─────────────────────────────────────────────────────── */

  return (
    <div className="min-h-screen" style={{ background: '#030712', fontFamily: 'Cairo', direction: 'rtl' }}>

      {/* ── Header ── */}
      <div className="border-b px-6 py-4 flex items-center justify-between" style={{ borderColor: 'rgba(148,163,184,0.08)', background: 'rgba(10,16,32,0.95)' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#2563eb' }}>
            <span className="text-white font-bold text-xs">S</span>
          </div>
          <div>
            <p className="text-sm font-bold" style={{ color: '#e2e8f8' }}>SMAW Admin</p>
            <p className="text-[10px]" style={{ color: '#3d5270' }}>لوحة إدارة الحجوزات والمواعيد</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {lastRefresh && (
            <p className="text-[10px]" style={{ color: '#3d5270' }}>
              آخر تحديث: {lastRefresh.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
            </p>
          )}
          <button
            onClick={() => { fetchBookings(pw); fetchSlots(pw) }}
            disabled={bLoading || sLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.2)', color: '#60a5fa' }}
          >
            <i className={`fas fa-sync-alt text-[10px] ${(bLoading || sLoading) ? 'fa-spin' : ''}`} />
            تحديث
          </button>
          <button onClick={() => setAuthed(false)} className="text-xs px-3 py-1.5 rounded-lg transition-all"
            style={{ background: 'rgba(148,163,184,0.06)', border: '1px solid rgba(148,163,184,0.1)', color: '#7a93bc' }}>
            خروج
          </button>
          <a href="/" className="text-xs px-3 py-1.5 rounded-lg transition-all"
            style={{ background: 'rgba(148,163,184,0.06)', border: '1px solid rgba(148,163,184,0.1)', color: '#7a93bc' }}>
            الموقع ←
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'إجمالي الحجوزات', value: bookings.length,  icon: 'fas fa-calendar-check' },
            { label: 'اليوم',            value: todayCount,        icon: 'fas fa-clock'          },
            { label: 'عبر الإيميل',      value: bookings.filter((b) => b.email).length, icon: 'fas fa-envelope' },
            { label: 'مواعيد متاحة',     value: freeSlots,         icon: 'fas fa-calendar-plus'  },
            { label: 'مواعيد محجوزة',    value: bookedSlots,       icon: 'fas fa-calendar-times'  },
          ].map((s) => (
            <div key={s.label} className="rounded-xl p-4" style={card}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: `${STAT_COLOR}18`, border: `1px solid ${STAT_COLOR}30` }}>
                  <i className={`${s.icon} text-[10px]`} style={{ color: STAT_COLOR }} />
                </div>
                <p className="text-[10px] font-semibold" style={{ color: '#7a93bc' }}>{s.label}</p>
              </div>
              <p className="text-2xl font-bold" style={{ color: '#e2e8f8' }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* ── Tabs ── */}
        <div className="flex flex-wrap gap-2 mb-6 items-center justify-between">
          <div className="flex gap-2">
            {([
              { id: 'bookings', label: 'الحجوزات',        icon: 'fas fa-calendar-check', badge: String(bookings.length) },
              { id: 'slots',    label: 'المواعيد المتاحة', icon: 'fas fa-calendar-plus',  badge: String(slots.length) },
              { id: 'google',   label: 'إعداد Google',     icon: 'fab fa-google',          badge: gcalStatus?.configured ? '✓' : '!' },
            ] as const).map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setTab(t.id)
                  if (t.id === 'slots') fetchSlots(pw)
                  if (t.id === 'google') fetchGcalStatus(pw)
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: tab === t.id ? '#2563eb' : 'rgba(13,21,37,0.8)',
                  border: `1px solid ${tab === t.id ? '#2563eb' : t.id === 'google' && !gcalStatus?.configured ? 'rgba(251,191,36,0.4)' : 'rgba(148,163,184,0.1)'}`,
                  color: tab === t.id ? '#fff' : t.id === 'google' && !gcalStatus?.configured ? '#fbbf24' : '#7a93bc',
                }}
              >
                <i className={`${t.icon} text-xs`} />
                {t.label}
                <span className="text-[10px] px-1.5 rounded-full" style={{
                  background: tab === t.id ? 'rgba(255,255,255,0.2)' : 'rgba(148,163,184,0.1)',
                  color: tab === t.id ? '#fff' : '#3d5270',
                }}>{t.badge}</span>
              </button>
            ))}
          </div>
          {gcalStatus && (
            <div className="flex items-center gap-2 text-[10px]" style={{ color: '#3d5270' }}>
              <span className={`w-2 h-2 rounded-full`} style={{ background: gcalStatus.hasKV ? '#22c55e' : '#f59e0b' }} />
              التخزين: {gcalStatus.storageMode === 'kv' ? 'Vercel KV ✓' : 'ملف (محلي فقط)'}
            </div>
          )}
        </div>

        {/* ────────────────────────────────────────── */}
        {/* TAB: BOOKINGS                             */}
        {/* ────────────────────────────────────────── */}
        {tab === 'bookings' && (
          <>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
              <div className="relative">
                <i className="fas fa-search absolute text-[10px]" style={{ color: '#3d5270', top: '50%', transform: 'translateY(-50%)', right: 12 }} />
                <input
                  type="text" placeholder="بحث بالاسم أو الشركة أو الجوال..." value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="rounded-lg pr-9 pl-4 py-2 text-xs outline-none w-72"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(148,163,184,0.1)', color: '#e2e8f8' }}
                />
              </div>
              <button onClick={exportCSV} disabled={filtered.length === 0}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all disabled:opacity-40"
                style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.25)', color: '#60a5fa' }}>
                <i className="fas fa-file-csv text-[10px]" />
                تصدير CSV ({filtered.length})
              </button>
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-2xl flex flex-col items-center justify-center py-24" style={card}>
                <i className="fas fa-inbox text-4xl mb-4" style={{ color: '#3d5270' }} />
                <p className="text-sm" style={{ color: '#3d5270' }}>
                  {search ? 'لا توجد نتائج مطابقة' : 'لا توجد حجوزات بعد'}
                </p>
              </div>
            ) : (
              <div className="rounded-2xl overflow-hidden" style={card}>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs" style={{ borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(148,163,184,0.08)', background: 'rgba(10,16,32,0.6)' }}>
                        {['#', 'الاسم', 'الشركة', 'موعد الاجتماع', 'الجوال', 'الإيميل', 'الرسالة', 'تاريخ الحجز', 'الطريقة', ''].map((h) => (
                          <th key={h} className="px-4 py-3 text-right font-semibold" style={{ color: '#3d5270', whiteSpace: 'nowrap' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((b, i) => (
                        <tr key={b.id} style={{ borderBottom: '1px solid rgba(148,163,184,0.05)' }}>
                          <td className="px-4 py-3" style={{ color: '#3d5270' }}>{i + 1}</td>
                          <td className="px-4 py-3 font-semibold" style={{ color: '#e2e8f8', whiteSpace: 'nowrap' }}>
                            {b.name}
                            {isToday(b.createdAt) && (
                              <span className="mr-2 px-1.5 py-0.5 rounded-full text-[9px] font-bold"
                                style={{ background: 'rgba(37,99,235,0.15)', color: '#60a5fa', border: '1px solid rgba(37,99,235,0.3)' }}>
                                اليوم
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3" style={{ color: '#7a93bc', whiteSpace: 'nowrap' }}>{b.company}</td>
                          <td className="px-4 py-3" style={{ whiteSpace: 'nowrap' }}>
                            {b.slotLabel ? (
                              <div className="flex flex-col gap-1">
                                <span style={{ color: '#60a5fa', fontFamily: 'Cairo' }}>{b.slotLabel}</span>
                                <div className="flex items-center gap-1.5">
                                  {b.meetLink && (
                                    <a href={b.meetLink} target="_blank" rel="noopener noreferrer" title="Google Meet"
                                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold"
                                      style={{ background: 'rgba(37,99,235,0.15)', color: '#60a5fa', border: '1px solid rgba(37,99,235,0.3)' }}>
                                      <i className="fas fa-video text-[8px]" /> Meet
                                    </a>
                                  )}
                                  {b.calendarLink && (
                                    <a href={b.calendarLink} target="_blank" rel="noopener noreferrer" title="أضف للتقويم"
                                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold"
                                      style={{ background: 'rgba(96,165,250,0.1)', color: '#93c5fd', border: '1px solid rgba(96,165,250,0.2)' }}>
                                      <i className="fas fa-calendar-plus text-[8px]" /> تقويم
                                    </a>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <span style={{ color: '#3d5270' }}>—</span>
                            )}
                          </td>
                          <td className="px-4 py-3" style={{ color: '#7a93bc', direction: 'ltr', textAlign: 'left', whiteSpace: 'nowrap' }}>
                            {b.phone || <span style={{ color: '#3d5270' }}>—</span>}
                          </td>
                          <td className="px-4 py-3" style={{ color: '#7a93bc', direction: 'ltr', textAlign: 'left', whiteSpace: 'nowrap' }}>
                            {b.email
                              ? <a href={`mailto:${b.email}`} style={{ color: '#7a93bc' }}>{b.email}</a>
                              : <span style={{ color: '#3d5270' }}>—</span>}
                          </td>
                          <td className="px-4 py-3 max-w-[180px]" style={{ color: '#7a93bc', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={b.message}>
                            {b.message || <span style={{ color: '#3d5270' }}>—</span>}
                          </td>
                          <td className="px-4 py-3" style={{ color: '#3d5270', whiteSpace: 'nowrap' }}>{formatDate(b.createdAt)}</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold" style={
                              b.method === 'email'
                                ? { background: 'rgba(37,99,235,0.12)', color: '#60a5fa', border: '1px solid rgba(37,99,235,0.25)' }
                                : b.method === 'sms'
                                ? { background: 'rgba(96,165,250,0.1)', color: '#93c5fd', border: '1px solid rgba(96,165,250,0.2)' }
                                : { background: 'rgba(148,163,184,0.07)', color: '#7a93bc', border: '1px solid rgba(148,163,184,0.12)' }
                            }>
                              {b.method === 'email' ? 'Email' : b.method === 'sms' ? 'SMS' : 'Logged'}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <button onClick={() => handleDelete(b.id)} disabled={deleting === b.id}
                              className="w-6 h-6 rounded-md flex items-center justify-center transition-all"
                              style={{ background: 'rgba(148,163,184,0.08)', border: '1px solid rgba(148,163,184,0.15)', color: '#7a93bc' }}>
                              {deleting === b.id
                                ? <i className="fas fa-spinner fa-spin text-[9px]" />
                                : <i className="fas fa-trash text-[9px]" />}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

        {/* ────────────────────────────────────────── */}
        {/* TAB: SLOTS                                */}
        {/* ────────────────────────────────────────── */}
        {tab === 'slots' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Add slot form */}
            <div className="rounded-2xl p-6" style={card}>
              <h3 className="text-sm font-bold text-[#e2e8f8] mb-4 flex items-center gap-2">
                <i className="fas fa-plus-circle text-[#2563eb] text-base" />
                إضافة موعد جديد
              </h3>
              <form onSubmit={handleAddSlot} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: '#7a93bc' }}>التاريخ</label>
                  <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)}
                    className="w-full" style={{ ...inputStyle, direction: 'ltr' }} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: '#7a93bc' }}>الوقت (AST +3)</label>
                  <input type="time" value={newTime} onChange={(e) => setNewTime(e.target.value)}
                    className="w-full" style={{ ...inputStyle, direction: 'ltr' }} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: '#7a93bc' }}>المدة (دقيقة)</label>
                  <select value={newDur} onChange={(e) => setNewDur(Number(e.target.value))}
                    className="w-full" style={{ ...inputStyle }}>
                    <option value={15}>15 دقيقة</option>
                    <option value={30}>30 دقيقة</option>
                    <option value={45}>45 دقيقة</option>
                    <option value={60}>ساعة كاملة</option>
                  </select>
                </div>
                {slotError && <p className="text-xs" style={{ color: '#f87171' }}>{slotError}</p>}
                <button type="submit" disabled={addingSlot}
                  className="w-full py-2.5 rounded-lg text-sm font-bold text-white flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
                  style={{ background: '#2563eb', boxShadow: '0 4px 16px rgba(37,99,235,0.3)' }}>
                  {addingSlot ? <><i className="fas fa-spinner fa-spin text-xs" /> جارٍ الإضافة...</> : <><i className="fas fa-plus text-xs" /> أضف الموعد</>}
                </button>
              </form>

              <div className="mt-6 pt-5" style={{ borderTop: '1px solid rgba(148,163,184,0.08)' }}>
                <p className="text-[11px] leading-relaxed" style={{ color: '#3d5270' }}>
                  <i className="fas fa-info-circle text-[#2563eb] me-1" />
                  المواعيد التي تضيفها هنا ستظهر فوراً للعملاء. يمكنك حذف أي موعد من القائمة على اليمين.
                </p>
              </div>
            </div>

            {/* Slots list */}
            <div className="lg:col-span-2 rounded-2xl overflow-hidden" style={card}>
              <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: 'rgba(148,163,184,0.08)' }}>
                <h3 className="text-sm font-bold text-[#e2e8f8]">
                  جميع المواعيد
                  <span className="mr-2 text-xs font-normal" style={{ color: '#3d5270' }}>({slots.length})</span>
                </h3>
                <div className="flex items-center gap-3 text-[11px]">
                  <span className="flex items-center gap-1" style={{ color: '#60a5fa' }}>
                    <span className="w-2 h-2 rounded-full inline-block" style={{ background: '#2563eb' }} />
                    متاح ({freeSlots})
                  </span>
                  <span className="flex items-center gap-1" style={{ color: '#3d5270' }}>
                    <span className="w-2 h-2 rounded-full inline-block" style={{ background: '#3d5270' }} />
                    محجوز ({bookedSlots})
                  </span>
                </div>
              </div>

              {sLoading ? (
                <div className="flex items-center justify-center py-16">
                  <i className="fas fa-spinner fa-spin text-[#2563eb] text-xl" />
                </div>
              ) : slots.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <i className="fas fa-calendar-times text-4xl mb-3" style={{ color: '#3d5270' }} />
                  <p className="text-sm" style={{ color: '#3d5270' }}>لا توجد مواعيد — أضف موعداً من النموذج</p>
                </div>
              ) : (
                <div className="overflow-y-auto max-h-[520px]">
                  {slots.map((slot) => (
                    <div
                      key={slot.id}
                      className="flex items-center justify-between px-5 py-3.5 transition-colors hover:bg-white/[0.02]"
                      style={{ borderBottom: '1px solid rgba(148,163,184,0.05)', opacity: slot.booked ? 0.6 : 1 }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ background: slot.booked ? '#3d5270' : '#2563eb' }}
                        />
                        <div>
                          <p className="text-sm font-semibold" style={{ color: slot.booked ? '#7a93bc' : '#e2e8f8', fontFamily: 'Cairo' }}>
                            {slot.label}
                          </p>
                          <p className="text-[10px] mt-0.5" style={{ color: '#3d5270' }}>
                            {slot.durationMins} دقيقة
                            {slot.booked && <span className="mr-2 px-1.5 py-0.5 rounded-full"
                              style={{ background: 'rgba(148,163,184,0.08)', border: '1px solid rgba(148,163,184,0.15)' }}>محجوز</span>}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteSlot(slot.id)}
                        disabled={deletingSlot === slot.id || slot.booked}
                        title={slot.booked ? 'الموعد محجوز — لا يمكن حذفه' : 'حذف الموعد'}
                        className="w-7 h-7 rounded-lg flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        style={{ background: 'rgba(148,163,184,0.07)', border: '1px solid rgba(148,163,184,0.12)', color: '#7a93bc' }}
                      >
                        {deletingSlot === slot.id
                          ? <i className="fas fa-spinner fa-spin text-[9px]" />
                          : <i className="fas fa-trash text-[9px]" />}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ────────────────────────────────────────── */}
        {/* TAB: GOOGLE SETUP                         */}
        {/* ────────────────────────────────────────── */}
        {tab === 'google' && (
          <div className="max-w-2xl mx-auto space-y-4">
            {/* Storage card */}
            <div className="rounded-2xl p-6" style={card}>
              <h3 className="text-sm font-bold text-[#e2e8f8] mb-4 flex items-center gap-2">
                <i className="fas fa-database text-[#2563eb]" /> التخزين
              </h3>
              {gcalStatus ? (
                <div className="space-y-3">
                  <StatusRow label="Vercel KV (Redis)" ok={gcalStatus.hasKV}
                    okText="متصل — الحجوزات تُحفظ بشكل دائم ✓"
                    failText="غير متصل — الحجوزات تُفقد بعد إعادة النشر"
                    helpUrl="https://vercel.com/dashboard/stores"
                    helpLabel="أنشئ KV Store في Vercel"
                  />
                  {!gcalStatus.hasKV && (
                    <div className="rounded-xl p-4 text-xs leading-relaxed space-y-1" style={{ background: 'rgba(251,191,36,0.07)', border: '1px solid rgba(251,191,36,0.2)', color: '#fbbf24' }}>
                      <p className="font-bold">⚠️ لحل مشكلة الحجوزات على Vercel:</p>
                      <ol className="list-decimal list-inside space-y-1 text-[11px]" style={{ color: '#d97706' }}>
                        <li>افتح <a href="https://vercel.com/dashboard/stores" target="_blank" className="underline" style={{ color: '#fbbf24' }}>Vercel → Storage</a></li>
                        <li>اضغط "Create Database" → اختر "KV"</li>
                        <li>سمّه أي اسم → اضغط "Connect to Project"</li>
                        <li>أعد النشر (Redeploy) — الحجوزات ستُحفظ تلقائياً</li>
                      </ol>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm" style={{ color: '#3d5270' }}>جارٍ التحميل...</p>
              )}
            </div>

            {/* Notifications card */}
            <div className="rounded-2xl p-6" style={card}>
              <h3 className="text-sm font-bold text-[#e2e8f8] mb-4 flex items-center gap-2">
                <i className="fas fa-bell text-[#2563eb]" /> الإشعارات
              </h3>
              {gcalStatus ? (
                <div className="space-y-3">
                  <StatusRow label="Slack Webhook" ok={gcalStatus.hasSlackWebhook}
                    okText="متصل — الإشعارات تُرسل لـ Slack ✓"
                    failText="غير مضبوط — أضف SLACK_WEBHOOK_URL"
                    helpUrl="https://api.slack.com/messaging/webhooks"
                    helpLabel="أنشئ Webhook في Slack"
                  />
                  <StatusRow label="SMTP (Email للعميل)" ok={gcalStatus.hasSmtp}
                    okText="مضبوط — إيميل التأكيد يُرسل للعميل ✓"
                    failText="غير مضبوط — أضف SMTP_HOST / SMTP_USER / SMTP_PASS"
                  />
                  {!gcalStatus.hasSlackWebhook && (
                    <div className="rounded-xl p-4 text-xs" style={{ background: 'rgba(251,191,36,0.07)', border: '1px solid rgba(251,191,36,0.2)', color: '#fbbf24' }}>
                      <p className="font-bold mb-2">خطوات إعداد Slack Webhook:</p>
                      <ol className="list-decimal list-inside space-y-1 text-[11px]" style={{ color: '#d97706' }}>
                        <li>افتح <a href="https://api.slack.com/apps" target="_blank" className="underline" style={{ color: '#fbbf24' }}>api.slack.com/apps</a> → Create App → From Scratch</li>
                        <li>Incoming Webhooks → Activate → Add New Webhook → اختر القناة</li>
                        <li>انسخ الـ Webhook URL</li>
                        <li>أضفه في Vercel → Settings → Environment Variables بالاسم: <code className="px-1 rounded" style={{ background: 'rgba(37,99,235,0.2)' }}>SLACK_WEBHOOK_URL</code></li>
                        <li>أعد النشر</li>
                      </ol>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm" style={{ color: '#3d5270' }}>جارٍ التحميل...</p>
              )}
            </div>

            {/* Google Calendar card */}
            <div className="rounded-2xl p-6" style={card}>
              <h3 className="text-sm font-bold text-[#e2e8f8] mb-1 flex items-center gap-2">
                <i className="fab fa-google text-[#2563eb]" /> Google Calendar + Meet
              </h3>
              <p className="text-[11px] mb-4" style={{ color: '#3d5270' }}>
                عند الضبط الكامل، كل حجز جديد سيُنشئ تلقائياً حدثاً في Google Calendar
                مع رابط Google Meet، وسيُرسل دعوة للعميل مباشرةً على إيميله.
              </p>
              {gcalStatus ? (
                <div className="space-y-3">
                  <StatusRow label="GOOGLE_CLIENT_ID"     ok={gcalStatus.hasClientId}     okText="موجود ✓" failText="مفقود" />
                  <StatusRow label="GOOGLE_CLIENT_SECRET" ok={gcalStatus.hasClientSecret} okText="موجود ✓" failText="مفقود" />
                  <StatusRow label="GOOGLE_REFRESH_TOKEN" ok={gcalStatus.hasRefreshToken} okText="موجود — Google Calendar جاهز ✓" failText="مفقود — اضغط الزر أدناه للحصول عليه" />
                  <StatusRow label="GOOGLE_CALENDAR_ID"   ok={gcalStatus.hasCalendarId}   okText="موجود ✓" failText="مفقود — أضف بريدك الإلكتروني" />

                  {gcalStatus.configured ? (
                    <div className="rounded-xl p-4 text-sm text-center font-semibold" style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.3)', color: '#60a5fa' }}>
                      <i className="fas fa-check-circle me-2" />
                      Google Calendar + Meet مُفعَّل بالكامل ✓
                    </div>
                  ) : (
                    <>
                      {!gcalStatus.hasClientId || !gcalStatus.hasClientSecret ? (
                        <div className="rounded-xl p-4 text-xs leading-relaxed space-y-2" style={{ background: 'rgba(251,191,36,0.07)', border: '1px solid rgba(251,191,36,0.2)', color: '#d97706' }}>
                          <p className="font-bold text-[#fbbf24]">خطوات الإعداد أولاً (مرة واحدة):</p>
                          <ol className="list-decimal list-inside space-y-1">
                            <li>افتح <a href="https://console.cloud.google.com" target="_blank" className="underline text-[#fbbf24]">console.cloud.google.com</a> → أنشئ مشروعاً جديداً</li>
                            <li>APIs & Services → Enable APIs → ابحث عن "Google Calendar API" → Enable</li>
                            <li>Credentials → Create Credentials → OAuth 2.0 Client ID → Web Application</li>
                            <li>Authorized redirect URIs: <code className="px-1 rounded bg-white/10">{`${typeof window !== 'undefined' ? window.location.origin : 'https://smaww.com'}/api/admin/google-callback`}</code></li>
                            <li>انسخ Client ID و Client Secret → أضفهم في Vercel env vars</li>
                            <li>أضف أيضاً: <code className="px-1 rounded bg-white/10">GOOGLE_CALENDAR_ID</code> = بريدك الإلكتروني</li>
                            <li>أضف أيضاً: <code className="px-1 rounded bg-white/10">NEXT_PUBLIC_BASE_URL</code> = رابط موقعك (بدون /)</li>
                            <li>أعد النشر → ارجع هنا واضغط "ربط Google Calendar"</li>
                          </ol>
                        </div>
                      ) : gcalStatus.authUrl ? (
                        <a
                          href={gcalStatus.authUrl}
                          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5"
                          style={{ background: '#2563eb', boxShadow: '0 4px 20px rgba(37,99,235,0.4)' }}
                        >
                          <i className="fab fa-google" />
                          ربط Google Calendar (اضغط مرة واحدة)
                        </a>
                      ) : (
                        <p className="text-xs text-center" style={{ color: '#f87171' }}>
                          أضف NEXT_PUBLIC_BASE_URL في env vars أولاً
                        </p>
                      )}
                    </>
                  )}
                </div>
              ) : (
                <p className="text-sm" style={{ color: '#3d5270' }}>جارٍ التحميل...</p>
              )}
            </div>
          </div>
        )}

        <p className="mt-6 text-center text-[10px]" style={{ color: '#3d5270' }}>
          يتجدد تلقائياً كل 30 ثانية — كلمة المرور الافتراضية:
          <code className="mx-1 px-1.5 py-0.5 rounded" style={{ background: 'rgba(37,99,235,0.1)', color: '#60a5fa' }}>smaw2026</code>
          | لتغييرها: أضف متغير بيئة <code className="mx-1 px-1.5 py-0.5 rounded" style={{ background: 'rgba(37,99,235,0.1)', color: '#60a5fa' }}>ADMIN_PASSWORD</code>
        </p>
      </div>
    </div>
  )
}
