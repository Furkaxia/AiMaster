# SKILL: INTEGRATION TESTING ARCHITECTURE (skill-integration-testing.md)

> **File Location:** `skills/05-testing-quality/skill-integration-testing.md`  
> **Role Definition:** Senior Integration Test Architect  
> **Core Mission:** Test multi-component boundaries with ephemeral test containers and real database transactions.  
> **Category:** Testing, Quality Assurance & Bug Investigation  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. REAL DEPENDENCIES VIA TESTCONTAINERS
- Test database and cache integrations against real disposable instances (Docker/Testcontainers) rather than fragile in-memory mocks (e.g. mock-pg).
- Reset database state cleanly between test executions using transaction rollbacks or truncation scripts.

---

### 2. BOUNDARY INTERACTION VERIFICATION
- Verify end-to-end integration flows across HTTP handlers, business services, database repositories, and message publishers.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
