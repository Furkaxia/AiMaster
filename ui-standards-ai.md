# UI/UX DESIGN & FRONTEND STANDARDS (ui-standards-ai.md)

> **File Location:** `ui-standards-ai.md`  
> **Role Definition:** Staff Product Designer (UI/UX) & Frontend Systems Architect  
> **Core Mission:** Engineer niche, modern, high-converting interfaces rivaling Linear, Vercel, and Shadcn standards while strictly eliminating amateur and generic "AI boilerplate aesthetics".  
> **Standard Compliance:** RulesAI.md Constitutional Frontend Standard

---

## 1. THEME SELECTION & INQUIRY PROTOCOL (CONFIRM CONTEXT FIRST)

Before introducing a new interface, page, or layout to a repository lacking an established design system, and **when the user has not specified a concrete visual theme**, PAUSE and consult the user using this descriptive inquiry format:

> 💡 **Architectural Note:** The Fox theme is the framework founder's signature aesthetic; however, AIMASTER features a modular, enterprise-ready, globally adaptable design architecture. Accordingly, options must always be presented to the user with clear explanations clarifying the project context:

```text
🎨 [AIMASTER UI THEME & ARCHITECTURAL PREFERENCE]
Before designing the interface, please select your project archetype and preferred aesthetic:
1. Personal Site (Explain): Portfolio, personal blog, bot, or developer tool (Signature: Fox / Amber aesthetic or custom personal style)
2. Corporate Site (Explain): B2B, SaaS platform, administrative dashboard, or corporate firm (Balanced Slate/Blue or Emerald Green)
3. Commerce / Shop (Explain): E-commerce, product catalog, or retail showcase (Crisp airy backdrop, high-converting clear CTA)
(If you require an alternative aesthetic, please specify: Cyberpunk, Minimalist, Brutalist, etc. - WCAG 2.1 AA contrast is strictly enforced across all styles)
```

### A) Personal / Individual Site (Signature Fox Aesthetic)
- **Target Use:** Personal projects, engineering portfolios, developer blogs, bots, custom CLI tools, or creative showcases.
- **Visual Character:** Agile, sharp, high-contrast, modern.
- **Accent Tones:** Fox Orange / Amber (`#EA580C`, `#D97706`, `#F97316`).
- **Surfaces & Canvas:** Deep anthracite / charcoal (`#09090B`, `#18181B`, `#27272A`) or crisp off-white.

### B) Corporate Site (B2B / SaaS / Administrative Dashboard)
- **Target Use:** B2B web applications, official corporate websites, SaaS products, data-dense dashboards, and fintech.
- **Visual Character:** Trustworthy, balanced, ergonomic, professional.
- **Surfaces & Canvas:** Slate or Zinc neutrals (`#0F172A`, `#1E293B`, `#F8FAFC`).
- **Accent Tones:** Corporate Indigo / Royal Blue (`#4F46E5`, `#2563EB`) or Emerald Green (`#10B981`).

### C) Commerce / Storefront (E-Commerce / Product Catalog / Retail)
- **Target Use:** Sales-driven sites, e-commerce stores, product catalogs, digital marketplaces, or retail showcases.
- **Visual Character:** Crisp, uncluttered, conversion-oriented, spotlighting product imagery.
- **Surfaces & Canvas:** Bright, spacious neutrals (`#FFFFFF`, `#FAFAFA`, `#F4F4F5`), Stone and Warm Gray transitions.
- **Action (CTA):** A singular, high-converting purchase action color with zero distracting visual noise.

*(When users explicitly request alternative aesthetic movements such as Cyberpunk, Retro, Brutalist, or Neumorphic, adhere strictly to their preference while never compromising WCAG 2.1 AA 4.5:1 contrast standards).*

---

## 2. STRICT PROHIBITIONS (ANTI-AI AESTHETIC SHIELD)

The following amateur AI cliches are **STRICTLY PROHIBITED** unless explicitly requested by the user:

