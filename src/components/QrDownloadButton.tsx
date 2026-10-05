import { motion } from 'motion/react'
import QRCode from 'qrcode'
import { corQrCode } from '../lib/marca'
import { Download } from './icons'

/** Baixa o QR code do texto em PNG de alta resolução (bom para imprimir). */
export function QrDownloadButton({ texto, arquivo, className = '' }: { texto: string; arquivo: string; className?: string }) {
  const baixar = async () => {
    const url = await QRCode.toDataURL(texto, { margin: 2, width: 1024, color: corQrCode })
    const a = document.createElement('a')
    a.href = url
    a.download = arquivo
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.95 }}
      onClick={baixar}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-ana-vinho ring-2 ring-borda hover:bg-ana-rosa ${className}`}
    >
      <Download className="size-4" />
      Baixar QR code
    </motion.button>
  )
}
