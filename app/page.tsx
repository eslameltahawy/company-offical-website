import Navbar        from '@/components/layout/Navbar'
import Hero          from '@/components/sections/Hero'
import Marquee       from '@/components/Marquee'
import PainPoints    from '@/components/sections/PainPoints'
import SmawHRDeep    from '@/components/sections/SmawHRDeep'
import HowItWorks    from '@/components/sections/HowItWorks'
import SmawSuite     from '@/components/sections/SmawSuite'
import Features      from '@/components/sections/Features'
import Pricing       from '@/components/sections/Pricing'
import Testimonials  from '@/components/sections/Testimonials'
import FAQ           from '@/components/sections/FAQ'
import BookingCTA    from '@/components/sections/BookingCTA'
import FinalCTA      from '@/components/sections/FinalCTA'
import About         from '@/components/sections/About'
import Footer        from '@/components/layout/Footer'
import Chatbot       from '@/components/Chatbot'

export default function Home() {
  return (
    <main className="mesh-bg min-h-screen">
      {/* 01 — Navigation */}
      <Navbar />

      {/* 02 — Hero: الوعد الكبير */}
      <Hero />

      {/* 03 — Marquee: مصداقية التكامل مع المنصات */}
      <Marquee />

      {/* 04 — Pain Points: "نفهم مشكلتك" */}
      <PainPoints />

      {/* 05 — SMAW HR Deep: "هذا هو الحل" — عرض الوحدات الست */}
      <SmawHRDeep />

      {/* 06 — How It Works: "وهو سهل جداً" — 3 خطوات */}
      <HowItWorks />

      {/* 07 — SMAW Suite: "والمستقبل أكبر" — خارطة الطريق */}
      <SmawSuite />

      {/* 08 — Features: "نحن نتقن كل هذا" — عمق التقني */}
      <Features />

      {/* 09 — Pricing: "والسعر معقول" — إزالة حاجز السعر */}
      <Pricing />

      {/* 10 — Testimonials: "عملاؤنا يثقون بنا" — دليل اجتماعي */}
      <Testimonials />

      {/* 11 — FAQ: "لديك أسئلة؟" — إزالة الاعتراضات */}
      <FAQ />

      {/* 12 — About: "من نحن" — بروفايل الشركة الكامل */}
      <About />

      {/* 13 — Booking CTA: "احجز الآن" — التحويل الرئيسي */}
      <BookingCTA />

      {/* 13 — Final CTA: "لا تفوت الفرصة" — إغلاق قوي */}
      <FinalCTA />

      {/* 14 — Footer */}
      <Footer />

      {/* Floating chatbot */}
      <Chatbot />
    </main>
  )
}
