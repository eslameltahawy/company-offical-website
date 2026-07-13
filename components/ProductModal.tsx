'use client'

import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Product } from '@/data/products'

interface ProductModalProps {
  product: Product | null
  onClose: () => void
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (product) {
      document.addEventListener('keydown', handleKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [product, handleKey])

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-50"
            style={{ background: 'rgba(3,7,18,0.85)', backdropFilter: 'blur(8px)' }}
            aria-hidden
          />

          {/* Panel */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-50 inset-x-4 bottom-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-[680px] sm:max-h-[88vh] flex flex-col rounded-t-3xl sm:rounded-2xl overflow-hidden"
            style={{ background: '#0d1525', border: '1px solid rgba(148,163,184,0.1)', maxHeight: '90vh' }}
            role="dialog"
            aria-modal
            aria-label={product.name}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 pt-6 pb-4 flex-shrink-0"
              style={{ borderBottom: '1px solid rgba(148,163,184,0.07)' }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${product.color}18`, border: `1px solid ${product.color}35`, color: product.color }}
                >
                  <i className={`${product.icon} text-lg`} />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-lg font-bold text-[#e2e8f8]" style={{ fontFamily: 'Cairo' }}>
                      {product.name}
                    </h2>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{
                        fontFamily: 'Cairo',
                        background: product.status === 'live' ? '#10b98120' : 'rgba(245,158,11,0.12)',
                        color: product.status === 'live' ? '#10b981' : '#f59e0b',
                        border: `1px solid ${product.status === 'live' ? '#10b98130' : 'rgba(245,158,11,0.25)'}`,
                      }}
                    >
                      {product.status === 'live' ? '● متاح الآن' : '⚙ قيد التطوير'}
                    </span>
                  </div>
                  <p className="text-xs text-[#7a93bc] mt-0.5" style={{ fontFamily: 'Cairo' }}>
                    {product.tagline}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#7a93bc] hover:text-[#e2e8f8] hover:bg-white/5 transition-all flex-shrink-0"
                aria-label="إغلاق"
              >
                <i className="fas fa-times text-sm" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5 scrollbar-thin">

              {/* Stats row */}
              {product.stats && (
                <div className="grid grid-cols-3 gap-3">
                  {product.stats.map((s) => (
                    <div
                      key={s.label}
                      className="rounded-xl p-3 text-center"
                      style={{ background: `${product.color}10`, border: `1px solid ${product.color}20` }}
                    >
                      <div
                        className="text-xl font-bold mb-0.5"
                        style={{ fontFamily: 'Cairo', color: product.color }}
                      >
                        {s.value}
                      </div>
                      <div className="text-[10px] text-[#7a93bc]" style={{ fontFamily: 'Cairo' }}>
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Problem */}
              <div
                className="rounded-xl p-4"
                style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.15)' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <i className="fas fa-exclamation-triangle text-[#ef4444] text-xs" />
                  <span className="text-xs font-bold text-[#ef4444]" style={{ fontFamily: 'Cairo' }}>
                    المشكلة
                  </span>
                </div>
                <p className="text-sm text-[#c4b5b5] leading-relaxed mb-3" style={{ fontFamily: 'Cairo' }}>
                  {product.problem}
                </p>
                <ul className="space-y-1.5">
                  {product.problemPoints.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-xs text-[#b0a0a0]" style={{ fontFamily: 'Cairo' }}>
                      <i className="fas fa-times text-[#ef4444] text-[10px] mt-0.5 flex-shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solution */}
              <div
                className="rounded-xl p-4"
                style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.15)' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <i className="fas fa-check-circle text-[#10b981] text-xs" />
                  <span className="text-xs font-bold text-[#10b981]" style={{ fontFamily: 'Cairo' }}>
                    الحل
                  </span>
                </div>
                <p className="text-sm text-[#a8c4b5] leading-relaxed mb-3" style={{ fontFamily: 'Cairo' }}>
                  {product.solution}
                </p>
                <ul className="space-y-2">
                  {product.solutionBullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-[#e2e8f8]" style={{ fontFamily: 'Cairo' }}>
                      <i className="fas fa-check text-[#10b981] text-[10px] mt-0.5 flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Audience */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <i className="fas fa-building text-[#60a5fa] text-xs" />
                  <span className="text-xs font-bold text-[#60a5fa]" style={{ fontFamily: 'Cairo' }}>
                    الجمهور المستهدف
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.audience.map((a) => (
                    <span
                      key={a}
                      className="text-xs px-3 py-1.5 rounded-full text-[#e2e8f8]"
                      style={{
                        fontFamily: 'Cairo',
                        background: `${product.color}12`,
                        border: `1px solid ${product.color}25`,
                      }}
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div
              className="flex flex-col sm:flex-row gap-3 px-6 py-4 flex-shrink-0"
              style={{ borderTop: '1px solid rgba(148,163,184,0.07)', background: 'rgba(10,16,32,0.5)' }}
            >
              {product.status === 'live' ? (
                <>
                  {product.pdfPath && (
                    <a
                      href={product.pdfPath}
                      download
                      className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold py-2.5 rounded-xl transition-all hover:opacity-90"
                      style={{
                        fontFamily: 'Cairo',
                        background: 'rgba(148,163,184,0.08)',
                        border: '1px solid rgba(148,163,184,0.15)',
                        color: '#e2e8f8',
                      }}
                    >
                      <i className="fas fa-file-download text-xs" />
                      تحميل الملف التعريفي
                    </a>
                  )}
                  <a
                    href="#booking"
                    onClick={onClose}
                    className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold py-2.5 rounded-xl text-white transition-all hover:opacity-90 hover:-translate-y-0.5"
                    style={{
                      fontFamily: 'Cairo',
                      background: product.color,
                      boxShadow: `0 4px 20px ${product.color}40`,
                    }}
                  >
                    <i className="fas fa-calendar-alt text-xs" />
                    احجز اجتماعاً لطلب الخدمة
                  </a>
                </>
              ) : (
                <>
                  <div
                    className="flex-1 flex items-center justify-center gap-2 text-xs py-2.5 rounded-xl"
                    style={{
                      fontFamily: 'Cairo',
                      background: 'rgba(245,158,11,0.08)',
                      border: '1px solid rgba(245,158,11,0.2)',
                      color: '#f59e0b',
                    }}
                  >
                    <i className="fas fa-clock text-xs" />
                    <span>قيد التطوير — سيُطلق قريباً</span>
                  </div>
                  <a
                    href="#booking"
                    onClick={onClose}
                    className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold py-2.5 rounded-xl text-white transition-all hover:opacity-90"
                    style={{
                      fontFamily: 'Cairo',
                      background: 'rgba(148,163,184,0.1)',
                      border: '1px solid rgba(148,163,184,0.2)',
                      color: '#e2e8f8',
                    }}
                  >
                    <i className="fas fa-bell text-xs" />
                    سجّل اهتمامك لأول إطلاق
                  </a>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

