export interface Item {
  id: string
  nome: string
  precoCentavos: number
}

export interface Categoria {
  id: string
  nome: string
  itens: Item[]
}

export interface Menu {
  categorias: Categoria[]
}

export async function carregarMenu(): Promise<Menu> {
  // Evita servir um cardápio antigo do cache depois que a Ana salva alterações.
  const res = await fetch(`${import.meta.env.BASE_URL}menu.json?v=${Date.now()}`, { cache: 'no-store' })
  if (!res.ok) throw new Error(`Falha ao carregar o cardápio (${res.status})`)
  return res.json()
}

export function indexarItens(menu: Menu): Map<string, Item> {
  return new Map(menu.categorias.flatMap((c) => c.itens.map((i) => [i.id, i] as const)))
}
