import type { ReactNode } from 'react'
import { Heart } from './icons'

/** Título de seção da marca: Baloo 2 800 em Vermelho Ana, seguido de três coraçõezinhos. */
export function TituloSecao({ id, children, className = '' }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <h2 id={id} className={`flex items-center gap-2 font-titulo text-2xl font-extrabold text-ana-vermelho ${className}`}>
      {children}
      <span className="flex items-end gap-0.5" aria-hidden>
        <Heart className="size-2.5 opacity-70" />
        <Heart className="mb-1.5 size-3" />
        <Heart className="size-2.5 opacity-70" />
      </span>
    </h2>
  )
}
