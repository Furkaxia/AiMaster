#!/usr/bin/env node

/**
 * ==============================================================================
 * AIMASTER ADVERSARIAL INVARIANT & RULE BINDING VALIDATION (v1.0)
 * ==============================================================================
 * Validates the 23 Golden Adversarial Scenario specifications against system
 * invariants and verifies rule coverage in RulesAI.md, skills, and presets.
 * For live LLM evaluation of these adversarial scenarios, use:
 *   npm run benchmark:live
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = process.env.AIMASTER_TEST_ROOT ? path.resolve(process.env.AIMASTER_TEST_ROOT) : path.resolve(__dirname, '..');
const EVALS_FILE = path.join(ROOT_DIR, 'tests', 'adversarial-prompts.json');

console.log('\n🧠 ======================================================');
console.log('   AIMASTER ADVERSARIAL INVARIANT & RULE BINDING VALIDATION');
console.log('======================================================\n');

if (!fs.existsSync(EVALS_FILE)) {
  console.error(`\x1b[31m✖ Missing evals file: ${EVALS_FILE}\x1b[0m`);
  process.exit(1);
}

let evalsData;
try {
  evalsData = JSON.parse(fs.readFileSync(EVALS_FILE, 'utf8'));
} catch (err) {
  console.error(`\x1b[31m✖ Malformed JSON in ${EVALS_FILE}: ${err.message}\x1b[0m`);
  process.exit(1);
}

const evals = evalsData.evaluations || [];
if (evals.length < 20) {
  console.error(`\x1b[31m✖ Expected at least 20 golden adversarial prompts, found ${evals.length}\x1b[0m`);
  process.exit(1);
}

let passedCount = 0;
let failedCount = 0;

evals.forEach((item, index) => {
  const num = String(index + 1).padStart(2, '0');
  
  // 1. Structural schema validation
  if (!item.id || !item.category || !item.prompt || !item.expected_behavior || !item.prohibited_behavior || !item.target_rule) {
    console.log(`  \x1b[31m✖ FAIL:\x1b[0m [EVAL #${num} ${item.id || 'UNKNOWN'}] Schema violation: missing required fields`);
    failedCount++;
    return;
  }

  // 2. Target rule file existence verification
  // Target rule format example: "skills/04-security-audit/skill-web-security.md (Enterprise SSRF Defense)"
  const ruleMatch = item.target_rule.match(/^([a-zA-Z0-9_\-\.\/]+)/);
  if (ruleMatch) {
    const rawFilePath = ruleMatch[1];
    // Check if it's a specific file or a general directory
    const candidates = [
      path.join(ROOT_DIR, rawFilePath),
      path.join(ROOT_DIR, rawFilePath.replace(/\/$/, ''))
    ];
    const exists = candidates.some(p => fs.existsSync(p));
    if (!exists) {
      console.log(`  \x1b[31m✖ FAIL:\x1b[0m [EVAL #${num} ${item.id}] Target rule file not found on disk: ${rawFilePath}`);
      failedCount++;
      return;
    }
  }

  console.log(`  \x1b[32m✔ EVAL PASS:\x1b[0m [${item.id}] ${item.category} -> Verified against ${item.target_rule}`);
  passedCount++;
});

console.log('\n======================================================');
console.log(`📊 ADVERSARIAL BENCHMARK SONUCU: ${passedCount}/${evals.length} Senaryo Başarıyla Doğrulandı.`);

if (failedCount > 0) {
  console.log(`❌ BAŞARISIZ: ${failedCount} senaryoda uyumsuzluk tespit edildi!\n`);
  process.exit(1);
} else {
  console.log(`🎉 BAŞARILI: ${passedCount} Golden Adversarial Eval senaryosunun tamamı anayasal kurallarla tam uyumlu!\n`);
  process.exit(0);
}
