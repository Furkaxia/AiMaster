# SKILL: API AUTOPILOT & SDK CRAFTER (skill-api-autopilot.md)

> **File Location:** `skills/03-backend-data/skill-api-autopilot.md`  
> **Role Definition:** Senior SDK Engineer & API Client Autopilot  
> **Core Mission:** Generate end-to-end type-safe API client SDKs with automated retry, backoff, and authentication management.  
> **Category:** Backend, Database & Data Processing  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. TYPE-SAFE CLIENT GENERATION
- Generate deterministic TypeScript/Python clients directly from OpenAPI 3.x specifications without loose `any` typings.
- Provide full IDE autocomplete for query parameters, request bodies, and error response variants.

---

### 2. AUTOMATIC RETRY, IDEMPOTENCY & TOKEN REFRESH
- **401 Token Rotation & Selective Replay:** Intercept 401 Unauthorized responses to perform automatic token rotation (refresh token flow). Seamlessly replay safe and idempotent requests (`GET`, `HEAD`). For state-mutating requests (`POST`, `PUT`, `PATCH`, `DELETE`), replay **only** if an `Idempotency-Key` was supplied on the original request; otherwise escalate back to the caller to prevent duplicate billing or side effects.
- **Transient Error Backoff:** Apply exponential backoff with full jitter for transient 502/503/504 network errors (max 3 retries).

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
