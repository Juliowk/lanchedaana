# Planejamento — SPA "Lanche da Ana"

Aplicação de página única, hospedada no GitHub Pages, com cardápio mobile-first, carrinho com envio do pedido pelo WhatsApp, seção de pagamento via Pix e painel administrativo para editar nomes e preços.

---

## 1. Ponto crítico: GitHub Pages não tem backend

O GitHub Pages serve apenas arquivos estáticos. Isso impacta duas coisas.

### 1.1 Persistência do cardápio

Se a edição fosse salva só no `localStorage`, apenas o navegador da Ana veria a mudança. Para que todos os clientes vejam o cardápio atualizado:

- O cardápio fica em um arquivo `menu.json` dentro do repositório.
- O painel admin faz commit desse arquivo via **GitHub Contents API** (`PUT /repos/{owner}/{repo}/contents/{path}`).
- A autenticação na API usa um **fine-grained personal access token** com permissão apenas de *Contents: read and write*, restrito a esse repositório.
- Após o commit, o GitHub Pages republica o site em cerca de 1 minuto.

### 1.2 Segurança do login

- Usuário e senha ficam no JavaScript público, portanto qualquer pessoa pode lê-los.
- A senha será armazenada apenas como hash SHA-256, mas "12345678" é quebrada instantaneamente.
- Por isso, o login funciona como **portão de interface**. A proteção real é o token: sem ele, ninguém consegue alterar o `menu.json`.
- A Ana cola o token uma única vez e ele fica salvo no navegador dela.

**Credenciais:** usuário `Ana_Karla`, senha `12345678`.

**Evolução futura:** para um login de verdade, usar Supabase ou Firebase (planos gratuitos), mantendo o front-end no Pages.

---

## 2. Stack

| Item | Escolha | Motivo |
|---|---|---|
| Build | Vite + TypeScript | Leve, rápido, deploy simples |
| UI | React | Ecossistema de animação maduro |
| Animações | Motion (antigo Framer Motion) | Molas, gestos e animações de layout |
| Estilo | Tailwind CSS | Mobile-first e identidade visual rápida |
| Rotas | HashRouter (`/#/admin`) | Evita 404 do Pages ao recarregar |
| Deploy | GitHub Actions → GitHub Pages | Build e publicação automáticos a cada push |

Alternativa: Angular (stack já dominada), porém mais pesado para uma única página.

**Identidade visual:** vermelho e branco, corações como elemento decorativo, fonte arredondada (Nunito ou Baloo), seguindo o cardápio impresso.

---

## 3. Modelo de dados — `menu.json`

Preços em centavos para evitar erros de arredondamento.

```json
{
  "categorias": [
    {
      "id": "pasteis",
      "nome": "Pastéis",
      "itens": [
        { "id": "pastel-queijo", "nome": "Pastel de queijo", "precoCentavos": 1000 },
        { "id": "pastel-frango", "nome": "Pastel de frango", "precoCentavos": 1000 },
        { "id": "pastel-carne", "nome": "Pastel de carne moída", "precoCentavos": 1000 },
        { "id": "pastel-frango-queijo", "nome": "Pastel de frango com queijo", "precoCentavos": 1200 },
        { "id": "frango-bacon", "nome": "Frango com bacon", "precoCentavos": 1100 },
        { "id": "frango-calabresa", "nome": "Frango com calabresa", "precoCentavos": 1100 },
        { "id": "pizza", "nome": "Pizza", "precoCentavos": 1200 },
        { "id": "queijo-presunto", "nome": "Queijo com presunto", "precoCentavos": 1200 },
        { "id": "chocolate", "nome": "Chocolate", "precoCentavos": 1400 },
        { "id": "frango-cheddar", "nome": "Frango com cheddar", "precoCentavos": 1200 }
      ]
    },
    {
      "id": "outros",
      "nome": "Outros",
      "itens": [
        { "id": "cachorro-quente", "nome": "Cachorro quente", "precoCentavos": 700 },
        { "id": "batatinha-simples", "nome": "Batatinha simples", "precoCentavos": 1000 },
        { "id": "batatinha-cheddar", "nome": "Batatinha com cheddar", "precoCentavos": 1500 },
        { "id": "batatinha-completa", "nome": "Batatinha com cheddar, calabresa e bacon", "precoCentavos": 2000 }
      ]
    }
  ]
}
```

