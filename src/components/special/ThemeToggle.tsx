'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const isDark = theme === 'dark'

  return (
    <motion.button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="fixed bottom-6 right-6 z-50 w-13 h-13 rounded-full flex items-center justify-center shadow-xl"
      style={{
        width: 52,
        height: 52,
        background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)',
        border: isDark ? '1px solid rgba(255,255,255,0.14)' : '1px solid rgba(0,0,0,0.12)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
      whileHover={{ scale: 1.12, rotate: 15 }}
      whileTap={{ scale: 0.92 }}
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 2.2, type: 'spring', stiffness: 380, damping: 28 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      data-cursor-hover
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="flex items-center justify-center"
          >
            <Sun className="w-5 h-5 text-amber-400" strokeWidth={2} />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="flex items-center justify-center"
          >
            <Moon className="w-5 h-5 text-violet-500" strokeWidth={2} />
          </motion.span>
        )}
      </AnimatePresence>

      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: isDark
            ? '0 0 0 0px rgba(251,191,36,0)'
            : '0 0 0 0px rgba(139,92,246,0)',
        }}
        whileHover={{
          boxShadow: isDark
            ? '0 0 18px 4px rgba(251,191,36,0.25)'
            : '0 0 18px 4px rgba(139,92,246,0.2)',
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  )
}
