'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { products, type Product } from '@/data/products'
import ProductModal from '@/components/ProductModal'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const liveProducts = products.filter((p) => p.status === 'live')
const devProducts = products.filter((p) => p.status === 'development')

function ProductCard({
  product,
  index,
  onClick,
}: {
  product: Product
  index: number
  onClick: () => void
}) {
  const isLive = product.status === 'live'

  return (
    <motion.button
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }}
      onClick={onClick}
      className="group relative w-full text-right rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1"
      style={{
        background: isLive ? 'rgba(13,21,37,0.95)' : 'rgba(10,16,32,0.7)',
        border: isLive
          ? '1px solid rgba(148,163,184,0.12)'
          : '1px solid rgba(148,163,184,0.07)',
        opacity: isLive ? 1 : 0.72,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.border = `1px solid ${product.color}45`
        el.style.boxShadow = `0 0 32px ${product.color}18`
        el.style.opacity = '1'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.border = isLive
          ? '1px solid rgba(148,163,184,0.12)'
          : '1px solid rgba(148,163,184,0.07)'
        el.style.boxShadow = 'none'
        el.style.opacity = isLive ? '1' : '0.72'
      }}
    >
      {/* Status badge */}
      <div className="flex items-center justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${product.color}18`, color: product.color }}
        >
          <i className={`${product.icon} text-base`} />
        </div>
        <span
          className="text-[10px] font-bold px-2 py-1 rounded-full"
          style={{
            fontFamily: 'Cairo',
            background: isLive ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)',
            color: isLive ? '#10b981' : '#f59e0b',
            border: `1px solid ${isLive ? 'rgba(16,185,129,0.25)' : 'rgba(245,158,11,0.2)'}`,
          }}
        >
          {isLive ? '● Live' : '⚙ قريباً'}
        </span>
      </div>

      {/* Name & tagline */}
      <div className="mb-4">
        <h3
          className="text-base font-bold text-[#e2e8f8] mb-1 group-hover:text-white transition-colors"
          style={{ fontFamily: 'Cairo' }}
        >
          {product.name}
        </h3>
        <p className="text-xs text-[#7a93bc] leading-relaxed" style={{ fontFamily: 'Cairo' }}>
          {product.tagline}
        </p>
      </div>

      {/* Top 3 solution bullets */}
      <ul className="space-y-1.5 mb-4">
        {product.solutionBullets.slice(0, 3).map((b) => (
          <li
            key={b}
            className="flex items-start gap-2 text-xs text-[#64748b]"
            style={{ fontFamily: 'Cairo' }}
          >
            <i className="fas fa-check text-[8px] mt-1 flex-shrink-0" style={{ color: product.color }} />
            {b}
          </li>
        ))}
      </ul>

      {/* CTA row */}
      <div
        className="flex items-center gap-1.5 text-xs font-semibold pt-3 transition-colors"
        style={{
          fontFamily: 'Cairo',
          color: product.color,
          borderTop: '1px solid rgba(148,163,184,0.07)',
        }}
      >
        <span>اعرف أكثر</span>
        <i className="fas fa-arrow-left text-[10px] group-hover:-translate-x-0.5 transition-transform" />
      </div>
    </motion.button>
  )
}

export default function ProductsSection() {
  const [selected, setSelected] = useState<Product | null>(null)

  return (
    <section id="products" className="section border-t border-[rgba(148,163,184,0.07)]">
      <div className="container-smaw">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: EASE }}
          className="text-center mb-16"
        >
          <span className="badge mb-4">منتجاتنا</span>
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
            style={{ fontFamily: 'Cairo', lineHeight: 1.2 }}
          >
            ثمانية منتجات،{' '}
            <span className="gradient-text">هوية واحدة</span>
          </h2>
          <p
            className="text-[#7a93bc] max-w-[540px] mx-auto text-base leading-relaxed"
            style={{ fontFamily: 'Cairo' }}
          >
            كل منتج يحل مشكلة حقيقية في إدارة الشركات السعودية — اضغط على أي منتج لتعرف عنه كل شيء في 10 ثوانٍ.
          </p>
        </motion.div>

        {/* Live Products */}
        <div className="mb-10">
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            <span className="text-xs font-bold text-[#10b981] uppercase tracking-widest" style={{ fontFamily: 'Cairo' }}>
              متاح الآن — 4 منتجات
            </span>
            <div className="flex-1 h-px bg-[rgba(16,185,129,0.15)]" />
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {liveProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} onClick={() => setSelected(p)} />
            ))}
          </div>
        </div>

        {/* Development Products */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#f59e0b]" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
            <span className="text-xs font-bold text-[#f59e0b] uppercase tracking-widest" style={{ fontFamily: 'Cairo' }}>
              قيد التطوير — 4 منتجات
            </span>
            <div className="flex-1 h-px bg-[rgba(245,158,11,0.15)]" />
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {devProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i + 4} onClick={() => setSelected(p)} />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 text-center"
        >
          <p className="text-[#7a93bc] text-sm mb-4" style={{ fontFamily: 'Cairo' }}>
            هل تريد معرفة أي المنتجات يناسب شركتك؟
          </p>
          <a
            href="#booking"
            className="inline-flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold px-7 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-[0_4px_24px_rgba(37,99,235,0.3)] text-sm"
            style={{ fontFamily: 'Cairo' }}
          >
            احجز استشارة مجانية
            <i className="fas fa-arrow-left text-xs" />
          </a>
        </motion.div>
      </div>

      {/* Modal */}
      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </section>
  )
}

