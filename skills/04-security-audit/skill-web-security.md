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

### 2. ENTERPRISE SSRF DEFENSE & CORS HARDENING
- **Protocol Allowlist:** Restrict outbound fetch requests strictly to `http:` and `https:`. Explicitly ban dangerous URI schemes (`file:`, `gopher:`, `ftp:`, `dict:`, `ldap:`, `data:`).
- **DNS Resolution & Post-Resolve IP Validation:** Resolve hostnames via DNS *before* making network requests. Validate resolved IP addresses against blacklists to eliminate DNS Rebinding attacks:
  - **IPv4 Denied Ranges:** `0.0.0.0/8`, `10.0.0.0/8`, `100.64.0.0/10`, `127.0.0.0/8`, `169.254.0.0/16` (Cloud Metadata), `172.16.0.0/12`, `192.168.0.0/16`, `198.18.0.0/15`, `224.0.0.0/4`, `240.0.0.0/4`.
  - **IPv6 Denied Ranges:** `::1` (Loopback), `fe80::/10` (Link-Local), `fc00::/7` (Unique Local), `::ffff:0:0/96` (IPv4-Mapped IPv6), `64:ff9b::/96`.
  - Connect directly to the validated IP address with the original `Host` header set to prevent TOCTOU DNS rebinding.
- **HTTP Redirect Re-Validation:** Never follow HTTP 3xx redirects blindly. Intercept each redirect and re-evaluate the target URL through the complete SSRF validation pipeline.
- **Egress & Defense-in-Depth:** Prefer strict destination domain allowlists whenever possible. Complement application logic with network-level egress security groups blocking instance metadata endpoints (`169.254.169.254`, `[fd00:ec2::254]`).
- **CORS Hardening:** Whitelist specific trusted origins explicitly. Never reflect the incoming `Origin` header or return `Access-Control-Allow-Origin: *` alongside `Access-Control-Allow-Credentials: true`.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
