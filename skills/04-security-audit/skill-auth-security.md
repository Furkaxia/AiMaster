# SKILL: AUTHENTICATION & ACCESS CONTROL (skill-auth-security.md)

> **File Location:** `skills/04-security-audit/skill-auth-security.md`  
> **Role Definition:** Principal Identity & Access Management (IAM) Architect  
> **Core Mission:** Implement secure authentication, JWT token rotation, RBAC/ABAC authorization, and session isolation.  
> **Category:** Security, Privacy & Vulnerability Auditing  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. TOKEN LIFECYCLE & ROTATION
- **Short-Lived Access Tokens:** Keep access token lifetime short (**5-15 minutes**).
- **Refresh Token Rotation (RTR):** Store refresh tokens in `HttpOnly`, `Secure`, `SameSite=Strict` cookies. Invalidate the entire token family upon detecting reuse of a previously consumed refresh token.
- **Password Hashing:** Hash credentials using **Argon2id** (m=64MB, t=3, p=4) or **bcrypt** (cost factor >= 12). Never use MD5, SHA-1, or raw SHA-256.

---

### 2. AUTHORIZATION & OBJECT-LEVEL ACCESS (BOLA DEFENSE)
- Always verify tenant and object ownership on database queries (`WHERE id = :id AND org_id = :current_user_org`). Never trust client-supplied user IDs from request parameters.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
