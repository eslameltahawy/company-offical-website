import { NextRequest, NextResponse } from 'next/server'
import { getGoogleAuthUrl, isGoogleCalendarConfigured } from '@/lib/google-calendar'
import { storageMode } from '@/lib/storage'
import nodemailer from 'nodemailer'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'smaw2026'

export async function GET(req: NextRequest) {
  const pw = req.nextUrl.searchParams.get('pw')
  if (pw !== ADMIN_PASSWORD) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const authUrl = getGoogleAuthUrl()

  return NextResponse.json({
    configured:      isGoogleCalendarConfigured(),
    hasClientId:     !!process.env.GOOGLE_CLIENT_ID,
    hasClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
    hasRefreshToken: !!process.env.GOOGLE_REFRESH_TOKEN,
    hasCalendarId:   !!process.env.GOOGLE_CALENDAR_ID,
    hasSlackWebhook: !!process.env.SLACK_WEBHOOK_URL,
    hasSmtp:         !!process.env.SMTP_HOST && !!process.env.SMTP_USER && !!process.env.SMTP_PASS,
    storageMode:     storageMode(),
    hasKV:           !!process.env.KV_REST_API_URL,
    authUrl,
  })
}

/** POST — test Slack webhook or email */
export async function POST(req: NextRequest) {
  const pw = req.nextUrl.searchParams.get('pw')
  if (pw !== ADMIN_PASSWORD) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const action = req.nextUrl.searchParams.get('action') || 'slack'

  /* ── Test Slack ── */
  if (action === 'slack') {
    const webhookUrl = process.env.SLACK_WEBHOOK_URL
    if (!webhookUrl) return NextResponse.json({ ok: false, error: 'SLACK_WEBHOOK_URL not set' })
    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `✅ اختبار ناجح من لوحة أدمن SMAW\n🕐 ${new Date().toLocaleString('ar-SA')}\nSlack متصل وجاهز لاستقبال إشعارات الحجوزات!`,
        }),
      })
      const text = await res.text()
      return NextResponse.json({ ok: res.ok, status: res.status, response: text })
    } catch (err) {
      return NextResponse.json({ ok: false, error: String(err) })
    }
  }

  /* ── Test Email ── */
  if (action === 'email') {
    const { SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_PORT } = process.env
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
      return NextResponse.json({ ok: false, error: 'SMTP غير مضبوط — تأكد من SMTP_HOST و SMTP_USER و SMTP_PASS' })
    }
    const { toEmail } = await req.json().catch(() => ({ toEmail: SMTP_USER }))
    const port = parseInt(SMTP_PORT || '465')
    try {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST, port, secure: port === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
        connectionTimeout: 10_000, socketTimeout: 10_000,
      })
      await transporter.verify()
      const info = await transporter.sendMail({
        from: `"SMAW Software" <${SMTP_USER}>`,
        to: toEmail || SMTP_USER,
        subject: '✅ اختبار إيميل من SMAW Admin',
        html: `<div dir="rtl" style="font-family:Arial;padding:20px;background:#030712;color:#e2e8f8">
          <h2 style="color:#22c55e">✅ إيميل الاختبار وصل بنجاح!</h2>
          <p style="color:#7a93bc">SMTP مضبوط وإيميلات التأكيد ستصل للعملاء تلقائياً.</p>
          <p style="color:#3d5270;font-size:12px">وقت الإرسال: ${new Date().toLocaleString('ar-SA')}</p>
        </div>`,
      })
      return NextResponse.json({ ok: true, messageId: info.messageId, to: toEmail || SMTP_USER })
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      return NextResponse.json({ ok: false, error: msg })
    }
  }

  return NextResponse.json({ ok: false, error: 'unknown action' })
}
