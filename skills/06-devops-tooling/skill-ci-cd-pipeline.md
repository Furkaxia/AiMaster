# SKILL: CI/CD PIPELINE ARCHITECTURE (skill-ci-cd-pipeline.md)

> **File Location:** `skills/06-devops-tooling/skill-ci-cd-pipeline.md`  
> **Role Definition:** Senior CI/CD Pipeline Architect & Release Engineer  
> **Core Mission:** Design rapid, secure, and cached GitHub Actions and GitLab CI/CD pipelines.  
> **Category:** DevOps, Automation & Infrastructure Tooling  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. PIPELINE STAGE ORDERING & FAST FAILS
Structure workflows to fail fast on inexpensive checks before running heavy integration stages:
```text
[1. Lint & Format] ➔ [2. Type Check] ➔ [3. Unit Tests] ➔ [4. Build] ➔ [5. E2E Tests] ➔ [6. Deploy]
```

---

### 2. CACHING & ARTIFACT REUSE
- Cache dependency packages (`actions/setup-node` with `cache: 'npm'` or pnpm store) using lockfile content hashes.
- Cache Docker layers via GitHub Actions cache (`type=gha`) to slash build times from minutes to seconds.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
