'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Code2, Globe, Zap } from 'lucide-react'
import { LinkedinIcon } from '@/components/ui/LinkedinIcon'
import { GithubIcon } from '@/components/ui/GithubIcon'
import { InstagramIcon } from '@/components/ui/InstagramIcon'
import { HeroBackground } from '@/components/effects/GridBackground'
import { FloatingParticles } from '@/components/effects/FloatingParticles'
import { AvailabilityBadge } from '@/components/ui/Badge'
import { siteConfig, roles } from '@/lib/data'
import { MagneticWrapper } from '@/components/ui/MagneticWrapper'

const FLOATING_TECH = [
  { icon: '⚛', label: 'React', x: '8%', y: '20%', delay: 0 },
  { icon: '🟢', label: 'Node.js', x: '88%', y: '15%', delay: 0.3 },
  { icon: '🍃', label: 'MongoDB', x: '5%', y: '65%', delay: 0.6 },
  { icon: '🐳', label: 'Docker', x: '90%', y: '60%', delay: 0.9 },
  { icon: '☁', label: 'AWS', x: '82%', y: '82%', delay: 1.2 },
  { icon: '▲', label: 'Next.js', x: '12%', y: '82%', delay: 0.45 },
]

export function Hero() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const target = roles[roleIdx]
    const speed = isDeleting ? 35 : 70

    if (isPaused) {
      timeoutRef.current = setTimeout(() => { setIsPaused(false); setIsDeleting(true) }, 2000)
      return
    }

    timeoutRef.current = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < target.length) {
          setDisplayText(target.slice(0, displayText.length + 1))
        } else {
          setIsPaused(true)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setRoleIdx((prev) => (prev + 1) % roles.length)
        }
      }
    }, speed)

    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
  }, [displayText, isDeleting, isPaused, roleIdx])

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 md:px-12 lg:px-20">
      <HeroBackground />
      <FloatingParticles />

      {FLOATING_TECH.map((t) => (
        <motion.div
          key={t.label}
          className="absolute hidden lg:flex items-center gap-1.5 glass rounded-xl px-3 py-2 text-xs font-medium text-white/50"
          style={{ left: t.x, top: t.y }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
          transition={{
            opacity: { delay: 0.8 + t.delay, duration: 0.4 },
            scale: { delay: 0.8 + t.delay, duration: 0.4 },
            y: { delay: 0.8 + t.delay, duration: 4 + t.delay, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <span>{t.icon}</span>
          <span>{t.label}</span>
        </motion.div>
      ))}

      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <AvailabilityBadge />
        </motion.div>

        <div className="flex flex-col items-center gap-4">
          <div className="overflow-hidden">
            <motion.h1
              className="text-4xl sm:text-6xl lg:text-8xl font-bold tracking-tight text-white leading-none"
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {siteConfig.name.split(' ').map((word, i) => (
                <span key={i} className={i === 1 ? 'text-gradient block sm:inline' : ''}>
                  {i === 0 ? word : ` ${word}`}
                </span>
              ))}
            </motion.h1>
          </div>

          <motion.div
            className="h-12 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
          >
            <h2 className="text-base sm:text-2xl lg:text-3xl font-medium text-white/60">
              I am a{' '}
              <span className="text-white font-semibold">
                {displayText}
                <span className="animate-blink text-violet-400 ml-0.5">|</span>
              </span>
            </h2>
          </motion.div>
        </div>

        <motion.p
          className="text-sm sm:text-base text-white/45 max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.6 }}
        >
          {siteConfig.bio}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
        >
          <MagneticWrapper className="w-full sm:w-auto">
            <a
              href="#projects"
              onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="group flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-violet-600 text-white text-sm font-semibold shadow-lg shadow-violet-500/25 hover:bg-violet-500 hover:shadow-violet-500/40 transition-all duration-200 w-full"
            >
              <Sparkles className="w-4 h-4" />
              View My Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </MagneticWrapper>

          <MagneticWrapper className="w-full sm:w-auto">
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl glass border border-white/10 text-white/70 text-sm font-medium hover:text-white hover:border-white/20 transition-all duration-200 w-full"
            >
              <Globe className="w-4 h-4" />
              Let&apos;s Talk
            </a>
          </MagneticWrapper>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.95 }}
        >
          {[
            { href: siteConfig.github, Icon: GithubIcon, label: 'GitHub' },
            { href: siteConfig.linkedin, Icon: LinkedinIcon, label: 'LinkedIn' },
            { href: siteConfig.instagram, Icon: InstagramIcon, label: 'Instagram' },
          ].map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={label}
              className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white/40 hover:text-white/80 hover:border-white/20 transition-all duration-200"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
          <div className="w-px h-6 bg-white/10" />
          <div className="flex items-center gap-5 text-xs text-white/30 font-mono">
            {[
              { icon: Code2, label: '2+ yrs' },
              { icon: Zap, label: '3+ projects' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <Icon className="w-3 h-3 text-violet-400" />
                {label}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        <span className="text-xs text-white/25 font-mono tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-violet-400/50 to-transparent" />
      </motion.div>
    </section>
  )
}
