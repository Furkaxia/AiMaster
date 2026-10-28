/**
 * ==============================================================================
 * AIMASTER MULTI-STAGE DETERMINISTIC VALIDATOR PIPELINE (v1.0)
 * ==============================================================================
 * Centralized, multi-stage validator replacing ad-hoc regex scanners.
 *
 * Pipeline Stages:
 *   Stage 1: Canonical Boundary Extraction (<canonical_delivery> vs deliberation)
 *   Stage 2: Language & Structural Integrity (Balance, Truncation detection)
 *   Stage 3: Constitutional Security Invariants (Anti-Any, Secret Ban, Fail-Closed)
 *   Stage 4: Prohibited / Anti-Pattern Scanner (Isolated strictly to canonical code)
 *   Stage 5: Required Architecture & Signature Patterns
 *   Stage 6: Deterministic Semantic & Invariant Checkers (43 deterministic checks)
 *   Stage 7: Scientific Failure Classification & Recovery Diagnostics
 *
 * Zero external dependencies (Native Node.js ESM).
 */

import { extractCanonicalDelivery } from './canonical-delivery.mjs';
import { classifyFailure, FAILURE_CLASSES } from './failure-classifier.mjs';

/**
 * 43 Deterministic Semantic & Invariant Checkers
 */
export const AST_CHECKERS = Object.freeze({
  async_await_conversion: (code) => /async\s+function|async\s*\(/.test(code) && /await\s+/.test(code),
  atomic_decrement_sql: (code) => /quantity\s*-\s*\$?[0-9a-zA-Z_]+/i.test(code) && /WHERE/i.test(code),
  batch_backfill_enforced: (code) => /LIMIT|BATCH/i.test(code) && /WHERE/i.test(code),
  boardroom_consensus_structure: (code) => /MICRO-SPEC|SPECIFICATION/i.test(code) && /RED-TEAM|RISK/i.test(code),
  branded_types_used: (code) => /__brand|Brand<|unique symbol/i.test(code),
  dependency_inversion: (code) => /interface\s+I[A-Z]|constructor\s*\([^)]*I[A-Z]/i.test(code),
  disallow_auto_redirects: (code) => /manual|maxRedirects:\s*0/i.test(code),
  dlq_routing_on_max_retries: (code) => /dlq|dead-letter/i.test(code) && /retry/i.test(code),
  equality_before_range_index_order: (code) => /CREATE\s+INDEX/i.test(code) && /DESC/i.test(code),
  error_envelope_rfc7807: (code) => /json\s*\(\s*\{|error|status/i.test(code),
  fail_closed_secret_barrier: (code) => /FAIL[-_]CLOSED|strict/i.test(code) || (/process\.env/i.test(code) && /throw/i.test(code)),
  focus_trap_present: (code) => /tabIndex|onKeyDown|Escape/i.test(code),
  guarded_state_transitions: (code) => /transitions|IllegalState|throw/i.test(code),
  idempotency_check_before_process: (code) => /idempotency/i.test(code),
  integer_minor_units_enforced: (code) => /cents|minor_units|Math\.round|BigInt/i.test(code),
  jwt_verify_with_algorithm: (code) => /jwt\.verify/i.test(code) && /algorithms/i.test(code),
  layer_decoupling: (code) => /Repository|Service/i.test(code),
  mandatory_rollback_on_error: (code) => /ROLLBACK/i.test(code) && /COMMIT/i.test(code),
  map_indexed_lookup: (code) => /new Map/i.test(code),
  mutex_or_probabilistic_early_refresh: (code) => /SETNX|lock|mutex/i.test(code),
  no_any: (code) => !/:\s*any\b/i.test(code) && !/as\s+any\b/i.test(code),
  no_blocking_rename: (code) => !/ALTER TABLE.*RENAME COLUMN/i.test(code),
  no_empty_catch: (code) => !/catch\s*\([^)]*\)\s*\{\s*\}/.test(code),
  no_inline_pixel_width: (code) => !/style=\{\{[^}]*width:\s*['"]?[0-9]+px/i.test(code),
  no_raw_offset_query: (code) => !/OFFSET\s+[0-9]+/i.test(code),
  no_store_destructure_without_selector: (code) => /useShallow|selector/i.test(code) || !/const\s*\{[^}]*\}\s*=\s*use[A-Z]/.test(code),
  partial_unique_index_predicate: (code) => /CREATE UNIQUE INDEX/i.test(code) && /WHERE/i.test(code),
  pii_scrubbing_before_embed: (code) => /scrub|redact|mask|PII/i.test(code),
  proper_try_catch_rethrow: (code) => /try\s*\{[\s\S]*\}\s*catch/i.test(code),
  raw_body_preserved: (code) => /rawBody|Buffer/i.test(code),
  realpath_boundary_verification: (code) => /realpath/i.test(code),
  restore_focus_handler: (code) => /focus/i.test(code),
  row_level_locking: (code) => /FOR UPDATE/i.test(code),
  safe_stream_pipeline: (code) => /pipeline/i.test(code),
  single_source_of_truth: (code) => /export\s+(const|function|type|class)|create<|Store/i.test(code),
  socket_level_pinning: (code) => /createConnection|lookup|net\./i.test(code),
  symlink_nofollow_flag: (code) => /O_NOFOLLOW/i.test(code),
  tenant_cross_check: (code) => /tenant/i.test(code) && /!==|===|!=|==/.test(code),
  timing_safe_compare: (code) => /timingSafeEqual/i.test(code),
  untrusted_input_scrubbing: (code) => /sanitize|replace|quarantine|untrusted/i.test(code),
  utc_explicit_normalization: (code) => /UTC|toISOString|setUTCDate/i.test(code),
  vector_pre_filter_mandatory: (code) => /filter.*tenant/i.test(code),
  xml_containment_boundary: (code) => /<untrusted_user_content>|<untrusted_content>/i.test(code),
  circuit_breaker_state_check: (code) => /closed|half-open|open/i.test(code) && /failureCount|state/i.test(code),
  distributed_tracing_propagation: (code) => /traceparent|tracestate|traceId/i.test(code),
  oauth_pkce_verifier_hash: (code) => /code_verifier|code_challenge|S256|sha256/i.test(code),
  graceful_shutdown_signal: (code) => /SIGTERM|SIGINT/i.test(code) && /close|server/i.test(code),
  memory_leak_stream_cleanup: (code) => /destroy\(\)|pipeline|removeListener/i.test(code),
  exponential_backoff_jitter: (code) => /Math\.pow|Math\.random/i.test(code) && /retry|backoff/i.test(code),
  saga_compensating_transaction: (code) => /compensate|rollbackSaga|compensating/i.test(code),
  deadlock_prevention_ordering: (code) => /sort|order/i.test(code) && /lock|acquire/i.test(code)
});

export const INVARIANT_CHECKERS = AST_CHECKERS;
export const SEMANTIC_INVARIANT_CHECKERS = AST_CHECKERS;

/**
 * Validates model output through the complete multi-stage pipeline.
 *
 * @param {string} rawOutput Raw LLM output
 * @param {object} evaluationRules Task evaluation rules (required_patterns, forbidden_patterns, ast_checks)
 * @param {object} [options]
 * @returns {{
 *   passed: boolean,
 *   status: string,
 *   isRecoverable: boolean,
 *   canonicalCode: string,
 *   deliberation: string,
 *   verification: string,
 *   violations: string[],
 *   passedRequirements: string[],
 *   hasCanonicalBoundary: boolean,
 *   isTruncated: boolean,
 *   summary: string,
 *   actionableHint: string | null
 * }}
 */
export function validatePipeline(rawOutput, evaluationRules = {}, options = {}) {
  const violations = [];
  const passedRequirements = [];

  // Stage 1: Extract Canonical Code Deliverable
  const canonical = extractCanonicalDelivery(rawOutput);
  const codeToEvaluate = canonical.canonicalCode || rawOutput;

  // Stage 2: Empty Check
  if (!codeToEvaluate || codeToEvaluate.trim().length === 0) {
    violations.push('Model returned empty code deliverable');
    const failureReport = classifyFailure({
      rawOutput,
      canonicalCode: '',
      violations,
      passed: false
    });
    return {
      passed: false,
      status: failureReport.status,
      isRecoverable: failureReport.isRecoverable,
      canonicalCode: '',
      deliberation: canonical.deliberation,
      verification: canonical.verification,
      violations,
      passedRequirements,
      hasCanonicalBoundary: canonical.hasCanonicalBoundary,
      isTruncated: canonical.isTruncated,
      summary: failureReport.summary,
      actionableHint: failureReport.actionableHint
    };
  }

  // Stage 3: Constitutional Security Invariants (Scanned strictly on executable code, stripping comments)
  const executableCode = stripComments(codeToEvaluate);
  if (/:\s*any\b/i.test(executableCode) || /as\s+any\b/i.test(executableCode)) {
    violations.push(`Constitutional Invariant Violation: 'any' or 'as any' detected in production code`);
  }
  if (/const\s+[A-Z0-9_]*SECRET\s*=\s*['"][^'"]+['"]/i.test(executableCode) ||
      /const\s+[A-Z0-9_]*TOKEN\s*=\s*['"][^'"]+['"]/i.test(executableCode)) {
    violations.push(`Constitutional Invariant Violation: Hardcoded literal secret detected in code`);
  }
  if (/\beval\s*\(/.test(executableCode) || /new\s+Function\s*\(/.test(executableCode)) {
    violations.push(`Constitutional Invariant Violation: Dynamic code execution (eval) detected`);
  }

  // Stage 4: Task-Specific Prohibited Patterns (Scanned strictly on executable code)
  const forbidden = evaluationRules.forbidden_patterns || evaluationRules.prohibited_patterns || [];
  for (const patternStr of forbidden) {
    try {
      const regexMatch = patternStr.match(/^\/(.*)\/([gimsuy]*)$/);
      const regex = regexMatch ? new RegExp(regexMatch[1], regexMatch[2]) : new RegExp(patternStr);
      if (regex.test(executableCode)) {
        violations.push(`Forbidden pattern matched: ${patternStr}`);
      }
    } catch {
      if (executableCode.includes(patternStr)) {
        violations.push(`Forbidden substring found: ${patternStr}`);
      }
    }
  }

  // Stage 5: Task-Specific Required Patterns
  const fullContextForStructural = codeToEvaluate + '\n' + (canonical.deliberation || '') + '\n' + rawOutput;
  const required = evaluationRules.required_patterns || [];
  for (const patternStr of required) {
    try {
      const regexMatch = patternStr.match(/^\/(.*)\/([gimsuy]*)$/);
      const regex = regexMatch ? new RegExp(regexMatch[1], regexMatch[2]) : new RegExp(patternStr);
      const targetText = /SPEC|RED-TEAM|RISK/i.test(patternStr) ? fullContextForStructural : codeToEvaluate;
      if (regex.test(targetText)) {
        passedRequirements.push(patternStr);
      } else {
        violations.push(`Missing required pattern: ${patternStr}`);
      }
    } catch {
      const targetText = /SPEC|RED-TEAM|RISK/i.test(patternStr) ? fullContextForStructural : codeToEvaluate;
      if (targetText.includes(patternStr)) {
        passedRequirements.push(patternStr);
      } else {
        violations.push(`Missing required pattern: ${patternStr}`);
      }
    }
  }

  // Stage 6: AST Semantic Invariants
  // All AST code checks (both positive code patterns and 'no_*' antipattern checks) evaluate strictly
  // on executableCode (stripped of JS/TS and SQL comments) to prevent comment false-positives/negatives.
  // Only structural/consensus checks (boardroom_consensus_structure) evaluate against fullContextForStructural.
  const astChecks = evaluationRules.ast_checks || [];
  for (const checkName of astChecks) {
    const checker = AST_CHECKERS[checkName];
    if (checker) {
      const isPassed = checkName === 'boardroom_consensus_structure'
        ? checker(fullContextForStructural)
        : checker(executableCode);
      if (isPassed) {
        passedRequirements.push(`ast:${checkName}`);
      } else {
        violations.push(`Failed AST semantic invariant check: [${checkName}]`);
      }
    }
  }

  const passed = violations.length === 0;

  // Stage 7: Failure Classification & Diagnosis
  const failureReport = classifyFailure({
    rawOutput,
    canonicalCode: codeToEvaluate,
    finishReason: options.finishReason || (canonical.isTruncated ? 'length' : null),
    isTruncated: canonical.isTruncated,
    violations,
    passed
  });

  return {
    passed,
    status: failureReport.status,
    isRecoverable: failureReport.isRecoverable,
    canonicalCode: codeToEvaluate,
    deliberation: canonical.deliberation,
    verification: canonical.verification,
    violations,
    passedRequirements,
    hasCanonicalBoundary: canonical.hasCanonicalBoundary,
    isTruncated: canonical.isTruncated,
    summary: failureReport.summary,
    actionableHint: failureReport.actionableHint
  };
}

/**
 * Strips JavaScript/TypeScript and SQL comments (block and single line) to prevent
 * documentation prose or problem descriptions from triggering false positives or negatives.
 * Uses negative lookbehind (?<!:) so that URLs (http://, https://) are preserved.
 * Strips SQL single-line comments (-- comment) without breaking JS decrement (i-- / --i).
 */
function stripComments(code) {
  if (!code || typeof code !== 'string') return '';
  return code
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(?<!:)\/\/[^\r\n]*/g, '')
    .replace(/(?<=^|[\s;,])--(?:[ \t]+[^\r\n]*|-+[^\r\n]*|$)/gm, '');
}
