'use client'

function SmawLogo({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="17" cy="17" rx="15.5" ry="6.5" stroke="#2563eb" strokeWidth="1.1" opacity="0.35" transform="rotate(-30 17 17)" />
      <ellipse cx="17" cy="17" rx="11" ry="4.5" stroke="#3b82f6" strokeWidth="1" opacity="0.55" transform="rotate(20 17 17)" />
      <circle cx="17" cy="17" r="8" fill="rgba(37,99,235,0.18)" />
      <circle cx="17" cy="17" r="6" fill="#1d4ed8" />
      <circle cx="17" cy="17" r="6" fill="url(#planetGradF)" />
      <text x="17" y="21.5" textAnchor="middle" fill="white" fontSize="9" fontWeight="800" fontFamily="Inter, sans-serif">S</text>
      <circle cx="30" cy="11.5" r="2.2" fill="#60a5fa" opacity="0.9" />
      <circle cx="30" cy="11.5" r="1" fill="white" opacity="0.6" />
      <circle cx="5" cy="22" r="1.4" fill="#818cf8" opacity="0.7" />
      <defs>
        <radialGradient id="planetGradF" cx="38%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  )
}

const footerLinks = {
  products: [
    { label: 'Ocean67 eCommerce', href: '#' },
    { label: 'SMAW HR', href: '#suite' },
    { label: 'SMAW Suite', href: '#suite' },
  ],
  company: [
    { label: 'من نحن', href: '#about' },
    { label: 'بروفايل الشركة', href: '/company-profile.pdf', download: 'SMAW-Company-Profile.pdf' },
    { label: 'تواصل معنا', href: '#booking' },
  ],
  legal: [
    { label: 'سياسة الخصوصية', href: '#' },
    { label: 'شروط الاستخدام', href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer
      className="border-t border-[rgba(148,163,184,0.07)] pt-16 pb-8"
      style={{ background: 'rgba(10,16,32,0.8)' }}
    >
      <div className="container-smaw">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <SmawLogo size={30} />
              <span className="font-bold text-[#e2e8f8]" style={{ fontFamily: 'Inter', letterSpacing: '-0.02em' }}>
                SMAW
              </span>
            </div>
            <p className="text-sm text-[#7a93bc] leading-relaxed max-w-[240px]" style={{ fontFamily: 'Cairo' }}>
              بيت منتجات برمجية سعودي 100% — نبني برامج تُشغّل الشركات وتصمد تحت أقصى ضغط.
            </p>
            <div className="flex items-center gap-1 mt-4">
              <span className="text-xs text-[#3d5270] flex items-center gap-1.5" style={{ fontFamily: 'Cairo' }}>
                <i className="fas fa-flag text-[9px]" /> صُنع في المملكة العربية السعودية
              </span>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[2px] text-[#3d5270] font-bold mb-5" style={{ fontFamily: 'Inter' }}>
              المنتجات
            </h4>
            <ul className="space-y-3">
              {footerLinks.products.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-[#7a93bc] hover:text-[#e2e8f8] transition-colors duration-200"
                    style={{ fontFamily: 'Cairo' }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[2px] text-[#3d5270] font-bold mb-5" style={{ fontFamily: 'Inter' }}>
              الشركة
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    download={'download' in l ? (l as any).download : undefined}
                    className="text-sm text-[#7a93bc] hover:text-[#e2e8f8] transition-colors duration-200 flex items-center gap-1.5"
                    style={{ fontFamily: 'Cairo' }}
                  >
                    {'download' in l && <i className="fas fa-download text-[9px] text-[#2563eb]" />}
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[2px] text-[#3d5270] font-bold mb-5" style={{ fontFamily: 'Inter' }}>
              ابقَ على اطلاع
            </h4>
            <p className="text-xs text-[#7a93bc] mb-4 leading-relaxed" style={{ fontFamily: 'Cairo' }}>
              أخبار المنتج والإصدارات الجديدة — مباشرة إلى بريدك.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-2"
            >
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="flex-1 bg-white/5 border border-[rgba(148,163,184,0.1)] rounded-lg px-3 py-2 text-xs text-[#e2e8f8] placeholder:text-[#3d5270] focus:outline-none focus:border-[#2563eb]/50 transition-colors"
                style={{ fontFamily: 'Cairo' }}
              />
              <button
                type="submit"
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
                style={{ fontFamily: 'Cairo' }}
              >
                اشترك
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[rgba(148,163,184,0.06)]">
          <p className="text-xs text-[#3d5270]" style={{ fontFamily: 'Cairo' }}>
            &copy; 2026 SMAW Software. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-4">
            {footerLinks.legal.map((l) => (
              <a key={l.label} href={l.href} className="text-xs text-[#3d5270] hover:text-[#7a93bc] transition-colors" style={{ fontFamily: 'Cairo' }}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
