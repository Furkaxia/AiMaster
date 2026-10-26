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

### 2. PATH TRAVERSAL & SYMLINK DEFENSE
- **Relative Path Boundary Check:** Never rely on naive prefix checks (`targetPath.startsWith(baseDir)`) which mistakenly allow sibling directories with matching prefixes (e.g., `/data-secret` matching `/data`). Calculate `const rel = path.relative(baseDir, targetPath)` and enforce `!rel.startsWith('..') && !path.isAbsolute(rel)`.
- **Symlink & New File Boundary Resolution:** For existing files, resolve canonical filesystem paths via `fs.realpathSync(targetPath)`. For write operations creating new files, resolve the real path of the nearest existing parent directory (`fs.realpathSync(path.dirname(targetPath))`) and assert that it strictly resides within the canonical `fs.realpathSync(baseDir)` boundary.
- **Null-Byte Injection Ban:** Strictly reject and throw an error if any path parameter contains a null-byte (`\0`) sequence. Never attempt to sanitize paths by silently stripping null bytes.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
