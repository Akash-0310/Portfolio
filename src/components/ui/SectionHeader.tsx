'use client'
import { motion } from 'framer-motion'
import { fadeInUp, viewportConfig } from '@/lib/animations'

interface SectionHeaderProps {
  tag?: string
  title: string
  titleHighlight?: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeader({
  tag,
  title,
  titleHighlight,
  description,
  align = 'center',
}: SectionHeaderProps) {
  return (
    <div className={`flex flex-col gap-3 ${align === 'center' ? 'items-center text-center' : 'items-start'} mb-10 lg:mb-16`}>
      {tag && (
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <span className="section-subtitle text-violet-400 flex items-center gap-2">
            <span className="w-8 h-px bg-violet-400/50" />
            {tag}
            <span className="w-8 h-px bg-violet-400/50" />
          </span>
        </motion.div>
      )}

      <motion.h2
        className="section-title text-white"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        transition={{ delay: 0.1 }}
      >
        {title}{' '}
        {titleHighlight && (
          <span className="text-gradient">{titleHighlight}</span>
        )}
      </motion.h2>

      {description && (
        <motion.p
          className="text-sm sm:text-base lg:text-lg text-white/50 max-w-2xl leading-relaxed"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          transition={{ delay: 0.2 }}
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
