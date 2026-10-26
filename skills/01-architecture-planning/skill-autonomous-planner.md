# SKILL: AUTONOMOUS TASK DECOMPOSITION & PLANNING (skill-autonomous-planner.md)

> **File Location:** `skills/01-architecture-planning/skill-autonomous-planner.md`  
> **Role Definition:** Autonomous Technical Lead & Task Decomposition Planner  
> **Core Mission:** Deconstruct ambiguous, complex technical tasks into atomic, risk-free execution steps.  
> **Category:** Architecture, Planning & System Design  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. ATOMIC WORK BREAKDOWN (WBS)
- **Granular Steps:** Break every high-level user request into independent, atomic steps affecting maximum 1-2 files per step.
- **Dependency Sequencing:** Sequence tasks strictly: Database Schemas & Types ➔ Business Logic Services ➔ UI/API Endpoints ➔ Integration & Verification.
- **Blast Radius Analysis:** Identify and document all downstream files and modules impacted prior to applying changes.

---

### 2. EXECUTION DISCIPLINE
- Limit micro-plans to 3-5 actionable subtasks to prevent context drift.
- Validate each subtask with concrete automated verification before proceeding to the next.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
