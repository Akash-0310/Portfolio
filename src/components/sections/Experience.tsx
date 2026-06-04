'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, CalendarDays, ChevronDown, Award, TrendingUp } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Badge } from '@/components/ui/Badge'
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/animations'
import { experience } from '@/lib/data'

export function Experience() {
  const [expanded, setExpanded] = useState<string>('bestpeers')

  return (
    <section id="experience" className="relative section-pad">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          tag="Experience"
          title="Where I've"
          titleHighlight="shipped impact"
          description="From enterprise-scale engineering at India's largest IT firm to leading full-stack development at a fast-moving product company."
          align="center"
        />

        <motion.div
          className="flex flex-col gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {experience.map((job, i) => (
            <motion.div key={job.id} variants={fadeInUp} transition={{ delay: i * 0.15 }}>
              <motion.div
                className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: `1px solid ${expanded === job.id ? job.color + '40' : 'rgba(255,255,255,0.10)'}`,
                  boxShadow: expanded === job.id
                    ? `0 0 0 1px ${job.color}20, 0 8px 32px rgba(0,0,0,0.3)`
                    : '0 4px 20px rgba(0,0,0,0.2)',
                }}
                onClick={() => setExpanded(expanded === job.id ? '' : job.id)}
                whileHover={{ y: -2, boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
              >
                {/* Header */}
                <div className="flex items-start justify-between p-4 sm:p-6 gap-3 sm:gap-4">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 select-none"
                      style={{
                        background: `${job.color}18`,
                        color: job.color,
                        border: `1px solid ${job.color}35`,
                      }}
                    >
                      {job.logo}
                    </div>
                    <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-semibold text-white leading-tight">{job.role}</h3>
                        <Badge variant="outline">{job.type}</Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                        <span className="font-semibold" style={{ color: job.color }}>{job.company}</span>
                        <span className="flex items-center gap-1 text-white/45">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          {job.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-white/35 font-mono">
                        <CalendarDays className="w-3 h-3" />
                        {job.period}
                      </div>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: expanded === job.id ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex-shrink-0 mt-1"
                    style={{ color: expanded === job.id ? job.color : 'rgba(255,255,255,0.3)' }}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </div>

                {/* Expanded Content */}
                <AnimatePresence initial={false}>
                  {expanded === job.id && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div
                        className="mx-6 mb-6 rounded-xl p-5 flex flex-col gap-5"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.07)',
                        }}
                      >
                        <p className="text-sm text-white/60 leading-relaxed">{job.description}</p>

                        {job.impact && (
                          <div
                            className="flex items-center gap-2.5 px-4 py-3 rounded-xl"
                            style={{ background: `${job.color}12`, border: `1px solid ${job.color}25` }}
                          >
                            <TrendingUp className="w-4 h-4 flex-shrink-0" style={{ color: job.color }} />
                            <span className="text-sm font-medium" style={{ color: job.color }}>
                              {job.impact}
                            </span>
                          </div>
                        )}

                        <ul className="flex flex-col gap-3">
                          {job.highlights.map((item, j) => (
                            <motion.li
                              key={j}
                              className="flex gap-3 text-sm text-white/60 leading-relaxed"
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: j * 0.05 }}
                            >
                              <span
                                className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-[7px]"
                                style={{ backgroundColor: job.color }}
                              />
                              {item}
                            </motion.li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-2 pt-1">
                          {job.tech.map((t) => (
                            <Badge key={t} variant="outline">{t}</Badge>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-10 p-5 rounded-2xl flex items-center justify-center gap-3 text-sm"
          style={{
            background: 'rgba(251,191,36,0.06)',
            border: '1px solid rgba(251,191,36,0.18)',
          }}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <Award className="w-5 h-5 text-amber-400 flex-shrink-0" />
          <span className="text-white/60">
            <span className="text-white font-medium">Certificate of Appreciation</span>{' '}
            +{' '}
            <span className="text-white font-medium">2 Team Management Awards</span>{' '}
            at Tata Consultancy Services
          </span>
        </motion.div>
      </div>
    </section>
  )
}
