import { config } from '../config'

// Gera o "Pix copia e cola" estático no padrão BR Code (EMV QRCPS-MPM) do Banco Central.

function campo(id: string, valor: string): string {
  return id + valor.length.toString().padStart(2, '0') + valor
}

function normalizar(texto: string, max: number): string {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^A-Za-z0-9 ]/g, '')
    .toUpperCase()
    .slice(0, max)
}

/** CRC16-CCITT (polinômio 0x1021, valor inicial 0xFFFF), exigido no campo 63. */
function crc16(payload: string): string {
  let crc = 0xffff
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8
    for (let b = 0; b < 8; b++) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1
      crc &= 0xffff
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0')
}

export function gerarPixCopiaECola(valorCentavos?: number): string {
  const { chave, nomeRecebedor, cidade } = config.pix
  const contaRecebedor = campo('00', 'br.gov.bcb.pix') + campo('01', chave)

  let payload =
    campo('00', '01') +
    campo('26', contaRecebedor) +
    campo('52', '0000') +
    campo('53', '986') +
    (valorCentavos && valorCentavos > 0 ? campo('54', (valorCentavos / 100).toFixed(2)) : '') +
    campo('58', 'BR') +
    campo('59', normalizar(nomeRecebedor, 25)) +
    campo('60', normalizar(cidade, 15)) +
    campo('62', campo('05', '***'))

  payload += '6304'
  return payload + crc16(payload)
}
