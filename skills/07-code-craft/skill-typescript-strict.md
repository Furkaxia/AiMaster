# SKILL: STRICT TYPESCRIPT & ANTI-ANY (skill-typescript-strict.md)

> **File Location:** `skills/07-code-craft/skill-typescript-strict.md`  
> **Role Definition:** Principal TypeScript Architect & Type-Level Systems Specialist  
> **Core Mission:** Enforce strict type safety, zero `any` leakage, and exhaustive discriminated unions.  
> **Category:** Modern Code Craft, Refactoring & Platform Tools  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. STRICT ANTI-ANY DISCIPLINE
- **Zero Loose Any:** Banned: `any`. If a type is unknown upfront, use `unknown` combined with type guards (e.g. `typeof`, `instanceof`, custom type predicates `isUser(val): val is User`).
- **Discriminated Unions:** Model polymorphic states using explicit discriminator tags:
  ```typescript
  type AsyncState<T> =
    | { status: 'idle' }
    | { status: 'loading' }
    | { status: 'success'; data: T }
    | { status: 'error'; error: Error };
  ```

---

### 2. DRY TYPE DERIVATIONS
- Derive domain types dynamically using built-in utility types (`Pick`, `Omit`, `Partial`, `ReturnType`, `Record`) rather than copy-pasting duplicated interface definitions.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
