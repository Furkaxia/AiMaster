#!/usr/bin/env node

/**
 * ==============================================================================
 * AIMASTER DETERMINISTIC VALIDATOR MUTATION & ADVERSARIAL SUITE (v1.0)
 * ==============================================================================
 * Validates that the multi-stage validator rejects mutated, unsafe, or broken code.
 *
 * Core Principle:
 *   "A validator is only as good as what it rejects."
 *
 * Evaluates 12 deliberate adversarial code mutations:
 *   1.  Timing attack (=== instead of timingSafeEqual)
 *   2.  TOCTOU Path traversal (missing realpath / O_NOFOLLOW)
 *   3.  Non-atomic SQL decrement (race condition)
 *   4.  Blocking table lock (ALTER TABLE ... RENAME COLUMN)
 *   5.  Constitutional type corruption ('as any' / ': any')
 *   6.  Constitutional secret leakage (hardcoded literal token)
 *   7.  Constitutional dynamic eval injection
 *   8.  Missing Dead Letter Queue (DLQ) routing
 *   9.  SSRF bypass (missing socket pinning / private IP check)
 *   10. Missing Idempotency enforcement
 *   11. Transaction leak (missing ROLLBACK on error)
 *   12. Timezone drift (missing UTC normalization)
 *
 * Zero external dependencies (Native Node.js ESM).
 */

import assert from 'node:assert';
import { validatePipeline } from '../benchmarks/lib/validator-pipeline.mjs';

console.log(`\n======================================================`);
console.log(`🧬 AIMASTER VALIDATOR MUTATION & ADVERSARIAL SUITE`);
console.log(`======================================================\n`);

let totalMutations = 0;
let caughtMutations = 0;

function assertMutationCaught(name, mutatedCode, rules, expectedViolationSubstring) {
  totalMutations++;
  const result = validatePipeline(mutatedCode, rules);
  const isCaught = !result.passed && result.violations.length > 0;
  const matchesViolation = expectedViolationSubstring
    ? result.violations.some(v => v.toLowerCase().includes(expectedViolationSubstring.toLowerCase()))
    : true;

  if (isCaught && matchesViolation) {
    caughtMutations++;
    console.log(`  ✔ [CAUGHT] ${name}`);
    console.log(`             └─ Violation: "${result.violations[0]}"`);
  } else {
    console.error(`  ✖ [MISSED] ${name}`);
    console.error(`             Passed: ${result.passed}, Violations: ${JSON.stringify(result.violations)}`);
    assert.fail(`Validator failed to catch mutation: ${name}`);
  }
}

// -----------------------------------------------------------------------------
// Mutation 1: Cryptographic Timing Attack (=== instead of timingSafeEqual)
// -----------------------------------------------------------------------------
assertMutationCaught(
  'MUT-01: Insecure HMAC comparison using === instead of timingSafeEqual',
  `<canonical_delivery>
import crypto from 'node:crypto';
export function verifySignature(payload: string, signature: string, secret: string): boolean {
  const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  return expected === signature; // VULNERABLE: Timing leak!
}
</canonical_delivery>`,
  {
    required_patterns: ['/timingSafeEqual/'],
    ast_checks: ['timing_safe_compare']
  },
  'timing_safe_compare'
);

// -----------------------------------------------------------------------------
// Mutation 2: TOCTOU File Traversal (Missing realpath & O_NOFOLLOW)
// -----------------------------------------------------------------------------
assertMutationCaught(
  'MUT-02: Path traversal vulnerability (missing realpath / O_NOFOLLOW)',
  `<canonical_delivery>
import fs from 'node:fs';
import path from 'node:path';
export function readFileSecurely(baseDir: string, userPath: string): string {
  const resolved = path.join(baseDir, userPath);
  return fs.readFileSync(resolved, 'utf8'); // VULNERABLE: Symlink TOCTOU traversal!
}
</canonical_delivery>`,
  {
    required_patterns: ['/realpath/'],
    ast_checks: ['realpath_boundary_verification', 'symlink_nofollow_flag']
  },
  'realpath_boundary_verification'
);

// -----------------------------------------------------------------------------
// Mutation 3: Non-Atomic SQL Balance Decrement (Race Condition)
// -----------------------------------------------------------------------------
assertMutationCaught(
  'MUT-03: Non-atomic database balance decrement (financial race condition)',
  `<canonical_delivery>
export async function withdraw(db: any, userId: string, amount: number) {
  const row = await db.query('SELECT balance FROM accounts WHERE id = $1', [userId]);
  if (row.balance >= amount) {
    const newBal = row.balance - amount;
    await db.query('UPDATE accounts SET balance = $1 WHERE id = $2', [newBal, userId]); // VULNERABLE!
  }
}
</canonical_delivery>`,
  {
    ast_checks: ['atomic_decrement_sql']
  },
  'atomic_decrement_sql'
);

// -----------------------------------------------------------------------------
// Mutation 4: Blocking Table Lock in Migration (RENAME COLUMN)
// -----------------------------------------------------------------------------
assertMutationCaught(
  'MUT-04: Blocking zero-downtime database table lock (ALTER TABLE RENAME COLUMN)',
  `<canonical_delivery>
-- Migration: Rename column directly
ALTER TABLE users RENAME COLUMN phone_number TO contact_msisdn;
</canonical_delivery>`,
  {
    forbidden_patterns: ['/ALTER TABLE.*RENAME COLUMN/i'],
    ast_checks: ['no_blocking_rename']
  },
  'no_blocking_rename'
);

