'use client'
import { useEffect, useState, useRef, useCallback } from 'react'

interface MousePosition {
  x: number
  y: number
  normalizedX: number
  normalizedY: number
}

export function useMousePosition() {
  const [position, setPosition] = useState<MousePosition>({
    x: 0, y: 0, normalizedX: 0, normalizedY: 0,
  })

  const rafRef = useRef<number>(0)
  const pendingRef = useRef<MousePosition | null>(null)

  const flush = useCallback(() => {
    if (pendingRef.current) {
      setPosition(pendingRef.current)
      pendingRef.current = null
    }
    rafRef.current = 0
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      pendingRef.current = {
        x: e.clientX,
        y: e.clientY,
        normalizedX: (e.clientX / window.innerWidth) * 2 - 1,
        normalizedY: -((e.clientY / window.innerHeight) * 2 - 1),
      }
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(flush)
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [flush])

  return position
}
