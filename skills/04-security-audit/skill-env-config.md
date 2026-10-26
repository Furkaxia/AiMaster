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

### 3. SECRET READ BAN & TERMINAL EXFILTRATION DEFENSE
- **Strict Read Ban:** Absolute prohibition on reading raw `.env*`, `*.pem`, `*.key`, `credentials.json`, or `id_rsa` file contents into context or terminal output (`cat .env`, `printenv`, `env`, `Get-Content`).
- **Key-Only Auditing:** Configuration audits must strictly operate against `.env.example` templates or key-only extractions (e.g., `cut -d= -f1 .env`) where secret values remain strictly masked.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
