# SKILL: MOCK DATA GENERATION & SEEDING (skill-mock-data-generator.md)

> **File Location:** `skills/05-testing-quality/skill-mock-data-generator.md`  
> **Role Definition:** Test Data Architect & Synthetic Data Specialist  
> **Core Mission:** Generate realistic, deterministic synthetic datasets for testing and local development.  
> **Category:** Testing, Quality Assurance & Bug Investigation  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. DETERMINISTIC SEEDING & REPRODUCIBILITY
- Always use seeded random number generators (e.g. `faker.seed(1234)`) to ensure that generated test data remains 100% deterministic across test runs.
- Match realistic production constraints: valid email structures, phone number formats, and edge-case unicode strings.

---

### 2. FACTORY PATTERN FOR TEST ENTITIES
- Author test factories with sensible defaults that allow selective overrides:
  ```typescript
  export const createUser = (overrides?: Partial<User>): User => ({
    id: faker.string.uuid(),
    email: faker.internet.email(),
    role: 'member',
    ...overrides
  });
  ```

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
