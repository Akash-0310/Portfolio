'use client'
import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Code2, Globe, Zap, Download } from 'lucide-react'
import { LinkedinIcon } from '@/components/ui/LinkedinIcon'
import { GithubIcon } from '@/components/ui/GithubIcon'
import { InstagramIcon } from '@/components/ui/InstagramIcon'
import { HeroBackground } from '@/components/effects/GridBackground'
import { FloatingParticles } from '@/components/effects/FloatingParticles'
import { StarfieldBackground } from '@/components/effects/StarfieldBackground'
import { AvailabilityBadge } from '@/components/ui/Badge'
import { siteConfig, roles } from '@/lib/data'
import { MagneticWrapper } from '@/components/ui/MagneticWrapper'

const FLOATING_TECH = [
  { icon: '⚛', label: 'React',   sub: 'Frontend', x: '7%',  y: '18%', delay: 0,    color: '#61DAFB' },
  { icon: '⬡', label: 'Node.js', sub: 'Runtime',  x: '86%', y: '14%', delay: 0.3,  color: '#6DA55F' },
  { icon: '🍃', label: 'MongoDB', sub: 'Database', x: '4%',  y: '62%', delay: 0.6,  color: '#47A248' },
  { icon: '🐳', label: 'Docker',  sub: 'DevOps',   x: '88%', y: '58%', delay: 0.9,  color: '#2496ED' },
  { icon: '☁',  label: 'AWS',     sub: 'Cloud',    x: '80%', y: '80%', delay: 1.2,  color: '#FF9900' },
  { icon: '▲',  label: 'Next.js', sub: 'Framework',x: '10%', y: '80%', delay: 0.45, color: '#ffffff' },
]

export function Hero() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme !== 'light'
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
      {isDark && <StarfieldBackground />}
      <HeroBackground />
      <FloatingParticles />

      {FLOATING_TECH.map((t) => (
        <motion.div
          key={t.label}
          className="absolute hidden lg:flex items-center gap-3 rounded-2xl px-4 py-3 cursor-default"
          style={{
            left: t.x, top: t.y,
            background: `${t.color}0d`,
            border: `1px solid ${t.color}28`,
            boxShadow: `0 0 22px ${t.color}12, inset 0 1px 0 ${t.color}18`,
            backdropFilter: 'blur(12px)',
          }}
          initial={{ opacity: 0, scale: 0.75, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
          transition={{
            opacity: { delay: 0.8 + t.delay, duration: 0.5 },
            scale:   { delay: 0.8 + t.delay, duration: 0.5, type: 'spring', stiffness: 260, damping: 20 },
            y:       { delay: 0.8 + t.delay, duration: 3.8 + t.delay * 0.6, repeat: Infinity, ease: 'easeInOut' },
          }}
          whileHover={{
            scale: 1.08,
            boxShadow: `0 0 36px ${t.color}35, inset 0 1px 0 ${t.color}30`,
            borderColor: `${t.color}50`,
          }}
        >
          {/* Icon box */}
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-base shrink-0"
            style={{
              background: `${t.color}18`,
              border: `1px solid ${t.color}30`,
              boxShadow: `0 0 10px ${t.color}20`,
            }}
          >
            {t.icon}
          </div>
          {/* Label + sub */}
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-semibold leading-none" style={{ color: `${t.color}ee` }}>
              {t.label}
            </span>
            <span className="text-[10px] leading-none font-medium" style={{ color: `${t.color}66` }}>
              {t.sub}
            </span>
          </div>
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

          <MagneticWrapper className="w-full sm:w-auto">
            <a
              href="/Akash_resume.pdf"
              download="Akash_Singh_Resume.pdf"
              className="flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl border border-violet-500/30 text-violet-300/80 text-sm font-medium hover:text-violet-200 hover:border-violet-400/50 hover:bg-violet-500/10 transition-all duration-200 w-full"
            >
              <Download className="w-4 h-4" />
              Resume
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
              { icon: Zap, label: '4+ projects' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <Icon className="w-3 h-3 text-violet-400" />
                {label}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

    </section>
  )
}
