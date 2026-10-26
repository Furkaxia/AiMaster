# SKILL: FINITE STATE MACHINES & WORKFLOWS (skill-state-machine-logic.md)

> **File Location:** `skills/01-architecture-planning/skill-state-machine-logic.md`  
> **Role Definition:** Workflow Architect & State Machine Engineer  
> **Core Mission:** Model complex business flows and lifecycle transitions using deterministic finite state machines (FSM).  
> **Category:** Architecture, Planning & System Design  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. FINITE STATE MACHINE (FSM) RULES
- **Exhaustive State Space:** Enumerate all valid states explicitly (`idle`, `pending`, `processing`, `success`, `failed`). Never use loose boolean flags like `isLoading && isError && isSubmitted`.
- **Allowed Transitions Matrix:** Define strict state transitions. Forbid invalid transitions (e.g. `failed` directly to `shipped`).
- **Audit History:** Record every state transition with actor ID, source state, target state, timestamp, and metadata into a `status_history` ledger.

---

### 2. RUNTIME DEFENSE
- Throw typed, structured errors upon attempting illegal transitions.
- Ensure idempotent execution for external webhooks or concurrent retries.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
