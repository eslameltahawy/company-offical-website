'use client'

import { useState, useEffect, useCallback } from 'react'

interface Booking {
  id: string
  name: string
  phone: string
  email: string
  company: string
  message: string
  createdAt: string
  method: string
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('ar-SA', { year: 'numeric', month: 'short', day: 'numeric' }) +
    ' ' + d.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
}

function isToday(iso: string) {
  const d = new Date(iso)
  const n = new Date()
  return d.getDate() === n.getDate() && d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear()
}

export default function AdminPage() {
  const [pw, setPw]               = useState('')
  const [authed, setAuthed]       = useState(false)
  const [authError, setAuthError] = useState(false)
  const [bookings, setBookings]   = useState<Booking[]>([])
  const [loading, setLoading]     = useState(false)
  const [deleting, setDeleting]   = useState<string | null>(null)
  const [search, setSearch]       = useState('')
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null)

  const fetchBookings = useCallback(async (password: string) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/bookings?pw=${encodeURIComponent(password)}`)
      if (res.status === 401) { setAuthed(false); return }
      const data = await res.json()
      setBookings(data.bookings || [])
      setLastRefresh(new Date())
    } catch {
      // keep existing data
    }
    setLoading(false)
  }, [])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setAuthError(false)
    const res = await fetch(`/api/admin/bookings?pw=${encodeURIComponent(pw)}`)
    if (res.status === 401) { setAuthError(true); return }
    const data = await res.json()
    setBookings(data.bookings || [])
    setLastRefresh(new Date())
    setAuthed(true)
  }

  async function handleDelete(id: string, password: string) {
    setDeleting(id)
    await fetch(`/api/admin/bookings?pw=${encodeURIComponent(password)}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    setBookings((prev) => prev.filter((b) => b.id !== id))
    setDeleting(null)
  }

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (!authed) return
    const interval = setInterval(() => fetchBookings(pw), 30_000)
    return () => clearInterval(interval)
  }, [authed, pw, fetchBookings])

  function exportCSV() {
    const headers = ['الاسم', 'الشركة', 'الجوال', 'الإيميل', 'الرسالة', 'التاريخ', 'طريقة التأكيد']
    const rows = filtered.map((b) => [
      b.name, b.company, b.phone, b.email,
      b.message.replace(/,/g, '؛'),
      new Date(b.createdAt).toLocaleString('ar-SA'),
      b.method,
    ])
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(',')).join('\n')
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `smaw-bookings-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const filtered = bookings.filter((b) => {
    if (!search.trim()) return true
    const q = search.toLowerCase()
    return (
      b.name.toLowerCase().includes(q) ||
      b.company.toLowerCase().includes(q) ||
      b.phone.includes(q) ||
      b.email.toLowerCase().includes(q)
    )
  })

  const todayCount = bookings.filter((b) => isToday(b.createdAt)).length

  /* ── Login Screen ─────────────────────────────── */
  if (!authed) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: '#030712', fontFamily: 'Cairo' }}
      >
        <div
          className="w-full max-w-sm rounded-2xl p-8 border"
          style={{ background: 'rgba(13,21,37,0.95)', borderColor: 'rgba(148,163,184,0.1)' }}
        >
          <div className="flex items-center gap-2.5 mb-8">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: '#2563eb' }}
            >
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <div>
              <p className="text-white font-bold text-sm">SMAW Admin</p>
              <p className="text-xs" style={{ color: '#3d5270' }}>Bookings Dashboard</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: '#7a93bc' }}>
                Admin Password
              </label>
              <input
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="••••••••"
                autoFocus
                className="w-full rounded-lg px-4 py-2.5 text-sm outline-none transition-colors"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: `1px solid ${authError ? 'rgba(239,68,68,0.5)' : 'rgba(148,163,184,0.1)'}`,
                  color: '#e2e8f8',
                }}
              />
              {authError && (
                <p className="text-xs mt-1" style={{ color: '#f87171' }}>
                  كلمة المرور غير صحيحة
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-all"
              style={{ background: '#2563eb' }}
            >
              دخول
            </button>
          </form>
        </div>
      </div>
    )
  }

  /* ── Dashboard ────────────────────────────────── */
  return (
    <div
      className="min-h-screen"
      style={{ background: '#030712', fontFamily: 'Cairo', direction: 'rtl' }}
    >
      {/* Header */}
      <div
        className="border-b px-6 py-4 flex items-center justify-between"
        style={{ borderColor: 'rgba(148,163,184,0.08)', background: 'rgba(10,16,32,0.9)' }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: '#2563eb' }}
          >
            <span className="text-white font-bold text-xs">S</span>
          </div>
          <div>
            <p className="text-sm font-bold" style={{ color: '#e2e8f8' }}>SMAW Admin</p>
            <p className="text-[10px]" style={{ color: '#3d5270', fontFamily: 'Cairo' }}>
              لوحة إدارة الحجوزات
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {lastRefresh && (
            <p className="text-[10px]" style={{ color: '#3d5270', fontFamily: 'Cairo' }}>
              آخر تحديث: {lastRefresh.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
            </p>
          )}
          <button
            onClick={() => fetchBookings(pw)}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={{
              background: 'rgba(37,99,235,0.1)',
              border: '1px solid rgba(37,99,235,0.2)',
              color: '#60a5fa',
              fontFamily: 'Cairo',
            }}
          >
            <i className={`fas fa-sync-alt text-[10px] ${loading ? 'fa-spin' : ''}`} />
            تحديث
          </button>
          <button
            onClick={() => setAuthed(false)}
            className="text-xs px-3 py-1.5 rounded-lg transition-all"
            style={{
              background: 'rgba(148,163,184,0.06)',
              border: '1px solid rgba(148,163,184,0.1)',
              color: '#7a93bc',
              fontFamily: 'Cairo',
            }}
          >
            خروج
          </button>
          <a
            href="/"
            className="text-xs px-3 py-1.5 rounded-lg transition-all"
            style={{
              background: 'rgba(148,163,184,0.06)',
              border: '1px solid rgba(148,163,184,0.1)',
              color: '#7a93bc',
              fontFamily: 'Cairo',
            }}
          >
            الموقع ←
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'إجمالي الحجوزات', value: bookings.length, icon: 'fas fa-calendar-check', color: '#2563eb' },
            { label: 'اليوم', value: todayCount, icon: 'fas fa-clock', color: '#10b981' },
            { label: 'عبر الجوال', value: bookings.filter((b) => b.phone).length, icon: 'fas fa-mobile-alt', color: '#7c3aed' },
            { label: 'عبر الإيميل', value: bookings.filter((b) => b.email && !b.phone).length, icon: 'fas fa-envelope', color: '#d97706' },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl p-4 border"
              style={{ background: 'rgba(13,21,37,0.8)', borderColor: 'rgba(148,163,184,0.08)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: `${s.color}18`, border: `1px solid ${s.color}30` }}
                >
                  <i className={`${s.icon} text-[10px]`} style={{ color: s.color }} />
                </div>
                <p className="text-[10px] font-semibold" style={{ color: '#7a93bc', fontFamily: 'Cairo' }}>
                  {s.label}
                </p>
              </div>
              <p className="text-2xl font-bold" style={{ color: '#e2e8f8' }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div className="relative">
            <i
              className="fas fa-search absolute text-[10px]"
              style={{ color: '#3d5270', top: '50%', transform: 'translateY(-50%)', right: '12px' }}
            />
            <input
              type="text"
              placeholder="بحث بالاسم أو الشركة أو الجوال..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-lg pr-9 pl-4 py-2 text-xs outline-none transition-colors w-72"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(148,163,184,0.1)',
                color: '#e2e8f8',
                fontFamily: 'Cairo',
              }}
            />
          </div>
          <button
            onClick={exportCSV}
            disabled={filtered.length === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all disabled:opacity-40"
            style={{
              background: 'rgba(16,185,129,0.1)',
              border: '1px solid rgba(16,185,129,0.25)',
              color: '#10b981',
              fontFamily: 'Cairo',
            }}
          >
            <i className="fas fa-file-csv text-[10px]" />
            تصدير CSV ({filtered.length})
          </button>
        </div>

        {/* Table */}
        {filtered.length === 0 ? (
          <div
            className="rounded-2xl border flex flex-col items-center justify-center py-24"
            style={{ borderColor: 'rgba(148,163,184,0.08)', background: 'rgba(13,21,37,0.5)' }}
          >
            <i className="fas fa-inbox text-4xl mb-4" style={{ color: '#3d5270' }} />
            <p className="text-sm" style={{ color: '#3d5270', fontFamily: 'Cairo' }}>
              {search ? 'لا توجد نتائج مطابقة' : 'لا توجد حجوزات بعد'}
            </p>
          </div>
        ) : (
          <div
            className="rounded-2xl border overflow-hidden"
            style={{ borderColor: 'rgba(148,163,184,0.08)', background: 'rgba(13,21,37,0.8)' }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-xs" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(148,163,184,0.08)', background: 'rgba(10,16,32,0.6)' }}>
                    {['#', 'الاسم', 'الشركة', 'الجوال', 'الإيميل', 'الرسالة', 'التاريخ', 'الطريقة', ''].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-right font-semibold"
                        style={{ color: '#3d5270', fontFamily: 'Cairo', whiteSpace: 'nowrap' }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((b, i) => (
                    <tr
                      key={b.id}
                      style={{ borderBottom: '1px solid rgba(148,163,184,0.05)' }}
                    >
                      <td className="px-4 py-3" style={{ color: '#3d5270' }}>{i + 1}</td>
                      <td className="px-4 py-3 font-semibold" style={{ color: '#e2e8f8', fontFamily: 'Cairo', whiteSpace: 'nowrap' }}>
                        {b.name}
                        {isToday(b.createdAt) && (
                          <span
                            className="mr-2 px-1.5 py-0.5 rounded-full text-[9px] font-bold"
                            style={{ background: '#10b98120', color: '#10b981', border: '1px solid #10b98135' }}
                          >
                            اليوم
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3" style={{ color: '#7a93bc', fontFamily: 'Cairo', whiteSpace: 'nowrap' }}>{b.company}</td>
                      <td className="px-4 py-3" style={{ color: '#7a93bc', direction: 'ltr', textAlign: 'left', whiteSpace: 'nowrap' }}>
                        {b.phone || <span style={{ color: '#3d5270' }}>—</span>}
                      </td>
                      <td className="px-4 py-3" style={{ color: '#7a93bc', direction: 'ltr', textAlign: 'left', whiteSpace: 'nowrap' }}>
                        {b.email || <span style={{ color: '#3d5270' }}>—</span>}
                      </td>
                      <td
                        className="px-4 py-3 max-w-[200px]"
                        style={{ color: '#7a93bc', fontFamily: 'Cairo', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                        title={b.message}
                      >
                        {b.message || <span style={{ color: '#3d5270' }}>—</span>}
                      </td>
                      <td className="px-4 py-3" style={{ color: '#3d5270', whiteSpace: 'nowrap', fontFamily: 'Cairo' }}>
                        {formatDate(b.createdAt)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="px-2 py-0.5 rounded-full text-[9px] font-bold"
                          style={
                            b.method === 'sms'
                              ? { background: '#10b98118', color: '#10b981', border: '1px solid #10b98130' }
                              : { background: 'rgba(148,163,184,0.07)', color: '#7a93bc', border: '1px solid rgba(148,163,184,0.12)' }
                          }
                        >
                          {b.method === 'sms' ? 'SMS' : 'Logged'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleDelete(b.id, pw)}
                          disabled={deleting === b.id}
                          className="w-6 h-6 rounded-md flex items-center justify-center transition-all"
                          style={{
                            background: 'rgba(239,68,68,0.08)',
                            border: '1px solid rgba(239,68,68,0.18)',
                            color: '#f87171',
                          }}
                          title="حذف"
                        >
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

        <p
          className="mt-6 text-center text-[10px]"
          style={{ color: '#3d5270', fontFamily: 'Cairo' }}
        >
          يتجدد تلقائياً كل 30 ثانية — كلمة المرور الافتراضية: smaw2026
        </p>
      </div>
    </div>
  )
}

