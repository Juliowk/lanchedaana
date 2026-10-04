import { useState } from 'react'
import { AnimatePresence, motion, useAnimate, useReducedMotion } from 'motion/react'
import { useCart } from '../lib/cart'
import type { Item } from '../lib/menu'
import { formatBRL } from '../lib/money'
import { Heart, Minus, Plus } from './icons'

export function ItemRow({ item, indice }: { item: Item; indice: number }) {
  const { quantidadeDe, adicionar, diminuir } = useCart()
  const quantidade = quantidadeDe(item.id)
  const reduzir = useReducedMotion()
  const [botao, animar] = useAnimate()
  const [coracoes, setCoracoes] = useState<number[]>([])

  const aoAdicionar = () => {
    adicionar(item.id)
    if (reduzir) return
    animar(botao.current, { scale: [1, 1.25, 1] }, { duration: 0.32 })
    setCoracoes((c) => [...c, Date.now() + Math.random()])
  }

  return (
    <motion.li
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: (indice % 4) * 0.05 }}
      className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-ana-100"
    >
      <div className="min-w-0 flex-1">
        <p className="font-bold leading-snug">{item.nome}</p>
        <p className="font-display text-lg font-bold text-ana-600">{formatBRL(item.precoCentavos)}</p>
      </div>

      <div className="flex items-center gap-1">
        <AnimatePresence initial={false}>
          {quantidade > 0 && (
            <motion.div
              key="menos"
              className="flex items-center gap-1"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.18 }}
            >
              <motion.button
                type="button"
                whileTap={{ scale: 0.85 }}
                onClick={() => diminuir(item.id)}
                aria-label={`Remover um ${item.nome}`}
                className="grid size-9 place-items-center rounded-full bg-ana-100 text-ana-700"
              >
                <Minus className="size-4" />
              </motion.button>
              <motion.span
                key={quantidade}
                initial={{ scale: 1.4 }}
                animate={{ scale: 1 }}
                className="w-7 text-center font-display text-lg font-bold tabular-nums"
                aria-label={`${quantidade} no carrinho`}
              >
                {quantidade}
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative">
          <motion.button
            ref={botao}
            type="button"
            whileTap={{ scale: 0.85 }}
            onClick={aoAdicionar}
            aria-label={`Adicionar ${item.nome}`}
            className="grid size-10 place-items-center rounded-full bg-ana-600 text-white shadow-md shadow-ana-600/30"
          >
            <Plus className="size-5" />
          </motion.button>
          {coracoes.map((id) => (
            <motion.span
              key={id}
              className="pointer-events-none absolute left-1/2 top-0 -ml-2 text-ana-500"
              initial={{ opacity: 1, y: 0, scale: 0.6, x: 0 }}
              animate={{ opacity: 0, y: -52, scale: 1.2, x: Math.floor(id) % 2 ? 10 : -10 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              onAnimationComplete={() => setCoracoes((c) => c.filter((x) => x !== id))}
            >
              <Heart className="size-4" />
            </motion.span>
          ))}
        </div>
      </div>
    </motion.li>
  )
}
