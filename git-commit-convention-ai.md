# GIT COMMIT & BRANCH CONVENTION (git-commit-convention-ai.md)

> **File Location:** `git-commit-convention-ai.md`  
> **Role Definition:** Staff Version Control & Release Engineering Architect  
> **Core Mission:** Enforce consistent, machine-readable, changelog-ready commit messages and disciplined branching workflows.  
> **Standard Compliance:** RulesAI.md Constitutional Git Standard

---

## 1. COMMIT MESSAGE SCHEMA (CONVENTIONAL COMMITS)

Every commit message MUST adhere strictly to the following structure:

```text
<type>(<scope>): <short summary>

[optional body]

[optional footer]
```

### Commit Types

| Type | Use Case | Canonical Example |
| :--- | :--- | :--- |
| `feat` | New end-user or API capability | `feat(auth): add JWT refresh token rotation` |
| `fix` | Bug or defect resolution | `fix(catalog): correct price rounding for decimals` |
| `refactor` | Code restructuring with zero behavior change | `refactor(api): extract validation to middleware` |
| `style` | Formatting, whitespace, semicolon fixes (no runtime change) | `style(components): fix indentation and trailing commas` |
| `docs` | Documentation and Markdown updates | `docs(readme): update installation instructions` |
| `test` | Adding or refactoring automated tests | `test(cart): add edge case for zero quantity` |
| `chore` | Build tooling, dependencies, config updates | `chore(deps): upgrade prisma to v6.2` |
| `perf` | Measurable performance optimization | `perf(query): add index on orders.created_at` |
| `ci` | CI/CD pipeline and workflow updates | `ci(github): add playwright e2e to workflow` |
| `revert` | Reverting a prior commit | `revert: feat(auth): add social login` |

### Scope Directives
- Identifies the localized component or module: `auth`, `catalog`, `ui`, `api`, `db`, `config`.
- May be omitted for whole-repo alterations: `chore: update eslint config`.
- Lowercase only, without hyphenation or spaces.

### Short Summary Directives
- Starts with a lowercase letter; ends without a period.
- Uses imperative present tense: `add`, `fix`, `remove`, `update` (never ~~added~~, ~~fixed~~, ~~updating~~).
- Maximum **72 characters**.
- Language: **English**.

---

## 2. BREAKING CHANGE NOTIFICATIONS

For changes modifying API contracts, database schemas, or breaking user interfaces:

```text
feat(api)!: change authentication from session to JWT

BREAKING CHANGE: All API endpoints now require Bearer token 
in Authorization header. Session-based auth is removed.
```

- Append `!` between type and scope.
- Include a detailed `BREAKING CHANGE:` footer explaining the migration requirement.

---

## 3. BRANCH NAMING STANDARDS

```text
<type>/<short-description>
```

| Branch Archetype | Format | Canonical Example |
| :--- | :--- | :--- |
| New Feature | `feature/<description>` | `feature/user-dashboard` |
| Bug Fix | `fix/<description>` | `fix/cart-total-calculation` |
| Hotfix | `hotfix/<description>` | `hotfix/payment-timeout` |
| Tooling / Chore | `chore/<description>` | `chore/upgrade-node-22` |
| Experimental | `experiment/<description>` | `experiment/new-cache-strategy` |

### Branch Management Rules
- Lowercase alphanumeric characters, hyphen-separated (`-`).
- Primary branches: `main` (production), `develop` (staging).
- Feature branches branch from and merge into `develop`.
- Hotfix branches branch from `main` and merge into both `main` and `develop`.

---

## 4. ATOMIC COMMIT PRINCIPLES

- **Single Commit = Single Logical Delta:** Never bundle a new feature, bug fix, and refactoring within a single commit.
- **Build Integrity:** Every commit in the history must compile and pass tests independently. Broken intermediate commits are forbidden.
- **Prohibition of Work-In-Progress Commits:** Messages like `WIP`, `temp commit`, or `saving progress` are strictly prohibited.

### Commit Sizing Guidelines
```text
IDEAL    : 1–5 files, unified thematic delta
ACCEPTABLE: 5–10 files, tightly coupled changes
DECOUPLE : 10+ files → Split into multiple logical, atomic commits
```

---

## 5. STRICT GIT PROHIBITIONS

- ❌ Never list modified files in the commit message (the git diff already conveys this).
- ❌ Never run uninspected `git add .` indiscriminately.
- ❌ Never commit `.env`, secret credentials, `node_modules`, `dist/`, or `.next/`.
- ❌ Never force-push (`git push -f`) unless explicitly requested by the user.
- ❌ Never combine unrelated multi-module edits into a single commit.

---

## 6. VERIFICATION & QA CHECKLIST

- [ ] Does the commit message strictly follow Conventional Commits?
- [ ] Is the short summary 72 characters or less?
- [ ] Are breaking changes signaled with `!` and a `BREAKING CHANGE:` footer?
- [ ] Is the commit atomic and self-contained?
- [ ] Are secrets, environment files, and build artifacts excluded?
- [ ] Does the branch name adhere to standard archetypes?
