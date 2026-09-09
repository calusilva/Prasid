# Prasid Ibérica — Website institucional

Site da **Prasid Ibérica – Comércio de Químicos e Têxteis, Lda** (fundada em
1986 como David Andrade, Lda). Três áreas com identidade visual própria:

| Página        | Rota        | Paleta                        | Animação temática                         |
| ------------- | ----------- | ----------------------------- | ---------------------------------------- |
| **Home**      | `/`         | neutros soft (bege / grafite) | scroll que "divide" o ecrã em duas áreas |
| **Químicos**  | `/quimicos` | roxo / ciano técnico frio     | gotas fluidas reativas a rato e scroll   |
| **Têxteis**   | `/texteis`  | terrosos quentes (terracota)  | cortina a abrir + configurador de calhas |

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (configuração em `src/app/globals.css`, sem `tailwind.config`)
- **motion** (Framer Motion) para animações
- **Resend** + **Zod** no endpoint de propostas

## Arrancar

```bash
npm install
cp .env.example .env.local   # opcional — ver secção "Envio de propostas"
npm run dev                  # http://localhost:3000
npm run build && npm start   # produção
```

## Estrutura

```
src/
├── app/
│   ├── layout.tsx              Header/Footer, fontes, metadata + JSON-LD
│   ├── page.tsx                Home
│   ├── quimicos/page.tsx
│   ├── texteis/page.tsx
│   └── api/proposta/route.ts   recebe o pedido do configurador
├── components/
│   ├── layout/                 Header, Footer, SectionThemer
│   ├── ui/                     Container, Button, Reveal, SectionHeading
│   ├── shared/ContactBlock.tsx
│   ├── home/                   Hero, SplitAreas, About
│   ├── quimicos/               QuimicosHero, FluidCanvas, CategoryGrid, ...
│   └── texteis/
│       ├── CurtainReveal, TexteisHero, FabricGrid, TexteisIntro
│       └── configurator/       CalhaConfigurator (wizard) + ProposalSummary
└── lib/
    ├── company.ts              ← dados institucionais (morada, telefone, história)
    ├── themes.ts               ← paletas por secção
    ├── divisions.ts            ← textos e categorias das duas divisões
    ├── configurator-options.ts ← opções do wizard (calhas, materiais, tecidos)
    └── pricing.ts              ← motor de estimativa de preço
```

### Sistema de temas

Cada página é envolvida por `<SectionThemer section="...">`, que aplica uma
classe (`.theme-home` / `.theme-texteis` / `.theme-quimicos`). Essas classes
definem as CSS custom properties (`--bg`, `--ink`, `--accent`, …) em
`globals.css`. Os componentes leem sempre `bg-[var(--bg)]`,
`text-[var(--ink)]` — **nunca cores hardcoded**. Trocar de secção troca
paleta + textura de fundo + temperatura da animação.

## Configurador de calhas

Wizard de 5 passos em `src/components/texteis/configurator/`:
tipo de calha → material → tecido → medidas → contacto → resumo.

A **estimativa atualiza em tempo real**. Toda a matemática está isolada em
`src/lib/pricing.ts`:

```ts
export const PRECO_M2 = 45;          // €/m² — VALOR DE EXEMPLO, ajustar
export const TAXA_IVA = 0.23;        // usar 0 para esconder o IVA
export const MULT_CALHA = { ... };   // multiplicador por tipo de calha
export const MULT_MATERIAL = { ... };
export const MULT_ACABAMENTO = { ... };
```

Para adicionar/remover opções, editar `src/lib/configurator-options.ts`
(os `id` têm de coincidir com as chaves dos multiplicadores em `pricing.ts`).

## Envio de propostas

O botão **"Pedir Proposta"** faz `POST /api/proposta`. O handler:

1. valida os dados com Zod;
2. **se `RESEND_API_KEY` estiver definida** → envia email HTML formatado
   (tabela com cliente + configuração + valor estimado) para `PROPOSAL_TO_EMAIL`;
3. **caso contrário, ou em falha de envio** → grava o pedido em
   `./proposals/<data>_<nome>.json` para não se perder o lead.

Variáveis (`.env.local`):

```
RESEND_API_KEY=            # https://resend.com/api-keys
PROPOSAL_TO_EMAIL=geral@prasidiberica.pt
PROPOSAL_FROM_EMAIL="Prasid Ibérica <onboarding@resend.dev>"
```

> Em produção, `PROPOSAL_FROM_EMAIL` tem de usar um domínio verificado no Resend.
> A pasta `proposals/` está no `.gitignore`.

## Conteúdo a rever

- Textos institucionais (missão, valores) — rascunho em `src/lib/company.ts`.
- `email.general` é um endereço assumido (`geral@prasidiberica.pt`) — confirmar.
- Imagens de produto: atualmente placeholders (blocos de cor / gradientes).
- Preços do configurador: todos de exemplo (ver `pricing.ts`).

## Acessibilidade e performance

- `prefers-reduced-motion` respeitado (canvas desligado, animações neutralizadas).
- Canvas de partículas em `dynamic(..., { ssr: false })` e pausado fora do ecrã.
- Mapa em `<iframe loading="lazy">`, sem API key.
- Mobile-first, sem scroll horizontal.
