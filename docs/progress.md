# Interactive 3‑D Menu — Roadmap v2

_Execution map synced with the Blueprint. **Sprints = 2 weeks**. Each phase = one GitHub Milestone; each task = one GitHub Issue following the key **P{phase}‑T{seq}** (e.g. `P1‑T3`)._

---

## P0 – Foundation (🔧 Sprint 0) - COMPLETED ✅

🚩 **Milestone goal**: Dev environment & CI skeleton.

| Key   | Track | Task                                                           | Status | Notes                                                      |
| ----- | ----- | -------------------------------------------------------------- | ------ | ---------------------------------------------------------- |
| P0‑T1 | ��️   | Monorepo bootstrap (pnpm + Turborepo, Prettier, ESLint, Husky) | ✅     | Completed with pnpm workspaces, Turborepo, Prettier, Husky |
| P0‑T2 | 🏗️    | App scaffold (Next 14, Tailwind, r3f, drei, GSAP, Zustand)     | ✅     | Next.js app with R3F cube demo running                     |
| P0‑T3 | 🛠️    | GitHub Actions CI (lint → format → build)                      | ✅     | Basic CI pipeline implemented                              |
| P0‑T4 | 🧪    | Quality gate (fail if > 2 % tests regress)                     | ✅     | Implemented basic tests with Vitest                        |

📈 _Current Status_: Development foundation configured. Development environment working correctly with CI/CD. Unit tests set up and working for React + R3F components. GitFlow implemented with main/develop branches.

---

## P1 – 3‑D Carousel MVP (🌀 Sprint 1) - CURRENT SPRINT 🔄

🚩 **Milestone goal**: Interactive carousel of menu items.

| Key   | Track | Task                                                       | Status | Notes                                                               |
| ----- | ----- | ---------------------------------------------------------- | ------ | ------------------------------------------------------------------- |
| P1‑T1 | 🎨    | Create low‑poly burger GLB (≤ 500 kB after Draco+KTX2)     | ⏳     | Temporary placeholders using colored cubes                          |
| P1‑T2 | 🏗️    | Build Carousel component (polar positions, GSAP Draggable) | ✅     | Component implemented with circular positioning and GSAP animations |
| P1‑T3 | 🏗️    | Route on select (`/item/:id`)                              | 🟡     | Basic structure created, but navigation not fully functional yet    |
| P1‑T4 | 🧪    | Perf validation (Lighthouse ≥ 80)                          | ⏳     | Pending                                                             |

📈 _Current Status_: 3D Carousel implemented with polar positioning and basic interactions. GSAP animations working correctly. Item selection working with visual feedback. Initial bugs fixed (Draggable, HTML in Canvas).

⏭️ _Next Steps_:

- Create real 3D models to replace placeholders
- Finish navigation to item detail page
- Perform performance tests to validate milestone

📈 _Target Bundle_: ≤ 150 kB gz.

⚠️ _Risk Mitigation_: Research iOS passive listener behavior for proper touch events.
