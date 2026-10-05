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
      className={`botao transition-colors ${
        copiado
          ? 'bg-ana-dourado text-tinta'
          : variante === 'cheia'
            ? 'bg-ana-vermelho text-white hover:bg-ana-vinho'
            : 'bg-white text-ana-vinho ring-2 ring-inset ring-ana-vinho hover:bg-ana-rosa'
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
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              aria-hidden
            >
              <motion.path
                d="M5 12.5l4.5 4.5L19 7"
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
