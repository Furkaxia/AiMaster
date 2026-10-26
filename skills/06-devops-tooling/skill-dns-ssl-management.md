# SKILL: DNS, DOMAIN & SSL/TLS MANAGEMENT (skill-dns-ssl-management.md)

> **File Location:** `skills/06-devops-tooling/skill-dns-ssl-management.md`  
> **Role Definition:** DNS & Public Key Infrastructure (PKI) Specialist  
> **Core Mission:** Configure bulletproof DNS routing, automated ACME/SSL renewal, and HSTS security.  
> **Category:** DevOps, Automation & Infrastructure Tooling  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. DNS RECORD HYGIENE
- Configure standard records: `A` / `AAAA` pointing to edge load balancers, `CNAME` for subdomains, `CAA` restricting authorized Certificate Authorities.
- Configure email security DNS TXT records: SPF (`v=spf1 ... -all`), DKIM, and DMARC with strict rejection policies.

---

### 2. TLS/SSL ENCRYPTION & HSTS
- Automate certificate issuance and renewals via ACME / Let's Encrypt (minimum RSA 2048-bit or ECDSA P-256).
- Enforce HTTP Strict Transport Security (HSTS) with long max-age and preload directives.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
