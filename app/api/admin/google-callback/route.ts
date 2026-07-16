import { NextRequest, NextResponse } from 'next/server'
import { exchangeCodeForTokens } from '@/lib/google-calendar'

export async function GET(req: NextRequest) {
  const code  = req.nextUrl.searchParams.get('code')
  const error = req.nextUrl.searchParams.get('error')

  if (error || !code) {
    const msg = error || 'no_code'
    return new NextResponse(errorPage(msg), { headers: { 'Content-Type': 'text/html; charset=utf-8' } })
  }

  const tokens = await exchangeCodeForTokens(code)

  if (!tokens?.refresh_token) {
    return new NextResponse(errorPage('no_refresh_token — جرّب اضغط "ربط Google Calendar" مرة ثانية'), {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  }

  return new NextResponse(successPage(tokens.refresh_token), {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}

function successPage(rt: string) {
  return `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>تم ربط Google Calendar</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #030712; font-family: 'Segoe UI', Arial, sans-serif; color: #e2e8f8; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }
    .card { background: #0d1525; border: 1px solid rgba(148,163,184,0.1); border-radius: 16px; padding: 40px; max-width: 560px; width: 100%; }
    h1 { color: #22c55e; font-size: 22px; margin-bottom: 8px; }
    p { color: #7a93bc; font-size: 14px; line-height: 1.6; margin-bottom: 20px; }
    .token-box { background: #030712; border: 1px solid rgba(37,99,235,0.3); border-radius: 10px; padding: 16px; font-family: monospace; font-size: 11px; color: #60a5fa; word-break: break-all; margin-bottom: 16px; direction: ltr; text-align: left; }
    .copy-btn { background: #2563eb; color: #fff; border: none; padding: 12px 24px; border-radius: 10px; font-size: 14px; cursor: pointer; font-weight: bold; width: 100%; margin-bottom: 12px; }
    .copy-btn:hover { background: #1d4ed8; }
    .steps { background: rgba(251,191,36,0.06); border: 1px solid rgba(251,191,36,0.2); border-radius: 10px; padding: 16px; }
    .steps h3 { color: #fbbf24; font-size: 13px; margin-bottom: 10px; }
    .steps ol { padding-right: 20px; }
    .steps li { color: #d97706; font-size: 12px; line-height: 2; }
    .steps code { background: rgba(37,99,235,0.2); color: #60a5fa; padding: 1px 6px; border-radius: 4px; font-size: 11px; }
    .done-btn { display: block; text-align: center; background: rgba(37,99,235,0.1); border: 1px solid rgba(37,99,235,0.3); color: #60a5fa; padding: 10px; border-radius: 10px; text-decoration: none; font-size: 13px; margin-top: 16px; }
  </style>
</head>
<body>
  <div class="card">
    <h1>✅ تم الحصول على Refresh Token!</h1>
    <p>انسخ هذا التوكن وأضفه في Vercel كـ Environment Variable باسم <code style="color:#60a5fa;background:rgba(37,99,235,0.2);padding:2px 6px;border-radius:4px">GOOGLE_REFRESH_TOKEN</code></p>

    <div class="token-box" id="token">${rt}</div>

    <button class="copy-btn" onclick="copyToken()">📋 انسخ التوكن</button>

    <div class="steps">
      <h3>⚠️ الخطوات المطلوبة الآن:</h3>
      <ol>
        <li>اضغط "انسخ التوكن" أعلاه</li>
        <li>افتح <strong>Vercel → Settings → Environment Variables</strong></li>
        <li>اضغط <strong>Add</strong> → Name: <code>GOOGLE_REFRESH_TOKEN</code></li>
        <li>Value: الصق التوكن المنسوخ → اضغط <strong>Save</strong></li>
        <li>اضغط <strong>Redeploy</strong> على آخر deployment</li>
        <li>ارجع للأدمن — Google Calendar ✅ جاهز</li>
      </ol>
    </div>

    <a href="/admin" class="done-btn">← ارجع للوحة التحكم</a>
  </div>

  <script>
    function copyToken() {
      const token = document.getElementById('token').innerText;
      navigator.clipboard.writeText(token).then(() => {
        const btn = document.querySelector('.copy-btn');
        btn.textContent = '✅ تم النسخ!';
        btn.style.background = '#16a34a';
        setTimeout(() => { btn.textContent = '📋 انسخ التوكن'; btn.style.background = '#2563eb'; }, 2000);
      });
    }
  </script>
</body>
</html>`
}

function errorPage(msg: string) {
  return `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head><meta charset="UTF-8"><title>خطأ</title>
<style>body{background:#030712;color:#e2e8f8;font-family:Arial,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;} .card{background:#0d1525;border:1px solid rgba(239,68,68,0.2);border-radius:16px;padding:40px;max-width:480px;text-align:center;} h1{color:#f87171;margin-bottom:12px;} p{color:#7a93bc;font-size:14px;margin-bottom:20px;} a{color:#60a5fa;}</style>
</head>
<body><div class="card">
  <h1>❌ حدث خطأ</h1>
  <p>${msg}</p>
  <a href="/admin">← ارجع للأدمن وحاول مرة ثانية</a>
</div></body></html>`
}
