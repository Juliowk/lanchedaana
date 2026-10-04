import { useEffect } from 'react'
import { motion, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { formatBRL } from '../lib/money'

/** Valor em reais que anima a contagem quando muda. */
export function AnimatedBRL({ centavos, className }: { centavos: number; className?: string }) {
  const reduzir = useReducedMotion()
  const valor = useSpring(centavos, { stiffness: 160, damping: 24 })
  const texto = useTransform(valor, (v) => formatBRL(Math.round(v)))

  useEffect(() => {
    if (reduzir) valor.jump(centavos)
    else valor.set(centavos)
  }, [centavos, reduzir, valor])

  return <motion.span className={`tabular-nums ${className ?? ''}`}>{texto}</motion.span>
}
