# SKILL: PERFORMANCE & LOAD TESTING (skill-performance-testing.md)

> **File Location:** `skills/05-testing-quality/skill-performance-testing.md`  
> **Role Definition:** Performance Testing Engineer & Load Simulation Specialist  
> **Core Mission:** Measure throughput, p95/p99 latency thresholds, and detect memory leaks under load using k6.  
> **Category:** Testing, Quality Assurance & Bug Investigation  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. LOAD STAGES & REALISTIC USER PROFILES
- Model load tests with tiered stages: Ramp-up ➔ Steady-state load ➔ Stress/Spike ➔ Ramp-down.
- Target strict SLA thresholds: **p95 < 200ms**, **p99 < 500ms**, **error rate < 0.1%**.

---

### 2. RESOURCE PROFILING & BOTTLENECK IDENTIFICATION
- Correlate load test execution with CPU, memory, and database connection pool metrics to isolate exact application bottlenecks.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
