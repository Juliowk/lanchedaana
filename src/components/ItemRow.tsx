import { useState } from 'react'
import { AnimatePresence, motion, useAnimate, useReducedMotion } from 'motion/react'
import { useCart } from '../lib/cart'
import type { Item } from '../lib/menu'
import { formatBRL } from '../lib/money'
import { Batatinha, CachorroQuente, Heart, Minus, Pastel, Plus } from './icons'

/** Ícone ilustrativo do item, pelo id (o menu.json não guarda ícone). */
function IconeItem({ id }: { id: string }) {
  const Icone = id.startsWith('cachorro') ? CachorroQuente : id.startsWith('batatinha') ? Batatinha : Pastel
  return (
    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-ana-rosa text-ana-vinho" aria-hidden>
      <Icone className="size-6" />
    </span>
  )
}

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
      className="flex items-center gap-3 py-3"
    >
      <IconeItem id={item.id} />
      <div className="min-w-0 flex-1">
        <p className="font-bold leading-snug text-tinta">{item.nome}</p>
        <p className="font-extrabold text-ana-vinho">{formatBRL(item.precoCentavos)}</p>
      </div>

      {/* Stepper: pílula rosa com − transparente, quantidade e + vermelho */}
      <div className={`flex items-center rounded-full transition-colors ${quantidade > 0 ? 'bg-ana-rosa' : ''}`}>
        <AnimatePresence initial={false}>
          {quantidade > 0 && (
            <motion.div
              key="menos"
              className="flex items-center"
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
                className="grid size-alvo place-items-center rounded-full text-ana-vinho"
              >
                <Minus className="size-5" />
              </motion.button>
              <motion.span
                key={quantidade}
                initial={{ scale: 1.4 }}
                animate={{ scale: 1 }}
                className="w-6 text-center text-lg font-extrabold tabular-nums text-tinta"
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
            className="grid size-alvo place-items-center rounded-full bg-ana-vermelho text-white shadow-md shadow-ana-vermelho/30"
          >
            <Plus className="size-6" />
          </motion.button>
          {coracoes.map((id) => (
            <motion.span
              key={id}
              className="pointer-events-none absolute left-1/2 top-0 -ml-2 text-ana-vermelho"
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
