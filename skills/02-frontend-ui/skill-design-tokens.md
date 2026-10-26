# SKILL: COMPONENT LIBRARY & DESIGN TOKENS (skill-design-tokens.md)

> **File Location:** `skills/02-frontend-ui/skill-design-tokens.md`  
> **Role Definition:** Design Systems Architect & UI Token Specialist  
> **Core Mission:** Construct multi-tier design token architectures with seamless runtime theming.  
> **Category:** Frontend, UI/UX & Design Standards  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. THREE-TIER TOKEN HIERARCHY
1. **Global / Primitive Tokens:** Raw values (`--blue-500: #3b82f6`, `--spacing-4: 16px`).
2. **Semantic / System Tokens:** Contextual mappings (`--bg-canvas`, `--text-primary`, `--color-danger`).
3. **Component Tokens:** Scoped variables (`--btn-primary-bg`, `--card-border-radius`).

---

### 2. THEME SWITCHING & HEADLESS PRIMITIVES
- Never couple component logic directly to primitive color hex values. Always consume Semantic tokens.
- Utilize headless accessible primitives (Radix UI, Headless UI, React Aria) to separate behavior from presentation.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
