'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/animations'
import { skills } from '@/lib/data'

type SkillCategory = keyof typeof skills

function SkillBar({ name, level, color, delay = 0 }: { name: string; level: number; color: string; delay?: number }) {
  return (
    <motion.div
      className="flex flex-col gap-1.5"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm text-white/70 font-medium">{name}</span>
        <span className="text-xs font-mono" style={{ color }}>{level}%</span>
      </div>
      <div className="h-1.5 bg-white/6 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}80)` }}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </motion.div>
  )
}

function SkillNode({ name, level, color, index, total }: { name: string; level: number; color: string; index: number; total: number }) {
  const angle = (index / total) * 360 - 90
  const radius = 120
  const x = Math.cos((angle * Math.PI) / 180) * radius
  const y = Math.sin((angle * Math.PI) / 180) * radius
  const size = 28 + (level / 100) * 20

  return (
    <motion.div
      className="absolute flex items-center justify-center rounded-full border text-xs font-bold cursor-default"
      style={{
        width: size,
        height: size,
        left: '50%',
        top: '50%',
        x: x - size / 2,
        y: y - size / 2,
        borderColor: `${color}40`,
        background: `${color}15`,
        color,
        fontSize: 'calc(9px * var(--font-scale))',
      }}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, type: 'spring', stiffness: 300, damping: 25 }}
      whileHover={{ scale: 1.2, zIndex: 10 }}
      title={`${name}: ${level}%`}
    >
      {name.slice(0, 2).toUpperCase()}
    </motion.div>
  )
}

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('frontend')
  const categories = Object.keys(skills) as SkillCategory[]
  const active = skills[activeCategory]

  return (
    <section id="skills" className="relative section-pad overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.5), transparent)' }} />
      </div>

      <div className="max-w-6xl mx-auto">
        <SectionHeader
          tag="Tech Stack"
          title="Tools I build"
          titleHighlight="with"
          description="A full-spectrum skill set across frontend, backend, database, and cloud infrastructure."
          align="center"
        />

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="flex flex-col gap-8">
            <motion.div
              className="flex flex-wrap gap-2"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              {categories.map((cat) => {
                const catData = skills[cat]
                return (
                  <motion.button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      activeCategory === cat
                        ? 'text-white shadow-lg'
                        : 'glass text-white/50 hover:text-white/80'
                    }`}
                    style={activeCategory === cat ? {
                      background: `${catData.color}20`,
                      border: `1px solid ${catData.color}40`,
                      boxShadow: `0 0 20px ${catData.color}20`,
                      color: catData.color,
                    } : {}}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>{catData.icon}</span>
                    {catData.label}
                  </motion.button>
                )
              })}
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                className="flex flex-col gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {active.items.map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    color={active.color}
                    delay={i * 0.05}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div
            className="relative hidden lg:flex items-center justify-center"
            style={{ height: 340 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportConfig}
          >
            <motion.div
              className="absolute w-24 h-24 rounded-full flex items-center justify-center z-10"
              style={{ background: `${active.color}15`, border: `1px solid ${active.color}30` }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-3xl">{active.icon}</span>
            </motion.div>

            {[100, 140, 180].map((r) => (
              <motion.div
                key={r}
                className="absolute rounded-full border"
                style={{
                  width: r * 2,
                  height: r * 2,
                  borderColor: `${active.color}12`,
                }}
                animate={{ scale: [1, 1.02, 1], rotate: [0, r === 140 ? 360 : -360] }}
                transition={{ duration: 20 + r / 10, repeat: Infinity, ease: 'linear' }}
              />
            ))}

            {active.items.map((skill, i) => (
              <SkillNode
                key={skill.name}
                name={skill.name}
                level={skill.level}
                color={active.color}
                index={i}
                total={active.items.length}
              />
            ))}
          </motion.div>
        </div>

        <motion.div
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {categories.map((cat) => {
            const catData = skills[cat]
            return (
              <motion.div
                key={cat}
                className="p-4 rounded-2xl glass text-center cursor-pointer hover:border-white/15 transition-all"
                variants={fadeInUp}
                whileHover={{ y: -3 }}
                onClick={() => setActiveCategory(cat)}
              >
                <div className="text-2xl mb-2">{catData.icon}</div>
                <div className="text-sm font-semibold text-white mb-1">{catData.label}</div>
                <div className="text-xs text-white/35">{catData.items.length} technologies</div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
