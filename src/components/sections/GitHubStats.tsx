'use client'
import { motion } from 'framer-motion'
import { Star, GitFork, Code2, TrendingUp, Activity, GitCommit, Calendar } from 'lucide-react'
import { GithubIcon } from '@/components/ui/GithubIcon'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/animations'
import { siteConfig } from '@/lib/data'

const STATS = [
  { icon: GitCommit, label: 'Total Commits', value: '500+', color: '#8b5cf6' },
  { icon: Star, label: 'Repository Stars', value: '25+', color: '#f59e0b' },
  { icon: Code2, label: 'Public Repos', value: '15+', color: '#06b6d4' },
  { icon: Activity, label: 'Contributions', value: '300+', color: '#10b981' },
]

const TOP_LANGS = [
  { name: 'JavaScript', percent: 42, color: '#f7df1e' },
  { name: 'TypeScript', percent: 18, color: '#3178c6' },
  { name: 'CSS/Tailwind', percent: 15, color: '#06b6d4' },
  { name: 'HTML', percent: 12, color: '#e34f26' },
  { name: 'Shell', percent: 8, color: '#10b981' },
  { name: 'Other', percent: 5, color: '#6b7280' },
]

function seededRand(seed: number): number {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

const CONTRIBUTIONS = Array.from({ length: 52 * 7 }, (_, i) => {
  const week = Math.floor(i / 7)
  const day = i % 7
  const isWeekend = day === 0 || day === 6
  const threshold = isWeekend ? 0.25 : 0.55
  const spike = [5, 12, 22, 35, 42, 48].includes(week) ? 0.25 : 0
  const r = seededRand(i * 7 + 13)
  return r < threshold + spike ? Math.floor(seededRand(i * 3 + 7) * 4) + 1 : 0
})

const INTENSITY_COLORS = ['transparent', 'rgba(139,92,246,0.2)', 'rgba(139,92,246,0.4)', 'rgba(139,92,246,0.65)', 'rgba(139,92,246,0.9)']

export function GitHubStats() {
  return (
    <section id="github" className="relative section-pad">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          tag="GitHub Activity"
          title="Code that"
          titleHighlight="ships"
          description="A snapshot of my development activity and the technologies I work with daily."
          align="center"
        />

        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="p-4 rounded-2xl glass flex flex-col gap-2 hover:border-white/15 transition-all"
              variants={fadeInUp}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -3 }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${stat.color}20`, border: `1px solid ${stat.color}30` }}>
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/40 mt-0.5">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <motion.div
            className="lg:col-span-2 p-6 rounded-2xl glass flex flex-col gap-4"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-violet-400" />
                <span className="text-sm font-semibold text-white">Contribution Activity</span>
              </div>
              <span className="text-xs text-white/30 font-mono">2024 – 2025</span>
            </div>

            <div className="overflow-x-auto pb-2">
              <div className="flex gap-0.5" style={{ minWidth: 'fit-content' }}>
                {Array.from({ length: 52 }, (_, weekIdx) => (
                  <div key={weekIdx} className="flex flex-col gap-0.5">
                    {Array.from({ length: 7 }, (_, dayIdx) => {
                      const val = CONTRIBUTIONS[weekIdx * 7 + dayIdx]
                      return (
                        <div
                          key={dayIdx}
                          className="w-2.5 h-2.5 rounded-sm"
                          style={{ background: INTENSITY_COLORS[val] || 'rgba(255,255,255,0.04)' }}
                          title={`${val} contributions`}
                        />
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-white/25">
              <span>Less</span>
              {INTENSITY_COLORS.map((c, i) => (
                <div key={i} className="w-2.5 h-2.5 rounded-sm" style={{ background: c || 'rgba(255,255,255,0.04)' }} />
              ))}
              <span>More</span>
            </div>
          </motion.div>

          <motion.div
            className="p-6 rounded-2xl glass flex flex-col gap-4"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Code2 className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-semibold text-white">Top Languages</span>
            </div>

            <div className="flex flex-col gap-3">
              {TOP_LANGS.map((lang, i) => (
                <motion.div key={lang.name} className="flex flex-col gap-1.5"
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs text-white/60">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: lang.color }} />
                      {lang.name}
                    </span>
                    <span className="text-xs font-mono text-white/35">{lang.percent}%</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: lang.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.percent}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07 + 0.2, duration: 0.6 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 mt-auto pt-4 border-t border-white/6 text-sm text-white/40 hover:text-white/70 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              View Full Profile
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
