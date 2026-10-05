import type { SVGProps } from 'react'

// Símbolo da marca (brand-lanche-da-ana/brand/logo/simbolo.svg) inline, com as cores vindas dos tokens.
// Fica inline para que o texto do logo empilhado use a Baloo 2 já carregada na página.
const coracao = 'M12 21C5 16 1 12 3 7.5C4.8 3.8 9.6 3.6 12 7C14.4 3.6 19.2 3.8 21 7.5C23 12 19 16 12 21Z'

function TracosSimbolo() {
  return (
    <>
      <path d="M14 78A46 46 0 0 1 106 78Z" className="fill-ana-dourado stroke-ana-vinho" strokeWidth={5} strokeLinejoin="round" />
      <path
        d="M22.4 64.3L29 66.7M29.4 52.3L34.7 56.8M40 43.4L43.5 49.4M53.1 38.6L54.3 45.5M66.9 38.6L65.7 45.5M80 43.4L76.5 49.4M90.6 52.3L85.3 56.8M97.6 64.3L91 66.7"
        fill="none"
        className="stroke-ana-vinho"
        strokeWidth={4}
        strokeLinecap="round"
      />
      <path d="M60 72C52 66 48 61 52 57C55 54 59 55 60 58C61 55 65 54 68 57C72 61 68 66 60 72Z" className="fill-ana-vermelho" />
      <path transform="translate(90 6) scale(0.55)" d={coracao} className="fill-ana-vermelho" />
      <path transform="translate(83 22) scale(0.45)" d={coracao} className="fill-ana-vermelho" />
      <path transform="translate(100 20) scale(0.45)" d={coracao} className="fill-ana-vermelho" />
    </>
  )
}

export function Simbolo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="9 4 104 82" aria-hidden {...props}>
      <TracosSimbolo />
    </svg>
  )
}

/** Logo do cabeçalho: símbolo + "LANCHE DA" + "Ana" em HTML. É decorativo: quem usa põe o nome acessível. */
export function LogoHorizontal() {
  return (
    <span className="inline-flex items-center gap-3" aria-hidden>
      <Simbolo className="h-14 w-auto shrink-0" />
      <span className="flex flex-col items-start leading-none">
        <span className="font-titulo text-sm font-bold uppercase tracking-[0.3em] text-ana-vinho">Lanche da</span>
        <span className="-mt-0.5 font-titulo text-5xl font-extrabold text-ana-vermelho">Ana</span>
      </span>
    </span>
  )
}

/** Logo empilhado (brand-lanche-da-ana/brand/logo/logo-empilhado.svg). */
export function LogoEmpilhado(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 340 190" role="img" aria-label="Lanche da Ana" {...props}>
      <g transform="translate(105 4) scale(1.25) translate(-9 -4)">
        <TracosSimbolo />
      </g>
      <text x="170" y="168" textAnchor="middle" className="fill-ana-vermelho font-titulo" fontWeight={800} fontSize={38}>
        Lanche da Ana
      </text>
    </svg>
  )
}
