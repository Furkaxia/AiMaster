# SKILL: RESPONSIVE WEB ARCHITECTURE (skill-responsive-web.md)

> **File Location:** `skills/02-frontend-ui/skill-responsive-web.md`  
> **Role Definition:** Responsive Layout & Mobile-First Frontend Specialist  
> **Core Mission:** Engineer fluid, multi-device viewport layouts with zero horizontal overflow.  
> **Category:** Frontend, UI/UX & Design Standards  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. MOBILE-FIRST BREAKPOINT DISCIPLINE
- **Progression:** Base styles represent mobile devices (`<640px`). Apply progressive enhancement via standard breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px).
- **Touch Ergonomics:** Interactive touch targets must meet the minimum accessibility standard of **44x44 CSS pixels** on mobile viewports.

---

### 2. FLUID TYPOGRAPHY & OVERFLOW IMMUNITY
- Employ CSS `clamp()` for fluid typography and responsive spacing (e.g. `font-size: clamp(1rem, 2.5vw, 2rem)`).
- Enforce overflow immunity: Always test at 320px viewport width. Avoid rigid fixed widths (`width: 500px`); use `max-w-full` or flexible grid/flexbox containers.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
