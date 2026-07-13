import Navbar         from '@/components/layout/Navbar'
import Hero           from '@/components/sections/Hero'
import Marquee        from '@/components/Marquee'
import ProductsSection from '@/components/sections/ProductsSection'
import WhySMAW        from '@/components/sections/WhySMAW'
import Testimonials   from '@/components/sections/Testimonials'
import FAQ            from '@/components/sections/FAQ'
import About          from '@/components/sections/About'
import BookingCTA     from '@/components/sections/BookingCTA'
import FinalCTA       from '@/components/sections/FinalCTA'
import Footer         from '@/components/layout/Footer'
import Chatbot        from '@/components/Chatbot'

export default function Home() {
  return (
    <main className="mesh-bg min-h-screen">
      <Navbar />
      <Hero />
      <Marquee />
      <ProductsSection />
      <WhySMAW />
      <Testimonials />
      <FAQ />
      <About />
      <BookingCTA />
      <FinalCTA />
      <Footer />
      <Chatbot />
    </main>
  )
}
