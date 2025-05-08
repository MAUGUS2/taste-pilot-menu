# Interactive 3‑D Menu Blueprint

_Living architectural spec – defines **what** the system is and **how** it must behave._

---

## 1 · Vision

**Create the most delightful, gamified food‑ordering interface on the web.**  
A carousel of 3‑D meals spins under the user's finger; selecting one opens a configurator where toppings appear on the model in real time. All of this loads in seconds on mid‑range phones and works offline.

- **North‑star KPI**: _Time‑to‑first‑delight_ ≤ 3 s (4 G), Checkout conversion ≥ 15 %.

---

## 2 · Target Personas

| Persona             | Key traits                        | UX needs                                             |
| ------------------- | --------------------------------- | ---------------------------------------------------- |
| Mobile foodies      | 18‑35 y, social, impulse buyers   | Thumb‑drags, one‑hand reach, instant feedback        |
| Visual explorers    | Appreciate novelty & aesthetics   | 60 fps, parallax, subtle haptics                     |
| Accessibility users | Screen‑readers, motor impairments | Full WCAG 2.2 AA, keyboard flow, reduced‑motion mode |

---

## 3 · Canonical Feature Set

1. **3‑D Carousel** with inertial drag + snap.
2. **Configurator** (size, toppings) reflected on GLTF meshes.
3. **Cart** (badge + realtime price) and **Stripe Checkout**.
4. **PWA**: installable, offline catalogue, queued orders when offline.
5. **Analytics hooks**: page/time events + funnel.
6. **Admin portal (vNext placeholder)**: CRUD products via Supabase studio.

---

## 4 · Principles & Constraints

- **Performance budget first** – every line of JS weighed.
- **Progressive enhancement** – graceful 2‑D fallback for no‑WebGL devices.
- **Accessibility ≥ visual wow** – any new effect must pass reduced‑motion & screen‑reader checks.
- **Source of truth**: relational DB; no state stored only in client.

---

## 5 · Technology Stack

| Layer      | Tech                             | Why                                          |
| ---------- | -------------------------------- | -------------------------------------------- |
| Framework  | **Next.js 14**                   | App Router, RSC, Edge‑ready                  |
| 3‑D        | **React‑Three‑Fiber** + **drei** | Declarative Three.js                         |
| Animation  | **GSAP**                         | Battle‑tested animations & physics           |
| State      | **Zustand**                      | Tiny, SSR‑safe, React 18 concurrent friendly |
| Backend    | **Supabase** (planned)           | Postgres + realtime w/out infra              |
| Deployment | **Vercel** (planned)             | Edge deployment, minimal TTFB                |
| Styling    | **Tailwind CSS**                 | Tokenized design system                      |
| Assets     | GLTF models (planned)            | Compact GPU‑optimized                        |
| CI/CD      | **GitHub Actions**               | Format checks, lint, build verification      |
| Monorepo   | **Turborepo + pnpm**             | Scalable multi-package architecture          |

---

## 6 · High‑Level Component Diagram

```mermaid
flowchart TD
  subgraph Browser
    R3F["React Three Fiber<br/>Canvas"]
    UI["Tailwind UI"]
    SW("Service‑Worker PWA<br/>(planned)")
  end
  R3F -->|fetch| EdgeAPI
  UI -->|fetch| EdgeAPI
  subgraph Edge[Next.js Edge&nbsp;Functions]
    EdgeAPI["API&nbsp;Routes<br/>(planned)"]
  end
  EdgeAPI -->|SQL| DB[(Supabase<br/>(planned))]
```

---

## 7 · Repository Layout (pnpm + Turborepo)

```text
taste-pilot-menu/
├── .git/                 # Controle de versão
├── .github/              # Configurações CI/CD
│   └── workflows/
│       └── ci.yml        # Pipeline de CI
├── .husky/               # Git hooks
│   └── pre-commit        # Verificações pré-commit
├── apps/                 # Aplicativos do monorepo
│   └── menu-web/         # App Next.js principal
│       ├── src/
│       │   └── app/      # Rotas Next.js App Router
│       │       └── page.tsx  # Componente com cubo 3D
│       ├── public/
│       └── package.json  # Dependências do app
├── packages/             # Pacotes compartilhados (futuros)
├── .prettierrc          # Configuração de formatação
├── pnpm-workspace.yaml  # Configuração do workspace
├── turbo.json           # Pipelines do Turborepo
└── package.json         # Scripts e deps do workspace
```

---

## 8 · Data Model (Planned)

```sql
-- products
id uuid primary key,
name text not null,
price_cents int not null,
model_url text not null,
thumb_url text,
created_at timestamptz default now()

-- toppings
id uuid primary key,
name text not null,
price_cents int,
mesh_name text,
created_at timestamptz default now()

-- carts
id uuid primary key,
user_id uuid,
status text check (status in ('open','pending','paid')) default 'open',
updated_at timestamptz default now()

-- cart_items
id uuid primary key,
cart_id uuid references carts(id) on delete cascade,
product_id uuid references products(id),
qty int default 1,
config jsonb,
unique (cart_id, product_id, config)
```

---

## 9 · Performance & Accessibility Targets

| Metric          | Budget              | Tool               |
| --------------- | ------------------- | ------------------ |
| LCP (Moto G 4G) | ≤ 2 s               | Lighthouse‑CI      |
| JS initial      | ≤ 150 kB gz         | SourceMap‑Explorer |
| FPS             | ≥ 55 fps (90th pct) | stats.js overlay   |
| A11y score      | ≥ 95                | Axe-Playwright     |
| CLS             | < 0.1               | Web‑Vitals         |

---

## 10 · Quality & Observability

- **Current CI stack**: GitHub Actions for format checks, linting, and build verification.
- **Planned testing**: Vitest (unit), Playwright (E2E).
- **Static analysis**: ESLint + TypeScript.
- **Code quality hooks**: Husky pre-commit hooks with Prettier.

---

## 11 · Security & Compliance (Planned)

- CSP via Next.js
- Authentication and authorization via Supabase
- OWASP headers via Next.js middleware

---

## 12 · Progressive Enhancement & Fallback (Planned)

1. **WebGL detection** – fallback for devices without WebGL support
2. **Reduced Motion** – prefers‑reduced‑motion media query support
3. **Offline capability** – PWA with service worker caching

---

## 13 · Coding Standards & Governance

- **Commit style**: Conventional Commits (type: message)
- **Branch strategy**: Feature branches with PRs to main
- **Code formatting**: Prettier
- **Quality gates**: CI must pass before merge

---

## 14 · Current Implementation Status

- ✅ **Monorepo structure**: pnpm workspace + Turborepo pipelines
- ✅ **Next.js 14 app**: Basic setup with App Router
- ✅ **React Three Fiber**: Simple rotating cube demo
- ✅ **Quality tools**: Prettier, Husky, GitHub Actions CI
- ✅ **Node.js version**: Fixed via Volta
- ⬜ **3D models**: Food items and configurator
- ⬜ **Backend integration**: Supabase setup
- ⬜ **UI components**: Menu interface
- ⬜ **Testing**: Unit and E2E test framework

---

### Blueprint v0.1 – Initial architecture spec

If any requirement here becomes invalid, open an issue or PR.
