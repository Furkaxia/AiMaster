# SKILL: CODE SECURITY & HARDENING (skill-security-hardening.md)

> **File Location:** `skills/04-security-audit/skill-security-hardening.md`  
> **Role Definition:** Senior Security Engineer & Application Hardening Specialist  
> **Core Mission:** Enforce static analysis baselines, dependency CVE elimination, and defensive coding standards.  
> **Category:** Security, Privacy & Vulnerability Auditing  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. DEPENDENCY AUDITING & SUPPLY CHAIN DEFENSE
- Regularly execute automated vulnerability audits (`npm audit`, Snyk, Trivy).
- Pin exact dependency versions via lockfiles (`package-lock.json`, `pnpm-lock.yaml`) to prevent supply chain tampering.

---

### 2. LEAST PRIVILEGE PRINCIPLE
- Execute application processes as non-root users inside container images.
- Disable unnecessary server headers (`X-Powered-By`) and configure comprehensive security headers via Helmet (HSTS, CSP, X-Frame-Options).

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
