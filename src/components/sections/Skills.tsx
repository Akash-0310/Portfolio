'use client'
import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/animations'

const primaryCategories = [
  {
    label: 'Frontend',
    color: '#8b5cf6',
    icon: '◈',
    techs: ['React.js', 'Next.js', 'JavaScript ES6+', 'TypeScript', 'Tailwind CSS', 'HTML5 / CSS3', 'Bootstrap'],
  },
  {
    label: 'Backend',
    color: '#06b6d4',
    icon: '◎',
    techs: ['Node.js', 'Express.js', 'REST APIs', 'Microservices', 'JWT Auth', 'Socket.io', 'Strapi', 'Nginx'],
  },
  {
    label: 'Database',
    color: '#f59e0b',
    icon: '◉',
    techs: ['MongoDB', 'MySQL', 'Redis', 'Firebase', 'Prisma'],
  },
]

const secondaryCategories = [
  {
    label: 'Deployment',
    color: '#10b981',
    icon: '▲',
    techs: ['AWS', 'Azure', 'Vercel', 'Netlify', 'Render', 'Docker', 'Jenkins', 'CI/CD'],
  },
  {
    label: 'Tools',
    color: '#f43f5e',
    icon: '◇',
    techs: ['Git', 'GitHub', 'GitLab', 'Figma', 'Canva', 'Jest', 'Playwright', 'Sentry', 'Jira', 'Grafana', 'Notion', 'Postman', 'VS Code'],
  },
  {
    label: 'Languages',
    color: '#3b82f6',
    icon: '◈',
    techs: ['JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Python', 'C', 'C++'],
  },
]

function TechCard({ name, color, delay = 0 }: { name: string; color: string; delay?: number }) {
  return (
    <motion.span
      className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium cursor-default select-none"
      style={{
        background: `${color}10`,
        border: `1px solid ${color}28`,
        color: `${color}bb`,
        boxShadow: `0 0 8px ${color}10`,
      }}
      initial={{ opacity: 0, scale: 0.88 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.3, ease: 'easeOut' }}
      whileHover={{
        boxShadow: `0 0 18px ${color}55, 0 0 6px ${color}30`,
        borderColor: `${color}60`,
        scale: 1.07,
        color,
      }}
    >
      {name}
    </motion.span>
  )
}

function CategoryColumn({
  label,
  color,
  icon,
  techs,
  baseDelay = 0,
}: {
  label: string
  color: string
  icon: string
  techs: string[]
  baseDelay?: number
}) {
  return (
    <motion.div
      className="flex flex-col gap-3 p-5 rounded-2xl transition-colors duration-200"
      style={{
        background: `${color}07`,
        border: `1px solid ${color}18`,
      }}
      variants={fadeInUp}
      whileHover={{ borderColor: `${color}35` }}
    >
      <div className="flex items-center gap-2">
        <span className="text-base leading-none" style={{ color }}>{icon}</span>
        <h3 className="text-sm font-semibold text-white/80 tracking-wide uppercase">{label}</h3>
      </div>
      <div className="h-px" style={{ background: `${color}22` }} />
      <div className="flex flex-wrap gap-2">
        {techs.map((tech, i) => (
          <TechCard key={tech} name={tech} color={color} delay={baseDelay + i * 0.05} />
        ))}
      </div>
    </motion.div>
  )
}

export function Skills() {
  return (
    <section id="skills" className="relative section-pad overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute top-1/4 right-0 w-96 h-96 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.5), transparent)' }}
        />
        <div
          className="absolute bottom-1/3 left-0 w-80 h-80 rounded-full opacity-4"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.4), transparent)' }}
        />
      </div>

      <div className="max-w-6xl mx-auto">
        <SectionHeader
          tag="Tech Stack"
          title="Tools I build"
          titleHighlight="with"
          description="A full-spectrum skill set across frontend, backend, database, and cloud infrastructure."
          align="center"
        />

        <div className="flex flex-col gap-5 mt-12">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {primaryCategories.map((cat, i) => (
              <CategoryColumn key={cat.label} {...cat} baseDelay={i * 0.08} />
            ))}
          </motion.div>

          <div className="h-px bg-white/5" />

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {secondaryCategories.map((cat, i) => (
              <CategoryColumn key={cat.label} {...cat} baseDelay={i * 0.08} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
