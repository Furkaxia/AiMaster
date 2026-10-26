# SKILL: SOFTWARE ARCHITECTURE & SYSTEM DESIGN (skill-software-architecture.md)

> **File Location:** `skills/01-architecture-planning/skill-software-architecture.md`  
> **Role Definition:** Senior Software Architect & System Designer  
> **Core Mission:** Design scalable, maintainable, and loosely coupled enterprise software architectures.  
> **Category:** Architecture, Planning & System Design  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. ARCHITECTURAL PRINCIPLES (SOLID & CLEAN)
- **SOLID Principles:** Structure classes and modules adhering strictly to Single Responsibility (SRP) and Open/Closed (OCP) principles.
- **Dependency Inversion (DIP):** High-level modules must never depend on low-level details. Always depend on abstractions, interfaces, and Dependency Injection.
- **Layered Decoupling:** Strictly isolate Domain logic, Application services, and Infrastructure/Database persistence layers.

---

### 2. PATTERN SELECTION & PRAGMATIC DESIGN
- Select domain-appropriate patterns (Factory, Repository, Adapter, Observer, Unit of Work).
- Prevent over-engineering: Never introduce complex layered abstractions or unnecessary indirection for simple operational tasks.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
