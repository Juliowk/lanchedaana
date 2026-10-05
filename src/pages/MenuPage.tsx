import { useCallback, useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { CartBar } from '../components/CartBar'
import { CartSheet } from '../components/CartSheet'
import { Heart } from '../components/icons'
import { ItemRow } from '../components/ItemRow'
import { PixSection } from '../components/PixSection'
import { ShareSection } from '../components/ShareSection'
import { CartProvider } from '../lib/cart'
import { carregarMenu, type Menu } from '../lib/menu'

export function MenuPage() {
  const [menu, setMenu] = useState<Menu>()
  const [erro, setErro] = useState<string>()

  const carregar = useCallback(() => {
    setErro(undefined)
    carregarMenu()
      .then(setMenu)
      .catch((e: Error) => setErro(e.message))
  }, [])

  useEffect(carregar, [carregar])

  return (
    <div className="min-h-dvh">
      <Cabecalho />
      <main className="mx-auto max-w-xl px-4 pb-32">
        {erro ? (
          <div className="mt-10 text-center">
            <p className="text-tinta/70">Não foi possível carregar o cardápio.</p>
            <button type="button" onClick={carregar} className="mt-3 rounded-full bg-ana-vermelho px-5 py-2 font-bold text-white">
              Tentar de novo
            </button>
          </div>
        ) : !menu ? (
          <div className="mt-16 flex justify-center" aria-label="Carregando">
            <Heart className="size-10 animate-pulse text-ana-vermelho" />
          </div>
        ) : (
          <CartProvider menu={menu}>
            <Cardapio menu={menu} />
          </CartProvider>
        )}
      </main>
    </div>
  )
}

function Cardapio({ menu }: { menu: Menu }) {
  const [carrinhoAberto, setCarrinhoAberto] = useState(false)
  const fechar = useCallback(() => setCarrinhoAberto(false), [])

  return (
    <>
      {menu.categorias.map((categoria) => (
        <section key={categoria.id} className="mt-8" aria-labelledby={`cat-${categoria.id}`}>
          <h2 id={`cat-${categoria.id}`} className="mb-3 flex items-center gap-2 font-titulo text-2xl font-bold text-ana-vinho">
            <Heart className="size-5 text-ana-vermelho" />
            {categoria.nome}
          </h2>
          <ul className="space-y-2.5">
            {categoria.itens.map((item, i) => (
              <ItemRow key={item.id} item={item} indice={i} />
            ))}
          </ul>
        </section>
      ))}

      <div className="mt-10">
        <PixSection />
      </div>

      <div className="mt-6">
        <ShareSection />
      </div>

      <footer className="mt-10 flex items-center justify-center gap-1 text-sm text-tinta/50">
        Feito com <Heart className="size-3.5 text-ana-vermelho" /> pela Ana
      </footer>

      <CartBar aoAbrir={() => setCarrinhoAberto(true)} />
      <CartSheet aberto={carrinhoAberto} aoFechar={fechar} />
    </>
  )
}

const coracoesDecorativos = [
  { top: '14%', left: '6%', size: 'size-6', rot: -18, delay: 0 },
  { top: '62%', left: '12%', size: 'size-4', rot: 12, delay: 0.6 },
  { top: '20%', left: '84%', size: 'size-5', rot: 20, delay: 0.3 },
  { top: '66%', left: '88%', size: 'size-7', rot: -10, delay: 0.9 },
  { top: '8%', left: '62%', size: 'size-3', rot: 0, delay: 1.2 },
]

function Cabecalho() {
  return (
    <header className="relative overflow-hidden rounded-b-[2.5rem] bg-ana-vermelho px-4 pb-10 pt-[max(2.5rem,env(safe-area-inset-top))] text-center text-white shadow-lg shadow-ana-vinho/20">
      {coracoesDecorativos.map((c, i) => (
        <motion.span
          key={i}
          className="absolute text-white/25"
          style={{ top: c.top, left: c.left, rotate: c.rot }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: c.delay }}
        >
          <Heart className={c.size} />
        </motion.span>
      ))}
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-white/80">Cardápio</p>
        <h1 className="font-titulo text-5xl font-extrabold leading-tight drop-shadow-sm">Lanche da Ana</h1>
        <p className="mt-1 flex items-center justify-center gap-1.5 font-semibold text-white/90">
          Pastéis, cachorro quente e batatinha <Heart className="size-4" />
        </p>
      </motion.div>
    </header>
  )
}
