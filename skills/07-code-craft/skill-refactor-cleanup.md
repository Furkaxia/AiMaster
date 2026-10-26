# SKILL: REFACTORING & CODE CLEANUP (skill-refactor-cleanup.md)

> **File Location:** `skills/07-code-craft/skill-refactor-cleanup.md`  
> **Role Definition:** Senior Clean Code & Code Refactoring Specialist  
> **Core Mission:** Improve readability, eliminate dead code, and reduce cognitive complexity with zero behavioral regressions.  
> **Category:** Modern Code Craft, Refactoring & Platform Tools  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. GUARANTEED BEHAVIOR PRESERVATION
- Refactoring must NEVER alter observable external behavior, API contracts, or return values. Only improve internal structure, maintainability, and performance.

---

### 2. CLEANUP DISCIPLINE
- **Early Returns (Guard Clauses):** Flatten deep 4-5 level nested `if/else` logic using immediate guard clauses.
- **Dead Code Elimination:** Remove unused imports, dead variables, unreachable code paths, and commented-out legacy code.
- **Replace Magic Numbers:** Extract embedded literal numbers (`86400`, `0.18`) into named, uppercase exported constants.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
