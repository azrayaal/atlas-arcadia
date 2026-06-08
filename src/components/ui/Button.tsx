import { cn } from '@/lib/utils'
import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'white'
  size?: 'sm' | 'md' | 'lg'
}

const variants = {
  primary: 'bg-brand text-white hover:bg-brand/90',
  outline: 'border border-brand text-brand hover:bg-brand hover:text-white',
  ghost: 'text-brand-muted hover:text-brand',
  white: 'border border-white/40 text-white hover:bg-white hover:text-brand',
}

const sizes = {
  sm: 'px-4 py-2 text-[10px]',
  md: 'px-8 py-3 text-xs',
  lg: 'px-10 py-4 text-sm',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 uppercase tracking-widest font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
