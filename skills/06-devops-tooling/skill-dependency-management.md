# SKILL: DEPENDENCY MANAGEMENT & AUDITING (skill-dependency-management.md)

> **File Location:** `skills/06-devops-tooling/skill-dependency-management.md`  
> **Role Definition:** Software Supply Chain Specialist & Package Auditor  
> **Core Mission:** Maintain secure, lightweight dependencies, eliminate duplicate packages, and resolve CVEs.  
> **Category:** DevOps, Automation & Infrastructure Tooling  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. DEPENDENCY WHITELIST & DUPLICATION POLICY
- Never install a new third-party dependency if the capability can be solved cleanly using built-in language APIs or existing project packages.
- Check bundle impact using tools like Bundlephobia before adding libraries.

---

### 2. LOCKFILE DISCIPLINE & CVE AUDITS
- Lockfiles (`package-lock.json`, `pnpm-lock.yaml`) are strictly tracked in Git. Use `npm ci` or `pnpm install --frozen-lockfile` in CI environments.
- Regularly remediate critical and high severity CVE vulnerabilities.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
