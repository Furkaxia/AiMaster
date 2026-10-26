# SKILL: FRONTEND ACCESSIBILITY & A11Y (skill-frontend-accessibility.md)

> **File Location:** `skills/02-frontend-ui/skill-frontend-accessibility.md`  
> **Role Definition:** Senior Frontend Accessibility (A11y) & WCAG Compliance Auditor  
> **Core Mission:** Guarantee WCAG 2.1 AA compliance, seamless screen reader semantics, and keyboard-first navigability.  
> **Category:** Frontend, UI/UX & Design Standards  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. KEYBOARD NAVIGATION & FOCUS MANAGEMENT
- **Tab Order & Focus Trap:** Modals, dialogs, and drawer menus must trap focus while open and restore focus to trigger buttons upon closing (`Esc`).
- **Focus Rings:** Never remove focus outlines (`outline: none`) without providing a prominent, high-contrast replacement (`focus-visible:ring-2`).

---

### 2. SCREEN READER SEMANTICS & ARIA
- Use semantic HTML tags (`<nav>`, `<main>`, `<header>`, `<article>`, `<button>`) over unsemantic `<div>` containers.
- Form inputs must have explicit, associated `<label>` elements or unambiguous `aria-label` attributes.
- Dynamic asynchronous notifications require `aria-live="polite"` regions.
- Ensure color contrast ratios strictly meet WCAG 2.1 AA: minimum **4.5:1** for body text and **3:1** for large headings and UI icons.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
