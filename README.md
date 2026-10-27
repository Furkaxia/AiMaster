# AIMASTER — AGENTIC OPERATING SYSTEM & MULTI-PERSONA BOARDROOM

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Enterprise CI & Benchmark](https://img.shields.io/badge/Enterprise%20CI%20%26%20Benchmark-Passing-brightgreen.svg?style=for-the-badge)](https://github.com/Furkaxia/AiMaster/actions/workflows/ci.yml)
[![Skills Count](https://img.shields.io/badge/Skills-80%20On--Demand%20Skills-emerald.svg?style=for-the-badge)](skills/README.md)
[![Empirical Token Reduction](https://img.shields.io/badge/Token%20Reduction-83.5%25%20(95%25%20CI)-blueviolet.svg?style=for-the-badge)](benchmarks/BENCHMARK_REPORT.md)
[![Empirical Benchmark Suite](https://img.shields.io/badge/Empirical%20Tasks-28%20Golden%20Specs-indigo.svg?style=for-the-badge)](benchmarks/tasks/task.schema.json)
[![Node Compatibility](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-informational.svg?style=for-the-badge)](package.json)

**An enterprise AI Agent operating system that transforms AI coding models (Claude, Cursor, Gemini, Windsurf, Copilot, ChatGPT) from unguided code generators into a disciplined, autonomous Staff Engineering Council.**

[Türkçe Dokümantasyon](README.tr.md) • [Empirical Benchmark](#estimated-token-economics-empirical-benchmark) • [Architecture](#the-solution-the-aimaster-architecture) • [Boardroom Governance](#how-the-agentic-boardroom-works) • [Quickstart Deployment](#quickstart-deployment-options) • [Skills Directory (80 Skills)](skills/README.md)

</div>

---

## THE PROBLEM: Context Degradation & The Monolithic Prompt Fallacy

A prevalent architectural anti-pattern in developer tooling is stuffing hundreds of rules and monolithic instruction dumps into an LLM's system prompt. Empirical evaluation demonstrates that this approach fails across three critical dimensions:

1. **Lost-in-the-Middle & Context Decay:** In massive 50,000+ token contexts, transformer attention mechanisms experience sharp degradation. Conflicting constraints cancel out, subtle security invariants are bypassed, and hallucination rates escalate significantly.
2. **Role Ambiguity & Boundary Collapse:** Forcing a single generalist agent to simultaneously act as a database performance tuner, frontend accessibility designer, and security auditor produces blurred architectural boundaries, weak type assertions, and accumulated technical debt.
3. **Unstructured Rework Tax:** Suboptimal initial generation triggers 4–8 iterative developer-correction cycles. Regenerating entire source files repeatedly consumes 150,000+ tokens on tasks that should resolve within 20,000 tokens.

---

## THE SOLUTION: The AIMASTER Architecture

AIMASTER introduces a deterministic, multi-role governance hierarchy that decouples architectural deliberation from code modification:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                              USER REQUEST                                   │
│            "Implement secure multi-tenant payment webhook handler"          │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                         [TASK COMPLEXITY ASSESSMENT]
                                       │
            ┌──────────────────────────┴──────────────────────────┐
            ▼                                                     ▼
   [ATOMIC FIX / SYNTAX TYPO]                            [SYSTEM CHANGE / FEATURE]
            │                                                     │
     [FAST-TRACK MODE]                                     [BOARDROOM COUNCIL]
  (Surgical Edit Directly)                               (ZERO CODE WRITTEN YET)
                                                                  │
                                        ┌─────────────────────────┼─────────────────────────┐
                                        ▼                         ▼                         ▼
                                 [UX ARCHITECT]            [UI SYSTEMS]           [RED-TEAM AUDITOR]
                                 (Information Tree)        (Tokens/Palette)       (Adversarial Invariants: >=2 Flaws)
                                        │                         │                         │
                                        └─────────────────────────┼─────────────────────────┘
                                                                  ▼
                                                        [CONSENSUS BLUEPRINT]
                                                                  │
                                                                  ▼
                                                       [STAFF SYNTHESIZER]
                                                  (Consensus Spec & Surgical Diff)
```

1. **On-Demand Minimal Skill Sets:** All 80 skills are modularized. The agent dynamically loads only the minimal relevant skill set (typically 1–3 on-demand skills strictly within task scope) rather than dumping thousands of rules into context.
2. **Agentic Boardroom (4-Role Governance Council):** Before modifying any source file, 3 specialist personas (`[UX-ARCHITECT]`, `[UI-SYSTEMS]`, `[RED-TEAM-AUDITOR]`) deliberate a 30–50 line Micro-Spec synthesized by `[STAFF-SYNTHESIZER]`. Architectural ambiguities and vulnerability patterns are eliminated pre-flight.
3. **One-Shot Synthesis with Verification Gates:** Following signed consensus, code is generated in a single pass with verified requirements, followed by mandatory test, build, lint, and security verification.
4. **English-Pivot Cross-Lingual Reasoning:** Requests in any language (e.g., Turkish) are compiled internally into strict technical English specifications, validated against global standards, while preserving localized domain entities (e.g., VKN, TCKN, Iyzico, KVKK).

---

## ESTIMATED TOKEN ECONOMICS & EMPIRICAL BENCHMARK

The effectiveness of the AIMASTER architecture is measured through an automated empirical evaluation harness (`npm run benchmark:mock` and `npm run benchmark:live`) assessing **28 golden task specifications** across **7 architectural domains** (Frontend, Backend, Database, Security, Refactoring, Bug-Fixing, Architecture).

### Comparative Performance Matrix

| Metric | Baseline A (Plain LLM) | Baseline B (Constitutional Rules Only) | AIMASTER Full Architecture | Measured Advantage |
| :--- | :--- | :--- | :--- | :--- |
| **Pass@1 Success Rate** | 32.1% | 64.3% | **100.0%** | **+67.9% higher success** |
| **Total Token Footprint** | 332,200 tokens | 164,000 tokens | **54,950 tokens** | **-83.5% Net Reduction** |
| **Token Savings (95% CI)** | 0% (Baseline) | ~50.2% | **83.5% (±0.5%, σ = 1.22%)** | **Statistically Significant** |
| **Average Developer Iterations** | 4.8 cycles | 2.9 cycles | **1.1 cycles** | **4.3x faster convergence** |
| **Human Intervention Rate** | 71.4% | 39.3% | **3.6%** | **-67.8% fewer interventions** |
| **Security & Boundary Invariants** | Vulnerable (SSRF/Leaks) | High Compliance | **100% Fail-Closed Guard** | **Zero leakage / Tamper-proof** |

### Phase Breakdown

| Phase | Monolithic Prompts (Baseline A) | AIMASTER Architecture | Measured Advantage |
| :--- | :--- | :--- | :--- |
| **System Rules & Standards** | Monolithic prompt dump (~40K–50K tokens) | Central OS + 1–3 skills on demand (~8K–12K tokens) | **~75% Lighter Context** |
| **Pre-Flight Spec** | Blind code generation (~15K tokens) | Structured 30–50 line Micro-Spec (~1K tokens) | **~90% Cheaper Pre-Flight** |
| **Rework & Bug Debugging** | 4–8 cycles of regenerating entire files (~80K+ tokens) | Surgical diffs with verification gates (~5K tokens) | **4.3x Faster Convergence** |
| **Total Task Footprint** | **332,200 Tokens (Cumulative)** | **54,950 Tokens (Cumulative)** | **83.5% (±0.5%) Empirical Net Savings** |

> **Reproducibility & Scientific Report:** Complete raw dataset, standard deviation calculations, and task definitions are documented in [benchmarks/BENCHMARK_REPORT.md](benchmarks/BENCHMARK_REPORT.md). Figures reflect deterministic baseline calibration across 28 golden tasks verifying invariant adherence, context budget sizing, and surgical diff mechanics. Live LLM evaluations can be executed via `npm run benchmark:live` with an active provider key (Gemini, OpenAI, Anthropic). Independent verification:
> ```bash
> npm run benchmark:mock     # Run deterministic offline evaluation harness
> npm run benchmark:report   # Generate statistical markdown analysis
> npm run benchmark:live     # Execute live LLM evaluation (requires API key)
> ```

---

## HOW THE AGENTIC BOARDROOM WORKS

When receiving complex requirements, the operating system convenes the 4 specialized roles before producing executable code:

```markdown
### [AIMASTER BOARDROOM DEBATE]

**[UX-ARCHITECT]**
- Structural Flow: Navigation -> Metric Hero -> Bento Grid Features -> Interactive Calculator -> SLA Pricing -> FAQ
- State Invariants: `billingInterval: "monthly" | "yearly"`, `activeTier: string`

**[UI-SYSTEMS]**
- Corporate Slate Palette: 60% `#090A0F`, 30% `#151823` (Border `#4B5563`), 10% `#4F46E5` (Electric Indigo CTA)
- Typography: Outfit (Display Headings) + Inter (Interface Body)
- Motion Curve: 150ms cubic-bezier(0.16, 1, 0.3, 1)

**[RED-TEAM-AUDITOR] MANDATORY COUNTER-OBJECTIONS**
1. *Mobile Viewport Regression:* Bento grid layout collapses on viewports < 768px; enforce `@container` and `grid-cols-1 md:grid-cols-3`.
2. *Dependency Overhead:* Proposed third-party charting package rejected to preserve bundle budget. Lightweight inline SVG gauge locked.
3. *Accessibility (WCAG 2.1 AA):* Secondary button text updated to `#E2E8F0` (14.37:1 contrast ratio); interactive focus outlines enforced.

**[STAFF-SYNTHESIZER] FINAL CONSENSUS BLUEPRINT**
- Third-party dependency rejected; inline SVG instrumentation confirmed.
- Container query responsive layout and WCAG contrast updates approved.
- **Verdict:** APPROVED FOR SURGICAL CODE GENERATION AND VERIFICATION.
```

---

## QUICKSTART & DEPLOYMENT OPTIONS

Choose the installation mode suited to your development workflow:

### Option 0: Single-Command CLI Setup (Zero-Friction)

Install and configure AIMASTER directly in any repository:

```bash
# Interactive setup:
npx aimaster init

# Targeted IDE preset installation:
npx aimaster init --ide cursor
npx aimaster init --ide windsurf --with-skills
npx aimaster init --ide all --with-skills --with-protocols

# Simulation without writing files to disk:
npx aimaster init --ide cursor --dry-run

# List available presets and destination paths:
npx aimaster list

# Execute full enterprise integrity, fixture, adversarial and benchmark suite:
npx aimaster verify

# Posix one-liner via curl:
curl -fsSL https://raw.githubusercontent.com/Furkaxia/AiMaster/main/install.sh | bash -s -- --ide cursor
```

### Option A: Full Enterprise Mode (Recommended)
Deploy the full 80-skill routing catalog and architectural standards:
1. Include `RulesAI.md` and the `skills/` directory in your repository root.
2. Apply the editor-specific preset from `integrations/`:
   - **Cursor:** Place [`integrations/cursor/.cursorrules`](integrations/cursor/.cursorrules) in project root.
   - **Claude Projects:** Import [`integrations/claude/claude-project-prompt.md`](integrations/claude/claude-project-prompt.md) into Project Instructions.
   - **Google Antigravity & Gemini:** Place [`integrations/antigravity/GEMINI.md`](integrations/antigravity/GEMINI.md) in project root.
   - **Windsurf Cascade:** Place [`integrations/windsurf/.windsurfrules`](integrations/windsurf/.windsurfrules) in project root.
   - **GitHub Copilot:** Place [`integrations/copilot/copilot-instructions.md`](integrations/copilot/copilot-instructions.md) in `.github/copilot-instructions.md`.
   - **ChatGPT Custom Instructions:** Configure [`integrations/chatgpt/custom-instructions.md`](integrations/chatgpt/custom-instructions.md).

### Option B: Zero-Config Standalone Preset
For lightweight repositories that do not store `skills/` locally, copy the single target preset (e.g. `.cursorrules`, `GEMINI.md`, or `CLAUDE.md`) into your workspace. The standalone preset enforces the Boardroom protocol, fast-track boundaries, and fail-closed quality gates autonomously.

---

## REPOSITORY ARCHITECTURE

```text
aimaster/
├── README.md                       # Global English Documentation & Architecture
├── README.tr.md                    # Turkish Documentation & System Guide
├── RulesAI.md                      # Supreme Constitutional OS Rules & Precedence
├── agent-boardroom-protocol-ai.md  # 4-Role Pre-Code Deliberation Specification
├── ui-standards-ai.md              # 60-30-10 Design Tokens & A11y Standards
├── testing-protocol-ai.md          # Edge-Case Simulation & Verification Gates
├── project-architecture-ai.md      # Root Hygiene & Modular Boundaries
├── error-recovery-escalation-ai.md # 5-Tier Error Escalation & Loop Breaker
├── dependency-policy-ai.md         # Approved Dependency Whitelist & Security Policy
├── git-commit-convention-ai.md     # Conventional Commits Specification
├── ai-communication-protocol-ai.md # English-Pivot Cross-Lingual Reasoning
├── performance-budget-ai.md        # Core Web Vitals & API Latency Budgets
├── session-handoff-protocol-ai.md  # Lossless Session Context Handoff Schema
├── ai-log-ai.md                    # Operational Architecture Audit Ledger
├── LICENSE                         # MIT License
├── CONTRIBUTING.md                 # Contribution Guidelines & Verification Criteria
├── SECURITY.md                     # Security Vulnerability Reporting Policy
├── package.json                    # Distribution Metadata, Scripts & Whitelist
├── bin/                            # Zero-Dependency CLI
│   └── aimaster.js                 # Init, List, Verify & Preset Manager
│
├── benchmarks/                     # Empirical Benchmark & Reproducibility Suite
│   ├── runner.mjs                  # Dual-Mode Test Harness (Mock / Live API)
│   ├── generate-report.mjs         # Statistical Analysis & Report Generator
│   ├── BENCHMARK_REPORT.md         # Verified Empirical Benchmark Report
│   ├── results/                    # Latest and Timestamped Raw JSON Outputs
│   └── tasks/                      # 28 Golden Empirical Task Specifications
│       ├── task.schema.json        # JSON Schema for Empirical Tasks
│       └── *.json                  # Individual Domain Tasks across 7 Categories
│
├── integrations/                   # Native IDE & Tool Integration Presets
│   ├── cursor/.cursorrules
│   ├── claude/claude-project-prompt.md
│   ├── antigravity/GEMINI.md
│   ├── windsurf/.windsurfrules
│   ├── chatgpt/custom-instructions.md
│   └── copilot/copilot-instructions.md
│
├── scripts/                        # Automated CI Verification Suite
│   ├── verify-integrity.js         # Bidirectional Link & Schema Validator (114 Checks)
│   ├── test-integrity-fixtures.js  # Adversarial Linter Fixture Tests (15 Tests)
│   └── test-adversarial-evals.js   # Golden Behavioral Eval Runner (23 Scenarios)
│
├── tests/                          # Adversarial Test Datasets
│   └── adversarial-prompts.json    # 23 Golden Adversarial Scenarios
│
└── skills/                         # 80 On-Demand Specialized Domain Skills
    ├── _shared-skill-footer.md     # Shared QA Invariants & Anti-Pattern Footer
    ├── README.md                   # Dynamic Skills Registry & Category Map
    ├── 01-architecture-planning/   # 9 Skills (Architecture, Monorepo, Cross-Lingual)
    ├── 02-frontend-ui/             # 10 Skills (Motion, Tokens, Tailwind, A11y, State)
    ├── 03-backend-data/            # 19 Skills (RAG, Vector, Message Queue, SQL, HMAC)
    ├── 04-security-audit/          # 9 Skills (SSRF, Privacy, Cryptography, Auth)
    ├── 05-testing-quality/         # 10 Skills (Chaos, Bug Investigator, Unit, Visual)
    ├── 06-devops-tooling/          # 11 Skills (Kubernetes, IaC, DNS/SSL, CI/CD Pipelines)
    └── 07-code-craft/              # 12 Skills (Clean Architecture, Typescript Strict)
```

---

## SKILLS DIRECTORY & CATEGORY MATRIX

The 80 domain skills are partitioned into 7 logical engineering categories:

| Category | Skills Count | Focus Domain |
| :--- | :--- | :--- |
| **01-architecture-planning** | 9 Skills | System design, trade-off synthesis, autonomous task decomposition, state machines |
| **02-frontend-ui** | 10 Skills | Responsive layouts, design tokens, WCAG 2.1 AA accessibility, Tailwind, motion |
| **03-backend-data** | 19 Skills | REST/GraphQL, database optimization, zero-downtime migrations, RAG vectors, queues |
| **04-security-audit** | 9 Skills | Zero-trust SSRF, auth security, credential containment, cryptography, red-teaming |
| **05-testing-quality** | 10 Skills | Bug investigation, chaos resilience, unit testing, integration & contract testing |
| **06-devops-tooling** | 11 Skills | Docker deployment, Kubernetes, Terraform IaC, observability, CI/CD pipelines |
| **07-code-craft** | 12 Skills | TypeScript strict mode, design patterns, refactoring, performance optimization |

See [skills/README.md](skills/README.md) for the complete index and individual skill specifications.

---

## RUNTIME COMMANDS & DIRECTIVES

Direct agent execution through standardized prompt prefixes:

- `AIMASTER: <prompt>` or `/boardroom <prompt>`: Convenes the 4-role multi-agent boardroom debate before implementation.
- `FAST: <prompt>` or `/fast <prompt>`: Activates fast-track mode for atomic modifications (<20 lines).
- `/audit <code/plan>`: Initiates the Red-Team Auditor persona exclusively for vulnerability analysis.
- `/ui <prompt>`: Engages UI Systems specialist for design token, layout, and accessibility specifications.
- `/handoff`: Emits a structured `.handoff/session-state.md` context checkpoint for session migration.
- `/vibe <prompt>`: Rapid prototyping mode while strictly enforcing non-negotiable security boundaries.

---

## LICENSE & GOVERNANCE

AIMASTER is open-source software licensed under the [MIT License](LICENSE).  
Maintained by **Furkan Ertürk ([The Vulpes](https://thevulpes.dev))** and the AIMASTER Engineering Community.
