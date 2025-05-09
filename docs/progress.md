# Interactive 3‑D Menu — Roadmap v2

_Execution map synced with the Blueprint. **Sprints = 2 weeks**. Each phase = one GitHub Milestone; each task = one GitHub Issue following the key **P{phase}‑T{seq}** (e.g. `P1‑T3`)._

---

## 📚 Conventions & Naming

| Item               | Convention                   | Example                                   |
| ------------------ | ---------------------------- | ----------------------------------------- |
| **Milestone name** | `P{num} – <slug>`            | `P2 – Configurator`                       |
| **Issue key**      | `P{num}-T{seq}`              | `P2‑T4`                                   |
| **Issue title**    | `<emoji> <task>`             | `🏗️ P2‑T2 Toggle toppings mesh logic`     |
| **Labels**         | track, size, status          | `front-end`, `backend`, `XS`, `In Review` |
| **Projects field** | Sprint board column = status | _Todo → In Progress → Review → Done_      |

> **RACI suffix in issue body**: `RACI: D=alice, R=bob, A=carol, C=devops`.

---

## Legend (Tracks)

🎨 Design 🏗️ Front‑end 🔌 Back‑end/Edge 🛠️ DevOps 🧪 QA/Perf 📈 KPI ⚠️ Risk

---

## P0 – Foundation (🔧 Sprint 0) - CURRENT SPRINT

🚩 **Milestone goal**: Dev environment & CI skeleton.

| Key   | Track | Task                                                           | Status | Notes                                                      |
| ----- | ----- | -------------------------------------------------------------- | ------ | ---------------------------------------------------------- |
| P0‑T1 | 🛠️    | Monorepo bootstrap (pnpm + Turborepo, Prettier, ESLint, Husky) | ✅     | Completed with pnpm workspaces, Turborepo, Prettier, Husky |
| P0‑T2 | 🏗️    | App scaffold (Next 14, Tailwind, r3f, drei, GSAP, Zustand)     | ✅     | Next.js app with R3F cube demo running                     |
| P0‑T3 | 🛠️    | GitHub Actions CI (lint → format → build)                      | ✅     | Basic CI pipeline implemented                              |
| P0‑T4 | 🧪    | Quality gate (fail if > 2 % tests regress)                     | ⏳     | Need to add testing infrastructure                         |

📈 _Current Status_: Basic dev environment and architecture established. Build system and CI pipeline functional. 3/4 tasks completed.

⏭️ _Next Steps_:

- Add testing infrastructure
- Create GitHub issues for P1 tasks
- Set up milestone for P1

---

## P1 – 3‑D Carousel MVP (🌀 Sprint 1) - NEXT UP

🚩 **Milestone goal**: Interactive carousel of menu items.

| Key   | Track | Task                                                       | Prep Work Needed                                           | Priority |
| ----- | ----- | ---------------------------------------------------------- | ---------------------------------------------------------- | -------- |
| P1‑T1 | 🎨    | Create low‑poly burger GLB (≤ 500 kB after Draco+KTX2)     | Research 3D modeling options, Draco compression            | HIGH     |
| P1‑T2 | 🏗️    | Build Carousel component (polar positions, GSAP Draggable) | Review GSAP Draggable docs, experiment with 3D positioning | HIGH     |
| P1‑T3 | 🏗️    | Route on select (`/item/:id`)                              | Set up Next.js app routing                                 | MEDIUM   |
| P1‑T4 | 🧪    | Perf validation (Lighthouse ≥ 80)                          | Prepare performance measurement baseline                   | LOW      |

📈 _Target Bundle_: ≤ 150 kB gz.

⚠️ _Risk Mitigation_: Research iOS passive listener behavior for proper touch events.

---

## P2 – Configurator (🍔 Sprint 2)

| Key   | Track | Task                                     | DoD                                  |
| ----- | ----- | ---------------------------------------- | ------------------------------------ |
| P2‑T1 | 🎨    | UI overlay design tokens exported        | Token file in repo `/packages/ui`    |
| P2‑T2 | 🏗️    | Mesh toggle logic (cheese/lettuce/bacon) | Toggle < 100 ms render               |
| P2‑T3 | 🔌    | Edge pricing endpoint + SW cache         | Endpoint returns price in 50 ms Edge |
| P2‑T4 | 🧪    | A11y keyboard nav + `aria-live` price    | Axe-core score 0 critical            |
| P2‑T5 | ⚠️    | Dispose unused textures                  | Memory profile stable < 120 MB       |

