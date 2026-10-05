# Identidade visual — Lanche da Ana

Guia de referência para aplicar a marca na SPA. Toda decisão visual do projeto deve partir daqui.

## Conceito

O símbolo é um **pastel em meia-lua dourado**, com as marcas de garfo na borda e um **coração no centro**. Os três coraçõezinhos acima dele (o "vapor") retomam o motivo de três corações do cardápio impresso. O nome destaca **"Ana"** em letra grande e arredondada, mantendo o tom acolhedor e caseiro.

## Cores

| Nome | Hex | Token CSS | Uso |
|---|---|---|---|
| Vermelho Ana | `#D63C45` | `--cor-vermelho-ana` | Botões primários, títulos de seção, barra do carrinho, chip ativo |
| Vinho | `#7A1C26` | `--cor-vinho` | Preços, traço do logo, ícones, texto de destaque, botão secundário (contorno) |
| Dourado Pastel | `#F2B544` | `--cor-dourado-pastel` | Badge do carrinho, selos, estado de sucesso |
| Rosa Coração | `#FCE8E9` | `--cor-rosa-coracao` | Fundos de seção, chips inativos, fundo do stepper (− 2 +) |
| Tinta | `#2B1A1C` | `--cor-tinta` | Texto principal |
| Tinta suave | `#5C4447` | `--cor-tinta-suave` | Texto secundário, legendas |
| Borda | `#F3D3D5` | `--cor-borda` | Divisórias entre itens, bordas |
| Branco | `#FFFFFF` | `--cor-branco` | Fundo da página |

**Contraste:** texto branco sobre Vermelho Ana passa em WCAG AA (≈4,6:1). Sobre o Dourado, use sempre Tinta, nunca branco.

## Tipografia

- **Títulos:** Baloo 2, peso 800 (ExtraBold). Nomes de seção ("Pastéis", "Outros", "Pix") e o nome da marca.
- **Textos:** Nunito. Nome do item em 700, preço em 800 na cor Vinho, textos de apoio em 600.
- Ambas via Google Fonts (import já incluído em `tokens/tokens.css`).
- Preços sempre no formato `R$ 12,00`.

## Logo

| Arquivo | Quando usar |
|---|---|
| `logo/logo-horizontal.svg` | Padrão, sobre fundo branco ou claro |
| `logo/logo-horizontal-sobre-vermelho.svg` | Sobre fundo Vermelho Ana |
| `logo/logo-horizontal-vinho.svg` | Uma cor, em fundos claros |
| `logo/logo-horizontal-branco.svg` | Uma cor, sobre fundos escuros ou fotos |
| `logo/logo-empilhado.svg` | Espaços quadrados (tela de login, rodapé) |
| `logo/simbolo.svg` | Só o símbolo, quando o nome já aparece por perto |
| `logo/simbolo-mono.svg` | Símbolo em `currentColor`, herda a cor do texto |

**No cabeçalho do app**, prefira montar o logo em HTML: `simbolo.svg` + texto ("LANCHE DA" em Baloo 2 700, letras espaçadas, cor Vinho; "Ana" em Baloo 2 800, cor Vermelho Ana). Os SVGs com texto dependem da fonte Baloo 2 estar carregada na página.

**Não fazer:** distorcer, trocar as cores do símbolo, aplicar sombra ou contorno, colocar a versão colorida sobre fundos que escondam o dourado.

## Ícones

Pasta `icons/`. Todos em grade 24×24, traço 2 px arredondado e `stroke="currentColor"`, ou seja, herdam a cor do elemento pai. Cor padrão: Vinho; branco dentro de botões vermelhos.

`pastel`, `cachorro-quente`, `batatinha`, `carrinho`, `adicionar`, `diminuir`, `mais`, `menos`, `remover`, `fechar`, `enviar-pedido`, `qrcode`, `copiar`, `confirmar`, `entrar`, `editar`, `sair`, `coracao`, `seta-direita`.

Para WhatsApp e Pix foram usados ícones genéricos (`enviar-pedido` e `qrcode`). Se forem usados os logos oficiais dessas marcas, seguir os guias de uso delas.

## Componentes-chave

- **Botão adicionar:** círculo 44 px, fundo Vermelho Ana, ícone `mais` branco.
- **Stepper (− 2 +):** pílula Rosa Coração; botão − transparente com ícone Vinho; botão + vermelho; quantidade em Nunito 800.
- **Barra do carrinho:** fixa no rodapé, 12 px das laterais, raio 22 px, fundo Vermelho Ana, sombra flutuante. Ícone `carrinho` com badge Dourado mostrando a quantidade; total em destaque; "Ver carrinho" + `seta-direita` à direita.
- **Chips de categoria:** altura 44 px, pílula; ativo em Vermelho Ana com texto branco, inativo em Rosa Coração com texto Vinho.
- **Item do cardápio:** nome à esquerda (Nunito 700, Tinta) com preço abaixo (Nunito 800, Vinho); controle à direita; divisória Borda.
- **Botão primário:** altura 56 px, raio 18 px, Vermelho Ana, texto branco Nunito 800.
- **Botão secundário:** mesmo tamanho, fundo branco, contorno 2 px Vinho.
- **Títulos de seção:** Baloo 2 800, Vermelho Ana, seguidos de três coraçõezinhos.
- **Alvos de toque:** mínimo 44×44 px.

## Favicon e PWA

Pasta `favicon/`: `favicon.svg`, PNGs 16/32/180/192/512, ícone maskable, `manifest.webmanifest` e `head-snippet.html` com as tags para o `<head>`.

## Referência visual

Canvas com todas as pranchas (logo, variações, ícones, paleta e mockup mobile): https://claude.ai/artifact/4U6SywK7MNcCvgwDPmmU9L
