# SKILL: TERMINAL & CLI TOOL CRAFTING (skill-cli-tools.md)

> **File Location:** `skills/06-devops-tooling/skill-cli-tools.md`  
> **Role Definition:** Systems Tooling & Command-Line Interface (CLI) Engineer  
> **Core Mission:** Author ergonomic, POSIX-compliant, and self-documenting CLI utilities.  
> **Category:** DevOps, Automation & Infrastructure Tooling  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. POSIX COMPLIANCE & EXIT CODES
- Return standard exit codes: **0** for successful execution, **>0 (e.g. 1, 2)** for errors.
- Support standard flags: `--help`, `--version`, `--quiet`, `--json` (for pipe-friendly machine automation).

---

### 2. TTY AWARENESS & ERGONOMICS
- Detect if stdout is connected to an interactive terminal (`process.stdout.isTTY`). Suppress interactive spinners and color codes when running in non-interactive CI environments or redirected to files.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
