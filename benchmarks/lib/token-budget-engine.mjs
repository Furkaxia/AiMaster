/**
 * ==============================================================================
 * AIMASTER ADAPTIVE TOKEN BUDGETING & RECOVERY ENGINE (v1.0)
 * ==============================================================================
 * Dynamically computes optimal completion token limits based on:
 *   1. Task complexity tier (medium vs hard, AST check count)
 *   2. Model reasoning profile (DeepSeek-R1 / Nemotron reasoning need >2k completion tokens)
 *   3. Context window remaining capacity
 *
 * Implements deterministic truncation detection and continuation payload generation.
 *
 * Zero external dependencies (Native Node.js ESM).
 */

/**
 * Model token limits and output boundaries.
 */
export const MODEL_TOKEN_LIMITS = {
  // Flagship Reasoning & Thinking Models
  'nvidia/nemotron-3.5-super-vl-120b-a12b': {
    family: 'nemotron',
    isReasoning: true,
    minOutputTokens: 2048,
    maxOutputTokens: 4096,
    defaultMaxTokens: 3072,
    safetyMarginTokens: 512
  },
  'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning': {
    family: 'nemotron',
    isReasoning: true,
    minOutputTokens: 2048,
    maxOutputTokens: 4096,
    defaultMaxTokens: 3072,
    safetyMarginTokens: 512
  },
  'deepseek-ai/deepseek-r1': {
    family: 'deepseek-r1',
    isReasoning: true,
    minOutputTokens: 2500,
    maxOutputTokens: 4096,
    defaultMaxTokens: 3500,
    safetyMarginTokens: 512
  },

  // Fast Coding & Instruction Models
  'nvidia/nemotron-3.5-lightning-30b-a3b': {
    family: 'nemotron',
    isReasoning: true,
    minOutputTokens: 2048,
    maxOutputTokens: 4096,
    defaultMaxTokens: 3584,
    safetyMarginTokens: 512
  },
  'minimaxai/minimax-m3.1-flash': {
    family: 'minimax',
    isReasoning: false,
    minOutputTokens: 1024,
    maxOutputTokens: 3072,
    defaultMaxTokens: 2048,
    safetyMarginTokens: 256
  },
  'poolside/laguna-xs-2.1': {
    family: 'poolside',
    isReasoning: false,
    minOutputTokens: 1024,
    maxOutputTokens: 3072,
    defaultMaxTokens: 2048,
    safetyMarginTokens: 256
  },
  'openai/gpt-oss-20b': {
    family: 'openai',
    isReasoning: false,
    minOutputTokens: 1024,
    maxOutputTokens: 3072,
    defaultMaxTokens: 2048,
    safetyMarginTokens: 256
  },
  'qwen/qwen2.5-coder-32b-instruct': {
    family: 'qwen',
    isReasoning: false,
    minOutputTokens: 1536,
    maxOutputTokens: 4096,
    defaultMaxTokens: 2560,
    safetyMarginTokens: 256
  }
};

export const MODEL_PROFILES = MODEL_TOKEN_LIMITS;

/**
 * Calculates adaptive token budget for a task execution.
 *
 * @param {{
 *   modelName: string,
 *   taskDifficulty?: 'easy' | 'medium' | 'hard' | 'expert',
 *   astCheckCount?: number,
 *   inputTokensEstimate?: number,
 *   contextWindowLimit?: number
 * }} params
 * @returns {{
 *   maxTokens: number,
 *   modelProfile: object,
 *   rationale: string
 * }}
 */
export function calculateTokenBudget({
  modelName,
  modelId,
  taskDifficulty,
  difficulty = 'medium',
  astCheckCount,
  astChecksCount = 2,
  inputTokensEstimate = 1200,
  contextWindowLimit = 8192
} = {}) {
  const resolvedModel = modelName || modelId || '';
  const resolvedDifficulty = taskDifficulty || difficulty || 'medium';
  const resolvedAstCount = astCheckCount ?? astChecksCount ?? 2;

  const profile = MODEL_TOKEN_LIMITS[resolvedModel] || {
    family: 'generic',
    isReasoning: false,
    minOutputTokens: 1024,
    maxOutputTokens: 3072,
    defaultMaxTokens: 2048,
    safetyMarginTokens: 256
  };

  // 1. Difficulty weight
  let difficultyMultiplier = 1.0;
  if (resolvedDifficulty === 'expert') difficultyMultiplier = 1.6;
  else if (resolvedDifficulty === 'hard') difficultyMultiplier = 1.35;
  else if (resolvedDifficulty === 'easy') difficultyMultiplier = 0.8;

  // 2. AST complexity boost
  const astBoost = Math.min(600, resolvedAstCount * 120);

  // 3. Compute base target
  let targetOutput = Math.round((profile.defaultMaxTokens * difficultyMultiplier) + astBoost);

  // 4. Reasoning overhead protection
  if (profile.isReasoning) {
    targetOutput = Math.max(targetOutput, profile.minOutputTokens);
  }

  // 5. Context window headroom check
  const availableHeadroom = contextWindowLimit - inputTokensEstimate - profile.safetyMarginTokens;
  targetOutput = Math.min(targetOutput, Math.max(512, availableHeadroom));

  // 6. Clamp to model boundaries
  const finalBudget = Math.max(profile.minOutputTokens, Math.min(profile.maxOutputTokens, targetOutput));

  return {
    maxTokens: finalBudget,
    modelProfile: profile,
    rationale: `Difficulty=${resolvedDifficulty} (x${difficultyMultiplier}), AST=${resolvedAstCount} (+${astBoost}t), Reasoning=${profile.isReasoning} -> ${finalBudget}t`
  };
}

/**
 * Inspects output for truncation and determines if a continuation prompt is needed.
 *
 * @param {string} outputText
 * @param {string} finishReason
 * @returns {{
 *   isTruncated: boolean,
 *   reason: string | null,
 *   continuationPrompt: string | null
 * }}
 */
export function evaluateOutputIntegrity(outputText, finishReason = null) {
  if (!outputText) {
    return { isTruncated: true, reason: 'EMPTY_OUTPUT', continuationPrompt: null };
  }

  if (finishReason === 'length') {
    return {
      isTruncated: true,
      reason: 'FINISH_REASON_LENGTH',
      continuationPrompt: 'Your output was truncated by token budget. Continue writing immediately from the exact point where you stopped. Do NOT repeat previous code.'
    };
  }

  // Check unclosed code fences
  const fenceMatches = outputText.match(/```/g) || [];
  if (fenceMatches.length % 2 !== 0) {
    return {
      isTruncated: true,
      reason: 'UNCLOSED_CODE_FENCE',
      continuationPrompt: 'Complete the remaining implementation and close the code fence (```).'
    };
  }

  // Check unclosed canonical delivery tag
  if (outputText.includes('<canonical_delivery>') && !outputText.includes('</canonical_delivery>')) {
    return {
      isTruncated: true,
      reason: 'UNCLOSED_CANONICAL_TAG',
      continuationPrompt: 'Complete the canonical delivery implementation and close the </canonical_delivery> tag.'
    };
  }

  return {
    isTruncated: false,
    reason: null,
    continuationPrompt: null
  };
}