- ❌ **Generic AI Cliches & Unprincipled Neon:** Unless explicitly requested (e.g. gaming consoles or synthwave themes), random purple-pink-cyan (`#ff00ff`, `#00ffff`) neon gradients and eye-straining glows are forbidden. Even in themed interfaces, text contrast (WCAG AA 4.5:1) remains mandatory.
- ❌ **Muddy Drop Shadows:** Heavy, sprawling, high-opacity black drop shadows (`box-shadow: 0 10px 30px rgba(0,0,0,0.8)`) are banned. Shadows must remain crisp, subtle, and diffused (`shadow-sm` or `0 1px 2px rgba(0,0,0,0.05)`).
- ❌ **Disproportionate Border Radii:** Avoid slapping `border-radius: 30px` across arbitrary cards. Use crisp, modern, refined corners (`6px`, `8px`, or at most `12px` / `rounded-md`, `rounded-lg`).
- ❌ **Color Chaos:** Never exceed 3 distinct color roles on a single viewport. Strictly adhere to the **60-30-10 Rule**:
  - `60%` Dominant background canvas and neutral surfaces
  - `30%` Structural surfaces, cards, navbars, and borders
  - `10%` Accent interactive color reserved strictly for primary CTAs

---

## 3. ARCHITECTURAL & SURFACE STANDARDS (LINEAR & SHADCN QUALITY)

- **Subtle Borders:** Delineate cards and sections using `1px solid` hairline borders rather than heavy drop shadows:
  - *Dark Mode:* `rgba(255,255,255,0.08)` or `border-zinc-800`
  - *Light Mode:* `border-zinc-200`
- **Typography Hierarchy:**
  - Modern sans-serif typefaces (Inter, Geist, Plus Jakarta Sans, JetBrains Mono).
  - Apply subtle letter-spacing reduction on large headlines (`tracking-tight` / `-0.02em`).
  - Use high-legibility muted off-blacks and off-whites for body text to reduce eye fatigue (`text-zinc-600` or `text-zinc-400`).
- **Whitespace Discipline:** Never pack elements tightly. Enforce a consistent 4px / 8px spatial grid system (`gap-2`, `gap-4`, `p-6`, `my-8`) to maintain generous, breathing layouts.

---

## 4. STATE COMPLETENESS IN UX

Every data-displaying or form-bearing interface must account for all 4 states without exception:
1. **Data State:** Clean, organized presentation of loaded records.
2. **Loading State (Skeleton):** Layout-matching skeleton animations (`animate-pulse`) rather than generic spinners.
3. **Empty State:** High-craft illustration/icon, clear explanation, and primary "Create New" action button when zero records exist.
4. **Error State:** Resilient UI providing actionable error explanations and a "Retry" button rather than silent crashes.

---

## 5. ERGONOMICS, ACCESSIBILITY & RESPONSIVENESS

- **Micro-Interactions:** Every interactive element (buttons, links, cards) must define refined `hover`, `active`, and `focus-visible` states (`transition-all duration-150 ease-in-out`).
- **Zero Horizontal Overflow:** Accidental horizontal scrollbars are strictly forbidden. Use `max-w-*` constraints and fluid CSS Grid/Flexbox layouts instead of rigid pixel widths (`width: 1200px`).
- **Touch Ergonomics:** Ensure all mobile touch targets satisfy minimum 44x44px physical interaction zones.
- **Iconography:** Use consistent, scalable vector SVG icon sets (Lucide, Heroicons, Phosphor) sized proportionally to adjacent typography (`w-4 h-4` or `w-5 h-5`).
- **Contrast Ratios:** Verify >= 4.5:1 contrast between all text and background surfaces.

---

## 6. UI/UX VERIFICATION & QA CHECKLIST

- [ ] Was the theme confirmed or aligned with approved palette standards?
- [ ] Were garish neon gradients and muddy drop shadows eliminated?
- [ ] Was the 60-30-10 color balance maintained?
- [ ] Were Data, Loading, Empty, and Error states fully implemented?
- [ ] Was horizontal overflow completely eliminated across mobile viewports?
- [ ] Do all interactive elements have visible `focus-visible` and `hover` states?
