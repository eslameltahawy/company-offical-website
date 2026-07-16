/*
  NOTIFICATIONS
  ──────────────
  1. Slack  — via Incoming Webhook (reliable, direct)
  2. Email  — client confirmation via Nodemailer SMTP
  3. SMS    — Taqnyat (optional)

  Required env vars:
    SLACK_WEBHOOK_URL   Slack app incoming webhook URL
                        Create at: https://api.slack.com/apps → Incoming Webhooks
    SMTP_HOST           smtp.gmail.com
    SMTP_PORT           465
    SMTP_USER           your Gmail address
    SMTP_PASS           Gmail App Password (NOT your normal password)
                        Create at: myaccount.google.com → Security → App passwords
*/

import nodemailer from 'nodemailer'
import type { Booking } from './types'

/* ── Slack Webhook ──────────────────────────────────────────────── */

export async function sendSlackNotification(
  booking: Booking,
  meetLink?: string
): Promise<boolean> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL
  if (!webhookUrl) {
    console.warn('[Slack] SLACK_WEBHOOK_URL not set')
    return false
  }

  const slotText = booking.slotLabel || 'لم يُحدَّد موعد'

  const lines = [
    `📅 *حجز اجتماع جديد — SMAW*`,
    ``,
    `👤 *الاسم:* ${booking.name}`,
    `🏢 *الشركة:* ${booking.company}`,
    `📞 *الجوال:* ${booking.phone || '—'}`,
    `📧 *الإيميل:* ${booking.email || '—'}`,
    `🗓️ *الموعد:* ${slotText}`,
    ...(meetLink ? [`🎥 *Google Meet:* ${meetLink}`] : []),
    ...(booking.message ? [`💬 *الرسالة:* ${booking.message}`] : []),
    ``,
    `_ID: ${booking.id}_`,
  ]

  const payload = { text: lines.join('\n') }

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const ok = res.ok
    if (!ok) console.error('[Slack] webhook error:', res.status, await res.text())
    return ok
  } catch (err) {
    console.error('[Slack] webhook exception:', err)
    return false
  }
}

/* ── SMTP transporter ───────────────────────────────────────────── */

function getTransporter() {
  const { SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_PORT } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null
  const port = parseInt(SMTP_PORT || '465')
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    connectionTimeout: 10_000,
    socketTimeout: 10_000,
  })
}

/* ── Client confirmation email ──────────────────────────────────── */

