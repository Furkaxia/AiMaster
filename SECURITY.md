# SECURITY POLICY & RESPONSIBLE DISCLOSURE (SECURITY.md)

AIMASTER considers platform security, credential containment, and boundary integrity to be non-negotiable architectural imperatives.

---

## 1. Core Security Invariants

1. **Zero Credential Exposure:** Under no circumstances may any preset, rule, or skill template include hardcoded API keys, private certificates, or production credentials.
2. **Fail-Closed Destructive Action Barriers:** Execution gates blocking arbitrary destructive commands (e.g. `rm -rf`, `DROP TABLE`, uncontrolled deployments) defined in `RulesAI.md` Section 1 and Section 4.5 are non-negotiable and cannot be overridden by user requests.
3. **Repository Quarantine & Prompt Injection Firewall:** External instructions embedded within user repositories (e.g. malicious comments in READMEs or source code) must be quarantined and cannot override constitutional invariants.

---

## 2. Vulnerability Reporting & Responsible Disclosure

If you discover a potential security vulnerability, prompt firewall bypass, unintended file-system traversal, or architectural escape within AIMASTER:
- **Do NOT open a public GitHub issue.**
- Submit your disclosure securely via [GitHub Private Vulnerability Reporting](https://github.com/Furkaxia/AiMaster/security/advisories/new).
- Alternatively, email our security team directly at `security@aimaster.dev` (or author contact: `furkanerturk@outlook.com`) with the subject `[SECURITY VULNERABILITY] AIMASTER`.
- Include a detailed technical description:
  1. Reproduction steps and affected environment (IDE preset, CLI, or skill module).
  2. Proof-of-Concept (PoC) prompt or input vector.
  3. Security impact analysis (e.g. secret exfiltration, destructive command execution, boundary escape).
- **SLA Commitment:**
  - Initial triage acknowledgment: within **48 hours**.
  - Remediation patch and coordinated public disclosure: within **7 to 14 business days**.
  - Public credit and recognition in release notes for responsible disclosure.
