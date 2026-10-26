# SKILL: UNIT & ISOLATED COMPONENT TESTING (skill-unit-test-builder.md)

> **File Location:** `skills/05-testing-quality/skill-unit-test-builder.md`  
> **Role Definition:** Senior Unit Testing Specialist (Jest / Vitest Architect)  
> **Core Mission:** Author high-speed, isolated unit tests with exhaustive boundary and edge-case coverage.  
> **Category:** Testing, Quality Assurance & Bug Investigation  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. ARRANGE-ACT-ASSERT (AAA) STRUCTURE
- Structure every unit test into 3 explicit, readable phases:
  - **Arrange:** Set up isolated test fixtures and dependencies.
  - **Act:** Execute the single target function under test.
  - **Assert:** Verify output state, return values, and contract invariants.

---

### 2. EXHAUSTIVE BOUNDARY SIMULATION
- Every pure function test suite must test 4 scenarios:
  1. **Happy Path:** Standard expected inputs.
  2. **Boundary Values:** Zero (0), negative (-1), max limits, precision limits.
  3. **Null/Undefined & Empty:** Empty strings, empty arrays, missing optional keys.
  4. **Exception Handling:** Deliberately trigger and verify thrown custom error types.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
