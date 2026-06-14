'use client'
import { useRef } from 'react'
import { motion, useSpring } from 'framer-motion'

interface MagneticWrapperProps {
  children: React.ReactNode
  className?: string
  strength?: number
}

export function MagneticWrapper({ children, className, strength = 0.35 }: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(0, { stiffness: 180, damping: 18 })
  const y = useSpring(0, { stiffness: 180, damping: 18 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * strength)
    y.set((e.clientY - rect.top - rect.height / 2) * strength)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}
