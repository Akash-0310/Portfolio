'use client'
import React from 'react'
import { motion, Variants } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  variant?: 'chars' | 'words' | 'lines'
}

const charVariants: Variants = {
  hidden: { opacity: 0, y: 20, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

export function AnimatedText({ text, className = '', delay = 0, variant = 'words' }: AnimatedTextProps) {
  if (variant === 'chars') {
    const chars = text.split('')
    return (
      <span className={className} style={{ display: 'inline-block', perspective: '1000px' }}>
        {chars.map((char, i) => (
          <motion.span
            key={i}
            custom={i + delay * 33}
            variants={charVariants}
            initial="hidden"
            animate="visible"
            style={{ display: 'inline-block', transformOrigin: 'bottom' }}
          >
            {char === ' ' ? ' ' : char}
          </motion.span>
        ))}
      </span>
    )
  }

  const words = text.split(' ')
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden' }}>
          <motion.span
            custom={i + delay * 12}
            variants={wordVariants}
            initial="hidden"
            animate="visible"
            style={{ display: 'inline-block' }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </span>
  )
}

interface TypewriterProps {
  texts: string[]
  className?: string
  speed?: number
}

export function Typewriter({ texts, className = '', speed = 80 }: TypewriterProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [currentText, setCurrentText] = React.useState('')
  const [isDeleting, setIsDeleting] = React.useState(false)
  const [isPaused, setIsPaused] = React.useState(false)

  React.useEffect(() => {
    const target = texts[currentIndex]

    if (isPaused) {
      const timeout = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, 2000)
      return () => clearTimeout(timeout)
    }

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < target.length) {
          setCurrentText(target.slice(0, currentText.length + 1))
        } else {
          setIsPaused(true)
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setCurrentIndex((prev) => (prev + 1) % texts.length)
        }
      }
    }, isDeleting ? speed / 2 : speed)

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, isPaused, currentIndex, texts, speed])

  return (
    <span className={className}>
      {currentText}
      <span className="animate-blink ml-0.5 text-violet-400">|</span>
    </span>
  )
}
