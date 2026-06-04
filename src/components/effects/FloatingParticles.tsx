'use client'
import { motion } from 'framer-motion'

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: (i * 37 + 11) % 100,
  y: (i * 53 + 23) % 100,
  size: (i % 3) + 1,
  duration: 4 + (i % 5),
  delay: (i * 0.4) % 3,
  color: i % 3 === 0 ? 'rgba(139,92,246,0.4)' : i % 3 === 1 ? 'rgba(6,182,212,0.35)' : 'rgba(244,63,94,0.3)',
}))

export function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
          animate={{
            y: [0, -20, 0, -10, 0],
            x: [0, 5, -5, 3, 0],
            opacity: [0.3, 0.7, 0.4, 0.8, 0.3],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export function TechOrbit({ tech }: { tech: string[] }) {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      {tech.slice(0, 6).map((item, i) => {
        const angle = (i / 6) * 360
        const radius = 180
        const x = Math.cos((angle * Math.PI) / 180) * radius
        const y = Math.sin((angle * Math.PI) / 180) * radius
        return (
          <motion.div
            key={item}
            className="absolute top-1/2 left-1/2 px-3 py-1 rounded-full glass text-xs text-white/50 whitespace-nowrap"
            style={{ x: x - 30, y: y - 12 }}
            animate={{
              rotate: [0, 360],
              x: [x - 30, Math.cos(((angle + 10) * Math.PI) / 180) * radius - 30, x - 30],
              y: [y - 12, Math.sin(((angle + 10) * Math.PI) / 180) * radius - 12, y - 12],
            }}
            transition={{ duration: 20 + i * 2, repeat: Infinity, ease: 'linear' }}
          >
            {item}
          </motion.div>
        )
      })}
    </div>
  )
}
