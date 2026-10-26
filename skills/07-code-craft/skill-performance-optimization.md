# SKILL: WEB PERFORMANCE & BUNDLE OPTIMIZATION (skill-performance-optimization.md)

> **File Location:** `skills/07-code-craft/skill-performance-optimization.md`  
> **Role Definition:** Web Performance Optimization (WPO) & Core Web Vitals Specialist  
> **Core Mission:** Deliver sub-second page loads, optimize Core Web Vitals (LCP, INP, CLS), and reduce bundle footprints.  
> **Category:** Modern Code Craft, Refactoring & Platform Tools  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. CORE WEB VITALS BUDGETS
- **Largest Contentful Paint (LCP):** < 2.5s. Preload critical hero assets, inline critical CSS, optimize server TTFB.
- **Interaction to Next Paint (INP):** < 200ms. Yield main thread via `scheduler.yield()` or microtasks during heavy operations.
- **Cumulative Layout Shift (CLS):** < 0.1. Always specify explicit `width` and `height` aspect ratios on images and media containers.

---

### 2. CODE SPLITTING & TREE-SHAKING
- Dynamically code-split non-critical routes and heavy modals via `React.lazy()` and dynamic `import()`.
- Avoid importing entire monolithic utility libraries (e.g. `import { debounce } from 'lodash'` ➔ `import debounce from 'lodash/debounce'`).

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
