/*
  STORAGE ABSTRACTION
  ────────────────────
  Priority:
    1. Vercel KV (Redis) — works on Vercel serverless, persists forever
    2. File system (fs)  — works locally for development

  Setup Vercel KV (one-time):
    Vercel Dashboard → Storage → Create Database → KV → Connect to Project
    This auto-adds KV_REST_API_URL + KV_REST_API_TOKEN env vars.
*/

import type { Booking } from './types'

/* ── Detect environment ─────────────────────────────────────────── */

function hasKV(): boolean {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
}

const BOOKINGS_KEY = 'smaw:bookings'

/* ── KV (Vercel / Upstash Redis) ────────────────────────────────── */

async function kvGet(): Promise<Booking[]> {
  const { kv } = await import('@vercel/kv')
  const result = await kv.get<Booking[]>(BOOKINGS_KEY)
  return result ?? []
}

async function kvSet(bookings: Booking[]): Promise<void> {
  const { kv } = await import('@vercel/kv')
  await kv.set(BOOKINGS_KEY, bookings)
}

/* ── File system (local dev) ─────────────────────────────────────── */

function fsGet(): Booking[] {
  try {
    const fs = require('fs') as typeof import('fs')
    const path = require('path') as typeof import('path')
    const file = path.join(process.cwd(), 'data', 'bookings.json')
    return JSON.parse(fs.readFileSync(file, 'utf-8'))
  } catch { return [] }
}

function fsSet(bookings: Booking[]): void {
  try {
    const fs = require('fs') as typeof import('fs')
    const path = require('path') as typeof import('path')
    const file = path.join(process.cwd(), 'data', 'bookings.json')
    fs.writeFileSync(file, JSON.stringify(bookings, null, 2), 'utf-8')
  } catch { /* Vercel read-only — silently fail */ }
}

/* ── Public API ──────────────────────────────────────────────────── */

export async function getBookings(): Promise<Booking[]> {
  if (hasKV()) return kvGet()
  return fsGet()
}

export async function addBooking(booking: Booking): Promise<void> {
  const all = await getBookings()
  all.unshift(booking) // newest first
  if (hasKV()) await kvSet(all)
  else fsSet(all)
}

export async function deleteBooking(id: string): Promise<void> {
  const all = await getBookings()
  const filtered = all.filter((b) => b.id !== id)
  if (hasKV()) await kvSet(filtered)
  else fsSet(filtered)
}

export function isSlotBooked(bookings: Booking[], slotId: string): boolean {
  return bookings.some((b) => b.slotId === slotId)
}

export function storageMode(): 'kv' | 'fs' {
  return hasKV() ? 'kv' : 'fs'
}
