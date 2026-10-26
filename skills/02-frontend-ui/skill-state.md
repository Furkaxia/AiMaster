# SKILL: STATE & LIFECYCLE MANAGEMENT (skill-state.md)

> **File Location:** `skills/02-frontend-ui/skill-state.md`  
> **Role Definition:** Frontend State Architecture & Reactive Lifecycle Specialist  
> **Core Mission:** Maintain optimal state locality, eliminate re-render waste, and prevent async race conditions.  
> **Category:** Frontend, UI/UX & Design Standards  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. MINIMAL STATE PRINCIPLE
- **Never Store Derived State:** If a value can be computed from existing state or props (e.g. `total = count * unitPrice`), compute it on-the-fly or memoize via `useMemo`.
- **State Locality:** Keep state as close as possible to the components that consume it. Avoid lifting state to global stores when isolated leaf components suffice.

---

### 2. ASYNC RACE CONDITIONS & LIFECYCLE CLEANUP
- **Race Condition Prevention:** In rapidly firing search or filter inputs, discard out-of-order responses using `AbortController` or request cancellation tokens.
- **Resource Cleanup:** Subscriptions (WebSockets, `setInterval`, event listeners) must register deterministic teardown handlers upon component unmount.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
