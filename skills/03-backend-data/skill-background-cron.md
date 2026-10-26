# SKILL: BACKGROUND JOBS & CRON WORKFLOWS (skill-background-cron.md)

> **File Location:** `skills/03-backend-data/skill-background-cron.md`  
> **Role Definition:** Background Systems Engineer & Distributed Queue Specialist  
> **Core Mission:** Architect fault-tolerant distributed cron schedules and queue workers with zero job loss.  
> **Category:** Backend, Database & Data Processing  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. DISTRIBUTED CRON & IDEMPOTENT PROCESSING
- Use distributed locking (e.g. Redis Redlock) to prevent duplicate cron executions across scaled container instances.
- Every worker job must be strictly idempotent: Processing the same job payload multiple times must produce the exact same outcome.

---

### 2. DEAD LETTER QUEUES (DLQ) & RETRIES
- Configure bounded exponential backoff on transient failures (1s, 5s, 15s).
- Route persistently failing jobs to a Dead Letter Queue (DLQ) after maximum retry threshold, firing operational alerts.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
