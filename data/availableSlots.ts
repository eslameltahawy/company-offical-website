/*
  AVAILABLE SLOTS CONFIGURATION
  ──────────────────────────────
  Admin edits this file (or via /admin panel) to control available booking times.
  Each slot: { id, date (YYYY-MM-DD), time (HH:MM 24h), durationMins }
  Booked status is computed at runtime from bookings.json.
*/

export interface Slot {
  id: string
  date: string       // YYYY-MM-DD
  time: string       // HH:MM (24h, Riyadh AST = UTC+3)
  durationMins: number
}

// ── Edit this list to control available booking windows ──────────────────────
export const availableSlots: Slot[] = [
  { id: '2026-07-15-09', date: '2026-07-15', time: '09:00', durationMins: 30 },
  { id: '2026-07-15-11', date: '2026-07-15', time: '11:00', durationMins: 30 },
  { id: '2026-07-15-14', date: '2026-07-15', time: '14:00', durationMins: 30 },
  { id: '2026-07-16-09', date: '2026-07-16', time: '09:00', durationMins: 30 },
  { id: '2026-07-16-11', date: '2026-07-16', time: '11:00', durationMins: 30 },
  { id: '2026-07-17-10', date: '2026-07-17', time: '10:00', durationMins: 30 },
  { id: '2026-07-17-14', date: '2026-07-17', time: '14:00', durationMins: 30 },
  { id: '2026-07-20-09', date: '2026-07-20', time: '09:00', durationMins: 30 },
  { id: '2026-07-20-11', date: '2026-07-20', time: '11:00', durationMins: 30 },
  { id: '2026-07-21-10', date: '2026-07-21', time: '10:00', durationMins: 30 },
  { id: '2026-07-21-14', date: '2026-07-21', time: '14:00', durationMins: 30 },
  { id: '2026-07-22-09', date: '2026-07-22', time: '09:00', durationMins: 30 },
]

/** Helpers ───────────────────────────────────────────────────────────────── */

/** Arabic day-of-week labels */
const AR_DAYS = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']

/** Arabic month labels */
const AR_MONTHS = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر']

export function formatSlotLabel(slot: Slot): string {
  const d = new Date(`${slot.date}T${slot.time}:00+03:00`)
  const dayName = AR_DAYS[d.getDay()]
  const dayNum = d.getDate()
  const month = AR_MONTHS[d.getMonth()]
  const [h, m] = slot.time.split(':').map(Number)
  const period = h < 12 ? 'ص' : 'م'
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h
  const timeStr = `${h12}:${m.toString().padStart(2, '0')} ${period}`
  return `${dayName} ${dayNum} ${month} — ${timeStr}`
}

/** Build ISO start/end strings (UTC) for Google Calendar */
export function slotToISO(slot: Slot): { start: string; end: string } {
  const startMs = new Date(`${slot.date}T${slot.time}:00+03:00`).getTime()
  const endMs = startMs + slot.durationMins * 60_000
  return {
    start: new Date(startMs).toISOString().replace(/[-:]/g, '').replace('.000', ''),
    end:   new Date(endMs).toISOString().replace(/[-:]/g, '').replace('.000', ''),
  }
}
