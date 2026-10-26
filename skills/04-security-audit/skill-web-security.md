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
- **Host / Destination Allowlist First:** Outbound fetch requests must prioritize a strict host allowlist whenever possible. Allowlisting pre-approved external domains is the most effective defense against SSRF.
- **Protocol Allowlist:** Restrict outbound fetch requests strictly to `http:` and `https:`. Explicitly ban dangerous URI schemes (`file:`, `gopher:`, `ftp:`, `dict:`, `ldap:`, `data:`).
- **Socket-Level IP Pinning (Anti-TOCTOU & Anti-DNS Rebinding):** "Validate-then-Fetch" (resolving DNS upfront and then calling a standard fetch) is strictly prohibited because the HTTP client performs a second DNS lookup at the OS level, enabling TTL=0 DNS Rebinding attacks. The pre-validated IP address must be pinned directly into the HTTP Agent's socket `lookup` callback (or custom socket connection), completely preventing a second resolution.
- **Canonical Bit-Level IP Classification:** Never rely on naive regex matching to filter IP addresses (which fails against Octal `0177.0.0.1`, Decimal/DWORD `2130706433`, or embedded encodings). Parse addresses at the canonical bit level: unpack IPv6 translation blocks (`::ffff:0:0/96` IPv4-mapped, `64:ff9b::/96` NAT64, `2002::/16` 6to4) into underlying 32-bit IPv4 addresses before validating against private/special ranges:
  - **IPv4 Denied Blocks:** `0.0.0.0/8`, `10.0.0.0/8`, `100.64.0.0/10` (Carrier-Grade NAT), `127.0.0.0/8`, `169.254.0.0/16` (Link-Local/Cloud Metadata), `172.16.0.0/12`, `192.0.0.0/24` (IETF Protocol), `192.0.2.0/24` (TEST-NET-1), `192.88.99.0/24` (6to4 Relay), `192.168.0.0/16`, `198.18.0.0/15` (Benchmarking), `198.51.100.0/24` (TEST-NET-2), `203.0.113.0/24` (TEST-NET-3), `224.0.0.0/4` (Multicast), `240.0.0.0/4` (Reserved).
  - **IPv6 Denied Blocks:** `::/128` (Unspecified), `::1/128` (Loopback), `::ffff:0:0/96` (IPv4-Mapped), `64:ff9b::/96` (IPv4/IPv6 translation), `100::/64` (Discard-Only), `2001:db8::/32` (Documentation), `2002::/16` (6to4), `fc00::/7` (Unique Local), `fe80::/10` (Link-Local), `ff00::/8` (Multicast).
  - Pin the socket connection directly to the validated IP while preserving TLS SNI (`servername: originalHostname`), validating the server certificate against the original hostname (`checkServerIdentity` + `rejectUnauthorized: true`), and passing the HTTP `Host` header.
- **Manual Redirect Interception (No Automatic Follow):** Disable automatic redirect following (`redirect: 'manual'` / `maxRedirects: 0`). Intercept each HTTP 3xx response manually and re-evaluate the target `Location` header from scratch through the complete SSRF validation + Socket IP Pinning pipeline before issuing subsequent requests.
- **Egress & Defense-in-Depth:** Complement application logic with network-level egress security groups blocking instance metadata endpoints (`169.254.169.254`, `[fd00:ec2::254]`).
- **CORS Hardening:** Whitelist specific trusted origins explicitly. Never reflect the incoming `Origin` header or return `Access-Control-Allow-Origin: *` alongside `Access-Control-Allow-Credentials: true`.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
