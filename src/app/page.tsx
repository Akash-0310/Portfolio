'use client'
import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { LoadingScreen } from '@/components/special/LoadingScreen'
import { CommandPalette } from '@/components/special/CommandPalette'
import { ThemeToggle } from '@/components/special/ThemeToggle'
import { CustomCursor } from '@/components/effects/CustomCursor'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Experience } from '@/components/sections/Experience'
import { Skills } from '@/components/sections/Skills'
import { Projects } from '@/components/sections/Projects'
import { GitHubStats } from '@/components/sections/GitHubStats'
// import { Blog } from '@/components/sections/Blog'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="fixed inset-0 bg-[#080810] flex items-center justify-center">
        <div className="text-white/20 text-sm font-mono">Loading...</div>
      </div>
    )
  }

  return (
    <>
      <CustomCursor />
      <CommandPalette />

      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loading" onComplete={() => setLoading(false)} />
        ) : null}
      </AnimatePresence>

      {!loading && (
        <>
          <Navbar />
          <main>
            <Hero />
            <div className="section-divider" />
            <About />
            <div className="section-divider" />
            <Experience />
            <div className="section-divider" />
            <Skills />
            <div className="section-divider" />
            <Projects />
            <div className="section-divider" />
            <GitHubStats />
            <div className="section-divider" />
            {/* <Blog />
            <div className="section-divider" /> */}
            <Contact />
          </main>
          <Footer />
          <ThemeToggle />
        </>
      )}
    </>
  )
}
