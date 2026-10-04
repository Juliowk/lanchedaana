const formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

/** Formata centavos como "R$ 10,00" (com espaço comum, seguro para o WhatsApp). */
export function formatBRL(centavos: number): string {
  return formatter.format(centavos / 100).replace(/\s/g, ' ')
}

/** Converte "12,50", "12.5" ou "R$ 12,50" em centavos. Retorna null se inválido. */
export function parseBRL(texto: string): number | null {
  let limpo = texto.replace(/[^\d,.]/g, '')
  if (limpo.includes(',')) limpo = limpo.replace(/\./g, '').replace(',', '.')
  if (!/^\d+(\.\d{1,2})?$/.test(limpo)) return null
  return Math.round(parseFloat(limpo) * 100)
}

/** Centavos para o formato de edição "12,50". */
export function centavosParaTexto(centavos: number): string {
  return (centavos / 100).toFixed(2).replace('.', ',')
}
