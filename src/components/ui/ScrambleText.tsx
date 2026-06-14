'use client'
import { useEffect, useState, useRef } from 'react'
import { useInView } from 'react-intersection-observer'

const CHARS = '!@#$%^&*<>/\\|{}[]ABCDEFabcdef0123456789'

export function ScrambleText({ text, className }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 })
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true

    let frame = 0
    const totalFrames = text.length * 4

    const tick = () => {
      const revealed = Math.floor((frame / totalFrames) * text.length)
      setDisplay(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (i < revealed) return text[i]
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )
      frame++
      if (frame <= totalFrames) requestAnimationFrame(tick)
      else setDisplay(text)
    }

    requestAnimationFrame(tick)
  }, [inView, text])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
