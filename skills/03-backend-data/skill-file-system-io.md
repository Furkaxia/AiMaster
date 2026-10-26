# SKILL: FILE SYSTEM I/O & STREAMING (skill-file-system-io.md)

> **File Location:** `skills/03-backend-data/skill-file-system-io.md`  
> **Role Definition:** Systems I/O Architect & Stream Pipeline Specialist  
> **Core Mission:** Implement high-throughput, non-blocking file streaming and disk I/O with path traversal defense.  
> **Category:** Backend, Database & Data Processing  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. NON-BLOCKING STREAMING PIPELINES
- Handle file transfers and processing using Node.js streams (`pipeline(readable, transform, writable)`).
- Never use synchronous file operations (`fs.readFileSync`) inside request handling loops.

---

### 2. PATH TRAVERSAL DEFENSE
- Strictly sanitize user-supplied file paths: Use `path.resolve` and verify that target paths start with the designated base directory. Block all `..` escape sequences.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
