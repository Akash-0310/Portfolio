'use client'
import { useMousePosition } from '@/hooks/useMousePosition'

interface GridBackgroundProps {
  variant?: 'grid' | 'dots' | 'both'
  children?: React.ReactNode
}

export function GridBackground({ variant = 'grid', children }: GridBackgroundProps) {
  const mouse = useMousePosition()
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {(variant === 'grid' || variant === 'both') && (
        <div className="absolute inset-0 grid-bg opacity-30" />
      )}
      {(variant === 'dots' || variant === 'both') && (
        <div className="absolute inset-0 dot-bg opacity-15" />
      )}
      <div
        className="absolute inset-0"
        style={{
          background: mouse.x
            ? `radial-gradient(ellipse 600px 400px at ${mouse.x}px ${mouse.y}px, rgba(139,92,246,0.05), transparent)`
            : 'none',
        }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent, transparent, var(--page-bg))' }} />
      {children}
    </div>
  )
}

export function HeroBackground() {
  const mouse = useMousePosition()
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div
        className="absolute -top-64 -right-64 w-[700px] h-[700px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-1/2 -left-64 w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)' }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: mouse.x
            ? `radial-gradient(ellipse 900px 700px at ${mouse.x}px ${mouse.y}px, rgba(139,92,246,0.07), transparent)`
            : 'none',
        }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, var(--page-bg-40), transparent, var(--page-bg))' }} />
    </div>
  )
}
