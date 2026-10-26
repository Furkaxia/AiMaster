# DEPENDENCY & PACKAGE POLICY (dependency-policy-ai.md)

> **File Location:** `dependency-policy-ai.md`  
> **Role Definition:** Staff Dependency & Supply Chain Security Architect  
> **Core Mission:** Ensure every 3rd-party package introduced meets strict criteria across security, bundle size, maintenance health, and architectural necessity.  
> **Standard Compliance:** RulesAI.md Constitutional Dependency Standard

---

## 1. DEPENDENCY ACQUISITION HIERARCHY

When solving a new requirement, strictly follow this evaluation sequence:

```text
1. Native API / Standard Language Library (fetch, Intl, URL, crypto)
     ↓ (If insufficient)
2. Existing Project Dependency (Can an existing installed package solve this?)
     ↓ (If insufficient)
3. Lightweight, Single-Responsibility Package (clsx, date-fns, nanoid)
     ↓ (If insufficient)
4. Comprehensive Framework / Battle-Tested Library (axios, prisma, zod)
     ↓ (Last Resort Only)
5. Heavy Monolithic Package (moment, full lodash, jquery)
```

---

## 2. PRE-APPROVED BASELINE WHITELIST

The following packages are pre-approved as industry standards for modern web and backend architectures; however, inclusion on this list **never grants immunity from CVE audits or blind trust**.
- 🔒 **Strict Version Pinning:** Pin exact versions (`"1.2.3"`, never `^` or `*`) in lockfiles.
- 🛡️ **Zero CVE Baseline:** Verify packages harbor zero known critical/high vulnerabilities before and after installation (`npm audit`).
- ⚙️ **Configuration Discipline:** A package being listed does not ensure safe configuration (e.g. `jsonwebtoken` mandatorily requires strict algorithm whitelisting (`RS256` or high-entropy `HS256`); password hashing requires `bcrypt` with >=12 rounds or `argon2`).

### Frontend Whitelist
| Package | Primary Use Case |
| :--- | :--- |
| `react`, `react-dom` | UI component runtime |
| `next` | Full-stack React framework |
| `tailwindcss`, `postcss`, `autoprefixer` | Utility-first styling engine |
| `clsx`, `tailwind-merge` | Conditional class composition |
| `lucide-react`, `@heroicons/react` | Consistent vector iconography |
| `framer-motion` | Motion and micro-interactions |
| `zod` | Runtime schema validation |
| `react-hook-form` | Performant form state management |
| `zustand` | Lightweight client state management |
| `date-fns` | Tree-shakeable date formatting |
| `recharts` | Composable data visualization |

### Backend Whitelist
| Package | Primary Use Case |
| :--- | :--- |
| `express`, `fastify` | HTTP web server |
| `prisma`, `@prisma/client` | Type-safe ORM & migrations |
| `jsonwebtoken`, `bcryptjs` | Token authentication & hashing |
| `dotenv` | Environment configuration |
| `cors`, `helmet` | HTTP security middleware |
| `winston`, `pino` | Structured asynchronous logging |
| `nodemailer` | Transactional email delivery |
| `ioredis`, `redis` | Caching & session store |
| `bullmq` | Distributed job queues |
| `sharp` | High-performance image processing |

### DevOps & Tooling Whitelist
| Package | Primary Use Case |
| :--- | :--- |
| `typescript` | Static type system |
| `vitest`, `jest` | Unit & integration testing |
| `playwright` | End-to-end browser automation |
| `eslint`, `prettier` | Static linting & code formatting |
| `husky`, `lint-staged` | Automated pre-commit Git hooks |

---

## 3. PROHIBITED & DEPRECATED PACKAGES

| ❌ Prohibited Package | ✅ Modern Replacement | Architectural Rationale |
| :--- | :--- | :--- |
| `moment`, `moment-timezone` | `date-fns`, `dayjs`, `Temporal API` | Massive bundle size, deprecated upstream |
| `lodash` (monolithic import) | Native JS, `lodash-es` (tree-shakeable) | 70KB+ unnecessary bundle bloat |
| `request` | `fetch` (native), `axios`, `got` | Fully deprecated, unmaintained |
| `jquery` | Native DOM APIs, React / Vue | Obsolete paradigm, breaks virtual DOM |
| `node-uuid` | `crypto.randomUUID()` (native) | Redundant external dependency |
| `left-pad`, `is-number`, etc. | Native JavaScript standard methods | Micro-package supply chain attack vector |
| `colors`, `faker` (unmaintained) | `chalk`, `@faker-js/faker` | Past protestware / security sabotage risks |

---

## 4. NEW PACKAGE EVALUATION CRITERIA

If proposing a package outside the pre-approved whitelist, perform these checks and report results before requesting approval:

```text
┌─────────────────────────────────┬────────────────────────────────┐
│ EVALUATION CRITERION            │ MINIMUM PASSING THRESHOLD      │
├─────────────────────────────────┼────────────────────────────────┤
│ Weekly npm/PyPI Downloads       │ > 50,000                       │
│ GitHub Stars                    │ > 500                          │
│ Last Commit / Release Date      │ < 6 months ago                 │
│ Open Security CVEs              │ 0 (Critical / High severity)   │
│ TypeScript Typings              │ Bundled or @types/* available  │
│ Open Source License             │ MIT, Apache-2.0, ISC, BSD      │
│ Bundle Impact (minified+gzip)   │ Fully justified vs. utility    │
│ Native Alternative Check        │ Proven impossible via native   │
└─────────────────────────────────┴────────────────────────────────┘
```

---

## 5. VERSION MANAGEMENT & UPGRADE PROTOCOL

- **Patch / Minor Upgrades (x.y.Z → x.y.Z+1):** Security patches may be applied autonomously; notify user for feature bumps.
- **Major Upgrades (x.Y.Z → x+1.0.0):** User approval is **MANDATORY**. Present breaking changes, sunset notes, and migration steps.
- **Lockfile Hygiene:** Always commit `package-lock.json`, `pnpm-lock.yaml`, or `yarn.lock`. Never delete or exclude lockfiles in `.gitignore`.
- **Prohibition of Phantom Dependencies:** Never import packages resolved transitively from `node_modules` without declaring them in `package.json`.

---

## 6. VERIFICATION & QA CHECKLIST

- [ ] Is the proposed package truly necessary? Can native APIs or installed tools solve this?
- [ ] Does it exist on the pre-approved whitelist? If not, does it pass Section 4 criteria?
- [ ] Has the prohibited package list been audited?
- [ ] Was the bundle size impact analyzed?
- [ ] Is the license legally compliant (MIT/Apache/BSD)?
- [ ] Was the lockfile updated and included in the commit?
