# SESSION HANDOFF & CONTEXT RECOVERY PROTOCOL (session-handoff-protocol-ai.md)

> **File Location:** `session-handoff-protocol-ai.md`  
> **Role Definition:** Session Continuity, Context Compaction & Fresh-Session Transition Architect  
> **Core Mission:** Eliminate attention drift, memory degradation, and catastrophic token waste during deep multi-turn engineering sessions by sealing active architectural state, cryptographic git baselines, and rejected approaches into `.handoff/session-state.md` for zero-loss recovery in fresh chat sessions.

---

## 1. ARCHITECTURAL RATIONALE & CONTEXT DRIFT DANGERS

When frontier LLMs reach 50k–100k+ token conversation histories:
1. **Lost-in-the-Middle:** Past constraints and architectural decisions fade from attention, triggering hallucinations.
2. **Exponential Token Burn:** Every minor prompt re-processes the entire 100k history, escalating cost and latency.
3. **Instability & Regressions:** Models cycle through contradictory edits on the same files.

**The Solution:** Transition to a clean, fresh context window backed by a lossless **Masterprompt** preserving milestones, active skill state, rejected approaches, and next immediate steps.

---

## 2. HANDOFF TRIGGER CRITERIA

The Handoff Protocol activates upon encountering any of the following triggers:

1. **Turn-Count Threshold:** 15–20+ deep coding turns in the active conversation.
2. **Milestone Completion:** Major module completed (e.g. Auth, Payments, or Core Layout) prior to embarking on the next subsystem.
3. **Explicit User Command:** The user invokes `/handoff`, `HANDOFF`, or `AIMASTER: HANDOFF`.
4. **Attention Degradation:** The Agent repeats an identical mistake twice or recognizes context boundary saturation.

---

## 3. `.handoff/session-state.md` LOSSLESS SCHEMA

Upon trigger, the Agent creates or updates `.handoff/session-state.md` in the project root following this strict schema:

````markdown
# 🔄 AIMASTER SESSION STATE & RESUME MASTERPROMPT
> **Timestamp:** [YYYY-MM-DD HH:mm]
> **Active Project:** [Project Name / Root Path]
> **Handoff Trigger:** [Context Threshold / Milestone Completion / User Command]

---

## 1. COMPLETED MILESTONES
- [x] [Module / Feature 1 implemented and verified]
- [x] [Module / Feature 2 verified]

## 2. AFFECTED FILES & ARCHITECTURAL DELTAS
- `src/components/Header.tsx`: Responsive navigation and accessibility attributes added.
- `src/services/api.ts`: Idempotency headers and retry strategies implemented.

## 3. ACTIVE CONTEXT, LOADED SKILLS & CRYPTOGRAPHIC BASELINE
- **Active Skills Loaded:** `[skills/03-backend-data/skill-api.md, skills/04-security-audit/skill-auth-security.md]`
- **Git State Verification:** `git_head_sha: [commit_sha]`, `dirty_files_sha256: [hash_or_clean]`
- **Verification Command:** `[npm test / npx vitest run]` (Single-line test command executed by the successor agent in Step 1)
- **Active Architectural Contracts:** 60-30-10 palette tokens (#090A0F / #151823 / #4F46E5), Zustand state persistence.

## 4. REJECTED APPROACHES & FAILURE MODES
- ❌ **Rejected Path 1:** [Attempted algorithm X, rejected due to race condition under high concurrency]
- ❌ **Rejected Path 2:** [Evaluated package Y, rejected due to bundle bloat]
*(Crucial memory lock preventing the successor agent from re-attempting known failing solutions)*

## 5. NEXT IMMEDIATE OBJECTIVE
- [ ] [Exact surgical task to execute immediately upon resuming]

---

## 6. 🚀 NEW CHAT RESUME MASTERPROMPT (COPY & PASTE INTO NEW CHAT)
[Copy and paste the block below into a fresh chat session:]

```text
RESUMING AIMASTER SESSION FROM PRIOR CONTEXT CHECKPOINT.
Read RulesAI.md and .handoff/session-state.md in the project root.

CURRENT SESSION BASELINE:
- Completed: [Milestone summary]
- Verification Command: [Verification Command]
- Rejected Approaches: [Rejected Approaches - DO NOT re-attempt]
- Next Immediate Objective: [Next immediate surgical task]

Inspect .handoff/session-state.md, execute the verification command to confirm baseline health, and proceed immediately with the next objective!
```
````

---

## 4. USER NOTIFICATION FORMAT

After generating the handoff document, conclude the response with this official notification:

```text
⚠️ [AIMASTER CONTEXT CHECKPOINT]
Session context depth has reached the optimal boundary. To prevent attention degradation and eliminate redundant token spend:
1. `.handoff/session-state.md` has been generated and sealed in the repository root.
2. Open a fresh, clean chat session.
3. Paste the Resume Masterprompt from the bottom of `.handoff/session-state.md` into the new chat to resume with zero loss!
```
