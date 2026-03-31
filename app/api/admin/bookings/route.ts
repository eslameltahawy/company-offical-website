import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'bookings.json')
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'smaw2026'

function readBookings() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return []
  }
}

export async function GET(req: NextRequest) {
  const pw = req.nextUrl.searchParams.get('pw')
  if (pw !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }
  const bookings = readBookings()
  return NextResponse.json({ bookings })
}

export async function DELETE(req: NextRequest) {
  const pw = req.nextUrl.searchParams.get('pw')
  if (pw !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }
  const { id } = await req.json()
  const all = readBookings()
  const filtered = all.filter((b: { id: string }) => b.id !== id)
  fs.writeFileSync(DATA_FILE, JSON.stringify(filtered, null, 2), 'utf-8')
  return NextResponse.json({ success: true })
}
