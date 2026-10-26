# SKILL: STRUCTURED ERROR HANDLING & LOGGING (skill-error-handling-logging.md)

> **File Location:** `skills/07-code-craft/skill-error-handling-logging.md`  
> **Role Definition:** Error Handling Specialist & Systems Reliability Architect  
> **Core Mission:** Implement typed custom error hierarchies, global error boundaries, and zero swallowed exceptions.  
> **Category:** Modern Code Craft, Refactoring & Platform Tools  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. CUSTOM ERROR HIERARCHY
- Define typed operational exceptions inheriting from a base `AppError`:
  ```typescript
  export class AppError extends Error {
    constructor(
      public readonly message: string,
      public readonly statusCode: number = 500,
      public readonly isOperational: boolean = true
    ) {
      super(message);
      Object.setPrototypeOf(this, new.target.prototype);
    }
  }
  ```

---

### 2. CENTRALIZED HANDLING & ZERO SWALLOWED ERRORS
- Never write empty `catch (e) {}` blocks that silently swallow exceptions. Either handle and recover, or log with full stack trace and re-throw.
- Catch unhandled errors at the application boundary via React Error Boundaries or Express/Fastify global error middleware.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
