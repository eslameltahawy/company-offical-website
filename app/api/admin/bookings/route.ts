import { NextRequest, NextResponse } from 'next/server'
import { getBookings, deleteBooking, storageMode } from '@/lib/storage'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'smaw2026'

export async function GET(req: NextRequest) {
  const pw = req.nextUrl.searchParams.get('pw')
  if (pw !== ADMIN_PASSWORD) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const bookings = await getBookings()
  return NextResponse.json({ bookings, storageMode: storageMode() })
}

export async function DELETE(req: NextRequest) {
  const pw = req.nextUrl.searchParams.get('pw')
  if (pw !== ADMIN_PASSWORD) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const { id } = await req.json() as { id: string }
  await deleteBooking(id)
  return NextResponse.json({ success: true })
}
