'use client'
import { motion, MotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useRef, useState } from 'react'

interface GlassCardProps extends MotionProps {
  children: React.ReactNode
  className?: string
  glow?: boolean
  hover?: boolean
  glowColor?: string
}

export function GlassCard({
  children,
  className,
  glow = false,
  hover = true,
  glowColor = 'rgba(139, 92, 246, 0.15)',
  ...motionProps
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hover || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const rotX = ((e.clientY - centerY) / (rect.height / 2)) * -5
    const rotY = ((e.clientX - centerX) / (rect.width / 2)) * 5
    setRotateX(rotX)
    setRotateY(rotY)
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setGlowPos({ x, y })
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setGlowPos({ x: 50, y: 50 })
  }

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        'relative rounded-2xl glass overflow-hidden',
        glow && 'glow-primary',
        className
      )}
      style={{
        transform: hover ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)` : undefined,
        transition: 'transform 0.2s ease',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...motionProps}
    >
      {hover && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
          style={{
            background: `radial-gradient(circle 200px at ${glowPos.x}% ${glowPos.y}%, ${glowColor}, transparent)`,
            opacity: 0.6,
          }}
        />
      )}
      {children}
    </motion.div>
  )
}
