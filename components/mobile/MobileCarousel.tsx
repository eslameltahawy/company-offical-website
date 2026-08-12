'use client'

import type { ReactNode } from 'react'

interface MobileCarouselProps {
  children: ReactNode
  className?: string
  gap?: string
}

/** Horizontal snap carousel — intended for mobile layouts (lg:hidden parent). */
export default function MobileCarousel({ children, className = '', gap = '12px' }: MobileCarouselProps) {
  return (
    <div
      className={`mobile-carousel flex overflow-x-auto snap-x snap-mandatory scroll-smooth ${className}`}
      style={{ gap, WebkitOverflowScrolling: 'touch' }}
    >
      {children}
    </div>
  )
}

export function MobileCarouselItem({
  children,
  className = '',
  width = '85vw',
}: {
  children: ReactNode
  className?: string
  width?: string
}) {
  return (
    <div
      className={`snap-center flex-shrink-0 ${className}`}
      style={{ width, scrollSnapAlign: 'center' }}
    >
      {children}
    </div>
  )
}