---

## 4. Telas

### 4.1 `/` — Cardápio (mobile-first)

- Cabeçalho com "Lanche da Ana".
- Seções por categoria, cada item com nome, preço e botões **+ / −**.
- Barra fixa no rodapé com quantidade de itens e total; ao tocar, abre o carrinho.
- Seção Pix ao final da página.

### 4.2 Carrinho (bottom sheet)

- Lista dos itens com quantidade, subtotal e opção de remover.
- Campos opcionais: nome do cliente e observação (ex.: "sem cebola").
- Botão **Enviar pedido** que abre o WhatsApp.
- Estado do carrinho persistido no `localStorage` (não se perde ao recarregar).

### 4.3 `/#/admin` — Painel administrativo

- Tela de login (usuário e senha).
- Primeiro acesso: campo para colar o token do GitHub.
- Formulário com todos os itens para editar **nome** e **preço**.
- Botão **Salvar**, que faz o commit do `menu.json`.
- Aviso de que o site leva cerca de 1 minuto para atualizar.
- Botão **Sair**.

---

## 5. Integração com WhatsApp

Link: `https://wa.me/558496275652?text=<mensagem codificada com encodeURIComponent>`

Exemplo de mensagem:

```
Olá, Ana! Gostaria de fazer um pedido:

2x Pastel de queijo — R$ 20,00
1x Batatinha com cheddar — R$ 15,00

Total: R$ 35,00
Nome: João
Obs: sem cebola
```

---

## 6. Seção Pix

- Chave Pix: `70010946411`, com botão **Copiar** e confirmação visual.
- Exibição do QR code.
- **Extra opcional:** gerar um Pix copia-e-cola com o valor do pedido já preenchido (padrão BR Code / EMV). Requer o nome do recebedor e a cidade, exatamente como constam no banco.

---

## 7. Motion

Todas as animações respeitam `prefers-reduced-motion`.

| Momento | Animação |
|---|---|
| Carregamento | Itens surgem em cascata (fade + deslize) conforme a rolagem |
| Adicionar item | Botão pulsa, um coraçãozinho sobe e o contador da barra dá um *bounce* |
| Mudança no total | Número anima a contagem |
| Abrir carrinho | Bottom sheet sobe com efeito de mola; fecha arrastando para baixo |
| Remover item | Item sai deslizando e a lista se reorganiza suavemente |
| Copiar chave Pix | Ícone vira um check animado |
| Salvar no admin | Estado de carregando, seguido de check de sucesso |

---

## 8. Fases de implementação

1. **Setup:** projeto Vite, Tailwind, workflow do GitHub Actions e `menu.json` com os itens da foto.
2. **Cardápio e carrinho:** listagem, controles de quantidade, bottom sheet e persistência local.
3. **WhatsApp e Pix:** geração da mensagem, link do WhatsApp, seção Pix e QR code.
4. **Admin:** login, configuração do token e salvamento via GitHub API.
5. **Motion e polimento:** animações, testes em celular real e ajustes finais.

---

## 9. Pendências

- [ ] **QR code do Pix:** imagem, ou nome e cidade do recebedor para gerar. *(cobrar na fase 3)*
- [ ] **Número do WhatsApp:** confirmar se é `84 9627-5652` ou `84 9 9627-5652`. Testar o link antes de concluir.
- [ ] **Nome do repositório:** define a URL final (`usuario.github.io/repo`).
- [ ] **Stack:** confirmar Vite + React ou Angular.
- [ ] **Token do GitHub:** criar o fine-grained token para a Ana após o deploy.
