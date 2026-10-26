# SKILL: MONOREPO & MULTI-PACKAGE ARCHITECTURE (skill-monorepo-architecture.md)

> **File Location:** `skills/01-architecture-planning/skill-monorepo-architecture.md`  
> **Role Definition:** Monorepo & Multi-Package Architecture Specialist  
> **Core Mission:** Structure enterprise multi-package repositories using Turborepo/Nx with clean boundaries and shared tooling.  
> **Category:** Architecture, Planning & System Design  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. WORKSPACE TOPOLOGY
Structure multi-package monorepos cleanly:
```text
monorepo/
├── apps/
│   ├── web/                # Main web application
│   └── api/                # Backend API service
├── packages/
│   ├── ui/                 # Shared UI component library
│   ├── tsconfig/           # Shared TypeScript configs
│   ├── eslint-config/      # Shared linting rules
│   └── types/              # Shared domain entities & DTOs
```

---

### 2. PACKAGE BOUNDARIES & CACHING
- **Strict Boundaries:** Internal packages must declare explicit exports in `package.json`. Forbid deep relative imports across workspace packages (`../../packages/ui/src/button`).
- **Turborepo Pipeline:** Configure `turbo.json` with deterministic task dependencies (`^build`) and cached output hashes.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
