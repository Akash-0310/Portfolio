'use client'
import { useEffect, useRef } from 'react'

interface Star {
  px: number  // r * cos(theta) — base position before rotation
  py: number  // r * sin(theta)
  size: number
  alpha: number
  cr: number
  cg: number
  cb: number
}

interface PinkCluster {
  px: number
  py: number
  radius: number
  alpha: number
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.max(0, Math.min(1, t))
}

function armColor(r: number): [number, number, number] {
  const t = r / 450
  if (t < 0.15) {
    // warm white-gold near core
    const s = t / 0.15
    return [255, Math.round(lerp(255, 220, s)), Math.round(lerp(200, 255, s))]
  } else if (t < 0.45) {
    // warm gold → purple
    const s = (t - 0.15) / 0.3
    return [Math.round(lerp(230, 160, s)), Math.round(lerp(190, 70, s)), 255]
  } else {
    // purple → blue outer halo
    const s = (t - 0.45) / 0.55
    return [Math.round(lerp(160, 40, s)), Math.round(lerp(70, 130, s)), 255]
  }
}

function buildGalaxy(): { stars: Star[]; clusters: PinkCluster[] } {
  const stars: Star[] = []
  const clusters: PinkCluster[] = []
  const ARMS = 2
  const TIGHTNESS = 4.6

  // Deep-space background stars
  for (let i = 0; i < 300; i++) {
    const r = 120 + Math.random() * 560
    const theta = Math.random() * 2 * Math.PI
    const bright = Math.random()
    stars.push({
      px: r * Math.cos(theta),
      py: r * Math.sin(theta),
      size: bright > 0.96 ? 1.5 + Math.random() * 1.0 : 0.3 + Math.random() * 0.5,
      alpha: bright > 0.96 ? 0.7 + Math.random() * 0.3 : 0.05 + Math.random() * 0.22,
      cr: 200 + ~~(Math.random() * 55),
      cg: 200 + ~~(Math.random() * 55),
      cb: 255,
    })
  }

  // Spiral arm stars
  for (let arm = 0; arm < ARMS; arm++) {
    const offset = (arm * Math.PI * 2) / ARMS
    const count = 600

    for (let i = 0; i < count; i++) {
      const t = (i / count) * 0.97 + 0.015
      const r = 22 + t * 440
      const angle = TIGHTNESS * Math.sqrt(t) + offset
      const spread = 0.38 * (0.15 + t * 2.2)
      const jitter = (Math.random() - 0.5) * spread
      const theta = angle + jitter

      const [cr, cg, cb] = armColor(r)
      const baseBright = r < 80 ? 0.55 + Math.random() * 0.45 : 0.12 + Math.random() * 0.65

      stars.push({
        px: r * Math.cos(theta),
        py: r * Math.sin(theta),
        size: r < 55 ? 0.7 + Math.random() * 2.2 : 0.4 + Math.random() * 1.3,
        alpha: baseBright,
        cr, cg, cb,
      })
    }

    // Pink star-forming clusters along arm
    for (let c = 0; c < 16; c++) {
      const t = 0.06 + (c / 16) * 0.80
      const r = 22 + t * 440
      const angle = TIGHTNESS * Math.sqrt(t) + offset + (Math.random() - 0.5) * 0.25
      clusters.push({
        px: r * Math.cos(angle),
        py: r * Math.sin(angle),
        radius: 4 + Math.random() * 9,
        alpha: 0.5 + Math.random() * 0.5,
      })
    }
  }

  return { stars, clusters }
}

export function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let rot = 0
    const { stars, clusters } = buildGalaxy()

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const draw = () => {
      const W = canvas.width
      const H = canvas.height
      ctx.clearRect(0, 0, W, H)
      const cx = W / 2
      const cy = H / 2

      // --- Outer blue halo ---
      const gBlue = ctx.createRadialGradient(cx, cy, 100, cx, cy, 560)
      gBlue.addColorStop(0, 'rgba(30,70,255,0.12)')
      gBlue.addColorStop(0.4, 'rgba(20,50,200,0.07)')
      gBlue.addColorStop(0.75, 'rgba(10,20,120,0.04)')
      gBlue.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = gBlue
      ctx.beginPath(); ctx.arc(cx, cy, 560, 0, Math.PI * 2); ctx.fill()

      // --- Purple mid glow ---
      const gPurple = ctx.createRadialGradient(cx, cy, 0, cx, cy, 280)
      gPurple.addColorStop(0, 'rgba(180,80,255,0.22)')
      gPurple.addColorStop(0.45, 'rgba(110,40,220,0.13)')
      gPurple.addColorStop(0.8, 'rgba(50,15,140,0.05)')
      gPurple.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = gPurple
      ctx.beginPath(); ctx.arc(cx, cy, 280, 0, Math.PI * 2); ctx.fill()

      // --- Galaxy disk (tilted + flattened) ---
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(-0.32)   // ~18° tilt like the reference
      ctx.scale(1, 0.36)  // flatten to elliptical disk

      const cosR = Math.cos(rot)
      const sinR = Math.sin(rot)

      // Stars
      for (const s of stars) {
        const x = s.px * cosR - s.py * sinR
        const y = s.px * sinR + s.py * cosR
        ctx.beginPath()
        ctx.arc(x, y, s.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${s.cr},${s.cg},${s.cb},${s.alpha})`
        ctx.fill()
      }

      // Pink clusters
      for (const c of clusters) {
        const x = c.px * cosR - c.py * sinR
        const y = c.px * sinR + c.py * cosR

        // outer glow
        const pg = ctx.createRadialGradient(x, y, 0, x, y, c.radius * 3.5)
        pg.addColorStop(0, `rgba(255,50,200,${c.alpha * 0.85})`)
        pg.addColorStop(0.35, `rgba(255,80,220,${c.alpha * 0.4})`)
        pg.addColorStop(0.7, `rgba(200,40,180,${c.alpha * 0.12})`)
        pg.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = pg
        ctx.beginPath(); ctx.arc(x, y, c.radius * 3.5, 0, Math.PI * 2); ctx.fill()

        // bright core dot
        ctx.beginPath()
        ctx.arc(x, y, c.radius * 0.55, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,200,245,${c.alpha})`
        ctx.fill()
      }

      ctx.restore()

      // --- Warm golden core (canvas space — stays centered, no rotation) ---
      const gCore = ctx.createRadialGradient(cx, cy, 0, cx, cy, 110)
      gCore.addColorStop(0, 'rgba(255,255,230,0.95)')
      gCore.addColorStop(0.12, 'rgba(255,235,160,0.70)')
      gCore.addColorStop(0.28, 'rgba(255,200,100,0.35)')
      gCore.addColorStop(0.5, 'rgba(220,140,255,0.16)')
      gCore.addColorStop(0.75, 'rgba(140,70,255,0.07)')
      gCore.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = gCore
      ctx.beginPath(); ctx.arc(cx, cy, 110, 0, Math.PI * 2); ctx.fill()

      // --- Bright white center point ---
      const gHot = ctx.createRadialGradient(cx, cy, 0, cx, cy, 20)
      gHot.addColorStop(0, 'rgba(255,255,255,1)')
      gHot.addColorStop(0.45, 'rgba(255,255,240,0.55)')
      gHot.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = gHot
      ctx.beginPath(); ctx.arc(cx, cy, 20, 0, Math.PI * 2); ctx.fill()

      rot += 0.0007
      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => { cancelAnimationFrame(animId); ro.disconnect() }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, opacity: 0.88 }}
      aria-hidden
    />
  )
}
