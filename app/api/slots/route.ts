import { NextResponse } from 'next/server'
import { availableSlots as defaultSlots, formatSlotLabel, type Slot } from '@/data/availableSlots'
import { getBookings } from '@/lib/storage'
import { getCustomSlots, getDeletedSlotIds } from '@/lib/slots-store'

async function allSlots(): Promise<Slot[]> {
  const custom = await getCustomSlots()
  const deleted = await getDeletedSlotIds()
  const customIds = new Set(custom.map((s) => s.id))
  const base = defaultSlots.filter((s) => !customIds.has(s.id) && !deleted.includes(s.id))
  return [...base, ...custom].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
}

export async function GET() {
  const bookings = await getBookings()
  const bookedIds = new Set(bookings.map((b) => b.slotId).filter(Boolean))
  const todayStr = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Riyadh' })

  const slots = (await allSlots())
    .filter((s) => s.date >= todayStr)
    .map((s) => ({
      ...s,
      label: formatSlotLabel(s),
      booked: bookedIds.has(s.id),
    }))

  return NextResponse.json({ slots })
}
