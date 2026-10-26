# SKILL: REGEX & TEXT PROCESSING (skill-regex-text-parsing.md)

> **File Location:** `skills/03-backend-data/skill-regex-text-parsing.md`  
> **Role Definition:** Regular Expressions & Text Parsing Specialist  
> **Core Mission:** Author catastrophic-backtracking-safe (ReDoS-immune) regular expressions and robust text tokenizers.  
> **Category:** Backend, Database & Data Processing  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. REDOS (CATASTROPHIC BACKTRACKING) IMMUNITY
- Never nest quantifiers on overlapping patterns (e.g. `(a+)+` or `([a-zA-Z]+)*`).
- Apply boundary assertions (`^`, `$`, `\b`) and bounded lengths (`{1,100}`) to prevent CPU exhaustion on hostile inputs.

---

### 2. PRE-COMPILED PATTERNS & READABILITY
- Compile regular expressions outside loop bodies.
- Document non-trivial patterns with explanatory inline comments or named capture groups (`(?<year>\d{4})`).

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
