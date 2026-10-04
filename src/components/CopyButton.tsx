import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { copiarTexto } from '../lib/browser'
import { Copy } from './icons'

interface Props {
  texto: string
  rotulo: string
  rotuloCopiado?: string
  variante?: 'cheia' | 'contorno'
  className?: string
}

export function CopyButton({ texto, rotulo, rotuloCopiado = 'Copiado!', variante = 'cheia', className = '' }: Props) {
  const [copiado, setCopiado] = useState(false)

  useEffect(() => {
    if (!copiado) return
    const t = setTimeout(() => setCopiado(false), 2200)
    return () => clearTimeout(t)
  }, [copiado])

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.95 }}
      onClick={async () => setCopiado(await copiarTexto(texto))}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-bold transition-colors ${
        copiado
          ? 'bg-emerald-600 text-white'
          : variante === 'cheia'
            ? 'bg-ana-600 text-white hover:bg-ana-700'
            : 'bg-white text-ana-700 ring-2 ring-ana-600 hover:bg-ana-50'
      } ${className}`}
    >
      <span className="relative grid size-5 place-items-center">
        <AnimatePresence mode="wait" initial={false}>
          {copiado ? (
            <motion.svg
              key="check"
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              aria-hidden
            >
              <motion.path
                d="M5 12.5l4.5 4.5L19 7.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              />
            </motion.svg>
          ) : (
            <motion.span
              key="copy"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
            >
              <Copy className="size-5" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      <span aria-live="polite">{copiado ? rotuloCopiado : rotulo}</span>
    </motion.button>
  )
}
