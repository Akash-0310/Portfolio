'use client'
import { useEffect, useRef } from 'react'

interface Star {
  nx: number
  ny: number
  size: number
  baseAlpha: number
  twinkleAmp: number
  twinkleSpeed: number
  phase: number
  cr: number
  cg: number
  cb: number
}

// MW center x at a given normalized y (0=top, 1=bottom)
function mwX(ny: number): number {
  return 0.40 + ny * 0.20
}

function buildStars(total: number): Star[] {
  const stars: Star[] = []

  for (let i = 0; i < total; i++) {
    const placedInBand = i < total * 0.62

    let nx: number, ny: number
    if (placedInBand) {
      ny = Math.random()
      const cx = mwX(ny)
      const hw = 0.09 + Math.sin(ny * Math.PI) * 0.065
      nx = cx + (Math.random() * 2 - 1) * hw
      nx = Math.max(0.01, Math.min(0.99, nx))
    } else {
      nx = Math.random()
      ny = Math.random()
    }

    const inBand = Math.abs(nx - mwX(ny)) < 0.15

    let cr: number, cg: number, cb: number
    if (inBand && Math.random() < 0.55) {
      // warm ivory/tan for MW stars
      const b = 190 + ~~(Math.random() * 50)
      cr = Math.min(255, b + ~~(Math.random() * 18))
      cg = Math.min(255, b - ~~(Math.random() * 12))
      cb = Math.max(155, b - ~~(Math.random() * 45))
    } else {
      // cool white/blue-white
      const b = 195 + ~~(Math.random() * 60)
      cr = b; cg = b; cb = Math.min(255, b + ~~(Math.random() * 18))
    }

    stars.push({
      nx, ny,
      size: inBand ? 0.18 + Math.random() * 0.38 : 0.22 + Math.random() * 0.62,
      baseAlpha: inBand ? 0.18 + Math.random() * 0.58 : 0.15 + Math.random() * 0.60,
      twinkleAmp: 0.04 + Math.random() * 0.10,
      twinkleSpeed: 0.005 + Math.random() * 0.012,
      phase: Math.random() * Math.PI * 2,
      cr, cg, cb,
    })
  }

  return stars
}

function bakeMilkyWay(W: number, H: number): HTMLCanvasElement {
  const off = document.createElement('canvas')
  off.width = W
  off.height = H
  const oc = off.getContext('2d')!

  // Band nodes from bottom to top
  const nodes = [
    { ny: 0.97, hw: 0.27, a: 0.07 },
    { ny: 0.85, hw: 0.25, a: 0.12 },
    { ny: 0.73, hw: 0.24, a: 0.17 },
    { ny: 0.61, hw: 0.23, a: 0.21 },
    { ny: 0.49, hw: 0.24, a: 0.24 }, // brightest core
    { ny: 0.38, hw: 0.22, a: 0.20 },
    { ny: 0.27, hw: 0.21, a: 0.15 },
    { ny: 0.15, hw: 0.20, a: 0.09 },
    { ny: 0.04, hw: 0.18, a: 0.05 },
  ]

  for (const n of nodes) {
    const cx = mwX(n.ny) * W
    const cy = n.ny * H
    const rx = n.hw * W
    const ry = H * 0.11

    oc.save()
    oc.translate(cx, cy)
    oc.scale(1, ry / rx)

    const g = oc.createRadialGradient(0, 0, 0, 0, 0, rx)
    g.addColorStop(0,    `rgba(172,158,130,${n.a})`)
    g.addColorStop(0.25, `rgba(145,132,108,${n.a * 0.82})`)
    g.addColorStop(0.52, `rgba(98, 89, 72,  ${n.a * 0.48})`)
    g.addColorStop(0.80, `rgba(48, 43, 34,  ${n.a * 0.16})`)
    g.addColorStop(1,    'rgba(0,0,0,0)')
    oc.fillStyle = g
    oc.beginPath(); oc.arc(0, 0, rx, 0, Math.PI * 2); oc.fill()
    oc.restore()
  }

  // Bright star-cloud clumps
  const clumps = [
    { nx: 0.47, ny: 0.49, r: 0.120, a: 0.20 },
    { nx: 0.50, ny: 0.60, r: 0.100, a: 0.17 },
    { nx: 0.46, ny: 0.37, r: 0.090, a: 0.14 },
    { nx: 0.53, ny: 0.70, r: 0.080, a: 0.12 },
    { nx: 0.44, ny: 0.26, r: 0.075, a: 0.10 },
    { nx: 0.55, ny: 0.80, r: 0.065, a: 0.09 },
    { nx: 0.43, ny: 0.16, r: 0.065, a: 0.07 },
  ]
  for (const c of clumps) {
    const x = c.nx * W
    const y = c.ny * H
    const r = c.r * Math.min(W, H)
    const g = oc.createRadialGradient(x, y, 0, x, y, r)
    g.addColorStop(0,    `rgba(205,190,160,${c.a})`)
    g.addColorStop(0.40, `rgba(165,152,124,${c.a * 0.55})`)
    g.addColorStop(1,    'rgba(0,0,0,0)')
    oc.fillStyle = g
    oc.beginPath(); oc.arc(x, y, r, 0, Math.PI * 2); oc.fill()
  }

  // Dark absorption patches (dust lanes)
  const dust = [
    { nx: 0.51, ny: 0.45, r: 0.055 },
    { nx: 0.48, ny: 0.63, r: 0.045 },
    { nx: 0.53, ny: 0.33, r: 0.040 },
  ]
  oc.globalCompositeOperation = 'darken'
  for (const d of dust) {
    const x = d.nx * W
    const y = d.ny * H
    const r = d.r * Math.min(W, H)
    const g = oc.createRadialGradient(x, y, 0, x, y, r)
    g.addColorStop(0,    'rgba(4,4,6,0.75)')
    g.addColorStop(0.55, 'rgba(4,4,6,0.35)')
    g.addColorStop(1,    'rgba(0,0,0,0)')
    oc.fillStyle = g
    oc.beginPath(); oc.arc(x, y, r, 0, Math.PI * 2); oc.fill()
  }

  return off
}

export function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let frame = 0
    const stars = buildStars(2600)

    let mwCache: HTMLCanvasElement | null = null
    let cachedW = 0
    let cachedH = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      mwCache = null // invalidate cache on resize
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const draw = () => {
      const W = canvas.width
      const H = canvas.height
      ctx.clearRect(0, 0, W, H)

      // Rebuild MW texture only when dimensions change
      if (!mwCache || cachedW !== W || cachedH !== H) {
        mwCache = bakeMilkyWay(W, H)
        cachedW = W
        cachedH = H
      }
      ctx.drawImage(mwCache, 0, 0)

      // Stars with per-star twinkling
      for (const s of stars) {
        const x = s.nx * W
        const y = s.ny * H
        const twinkle = Math.sin(frame * s.twinkleSpeed + s.phase) * s.twinkleAmp
        const alpha = Math.max(0.03, s.baseAlpha + twinkle)
        ctx.beginPath()
        ctx.arc(x, y, s.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${s.cr},${s.cg},${s.cb},${alpha.toFixed(3)})`
        ctx.fill()
      }

      frame++
      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
      mwCache = null
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden
    />
  )
}
