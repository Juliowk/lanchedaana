import { useCallback, useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { config } from '../config'
import { Heart } from '../components/icons'
import { sha256 } from '../lib/browser'
import { lerMenuDoRepo, salvarMenuNoRepo, tokenStorage } from '../lib/github'
import type { Menu } from '../lib/menu'
import { centavosParaTexto, parseBRL } from '../lib/money'

const SESSAO_KEY = 'lanche-da-ana:admin'

function lerSessao() {
  try {
    return sessionStorage.getItem(SESSAO_KEY) === '1'
  } catch {
    return false
  }
}

export function AdminPage() {
  const [logado, setLogado] = useState(lerSessao)
  const [token, setToken] = useState(tokenStorage.get)

  const entrar = () => {
    sessionStorage.setItem(SESSAO_KEY, '1')
    setLogado(true)
  }
  const sair = () => {
    sessionStorage.removeItem(SESSAO_KEY)
    setLogado(false)
  }
  const salvarToken = (t: string) => {
    tokenStorage.set(t)
    setToken(t)
  }
  const trocarToken = () => {
    tokenStorage.clear()
    setToken(null)
  }

  return (
    <div className="min-h-dvh bg-ana-50">
      <header className="bg-ana-600 px-4 py-4 text-white shadow">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold">
            <Heart className="size-5" /> Lanche da Ana
          </Link>
          {logado && (
            <button type="button" onClick={sair} className="rounded-full bg-white/15 px-4 py-1.5 text-sm font-bold hover:bg-white/25">
              Sair
            </button>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8">
        {!logado ? (
          <Login aoEntrar={entrar} />
        ) : !token ? (
          <ConfigurarToken aoSalvar={salvarToken} />
        ) : (
          <Editor token={token} aoTrocarToken={trocarToken} />
        )}
      </main>
    </div>
  )
}

function Cartao({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-md rounded-3xl bg-white p-6 shadow-sm ring-1 ring-ana-100"
    >
      <h1 className="mb-4 font-display text-2xl font-bold text-ana-700">{titulo}</h1>
      {children}
    </motion.div>
  )
}

const campo =
  'mt-1 w-full rounded-xl border border-ana-200 bg-ana-50/50 px-4 py-3 outline-none focus:border-ana-500 focus:ring-2 focus:ring-ana-200'
const botaoPrimario =
  'w-full rounded-2xl bg-ana-600 px-5 py-3 font-extrabold text-white shadow-md shadow-ana-600/30 hover:bg-ana-700 disabled:opacity-60'

function Login({ aoEntrar }: { aoEntrar: () => void }) {
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState(false)

  const enviar = async (e: FormEvent) => {
    e.preventDefault()
    const ok = usuario.trim() === config.admin.usuario && (await sha256(senha)) === config.admin.senhaSha256
    if (ok) aoEntrar()
    else setErro(true)
  }

  return (
    <Cartao titulo="Área da Ana">
      <form onSubmit={enviar} className="space-y-4">
        <label className="block">
          <span className="text-sm font-bold">Usuário</span>
          <input value={usuario} onChange={(e) => setUsuario(e.target.value)} autoComplete="username" className={campo} />
        </label>
        <label className="block">
          <span className="text-sm font-bold">Senha</span>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            autoComplete="current-password"
            className={campo}
          />
        </label>
        {erro && <p className="text-sm font-bold text-ana-600">Usuário ou senha incorretos.</p>}
        <button type="submit" className={botaoPrimario}>
          Entrar
        </button>
      </form>
    </Cartao>
  )
}

function ConfigurarToken({ aoSalvar }: { aoSalvar: (t: string) => void }) {
  const [valor, setValor] = useState('')

  return (
    <Cartao titulo="Configurar acesso">
      <p className="text-sm text-tinta/70">
        Cole aqui o token do GitHub. Isso é feito só uma vez: ele fica salvo neste navegador e permite salvar o cardápio.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (valor.trim()) aoSalvar(valor.trim())
        }}
        className="mt-4 space-y-4"
      >
        <label className="block">
          <span className="text-sm font-bold">Token do GitHub</span>
          <input
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            placeholder="github_pat_..."
            autoComplete="off"
            spellCheck={false}
            className={`${campo} font-mono text-sm`}
          />
        </label>
        <button type="submit" disabled={!valor.trim()} className={botaoPrimario}>
          Salvar token
        </button>
      </form>
    </Cartao>
  )
}

interface Rascunho {
  nome: string
  preco: string
}

type EstadoSalvar = 'parado' | 'salvando' | 'sucesso' | 'erro'

function Editor({ token, aoTrocarToken }: { token: string; aoTrocarToken: () => void }) {
  const [menu, setMenu] = useState<Menu>()
  const [sha, setSha] = useState('')
  const [rascunho, setRascunho] = useState<Record<string, Rascunho>>({})
  const [erroCarga, setErroCarga] = useState<string>()
  const [estado, setEstado] = useState<EstadoSalvar>('parado')
  const [mensagem, setMensagem] = useState('')

  const carregar = useCallback(() => {
    setErroCarga(undefined)
    setMenu(undefined)
    lerMenuDoRepo(token)
      .then(({ menu, sha }) => {
        setMenu(menu)
        setSha(sha)
        setRascunho(
          Object.fromEntries(
            menu.categorias.flatMap((c) =>
              c.itens.map((i) => [i.id, { nome: i.nome, preco: centavosParaTexto(i.precoCentavos) }]),
            ),
          ),
        )
      })
      .catch((e: Error) => setErroCarga(e.message))
  }, [token])

  useEffect(carregar, [carregar])

  if (erroCarga) {
    return (
      <Cartao titulo="Não foi possível abrir o cardápio">
        <p className="text-sm text-ana-700">{erroCarga}</p>
        <div className="mt-4 flex gap-2">
          <button type="button" onClick={carregar} className={botaoPrimario}>
            Tentar de novo
          </button>
          <button type="button" onClick={aoTrocarToken} className="w-full rounded-2xl px-5 py-3 font-bold text-ana-700 ring-2 ring-ana-200">
            Trocar token
          </button>
        </div>
      </Cartao>
    )
  }

  if (!menu) {
    return (
      <div className="mt-16 flex justify-center" aria-label="Carregando">
        <Heart className="size-10 animate-pulse text-ana-500" />
      </div>
    )
  }

  const invalidos = new Set(
    Object.entries(rascunho)
      .filter(([, r]) => !r.nome.trim() || parseBRL(r.preco) === null)
      .map(([id]) => id),
  )

  const atualizar = (id: string, mudanca: Partial<Rascunho>) => {
    setRascunho((r) => ({ ...r, [id]: { ...r[id], ...mudanca } }))
    if (estado !== 'salvando') setEstado('parado')
  }

  const salvar = async () => {
    if (invalidos.size) return
    const novo: Menu = {
      categorias: menu.categorias.map((c) => ({
        ...c,
        itens: c.itens.map((i) => ({
          ...i,
          nome: rascunho[i.id].nome.trim(),
          precoCentavos: parseBRL(rascunho[i.id].preco)!,
        })),
      })),
    }
    setEstado('salvando')
    try {
      const novoSha = await salvarMenuNoRepo(token, novo, sha)
      setSha(novoSha)
      setMenu(novo)
      setEstado('sucesso')
      setMensagem('Cardápio salvo! O site leva cerca de 1 minuto para atualizar.')
    } catch (e) {
      setEstado('erro')
      setMensagem((e as Error).message)
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="font-display text-3xl font-bold text-ana-700">Editar cardápio</h1>
          <p className="text-sm text-tinta/60">Altere nomes e preços e toque em Salvar.</p>
        </div>
        <button type="button" onClick={aoTrocarToken} className="text-sm text-tinta/50 underline-offset-2 hover:text-ana-600 hover:underline">
          Trocar token
        </button>
      </div>

      {menu.categorias.map((categoria) => (
        <section key={categoria.id} className="mb-8">
          <h2 className="mb-3 font-display text-xl font-bold text-ana-700">{categoria.nome}</h2>
          <ul className="space-y-2">
            {categoria.itens.map((item) => {
              const r = rascunho[item.id]
              const precoInvalido = parseBRL(r.preco) === null
              return (
                <li key={item.id} className="flex gap-2 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-ana-100">
                  <label className="min-w-0 flex-1">
                    <span className="sr-only">Nome</span>
                    <input
                      value={r.nome}
                      onChange={(e) => atualizar(item.id, { nome: e.target.value })}
                      className={`w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-ana-200 ${
                        r.nome.trim() ? 'border-ana-100' : 'border-ana-500'
                      }`}
                    />
                  </label>
                  <label className="relative w-28 shrink-0">
                    <span className="sr-only">Preço</span>
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-tinta/50">R$</span>
                    <input
                      value={r.preco}
                      inputMode="decimal"
                      onChange={(e) => atualizar(item.id, { preco: e.target.value })}
                      className={`w-full rounded-xl border py-2 pl-9 pr-3 text-right tabular-nums outline-none focus:ring-2 focus:ring-ana-200 ${
                        precoInvalido ? 'border-ana-500 bg-ana-50' : 'border-ana-100'
                      }`}
                    />
                  </label>
                </li>
              )
            })}
          </ul>
        </section>
      ))}

      <div className="sticky bottom-0 -mx-4 bg-gradient-to-t from-ana-50 via-ana-50 to-transparent px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-6">
        <AnimatePresence mode="wait">
          {(estado === 'sucesso' || estado === 'erro') && (
            <motion.p
              key={estado}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              role="status"
              className={`mb-3 rounded-xl px-4 py-3 text-sm font-bold ${
                estado === 'sucesso' ? 'bg-emerald-50 text-emerald-700' : 'bg-ana-100 text-ana-800'
              }`}
            >
              {mensagem}
            </motion.p>
          )}
        </AnimatePresence>
        {invalidos.size > 0 && (
          <p className="mb-3 text-sm font-bold text-ana-700">Corrija os campos destacados (nome vazio ou preço inválido).</p>
        )}
        <BotaoSalvar estado={estado} desabilitado={invalidos.size > 0} aoClicar={salvar} />
      </div>
    </div>
  )
}

function BotaoSalvar({ estado, desabilitado, aoClicar }: { estado: EstadoSalvar; desabilitado: boolean; aoClicar: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={aoClicar}
      disabled={desabilitado || estado === 'salvando'}
      whileTap={{ scale: 0.97 }}
      className={`flex h-14 w-full items-center justify-center gap-2 rounded-2xl text-lg font-extrabold text-white shadow-lg transition-colors disabled:opacity-60 ${
        estado === 'sucesso' ? 'bg-emerald-600 shadow-emerald-600/30' : 'bg-ana-600 shadow-ana-600/30'
      }`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {estado === 'salvando' ? (
          <motion.span key="salvando" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <span className="size-5 animate-spin rounded-full border-[3px] border-white/40 border-t-white" />
            Salvando...
          </motion.span>
        ) : estado === 'sucesso' ? (
          <motion.span key="sucesso" className="flex items-center gap-2" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
            <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4 }} />
            </svg>
            Salvo
          </motion.span>
        ) : (
          <motion.span key="parado" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Salvar
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
