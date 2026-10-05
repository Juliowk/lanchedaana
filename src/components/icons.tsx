import type { SVGProps } from 'react'

// Ícones da marca (brand-lanche-da-ana/brand/icons): grade 24×24, traço 2 arredondado, cor herdada (currentColor).
type IconProps = SVGProps<SVGSVGElement>

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const

/** Coração cheio, no mesmo desenho dos corações do símbolo. Usado como enfeite. */
export function Heart(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 21C5 16 1 12 3 7.5C4.8 3.8 9.6 3.6 12 7C14.4 3.6 19.2 3.8 21 7.5C23 12 19 16 12 21Z" />
    </svg>
  )
}

/** coracao.svg */
export function Coracao(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 20C5.5 15.5 2 12 3.5 7.8C5 4.2 9.6 3.8 12 7.2C14.4 3.8 19 4.2 20.5 7.8C22 12 18.5 15.5 12 20Z" />
    </svg>
  )
}

/** pastel.svg */
export function Pastel(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 17A9 9 0 0 1 21 17ZM5.9 12.7L7.3 13.7M9.4 10L10 11.6M14.6 10L14 11.6M18.1 12.7L16.7 13.7" />
    </svg>
  )
}

/** cachorro-quente.svg */
export function CachorroQuente(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12a2 2 0 0 1 2-2h12a2 2 0 0 1 0 4H6a2 2 0 0 1-2-2ZM3 14v.5a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4V14M8 12l1.5-1 1.5 1 1.5-1 1.5 1 1.5-1" />
    </svg>
  )
}

/** batatinha.svg */
export function Batatinha(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 10h12l-1.5 10h-9ZM8 10V4.5M10.7 10V3M13.3 10V4M16 10V5.5" />
    </svg>
  )
}

/** qrcode.svg */
export function QrCode(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 4h6v6H4ZM14 4h6v6h-6ZM4 14h6v6H4ZM14 14h2v2h-2ZM18 18h2v2h-2ZM14 19h.01M19 14h.01" />
    </svg>
  )
}

/** mais.svg */
export function Plus(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 6v12M6 12h12" />
    </svg>
  )
}

/** menos.svg */
export function Minus(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 12h12" />
    </svg>
  )
}

/** carrinho.svg */
export function Carrinho(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 8h14l-1 12H6ZM9 8V6.5a3 3 0 0 1 6 0V8" />
    </svg>
  )
}

/** remover.svg */
export function Trash(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16M10 7V4.5h4V7M6 7l1 13h10l1-13M10 11v5M14 11v5" />
    </svg>
  )
}

/** copiar.svg */
export function Copy(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9 9h10v11H9ZM5 15V4h10" />
    </svg>
  )
}

/** enviar-pedido.svg (ícone genérico no lugar do logo do WhatsApp, conforme o guia da marca) */
export function EnviarPedido(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H10l-4 4v-4H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1ZM8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01" />
    </svg>
  )
}

/** seta-direita.svg */
export function SetaDireita(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  )
}

/** fechar.svg */
export function Close(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}

// Sem equivalente em brand/icons: mantido no mesmo estilo (traço 2, arredondado).
export function Share(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3v12M8 7l4-4 4 4M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" />
    </svg>
  )
}
