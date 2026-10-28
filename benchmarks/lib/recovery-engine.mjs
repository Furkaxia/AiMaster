/**
 * ==============================================================================
 * AIMASTER TARGETED RECOVERY & SELF-HEALING ENGINE (v1.0)
 * ==============================================================================
 * Implements real-time agentic self-healing for deterministic engineering failures:
 *
 *   Inference ➔ Validation ➔ PASS ➔ DONE
 *               ↓ (FAIL)
 *   Failure Classification
 *               ↓
 *   Recoverable?
 *     ├── YES ➔ Targeted Surgical Retry (Max 1-2 attempts)
 *     └── NO  ➔ Fail-Closed Diagnostic Log
 *
 * Handles:
 *   1. TRUNCATION: Resumes code from boundary or expands completion budget.
 *   2. AST & PATTERN VIOLATIONS: Injects precise compiler-style diagnostic hints.
 *   3. CONSTITUTIONAL VIOLATIONS: Injects security repair directive (anti-any, secrets).
 *
 * Zero external dependencies (Native Node.js ESM).
 */

import { FAILURE_CLASSES } from './failure-classifier.mjs';

/**
 * Determines whether a failed execution attempt qualifies for targeted recovery.
 *
 * @param {{
 *   status: string,
 *   isRecoverable: boolean,
 *   attempt: number,
 *   maxAttempts: number
 * }} options
 * @returns {boolean}
 */
export function canRecover({ status, isRecoverable, attempt, maxAttempts = 1 }) {
  if (attempt >= maxAttempts) return false;
  if (!isRecoverable) return false;

  // Non-recoverable network/infrastructure states
  if (status === FAILURE_CLASSES.TIMEOUT || status === FAILURE_CLASSES.API_ERROR) {
    return false;
  }

  return (
    status === FAILURE_CLASSES.FAIL ||
    status === FAILURE_CLASSES.TRUNCATED ||
    status === FAILURE_CLASSES.VALIDATOR_REJECTED ||
    status === FAILURE_CLASSES.MODEL_EMPTY
  );
}

/**
 * Constructs a surgical recovery prompt tailored to the specific failure class.
 *
 * @param {{
 *   task: object,
 *   previousCode: string,
 *   validationResult: object,
 *   attempt: number
 * }} params
 * @returns {string}
 */
