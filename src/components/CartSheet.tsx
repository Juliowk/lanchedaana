import { useEffect } from 'react'
import { AnimatePresence, motion, useDragControls, type PanInfo } from 'motion/react'
import { useCart } from '../lib/cart'
import { formatBRL } from '../lib/money'
import { linkWhatsApp, montarMensagem } from '../lib/whatsapp'
import { AnimatedBRL } from './AnimatedBRL'
import { Close, EnviarPedido, Minus, Plus, Trash } from './icons'

export function CartSheet({ aberto, aoFechar }: { aberto: boolean; aoFechar: () => void }) {
  const carrinho = useCart()
  const { linhas, totalCentavos, nome, observacao } = carrinho
  const arraste = useDragControls()

  // Trava a rolagem da página e permite fechar com Esc enquanto o carrinho está aberto.
  useEffect(() => {
    if (!aberto) return
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const aoTeclar = (e: KeyboardEvent) => e.key === 'Escape' && aoFechar()
    window.addEventListener('keydown', aoTeclar)
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', aoTeclar)
    }
  }, [aberto, aoFechar])

  const aoSoltar = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 120 || info.velocity.y > 600) aoFechar()
  }

  const link = linkWhatsApp(montarMensagem(linhas, totalCentavos, nome, observacao))

  return (
    <AnimatePresence>
      {aberto && (
        <div className="fixed inset-0 z-40" role="dialog" aria-modal="true" aria-label="Carrinho">
          <motion.div
            className="absolute inset-0 bg-tinta/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={aoFechar}
          />

          <motion.div
            className="absolute inset-x-0 bottom-0 mx-auto flex max-h-[90dvh] max-w-xl flex-col rounded-t-3xl bg-white shadow-2xl"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            drag="y"
            dragListener={false}
            dragControls={arraste}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.7 }}
            onDragEnd={aoSoltar}
          >
            {/* Alça: arrastar daqui para baixo fecha o carrinho */}
            <div
              className="cursor-grab touch-none px-5 pb-2 pt-3 active:cursor-grabbing"
              onPointerDown={(e) => arraste.start(e)}
            >
              <div className="mx-auto h-1.5 w-12 rounded-full bg-borda" />
              <div className="mt-3 flex items-center justify-between">
                <h2 className="font-titulo text-2xl font-bold text-ana-vinho">Seu pedido</h2>
                <button
                  type="button"
                  onClick={aoFechar}
                  aria-label="Fechar carrinho"
                  className="grid size-9 place-items-center rounded-full bg-ana-rosa text-ana-vinho"
                >
                  <Close className="size-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-4">
              {linhas.length === 0 ? (
                <p className="py-10 text-center text-tinta/60">Seu carrinho está vazio.</p>
              ) : (
                <motion.ul layout className="divide-y divide-borda">
                  <AnimatePresence initial={false}>
                    {linhas.map(({ item, quantidade, subtotal }) => (
                      <motion.li
                        key={item.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, x: -120, transition: { duration: 0.22 } }}
                        className="flex items-center gap-3 py-3"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="font-bold leading-snug">{item.nome}</p>
                          <p className="text-sm text-tinta/60">
                            {formatBRL(item.precoCentavos)} · <span className="font-bold text-ana-vermelho">{formatBRL(subtotal)}</span>
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => carrinho.diminuir(item.id)}
                            aria-label={`Remover um ${item.nome}`}
                            className="grid size-8 place-items-center rounded-full bg-borda text-ana-vinho"
                          >
                            <Minus className="size-4" />
                          </button>
                          <span className="w-6 text-center font-bold tabular-nums">{quantidade}</span>
                          <button
                            type="button"
                            onClick={() => carrinho.adicionar(item.id)}
                            aria-label={`Adicionar ${item.nome}`}
                            className="grid size-8 place-items-center rounded-full bg-ana-vermelho text-white"
                          >
                            <Plus className="size-4" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => carrinho.remover(item.id)}
                          aria-label={`Tirar ${item.nome} do carrinho`}
                          className="grid size-8 place-items-center rounded-full text-tinta/40 hover:text-ana-vermelho"
                        >
                          <Trash className="size-5" />
                        </button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </motion.ul>
              )}

              <motion.div layout className="mt-4 space-y-3">
                <label className="block">
                  <span className="text-sm font-bold">
                    Seu nome <span className="font-normal text-tinta/50">(opcional)</span>
                  </span>
                  <input
                    value={nome}
                    onChange={(e) => carrinho.setNome(e.target.value)}
                    autoComplete="name"
                    placeholder="Ex.: João"
                    className="mt-1 w-full rounded-xl border border-borda bg-ana-rosa/50 px-4 py-3 outline-none focus:border-ana-vermelho focus:ring-2 focus:ring-borda"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-bold">
                    Observação <span className="font-normal text-tinta/50">(opcional)</span>
                  </span>
                  <textarea
                    value={observacao}
                    onChange={(e) => carrinho.setObservacao(e.target.value)}
                    rows={2}
                    placeholder="Ex.: sem cebola"
                    className="mt-1 w-full resize-none rounded-xl border border-borda bg-ana-rosa/50 px-4 py-3 outline-none focus:border-ana-vermelho focus:ring-2 focus:ring-borda"
                  />
                </label>
              </motion.div>
            </div>

            <div className="border-t border-borda px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4">
              <div className="mb-3 flex items-baseline justify-between">
                <span className="font-bold">Total</span>
                <AnimatedBRL centavos={totalCentavos} className="font-titulo text-2xl font-bold text-ana-vinho" />
              </div>
              <a
                href={linhas.length ? link : undefined}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={linhas.length === 0}
                className={`flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 text-lg font-extrabold text-white shadow-lg transition ${
                  linhas.length
                    ? 'bg-[#25d366] shadow-[#25d366]/30 active:scale-[0.98]'
                    : 'pointer-events-none bg-tinta/20 shadow-none'
                }`}
              >
                <EnviarPedido className="size-6" />
                Enviar pedido
              </a>
              {linhas.length > 0 && (
                <div className="mt-3 flex justify-between text-sm">
                  <a href="#pix" onClick={aoFechar} className="font-bold text-ana-vermelho underline-offset-2 hover:underline">
                    Pagar com Pix
                  </a>
                  <button type="button" onClick={carrinho.esvaziar} className="text-tinta/50 hover:text-ana-vermelho">
                    Esvaziar carrinho
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