📈 LCP ≤ 1.8 s 3 G simulated.

---

## P3 – Realtime Cart (🛒 Sprint 3)

| Key   | Track | Task                                  | DoD                            |
| ----- | ----- | ------------------------------------- | ------------------------------ |
| P3‑T1 | 🔌    | Supabase schema `cart_items` RLS anon | Insert succeeds via PostgREST  |
| P3‑T2 | 🔌    | tRPC add/remove APIs + WS broadcast   | Multi‑tab sync < 1 s           |
| P3‑T3 | 🏗️    | Cart drawer optimistic UI             | Matches backend state after WS |
| P3‑T4 | 🧪    | k6 latency p95 < 200 ms SP            | Report stored CI               |
| P3‑T5 | ⚠️    | Queue offline mutations in IndexedDB  | Orders replay on reconnect     |

📈 Error rate < 0.1 %.

---

## P4 – Checkout & Payments (💳 Sprint 4)

| Key   | Track | Task                                          | DoD                            |
| ----- | ----- | --------------------------------------------- | ------------------------------ |
| P4‑T1 | 🔌    | Stripe Checkout Session API                   | Redirect & session id returned |
| P4‑T2 | 🔌    | Webhook handler saves `orders`                | Verified sig, row insert       |
| P4‑T3 | 🏗️    | Confirmation page with snapshot (canvas→blob) | Snapshot stored in S3          |
| P4‑T4 | 🧪    | Playwright E2E w/ test card                   | Passes headless run            |
| P4‑T5 | ⚠️    | Optimistic "processing" state                 | UI updates within 100 ms       |

📈 Payment success ≥ 95 %.

---

## P5 – PWA Offline (📱 Sprint 5)

| Key   | Track | Task                              | DoD                          |
| ----- | ----- | --------------------------------- | ---------------------------- |
| P5‑T1 | 🛠️    | Service Worker caching (next‑pwa) | Models precached, SW install |
| P5‑T2 | 🏗️    | Custom install prompt after 30 s  | Trigger tested in Chrome     |
| P5‑T3 | 🧪    | Offline flow with BG sync         | Order stored & flushed       |

📈 Lighthouse PWA 100.

---

## P6 – Polish & A11y (✨ Sprint 6)

| Key   | Track | Task                        | DoD                            |
| ----- | ----- | --------------------------- | ------------------------------ |
| P6‑T1 | 🎨    | HDRI env map & soft shadows | Visual approval by Design lead |
| P6‑T2 | 🏗️    | Skeleton & error boundaries | Network fail shows retry UI    |
| P6‑T3 | 🧪    | Manual NVDA + VoiceOver     | No blocking issues             |

📈 CLS < 0.1; A11y 100.

---

## P7 – WebGPU Spike (🚀 Sprint 7)

Experimental; off‑mainline.

| Key   | Track | Task                             | DoD                       |
| ----- | ----- | -------------------------------- | ------------------------- |
| P7‑T1 | 🏗️    | Port scene to `@react-three/gpu` | Build behind feature flag |
| P7‑T2 | 🧪    | Benchmark FPS gain               | ≥ 20 % faster on Pixel 6  |
| P7‑T3 | ⚠️    | Safari fallback to WebGL         | No crash on iOS           |

---

## P8 – Launch & Analytics (🚢 Sprint 8)

| Key   | Track | Task                     | DoD                      |
| ----- | ----- | ------------------------ | ------------------------ |
| P8‑T1 | 🛠️    | GA4 + LogRocket funnel   | Events seen in dashboard |
| P8‑T2 | 🧪    | k6 500 rps load test     | Sustain 95 % ok          |
| P8‑T3 | 📈    | Monitor conversion > 5 % | GA4 report shows metric  |

---

## ♻️ Continuous Duties (Ongoing)

- **Weekly triage** (Project board) — update issue status, adjust sprint scope.
- **Dependabot** auto‑merge patch; major → `P0‑T*` hotfix issues.
- **Security scan** (OWASP ZAP) nightly.

> _Change protocol_: Modify this roadmap via PR; require PO approval + tag `roadmap-update`.
