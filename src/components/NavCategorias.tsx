import { useEffect, useRef, useState } from 'react'

export interface Destino {
  id: string // id do elemento de destino na página
  nome: string
}

/** Chips de navegação fixos no topo; o chip da seção visível fica ativo. */
export function NavCategorias({ destinos }: { destinos: Destino[] }) {
  const [ativo, setAtivo] = useState(destinos[0]?.id)
  const nav = useRef<HTMLElement>(null)

  useEffect(() => {
    let quadro = 0
    const atualizar = () => {
      quadro = 0
      // Ativa a última seção cujo topo já passou logo abaixo da barra de chips.
      const limite = (nav.current?.getBoundingClientRect().bottom ?? 0) + 24
      let atual = destinos[0]?.id
      for (const d of destinos) {
        const el = document.getElementById(d.id)
        if (el && el.getBoundingClientRect().top <= limite) atual = d.id
      }
      // No fim da página a última seção pode não alcançar o topo.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        atual = destinos[destinos.length - 1]?.id
      }
      setAtivo(atual)
    }
    const aoRolar = () => {
      if (!quadro) quadro = requestAnimationFrame(atualizar)
    }
    atualizar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    window.addEventListener('resize', aoRolar)
    return () => {
      cancelAnimationFrame(quadro)
      window.removeEventListener('scroll', aoRolar)
      window.removeEventListener('resize', aoRolar)
    }
  }, [destinos])

  return (
    <nav ref={nav} aria-label="Seções do cardápio" className="sticky top-0 z-20 -mx-4 bg-white px-4 py-3">
      <ul className="flex gap-2 overflow-x-auto [scrollbar-width:none]">
        {destinos.map((d) => (
          <li key={d.id} className="shrink-0">
            <a
              href={`#${d.id}`}
              aria-current={ativo === d.id ? 'location' : undefined}
              className={`inline-flex min-h-alvo items-center rounded-full px-5 font-extrabold transition-colors ${
                ativo === d.id ? 'bg-ana-vermelho text-white' : 'bg-ana-rosa text-ana-vinho'
              }`}
            >
              {d.nome}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
