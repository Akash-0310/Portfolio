'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Code2, Activity, GitCommit, Calendar, Flame, Award } from 'lucide-react'
import { GithubIcon } from '@/components/ui/GithubIcon'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/animations'
import { siteConfig } from '@/lib/data'
import { fetchGitHubData, FALLBACK, type GitHubData } from '@/lib/github'

const INTENSITY_COLORS = [
  'rgba(255,255,255,0.04)',
  'rgba(139,92,246,0.25)',
  'rgba(139,92,246,0.45)',
  'rgba(139,92,246,0.7)',
  'rgba(139,92,246,0.95)',
]

const WEEKS = 52
const PLACEHOLDER_CALENDAR = Array.from({ length: WEEKS * 7 }, () => 0)

function chunkWeeks(levels: number[]): number[][] {
  const trimmed = levels.slice(-(WEEKS * 7))
  const weeks: number[][] = []
  for (let i = 0; i < trimmed.length; i += 7) weeks.push(trimmed.slice(i, i + 7))
  return weeks
}

export function GitHubStats() {
  const [data, setData] = useState<GitHubData>(FALLBACK)

  useEffect(() => {
    let active = true
    const load = () =>
      fetchGitHubData()
        .then((fresh) => {
          // Merge over the last good state: fields that couldn't be fetched this
          // round are simply absent, so they keep their previous (good) values
          // instead of reverting to the fallback.
          if (active) setData((prev) => ({ ...prev, ...fresh }))
        })
        .catch(() => {})

    load()
    // Refresh every minute so the section keeps matching GitHub without a reload.
    const id = setInterval(load, 60_000)
    return () => {
      active = false
      clearInterval(id)
    }
  }, [])

  const stats = [
    { icon: GitCommit, label: 'Total Commits', value: `${data.commits}+`, color: '#8b5cf6' },
    { icon: Star, label: 'Repository Stars', value: `${data.stars}`, color: '#f59e0b' },
    { icon: Code2, label: 'Public Repos', value: `${data.repos}`, color: '#06b6d4' },
    { icon: Activity, label: 'Contributions', value: `${data.contributions}`, color: '#10b981' },
  ]

  const calendar = data.calendar.length ? data.calendar : PLACEHOLDER_CALENDAR
  const weeks = chunkWeeks(calendar)

  const streakStats = [
    { icon: Activity, label: 'Past year', value: `${data.contributions}`, color: '#10b981' },
    { icon: Flame, label: 'Current streak', value: `${data.currentStreak}d`, color: '#f59e0b' },
    { icon: Award, label: 'Longest streak', value: `${data.longestStreak}d`, color: '#8b5cf6' },
  ]

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
          {stats.map((stat, i) => (
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
                <div className="text-2xl font-bold text-white tabular-nums">{stat.value}</div>
                <div className="text-xs text-white/40 mt-0.5">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
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
              <span className="text-xs text-white/30 font-mono">Last 12 months</span>
            </div>

            <div
              className="w-full"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(52, 1fr)', gap: '2px' }}
            >
              {weeks.map((week, weekIdx) => (
                <div key={weekIdx} className="flex flex-col gap-0.5">
                  {week.map((level, dayIdx) => (
                    <div
                      key={dayIdx}
                      className="rounded-sm w-full"
                      style={{
                        aspectRatio: '1',
                        background: INTENSITY_COLORS[level] || INTENSITY_COLORS[0],
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs text-white/25">
              <span>Less</span>
              {INTENSITY_COLORS.map((c, i) => (
                <div key={i} className="w-2.5 h-2.5 rounded-sm" style={{ background: c }} />
              ))}
              <span>More</span>
            </div>

            {/* Streak stats fill the lower half so the card matches the languages panel height */}
            <div className="grid grid-cols-3 gap-3 mt-auto pt-4 border-t border-white/6">
              {streakStats.map((s) => (
                <div key={s.label} className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <s.icon className="w-3.5 h-3.5" style={{ color: s.color }} />
                    <span className="text-lg font-bold text-white tabular-nums">{s.value}</span>
                  </div>
                  <span className="text-[11px] text-white/35">{s.label}</span>
                </div>
              ))}
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
              {data.languages.map((lang, i) => (
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
