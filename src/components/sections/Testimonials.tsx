'use client'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/animations'
import { testimonials } from '@/lib/data'

export function Testimonials() {
  return (
    <section id="testimonials" className="relative section-pad overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px]"
          style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(139,92,246,0.08), transparent 70%)' }} />
      </div>

      <div className="max-w-6xl mx-auto">
        <SectionHeader
          tag="Social Proof"
          title="What colleagues"
          titleHighlight="are saying"
          align="center"
        />

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              className="group relative p-7 rounded-2xl glass hover:border-white/15 transition-all duration-300 flex flex-col gap-5"
              variants={fadeInUp}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="flex items-start justify-between">
                <Quote className="w-8 h-8 text-violet-400/30" />
                <div className="flex">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>

              <p className="text-sm text-white/60 leading-relaxed flex-1">
                &ldquo;{t.content}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-3 border-t border-white/6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500/30 to-cyan-500/30 border border-white/10 flex items-center justify-center text-xs font-bold text-white">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-white/40">{t.role} · {t.company}</div>
                </div>
              </div>

              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'radial-gradient(circle 200px at 50% 50%, rgba(139,92,246,0.05), transparent)' }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
