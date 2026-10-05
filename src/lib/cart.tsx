import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { indexarItens, type Item, type Menu } from './menu'

const STORAGE_KEY = 'lanche-da-ana:carrinho'
// Itens e observação somem 60 min após a última alteração; o nome fica.
const VALIDADE_MS = 60 * 60 * 1000

interface CarrinhoSalvo {
  quantidades: Record<string, number>
  nome: string
  observacao: string
  atualizadoEm: number
}

export interface LinhaCarrinho {
  item: Item
  quantidade: number
  subtotal: number
}

interface CartContextValue {
  linhas: LinhaCarrinho[]
  quantidadeDe: (id: string) => number
  totalItens: number
  totalCentavos: number
  nome: string
  observacao: string
  setNome: (v: string) => void
  setObservacao: (v: string) => void
  adicionar: (id: string) => void
  diminuir: (id: string) => void
  remover: (id: string) => void
  esvaziar: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

function semItens(s: CarrinhoSalvo): CarrinhoSalvo {
  return { ...s, quantidades: {}, observacao: '' }
}

function expirou(s: CarrinhoSalvo) {
  return Date.now() - s.atualizadoEm >= VALIDADE_MS
}

function lerSalvo(): CarrinhoSalvo {
  try {
    const bruto = localStorage.getItem(STORAGE_KEY)
    if (bruto) {
      const dados = JSON.parse(bruto) as Partial<CarrinhoSalvo>
      const salvo = {
        quantidades: dados.quantidades ?? {},
        nome: dados.nome ?? '',
        observacao: dados.observacao ?? '',
        atualizadoEm: dados.atualizadoEm ?? 0,
      }
      return expirou(salvo) ? semItens(salvo) : salvo
    }
  } catch {
    // localStorage indisponível ou corrompido: começa vazio.
  }
  return { quantidades: {}, nome: '', observacao: '', atualizadoEm: Date.now() }
}

export function CartProvider({ menu, children }: { menu: Menu; children: ReactNode }) {
  const [salvo, setSalvo] = useState<CarrinhoSalvo>(lerSalvo)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(salvo))
    } catch {
      // Ignora: o carrinho apenas não persiste.
    }
  }, [salvo])

  // Com a página aberta, esvazia quando a validade vence.
  const temItens = Object.keys(salvo.quantidades).length > 0 || salvo.observacao !== ''
  useEffect(() => {
    if (!temItens) return
    const restante = salvo.atualizadoEm + VALIDADE_MS - Date.now()
    const timer = setTimeout(() => setSalvo((s) => (expirou(s) ? semItens(s) : s)), Math.max(0, restante))
    return () => clearTimeout(timer)
  }, [temItens, salvo.atualizadoEm])

  const value = useMemo<CartContextValue>(() => {
    const itens = indexarItens(menu)
    // Itens que saíram do cardápio são ignorados.
    const linhas = Object.entries(salvo.quantidades)
      .filter(([id, q]) => q > 0 && itens.has(id))
      .map(([id, quantidade]) => {
        const item = itens.get(id)!
        return { item, quantidade, subtotal: item.precoCentavos * quantidade }
      })

    // Toda alteração renova a validade.
    const atualizar = (fn: (s: CarrinhoSalvo) => CarrinhoSalvo) =>
      setSalvo((s) => ({ ...fn(s), atualizadoEm: Date.now() }))

    const mudarQuantidade = (id: string, fn: (q: number) => number) =>
      atualizar((s) => {
        const quantidades = { ...s.quantidades }
        const nova = Math.max(0, fn(quantidades[id] ?? 0))
        if (nova === 0) delete quantidades[id]
        else quantidades[id] = nova
        return { ...s, quantidades }
      })

    return {
      linhas,
      quantidadeDe: (id) => (itens.has(id) ? (salvo.quantidades[id] ?? 0) : 0),
      totalItens: linhas.reduce((n, l) => n + l.quantidade, 0),
      totalCentavos: linhas.reduce((n, l) => n + l.subtotal, 0),
      nome: salvo.nome,
      observacao: salvo.observacao,
      setNome: (nome) => atualizar((s) => ({ ...s, nome })),
      setObservacao: (observacao) => atualizar((s) => ({ ...s, observacao })),
      adicionar: (id) => mudarQuantidade(id, (q) => q + 1),
      diminuir: (id) => mudarQuantidade(id, (q) => q - 1),
      remover: (id) => mudarQuantidade(id, () => 0),
      esvaziar: () => atualizar(semItens),
    }
  }, [menu, salvo])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart precisa estar dentro de <CartProvider>')
  return ctx
}