export async function sendClientConfirmation(
  booking: Booking,
  meetLink?: string,
  calendarLink?: string
): Promise<boolean> {
  if (!booking.email) return false
  const transporter = getTransporter()
  if (!transporter) {
    console.warn('[Email] SMTP not configured')
    return false
  }

  const slotText = booking.slotLabel || 'سيُحدَّد قريباً'
  const meetSection = meetLink
    ? `<div style="margin-bottom:20px;padding:16px;background:#1e3a5f;border-radius:10px;text-align:center">
         <p style="margin:0 0 6px;font-size:12px;color:#7a93bc">🎥 رابط Google Meet</p>
         <a href="${meetLink}" style="color:#60a5fa;font-weight:bold;font-size:14px;word-break:break-all">${meetLink}</a>
       </div>`
    : ''

  const calBtn = calendarLink
    ? `<a href="${calendarLink}" style="display:inline-block;background:#2563eb;color:#fff;padding:12px 24px;border-radius:10px;text-decoration:none;font-weight:bold;font-size:14px;margin-bottom:24px">
         📆 أضف للتقويم
       </a>`
    : ''

  const html = `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#030712;font-family:'Segoe UI',Arial,sans-serif">
<div style="max-width:560px;margin:32px auto;padding:32px 24px;background:#0d1525;border-radius:16px;border:1px solid rgba(148,163,184,0.1)">
  <img src="https://smaww.com/smaw.png" alt="SMAW" style="height:32px;margin-bottom:24px" />
  <h2 style="color:#e2e8f8;font-size:22px;margin:0 0 8px">✅ تم تأكيد موعدك!</h2>
  <p style="color:#7a93bc;font-size:14px;margin:0 0 24px">مرحباً ${booking.name}، تم تأكيد حجز الاجتماع مع فريق SMAW.</p>

  <div style="background:rgba(37,99,235,0.1);border:1px solid rgba(37,99,235,0.25);border-radius:12px;padding:20px;margin-bottom:20px">
    <p style="margin:0 0 6px;font-size:12px;color:#7a93bc">📅 موعد الاجتماع</p>
    <p style="margin:0;font-size:18px;font-weight:bold;color:#60a5fa">${slotText}</p>
  </div>

  ${meetSection}

  <p style="color:#7a93bc;font-size:13px;margin:0 0 20px">
    ${meetLink
      ? 'انضم للاجتماع عبر الرابط أعلاه، أو أضفه لتقويمك:'
      : 'أضف الموعد لتقويمك حتى لا تنساه:'}
  </p>

  ${calBtn}

  <hr style="border:none;border-top:1px solid rgba(148,163,184,0.08);margin:24px 0"/>
  <p style="font-size:11px;color:#3d5270;margin:0">
    SMAW Software — <a href="https://smaww.com" style="color:#2563eb">smaww.com</a><br/>
    هذا البريد أُرسل تلقائياً. للتواصل: <a href="mailto:smaw@smaww.com" style="color:#2563eb">smaw@smaww.com</a>
  </p>
</div>
</body>
</html>`

  try {
    const info = await transporter.sendMail({
      from: `"SMAW Software" <${process.env.SMTP_USER}>`,
      to: booking.email,
      subject: `✅ تأكيد الاجتماع — ${slotText}`,
      html,
    })
    console.log('[Email] sent:', info.messageId)
    return true
  } catch (err) {
    console.error('[Email] send error:', err)
    return false
  }
}

/* ── Admin notification email (backup) ─────────────────────────── */

export async function sendAdminEmail(booking: Booking, meetLink?: string): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER
  if (!adminEmail) return false
  const transporter = getTransporter()
  if (!transporter) return false

  const slotText = booking.slotLabel || '—'

  try {
    await transporter.sendMail({
      from: `"SMAW Bookings" <${process.env.SMTP_USER}>`,
      to: adminEmail,
      subject: `📅 حجز جديد: ${booking.name} — ${booking.company}`,
      html: `<div dir="rtl" style="font-family:Arial;padding:20px">
        <h2>حجز اجتماع جديد</h2>
        <table>
          <tr><td><b>الاسم:</b></td><td>${booking.name}</td></tr>
          <tr><td><b>الشركة:</b></td><td>${booking.company}</td></tr>
          <tr><td><b>الجوال:</b></td><td>${booking.phone || '—'}</td></tr>
          <tr><td><b>الإيميل:</b></td><td>${booking.email || '—'}</td></tr>
          <tr><td><b>الموعد:</b></td><td>${slotText}</td></tr>
          ${meetLink ? `<tr><td><b>Google Meet:</b></td><td><a href="${meetLink}">${meetLink}</a></td></tr>` : ''}
          <tr><td><b>الرسالة:</b></td><td>${booking.message || '—'}</td></tr>
        </table>
      </div>`,
    })
    return true
  } catch (err) {
    console.error('[Admin Email] error:', err)
    return false
  }
}

/* ── Taqnyat SMS (optional) ─────────────────────────────────────── */

export async function sendSMS(phone: string, name: string, slotLabel: string): Promise<boolean> {
  const token = process.env.TAQNYAT_TOKEN
  if (!token || !phone) return false
  const normalized = phone.replace(/^0/, '+966').replace(/[\s-]/g, '')
  try {
    const res = await fetch('https://api.taqnyat.sa/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        recipients: [normalized],
        body: `مرحباً ${name}، تم تأكيد موعدك مع SMAW: ${slotLabel}. رابط Google Meet سيصلك قبل الموعد.`,
        sender: process.env.TAQNYAT_SENDER || 'SMAW',
      }),
    })
    const data = await res.json()
    return res.ok && data?.status === 'accepted'
  } catch { return false }
}
