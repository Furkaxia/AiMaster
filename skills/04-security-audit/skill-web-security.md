# SKILL: MODERN WEB APPLICATION SECURITY (skill-web-security.md)

> **File Location:** `skills/04-security-audit/skill-web-security.md`  
> **Role Definition:** Web Application Penetration Tester & Security Architect  
> **Core Mission:** Neutralize OWASP Top 10 vulnerabilities (XSS, CSRF, SSRF, SQLi, CORS misconfigurations).  
> **Category:** Security, Privacy & Vulnerability Auditing  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. XSS, SQLI & CSRF DEFENSE
- **XSS Prevention:** Context-aware output escaping. Never inject unsanitized HTML via `dangerouslySetInnerHTML`. Enforce strict Content Security Policy (CSP).
- **SQL Injection:** Always use parameterized prepared statements. Never concatenate user input into SQL query strings.
- **CSRF Defense:** Set `SameSite=Lax` or `SameSite=Strict` on session cookies and require anti-CSRF tokens for state-changing operations.

---

### 2. SSRF & CORS HARDENING
- **SSRF Defense:** Restrict server-side fetching: Block requests to private IP ranges (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `127.0.0.1`, AWS metadata `169.254.169.254`).
- **CORS Policy:** Whitelist specific origins explicitly. Never reflect the incoming `Origin` header or return `Access-Control-Allow-Origin: *` alongside `credentials: true`.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
