# Prompt para o Claude Code

Cole o texto abaixo na sessão do Claude Code, com a pasta `brand/` já na raiz do repositório.

---

Vamos trocar a identidade visual do projeto Lanche da Ana. A nova identidade está documentada em `brand/README.md`, com os assets em `brand/logo`, `brand/icons`, `brand/favicon` e os tokens em `brand/tokens`.

Regra principal: **altere apenas a aparência**. Não mude lógica, rotas, estado do carrinho, integração com WhatsApp, Pix, login/admin, formato do `menu.json` nem animações existentes (só ajuste as cores delas, se necessário).

Siga estas etapas e pare ao fim da etapa 1 para eu aprovar:

1. **Inventário.** Leia `brand/README.md` e mapeie no código atual: onde ficam as cores (hex soltos, variáveis CSS, config do Tailwind), as fontes, o logo/cabeçalho, os ícones (biblioteca ou SVGs), o favicon e o manifest. Me mostre uma lista do que vai mudar em cada arquivo.
2. **Tokens.** Centralize cores e fontes usando `brand/tokens/tokens.css` (ou mesclando `tailwind.config.snippet.js`, se o projeto usar Tailwind). Substitua todos os hex soltos pelos tokens correspondentes.
3. **Logo.** Monte o logo do cabeçalho conforme a seção "Logo" do README (símbolo SVG + texto em HTML). Use `logo-empilhado.svg` na tela de login, se houver.
4. **Ícones.** Troque os ícones atuais pelos de `brand/icons`, mantendo `aria-label` em botões só com ícone.
5. **Componentes.** Ajuste botões, stepper, chips, itens, barra do carrinho e títulos de seção conforme "Componentes-chave". Alvos de toque de no mínimo 44 px.
6. **Favicon e PWA.** Copie os arquivos de `brand/favicon` para a pasta pública e atualize o `<head>` usando `head-snippet.html`.
7. **Verificação.** Rode o build, confira que não há erros e que nenhuma funcionalidade foi alterada. Teste em largura de 390 px. Me liste o que mudou.

Faça tudo em uma branch nova chamada `identidade-visual`.
