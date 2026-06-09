'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Menu, X, Code2 } from 'lucide-react'
import { siteConfig } from '@/lib/data'

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#github', label: 'GitHub' },
  { href: '#contact', label: 'Contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const { scrollYProgress } = useScroll()
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id) })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    NAV_LINKS.forEach(({ href }) => {
      const el = document.querySelector(href)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <>
      <motion.header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Full-width scrim: blurs & fades content scrolling underneath so it never clashes with headings */}
        <div
          className={`absolute inset-0 -z-10 pointer-events-none transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0'}`}
          style={{
            background: 'linear-gradient(to bottom, rgba(8,8,16,0.9) 0%, rgba(8,8,16,0.55) 55%, transparent 100%)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)',
          }}
          aria-hidden
        />

        <div className={`mx-4 lg:mx-8 rounded-2xl transition-all duration-300 ${scrolled ? 'glass shadow-xl shadow-black/20' : ''}`}>
          <nav className="flex items-center justify-between px-5 py-3">
            <button onClick={() => scrollTo('#hero')} className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-violet-600/20 border border-violet-500/30 flex items-center justify-center group-hover:bg-violet-600/30 transition-colors">
                <Code2 className="w-4 h-4 text-violet-400" />
              </div>
              <span className="font-semibold text-white tracking-tight">
                {siteConfig.name.split(' ')[0]}<span className="text-violet-400">.</span>
              </span>
            </button>

            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map(({ href, label }) => (
                <button
                  key={href}
                  onClick={() => scrollTo(href)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${activeSection === href.slice(1) ? 'text-white' : 'text-white/50 hover:text-white/80'}`}
                >
                  {activeSection === href.slice(1) && (
                    <motion.div layoutId="nav-pill" className="absolute inset-0 bg-white/8 rounded-lg" transition={{ type: 'spring', stiffness: 400, damping: 35 }} />
                  )}
                  <span className="relative z-10">{label}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <a
                href={`mailto:${siteConfig.email}`}
                className="hidden lg:inline-flex items-center px-4 py-2 rounded-xl bg-violet-600/15 border border-violet-500/25 text-violet-300 text-sm font-medium hover:bg-violet-600/25 transition-all duration-200"
              >
                Hire Me
              </a>
              <button
                className="lg:hidden p-2 rounded-lg hover:bg-white/5 text-white/70 transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-violet-500 to-cyan-500"
          style={{ width: progressWidth }}
        />
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 pt-20 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-[#080810]/95 backdrop-blur-xl" onClick={() => setMobileOpen(false)} />
            <motion.div
              className="relative glass rounded-2xl p-5 flex flex-col gap-1"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            >
              {NAV_LINKS.map(({ href, label }, i) => (
                <motion.button
                  key={href}
                  onClick={() => scrollTo(href)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all text-left text-sm font-medium"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <span className="text-violet-400 text-xs font-mono">0{i + 1}</span>
                  {label}
                </motion.button>
              ))}
              <div className="mt-3 pt-3 border-t border-white/8">
                <a href={`mailto:${siteConfig.email}`} className="flex items-center justify-center w-full px-4 py-3 rounded-xl bg-violet-600 text-white text-sm font-medium">
                  Get In Touch
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
