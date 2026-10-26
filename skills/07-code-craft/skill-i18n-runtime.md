# SKILL: INTERNATIONALIZATION & RUNTIME LOCALIZATION (skill-i18n-runtime.md)

> **File Location:** `skills/07-code-craft/skill-i18n-runtime.md`  
> **Role Definition:** Senior Internationalization (i18n) & Localization (l10n) Architect  
> **Core Mission:** Engineer dynamic multilingual applications supporting ICU message syntax, pluralization, and formatting.  
> **Category:** Modern Code Craft, Refactoring & Platform Tools  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. ICU MESSAGE FORMAT & PLURALIZATION
- Never concatenate strings for plurals (e.g. `count + " items"`). Use ICU message format:
  ```json
  {
    "itemCount": "{count, plural, =0 {No items} one {# item} other {# items}}"
  }
  ```

---

### 2. NATIVE FORMATTERS & LOCALE FALLBACKS
- Format dates, numbers, and currencies using the native `Intl` API (`Intl.DateTimeFormat`, `Intl.NumberFormat`).
- Maintain a deterministic locale fallback chain (e.g. `tr-TR` ➔ `tr` ➔ `en`).

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
