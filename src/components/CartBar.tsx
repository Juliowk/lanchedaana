import { AnimatePresence, motion } from 'motion/react'
import { useCart } from '../lib/cart'
import { AnimatedBRL } from './AnimatedBRL'
import { Bag } from './icons'

export function CartBar({ aoAbrir }: { aoAbrir: () => void }) {
  const { totalItens, totalCentavos } = useCart()

  return (
    <AnimatePresence>
      {totalItens > 0 && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-30 px-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
          initial={{ y: 120 }}
          animate={{ y: 0 }}
          exit={{ y: 120 }}
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
        >
          <motion.button
            type="button"
            onClick={aoAbrir}
            whileTap={{ scale: 0.97 }}
            className="mx-auto flex w-full max-w-xl items-center gap-3 rounded-2xl bg-ana-600 px-4 py-3 text-left text-white shadow-xl shadow-ana-800/30"
          >
            <span className="relative grid size-11 place-items-center rounded-xl bg-white/15">
              <Bag className="size-6" />
              <motion.span
                key={totalItens}
                initial={{ scale: 1.7 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 14 }}
                className="absolute -right-1.5 -top-1.5 grid min-w-6 place-items-center rounded-full bg-white px-1.5 text-sm font-extrabold text-ana-700"
              >
                {totalItens}
              </motion.span>
            </span>
            <span className="flex-1 font-bold">
              Ver carrinho
              <span className="block text-sm font-semibold text-white/80">
                {totalItens} {totalItens === 1 ? 'item' : 'itens'}
              </span>
            </span>
            <AnimatedBRL centavos={totalCentavos} className="font-display text-xl font-bold" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
