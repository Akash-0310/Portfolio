'use client'
import { useState, useRef } from 'react'
import { motion, AnimatePresence, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion'
import { ExternalLink, ArrowRight, X, ChevronRight, Layers, Zap, Shield, Globe } from 'lucide-react'
import { GithubIcon } from '@/components/ui/GithubIcon'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Badge } from '@/components/ui/Badge'
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/animations'
import { projects } from '@/lib/data'
import type { Project } from '@/lib/data'

function ProjectCard({ project, onClick, delay }: { project: Project; onClick: () => void; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const rotateX = useSpring(0, { stiffness: 400, damping: 35 })
  const rotateY = useSpring(0, { stiffness: 400, damping: 35 })
  const mouseX = useMotionValue(50)
  const mouseY = useMotionValue(50)
  const shine = useMotionTemplate`radial-gradient(circle at ${mouseX}% ${mouseY}%, rgba(255,255,255,0.09), transparent 55%)`

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    rotateX.set((0.5 - y) * 12)
    rotateY.set((x - 0.5) * 12)
    mouseX.set(x * 100)
    mouseY.set(y * 100)
  }

  const onMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div variants={fadeInUp} transition={{ delay }} style={{ perspective: 1200 }}>
      <motion.div
        ref={ref}
        className="group relative rounded-3xl glass overflow-hidden cursor-pointer h-full"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
        <motion.div
          className="absolute inset-0 pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: shine }}
        />

        <div className={`relative h-52 bg-gradient-to-br ${project.gradient} flex items-end p-6 overflow-hidden`}>
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 grid-bg" />
          </div>
          <div className="absolute top-6 right-6 flex items-center gap-2">
            <Badge variant="success">{project.status}</Badge>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: 'linear-gradient(to top, var(--page-bg), transparent)' }} />
          <div className="relative z-10">
            <div className="text-xs font-mono mb-1.5 opacity-60" style={{ color: project.color }}>
              {project.category}
            </div>
            <h3 className="text-2xl font-bold text-white">{project.title}</h3>
            <p className="text-sm font-medium mt-0.5" style={{ color: project.color }}>{project.subtitle}</p>
          </div>
        </div>

        <div className="p-6 flex flex-col gap-4">
          <p className="text-sm text-white/55 leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, 5).map((t) => (
              <Badge key={t} variant="outline">{t}</Badge>
            ))}
            {project.tech.length > 5 && (
              <Badge variant="outline">+{project.tech.length - 5}</Badge>
            )}
          </div>
          <div className="flex items-center justify-between pt-1">
            <div className="flex gap-2">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-8 h-8 rounded-lg glass flex items-center justify-center text-white/40 hover:text-white/80 transition-colors">
                  <GithubIcon className="w-3.5 h-3.5" />
                </a>
              )}
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-8 h-8 rounded-lg glass flex items-center justify-center text-white/40 hover:text-white/80 transition-colors">
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-white/30 font-medium group-hover:text-violet-400 transition-colors">
              View Case Study
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div className="absolute inset-0 backdrop-blur-xl" style={{ background: 'var(--page-bg-90)' }} onClick={onClose} />
      <motion.div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl glass-strong"
        initial={{ scale: 0.9, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 40, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 350, damping: 35 }}
      >
        <div className="relative overflow-hidden rounded-t-3xl">
          <div className={`h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
            <div className="text-6xl opacity-80">{project.category.split(' · ')[0] === 'Healthcare' ? '🏥' : '🛍'}</div>
          </div>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--page-bg), transparent, transparent)' }} />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-xl glass flex items-center justify-center text-white/60 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 sm:p-8 flex flex-col gap-6">
          <div>
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                <p className="text-sm font-medium mt-0.5" style={{ color: project.color }}>{project.subtitle}</p>
              </div>
              <Badge variant="success">{project.status}</Badge>
            </div>
            <p className="text-sm text-white/50 mt-0.5 tracking-wide">{project.category}</p>
          </div>

          <p className="text-base text-white/65 leading-relaxed">{project.longDescription}</p>

          <div className="grid grid-cols-2 gap-3">
            {project.metrics.map((m) => (
              <div key={m.label} className="p-3 rounded-xl glass text-center">
                <div className="text-sm font-bold text-white">{m.value}</div>
                <div className="text-xs text-white/35 mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-white/50 uppercase tracking-widest">Key Features</h4>
            <ul className="grid sm:grid-cols-2 gap-2">
              {project.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                  <ChevronRight className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: project.color }} />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <Badge key={t} variant="outline">{t}</Badge>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-medium hover:bg-violet-500 transition-colors">
                <Globe className="w-4 h-4" /> Live Demo
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass text-white/70 text-sm font-medium hover:text-white transition-colors">
                <GithubIcon className="w-4 h-4" /> Source Code
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section id="projects" className="relative section-pad">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          tag="Projects"
          title="Systems I've"
          titleHighlight="architected"
          description="Production-grade applications spanning healthcare AI, e-commerce, and cloud infrastructure."
          align="center"
        />

        <motion.div
          className="grid sm:grid-cols-2 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
              delay={i * 0.15}
            />
          ))}
        </motion.div>

        <motion.div
          className="mt-16 p-8 rounded-3xl glass text-center flex flex-col items-center gap-4"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <div className="flex items-center gap-3">
            {[Layers, Shield, Zap].map((Icon, i) => (
              <div key={i} className="w-10 h-10 rounded-xl bg-violet-600/15 border border-violet-500/25 flex items-center justify-center">
                <Icon className="w-5 h-5 text-violet-400" />
              </div>
            ))}
          </div>
          <div>
            <p className="text-lg font-semibold text-white mb-1">More projects on the way</p>
            <p className="text-sm text-white/40">Currently building in stealth. Check GitHub for the latest.</p>
          </div>
          <a
            href="https://github.com/Akash-0310"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass text-white/60 text-sm font-medium hover:text-white transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
            View GitHub Profile
          </a>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
