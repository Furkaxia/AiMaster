# SHARED SKILL FOOTER — COMMON DIRECTIVES (_shared-skill-footer.md)

> **Purpose:** Centralized source of truth for common prohibitions, execution protocols, and QA checklists shared across all skills.  
> **Usage:** Referenced at the end of each skill module via `> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)`.  
> **Deduplication Protocol:** When multiple skills (1–3) are loaded into runtime context, the shared footer directives are injected globally once at the end of the active prompt stream (leveraging recency bias) rather than duplicated, preventing semantic dilution and attention degradation.

---

## 🚫 COMMON STRICT PROHIBITIONS & GUARDRAILS (ANTI-PATTERNS)

- ❌ **Zero Assumptions & Hallucinations:** Never assume unverified functions, endpoints, database schemas, or packages exist in the codebase. If an assertion cannot be confirmed, explicitly mark it as `UNVERIFIED`.
- ❌ **No Over-Engineering:** Avoid multi-layered abstractions, premature generalizations, or bloated design patterns for straightforward tasks.
- ❌ **No Band-Aid Fixes:** Do not mask runtime errors with empty `try/catch` blocks, compiler/linter suppressions (`@ts-ignore`, `@ts-nocheck`, `eslint-disable`), or silencing types via `any`.
- ❌ **No Scope Creep:** Modify only files strictly within the task scope. Never refactor surrounding untouched code without explicit user confirmation.
- ❌ **No Placeholders or Truncations:** Banned: `// ... code here`, `// TODO: implement later`, or lazy diff truncation. Deliver complete, syntactically valid code blocks.
- ❌ **Zero Hardcoded Secrets:** Never hardcode or expose API keys, passwords, JWT tokens, or private certificates in code or chat outputs. Reference environment variable names only.

---

## ⚡ COMMON STEP-BY-STEP EXECUTION PROTOCOL (AI WORKFLOW)

1. **Context & Input Inspection:**
   - Read the target file in full before editing (never modify unseen code).
   - Trace all `import` and `export` relationships.
   - Scan the workspace for all usages and call sites of the modified symbol.
   - Inspect existing unit/integration test suites.

2. **Surgical Implementation:**
   - Apply minimal, precise edits directly to target functions/components, maintaining architectural coherence.
   - Declare modified, created, and deleted files upfront.

3. **Edge-Case Simulation:**
   - Simulate zero (0), negative (-1), null/undefined, empty string, and boundary conditions.
   - Guard against division-by-zero, IEEE-754 precision drift, and NaN.

4. **Regression Verification:**
   - Ensure modifications do not break callers or downstream services.
   - Verify typing, contracts, and lifecycle invariants.

---

## 🧪 COMMON VERIFICATION & QA CHECKLIST

- [ ] Does the implementation fulfill 100% of the specified requirements?
- [ ] Are project architectural conventions, folder hierarchy, and naming patterns preserved?
- [ ] Was the solution built using existing dependencies without adding unnecessary packages?
- [ ] Were edge cases (0, null, negative, boundary) explicitly guarded?
- [ ] Has regression impact been assessed on dependent components?
- [ ] Is the `🧪 [QA TEST ÖZETİ]` verification summary block appended to the final response?
