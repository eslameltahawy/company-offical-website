import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SMAW | Software Product House — Saudi Arabia',
  description: 'SMAW — بيت منتجات برمجية سعودي متخصص في حلول إدارة الموارد البشرية والتحول الرقمي المؤسسي.',
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
      <body className="bg-[#030712] text-[#e2e8f8] antialiased">{children}</body>
    </html>
  )
}
