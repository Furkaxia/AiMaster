# PROJECT ARCHITECTURE & FILE ORGANIZATION (project-architecture-ai.md)

> **File Location:** `project-architecture-ai.md`  
> **Role Definition:** Staff Software Architect & System Organizer  
> **Core Mission:** Enforce root directory hygiene, strict folder structures, modular component boundaries, and razor-sharp architectural file trees.  
> **Standard Compliance:** RulesAI.md Constitutional Architecture Standard

---

## 1. ROOT DIRECTORY HYGIENE

- ❌ **Root Clutter is Strictly Prohibited:** Only recognized configuration files and canonical framework assets may reside in the repository root directory.
  - **Permitted Root Files:** `package.json`, `package-lock.json`, `tsconfig.json`, `.env.example`, `.gitignore`, `README.md`, `README.tr.md`, `rules.md`, `RulesAI.md`, core architectural standards (`*-ai.md`), and bundler configurations (`vite.config.ts`, `next.config.js`, `tailwind.config.js`).
- ❌ **Temporary File Dumping is Prohibited:** Never scatter scratch test scripts, one-off data files (`.json`, `.csv`, `.py`, `.js`), raw stylesheets, or analysis scraps in the root directory.
- 🎯 **Scratch Work Protocol:** Execute temporary analysis scripts or data migration helpers inside designated temporary directories or test fixture folders, removing them immediately upon completion.

---

## 2. STANDARD `src/` HIERARCHY & RESPONSIBILITY MATRIX

All implementation source code must be categorized cleanly under `src/` (or the equivalent module tree for the target language). Every file must reside in its designated domain subdirectory:

```text
src/
├── assets/          # Static media: SVG icons, fonts, product imagery, banners
├── components/      # UI components (reusable and feature-scoped)
│   ├── common/      # Domain-agnostic primitives (Button, Input, Modal, Badge, Skeleton)
│   └── [feature]/   # Feature-scoped components (e.g. components/catalog/, components/cart/)
├── config/          # Application constants, theme tokens, runtime configuration
├── hooks/           # Custom lifecycle and state hooks (useDebounce, useAuth, useMediaQuery)
├── layouts/         # Shell layouts (Header, Sidebar, Footer, AdminLayout, MainLayout)
├── pages/ / views/  # Route entrypoints (orchestrating layouts and components only)
├── services/ / api/ # External API clients, HTTP instances (axios/fetch), DB query adapters
├── styles/          # Global CSS, Tailwind directives, CSS variables, typography tokens
├── types/           # TypeScript interfaces, DTOs, domain models, ambient declarations
└── utils/           # Pure stateless helper functions (date formatting, math, regex)
```

---

## 3. FOLDER RESPONSIBILITIES & PROHIBITIONS

| Directory | Permitted Contents | Strictly Prohibited Contents |
| :--- | :--- | :--- |
| `components/common/` | Pure reusable UI primitives (Button, Modal, Input, Card) usable across any view | Business logic, direct API fetch calls, raw database queries |
| `components/[feature]/` | Feature-specific view components and sub-trees | Coupling to unrelated feature business rules, uncontrolled global state mutation |
| `pages/` or `views/` | Top-level route orchestrators composing layouts and components | 200+ line sprawling raw HTML/CSS, heavy inline mathematical algorithms |
| `services/` | API transport clients, endpoint mappings, serializers, error adapters | UI rendering code, React/Vue lifecycle hooks |
| `utils/` | Pure side-effect-free helper functions (formatDate, calculateTax, slugify) | State management, direct DOM manipulation, external network I/O |
| `types/` | `type`, `interface`, `enum` declarations | Executable JavaScript runtime code, functional implementations |

---

## 4. NAMING CONVENTIONS & MODULE CONTRACTS

- **UI Components:** PascalCase (`Button.tsx`, `ProductCard.tsx`, `Navbar.tsx`).
- **Utility Functions & Services:** camelCase or kebab-case (`formatDate.ts`, `apiClient.ts`, `date-utils.ts`).
- **Type Definitions:** `*.types.ts` or `*.d.ts` extensions (`catalog.types.ts`, `user.types.ts`).
- **Custom Hooks:** Mandatorily prefixed with `use` in camelCase (`useLocalStorage.ts`, `useWindowSize.ts`).
- **Prohibition of Circular Dependencies:** Module A must never import Module B if Module B imports Module A. Dependencies must flow downward through the hierarchy: `pages -> components -> services/utils -> types`.

---

## 5. NEW FILE CREATION & MODIFICATION PROTOCOL

Before creating a new file or relocating existing assets:
1. **Existing Structure Audit:** Scan active workspace patterns; if the project already establishes `helpers/`, do not introduce a competing `utils/` folder. Respect established conventions.
2. **Category Assignment:** Confirm the proposed file's exact slot in the responsibility matrix above.
3. **Single Responsibility:** If a file spans multiple concerns (e.g. mixing UI rendering with raw database queries), decouple it into separate component and service files.
4. **Named Export Standard:** Prefer explicit named exports (`export const Button = ...`) over default exports to eliminate refactoring naming drift.

---

## 6. ARCHITECTURAL VERIFICATION & QA CHECKLIST

- [ ] Was the root directory kept clean of unauthorized files? (Permitted: `*-ai.md`, `RulesAI.md`, canonical configs).
- [ ] Was the new file placed in the correct hierarchy (`components`, `services`, `types`)?
- [ ] Are circular dependencies completely eliminated?
- [ ] Does any single file exceed 300+ lines without modular decomposition?
- [ ] Is *Architecture Standard Compliance* verified as "Yes" in `🧪 [QA TEST ÖZETİ]`?