export function generateRecoveryPrompt({ task, previousCode, validationResult, attempt = 1 }) {
  const { status, violations = [], isTruncated } = validationResult;

  let prompt = `=== AIMASTER SURGICAL RECOVERY NOTICE (ATTEMPT ${attempt}) ===\n`;

  if (status === FAILURE_CLASSES.TRUNCATED || isTruncated) {
    prompt += `Your previous code generation was TRUNCATED before completion due to token budget limits.\n\n`;
    prompt += `TASK OBJECTIVE:\n${task.prompt}\n\n`;
    prompt += `MANDATE: Output the full, complete, compilable file inside <canonical_delivery> FIRST.\n`;
    prompt += `CRITICAL INSTRUCTIONS:\n`;
    prompt += `1. Output '<canonical_delivery>' as the very first token. Zero preamble, zero quotation or repetition of rules.\n`;
    prompt += `2. Strict TypeScript typing required (no 'any').\n`;
    if (previousCode && previousCode.length > 200) {
      prompt += `\nPrevious Partial Implementation (Complete this cleanly):\n\`\`\`typescript\n${previousCode.slice(0, 1200)}\n\`\`\`\n`;
    }
    return prompt;
  }

  if (status === FAILURE_CLASSES.VALIDATOR_REJECTED || status === FAILURE_CLASSES.MODEL_EMPTY) {
    prompt += `Your previous response did NOT contain a valid compilable code block inside <canonical_delivery>.\n`;
    prompt += `MANDATE: You must wrap the entire production solution inside <canonical_delivery> FIRST, followed by <deliberation_and_spec>.\n`;
    prompt += `Original Task Prompt:\n${task.prompt}\n`;
    return prompt;
  }

  // AST / Pattern / Security Violations
  prompt += `Your previous solution failed ${violations.length} deterministic engineering and architectural check(s):\n\n`;
  for (const v of violations) {
    prompt += `  ✖ ${v}\n`;
  }

  prompt += `\nSPECIFIC CORRECTIVE ACTIONS:\n`;
  for (const v of violations) {
    if (/map_indexed_lookup|new Map/i.test(v)) {
      prompt += `- Algorithmic Efficiency: Pre-index data with explicit 'new Map<K, V>()', populate using '.set()', and lookup via '.get()'. Do NOT use nested .find() inside .map().\n`;
    } else if (/timingSafeEqual|timing_safe/i.test(v)) {
      prompt += `- Cryptographic Timing Defense: Compare HMAC signatures using 'crypto.timingSafeEqual(Buffer.from(...), Buffer.from(...))'. NEVER use '===' or '!==' for signature verification.\n`;
    } else if (/timestamp|300/i.test(v)) {
      prompt += `- Replay Attack Defense: Check timestamp tolerance with 'Math.abs(Date.now() - timestamp) > 300' and reject expired requests.\n`;
    } else if (/rawBody|raw_body/i.test(v)) {
      prompt += `- Raw Body Preservation: Retain raw Buffer/string body for HMAC verification; never verify HMAC on JSON.stringify(req.body).\n`;
    } else if (/batch_backfill|LIMIT/i.test(v)) {
      prompt += `- Database Concurrency: Backfill rows in controlled batches using LIMIT/BATCH to prevent table locks.\n`;
    } else if (/atomic_decrement|quantity\s*-\s*/i.test(v)) {
      prompt += `- Financial Concurrency: Decrement quantity/balance atomically in SQL ('quantity = quantity - $amount WHERE quantity >= $amount').\n`;
    } else if (/circuit_breaker_state_check|circuit.*breaker/i.test(v)) {
      prompt += `- Circuit Breaker State Machine: Explicitly model 'closed', 'half-open', and 'open' states with failureCount thresholds and recovery cooldown timers.\n`;
    } else if (/distributed_tracing_propagation|traceparent/i.test(v)) {
      prompt += `- Distributed Tracing: Extract and propagate W3C 'traceparent' and 'tracestate' headers; generate new span ID while preserving trace ID.\n`;
    } else if (/oauth_pkce_verifier_hash|pkce|code_verifier/i.test(v)) {
      prompt += `- OAuth PKCE Flow: Generate cryptographic 'code_verifier', hash with SHA256 ('S256'), and verify matching code_challenge.\n`;
    } else if (/graceful_shutdown_signal|SIGTERM/i.test(v)) {
      prompt += `- Graceful Shutdown: Listen for 'SIGTERM' and 'SIGINT', drain server HTTP connections, close DB pools, and exit cleanly.\n`;
    } else if (/memory_leak_stream_cleanup|stream.*cleanup/i.test(v)) {
      prompt += `- Stream Lifecycle Safety: Use 'stream.pipeline()' to manage backpressure and ensure streams are destroyed on errors or abort.\n`;
    } else if (/exponential_backoff_jitter|jitter/i.test(v)) {
      prompt += `- Retry with Jitter: Compute backoff using exponential power ('Math.pow(2, attempt)') combined with random jitter ('Math.random()').\n`;
    } else if (/saga_compensating_transaction|saga/i.test(v)) {
      prompt += `- Saga Compensation: Implement compensating undo transactions executed in reverse order on downstream step failures.\n`;
    } else if (/deadlock_prevention_ordering|deadlock/i.test(v)) {
      prompt += `- Deadlock Prevention: Sort resource keys lexicographically before lock acquisition and release in reverse order in finally.\n`;
    } else if (/branded_types_used|branded/i.test(v)) {
      prompt += `- Branded Types: Replace duplicate primitive validation with nominal Branded Types ('type Brand<K, T> = K & { readonly __brand: T }' or 'unique symbol').\n`;
    } else if (/realpath_boundary_verification|realpath/i.test(v)) {
      prompt += `- Path Traversal Defense: Resolve canonical paths using 'fs.realpathSync.native()' before checking base directory prefix.\n`;
    } else if (/symlink_nofollow_flag|O_NOFOLLOW/i.test(v)) {
      prompt += `- TOCTOU Symlink Defense: Open untrusted file descriptors using 'fs.constants.O_NOFOLLOW'.\n`;
    } else if (/xml_containment_boundary|untrusted_user_content/i.test(v)) {
      prompt += `- Prompt Injection Defense: Quarantine untrusted user input inside '<untrusted_user_content>' XML boundary tags.\n`;
    } else if (/boardroom_consensus_structure|consensus_structure/i.test(v)) {
      prompt += `- Deliberation Structure: Include 'MICRO-SPEC & ARCHITECTURAL SPECIFICATION' and 'ADVERSARIAL RED-TEAM RISK ASSESSMENT' sections inside <deliberation_and_spec>.\n`;
    } else if (/focus_trap_present|focus_trap/i.test(v)) {
      prompt += `- Accessibility Focus Trap: Trap keyboard focus with 'tabIndex', 'onKeyDown', and handle 'Escape' key dismissal.\n`;
    } else if (/restore_focus_handler|restore_focus/i.test(v)) {
      prompt += `- Accessibility Focus Restore: Retain reference to trigger element and restore focus when modal closes.\n`;
    } else if (/no_store_destructure_without_selector|useShallow/i.test(v)) {
      prompt += `- State Management: Use fine-grained atomic selectors ('useShallow' in Zustand) instead of destructuring entire store state.\n`;
    } else if (/disallow_auto_redirects|auto_redirects/i.test(v)) {
      prompt += `- SSRF Redirect Defense: Set 'redirect: "manual"' or 'maxRedirects: 0' on outbound HTTP requests.\n`;
    } else if (/socket_level_pinning|socket.*pinning/i.test(v)) {
      prompt += `- SSRF DNS Rebinding: Pin socket connection to validated IP using 'net.createConnection' or custom 'lookup'.\n`;
    } else if (/equality_before_range_index_order/i.test(v)) {
      prompt += `- Composite Indexing: Place equality columns before range/sort columns in composite indexes ('CREATE INDEX ... (status, created_at DESC)').\n`;
    } else if (/partial_unique_index_predicate/i.test(v)) {
      prompt += `- Partial Indexing: Enforce soft-delete unique constraint using partial unique index with 'WHERE deleted_at IS NULL'.\n`;
    } else if (/pii_scrubbing_before_embed/i.test(v)) {
      prompt += `- Privacy Scrubbing: Scrub or redact PII/sensitive tokens before generating embeddings or storing vectors.\n`;
    } else if (/no_blocking_rename/i.test(v)) {
      prompt += `- Zero-Downtime Migration: Never use blocking 'ALTER TABLE ... RENAME COLUMN'. Follow Expand-Contract with trigger synchronization.\n`;
    } else if (/no_raw_offset_query/i.test(v)) {
      prompt += `- Scalable Pagination: Eliminate SQL 'OFFSET'; implement opaque base64 keyset cursor pagination.\n`;
    } else if (/no_inline_pixel_width/i.test(v)) {
      prompt += `- Responsive Layout: Replace hardcoded inline pixel widths with container queries or fluid CSS layouts.\n`;
    } else if (/no_empty_catch/i.test(v)) {
      prompt += `- Robust Error Handling: Never leave empty catch blocks; rethrow or log structured diagnostics.\n`;
    } else if (/proper_try_catch_rethrow/i.test(v)) {
      prompt += `- Exception Management: Wrap critical operations in try/catch and rethrow or handle explicitly.\n`;
    } else if (/fail_closed_secret_barrier/i.test(v)) {
      prompt += `- Fail-Closed Security: Assert environment secret existence with fail-closed throw ('if (!process.env.SECRET) throw new Error(...)').\n`;
    } else if (/jwt_verify_with_algorithm/i.test(v)) {
      prompt += `- JWT Algorithm Pinning: Explicitly pin allowed signing algorithms in jwt.verify ({ algorithms: ['RS256'] }).\n`;
    } else if (/tenant_cross_check/i.test(v)) {
      prompt += `- Multitenant Isolation: Validate that token tenant claim strictly equals target resource tenant ID.\n`;
    } else if (/dlq_routing_on_max_retries/i.test(v)) {
      prompt += `- Queue Resilience: Route failed queue events to Dead-Letter Queue (DLQ) after retry budget exhaustion.\n`;
    } else if (/mandatory_rollback_on_error/i.test(v)) {
      prompt += `- Transaction Atomicity: Enforce database transaction rollback on error ('ROLLBACK') and commit on success ('COMMIT').\n`;
    } else if (/row_level_locking/i.test(v)) {
      prompt += `- Concurrency Control: Prevent race conditions using pessimistic row locking ('SELECT ... FOR UPDATE').\n`;
    } else if (/safe_stream_pipeline/i.test(v)) {
      prompt += `- Safe Streaming: Use 'stream.pipeline()' to manage backpressure and ensure stream cleanup.\n`;
    } else if (/single_source_of_truth/i.test(v)) {
      prompt += `- Architecture: Export a single canonical store or factory to maintain single source of truth.\n`;
    } else if (/untrusted_input_scrubbing/i.test(v)) {
      prompt += `- Input Sanitization: Sanitize angle brackets and dangerous escape characters from untrusted inputs.\n`;
    } else if (/utc_explicit_normalization/i.test(v)) {
      prompt += `- Date Normalization: Explicitly normalize timestamps to UTC using 'toISOString()' or 'setUTCDate()'.\n`;
    } else if (/vector_pre_filter_mandatory/i.test(v)) {
      prompt += `- Vector Isolation: Enforce hard tenant ID pre-filtering in vector search query filters.\n`;
    } else if (/error_envelope_rfc7807/i.test(v)) {
      prompt += `- API Standard: Format error envelopes complying with RFC 7807 with status, title, and detail fields.\n`;
    } else if (/async_await_conversion/i.test(v)) {
      prompt += `- Async Modernization: Convert callback-based patterns to async/await syntax.\n`;
    } else if (/dependency_inversion/i.test(v)) {
      prompt += `- Dependency Inversion: Inject dependencies via interfaces in constructors rather than concrete classes.\n`;
    } else if (/guarded_state_transitions/i.test(v)) {
      prompt += `- State Machine Guard: Define an explicit transitions map and throw IllegalStateTransitionError on invalid moves.\n`;
    } else if (/integer_minor_units_enforced/i.test(v)) {
      prompt += `- Financial Precision: Store and compute monetary values in integer minor units (cents / BigInt / Math.round).\n`;
    } else if (/mutex_or_probabilistic_early_refresh/i.test(v)) {
      prompt += `- Cache Stampede Defense: Use distributed lock (SETNX) or probabilistic early refresh for expensive cache misses.\n`;
    } else if (/any\b/i.test(v)) {
      prompt += `- Strict Typing: Eliminate all instances of 'any' or 'as any'. Use explicit types, generics, or unknown with type guards.\n`;
    } else if (/secret|token/i.test(v)) {
      prompt += `- Secret Hygiene: Never assign hardcoded secrets. Read from process.env and throw if missing.\n`;
    } else {
      prompt += `- Resolve: ${v}\n`;
    }
  }

  prompt += `\nMANDATORY EXECUTION DIRECTIVE:\n`;
  prompt += `1. Emit '<canonical_delivery>' as the very first token. Do NOT write markdown intro, conversational preamble, or repeat these rules in prose.\n`;
  prompt += `2. Deliver complete, verified, compilable code without abbreviation.\n`;

  return prompt;
}
