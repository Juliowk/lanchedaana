import { useEffect, useState } from 'react'
import QRCode from 'qrcode'

/** Gera o QR code de um texto como data URL (PNG). */
export function useQrCode(texto: string): string | undefined {
  const [url, setUrl] = useState<string>()

  useEffect(() => {
    let ativo = true
    QRCode.toDataURL(texto, { margin: 1, width: 480, color: { dark: '#2b1a1b', light: '#ffffff' } })
      .then((u) => ativo && setUrl(u))
      .catch(() => ativo && setUrl(undefined))
    return () => {
      ativo = false
    }
  }, [texto])

  return url
}
