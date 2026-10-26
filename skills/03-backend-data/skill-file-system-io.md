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

### 2. PATH TRAVERSAL, TOCTOU & SYMLINK DEFENSE
- **Null-Byte Injection Rejection:** Immediately reject and throw an error if any path parameter contains a null-byte (`\0`) sequence (`if (targetPath.includes('\0')) throw new Error('Invalid path: null byte detected')`). Never attempt to sanitize paths by silently stripping null bytes.
- **Canonical Relative Path Boundary Check:** Never rely on naive prefix checks (`targetPath.startsWith(baseDir)`) which mistakenly allow sibling directories (`/data-secret` vs `/data`) or fail on case-insensitive filesystems (Windows NTFS, macOS APFS where `C:\App\Data` vs `c:\app\data` causes bypass). Always compare canonical paths: `const rel = path.relative(realBaseDir, realTargetPath)` and strictly enforce `!rel.startsWith('..') && !path.isAbsolute(rel)`.
- **Symlink & Non-Existent File Resolution:** For existing files, resolve canonical filesystem paths via `fs.realpathSync.native(targetPath)`. For write operations creating new files (where `realpathSync` fails on the non-existent leaf), locate the nearest existing parent directory, resolve its canonical path via `fs.realpathSync.native(parentDir)`, append the sanitized target filename, and assert that the resolved target strictly resides within `fs.realpathSync.native(baseDir)`.
- **TOCTOU Race Condition Defense (Kernel-Level `O_NOFOLLOW`):** Resolving paths before opening leaves a TOCTOU race window where intermediate directories could be swapped with symlinks. Always pass `fs.constants.O_NOFOLLOW` when opening file descriptors (`fs.openSync(path, fs.constants.O_RDONLY | fs.constants.O_NOFOLLOW)` or Linux `openat2` with `RESOLVE_BENEATH`) to enforce symlink non-traversal at the OS kernel level.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
