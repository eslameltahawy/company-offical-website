'use client'


const footerLinks = {
  products: [
    { label: 'SMAW HR', href: '#products' },
    { label: 'SMAW Connect', href: '#products' },
    { label: 'SMAW Theme', href: '#products' },
    { label: 'SMAW Lipr', href: '#products' },
    { label: 'SMAW Meet', href: '#products' },
    { label: 'SMAW Finance', href: '#products' },
    { label: 'SMAW Task', href: '#products' },
    { label: 'SMAW Archive', href: '#products' },
  ],
  company: [
    { label: 'من نحن', href: '#about' },
    { label: 'لماذا سماو', href: '#why' },
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
            <div className="mb-4">
              <img src="/smaw.png" alt="SMAW" style={{ height: 28, width: 'auto' }} />
            </div>
            <p className="text-sm text-[#7a93bc] leading-relaxed max-w-[240px]" style={{ fontFamily: 'Cairo' }}>
              بيت منتجات برمجية سعودي — متخصصون في بناء أنظمة إدارة المؤسسات للشركات السعودية.
            </p>
            <div className="flex items-center gap-1 mt-4">
              <span className="text-xs text-[#3d5270] flex items-center gap-1.5" style={{ fontFamily: 'Cairo' }}>
                <i className="fas fa-flag text-[9px]" /> صُنع في المملكة العربية السعودية
              </span>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[2px] text-[#3d5270] font-bold mb-5" style={{ fontFamily: 'Cairo' }}>
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
            <h4 className="text-[10px] uppercase tracking-[2px] text-[#3d5270] font-bold mb-5" style={{ fontFamily: 'Cairo' }}>
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
            <h4 className="text-[10px] uppercase tracking-[2px] text-[#3d5270] font-bold mb-5" style={{ fontFamily: 'Cairo' }}>
              ابقَ على اطلاع
            </h4>
            <p className="text-xs text-[#7a93bc] mb-4 leading-relaxed" style={{ fontFamily: 'Cairo' }}>
              كن أول من يعلم بإطلاق منتجاتنا الجديدة والتحديثات.
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

