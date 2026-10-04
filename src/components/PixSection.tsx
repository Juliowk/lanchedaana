import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { config } from '../config'
import { useCart } from '../lib/cart'
import { formatBRL } from '../lib/money'
import { gerarPixCopiaECola } from '../lib/pix'
import { useQrCode } from '../lib/useQrCode'
import { CopyButton } from './CopyButton'
import { QrDownloadButton } from './QrDownloadButton'

export function PixSection() {
  const { totalCentavos } = useCart()
  const [comValor, setComValor] = useState(true)
  const usarValor = comValor && totalCentavos > 0
  const copiaECola = useMemo(() => gerarPixCopiaECola(usarValor ? totalCentavos : undefined), [usarValor, totalCentavos])
  const qr = useQrCode(copiaECola)

  return (
    <motion.section
      id="pix"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
      className="scroll-mt-4 rounded-3xl bg-white p-5 text-center shadow-sm ring-1 ring-ana-100"
    >
      <h2 className="font-display text-2xl font-bold text-ana-700">Pague com Pix</h2>
      <p className="mt-1 text-sm text-tinta/70">Depois de pagar, envie o comprovante no WhatsApp.</p>

      <div className="mt-4 rounded-2xl bg-ana-50 px-4 py-3">
        <p className="text-xs font-bold uppercase tracking-wide text-tinta/60">Chave Pix</p>
        <p className="font-display text-2xl font-bold tracking-wider">{config.pix.chave}</p>
      </div>
      <CopyButton texto={config.pix.chave} rotulo="Copiar chave" rotuloCopiado="Chave copiada!" className="mt-3 w-full" />

      <div className="mt-6">
        {totalCentavos > 0 && (
          <div className="mx-auto mb-3 inline-flex rounded-full bg-ana-50 p-1 text-sm font-bold">
            {[true, false].map((opcao) => (
              <button
                key={String(opcao)}
                type="button"
                onClick={() => setComValor(opcao)}
                className={`rounded-full px-4 py-1.5 transition-colors ${
                  comValor === opcao ? 'bg-ana-600 text-white' : 'text-ana-700'
                }`}
              >
                {opcao ? `Com valor (${formatBRL(totalCentavos)})` : 'Sem valor'}
              </button>
            ))}
          </div>
        )}
        <div className="mx-auto aspect-square w-56 rounded-2xl bg-white p-2 ring-1 ring-ana-100">
          {qr && <img src={qr} alt="QR code Pix" className="size-full" />}
        </div>
        <p className="mt-2 text-xs text-tinta/60">
          {usarValor ? `QR code já com o valor do pedido: ${formatBRL(totalCentavos)}` : 'Escaneie no app do seu banco'}
        </p>
        <QrDownloadButton texto={copiaECola} arquivo="lanche-da-ana-pix.png" className="mt-3" />
        <CopyButton
          texto={copiaECola}
          rotulo="Copiar Pix copia e cola"
          rotuloCopiado="Código copiado!"
          variante="contorno"
          className="mt-4 w-full"
        />
      </div>
    </motion.section>
  )
}
