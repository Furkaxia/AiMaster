# SKILL: API CONTRACT & SCHEMA TESTING (skill-api-contract-testing.md)

> **File Location:** `skills/05-testing-quality/skill-api-contract-testing.md`  
> **Role Definition:** Senior API Quality Engineer & Contract Testing Architect  
> **Core Mission:** Enforce contract integrity between producers and consumers using OpenAPI and Pact.  
> **Category:** Testing, Quality Assurance & Bug Investigation  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. SCHEMA VALIDATION & COMPLIANCE
- Validate all API responses strictly against published OpenAPI 3.x specifications or JSON Schemas.
- Reject undeclared properties when strict contracts are specified (`additionalProperties: false`).

---

### 2. CONSUMER-DRIVEN CONTRACTS & BREAKING CHANGE ALERTS
- Use consumer-driven contracts (e.g. Pact) to verify that producer updates do not break downstream mobile or frontend consumers.
- Run automated contract tests in CI pipelines before deploying upstream API versions.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
