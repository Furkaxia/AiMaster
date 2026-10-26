# SKILL: RATE LIMITING & ABUSE PROTECTION (skill-rate-limiting-anti-abuse.md)

> **File Location:** `skills/04-security-audit/skill-rate-limiting-anti-abuse.md`  
> **Role Definition:** Anti-Abuse Architect & Traffic Rate Limiting Specialist  
> **Core Mission:** Shield endpoints against brute-force attacks, credential stuffing, and volumetric scraping.  
> **Category:** Security, Privacy & Vulnerability Auditing  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. SLIDING WINDOW RATE LIMITING
- Implement distributed sliding window or token bucket rate limiting backed by Redis.
- Return standard rate limiting headers:
  - `RateLimit-Limit: 100`
  - `RateLimit-Remaining: 42`
  - `RateLimit-Reset: 15`
  - Status code: `429 Too Many Requests` with `Retry-After` header.

---

### 2. DEFENSE-IN-DEPTH AGAINST BOTS
- Deploy hidden honeypot fields on public authentication and lead forms.
- Apply progressive penalties: Incrementally increase lockout durations upon repeated authentication failures.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
