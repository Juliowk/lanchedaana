import { motion } from 'motion/react'
import { config } from '../config'
import { useQrCode } from '../lib/useQrCode'
import { CopyButton } from './CopyButton'
import { EnviarPedido, Share } from './icons'
import { QrDownloadButton } from './QrDownloadButton'
import { TituloSecao } from './TituloSecao'

const titulo = 'Lanche da Ana'
const convite = 'Olha o cardápio do Lanche da Ana! Dá pra pedir pelo WhatsApp:'

export function ShareSection() {
  const qr = useQrCode(config.siteUrl)
  const podeCompartilhar = typeof navigator !== 'undefined' && 'share' in navigator

  const compartilhar = () => {
    // Cancelar o menu de compartilhamento rejeita a promise: não é erro.
    navigator.share({ title: titulo, text: convite, url: config.siteUrl }).catch(() => {})
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
      className="rounded-card bg-white p-5 text-center ring-1 ring-borda"
    >
      <TituloSecao className="justify-center">Compartilhe</TituloSecao>
      <p className="mt-1 text-sm font-semibold text-tinta-suave">Gostou? Mande o cardápio para os amigos.</p>

      <div className="mx-auto mt-4 aspect-square w-48 rounded-2xl bg-white p-2 ring-1 ring-borda">
        {qr && <img src={qr} alt="QR code do site Lanche da Ana" className="size-full" />}
      </div>
      <QrDownloadButton texto={config.siteUrl} arquivo="lanche-da-ana-qrcode.png" className="mt-3" />

      <p className="mt-4 break-all rounded-2xl bg-ana-rosa px-4 py-3 font-extrabold text-ana-vinho">
        {config.siteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}
      </p>

      <div className="mt-3 grid gap-2">
        <CopyButton texto={config.siteUrl} rotulo="Copiar link" rotuloCopiado="Link copiado!" variante="contorno" className="w-full" />
        <div className={`grid gap-2 ${podeCompartilhar ? 'grid-cols-2' : ''}`}>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`${convite} ${config.siteUrl}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="botao bg-ana-vermelho px-4 text-white active:scale-[0.97]"
          >
            <EnviarPedido className="size-5" />
            WhatsApp
          </a>
          {podeCompartilhar && (
            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={compartilhar}
              className="botao bg-white px-4 text-ana-vinho ring-2 ring-inset ring-ana-vinho"
            >
              <Share className="size-5" />
              Compartilhar
            </motion.button>
          )}
        </div>
      </div>
    </motion.section>
  )
}
