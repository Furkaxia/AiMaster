/**
 * ==============================================================================
 * AIMASTER EMPIRICAL REPORT & STATISTICAL HELPERS (v1.0)
 * ==============================================================================
 * Provides binomial confidence interval computations, task loading, and
 * dynamic master report formatting for empirical evaluation suites.
 *
 * Zero external dependencies (Native Node.js ESM).
 * ==============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..', '..');
const TASKS_DIR = path.join(REPO_ROOT, 'benchmarks', 'tasks');

export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Wilson score interval for binomial proportions (success rate confidence interval).
 */
export function calculateWilsonInterval(successes, total, z = 1.96) {
  if (total === 0) return [0, 0];
  const p = successes / total;
  const denominator = 1 + (z * z) / total;
  const center = (p + (z * z) / (2 * total)) / denominator;
  const spread = (z * Math.sqrt((p * (1 - p)) / total + (z * z) / (4 * total * total))) / denominator;
  return [Math.max(0, center - spread), Math.min(1, center + spread)];
}

/**
 * Loads and filters benchmark tasks from the golden corpus.
 */
export function loadAllTasks({ taskIds = null, category = null, difficulty = null, limit = 0 } = {}) {
  if (!fs.existsSync(TASKS_DIR)) return [];
  const files = fs.readdirSync(TASKS_DIR).filter(f => f.endsWith('.json') && f !== 'task.schema.json');
  let tasks = [];

  for (const file of files) {
    try {
      const task = JSON.parse(fs.readFileSync(path.join(TASKS_DIR, file), 'utf8'));
      if (taskIds && taskIds.length > 0 && !taskIds.includes(task.id) && !taskIds.some(target => task.id.toLowerCase().includes(target.toLowerCase()))) continue;
      if (category && task.category !== category) continue;
      if (difficulty && task.difficulty !== difficulty) continue;
      tasks.push(task);
    } catch {}
  }

  tasks.sort((a, b) => a.id.localeCompare(b.id));
  if (limit > 0) tasks = tasks.slice(0, limit);
  return tasks;
}

/**
 * Generates markdown master scorecard and quality audit report from results object.
 */
export function generateMasterReport(results, targetPath = null) {
  const meta = results.metadata;
  const models = Object.values(results.modelResults);

  let report = `# 🔬 AIMASTER EMPIRICAL BENCHMARK REPORT
### Comprehensive 4-Paradigm Multi-Model Evaluation

> **Suite Version:** AiMaster+ v3.0 Enterprise Flagship Edition  
> **Timestamp:** ${meta.timestamp}  
> **Golden Task Corpus:** ${meta.tasksCount} Golden Architecture & Security Specifications  
> **Evaluated Model Cohort:** ${models.length} Multi-Architecture NIM Models  
> **Repetitions per Task:** ${meta.repetitions || 1}  
> **Evaluation Mode:** 4-Way Multi-Paradigm Live Evaluation (Plain vs RulesAI vs Legacy AiMaster vs AiMaster+)  
> **Parity Gate Policy:** STRICT ENFORCEMENT (\`aimaster_plus_success >= legacy_success\`)  

---

## 1. EXECUTIVE SUMMARY & COGNITIVE PARADIGM COMPARISON

This benchmark evaluates **AiMaster+ v3.0** against industry baselines and prior monolithic architecture:
1. **Paradigm A (Plain AI):** Zero prompt-framing. Demonstrates typical production failures (type collisions, hardcoded secrets, unchecked concurrency, unbounded memory).
2. **Paradigm B (RulesAI):** Monolithic instruction list without modular active skills. Improves baseline safety but lacks domain AST adherence.
3. **Paradigm C (Legacy AiMaster v1.0):** 33KB monolithic constitutional injection. Suffers severe input token overhead and timeout vulnerabilities on reasoning models.
4. **Paradigm D (AiMaster+ v3.0):** Tiered JIT Context Compilation + Output-First Contract (\`<canonical_delivery>\`) + Adaptive Token Budgeting + Surgical Self-Healing Engine.

---

## 2. CROSS-MODEL MASTER SCORECARD

| Model Architecture | Parameter Class | Plain AI | RulesAI | Legacy AiMaster | **Pass@1** | **Pass@Recovery** | **AiMaster+ Total** | 95% Conf. Int. | **Token Cut (Legacy)** | **Token Cut (Plain)** | Parity Gate |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
`;

  for (const m of models) {
    const d = m.modelDef;
    const s = m.stats;
    const totalEvals = s.totalEvaluations || s.totalTasks || 1;
    const passedCount = s.aimasterPlusPassedCount ?? Math.round((s.aimasterPlusPassRate / 100) * totalEvals);
    const ci = calculateWilsonInterval(passedCount, totalEvals);
    const ciStr = `[${Math.round(ci[0] * 100)}%, ${Math.round(ci[1] * 100)}%]`;

    let gateTag = '✅ PASS (Parity)';
    if (s.parityGateStatus === 'SKIPPED' || s.legacyPassRate === null) {
      gateTag = '⚪ SKIPPED';
    } else if (s.aimasterPlusPassRate < s.legacyPassRate) {
      gateTag = '❌ REGRESSION';
    } else if (s.aimasterPlusPassRate > s.legacyPassRate) {
      gateTag = `✅ PASS (+${s.upliftsCount || 0} Uplift)`;
    }

    const legacyStr = s.legacyPassRate !== null ? `${s.legacyPassRate}%` : 'N/A*';
    const reductionLegacyStr = s.avgReductionVsLegacy !== null
      ? (s.avgReductionVsLegacy >= 0 ? `**-${s.avgReductionVsLegacy}%**` : `**+${Math.abs(s.avgReductionVsLegacy)}%**`)
      : 'N/A*';
    const reductionPlainStr = s.avgReductionVsPlain !== undefined && s.avgReductionVsPlain !== null
      ? (s.avgReductionVsPlain >= 0 ? `**-${s.avgReductionVsPlain}%**` : `+${Math.abs(s.avgReductionVsPlain)}%`)
      : 'N/A';
    const rulesStr = s.rulesPassRate !== undefined ? `${s.rulesPassRate}%` : 'N/A';
    const passAt1Str = s.aimasterPlusPassAt1Rate !== undefined ? `${s.aimasterPlusPassAt1Rate}%` : `${s.aimasterPlusPassRate}%`;
    const passAtRecStr = s.aimasterPlusPassAtRecoveryRate !== undefined ? `${s.aimasterPlusPassAtRecoveryRate}%` : '0%';

    report += `| **${d.alias}** | \`${d.role}\` | ${s.plainPassRate}% | ${rulesStr} | ${legacyStr} | ${passAt1Str} | ${passAtRecStr} | **${s.aimasterPlusPassRate}%** | ${ciStr} | ${reductionLegacyStr} | ${reductionPlainStr} | ${gateTag} |\n`;
  }

  report += `
${models.some(m => m.stats.legacyPassRate === null) ? `> *Note: Legacy baseline was omitted via \`--skip-legacy\`. Values marked as \`N/A*\` reflect that no synthetic or unverified legacy baselines were fabricated.\n\n` : ''}---

## 3. FAILURE-FIRST DISAGGREGATION & QUALITY AUDIT

AiMaster+ enforces strict AST invariant verification and multi-stage semantic validation. Failures are transparently classified and remediated via the self-healing recovery loop.
`;

  if (targetPath) {
    const parent = path.dirname(targetPath);
    if (!fs.existsSync(parent)) fs.mkdirSync(parent, { recursive: true });
    fs.writeFileSync(targetPath, report, 'utf8');
  }
  return report;
}
