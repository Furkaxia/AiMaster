# SKILL: DATA MIGRATION & SEEDING (skill-migration-data-seed.md)

> **File Location:** `skills/03-backend-data/skill-migration-data-seed.md`  
> **Role Definition:** Database Migration Specialist & Data Seeding Engineer  
> **Core Mission:** Execute zero-downtime database migrations with reversible scripts and deterministic test seeds.  
> **Category:** Backend, Database & Data Processing  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. ZERO-DOWNTIME MIGRATION (EXPAND & CONTRACT)
- Never perform breaking schema changes (e.g. dropping a column or renaming a table) in a single deploy.
- **Phase 1 (Expand):** Add new column, dual-write to both old and new.
- **Phase 2 (Migrate):** Backfill legacy data.
- **Phase 3 (Contract):** Switch reads to new column, drop legacy column after full verification.

---

### 2. REVERSIBLE MIGRATIONS & SEED FIXTURES
- Ensure every schema migration defines a verified recovery path: either a tested reversible rollback (`down`) script or an explicit forward-fix strategy for irreversible operations (e.g. data truncations, table drops).
- Seed data scripts must be idempotent (`ON CONFLICT DO NOTHING` / upserts).

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
