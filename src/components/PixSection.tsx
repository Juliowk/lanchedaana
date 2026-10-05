import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { config } from '../config'
import { useCart } from '../lib/cart'
import { formatBRL } from '../lib/money'
import { gerarPixCopiaECola } from '../lib/pix'
import { useQrCode } from '../lib/useQrCode'
import { CopyButton } from './CopyButton'
import { QrDownloadButton } from './QrDownloadButton'
import { TituloSecao } from './TituloSecao'

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
      className="scroll-mt-20 rounded-card bg-white p-5 text-center ring-1 ring-borda"
    >
      <TituloSecao className="justify-center">Pague com Pix</TituloSecao>
      <p className="mt-1 text-sm font-semibold text-tinta-suave">Depois de pagar, envie o comprovante no WhatsApp.</p>

      <div className="mt-4 rounded-2xl bg-ana-rosa px-4 py-3">
        <p className="text-xs font-bold uppercase tracking-wide text-tinta-suave">Chave Pix</p>
        <p className="font-titulo text-2xl font-extrabold tracking-wider text-tinta">{config.pix.chave}</p>
      </div>
      <CopyButton texto={config.pix.chave} rotulo="Copiar chave" rotuloCopiado="Chave copiada!" className="mt-3 w-full" />

      <div className="mt-6">
        {totalCentavos > 0 && (
          <div className="mb-3 flex flex-wrap justify-center gap-2 text-sm font-bold">
            {[true, false].map((opcao) => (
              <button
                key={String(opcao)}
                type="button"
                onClick={() => setComValor(opcao)}
                className={`min-h-alvo rounded-full px-4 transition-colors ${
                  comValor === opcao ? 'bg-ana-vermelho text-white' : 'bg-ana-rosa text-ana-vinho'
                }`}
              >
                {opcao ? `Com valor (${formatBRL(totalCentavos)})` : 'Sem valor'}
              </button>
            ))}
          </div>
        )}
        <div className="mx-auto aspect-square w-56 rounded-2xl bg-white p-2 ring-1 ring-borda">
          {qr && <img src={qr} alt="QR code Pix" className="size-full" />}
        </div>
        <p className="mt-2 text-xs font-semibold text-tinta-suave">
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
