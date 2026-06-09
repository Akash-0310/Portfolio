'use client'
import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

interface LoadingScreenProps {
  onComplete: () => void
}

const PHASES = ['Initializing...', 'Loading modules...', 'Compiling experience...', 'Rendering portfolio...']

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [phaseIdx, setPhaseIdx] = useState(0)

  const handleComplete = useCallback(onComplete, [onComplete])

  useEffect(() => {
    const STEPS = 60
    const DURATION = 2200
    const INTERVAL = DURATION / STEPS
    let current = 0

    const timer = setInterval(() => {
      current += 100 / STEPS
      const clamped = Math.min(100, current)
      setProgress(clamped)
      setPhaseIdx(Math.min(PHASES.length - 1, Math.floor((clamped / 100) * PHASES.length)))
      if (clamped >= 100) {
        clearInterval(timer)
        setTimeout(handleComplete, 400)
      }
    }, INTERVAL)

    return () => clearInterval(timer)
  }, [handleComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#080810]"
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.15), transparent 70%)' }}
      />

      <div className="relative flex flex-col items-center gap-10 w-full max-w-xs px-8">
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <motion.div
              className="w-16 h-16 rounded-2xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center"
              animate={{ borderColor: ['rgba(139,92,246,0.3)', 'rgba(139,92,246,0.8)', 'rgba(139,92,246,0.3)'] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-xl font-bold text-gradient">AS</span>
            </motion.div>
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.3), transparent 70%)' }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <p className="text-white/30 text-xs font-mono tracking-widest">AKASH SINGH</p>
        </motion.div>

        <div className="w-full flex flex-col gap-3">
          <div className="w-full h-px bg-white/8 rounded-full overflow-hidden relative">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between">
            <motion.span key={phaseIdx} className="text-xs font-mono text-white/25" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {PHASES[phaseIdx]}
            </motion.span>
            <span className="text-xs font-mono text-violet-400 tabular-nums">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
