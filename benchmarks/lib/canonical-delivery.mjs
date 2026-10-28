/**
 * ==============================================================================
 * AIMASTER CANONICAL OUTPUT ISOLATION & EXTRACTION ENGINE (v1.0)
 * ==============================================================================
 * Implements strict separation between:
 *   1. Architectural deliberation & explanation (<deliberation_and_spec>)
 *   2. Canonical verified production delivery (<canonical_delivery>)
 *   3. Verification & QA assertions (<verification>)
 *
 * Prevents validator false positives caused by models discussing obsolete
 * anti-patterns (e.g. explaining why orders.map(o => items.find()) is O(N^2)
 * before providing the new Map() solution).
 *
 * Zero external dependencies (Native Node.js ESM).
 */

/**
 * Canonical delivery specification prompt instructions.
 * Injected into AI system instructions to mandate strict separation.
 */
export const CANONICAL_DELIVERY_INSTRUCTION = `
CANONICAL DELIVERY SPECIFICATION (OUTPUT-FIRST):
You must deliver the complete production implementation FIRST inside <canonical_delivery> before providing architectural deliberation or verification.

<aimaster_response>
<canonical_delivery>
[Complete, verified, production-ready compilable code immediately. Include all required migrations, triggers, batch loops, types, and invariants without abbreviation.]
</canonical_delivery>

<deliberation_and_spec>
## 1. MICRO-SPEC & ARCHITECTURAL SPECIFICATION
[Concise architectural specification and trade-off evaluation]
## 2. ADVERSARIAL RED-TEAM RISK ASSESSMENT
[Key security, concurrency, and failure-mode risk mitigations]
</deliberation_and_spec>

<verification>
[Concise invariant checklist: verified boundary protections, edge cases handled, zero secrets]
</verification>
</aimaster_response>
`.trim();

/**
 * Extracts canonical code deliverable from a raw model output.
 * Implements a prioritized extraction hierarchy with fail-closed safety.
 *
 * @param {string} rawText Raw completion text from model
 * @returns {{
 *   canonicalCode: string,
 *   deliberation: string,
 *   verification: string,
 *   extractionMode: 'xml_canonical' | 'fenced_canonical' | 'fenced_code' | 'raw_fallback',
 *   isTruncated: boolean,
 *   hasCanonicalBoundary: boolean
 * }}
 */
