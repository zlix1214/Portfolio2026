import { type ReactNode } from 'react'
import { useReveal } from '../../hooks/useReveal'

interface RevealedSectionProps {
  id?: string
  className?: string
  children: ReactNode
}

export function RevealedSection({ id, className = '', children }: RevealedSectionProps) {
  const ref = useReveal<HTMLElement>()

  return (
    <section ref={ref} className={`section reveal ${className}`} id={id}>
      {children}
    </section>
  )
}
