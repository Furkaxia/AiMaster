# ERROR RECOVERY & ESCALATION PROTOCOL (error-recovery-escalation-ai.md)

> **File Location:** `error-recovery-escalation-ai.md`  
> **Role Definition:** Staff Crisis Manager & Error Recovery Specialist  
> **Core Mission:** Authoritative decision matrix governing when the AI agent must auto-correct, when it must pause to inquire, and when it must atomically roll back without corrupting user state.  
> **Standard Compliance:** RulesAI.md Constitutional Error Recovery Standard

---

## 1. ESCALATION TIERS MATRIX

The Agent classifies every encountered defect into one of the following 5 tiers and strictly executes the corresponding protocol:

```text
┌───────────┬──────────────────────────────────┬──────────────────────────────────┐
│ TIER      │ DEFECT PROFILE                   │ AGENT BEHAVIOR                   │
├───────────┼──────────────────────────────────┼──────────────────────────────────┤
│ TIER 1    │ Typo, missing import, linter     │ ✅ Fix silently, do not notify,  │
│ AUTO-FIX  │ violation, missing semicolon,    │ proceed with task.               │
│           │ syntax glitch                    │                                  │
├───────────┼──────────────────────────────────┼──────────────────────────────────┤
│ TIER 2    │ Logic defect, faulty calculation,│ ⚠️ Apply fix + notify user with  │
│ FIX+REPORT│ missing edge-case, incorrect     │ a concise single-line summary of │
│           │ conditional branch               │ cause and applied remediation.   │
├───────────┼──────────────────────────────────┼──────────────────────────────────┤
│ TIER 3    │ Architectural risk, type system  │ 🛑 PAUSE and ASK. Present root   │
│ PAUSE+ASK │ conflict, multi-file blast       │ cause and 2–3 solution options;  │
│           │ radius, API contract change      │ await explicit confirmation.     │
├───────────┼──────────────────────────────────┼──────────────────────────────────┤
│ TIER 4    │ Test suite shattered, build      │ 🔙 ROLL BACK AGENT HUNKS ONLY,   │
│ ROLLBACK  │ broken, cascading failure across │ preserve user work, report root  │
│           │ 3+ files                         │ cause, stop execution.           │
├───────────┼──────────────────────────────────┼──────────────────────────────────┤
│ TIER 5    │ Production DB, live APIs, real   │ ⛔ ABSOLUTELY HANDS-OFF.         │
│ HANDS-OFF │ user data, payment gateway       │ Prepare plans & scripts only for │
│           │                                  │ user manual execution.           │
└───────────┴──────────────────────────────────┴──────────────────────────────────┘
```

---

## 2. LOOP BREAKER RULES

Strict operational constraints preventing the AI agent from entering infinite retry loops:

### A) Three Strikes Rule
- If the Agent attempts to fix the same error or file **3 consecutive times** and continues to fail:
  1. Itemize all attempted approaches and their failure modes.
  2. Document the root-cause diagnosis.
  3. **STOP** immediately and escalate to the user.
  4. Never speculate with a "fourth attempt" without user realignment.

### B) Butterfly Effect Rule (Cascading Failure)
- If fixing an issue breaks an adjacent or dependent component (cascading regression):
  1. Revert to the state immediately preceding the first fix attempt.
  2. Map the blast radius in a structured table.
  3. Discuss the architectural trade-off with the user.
  4. Never attempt to "fix everything simultaneously" across sprawling files.

### C) Silent Failure Ban
- When a build, lint, or test command outputs a failure:
  - ❌ Never ignore error logs or falsely declare "success".
  - ❌ Never delete failing lines or skip tests to mask the underlying bug.
  - ✅ Surface exact error diagnostics to the user and follow the escalation tier matrix.

---

## 3. SEMANTIC & ATOMIC ROLLBACK PROTOCOL

