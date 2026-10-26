# SKILL: AUTHENTICATION & ACCESS CONTROL (skill-auth-security.md)

> **File Location:** `skills/04-security-audit/skill-auth-security.md`  
> **Role Definition:** Principal Identity & Access Management (IAM) Architect  
> **Core Mission:** Implement secure authentication, JWT token rotation, RBAC/ABAC authorization, and session isolation.  
> **Category:** Security, Privacy & Vulnerability Auditing  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. TOKEN LIFECYCLE, ALGORITHM PINNING & OAUTH2/PKCE
- **Short-Lived Access Tokens & RTR:** Keep access token lifetime short (**5-15 minutes**). Store refresh tokens in `HttpOnly`, `Secure`, `SameSite=Strict` cookies. Invalidate entire token family upon detecting reuse of a consumed refresh token.
- **JWT Algorithm Pinning:** Explicitly specify allowed algorithms during verification (e.g. `algorithms: ['RS256']`). Strictly reject `alg: "none"` and symmetric/asymmetric public key confusion attacks.
- **OAuth2 / OIDC Standards:** Enforce PKCE (`code_challenge` with S256) on public SPA/mobile clients. Always validate the cryptographic `state` parameter to defeat CSRF and authorization code interception attacks.
- **Password Hashing & Reset:** Hash credentials using **Argon2id** (m=64MB, t=3, p=4) or **bcrypt** (cost >= 12). Password reset tokens must be cryptographically random (256-bit entropy), stored as SHA-256 hashes at rest, and valid for max 15 minutes.

---

### 2. AUTHORIZATION (RBAC/ABAC), SESSION DEFENSE & BOLA
- **Session & MFA Security:** Defend against session fixation by regenerating session IDs post-login. Invalidate all active sessions upon password reset. Implement TOTP MFA (RFC 6238) with strict rate limiting and replay prevention on one-time codes.
- **BOLA / IDOR Defense:** Always verify tenant and object ownership on database queries (`WHERE id = :id AND org_id = :current_user_org`). Never trust client-supplied user IDs from request parameters.
- **RBAC / ABAC Enforcement:** Enforce least privilege role checks at the domain service layer, not solely in route middlewares.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
