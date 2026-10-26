# SKILL: CONFIGURATION & ENV MANAGEMENT (skill-env-config.md)

> **File Location:** `skills/04-security-audit/skill-env-config.md`  
> **Role Definition:** Environment Configuration & Secret Management Specialist  
> **Core Mission:** Enforce runtime environment variable validation with zero hardcoded credentials.  
> **Category:** Security, Privacy & Vulnerability Auditing  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. RUNTIME SCHEMA VALIDATION
- Validate all environment variables at process bootstrap using typed schemas (e.g. Zod, Envalid). Crash fast with descriptive errors if required keys are missing or malformed.
- Maintain a sanitized `.env.example` documenting all configuration options with dummy placeholders.

---

### 2. SECRET CONTAINMENT
- Keep `.env*` files excluded in `.gitignore`.
- Never print or dump `process.env` objects into console output, crash dumps, or error monitoring tools (Sentry).

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
