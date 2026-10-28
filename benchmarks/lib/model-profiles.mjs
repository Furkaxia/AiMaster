/**
 * ==============================================================================
 * AIMASTER MODEL ARCHITECTURAL PROFILES ENGINE (v1.0)
 * ==============================================================================
 * Abstract model behavioral profiling system that adjusts context compilation,
 * output delivery strategy, and recovery engine parameters based on model
 * cognitive traits rather than vendor-specific benchmark hacks.
 *
 * Core Behavioral Profiles:
 *   1. REASONING_HEAVY: Models with native thought-chains (<think>, internal reasoning).
 *      Requires strict Output-First delivery and compact context to prevent completion truncation.
 *   2. CODE_SPECIALIST: Dense coding models with strong AST parsing and high syntax fidelity.
 *      Can absorb richer domain typing and interface contracts.
 *   3. HIGH_THROUGHPUT_AGENTIC: Fast instruction-following models (TTFT < 2s).
 *      Balanced token budgeting with single-round targeted recovery.
 *   4. BALANCED_GENERAL: Standard foundation models. Safe defaults.
 *
 * Zero external dependencies (Native Node.js ESM).
 */

export const MODEL_PROFILES = Object.freeze({
  REASONING_HEAVY: 'reasoning_heavy',
  CODE_SPECIALIST: 'code_specialist',
  HIGH_THROUGHPUT_AGENTIC: 'high_throughput_agentic',
  BALANCED_GENERAL: 'balanced_general'
});

export const PROFILE_DEFINITIONS = Object.freeze({
  [MODEL_PROFILES.REASONING_HEAVY]: {
    name: 'Reasoning Heavy',
    reasoning_intensity: 'high',
    context_strategy: 'compact_strict',
    output_strategy: 'output_first_strict',
    canonical_format: 'strict_xml',
    budget_multiplier: 1.4,
    recovery: {
      enabled: true,
      maxAttempts: 2,
      strategy: 'targeted_diff'
    },
    systemDirective: 'Deliver production code FIRST in <canonical_delivery>. Reasoning must be placed after code.'
  },

  [MODEL_PROFILES.CODE_SPECIALIST]: {
    name: 'Code Specialist',
    reasoning_intensity: 'low',
    context_strategy: 'rich_domain',
    output_strategy: 'output_first_standard',
    canonical_format: 'strict_xml',
    budget_multiplier: 1.0,
    recovery: {
      enabled: true,
      maxAttempts: 1,
      strategy: 'targeted_snippet'
    },
    systemDirective: 'Provide full type-checked implementation inside <canonical_delivery>.'
  },

  [MODEL_PROFILES.HIGH_THROUGHPUT_AGENTIC]: {
    name: 'High-Throughput Agentic',
    reasoning_intensity: 'medium',
    context_strategy: 'balanced',
    output_strategy: 'output_first_strict',
    canonical_format: 'strict_xml',
    budget_multiplier: 1.2,
    recovery: {
      enabled: true,
      maxAttempts: 2,
      strategy: 'targeted_feedback'
    },
    systemDirective: 'Provide complete solution in <canonical_delivery> with zero conversational fluff.'
  },

  [MODEL_PROFILES.BALANCED_GENERAL]: {
    name: 'Balanced General',
    reasoning_intensity: 'medium',
    context_strategy: 'balanced',
    output_strategy: 'output_first_standard',
    canonical_format: 'strict_xml',
    budget_multiplier: 1.0,
    recovery: {
      enabled: true,
      maxAttempts: 1,
      strategy: 'targeted_feedback'
    },
    systemDirective: 'Wrap production code in <canonical_delivery>.'
  }
});

/**
 * Resolves the architectural cognitive profile for a given model identifier.
 * Uses structural characteristics, parameter scale hints, and architecture tags.
 *
 * @param {string} modelId Identifier or alias (e.g. 'nvidia/nemotron-3.5-super-vl-120b-a12b')
 * @returns {typeof PROFILE_DEFINITIONS[keyof typeof PROFILE_DEFINITIONS]}
 */
export function resolveModelProfile(modelId = '') {
  const lower = String(modelId).toLowerCase();

  // 1. Reasoning-Heavy Profile
  // e.g. DeepSeek-R1, Nemotron-120B/VL, o1/o3, QwQ, models explicitly designated as reasoning
  if (
    lower.includes('deepseek-r1') ||
    lower.includes('qwq') ||
    lower.includes('120b') ||
    lower.includes('super-vl') ||
    lower.includes('reasoning') ||
    lower.includes('thinking') ||
    lower.includes('o1-') ||
    lower.includes('o3-')
  ) {
    return PROFILE_DEFINITIONS[MODEL_PROFILES.REASONING_HEAVY];
  }

  // 2. Code Specialist Profile
  // e.g. Qwen2.5-Coder, Codestral, DeepSeek-Coder, StarCoder
  if (
    lower.includes('coder') ||
    lower.includes('codestral') ||
    lower.includes('starcoder') ||
    lower.includes('deepseek-coder')
  ) {
    return PROFILE_DEFINITIONS[MODEL_PROFILES.CODE_SPECIALIST];
  }

  // 3. High-Throughput Agentic Profile
  // e.g. Nemotron-Lightning, Llama-3.3-70B, Poolside-Laguna, Claude-3.5-Haiku
  if (
    lower.includes('lightning') ||
    lower.includes('flash') ||
    lower.includes('haiku') ||
    lower.includes('laguna') ||
    lower.includes('mini') ||
    lower.includes('30b') ||
    lower.includes('70b')
  ) {
    return PROFILE_DEFINITIONS[MODEL_PROFILES.HIGH_THROUGHPUT_AGENTIC];
  }

  // 4. Fallback Default
  return PROFILE_DEFINITIONS[MODEL_PROFILES.BALANCED_GENERAL];
}
