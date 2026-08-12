import { NextRequest, NextResponse } from 'next/server'
import { availableSlots as defaultSlots, formatSlotLabel, type Slot } from '@/data/availableSlots'
import { getBookings } from '@/lib/storage'
import {
  getCustomSlots,
  setCustomSlots,
  getDeletedSlotIds,
  setDeletedSlotIds,
  generateDefaultMonthSlots,
} from '@/lib/slots-store'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'smaw2026'

async function allSlots(): Promise<Slot[]> {
  const custom = await getCustomSlots()
  const deleted = await getDeletedSlotIds()
  const customIds = new Set(custom.map((s) => s.id))
  const base = defaultSlots.filter((s) => !customIds.has(s.id) && !deleted.includes(s.id))
  return [...base, ...custom].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
}

/** GET /api/admin/slots?pw=... */
export async function GET(req: NextRequest) {
  const pw = req.nextUrl.searchParams.get('pw')
  if (pw !== ADMIN_PASSWORD) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const [bookings, custom, slots] = await Promise.all([
    getBookings(),
    getCustomSlots(),
    allSlots(),
  ])
  const bookedIds = new Set(bookings.map((b) => b.slotId).filter(Boolean))
  const customIds = new Set(custom.map((c) => c.id))

  return NextResponse.json({
    slots: slots.map((s) => ({
      ...s,
      label: formatSlotLabel(s),
      booked: bookedIds.has(s.id),
      isCustom: customIds.has(s.id),
    })),
  })
}

/**
 * POST /api/admin/slots
 * - { date, time, durationMins } → add one slot (manual)
 * - { action: 'generateMonth', year, month } → open default month schedule
 */
export async function POST(req: NextRequest) {
  const pw = req.nextUrl.searchParams.get('pw')
  if (pw !== ADMIN_PASSWORD) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const body = await req.json()

  /* ── Generate full month defaults ───────────────────────────── */
  if (body.action === 'generateMonth') {
    const year  = Number(body.year)
    const month = Number(body.month) // 1–12
    if (!year || !month || month < 1 || month > 12) {
      return NextResponse.json({ error: 'invalid_month' }, { status: 400 })
    }

    const generated = generateDefaultMonthSlots(year, month)
    const custom = await getCustomSlots()
    const deleted = await getDeletedSlotIds()
    const existing = await allSlots()
    const existingIds = new Set(existing.map((s) => s.id))

    // Un-delete any generated ids that were previously deleted
    const generatedIds = new Set(generated.map((s) => s.id))
    const nextDeleted = deleted.filter((id) => !generatedIds.has(id))
    await setDeletedSlotIds(nextDeleted)

    let added = 0
    const nextCustom = [...custom]
    for (const slot of generated) {
      if (existingIds.has(slot.id)) continue
      if (nextCustom.some((c) => c.id === slot.id)) continue
      nextCustom.push(slot)
      existingIds.add(slot.id)
      added++
    }
    await setCustomSlots(nextCustom)

    return NextResponse.json({
      success: true,
      added,
      totalGenerated: generated.length,
      month,
      year,
    })
  }

  /* ── Add single slot ────────────────────────────────────────── */
  const { date, time, durationMins = 30 } = body as { date: string; time: string; durationMins?: number }
  if (!date || !time) return NextResponse.json({ error: 'missing fields' }, { status: 400 })

  const id = `${date}-${time.replace(':', '')}`
  const existing = await allSlots()
  if (existing.some((s) => s.id === id)) {
    return NextResponse.json({ error: 'slot_exists' }, { status: 409 })
  }

  // If it was deleted before, remove from deleted list
  const deleted = await getDeletedSlotIds()
  if (deleted.includes(id)) {
    await setDeletedSlotIds(deleted.filter((d) => d !== id))
  }

  const newSlot: Slot = { id, date, time, durationMins }
  const custom = await getCustomSlots()
  custom.push(newSlot)
  await setCustomSlots(custom)

  return NextResponse.json({ success: true, slot: { ...newSlot, label: formatSlotLabel(newSlot) } })
}

/** DELETE /api/admin/slots — remove a slot by id */
export async function DELETE(req: NextRequest) {
  const pw = req.nextUrl.searchParams.get('pw')
  if (pw !== ADMIN_PASSWORD) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const { id } = await req.json() as { id: string }

  const custom = await getCustomSlots()
  await setCustomSlots(custom.filter((s) => s.id !== id))

  const deleted = await getDeletedSlotIds()
  if (!deleted.includes(id)) {
    deleted.push(id)
    await setDeletedSlotIds(deleted)
  }

  return NextResponse.json({ success: true })
}
