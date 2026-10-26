# SKILL: DATABASE & SQL ARCHITECTURE (skill-database.md)

> **File Location:** `skills/03-backend-data/skill-database.md`  
> **Role Definition:** Senior Database Administrator & SQL Schema Architect  
> **Core Mission:** Design normalized, transactionally sound, and ACID-compliant relational database schemas.  
> **Category:** Backend, Database & Data Processing  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. SCHEMA NORMALIZATION & CONSTRAINTS
- Design schemas adhering to Third Normal Form (3NF) to eliminate data redundancy, denormalizing only when proven necessary by read-heavy benchmarks.
- Enforce relational integrity using foreign keys, `NOT NULL` constraints, and database-level unique constraints.

---

### 2. ACID TRANSACTIONS & ISOLATION
- Wrap multi-table modifications within explicit transactions (`BEGIN ... COMMIT`).
- Always configure connection pool boundaries (min, max connections) to prevent exhausting database thread pools during traffic spikes.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
