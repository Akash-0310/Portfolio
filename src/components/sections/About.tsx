'use client'
import { motion } from 'framer-motion'
import { GraduationCap, MapPin, Award, Coffee, Code2, Zap, ArrowUpRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/animations'
import { siteConfig, stats } from '@/lib/data'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'

const PRINCIPLES = [
  { icon: '🏗', title: 'Architecture First', desc: 'I design systems before I write code. Scalability is a feature, not an afterthought.' },
  { icon: '⚡', title: 'Performance by Default', desc: 'Every millisecond matters. I optimize at every layer — queries, bundles, renders.' },
  { icon: '🤝', title: 'Clear Communication', desc: 'Technical excellence and clear communication go together. One without the other is incomplete.' },
  { icon: '🔄', title: 'Ship & Iterate', desc: 'Perfect is the enemy of good. I ship fast, measure, and improve continuously.' },
]

function StatCard({ label, value, suffix }: { label: string; value: string; suffix: string }) {
  const { ref, inView } = useInView({ triggerOnce: true })
  const numericVal = parseInt(value, 10)

  return (
    <div ref={ref} className="flex flex-col gap-1 p-5 rounded-2xl text-center" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
      <div className="text-3xl font-bold text-white tabular-nums">
        {inView && !isNaN(numericVal) ? (
          <CountUp end={numericVal} duration={1.5} suffix={suffix} />
        ) : (
          <span>{value}{suffix}</span>
        )}
      </div>
      <div className="text-xs text-white/40">{label}</div>
    </div>
  )
}

export function About() {
  return (
    <section id="about" className="relative section-pad">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          tag="About Me"
          title="Engineer by craft,"
          titleHighlight="builder by passion"
          description="From curious computer science student to shipping production systems at scale — here's the story so far."
          align="center"
        />

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          <motion.div
            className="flex flex-col gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <motion.div className="flex flex-col gap-5" variants={fadeInUp}>
              <p className="text-base text-white/60 leading-relaxed">
                I&apos;m <strong className="text-white font-semibold">{siteConfig.name}</strong> — a Full Stack Developer based in{' '}
                <span className="text-violet-400">Indore, India</span>. I build scalable web applications using the MERN stack and cloud infrastructure, with a sharp focus on AI integration and performance.
              </p>
              <p className="text-base text-white/60 leading-relaxed">
                At <strong className="text-white font-medium">Tata Consultancy Services</strong>, I learned what enterprise-scale engineering actually demands — clean code, rigorous testing, and communication that bridges technical and business goals. I left with two Team Management Awards and a deeper understanding of what it means to ship quality at scale.
              </p>
              <p className="text-base text-white/60 leading-relaxed">
                At <strong className="text-white font-medium">BestPeers Infosystem</strong>, I&apos;m leading full-stack development for real clients — architecting microservices, integrating AI APIs, and deploying on AWS. Every project is a new engineering challenge, and I thrive in that environment.
              </p>
            </motion.div>

            <motion.div className="flex flex-wrap gap-3" variants={fadeInUp}>
              {[
                { icon: MapPin, text: 'Indore, M.P.' },
                { icon: GraduationCap, text: 'B.Tech SATI (8.34 CGPA)' },
                { icon: Award, text: '3 Awards at TCS' },
                { icon: Coffee, text: 'MERN Stack Native' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/65" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  <Icon className="w-3.5 h-3.5 text-violet-400 flex-shrink-0" />
                  {text}
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp}>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 font-medium group"
              >
                Let&apos;s work together
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </motion.div>
          </motion.div>

          <div className="flex flex-col gap-8">
            <motion.div
              className="grid grid-cols-2 gap-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              {stats.map((stat) => (
                <motion.div key={stat.label} variants={fadeInUp}>
                  <StatCard label={stat.label} value={stat.value} suffix={stat.suffix} />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-col gap-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              <motion.h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-1" variants={fadeInUp}>
                Work Philosophy
              </motion.h3>
              {PRINCIPLES.map((p) => (
                <motion.div
                  key={p.title}
                  className="flex gap-4 p-4 rounded-xl transition-all duration-200 group cursor-default"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}
                  variants={fadeInUp}
                  whileHover={{ x: 4 }}
                >
                  <span className="text-2xl leading-none mt-0.5 flex-shrink-0">{p.icon}</span>
                  <div>
                    <div className="text-sm font-semibold text-white mb-0.5">{p.title}</div>
                    <div className="text-xs text-white/40 leading-relaxed">{p.desc}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
