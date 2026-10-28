/**
 * ==============================================================================
 * AIMASTER EMPIRICAL BENCHMARK ENGINE UNIT TESTS
 * ==============================================================================
 * Validates statistical computations, CLI argument parsing, cohort guards,
 * dynamic report generation, and token accounting fallback mechanisms.
 *
 * Rules:
 * - 100% Zero external dependencies (pure Node.js ESM).
 * - Exits with 0 on full pass, non-zero on failure.
 * ==============================================================================
 */

import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  calculateWilsonInterval,
  loadAllTasks,
  generateMasterReport
} from '../benchmarks/lib/report-helpers.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

let passedTests = 0;
let totalTests = 0;

function test(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✔ [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✖ [FAIL] ${name}`);
    console.error(`    ${err.message}`);
    throw err;
  }
}

console.log(`\n======================================================`);
console.log(`🧪 AIMASTER BENCHMARK ENGINE TEST SUITE`);
console.log(`======================================================\n`);

// -----------------------------------------------------------------------------
// 1. Wilson Score Confidence Interval
// -----------------------------------------------------------------------------
test('Wilson score interval: handles 0 total without NaN or crash', () => {
  const [lower, upper] = calculateWilsonInterval(0, 0);
  assert.strictEqual(lower, 0);
  assert.strictEqual(upper, 0);
});

test('Wilson score interval: computes valid 95% bounds for 100% success', () => {
  const [lower, upper] = calculateWilsonInterval(10, 10);
  assert(lower > 0.65 && lower < 0.75, `Expected lower bound ~0.72, got ${lower}`);
  assert.strictEqual(upper, 1.0);
});

test('Wilson score interval: computes valid 95% bounds for 0% success', () => {
  const [lower, upper] = calculateWilsonInterval(0, 10);
  assert.strictEqual(lower, 0.0);
  assert(upper > 0.25 && upper < 0.35, `Expected upper bound ~0.28, got ${upper}`);
});

test('Wilson score interval: computes centered bounds for 50% proportion', () => {
  const [lower, upper] = calculateWilsonInterval(50, 100);
  assert(lower > 0.39 && lower < 0.42, `Lower bound should be ~0.404, got ${lower}`);
  assert(upper > 0.58 && upper < 0.61, `Upper bound should be ~0.596, got ${upper}`);
});

// -----------------------------------------------------------------------------
// 2. Task Corpus & Filtering
// -----------------------------------------------------------------------------
test('loadAllTasks: loads golden tasks and sorts by ID', () => {
  const allTasks = loadAllTasks();
  assert(allTasks.length >= 50, `Expected at least 50 tasks, found ${allTasks.length}`);
  for (let i = 1; i < allTasks.length; i++) {
    assert(allTasks[i - 1].id.localeCompare(allTasks[i].id) <= 0, 'Tasks must be sorted alphabetically by ID');
  }
});

test('loadAllTasks: filters correctly by category', () => {
  const secTasks = loadAllTasks({ category: 'security' });
  assert(secTasks.length > 0, 'Should find security tasks');
  assert(secTasks.every(t => t.category === 'security'), 'All returned tasks must match security category');
});

test('loadAllTasks: supports partial substring matching for task IDs', () => {
  const refTasks = loadAllTasks({ taskIds: ['ref-003'] });
  assert.strictEqual(refTasks.length, 1);
  assert(refTasks[0].id.includes('ref-003'));
});

// -----------------------------------------------------------------------------
// 3. Dynamic Master Report Generation
// -----------------------------------------------------------------------------
test('generateMasterReport: uses dynamic RulesAI pass rate and calculates 95% CI', () => {
  const testResults = {
    metadata: {
      timestamp: '2026-10-28T12:00:00.000Z',
      tasksCount: 10,
      modelsCount: 1,
      repetitions: 1
    },
    modelResults: {
      'test-model': {
        modelDef: { alias: 'Test-Model', role: 'Test Architecture' },
        stats: {
          totalTasks: 10,
          totalEvaluations: 10,
          plainPassRate: 20,
          rulesPassRate: 60, // Not 40%!
          legacyPassRate: 50,
          aimasterPlusPassRate: 100,
          aimasterPlusPassedCount: 10,
          avgReductionVsLegacy: 78.5,
          upliftsCount: 5,
          parityGateStatus: 'UPLIFT'
        }
      }
    }
  };

  const reportContent = generateMasterReport(testResults);

  // Verify dynamic rate (not hardcoded 40%)
  assert(reportContent.includes('| 60% |'), 'RulesAI rate must be dynamic 60%, not hardcoded 40%');
  // Verify Wilson Score CI
  assert(reportContent.includes('95% Conf. Int.'), 'Report must include 95% Conf. Int. column header');
  // Verify Parity Uplift tag
  assert(reportContent.includes('✅ PASS (+5 Uplift)'), 'Report must indicate parity uplift');
});

test('generateMasterReport: handles --skip-legacy gracefully with N/A* and notice', () => {
  const testResultsSkipped = {
    metadata: {
      timestamp: '2026-10-28T12:00:00.000Z',
      tasksCount: 5,
      modelsCount: 1,
      repetitions: 2
    },
    modelResults: {
      'test-model': {
        modelDef: { alias: 'Test-Model-Skipped', role: 'Fast Runner' },
        stats: {
          totalTasks: 5,
          repetitions: 2,
          totalEvaluations: 10,
          plainPassRate: 30,
          rulesPassRate: 50,
          legacyPassRate: null, // Skipped!
          aimasterPlusPassRate: 90,
          aimasterPlusPassedCount: 9,
          avgReductionVsLegacy: null, // Skipped!
          upliftsCount: 0,
          parityGateStatus: 'SKIPPED'
        }
      }
    }
  };

  const reportContent = generateMasterReport(testResultsSkipped);

  // Check N/A* output
  assert(reportContent.includes('| N/A* |'), 'Skipped legacy must display N/A*');
  assert(reportContent.includes('⚪ SKIPPED'), 'Skipped legacy must show SKIPPED parity tag');
  assert(reportContent.includes('--skip-legacy'), 'Report must contain explanatory footnote when legacy is skipped');
});

// -----------------------------------------------------------------------------
// 4. Domain Micro-Constitutions (12 Categories Coverage)
// -----------------------------------------------------------------------------
test('contextCompiler: covers all 12 architectural categories without silent fallback', async () => {
  const { DOMAIN_MICRO_CONSTITUTIONS } = await import('../benchmarks/lib/context-compiler.mjs');
  const expectedCategories = [
    'database', 'security', 'backend', 'frontend', 'refactoring',
    'bug-fixing', 'architecture', 'devops', 'networking', 'auth',
    'concurrency', 'performance'
  ];
  for (const cat of expectedCategories) {
    assert(DOMAIN_MICRO_CONSTITUTIONS[cat], `Missing micro-constitution for category: ${cat}`);
    assert(DOMAIN_MICRO_CONSTITUTIONS[cat].length > 50, `Category micro-constitution too short: ${cat}`);
  }
});

// -----------------------------------------------------------------------------
// 5. Adaptive Token Budgeting (Expert Multiplier & Model Limits)
// -----------------------------------------------------------------------------
test('tokenBudgetEngine: applies 1.6x multiplier for expert tasks and exports MODEL_TOKEN_LIMITS', async () => {
  const { calculateTokenBudget, MODEL_TOKEN_LIMITS } = await import('../benchmarks/lib/token-budget-engine.mjs');
  assert(MODEL_TOKEN_LIMITS, 'MODEL_TOKEN_LIMITS must be exported');
  const mediumBudget = calculateTokenBudget({ modelName: 'minimaxai/minimax-m3.1-flash', taskDifficulty: 'medium', astCheckCount: 0 });
  const expertBudget = calculateTokenBudget({ modelName: 'minimaxai/minimax-m3.1-flash', taskDifficulty: 'expert', astCheckCount: 0 });
  assert(expertBudget.maxTokens > mediumBudget.maxTokens, 'Expert budget must exceed medium budget');
  assert.strictEqual(expertBudget.maxTokens, 3072);
});

// -----------------------------------------------------------------------------
// 6. Deliberation & Canonical Delivery Pipeline Integration
// -----------------------------------------------------------------------------
test('validatorPipeline: satisfies structural consensus checks located in deliberation section', async () => {
  const { validatePipeline } = await import('../benchmarks/lib/validator-pipeline.mjs');
  const sample = `<canonical_delivery>
export function buildPipeline() { return { active: true }; }
</canonical_delivery>
<deliberation_and_spec>
## 1. MICRO-SPEC & ARCHITECTURAL SPECIFICATION
## 2. ADVERSARIAL RED-TEAM RISK ASSESSMENT
</deliberation_and_spec>`;

  const result = validatePipeline(sample, {
    required_patterns: [],
    ast_checks: ['boardroom_consensus_structure']
  });

  assert(result.passed, `Validation should pass with deliberation section: ${result.violations.join(', ')}`);
});

// -----------------------------------------------------------------------------
// 7. URL Preservation & Comment Stripping (Finding 1 & Finding 2)
// -----------------------------------------------------------------------------
test('validatorPipeline: stripComments preserves URLs and Stage 6 ignores comment anti-patterns', async () => {
  const { validatePipeline } = await import('../benchmarks/lib/validator-pipeline.mjs');

  // Test URL preservation and comments mentioning anti-pattern 'as any'
  const codeWithUrlAndComment = `<canonical_delivery>
const endpoint = "https://api.example.com/v1/checkout";
// Note: avoid casting as any or using ALTER TABLE RENAME COLUMN
export function checkout(id: string): { ok: boolean } {
  return { ok: Boolean(endpoint) };
}
</canonical_delivery>`;

  const result = validatePipeline(codeWithUrlAndComment, {
    required_patterns: ['https://api.example.com'],
    ast_checks: ['no_any', 'no_blocking_rename']
  });

  assert(result.passed, `Pipeline should pass without comment false-positive violations: ${result.violations.join(', ')}`);
});

// -----------------------------------------------------------------------------
// 8. Canonical Delivery Truncation Isolation (Finding 3)
// -----------------------------------------------------------------------------
test('canonicalDelivery: complete canonical code is not marked truncated when deliberation is truncated', async () => {
  const { extractCanonicalDelivery } = await import('../benchmarks/lib/canonical-delivery.mjs');

  const partialOutput = `<aimaster_response>
<canonical_delivery>
export function add(a: number, b: number): number {
  return a + b;
}
</canonical_delivery>
<deliberation_and_spec>
## 1. MICRO-SPEC & ARCHITECTURAL SPECIFICATION
This calculation requires`; // truncated in deliberation

  const delivery = extractCanonicalDelivery(partialOutput);
  assert.strictEqual(delivery.isTruncated, false, 'Canonical delivery must NOT be marked truncated when code tag is fully closed');
  assert(delivery.canonicalCode.includes('return a + b;'), 'Canonical code must be cleanly extracted');
});

// -----------------------------------------------------------------------------
// 9. SQL Comment Stripping & Decrement Preservation
// -----------------------------------------------------------------------------
test('validatorPipeline: strips SQL single-line comments without breaking JS decrement', async () => {
  const { validatePipeline } = await import('../benchmarks/lib/validator-pipeline.mjs');

  const sqlWithComment = `<canonical_delivery>
-- Expand-Contract Migration (Note: We never run ALTER TABLE users RENAME COLUMN here)
ALTER TABLE users ADD COLUMN IF NOT EXISTS contact_msisdn VARCHAR(32);
const counter = i--;
--i;
</canonical_delivery>`;

  const result = validatePipeline(sqlWithComment, {
    ast_checks: ['no_blocking_rename']
  });

  assert(result.passed, `SQL comments should be stripped so no_blocking_rename passes: ${result.violations.join(', ')}`);
});

// -----------------------------------------------------------------------------
// 10. Positive AST Invariants Reject Comment-Only False-Positives
// -----------------------------------------------------------------------------
test('validatorPipeline: positive AST checks reject comment-only mentions', async () => {
  const { validatePipeline } = await import('../benchmarks/lib/validator-pipeline.mjs');

  // Baseline writes a TODO comment but does not implement timingSafeEqual
  const codeWithCommentOnly = `<canonical_delivery>
// TODO: we should call crypto.timingSafeEqual(a, b) here
export function verify(a: Buffer, b: Buffer): boolean {
  return a.equals(b);
}
</canonical_delivery>`;

  const resultFail = validatePipeline(codeWithCommentOnly, {
    ast_checks: ['timing_safe_compare']
  });
  assert(!resultFail.passed, 'Positive AST check must fail when mentioned only in comment');

  // Valid implementation with timingSafeEqual in code
  const codeWithRealCall = `<canonical_delivery>
import crypto from 'node:crypto';
export function verify(a: Buffer, b: Buffer): boolean {
  return crypto.timingSafeEqual(a, b);
}
</canonical_delivery>`;

  const resultPass = validatePipeline(codeWithRealCall, {
    ast_checks: ['timing_safe_compare']
  });
  assert(resultPass.passed, `Positive AST check must pass when function is called in executable code: ${resultPass.violations.join(', ')}`);
});

console.log(`\n======================================================`);
console.log(`🎉 BENCHMARK ENGINE TESTS: ${passedTests}/${totalTests} PASSED`);
console.log(`======================================================\n`);

