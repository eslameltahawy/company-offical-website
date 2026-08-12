'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { products, type Product } from '@/data/products'
import ProductModal from '@/components/ProductModal'
import MobileCarousel, { MobileCarouselItem } from '@/components/mobile/MobileCarousel'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const liveProducts = products.filter((p) => p.status === 'live')
const devProducts = products.filter((p) => p.status === 'development')

function ProductCard({
  product,
  index,
  onClick,
  mobile,
}: {
  product: Product
  index: number
  onClick: () => void
  mobile?: boolean
}) {
  const isLive = product.status === 'live'

  return (
    <motion.button
      initial={mobile ? false : { opacity: 0, y: 28 }}
      whileInView={mobile ? undefined : { opacity: 1, y: 0 }}
      viewport={mobile ? undefined : { once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }}
      onClick={onClick}
      className={`group relative w-full text-right rounded-2xl p-5 transition-all duration-300 ${mobile ? 'h-full' : 'hover:-translate-y-1'}`}
      style={{
        background: isLive ? 'rgba(13,21,37,0.95)' : 'rgba(10,16,32,0.85)',
        border: isLive
          ? '1px solid rgba(148,163,184,0.12)'
          : '1px solid rgba(148,163,184,0.07)',
        opacity: isLive ? 1 : 0.85,
        boxShadow: mobile ? '0 12px 40px rgba(0,0,0,0.35)' : undefined,
      }}
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${product.color}18`, color: product.color }}
          >
            <i className={`${product.icon} text-sm`} />
          </div>
          <h3 className="text-sm font-bold text-[#e2e8f8] truncate" style={{ fontFamily: 'Cairo' }}>
            {product.name}
          </h3>
        </div>
        <span
          className="text-[10px] font-bold px-2 py-1 rounded-full flex-shrink-0"
          style={{
            fontFamily: 'Cairo',
            background: isLive ? 'rgba(37,99,235,0.12)' : 'rgba(148,163,184,0.07)',
            color: isLive ? '#60a5fa' : '#7a93bc',
            border: `1px solid ${isLive ? 'rgba(37,99,235,0.28)' : 'rgba(148,163,184,0.14)'}`,
          }}
        >
          {isLive ? '● Live' : '⚙ قريباً'}
        </span>
      </div>

      <p className="text-xs text-[#7a93bc] leading-relaxed mb-4" style={{ fontFamily: 'Cairo', minHeight: '2.5rem' }}>
        {product.tagline}
      </p>

      <ul className="space-y-1.5 mb-4">
        {product.solutionBullets.slice(0, 3).map((b) => (
          <li key={b} className="flex items-start gap-2 text-xs text-[#64748b]" style={{ fontFamily: 'Cairo' }}>
            <i className="fas fa-check text-[8px] mt-1 flex-shrink-0" style={{ color: product.color }} />
            {b}
          </li>
        ))}
      </ul>

      <div
        className="flex items-center gap-1.5 text-xs font-semibold pt-3"
        style={{ fontFamily: 'Cairo', color: product.color, borderTop: '1px solid rgba(148,163,184,0.07)' }}
      >
        <span>اعرف أكثر</span>
        <i className="fas fa-arrow-left text-[10px]" />
      </div>
    </motion.button>
  )
}

export default function ProductsSection() {
  const [selected, setSelected] = useState<Product | null>(null)

  return (
    <section id="products" className="section border-t border-[rgba(148,163,184,0.07)]">
      <div className="container-smaw">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: EASE }}
          className="text-center mb-8 lg:mb-16"
        >
          <span className="badge mb-4">منتجاتنا</span>
          <h2
            className="text-2xl lg:text-4xl font-bold tracking-tight mb-3 lg:mb-4"
            style={{ fontFamily: 'Cairo', lineHeight: 1.2 }}
          >
            ثمانية منتجات رقمية،{' '}
            <span className="gradient-text">بهوية واحدة</span>
          </h2>
          <p className="text-[#7a93bc] max-w-[540px] mx-auto text-sm lg:text-base leading-relaxed" style={{ fontFamily: 'Cairo' }}>
            حلول ذكية متطورة لإدارة الشركات السعودية
          </p>
        </motion.div>

        <div className="lg:hidden space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-4 px-1">
              <span className="w-2 h-2 rounded-full bg-[#2563eb] animate-pulse" />
              <span className="text-xs font-bold text-[#60a5fa]" style={{ fontFamily: 'Cairo' }}>متاح الآن</span>
            </div>
            <div className="-mx-4">
              <MobileCarousel>
                {liveProducts.map((p, i) => (
                  <MobileCarouselItem key={p.id} width="82vw" className="first:ms-4 last:me-4">
                    <ProductCard product={p} index={i} mobile onClick={() => setSelected(p)} />
                  </MobileCarouselItem>
                ))}
              </MobileCarousel>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4 px-1">
              <span className="w-2 h-2 rounded-full bg-[#3d5270]" />
              <span className="text-xs font-bold text-[#7a93bc]" style={{ fontFamily: 'Cairo' }}>قيد التطوير</span>
            </div>
            <div className="-mx-4">
              <MobileCarousel>
                {devProducts.map((p, i) => (
                  <MobileCarouselItem key={p.id} width="82vw" className="first:ms-4 last:me-4">
                    <ProductCard product={p} index={i} mobile onClick={() => setSelected(p)} />
                  </MobileCarouselItem>
                ))}
              </MobileCarousel>
            </div>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#2563eb] animate-pulse" />
              <span className="text-xs font-bold text-[#60a5fa] uppercase tracking-widest" style={{ fontFamily: 'Cairo' }}>
                متاح الآن — 4 منتجات
              </span>
              <div className="flex-1 h-px bg-[rgba(16,185,129,0.15)]" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {liveProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} onClick={() => setSelected(p)} />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#3d5270]" />
              <span className="text-xs font-bold text-[#7a93bc] uppercase tracking-widest" style={{ fontFamily: 'Cairo' }}>
                قيد التطوير — 4 منتجات
              </span>
              <div className="flex-1 h-px bg-[rgba(245,158,11,0.15)]" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {devProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i + 4} onClick={() => setSelected(p)} />
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 lg:mt-14 text-center"
        >
          <p className="text-[#7a93bc] text-sm mb-4" style={{ fontFamily: 'Cairo' }}>
            لا تتردد واسأل عن المنتج المناسب لشركتك
          </p>
          <a
            href="#booking"
            className="inline-flex items-center justify-center gap-2 w-full lg:w-auto bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold px-7 py-3.5 rounded-2xl lg:rounded-xl shadow-[0_4px_24px_rgba(37,99,235,0.3)] text-sm"
            style={{ fontFamily: 'Cairo' }}
          >
            احجز استشارة مجانية
            <i className="fas fa-arrow-left text-xs" />
          </a>
        </motion.div>
      </div>

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
