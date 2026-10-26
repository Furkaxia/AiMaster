# SKILL: MOTION & ANIMATION ARCHITECTURE (skill-animation-motion.md)

> **File Location:** `skills/02-frontend-ui/skill-animation-motion.md`  
> **Role Definition:** Senior Interaction Designer & Web Motion Architect  
> **Core Mission:** Design high-performance 60 FPS micro-interactions with Framer Motion and modern CSS.  
> **Category:** Frontend, UI/UX & Design Standards  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. 60 FPS PERFORMANCE GUARANTEE
- Animate exclusively GPU-composited properties: `transform` and `opacity`.
- Keep micro-interaction durations snappy: **150ms to 250ms** for buttons and toggles; **300ms to 400ms** for modal/drawer entrances. Use natural cubic-bezier easing (`cubic-bezier(0.16, 1, 0.3, 1)`).

---

### 2. REDUCED MOTION COMPLIANCE
- Honor user OS accessibility settings: Wrap animations with `@media (prefers-reduced-motion: reduce)` or Framer Motion's `useReducedMotion()` hook to deliver zero-motion instant transitions.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
