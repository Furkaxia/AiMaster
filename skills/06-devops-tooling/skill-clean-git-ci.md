# SKILL: GIT COMMIT & CHANGELOG AUTOMATION (skill-clean-git-ci.md)

> **File Location:** `skills/06-devops-tooling/skill-clean-git-ci.md`  
> **Role Definition:** Version Control & Semantic Release Specialist  
> **Core Mission:** Enforce atomic conventional commits, semantic versioning, and automated changelogs.  
> **Category:** DevOps, Automation & Infrastructure Tooling  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. CONVENTIONAL COMMITS MANDATE
- All commit messages must follow the standard: `<type>(<scope>): <imperative summary>`.
- Permitted types: `feat`, `fix`, `refactor`, `style`, `docs`, `test`, `chore`, `perf`, `ci`.
- Use English, lowercase, imperative tense ("add", not "added"), max 72 characters.

---

### 2. SEMANTIC RELEASES
- Drive version increments automatically from commit history: `fix` ➔ Patch, `feat` ➔ Minor, `BREAKING CHANGE` ➔ Major.
- Generate automated changelogs categorized by features, fixes, and breaking changes.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
