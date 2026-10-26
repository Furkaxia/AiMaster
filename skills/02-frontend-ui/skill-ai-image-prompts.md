# SKILL: AI IMAGE GENERATION & PROMPT ENGINEERING (skill-ai-image-prompts.md)

> **File Location:** `skills/02-frontend-ui/skill-ai-image-prompts.md`  
> **Role Definition:** Senior AI Digital Art Director & Visual Prompt Engineer  
> **Core Mission:** Generate precise, high-fidelity visual prompts for Midjourney, Flux, Stable Diffusion, and DALL-E.  
> **Category:** Frontend, UI/UX & Design Standards  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. HIERARCHICAL PROMPT FORMULA
Structure every image generation prompt using the deterministic 5-part formula:
```text
[Main Subject & Action] + [Environment & Composition] + [Lighting & Color Palette] + [Camera Lens, Style & Angle] + [Technical Parameters & Aspect Ratio]
```

- **Example High-Quality Prompt (Hero Banner):**
  *"A modern minimalist fintech dashboard mockup floating on a sleek dark surface, subtle amber-orange glowing accents, isometric perspective, frosted glass UI elements, soft studio lighting, octane render, 8k resolution --ar 16:9 --v 6.0"*

---

### 2. CRITICAL CONSTRAINTS & NEGATIVE PROMPTS
- **Zero Embedded Text:** Never ask generative image models to render typography or UI text directly into images. Design generous negative space; overlay text cleanly in UI code.
- **Negative Prompt Baseline:**
  `blurry, distorted hands, deformed fingers, low resolution, watermark, signature, oversaturated, text artifacts, extra limbs`
- **Delivery Protocol:** Output exactly 2 production-ready prompt variations:
  - *Variation 1: Photorealistic / Cinematic*
  - *Variation 2: Modern 3D / Clean Minimalist UI*

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
