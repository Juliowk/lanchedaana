# Lanche da Ana

Cardápio online do Lanche da Ana: pedido pelo WhatsApp, pagamento por Pix e painel para a Ana editar nomes e preços.

Site: https://juliowk.github.io/lanchedaana/ · Painel: https://juliowk.github.io/lanchedaana/#/admin

## Desenvolvimento

```bash
npm install
npm run dev      # http://localhost:5173/lanchedaana/
npm run build    # gera dist/
```

Stack: Vite + React + TypeScript, Tailwind CSS, Motion e HashRouter.

## Onde ficam as coisas

| O quê | Arquivo |
|---|---|
| Cardápio (itens e preços em centavos) | [public/menu.json](public/menu.json) |
| WhatsApp, chave Pix, nome/cidade do recebedor, login e repositório | [src/config.ts](src/config.ts) |
| Deploy automático | [.github/workflows/deploy.yml](.github/workflows/deploy.yml) |

## Primeira publicação

1. No GitHub, abra **Settings → Pages** e, em **Source**, escolha **GitHub Actions**.
2. Cada push na `main` faz o build e publica o site (cerca de 1 minuto).

## Token da Ana (painel admin)

O painel salva o cardápio fazendo um commit no `public/menu.json` pela API do GitHub. Para isso é preciso um token:

1. GitHub → **Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**.
2. **Repository access:** *Only select repositories* → `lanchedaana`.
3. **Permissions → Repository permissions → Contents:** *Read and write*.
4. Em `/#/admin`, a Ana entra com o usuário e a senha e cola o token uma vez. Ele fica salvo no navegador dela.

O login (`Ana_Karla`) é só um portão de interface, já que a senha fica no JavaScript público. Quem protege o cardápio de verdade é o token: sem ele, ninguém consegue alterar o `menu.json`.

## Pix

O QR code e o "Pix copia e cola" são gerados no navegador seguindo o padrão BR Code do Banco Central. Quando há itens no carrinho, o código já sai com o valor do pedido. O nome e a cidade do recebedor ficam em `src/config.ts` e devem ser iguais aos cadastrados no banco.
