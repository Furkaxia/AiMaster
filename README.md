# ⚡ AIMASTER — AGENTIC OPERATING SYSTEM & MULTI-PERSONA BOARDROOM

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Architecture & Security Audit](https://img.shields.io/badge/Audit%20%26%20Integrity-Passing-brightgreen.svg?style=for-the-badge)](https://github.com/Furkaxia/AiMaster/actions/workflows/audit-integrity.yml)
[![Skills Count](https://img.shields.io/badge/Skills-80%20Specialized%20Skills-emerald.svg?style=for-the-badge)](skills/README.md)
[![Core Standards](https://img.shields.io/badge/Core%20Standards-10%20Bulletproof%20Rules-indigo.svg?style=for-the-badge)](RulesAI.md)
[![Token Efficiency](https://img.shields.io/badge/Token%20Savings-Up%20to%2085%25-orange.svg?style=for-the-badge)](#estimated-token-economics-efficiency)
[![Multi-Agent](https://img.shields.io/badge/Architecture-Agentic%20Boardroom-purple.svg?style=for-the-badge)](agent-boardroom-protocol-ai.md)

**An enterprise AI Agent operating system that transforms AI coding models (Claude, Cursor, Gemini, Windsurf, ChatGPT) from hallucinating spaghetti-code generators into an autonomous, Staff-Engineer-level engineering council.**

[🇹🇷 Türkçe Dokümantasyon](README.tr.md) • [Quickstart Options](#quickstart-deployment-options) • [How Boardroom Works](#how-the-agentic-boardroom-works) • [Skills Directory (80 Skills)](skills/README.md)

</div>

---

## 💥 THE PROBLEM: Why Loading 1000s of Skills Makes AI Dumber

A common misconception in the AI community: *"Just stuff 500 rules and thousands of skills into an AI's system prompt!"*  
**This fails catastrophically for three reasons:**

1. **Lost-in-the-Middle (Context Degradation):** In massive 50k+ token prompts, LLM attention degrades. Rules contradict each other, subtle edge cases are skipped, and hallucination explodes.
2. **Identity Crisis & Spaghetti Code:** An AI forced to be a database guru, CSS designer, and hacker simultaneously gets confused and produces bloated, average code.
3. **Token Bankruptcy (80% Rework Penalty):** A flawed first draft requires 4-8 cycles of user debugging. Re-generating thousands of lines of code repeatedly burns 150,000+ tokens on a simple task.

---

## 🛡️ THE SOLUTION: The AIMASTER Architecture

AIMASTER solves this with two foundational pillars:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                              USER REQUEST                                   │
│                        "Build me a modern SaaS"                             │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                         [TASK COMPLEXITY ASSESSMENT]
                                       │
            ┌──────────────────────────┴──────────────────────────┐
            ▼                                                     ▼
   [SIMPLE / SYNTAX-TYPO]                                [COMPLEX / NEW SYSTEM]
            │                                                     │
     [FAST-TRACK MODE]                                     [BOARDROOM COUNCIL]
  (Surgical Edit Directly)                               (NO CODE WRITTEN YET)
                                                                  │
                                        ┌─────────────────────────┼─────────────────────────┐
                                        ▼                         ▼                         ▼
                                 [UX ARCHITECT]            [UI SYSTEMS]           [RED-TEAM AUDITOR]
                                 (Information Tree)        (Tokens/Palette)       (Adversarial Audit: >=2 Flaws IF Material)
                                        │                         │                         │
                                        └─────────────────────────┼─────────────────────────┘
                                                                  ▼
                                                        [CONSENSUS BLUEPRINT]
                                                                  │
                                                                  ▼
                                                       [STAFF SYNTHESIZER]
                                                  (Consensus Spec & Surgical Diff)
```

1. **On-Demand Minimal Skill Sets:** All 80 skills are modularized. The agent dynamically loads only the minimal relevant skill set (typically 1-3 on-demand skills strictly within task scope) rather than dumping thousands of rules into context.
2. **Agentic Boardroom (4-Role Council):** Before touching code, 3 specialist personas ([UX-ARCHITECT], [UI-SYSTEMS], [RED-TEAM-AUDITOR]) debate a 30–50 line Micro-Spec synthesized by [STAFF-SYNTHESIZER]. Bad design decisions and material vulnerabilities are eliminated before burning code tokens.
3. **One-Shot Synthesis with Verification Gates:** Once consensus is signed, code is generated in a single pass with verified requirements and surgical micro-diffs, followed by mandatory test, build, lint, and security verification.
4. **English-Pivot Cross-Lingual Reasoning:** No matter what language the user speaks in (e.g., Turkish), the model deconstructs the request into rigorous technical English internally, enforces strict engineering standards, preserves local domain entities (e.g., VKN, TCKN, Iyzico), and delivers back in the user's native tongue.

---

## 📊 ESTIMATED TOKEN ECONOMICS & EFFICIENCY

| Phase | Monolithic Prompts | AIMASTER Architecture | Advantage |
| :--- | :--- | :--- | :--- |
| **System Rules & Standards** | Monolithic prompt dump (~40K–50K tokens) | Central OS + 1–3 skills on demand (~8K–12K tokens) | **~75% Lighter** |
| **Pre-Flight Spec** | Blind code generation (~15K tokens) | Structured 30–50 line Micro-Spec (~1K tokens) | **~90% Cheaper** |
| **Rework & Bug Debugging** | 4–8 cycles of regenerating entire files (~80K+ tokens) | Surgical diffs with verification gates (~5K tokens) | **Drastically Reduced** |
| **Total Task Footprint** | **~135,000 – 165,000 Tokens** | **~15,000 – 20,000 Tokens** | **🔥 Up to 85% Net Savings** |

> *Methodology Note:* Figures reflect modeled comparative token projections based on standard byte-to-token ratios between monolithic prompt dumps and dynamic on-demand skill loading. AIMASTER operates as a prompt-level constitutional instruction framework. Actual savings vary depending on codebase scale, file count, task complexity, and whether the underlying LLM provider leverages prompt caching. These are internal architectural estimates rather than an externally audited empirical benchmark dataset. It aims to reduce context loss and reprocessing costs; actual savings depend on the task and model, and it does not guarantee zero information loss.

---

## 🏛️ HOW THE AGENTIC BOARDROOM WORKS

When receiving a complex instruction, the system convenes the 4 specialized roles before producing a single line of code:

> 💡 **Illustrative Example:** The debate below shows a sample deliberation for an interactive SaaS landing page. Personas must always dynamically derive findings from actual codebase inspection — never copy example findings verbatim.

```markdown
### 🏛️ [AIMASTER BOARDROOM DEBATE]

**[UX-ARCHITECT]**
- Section Flow: Hero -> Social Proof -> Bento Grid Features -> Interactive Calculator -> Pricing -> FAQ
- State Requirements: `billingInterval: "monthly" | "yearly"`, `activeTier: string`

**[UI-SYSTEMS]**
- Corporate Slate Palette: 60% `#090A0F`, 30% `#151823` (Border `#4B5563`), 10% `#4F46E5` (Electric Indigo CTA)
- Typography: Outfit (Display) + Inter (Body)
- Transitions: 150ms cubic-bezier ease-out

**[RED-TEAM-AUDITOR] ⚠️ MANDATORY COUNTER-OBJECTIONS (Anti-Rubber-Stamping)**
1. *Mobile UX Flaw:* The Bento grid will cramp on viewports < 768px; must enforce `grid-cols-1 md:grid-cols-3`.
2. *Package Bloat:* UI proposed an external charting library for the calculator; banned to prevent bundle bloat. Pure SVG gauge required.
3. *Accessibility (A11y):* Secondary button text on `#151823` adjusted to `#E2E8F0` (14.37:1 WCAG AAA), border upgraded to `#4B5563` (3.2:1 WCAG 1.4.11 UI component contrast).

**[STAFF-SYNTHESIZER] 🎯 FINAL CONSENSUS BLUEPRINT**
- External charting library discarded (Pure SVG Gauge locked).
- Mobile responsive grid and A11y contrast updates approved.
- **Status:** APPROVED FOR SURGICAL CODE GENERATION & VERIFICATION.
```

---

## ⚡ QUICKSTART & DEPLOYMENT OPTIONS

Choose the installation mode that best fits your workflow:

### Option 0: Single-Command CLI Setup (Zero-Friction)
Install AIMASTER directly into any repository in seconds:

```bash
# Interactive setup (prompts for IDE):
npx aimaster init

# Or install for a specific IDE:
npx aimaster init --ide cursor
npx aimaster init --ide windsurf --with-skills

# Unix one-liner via curl:
curl -fsSL https://raw.githubusercontent.com/Furkaxia/AiMaster/main/install.sh | bash -s -- --ide cursor
```

### Option A: Full Framework Mode (Recommended)
Unlock the full 80-skill routing catalog and architectural standards in your codebase:
1. Copy or submodule `RulesAI.md` and the `skills/` directory into your project root.
2. Add your tool-specific preset from `integrations/`:
   - **Cursor:** Copy [`integrations/cursor/.cursorrules`](integrations/cursor/.cursorrules) to project root.
   - **Claude Projects:** Paste [`integrations/claude/claude-project-prompt.md`](integrations/claude/claude-project-prompt.md) into Project Instructions.
   - **Google Antigravity & Gemini CLI:** Place [`integrations/antigravity/GEMINI.md`](integrations/antigravity/GEMINI.md) in project root.
   - **Windsurf:** Copy [`integrations/windsurf/.windsurfrules`](integrations/windsurf/.windsurfrules) to project root.
   - **GitHub Copilot:** Copy [`integrations/copilot/copilot-instructions.md`](integrations/copilot/copilot-instructions.md) to `.github/copilot-instructions.md`.
   - **ChatGPT:** Paste [`integrations/chatgpt/custom-instructions.md`](integrations/chatgpt/custom-instructions.md) into Custom Instructions.

### Option B: Zero-Config Standalone Preset
If you do not want `skills/` stored inside your local repository, simply copy the single preset file matching your editor (e.g. `integrations/cursor/.cursorrules`, `integrations/antigravity/GEMINI.md`, or `integrations/claude/claude-project-prompt.md`) directly into your project. The preset acts as an autonomous Staff Engineer guardrail with built-in Boardroom protocol, Fast-Track rules, and quality gates, consulting central standards remotely when needed.

---

## 📂 REPOSITORY ARCHITECTURE

```text
aimaster/
├── README.md                       # 🌍 GLOBAL ENGLISH DOCUMENTATION & MANIFESTO
├── README.tr.md                    # 🇹🇷 TÜRKÇE DETAYLI REHBER & DOKÜMANTASYON
├── RulesAI.md                      # 🏛️ CONSTITUTIONAL OS RULES (Priority & Lifecycle)
├── agent-boardroom-protocol-ai.md  # 👥 [CORE 1] 4-Role Non-Coding Debate Protocol
├── ui-standards-ai.md              # 🎨 [CORE 2] 60-30-10 Palette Rule & Typography
├── testing-protocol-ai.md          # 🧪 [CORE 3] Edge-Case Simulation & Division-by-Zero Safety
├── project-architecture-ai.md      # 🏗️ [CORE 4] Root Directory Hygiene & Strict src/ Tree
├── error-recovery-escalation-ai.md # 🚨 [CORE 5] 5-Tier Error Escalation & Loop Breaker
├── dependency-policy-ai.md         # 📦 [CORE 6] Approved Dependency Whitelist & CVE Policy
├── git-commit-convention-ai.md     # 🌿 [CORE 7] Atomic Conventional Commits
├── ai-communication-protocol-ai.md # 🌐 [CORE 8] Language Mirroring & English-Pivot Reasoning
├── performance-budget-ai.md        # ⚡ [CORE 9] Core Web Vitals, Bundle Size & API Budgets
├── session-handoff-protocol-ai.md  # 🔄 [CORE 10] Context Checkpoint & New Chat Handoff
├── ai-log-ai.md                    # 📜 Operational Audit & Decision Log
├── LICENSE                         # ⚖️ MIT License
├── CONTRIBUTING.md                 # 🤝 Community Contribution Guide
├── SECURITY.md                     # 🛡️ Security Vulnerability Reporting Policy
├── package.json                    # 📦 NPM Test & Project Metadata
│
├── integrations/                   # 🚀 Plug-and-Play Presets for Top AI Tools
│   ├── cursor/.cursorrules
│   ├── claude/claude-project-prompt.md
│   ├── antigravity/GEMINI.md
│   ├── windsurf/.windsurfrules
│   ├── chatgpt/custom-instructions.md
│   └── copilot/copilot-instructions.md
│
├── scripts/                        # 🛠️ Zero-Dependency CI & Integrity Verification
│   └── verify-integrity.js         # Automated Link, Leak & File Integrity Checker
│
└── skills/                         # 🧠 80 On-Demand Specialized Skills (7 Categories)
    ├── _shared-skill-footer.md     # Shared Token-Saving QA & Constraint Footer
    ├── README.md                   # Dynamic Skills Registry & Routing Map
    ├── 01-architecture-planning/   # 9 Skills (Architecture, Monorepo, Cross-Lingual, etc.)
    ├── 02-frontend-ui/             # 10 Skills (Motion, Tokens, Charts, Tailwind, A11y, etc.)
    ├── 03-backend-data/            # 19 Skills (RAG & Vector, Message Queues, Payments, SQL)
    ├── 04-security-audit/          # 9 Skills (GDPR/KVKK, Cryptography, Red-Team, Auth, etc.)
    ├── 05-testing-quality/         # 10 Skills (Chaos, Snapshot, Visual Regression, etc.)
    ├── 06-devops-tooling/          # 11 Skills (Kubernetes, IaC Terraform, DNS/SSL, CI/CD, etc.)
    └── 07-code-craft/              # 12 Skills (Design Patterns GoF/SOLID, i18n, Anti-Any, etc.)
```

---

## 🎯 TRIGGER COMMANDS

You can guide the agent's behavior at any time using trigger prefixes:

- `AIMASTER: <prompt>` or `/boardroom <prompt>` ➔ Forces the full multi-agent boardroom debate.
- `FAST: <prompt>` or `/fast <prompt>` ➔ Bypasses boardroom for atomic bug-fixes (<20 lines).
- `/audit <code/plan>` ➔ Triggers the Red-Team Auditor exclusively for vulnerability analysis.
- `/ui <prompt>` ➔ Triggers the UI Systems crafter for 60-30-10 palette and typography breakdown.
- `/handoff` ➔ Generates `.handoff/session-state.md` checkpoint to transfer context cleanly into a fresh chat.

---

## 📜 LICENSE & AUTHOR

Released under the **MIT License**.  
Crafted with precision by **Furkan Ertürk ([The Vulpes](https://thevulpes.dev))** & The AIMASTER Community.
