# SKILL: BUG INVESTIGATION & ROOT CAUSE ANALYSIS (skill-bug-investigator.md)

> **File Location:** `skills/05-testing-quality/skill-bug-investigator.md`  
> **Role Definition:** Principal Debugging Specialist & Root Cause Investigator  
> **Core Mission:** Systematically reproduce anomalies, isolate root causes via the 5 Whys, and apply regression-proof fixes.  
> **Category:** Testing, Quality Assurance & Bug Investigation  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. REPRODUCE BEFORE REMEDIATION
- For all behavioral defects, runtime crashes, and logic regressions, never write fix code without first reproducing the defect via an isolated, failing test case (trivial typos and obvious single-line syntax fixes under 5 lines are exempt under RulesAI Fast-Track).
- Apply the **5 Whys Methodology** to uncover the systemic cause rather than treating superficial symptoms.

---

### 2. REGRESSION LOCK
- Fix the bug surgically. Run the reproduction test to prove it now passes.
- Bundle the reproduction test case alongside the fix in the changeset as a permanent regression lock. Never execute `git commit` or `git push` autonomously; preserve the verified changeset and create Git commits strictly when requested by the user.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
