'use client'
import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ArrowRight, User, Briefcase, Code2, Mail, X } from 'lucide-react'
import { LinkedinIcon } from '@/components/ui/LinkedinIcon'
import { GithubIcon } from '@/components/ui/GithubIcon'

const COMMANDS = [
  { id: 'about', label: 'Go to About', icon: User, action: '#about', type: 'navigate' },
  { id: 'experience', label: 'Go to Experience', icon: Briefcase, action: '#experience', type: 'navigate' },
  { id: 'projects', label: 'Go to Projects', icon: Code2, action: '#projects', type: 'navigate' },
  { id: 'contact', label: 'Go to Contact', icon: Mail, action: '#contact', type: 'navigate' },
  { id: 'github', label: 'Open GitHub Profile', icon: GithubIcon, action: 'https://github.com/akashsingh', type: 'link' },
  { id: 'linkedin', label: 'Open LinkedIn', icon: LinkedinIcon, action: 'https://linkedin.com/in/akashsingh', type: 'link' },
  { id: 'email', label: 'Send an Email', icon: Mail, action: 'mailto:akashdevtech10@gmail.com', type: 'link' },
]

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)

  const filtered = COMMANDS.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  )

  const execute = useCallback((cmd: typeof COMMANDS[0]) => {
    if (cmd.type === 'navigate') {
      document.querySelector(cmd.action)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.open(cmd.action, '_blank')
    }
    setOpen(false)
    setQuery('')
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
        setQuery('')
        setSelected(0)
      }
      if (!open) return
      if (e.key === 'Escape') setOpen(false)
      if (e.key === 'ArrowDown') setSelected((s) => Math.min(s + 1, filtered.length - 1))
      if (e.key === 'ArrowUp') setSelected((s) => Math.max(s - 1, 0))
      if (e.key === 'Enter' && filtered[selected]) execute(filtered[selected])
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, filtered, selected, execute])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9990] flex items-start justify-center pt-[20vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-[#080810]/80 backdrop-blur-xl" onClick={() => setOpen(false)} />
          <motion.div
            className="relative w-full max-w-lg mx-4 rounded-2xl glass-strong overflow-hidden shadow-2xl shadow-black/40"
            initial={{ scale: 0.95, y: -20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: -20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/8">
              <Search className="w-4 h-4 text-white/30 flex-shrink-0" />
              <input
                autoFocus
                type="text"
                placeholder="Search commands..."
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelected(0) }}
                className="flex-1 bg-transparent text-white text-sm placeholder:text-white/25 outline-none"
              />
              <button onClick={() => setOpen(false)} className="text-white/30 hover:text-white/60 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-2 max-h-72 overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="text-center py-8 text-sm text-white/25">No commands found</div>
              ) : (
                filtered.map((cmd, i) => (
                  <button
                    key={cmd.id}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-150 ${
                      selected === i ? 'bg-violet-600/20 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white/80'
                    }`}
                    onClick={() => execute(cmd)}
                    onMouseEnter={() => setSelected(i)}
                  >
                    <cmd.icon className="w-4 h-4 flex-shrink-0 text-violet-400" />
                    <span className="text-sm font-medium">{cmd.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-auto opacity-40" />
                  </button>
                ))
              )}
            </div>

            <div className="px-5 py-3 border-t border-white/8 flex items-center gap-4">
              {[['↑↓', 'Navigate'], ['↵', 'Select'], ['Esc', 'Close']].map(([key, desc]) => (
                <div key={key} className="flex items-center gap-1.5 text-xs text-white/25">
                  <kbd className="px-1.5 py-0.5 rounded-md bg-white/8 font-mono">{key}</kbd>
                  <span>{desc}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function CommandPaletteHint() {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-3 py-2 rounded-xl glass text-xs text-white/30 hidden md:flex"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2 }}
    >
      <kbd className="px-1.5 py-0.5 rounded bg-white/8 font-mono text-xs">⌘K</kbd>
      <span>Command palette</span>
    </motion.div>
  )
}
