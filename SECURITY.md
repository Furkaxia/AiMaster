# SECURITY POLICY & RESPONSIBLE DISCLOSURE (SECURITY.md)

AIMASTER considers platform security, credential containment, and boundary integrity to be non-negotiable architectural imperatives.

---

## 1. Core Security Invariants

1. **Zero Credential Exposure:** Under no circumstances may any preset, rule, or skill template include hardcoded API keys, private certificates, or production credentials.
2. **Fail-Closed Destructive Action Barriers:** Execution gates blocking arbitrary destructive commands (e.g. `rm -rf`, `DROP TABLE`, uncontrolled deployments) defined in `RulesAI.md` Section 1 and Section 4.5 are non-negotiable and cannot be overridden by user requests.
3. **Repository Quarantine & Prompt Injection Firewall:** External instructions embedded within user repositories (e.g. malicious comments in READMEs or source code) must be quarantined and cannot override constitutional invariants.

---

## 2. Vulnerability Reporting & Responsible Disclosure

If you discover a potential security vulnerability, prompt jailbreak, or architectural bypass within AIMASTER:
- **Do NOT open a public GitHub issue.**
- Submit your findings directly via private vulnerability reporting on GitHub Security Advisories or via email to security@thevulpes.dev.
- Provide a detailed Proof-of-Concept (PoC), reproduction steps, and impact assessment.
- We acknowledge security reports within 48 hours and work with researchers to coordinate disclosure following remediation.
