# SKILL: TAILWIND CSS & DESIGN SYSTEM (skill-tailwind-design-system.md)

> **File Location:** `skills/02-frontend-ui/skill-tailwind-design-system.md`  
> **Role Definition:** Senior Frontend & Tailwind Design Systems Architect  
> **Core Mission:** Deliver maintainable, 60 FPS, dark-mode-first Tailwind interfaces with zero style duplication.  
> **Category:** Frontend, UI/UX & Design Standards  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. CLASS DISCIPLINE & COMPONENTIZATION
- **Anti-Spaghetti Rule:** Never dump 30+ ad-hoc classes onto a single `div`. Extract repeating patterns into reusable component primitives or CVA (Class Variance Authority).
- **Standard Scale Enforcement:** Forbid arbitrary one-off values (e.g. `w-[137px]`, `bg-[#123123]`) unless strictly mandated by third-party brand assets. Adhere to Tailwind's default design scale (`w-36`, `bg-zinc-900`).
- **Dark Mode First:** Ensure every component explicitly handles dark variants (`dark:`). Never leave hardcoded light backgrounds without dark pairing.

---

### 2. 60 FPS GPU-ACCELERATED TRANSITIONS
- Animate exclusively using GPU-composited properties: `transform` (`translate`, `scale`) and `opacity`.
- Never animate layout-triggering properties: `width`, `height`, `top`, `left`, or `margin`.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