export function extractCanonicalDelivery(rawText) {
  if (!rawText || typeof rawText !== 'string') {
    return {
      canonicalCode: '',
      deliberation: '',
      verification: '',
      extractionMode: 'raw_fallback',
      isTruncated: false,
      hasCanonicalBoundary: false
    };
  }

  // 1. Check for output truncation indicators
  const isTruncated = detectTruncation(rawText);

  // 2. Priority 1: Strict <canonical_delivery> XML Tag Extraction
  const canonicalMatch = rawText.match(/<canonical_delivery>([\s\S]*?)<\/canonical_delivery>/i);
  if (canonicalMatch) {
    const rawDelivery = canonicalMatch[1].trim();
    // Clean any nested code fences if model wrapped code in ``` inside the tag
    const unwrappedCode = unwrapCodeFences(rawDelivery);

    const deliberationMatch = rawText.match(/<deliberation_and_spec>([\s\S]*?)<\/deliberation_and_spec>/i) ||
                              rawText.match(/<analysis>([\s\S]*?)<\/analysis>/i);
    const verificationMatch = rawText.match(/<verification>([\s\S]*?)<\/verification>/i) ||
                              rawText.match(/<qa_summary>([\s\S]*?)<\/qa_summary>/i);

    // Check truncation strictly on the extracted canonical code, not trailing deliberation prose
    const canonicalTruncated = detectTruncation(unwrappedCode);

    return {
      canonicalCode: unwrappedCode,
      deliberation: deliberationMatch ? deliberationMatch[1].trim() : '',
      verification: verificationMatch ? verificationMatch[1].trim() : '',
      extractionMode: 'xml_canonical',
      isTruncated: canonicalTruncated,
      hasCanonicalBoundary: true
    };
  }

  // 3. Priority 2: Unclosed <canonical_delivery> due to truncation (Fail-closed diagnostic capture)
  const unclosedMatch = rawText.match(/<canonical_delivery>([\s\S]*)$/i);
  if (unclosedMatch && isTruncated) {
    const unclosedCode = unwrapCodeFences(unclosedMatch[1].trim());
    return {
      canonicalCode: unclosedCode,
      deliberation: '',
      verification: '',
      extractionMode: 'xml_canonical',
      isTruncated: true,
      hasCanonicalBoundary: true
    };
  }

  // 4. Priority 3: Explicit ```canonical or ```production Code Fence
  const taggedFenceMatch = rawText.match(/```(?:canonical|production|delivery)\s*\n([\s\S]*?)```/i);
  if (taggedFenceMatch) {
    return {
      canonicalCode: taggedFenceMatch[1].trim(),
      deliberation: '',
      verification: '',
      extractionMode: 'fenced_canonical',
      isTruncated,
      hasCanonicalBoundary: true
    };
  }

  // 5. Priority 4: Standard Markdown Code Fences (Take largest or final implementation fence)
  const codeBlocks = [];
  const fenceRegex = /```(?:[a-zA-Z0-9_\-]+)?\s*\n([\s\S]*?)```/g;
  let match;
  while ((match = fenceRegex.exec(rawText)) !== null) {
    const block = match[1].trim();
    // Exclude JSON specs or bash install snippets if there are multiple blocks
    if (block.length > 0) {
      codeBlocks.push(block);
    }
  }

  if (codeBlocks.length > 0) {
    // If multiple blocks, prefer the one with function/class/export definitions
    const codeBlock = selectBestCodeBlock(codeBlocks);
    return {
      canonicalCode: codeBlock,
      deliberation: '',
      verification: '',
      extractionMode: 'fenced_code',
      isTruncated,
      hasCanonicalBoundary: false
    };
  }

  // 6. Priority 5: Unclosed Markdown Code Fence (when truncated mid-code)
  const unclosedFenceMatch = rawText.match(/```(?:[a-zA-Z0-9_\-]+)?\s*\n([\s\S]*)$/);
  if (unclosedFenceMatch && isTruncated) {
    return {
      canonicalCode: unclosedFenceMatch[1].trim(),
      deliberation: '',
      verification: '',
      extractionMode: 'fenced_code',
      isTruncated: true,
      hasCanonicalBoundary: false
    };
  }

  // 7. Priority 6: Fallback to raw text (when no fences used)
  return {
    canonicalCode: rawText.trim(),
    deliberation: '',
    verification: '',
    extractionMode: 'raw_fallback',
    isTruncated,
    hasCanonicalBoundary: false
  };
}

/**
 * Removes surrounding markdown code block syntax (```ts ... ```) if present.
 */
function unwrapCodeFences(text) {
  if (!text) return '';
  const fenceMatch = text.match(/^```(?:[a-zA-Z0-9_\-]+)?\s*\n([\s\S]*?)\n?```$/);
  if (fenceMatch) {
    return fenceMatch[1].trim();
  }
  // If there are multiple fences inside, join them
  const innerFences = [];
  const regex = /```(?:[a-zA-Z0-9_\-]+)?\s*\n([\s\S]*?)```/g;
  let m;
  while ((m = regex.exec(text)) !== null) {
    innerFences.push(m[1].trim());
  }
  return innerFences.length > 0 ? innerFences.join('\n\n') : text.trim();
}

/**
 * Selects the most plausible canonical code deliverable from multiple code blocks.
 */
function selectBestCodeBlock(blocks) {
  if (blocks.length === 1) return blocks[0];

  // Rank blocks by code indicator keywords (export, function, class, const, interface)
  let bestBlock = blocks[blocks.length - 1]; // default to last (usually final delivery)
  let maxScore = -1;

  for (const block of blocks) {
    let score = 0;
    if (/export\s+(default\s+)?(function|class|const|async)/.test(block)) score += 10;
    if (/interface\s+[A-Z]|type\s+[A-Z]/.test(block)) score += 5;
    if (/import\s+/.test(block)) score += 3;
    if (/return\s+/.test(block)) score += 2;
    if (score > maxScore) {
      maxScore = score;
      bestBlock = block;
    }
  }

  return bestBlock;
}

/**
 * Detects whether the completion was abruptly truncated.
 */
export function detectTruncation(text) {
  if (!text || typeof text !== 'string') return false;

  // Check unclosed code fences
  const fenceCount = (text.match(/```/g) || []).length;
  if (fenceCount % 2 !== 0) return true;

  // Check unclosed canonical tags
  const openCanonical = (text.match(/<canonical_delivery>/gi) || []).length;
  const closeCanonical = (text.match(/<\/canonical_delivery>/gi) || []).length;
  if (openCanonical > closeCanonical) return true;

  // Check trailing incomplete statements
  const trimmed = text.trim();
  const trailingTruncationChars = [
    /,\s*$/,
    /\(\s*$/,
    /\{\s*$/,
    /\[\s*$/,
    /=>\s*$/,
    /\+\s*$/,
    /\|\s*$/,
    /:\s*$/
  ];

  for (const pattern of trailingTruncationChars) {
    if (pattern.test(trimmed)) return true;
  }

  return false;
}
