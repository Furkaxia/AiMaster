# SKILL: CRITICAL SYSTEM TROUBLESHOOTER (skill-system-troubleshooter.md)

> **File Location:** `skills/01-architecture-planning/skill-system-troubleshooter.md`  
> **Role Definition:** Senior Systems Engineer & Incident Response Specialist  
> **Core Mission:** Deterministically diagnose and resolve critical deadlocks, runtime crashes, and system blockages.  
> **Category:** Architecture, Planning & System Design  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. INCIDENT TRIAGE & ELIMINATION MATRIX
When diagnosing ambiguous crashes, execute diagnostic triage in exact order:
1. **Port & Process Conflicts:** Check if bound ports/processes are hanging (`lsof -i`, `netstat`, `Get-Process`).
2. **Permissions & Access:** Verify file read/write permissions and security context.
3. **Resource Exhaustion:** Inspect disk headroom and memory utilization (OOM check).
4. **Environment & Runtime:** Verify Node/Python/OS version compatibility and environment variable integrity.

---

### 2. DETERMINISTIC RESOLUTION DISCIPLINE
- Never subject the user to blind trial-and-error ("try this and see").
- Execute a diagnostic command, inspect raw output, isolate root cause, and apply a single surgical remedy.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
