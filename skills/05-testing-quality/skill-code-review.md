# SKILL: CODE REVIEW & STAFF AUDITING (skill-code-review.md)

> **File Location:** `skills/05-testing-quality/skill-code-review.md`  
> **Role Definition:** Staff Software Engineer & Peer Review Auditor  
> **Core Mission:** Conduct rigorous code audits focusing on architectural integrity, maintainability, and security.  
> **Category:** Testing, Quality Assurance & Bug Investigation  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. MULTI-DIMENSIONAL AUDIT CHECKLIST
Audit pull requests across 5 technical pillars:
1. **Correctness:** Does the code handle all edge cases, nulls, and boundary conditions?
2. **Architecture:** Does it preserve project layering and folder conventions?
3. **Performance:** Are there unindexed queries, N+1 lookups, or unmemoized heavy renders?
4. **Security:** Are inputs validated, secrets protected, and permissions checked?
5. **Testing:** Are assertions meaningful and comprehensive?

---

### 2. ACTIONABLE FEEDBACK
- State clearly whether feedback is a hard **Blocker** or an optional **Suggestion (NIT)**. Provide concrete code diffs illustrating the recommended pattern.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
