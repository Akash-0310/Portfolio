'use client'
import { motion } from 'framer-motion'
import { Mail, ArrowUp } from 'lucide-react'
import { LinkedinIcon } from '@/components/ui/LinkedinIcon'
import { GithubIcon } from '@/components/ui/GithubIcon'
import { InstagramIcon } from '@/components/ui/InstagramIcon'
import { siteConfig } from '@/lib/data'

export function Footer() {
  return (
    <footer className="relative border-t border-white/8 mt-16">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-semibold text-white">
              {siteConfig.name}<span className="text-violet-400">.</span>
            </span>
            <span className="text-xs text-white/30">Full Stack Developer · Indore, India</span>
          </div>

          <div className="flex items-center gap-3">
            {[
              { href: siteConfig.github, Icon: GithubIcon, label: 'GitHub' },
              { href: siteConfig.linkedin, Icon: LinkedinIcon, label: 'LinkedIn' },
              { href: siteConfig.instagram, Icon: InstagramIcon, label: 'Instagram' },
              { href: `mailto:${siteConfig.email}`, Icon: Mail, label: 'Email' },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-lg glass flex items-center justify-center text-white/40 hover:text-white/80 transition-all duration-200"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-white/25">© 2025 {siteConfig.name}</span>
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-9 h-9 rounded-lg glass flex items-center justify-center text-white/40 hover:text-white/80 transition-all duration-200"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  )
}
