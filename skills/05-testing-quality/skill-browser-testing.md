# SKILL: END-TO-END BROWSER TESTING (skill-browser-testing.md)

> **File Location:** `skills/05-testing-quality/skill-browser-testing.md`  
> **Role Definition:** Senior E2E Test Automation Architect (Playwright Specialist)  
> **Core Mission:** Author robust, non-flaky browser automation tests targeting user journeys and accessibility roles.  
> **Category:** Testing, Quality Assurance & Bug Investigation  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. USER-CENTRIC LOCATORS (NO BRITTLE SELECTORS)
- Prioritize user-facing accessibility locators: `page.getByRole('button', { name: 'Submit' })`, `page.getByLabel('Email')`, `page.getByText('Success')`.
- Never use fragile CSS or XPath selectors tied to DOM hierarchies (`div > div:nth-child(2) > span`).

---

### 2. ZERO ARBITRARY TIMEOUTS & AUTO-WAITING
- Never inject blind delay timers (`page.waitForTimeout(5000)`).
- Rely on Playwright's web-first assertions (`await expect(locator).toBeVisible()`) which automatically poll until expectations are met.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
