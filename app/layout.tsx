import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SMAW | بيت المنتجات البرمجية السعودي — أنظمة إدارة الشركات',
  description: 'سماو — بيت منتجات برمجية سعودي متخصص في أنظمة إدارة الشركات. 8 منتجات متكاملة: HR، Connect، Theme، Lipr، Meet، Finance، Task، Archive. مصممة أصلاً للسوق السعودي.',
  keywords: 'SMAW, سماو, برمجيات سعودية, إدارة الشركات, نظام HR, SMAW HR, SMAW Connect, SMAW Theme, SMAW Lipr, Software Product House, Saudi Arabia',
  openGraph: {
    title: 'SMAW | بيت المنتجات البرمجية السعودي',
    description: 'ثمانية منتجات برمجية متكاملة لإدارة شركتك — مصممة أصلاً للسوق السعودي.',
    locale: 'ar_SA',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>
      <body className="bg-[#030712] text-[#e2e8f8] antialiased">
        {children}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://tscore-indol.vercel.app/widget.js" data-token="ts_verify_4919d57dfeb3893e27e0812256e8f4e59bc8" async></script>
      </body>
    </html>
  )
}
