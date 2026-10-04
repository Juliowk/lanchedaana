# Lanche da Ana

Cardápio online do Lanche da Ana: pedido pelo WhatsApp e pagamento por Pix.

Site: https://juliowk.github.io/lanchedaana/

## Desenvolvimento

```bash
npm install
npm run dev      # http://localhost:5173/
npm run build    # gera dist/
```

Stack: Vite + React + TypeScript, Tailwind CSS e Motion.

## Onde ficam as coisas

| O quê | Arquivo |
|---|---|
| Cardápio (itens e preços em centavos) | [public/menu.json](public/menu.json) |
| WhatsApp, chave Pix e nome/cidade do recebedor | [src/config.ts](src/config.ts) |
| Deploy automático | [.github/workflows/deploy.yml](.github/workflows/deploy.yml) |

## Primeira publicação

1. No GitHub, abra **Settings → Pages** e, em **Source**, escolha **GitHub Actions**.
2. Cada push na `main` faz o build e publica o site (cerca de 1 minuto).

## Alterar o cardápio

Edite [public/menu.json](public/menu.json) (direto no GitHub ou localmente) e faça commit na `main`. Os preços ficam em centavos (`1200` = R$ 12,00). O site atualiza em cerca de 1 minuto.

## Pix

O QR code e o "Pix copia e cola" são gerados no navegador seguindo o padrão BR Code do Banco Central. Quando há itens no carrinho, o código já sai com o valor do pedido. O nome e a cidade do recebedor ficam em `src/config.ts` e devem ser iguais aos cadastrados no banco.
