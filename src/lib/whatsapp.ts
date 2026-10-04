import { config } from '../config'
import type { LinhaCarrinho } from './cart'
import { formatBRL } from './money'

export function montarMensagem(linhas: LinhaCarrinho[], total: number, nome: string, observacao: string): string {
  const partes = [
    'Olá, Ana! Gostaria de fazer um pedido:',
    '',
    ...linhas.map((l) => `${l.quantidade}x ${l.item.nome} — ${formatBRL(l.subtotal)}`),
    '',
    `Total: ${formatBRL(total)}`,
  ]
  if (nome.trim()) partes.push(`Nome: ${nome.trim()}`)
  if (observacao.trim()) partes.push(`Obs: ${observacao.trim()}`)
  return partes.join('\n')
}

export function linkWhatsApp(mensagem: string): string {
  return `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(mensagem)}`
}