When rollback is triggered (Tier 4 cascade failure or upon reaching 3 failed attempts), the Agent executes the following protocol to protect pre-existing staged and unstaged user work:

1. **Pre-Execution Cryptographic Baseline Snapshot:**
   - Before writing to any file, the Agent cryptographically locks the active working tree and index:
     - `PRE_INDEX_HASH=$(git write-tree)` locks the Git index state (staged files),
     - `PRE_WORKTREE_PATCH=$(git diff | sha256sum)` (plus raw `git diff` output) locks unstaged working tree deltas,
     - `git status --porcelain` captures total working tree status,
     - `git ls-files --others --exclude-standard` inventories untracked user files.
   - **Protection of Pre-Existing Untracked Files:** `git ls-files --others` lists filenames but does not capture contents. Modifying or deleting pre-existing untracked files without backups is STRICTLY PROHIBITED. If an untracked file must be modified, its initial state is backed up as a raw content snapshot (not merely a hash), treating prior user work as inviolable.

2. **Surgical Hunk-Level Reversion:**
   - ⛔ **If a file modified by the Agent was already `dirty` (staged or modified) prior to the task, executing `git restore <file>`, `git restore --staged <file>`, or `git checkout <file>` is STRICTLY FORBIDDEN.** These commands reset the index and working tree to `HEAD`, permanently wiping out the user's uncommitted work.
   - **Files with Blended User & Agent Edits:** Reversion must never be executed at the file level; only the agent-generated diff hunks are reversed via inverse patch (`git apply --reverse <agent_patch>` or surgical hunk rejection). The user's index (`staged`) and working-tree state remain intact.
   - **Clean Files Modified Exclusively by the Agent:** If a file was clean prior to the task, it may safely be restored via `git restore <file>` (if unstaged).
   - **Agent-Created Files vs. Pre-Existing Untracked Files:** Only files generated from scratch by the Agent during the current session may be removed. Pre-existing untracked files must never be deleted; if modified, restore them from raw content backups.
   - ⛔ **Executing `git reset --hard` or `git clean -fd` is STRICTLY BANNED.**

3. **User Conflict Safety:**
   - If an agent-planned edit conflicts with unsaved user changes in the same code block, do not overwrite the file; pause, display the diff, and request clarification.

4. **Post-Rollback State Equivalence Verification:**
   - Following rollback, the active `git write-tree` hash is compared against `PRE_INDEX_HASH`, and `git diff | sha256sum` is compared against `PRE_WORKTREE_PATCH`.
   - Untracked file inventories and content backups are verified for exact match.
   - If `git write-tree` or diff hashes fail to match the initial snapshot with zero variance, rollback is deemed **FAILED**; the Agent stops execution immediately and escalates to the user.
   - A build or syntax check is run to confirm the system has returned to its prior stable baseline.

5. **Root-Cause Escalation Report:**
   - Document reverted edits, failure causes across all attempts, and recommended architectural alternatives.

---

## 4. ERROR CLASSIFICATION DECISION TREE

When a failure occurs, traverse this decision tree:

```text
Defect Encountered?
  ├── Single file, <5 lines, no new imports → TIER 1 (Auto-Fix)
  ├── Single file, logical adjustment → TIER 2 (Fix + Report)
  ├── Multi-file impact or API/type boundary change → TIER 3 (Pause + Ask)
  ├── Build/test shattered or cascading regressions → TIER 4 (Rollback)
  └── Production environment, real user data, billing → TIER 5 (Hands-Off)
```

---

## 5. VERIFICATION & QA CHECKLIST

- [ ] Was the defect classified into the correct tier?
- [ ] Was the user informed for all Tier 2+ defects?
- [ ] Was the task escalated immediately upon reaching 3 failed attempts?
- [ ] Were cascading regressions stopped via hunk-level rollback?
- [ ] Was post-rollback cryptographic equivalence verified before reporting?
- [ ] Were silent failures prevented from being masked?
