import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { availableSlots as defaultSlots, formatSlotLabel, type Slot } from '@/data/availableSlots'
import { getBookings } from '@/lib/storage'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'smaw2026'
const CUSTOM_SLOTS_FILE = path.join(process.cwd(), 'data', 'customSlots.json')

function readCustomSlots(): Slot[] {
  try { return JSON.parse(fs.readFileSync(CUSTOM_SLOTS_FILE, 'utf-8')) } catch { return [] }
}

function writeCustomSlots(slots: Slot[]) {
  try { fs.writeFileSync(CUSTOM_SLOTS_FILE, JSON.stringify(slots, null, 2), 'utf-8') } catch { /* Vercel */ }
}

/** Merge default + custom slots, deduplicating by id */
function allSlots(): Slot[] {
  const custom = readCustomSlots()
  const customIds = new Set(custom.map((s) => s.id))
  const base = defaultSlots.filter((s) => !customIds.has(s.id))
  return [...base, ...custom].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
}

/** GET /api/admin/slots?pw=... */
export async function GET(req: NextRequest) {
  const pw = req.nextUrl.searchParams.get('pw')
  if (pw !== ADMIN_PASSWORD) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const bookings = await getBookings()
  const bookedIds = new Set(bookings.map((b) => b.slotId).filter(Boolean))

  const slots = allSlots().map((s) => ({
    ...s,
    label: formatSlotLabel(s),
    booked: bookedIds.has(s.id),
    isCustom: readCustomSlots().some((c) => c.id === s.id),
  }))

  return NextResponse.json({ slots })
}

/** POST /api/admin/slots — add a new slot */
export async function POST(req: NextRequest) {
  const pw = req.nextUrl.searchParams.get('pw')
  if (pw !== ADMIN_PASSWORD) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const { date, time, durationMins = 30 } = await req.json() as { date: string; time: string; durationMins?: number }
  if (!date || !time) return NextResponse.json({ error: 'missing fields' }, { status: 400 })

  const id = `${date}-${time.replace(':', '')}`
  const existing = allSlots()
  if (existing.some((s) => s.id === id)) {
    return NextResponse.json({ error: 'slot_exists' }, { status: 409 })
  }

  const newSlot: Slot = { id, date, time, durationMins }
  const custom = readCustomSlots()
  custom.push(newSlot)
  writeCustomSlots(custom)

  return NextResponse.json({ success: true, slot: { ...newSlot, label: formatSlotLabel(newSlot) } })
}

/** DELETE /api/admin/slots — remove a slot by id */
export async function DELETE(req: NextRequest) {
  const pw = req.nextUrl.searchParams.get('pw')
  if (pw !== ADMIN_PASSWORD) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const { id } = await req.json() as { id: string }

  // Remove from custom slots
  const custom = readCustomSlots()
  writeCustomSlots(custom.filter((s) => s.id !== id))

  // If it's a default slot, add it to a "deleted" list
  const DELETED_FILE = path.join(process.cwd(), 'data', 'deletedSlots.json')
  let deleted: string[] = []
  try { deleted = JSON.parse(fs.readFileSync(DELETED_FILE, 'utf-8')) } catch { /* ok */ }
  if (!deleted.includes(id)) deleted.push(id)
  try { fs.writeFileSync(DELETED_FILE, JSON.stringify(deleted, null, 2), 'utf-8') } catch { /* Vercel */ }

  return NextResponse.json({ success: true })
}
