import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'outline'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-wide',
        variant === 'default' && 'bg-white/8 text-white/70 border border-white/10',
        variant === 'primary' && 'bg-violet-500/15 text-violet-300 border border-violet-500/25',
        variant === 'secondary' && 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/25',
        variant === 'success' && 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/25',
        variant === 'outline' && 'border border-white/15 text-white/60',
        className
      )}
    >
      {children}
    </span>
  )
}

export function AvailabilityBadge() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 text-sm text-emerald-400">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
      </span>
      Available for opportunities
    </span>
  )
}
