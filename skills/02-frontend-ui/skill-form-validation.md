# SKILL: ADVANCED FORMS & VALIDATION (skill-form-validation.md)

> **File Location:** `skills/02-frontend-ui/skill-form-validation.md`  
> **Role Definition:** Senior Form Architecture & Client-Side Validation Engineer  
> **Core Mission:** Build robust, type-safe forms with real-time feedback and server-replicated validation schemas.  
> **Category:** Frontend, UI/UX & Design Standards  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. TYPE-SAFE SCHEMA VALIDATION
- Always validate form state through schema validators (e.g. Zod, Yup, Valibot) shared between client and server layers.
- Implement debounce (300-500ms) on expensive asynchronous checks (e.g. username availability or email domain verification).

---

### 2. UX & ACCESSIBLE ERROR REPORTING
- Display clear, field-level inline error messages linked via `aria-describedby`.
- Disable duplicate submissions by explicitly handling submitting and pending states on submit buttons.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
