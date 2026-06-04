'use client'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', icon, iconPosition = 'right', className, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className={cn(
          'relative inline-flex items-center justify-center gap-2 font-medium rounded-xl overflow-hidden transition-all duration-300',
          size === 'sm' && 'px-4 py-2 text-sm',
          size === 'md' && 'px-6 py-3 text-sm',
          size === 'lg' && 'px-8 py-4 text-base',
          variant === 'primary' && [
            'bg-violet-600 text-white',
            'shadow-lg shadow-violet-500/25',
            'hover:bg-violet-500 hover:shadow-violet-500/40',
            'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent',
            'before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-500',
          ],
          variant === 'secondary' && [
            'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30',
            'hover:bg-cyan-500/20 hover:border-cyan-500/50',
          ],
          variant === 'ghost' && 'text-white/70 hover:text-white hover:bg-white/5',
          variant === 'outline' && 'border border-white/15 text-white/80 hover:border-white/30 hover:bg-white/5',
          className
        )}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
        {children}
        {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'
