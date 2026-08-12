/*
  SLOT STORAGE
  ────────────
  Custom + deleted slot IDs persist via Vercel KV (or local JSON files).
*/

import type { Slot } from '@/data/availableSlots'

function hasKV(): boolean {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
}

const CUSTOM_KEY  = 'smaw:customSlots'
const DELETED_KEY = 'smaw:deletedSlots'

async function kvGet<T>(key: string): Promise<T | null> {
  const { kv } = await import('@vercel/kv')
  return kv.get<T>(key)
}

async function kvSet<T>(key: string, value: T): Promise<void> {
  const { kv } = await import('@vercel/kv')
  await kv.set(key, value)
}

function fsRead<T>(fileName: string, fallback: T): T {
  try {
    const fs = require('fs') as typeof import('fs')
    const path = require('path') as typeof import('path')
    return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data', fileName), 'utf-8'))
  } catch {
    return fallback
  }
}

function fsWrite(fileName: string, data: unknown): void {
  try {
    const fs = require('fs') as typeof import('fs')
    const path = require('path') as typeof import('path')
    fs.writeFileSync(path.join(process.cwd(), 'data', fileName), JSON.stringify(data, null, 2), 'utf-8')
  } catch { /* Vercel read-only */ }
}

export async function getCustomSlots(): Promise<Slot[]> {
  if (hasKV()) return (await kvGet<Slot[]>(CUSTOM_KEY)) ?? []
  return fsRead<Slot[]>('customSlots.json', [])
}

export async function setCustomSlots(slots: Slot[]): Promise<void> {
  if (hasKV()) await kvSet(CUSTOM_KEY, slots)
  else fsWrite('customSlots.json', slots)
}

export async function getDeletedSlotIds(): Promise<string[]> {
  if (hasKV()) return (await kvGet<string[]>(DELETED_KEY)) ?? []
  return fsRead<string[]>('deletedSlots.json', [])
}

export async function setDeletedSlotIds(ids: string[]): Promise<void> {
  if (hasKV()) await kvSet(DELETED_KEY, ids)
  else fsWrite('deletedSlots.json', ids)
}

/** Work days: Sunday(0) … Thursday(4). Times: 09:00–17:30 every 30 mins (last ends 18:00). */
export function generateDefaultMonthSlots(year: number, month: number): Slot[] {
  const slots: Slot[] = []
  const daysInMonth = new Date(year, month, 0).getDate() // month is 1-12
  const todayStr = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Riyadh' })

  for (let day = 1; day <= daysInMonth; day++) {
    const date = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    if (date < todayStr) continue

    const weekday = new Date(`${date}T12:00:00+03:00`).getDay()
    if (weekday === 5 || weekday === 6) continue // Friday / Saturday

    for (let mins = 9 * 60; mins <= 17 * 60 + 30; mins += 30) {
      const h = Math.floor(mins / 60)
      const m = mins % 60
      const time = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
      const id = `${date}-${time.replace(':', '')}`
      slots.push({ id, date, time, durationMins: 30 })
    }
  }

  return slots
}
