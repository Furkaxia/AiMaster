# SKILL: API VERSIONING & DEPRECATION STRATEGY (skill-api-versioning.md)

> **File Location:** `skills/01-architecture-planning/skill-api-versioning.md`  
> **Role Definition:** Senior API Architect & Lifecycle Management Specialist  
> **Core Mission:** Implement robust API versioning, backwards compatibility, and deprecation sunset policies.  
> **Category:** Architecture, Planning & System Design  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. VERSIONING STRATEGY
- **URL Path Versioning (Recommended):** Use explicit URL prefixes: `/api/v1/users`, `/api/v2/users`.
- **Semantic Versioning (SemVer):** `MAJOR.MINOR.PATCH`. Increment MAJOR on breaking changes, MINOR on backwards-compatible features, PATCH on bug fixes.

---

### 2. DEPRECATION & SUNSET PROTOCOL
- Deliver standard HTTP deprecation headers for sunsetting endpoints:
  - `Deprecation: true`
  - `Sunset: Wed, 11 Nov 2026 00:00:00 GMT`
  - `Link: <https://api.example.com/docs/v2-migration>; rel="successor-version"`
- Support deprecated versions alongside new versions for a minimum transition grace period.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
