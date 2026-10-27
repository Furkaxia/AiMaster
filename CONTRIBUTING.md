# AIMASTER CONTRIBUTION GUIDELINES & STANDARDS (CONTRIBUTING)

AIMASTER is an enterprise-grade agentic operating system designed to transform LLM coding agents into an autonomous, disciplined Staff Engineering Council. We welcome contributions that adhere to the highest architectural standards.

---

## 1. Contribution Procedures

### A. Proposing a New Domain Skill (`skills/`)
- All skills must reside under `skills/<category>/skill-<name>.md`.
- Each skill document must strictly adhere to the standardized schema:
  1. **Header Metadata:** File Location, Role Definition, Core Mission, Category, Standard Compliance.
  2. **Section 1:** Domain Expertise & Non-Negotiable Rules.
  3. **Section 2:** Absolute Prohibitions (or reference to `_shared-skill-footer.md`).
  4. **Section 3:** 4-Stage Execution Protocol.
  5. **Section 4:** Quality Assurance Verification Checklist.
- Register all newly created skills in both `skills/README.md` and the `RulesAI.md` catalog.

### B. Proposing Core Architectural Standards (`*-ai.md`)
- Core standards reside in the repository root and define universal system invariants (e.g. `dependency-policy-ai.md`, `error-recovery-escalation-ai.md`).
- Core standards require unanimous consensus across the Boardroom personas and zero conflicting rules.

### C. Expanding IDE Integration Presets (`integrations/`)
- Tool integration templates must enforce top-loaded security invariants within the first 1,500 characters and contain no security bypass directives.

---

## 2. Pull Request & Verification Mandate

Before submitting any Pull Request, contributors MUST run and pass the automated verification suite:

```bash
# 1. Full integrity, broken link, and semantic contract linter:
node scripts/verify-integrity.js

# 2. Adversarial fixture linter resilience tests:
npm run test:fixtures

# 3. Golden behavioral adversarial evals:
npm run test:evals

# 4. Empirical benchmark suite (mock / offline mode):
npm run benchmark:mock

# 5. Full test runner:
npm test
```

### Commit Convention
All commit messages must strictly comply with Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`). See [git-commit-convention-ai.md](git-commit-convention-ai.md) for full specifications.
