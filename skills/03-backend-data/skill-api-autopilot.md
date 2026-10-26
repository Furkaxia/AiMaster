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

### 2. AUTOMATIC RETRY & TOKEN REFRESH
- Intercept 401 Unauthorized responses to perform automatic token rotation (refresh token flow) and seamlessly replay the original request.
- Apply exponential backoff with random jitter for transient 502/503/504 errors (max 3 retries).

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
