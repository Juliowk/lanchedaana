import { motion } from 'motion/react'
import { config } from '../config'
import { useQrCode } from '../lib/useQrCode'
import { CopyButton } from './CopyButton'
import { Share, WhatsApp } from './icons'
import { QrDownloadButton } from './QrDownloadButton'

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
      className="rounded-3xl bg-white p-5 text-center shadow-sm ring-1 ring-ana-100"
    >
      <h2 className="font-display text-2xl font-bold text-ana-700">Compartilhe</h2>
      <p className="mt-1 text-sm text-tinta/70">Gostou? Mande o cardápio para os amigos.</p>

      <div className="mx-auto mt-4 aspect-square w-48 rounded-2xl bg-white p-2 ring-1 ring-ana-100">
        {qr && <img src={qr} alt="QR code do site Lanche da Ana" className="size-full" />}
      </div>
      <QrDownloadButton texto={config.siteUrl} arquivo="lanche-da-ana-qrcode.png" className="mt-3" />

      <p className="mt-4 break-all rounded-2xl bg-ana-50 px-4 py-3 font-bold text-ana-700">
        {config.siteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}
      </p>

      <div className="mt-3 grid gap-2">
        <CopyButton texto={config.siteUrl} rotulo="Copiar link" rotuloCopiado="Link copiado!" className="w-full" />
        <div className={`grid gap-2 ${podeCompartilhar ? 'grid-cols-2' : ''}`}>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`${convite} ${config.siteUrl}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25d366] px-4 py-3 font-bold text-white active:scale-[0.97]"
          >
            <WhatsApp className="size-5" />
            WhatsApp
          </a>
          {podeCompartilhar && (
            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={compartilhar}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-3 font-bold text-ana-700 ring-2 ring-ana-600"
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
