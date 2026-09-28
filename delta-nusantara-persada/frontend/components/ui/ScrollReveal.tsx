'use client'
import React, { useEffect, useRef, useState } from 'react'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number // in milliseconds, e.g. 100, 200, 300
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  duration?: number // in milliseconds, default 600
  threshold?: number
}

let sharedObserver: IntersectionObserver | null = null
const callbacks = new Map<Element, () => void>()

function getObserver(): IntersectionObserver | null {
  if (typeof window === 'undefined') return null
  if (!sharedObserver && 'IntersectionObserver' in window) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cb = callbacks.get(entry.target)
            if (cb) {
              cb()
              callbacks.delete(entry.target)
            }
            sharedObserver?.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px',
      }
    )
  }
  return sharedObserver
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 600,
  threshold = 0.12,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Respect user reduced-motion preference
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true)
      return
    }

    const el = ref.current
    if (!el) return

    const obs = getObserver()
    if (!obs) {
      setIsVisible(true)
      return
    }

    callbacks.set(el, () => setIsVisible(true))
    obs.observe(el)

    return () => {
      callbacks.delete(el)
      obs.unobserve(el)
    }
  }, [])

  // Compute offset transform based on direction
  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return 'translate-y-8'
      case 'down':
        return '-translate-y-8'
      case 'left':
        return 'translate-x-8'
      case 'right':
        return '-translate-x-8'
      case 'none':
        return ''
      default:
        return 'translate-y-8'
    }
  }

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
      className={`transition-all ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0 translate-x-0'
          : `opacity-0 ${getInitialTransform()}`
      } ${className}`}
    >
      {children}
    </div>
  )
}
