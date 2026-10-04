import { config } from '../config'
import type { Menu } from './menu'

const TOKEN_KEY = 'lanche-da-ana:github-token'

export const tokenStorage = {
  get: () => {
    try {
      return localStorage.getItem(TOKEN_KEY)
    } catch {
      return null
    }
  },
  set: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
}

const { owner, repo, branch, menuPath } = config.github
const url = `https://api.github.com/repos/${owner}/${repo}/contents/${menuPath}`

function headers(token: string): HeadersInit {
  return {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${token}`,
    'X-GitHub-Api-Version': '2022-11-28',
  }
}

function base64ParaTexto(b64: string): string {
  const binario = atob(b64.replace(/\n/g, ''))
  return new TextDecoder().decode(Uint8Array.from(binario, (c) => c.charCodeAt(0)))
}

function textoParaBase64(texto: string): string {
  let binario = ''
  new TextEncoder().encode(texto).forEach((b) => (binario += String.fromCharCode(b)))
  return btoa(binario)
}

async function erroDaApi(res: Response): Promise<Error> {
  if (res.status === 401) return new Error('Token inválido ou expirado.')
  if (res.status === 403) return new Error('O token não tem permissão de escrita neste repositório.')
  if (res.status === 404) return new Error('Repositório ou arquivo não encontrado (verifique o acesso do token).')
  if (res.status === 409) return new Error('O cardápio foi alterado em outro lugar. Recarregue a página e tente de novo.')
  const corpo = await res.json().catch(() => null)
  return new Error(corpo?.message ?? `Erro ${res.status} na API do GitHub.`)
}

/** Lê o menu.json direto do repositório (sempre a versão mais recente) e o SHA necessário para salvar. */
export async function lerMenuDoRepo(token: string): Promise<{ menu: Menu; sha: string }> {
  const res = await fetch(`${url}?ref=${branch}`, { headers: headers(token), cache: 'no-store' })
  if (!res.ok) throw await erroDaApi(res)
  const dados = await res.json()
  return { menu: JSON.parse(base64ParaTexto(dados.content)), sha: dados.sha }
}

/** Faz o commit do menu.json e retorna o novo SHA. */
export async function salvarMenuNoRepo(token: string, menu: Menu, sha: string): Promise<string> {
  const res = await fetch(url, {
    method: 'PUT',
    headers: headers(token),
    body: JSON.stringify({
      message: 'Atualiza cardápio pelo painel admin',
      content: textoParaBase64(JSON.stringify(menu, null, 2) + '\n'),
      sha,
      branch,
    }),
  })
  if (!res.ok) throw await erroDaApi(res)
  const dados = await res.json()
  return dados.content.sha
}