// -----------------------------------------------------------------------------
// Mutation 5: Constitutional Type Safety Violation ('as any')
// -----------------------------------------------------------------------------
assertMutationCaught(
  'MUT-05: Constitutional type violation (as any casting)',
  `<canonical_delivery>
export function parseConfig(raw: string): AppConfig {
  const parsed = JSON.parse(raw);
  return parsed as any; // CONSTITUTIONAL VIOLATION!
}
</canonical_delivery>`,
  {},
  'Constitutional Invariant Violation'
);

// -----------------------------------------------------------------------------
// Mutation 6: Constitutional Hardcoded Secret
// -----------------------------------------------------------------------------
assertMutationCaught(
  'MUT-06: Constitutional secret leakage (literal API token)',
  `<canonical_delivery>
const API_SECRET = "mock_dummy_secret_auth_token_99887766";
export function getClient() {
  return new ApiClient(API_SECRET);
}
</canonical_delivery>`,
  {},
  'Hardcoded literal secret detected'
);

// -----------------------------------------------------------------------------
// Mutation 7: Constitutional Dynamic Code Execution (eval)
// -----------------------------------------------------------------------------
assertMutationCaught(
  'MUT-07: Dynamic code execution (eval injection)',
  `<canonical_delivery>
export function executeExpression(expr: string): unknown {
  return eval(expr); // CONSTITUTIONAL VIOLATION!
}
</canonical_delivery>`,
  {},
  'Dynamic code execution (eval) detected'
);

// -----------------------------------------------------------------------------
// Mutation 8: Missing Dead Letter Queue Routing on Max Retries
// -----------------------------------------------------------------------------
assertMutationCaught(
  'MUT-08: Missing DLQ routing on retry exhaustion',
  `<canonical_delivery>
export async function processQueueMessage(msg: QueueMessage) {
  for (let i = 0; i < 3; i++) {
    try {
      return await handle(msg);
    } catch (e) {
      console.warn("Retry failed", i);
    }
  }
  // VULNERABLE: Message is silently dropped without routing to DLQ!
}
</canonical_delivery>`,
  {
    required_patterns: ['/dlq|dead-letter|deadLetter/i'],
    ast_checks: ['dlq_routing_on_max_retries']
  },
  'dlq_routing_on_max_retries'
);

// -----------------------------------------------------------------------------
// Mutation 9: Enterprise SSRF Defense Bypass (Missing socket pinning)
// -----------------------------------------------------------------------------
assertMutationCaught(
  'MUT-09: SSRF defense bypass (missing socket connection pinning)',
  `<canonical_delivery>
export async function fetchWebhook(targetUrl: string) {
  // Only naive URL parsing without socket pinning:
  const url = new URL(targetUrl);
  return await fetch(url.toString()); // VULNERABLE: DNS Rebinding TOCTOU!
}
</canonical_delivery>`,
  {
    required_patterns: ['/createConnection|lookup|net\\./i'],
    ast_checks: ['socket_level_pinning']
  },
  'socket_level_pinning'
);

// -----------------------------------------------------------------------------
// Mutation 10: Missing Idempotency Key Verification
// -----------------------------------------------------------------------------
assertMutationCaught(
  'MUT-10: Missing idempotency deduplication check before processing',
  `<canonical_delivery>
export async function chargeCustomer(req: ChargeRequest) {
  // Directly executing mutation without idempotency check:
  return await paymentGateway.charge(req.amount);
}
</canonical_delivery>`,
  {
    required_patterns: ['/idempotency/i'],
    ast_checks: ['idempotency_check_before_process']
  },
  'idempotency_check_before_process'
);

// -----------------------------------------------------------------------------
// Mutation 11: Transaction Leak (Missing ROLLBACK on error)
// -----------------------------------------------------------------------------
assertMutationCaught(
  'MUT-11: Database transaction error leak (missing ROLLBACK)',
  `<canonical_delivery>
export async function transferFunds(db: DbConnection, from: string, to: string, amount: number) {
  await db.query('BEGIN TRANSACTION');
  try {
    await db.query('UPDATE accounts SET balance = balance - $1 WHERE id = $2', [amount, from]);
    await db.query('UPDATE accounts SET balance = balance + $1 WHERE id = $2', [amount, to]);
    await db.query('COMMIT');
  } catch (err) {
    // VULNERABLE: Throws without executing ROLLBACK!
    throw err;
  }
}
</canonical_delivery>`,
  {
    required_patterns: ['/ROLLBACK/'],
    ast_checks: ['mandatory_rollback_on_error']
  },
  'mandatory_rollback_on_error'
);

// -----------------------------------------------------------------------------
// Mutation 12: Timezone DST Shift Boundary (Missing UTC normalization)
// -----------------------------------------------------------------------------
assertMutationCaught(
  'MUT-12: Timezone DST shift bug (missing explicit UTC normalization)',
  `<canonical_delivery>
export function getExpiryTimestamp(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days); // VULNERABLE: Local time DST shift!
  return d.toString();
}
</canonical_delivery>`,
  {
    required_patterns: ['/UTC|toISOString|setUTCDate/'],
    ast_checks: ['utc_explicit_normalization']
  },
  'utc_explicit_normalization'
);

console.log(`\n======================================================`);
console.log(`🎯 MUTATION COVERAGE: ${caughtMutations}/${totalMutations} (${Math.round((caughtMutations / totalMutations) * 100)}%) MUTATIONS REJECTED`);
console.log(`======================================================\n`);
