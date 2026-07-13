import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { availableSlots as defaultSlots, formatSlotLabel, type Slot } from '@/data/availableSlots'

const BOOKINGS_FILE = path.join(process.cwd(), 'data', 'bookings.json')
const CUSTOM_FILE   = path.join(process.cwd(), 'data', 'customSlots.json')
const DELETED_FILE  = path.join(process.cwd(), 'data', 'deletedSlots.json')

function readJSON<T>(file: string, fallback: T): T {
  try { return JSON.parse(fs.readFileSync(file, 'utf-8')) } catch { return fallback }
}

function allSlots(): Slot[] {
  const custom  = readJSON<Slot[]>(CUSTOM_FILE, [])
  const deleted = readJSON<string[]>(DELETED_FILE, [])
  const customIds = new Set(custom.map((s) => s.id))
  const base = defaultSlots.filter((s) => !customIds.has(s.id) && !deleted.includes(s.id))
  return [...base, ...custom].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
}

export async function GET() {
  const bookings  = readJSON<{ slotId?: string }[]>(BOOKINGS_FILE, [])
  const bookedIds = new Set(bookings.map((b) => b.slotId).filter(Boolean))

  // Only return future slots (or today's slots)
  const now = new Date()
  const todayStr = now.toISOString().slice(0, 10)

  const slots = allSlots()
    .filter((s) => s.date >= todayStr)
    .map((s) => ({
      ...s,
      label: formatSlotLabel(s),
      booked: bookedIds.has(s.id),
    }))

  return NextResponse.json({ slots })
}
