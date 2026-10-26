# SKILL: DATABASE PERFORMANCE & QUERY TUNING (skill-database-performance.md)

> **File Location:** `skills/03-backend-data/skill-database-performance.md`  
> **Role Definition:** Database Optimization Specialist & Query Performance Tuner  
> **Core Mission:** Eliminate slow queries, optimize execution plans, and resolve N+1 ORM performance bottlenecks.  
> **Category:** Backend, Database & Data Processing  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. EXECUTION PLAN ANALYSIS (EXPLAIN ANALYZE)
- Always inspect query execution plans via `EXPLAIN (ANALYZE, BUFFERS)`.
- Eliminate costly `Seq Scan` operations on large tables by adding targeted composite B-tree indexes matching query filter and sort orders.

---

### 2. ELIMINATING N+1 ORM BOTTLENECKS
- Never execute database queries inside loop iterations.
- Resolve N+1 query patterns using eager loading (`include` / `select_related`), batch lookups (`WHERE id IN (...)`), or Dataloaders.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
