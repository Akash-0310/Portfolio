'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(true)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const smoothX = useSpring(rawX, { stiffness: 500, damping: 30 })
  const smoothY = useSpring(rawY, { stiffness: 500, damping: 30 })
  const trailX = useSpring(rawX, { stiffness: 150, damping: 20 })
  const trailY = useSpring(rawY, { stiffness: 150, damping: 20 })

  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  useEffect(() => {
    if (isTouchDevice) return

    const move = (e: MouseEvent) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
      setIsVisible(true)
    }
    const down = () => setIsClicking(true)
    const up = () => setIsClicking(false)
    const leave = () => setIsVisible(false)
    const enter = () => setIsVisible(true)
    const checkHover = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      setIsHovering(!!(el.closest('a') || el.closest('button') || el.closest('[data-hover]')))
    }

    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    window.addEventListener('mouseover', checkHover, { passive: true })
    document.addEventListener('mouseleave', leave)
    document.addEventListener('mouseenter', enter)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      window.removeEventListener('mouseover', checkHover)
      document.removeEventListener('mouseleave', leave)
      document.removeEventListener('mouseenter', enter)
    }
  }, [isTouchDevice, rawX, rawY])

  if (isTouchDevice) return null

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
        style={{ x: smoothX, y: smoothY, translateX: '-50%', translateY: '-50%', opacity: isVisible ? 1 : 0 }}
      >
        <motion.div
          className="rounded-full bg-white"
          animate={{ width: isHovering ? 40 : isClicking ? 8 : 12, height: isHovering ? 40 : isClicking ? 8 : 12 }}
          transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998]"
        style={{ x: trailX, y: trailY, translateX: '-50%', translateY: '-50%', opacity: isVisible ? 1 : 0 }}
      >
        <motion.div
          className="rounded-full border border-violet-400/50"
          animate={{ width: isHovering ? 60 : 30, height: isHovering ? 60 : 30, opacity: isHovering ? 0.5 : 0.2 }}
          transition={{ type: 'spring', stiffness: 200, damping: 22 }}
        />
      </motion.div>
    </>
  )
}
