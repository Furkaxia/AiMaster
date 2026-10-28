/**
 * ==============================================================================
 * AIMASTER FAILURE CLASSIFIER & DIAGNOSTIC ENGINE (v1.0)
 * ==============================================================================
 * Disaggregates raw FAIL/NA statuses into granular scientific categories:
 *
 *   - PASS: All AST, pattern, and security invariants satisfied
 *   - FAIL: Model generated code that failed deterministic semantic/AST checks
 *   - TRUNCATED: Output cut off due to max_tokens exhaustion (finish_reason: length)
 *   - TIMEOUT: API call exceeded network/execution timeout threshold
 *   - API_ERROR: HTTP 4xx/5xx, rate limits, or provider connection failure
 *   - MODEL_EMPTY: Model returned empty content or pure whitespace
 *   - VALIDATOR_REJECTED: Output contained no recognizable code block or violated structure
 *   - NOT_EXECUTED: Task was skipped or prerequisite failed
 *
 * Determines whether a failure is RECOVERABLE via targeted self-healing.
 *
 * Zero external dependencies (Native Node.js ESM).
 */

export const FAILURE_CLASSES = Object.freeze({
  PASS: 'PASS',
  FAIL: 'FAIL',
  TRUNCATED: 'TRUNCATED',
  TIMEOUT: 'TIMEOUT',
  API_ERROR: 'API_ERROR',
  MODEL_EMPTY: 'MODEL_EMPTY',
  VALIDATOR_REJECTED: 'VALIDATOR_REJECTED',
  NOT_EXECUTED: 'NOT_EXECUTED'
});

/**
 * Classifies a task execution result into a scientific failure category.
 *
 * @param {{
 *   rawOutput?: string,
 *   canonicalCode?: string,
 *   finishReason?: string,
 *   isTruncated?: boolean,
 *   elapsedMs?: number,
 *   timeoutMs?: number,
 *   error?: Error | string,
 *   violations?: string[],
 *   passed?: boolean
 * }} execResult
 * @returns {{
 *   status: string,
 *   isSuccess: boolean,
 *   isRecoverable: boolean,
 *   summary: string,
 *   actionableHint: string | null
 * }}
 */
export function classifyFailure(execResult = {}) {
  const {
    rawOutput = '',
    canonicalCode = '',
    finishReason = null,
    isTruncated = false,
    error = null,
    violations = [],
    passed = false
  } = execResult;

  // 1. Success case
  if (passed && violations.length === 0) {
    return {
      status: FAILURE_CLASSES.PASS,
      isSuccess: true,
      isRecoverable: false,
      summary: 'All deterministic AST and constitutional invariants satisfied',
      actionableHint: null
    };
  }

  // 2. Explicit Error / Exception
  if (error) {
    const errMsg = typeof error === 'string' ? error : (error.message || String(error));
    if (/timeout|timed out|abort/i.test(errMsg)) {
      return {
        status: FAILURE_CLASSES.TIMEOUT,
        isSuccess: false,
        isRecoverable: false,
        summary: `Execution timed out: ${errMsg}`,
        actionableHint: 'Increase model timeout budget or reduce context size.'
      };
    }
    if (/http\s+[45]\d\d|api error|rate limit|quota|unauthorized|503/i.test(errMsg)) {
      return {
        status: FAILURE_CLASSES.API_ERROR,
        isSuccess: false,
        isRecoverable: false,
        summary: `API or Provider gateway error: ${errMsg}`,
        actionableHint: 'Check endpoint health, credentials, or rate limits.'
      };
    }
    return {
      status: FAILURE_CLASSES.FAIL,
      isSuccess: false,
      isRecoverable: true,
      summary: `Runtime execution error: ${errMsg}`,
      actionableHint: 'Inspect stack trace or prompt formatting.'
    };
  }

  // 3. Truncation Detection
  // Output-First Protocol: If canonical code was fully closed and extracted without truncation,
  // subsequent prose/deliberation cuts do NOT invalidate the production deliverable.
  const codeIsTruncated = isTruncated || (canonicalCode ? detectTruncatedCode(canonicalCode) : detectTruncatedCode(rawOutput));
  const lengthTruncated = finishReason === 'length' && (!canonicalCode || codeIsTruncated);
  if (codeIsTruncated || lengthTruncated) {
    return {
      status: FAILURE_CLASSES.TRUNCATED,
      isSuccess: false,
      isRecoverable: true,
      summary: 'Output truncated before completion due to token budget limit',
      actionableHint: 'Invoke recovery continuation or allocate higher token budget.'
    };
  }

  // 4. Empty Response
  if (!rawOutput || rawOutput.trim().length === 0) {
    return {
      status: FAILURE_CLASSES.MODEL_EMPTY,
      isSuccess: false,
      isRecoverable: true,
      summary: 'Model returned completely empty response',
      actionableHint: 'Retry with simplified prompt or alternative model temperature.'
    };
  }

  // 5. Validator Rejection (e.g. model produced conversational fluff but zero code)
  if (!canonicalCode || canonicalCode.trim().length === 0) {
    return {
      status: FAILURE_CLASSES.VALIDATOR_REJECTED,
      isSuccess: false,
      isRecoverable: true,
      summary: 'No extractable canonical code block found in model output',
      actionableHint: 'Instruct model strictly to wrap code in <canonical_delivery>.'
    };
  }

  // 6. Semantic / AST Invariant Violations (Code exists but is incorrect)
  if (violations.length > 0) {
    const hasSecurityViolation = violations.some(v => /security|secret|any\b|ssrf|injection/i.test(v));
    const hasAstViolation = violations.some(v => /ast|invariant/i.test(v));
    const hasPatternViolation = violations.some(v => /missing required pattern|forbidden/i.test(v));

    let summary = `Failed ${violations.length} deterministic check(s): `;
    summary += violations.slice(0, 2).join('; ');
    if (violations.length > 2) summary += ` (+${violations.length - 2} more)`;

    return {
      status: FAILURE_CLASSES.FAIL,
      isSuccess: false,
      isRecoverable: true,
      summary,
      actionableHint: hasSecurityViolation
        ? 'Targeted security repair: remediate secret leaks or unsafe type casts.'
        : hasAstViolation
          ? 'Targeted AST repair: enforce mandatory structural node declarations.'
          : 'Targeted pattern repair: inject required library methods or signatures.'
    };
  }

  return {
    status: FAILURE_CLASSES.FAIL,
    isSuccess: false,
    isRecoverable: true,
    summary: 'Unknown semantic failure',
    actionableHint: 'Review evaluation logs.'
  };
}

/**
 * Heuristic detector for unclosed brackets, cut-off functions, or trailing ellipses.
 */
function detectTruncatedCode(text) {
  if (!text) return false;
  const trimmed = text.trim();
  // If text ends with a valid closing XML/HTML tag or code fence, it is cleanly closed
  if (/<\/[a-zA-Z0-9_\-]+>\s*$/.test(trimmed) || /```\s*$/.test(trimmed) || /;\s*$/.test(trimmed) || /\}\s*$/.test(trimmed)) {
    return false;
  }
  // Cut off mid-identifier or operator (excluding > which can be a closed tag)
  if (/[,\(\{\[\:\+\-\*\/=&\|]\s*$/.test(trimmed)) return true;
  // Explicit ellipsis
  if (/\.\.\.\s*$/.test(trimmed) || /\/\/\s*rest of code/i.test(trimmed)) return true;
  // Unclosed XML tag at the end (e.g. <canonical_deliv)
  if (/<[a-zA-Z0-9_\-]+[^>]*$/.test(trimmed)) return true;
  return false;
}
