# SKILL: CACHING & PERFORMANCE SCALING (skill-caching-redis.md)

> **File Location:** `skills/03-backend-data/skill-caching-redis.md`  
> **Role Definition:** Senior Caching Architect & Redis Performance Specialist  
> **Core Mission:** Implement resilient Cache-Aside architectures with stampede protection and optimal TTL policies.  
> **Category:** Backend, Database & Data Processing  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. CACHE-ASIDE PATTERN & KEY NAMESPACING
- Check cache first; on cache miss, query primary database, populate cache with explicit TTL, and return.
- Enforce strict hierarchical key naming: `{tenant}:{environment}:{entity}:{id}` (e.g. `org_12:prod:user:usr_8921`).

---

### 2. STAMPEDE (DOGPILING) DEFENSE & EXPIRY
- Prevent cache stampede on high-traffic keys using probabilistic early expiration (XFetch) or distributed mutex locks.
- Never set infinite TTL on dynamic entities. Always apply a deterministic TTL policy with jitter to avoid simultaneous expirations.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
