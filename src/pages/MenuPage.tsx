import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { CartBar } from '../components/CartBar'
import { CartSheet } from '../components/CartSheet'
import { Heart } from '../components/icons'
import { ItemRow } from '../components/ItemRow'
import { LogoEmpilhado, LogoHorizontal } from '../components/Logo'
import { NavCategorias } from '../components/NavCategorias'
import { PixSection } from '../components/PixSection'
import { ShareSection } from '../components/ShareSection'
import { TituloSecao } from '../components/TituloSecao'
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
            <p className="text-tinta-suave">Não foi possível carregar o cardápio.</p>
            <button type="button" onClick={carregar} className="botao mt-3 bg-ana-vermelho text-white">
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
  const destinos = useMemo(
    () => [...menu.categorias.map((c) => ({ id: `cat-${c.id}`, nome: c.nome })), { id: 'pix', nome: 'Pix' }],
    [menu],
  )

  return (
    <>
      <NavCategorias destinos={destinos} />

      {menu.categorias.map((categoria) => (
        <section key={categoria.id} className="mt-4 first-of-type:mt-2" aria-labelledby={`cat-${categoria.id}`}>
          <TituloSecao id={`cat-${categoria.id}`} className="mb-1 scroll-mt-20">
            {categoria.nome}
          </TituloSecao>
          <ul className="divide-y divide-borda border-b border-borda">
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

      <footer className="mt-10 flex flex-col items-center gap-2 text-sm text-tinta-suave">
        <LogoEmpilhado className="w-36" />
        <p className="flex items-center gap-1">
          Feito com <Heart className="size-3.5 text-ana-vermelho" /> pela Ana
        </p>
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
    <header className="relative overflow-hidden rounded-b-[2.5rem] bg-ana-rosa px-4 pb-7 pt-[max(1.75rem,env(safe-area-inset-top))]">
      {coracoesDecorativos.map((c, i) => (
        <motion.span
          key={i}
          className="absolute text-ana-vermelho/20"
          style={{ top: c.top, left: c.left, rotate: c.rot }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: c.delay }}
        >
          <Heart className={c.size} />
        </motion.span>
      ))}
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="flex justify-center">
          <span className="sr-only">Lanche da Ana</span>
          <LogoHorizontal />
        </h1>
      </motion.div>
    </header>
  )
}
