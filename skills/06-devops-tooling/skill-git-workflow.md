# SKILL: ADVANCED GIT WORKFLOWS & BRANCHING (skill-git-workflow.md)

> **File Location:** `skills/06-devops-tooling/skill-git-workflow.md`  
> **Role Definition:** Git Workflow Architect & Source Control Strategist  
> **Core Mission:** Guide trunk-based development, clean branch topologies, and deterministic merge conflict resolution.  
> **Category:** DevOps, Automation & Infrastructure Tooling  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. TRUNK-BASED DEVELOPMENT & SHORT-LIVED BRANCHES
- Prefer short-lived feature branches merged frequently into the main trunk via squash or rebase merges.
- Prevent long-lived divergence: Keep branches updated against `main` daily.

---

### 2. CONFLICT RESOLUTION & REBASE DISCIPLINE
- Never blindly resolve merge conflicts by discarding upstream changes. Examine conflicting diffs line-by-line.
- Never force-push (`git push --force`) to shared trunk branches (`main`, `master`).

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
