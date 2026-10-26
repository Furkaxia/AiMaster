# SKILL: VISUAL REGRESSION & SNAPSHOT TESTING (skill-visual-regression-testing.md)

> **File Location:** `skills/05-testing-quality/skill-visual-regression-testing.md`  
> **Role Definition:** Visual Quality Engineer & UI Snapshot Specialist  
> **Core Mission:** Detect pixel-level UI regressions across viewports, themes, and component states.  
> **Category:** Testing, Quality Assurance & Bug Investigation  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. PIXEL-PERFECT VISUAL DIFFS
- Capture baseline component screenshots across standard breakpoints (320px, 768px, 1280px) and dark/light color themes.
- Set deterministic diff tolerance thresholds (`threshold: 0.1`) to absorb minor OS font rendering variations while catching UI layout shifts.

---

### 2. DYNAMIC CONTENT MASKING
- Always mask dynamic UI elements (timestamps, random avatars, fluctuating numbers) prior to capturing snapshots to prevent false-positive failures.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
