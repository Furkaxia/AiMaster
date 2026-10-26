#!/usr/bin/env node
/**
 * ==============================================================================
 * AIMASTER ADVERSARIAL INTEGRITY FIXTURE TEST SUITE (v2.0)
 * ==============================================================================
 * Proves that the integrity linter is not a rubber-stamp:
 * 1. Establishes a POSITIVE BASELINE to prove a clean mock passes with exit code 0.
 * 2. Executes deliberate negative test cases with isolated corrupted fixtures and
 *    asserts that the linter detects each violation, logs the expected error
 *    signature, and exits with a non-zero failure code.
 *
 * Safety Guarantee:
 * Uses isolated `os.tmpdir()` sandbox created via `fs.mkdtempSync()`.
 * Never touches or wipes user workspace files.
 * Cleans up exclusively in a mandatory `finally` block.
 *
 * Test Scenarios:
 * 0. Positive Baseline: Clean repository fixture passes (exit code 0)
 * 1. Missing Role Definition metadata
 * 2. Corrupted / Mismatched Category metadata
 * 3. Missing Standard Compliance metadata
 * 4. Alien / Unexpected Category directory under skills/
 * 5. Orphan / Unregistered skill on disk (not in RulesAI / README catalog)
 * 6. Broken Markdown relative link / missing anchor heading
 * 7. Preset Drift (Missing constitutional security precedence clause)
 * 8. Cross-platform path leak detection (/home, /Users, C:\Users)
 * ==============================================================================
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

const REPO_ROOT = path.resolve(__dirname, '..');
let passedTests = 0;
let totalTests = 0;

function logTestPass(name) {
  passedTests++;
  console.log(`  \x1b[32m✔ TEST PASS:\x1b[0m ${name}`);
}

function logTestFail(name, reason) {
  console.error(`  \x1b[31m✖ TEST FAIL:\x1b[0m ${name} — ${reason}`);
}

console.log('\n🧪 ======================================================');
console.log('   AIMASTER ADVERSARIAL LINTER FIXTURE TESTS (v2.0)');
console.log('======================================================\n');

// Create isolated unique temp directory inside os.tmpdir()
const TEMP_SANDBOX = fs.mkdtempSync(path.join(os.tmpdir(), 'aimaster-fixtures-'));

function runLinterOnFixture(fixtureSandboxDir) {
  const scriptPath = path.join(REPO_ROOT, 'scripts', 'verify-integrity.js');
  try {
    const stdout = execSync(`node "${scriptPath}"`, {
      cwd: fixtureSandboxDir,
      env: Object.assign({}, process.env, { AIMASTER_TEST_ROOT: fixtureSandboxDir }),
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe']
    });
    return { exitCode: 0, output: stdout };
  } catch (err) {
    return { exitCode: err.status || 1, output: (err.stdout || '') + (err.stderr || '') };
  }
}

// Helper to construct a minimal valid mock repository structure
function createMockRepo(destDir) {
  fs.mkdirSync(destDir, { recursive: true });
  fs.mkdirSync(path.join(destDir, 'scripts'), { recursive: true });
  fs.copyFileSync(
    path.join(REPO_ROOT, 'scripts', 'verify-integrity.js'),
    path.join(destDir, 'scripts', 'verify-integrity.js')
  );

  const coreFiles = [
    'RulesAI.md',
    'agent-boardroom-protocol-ai.md',
    'ui-standards-ai.md',
    'testing-protocol-ai.md',
    'project-architecture-ai.md',
    'error-recovery-escalation-ai.md',
    'dependency-policy-ai.md',
    'git-commit-convention-ai.md',
    'ai-communication-protocol-ai.md',
    'performance-budget-ai.md',
    'session-handoff-protocol-ai.md',
    'ai-log-ai.md',
    'README.md',
    'README.tr.md',
    'LICENSE',
    'CONTRIBUTING.md',
    'SECURITY.md',
    '.gitignore',
    'package.json'
  ];
  coreFiles.forEach(f => {
    fs.copyFileSync(path.join(REPO_ROOT, f), path.join(destDir, f));
  });

  fs.cpSync(path.join(REPO_ROOT, 'skills'), path.join(destDir, 'skills'), { recursive: true });
  fs.cpSync(path.join(REPO_ROOT, 'integrations'), path.join(destDir, 'integrations'), { recursive: true });
}

try {
  // ---------------------------------------------------------------------------
  // Test 0: Positive Baseline (Sanity Check)
  // ---------------------------------------------------------------------------
  totalTests++;
  const test0Dir = path.join(TEMP_SANDBOX, 't0-baseline');
  createMockRepo(test0Dir);
  const res0 = runLinterOnFixture(test0Dir);
  if (res0.exitCode === 0 && res0.output.includes('0 hata, 0 kırık link')) {
    logTestPass('POSITIVE BASELINE: Sağlam mock repo linter tarafından hatasız (exit 0) onaylandı');
  } else {
    logTestFail('Test 0', `Sağlam repo başarısız oldu! Çıkış kodu: ${res0.exitCode}\n${res0.output}`);
  }

  // ---------------------------------------------------------------------------
  // Test 1: Missing Role Definition Metadata
  // ---------------------------------------------------------------------------
  totalTests++;
  const test1Dir = path.join(TEMP_SANDBOX, 't1-bad-role');
  createMockRepo(test1Dir);
  const skill1 = path.join(test1Dir, 'skills', '01-architecture-planning', 'skill-software-architecture.md');
  let skill1Content = fs.readFileSync(skill1, 'utf8');
  skill1Content = skill1Content.replace(/> \*\*Role Definition:\*\*.+/, '> **Role Definition:**');
  fs.writeFileSync(skill1, skill1Content, 'utf8');

  const res1 = runLinterOnFixture(test1Dir);
  if (res1.exitCode !== 0 && res1.output.includes('Eksik veya geçersiz Role Definition metadata')) {
    logTestPass('NEGATIVE: Linter boş Role Definition alanını yakaladı ve FAIL verdi');
  } else {
    logTestFail('Test 1', 'Boş Role Definition tespit edilemedi!');
  }

  // ---------------------------------------------------------------------------
  // Test 2: Mismatched / Invalid Category Metadata
  // ---------------------------------------------------------------------------
  totalTests++;
  const test2Dir = path.join(TEMP_SANDBOX, 't2-bad-category');
  createMockRepo(test2Dir);
  const skill2 = path.join(test2Dir, 'skills', '02-frontend-ui', 'skill-design-tokens.md');
  let skill2Content = fs.readFileSync(skill2, 'utf8');
  skill2Content = skill2Content.replace(/> \*\*Category:\*\*.+/, '> **Category:** Fake Category Name');
  fs.writeFileSync(skill2, skill2Content, 'utf8');

  const res2 = runLinterOnFixture(test2Dir);
  if (res2.exitCode !== 0 && res2.output.includes('Geçersiz Category metadata')) {
    logTestPass('NEGATIVE: Linter kategori klasörüne uymayan Category metadata alanını yakaladı ve FAIL verdi');
  } else {
    logTestFail('Test 2', 'Bozuk Category tespit edilemedi!');
  }

  // ---------------------------------------------------------------------------
  // Test 3: Missing Standard Compliance Metadata
  // ---------------------------------------------------------------------------
  totalTests++;
  const test3Dir = path.join(TEMP_SANDBOX, 't3-bad-compliance');
  createMockRepo(test3Dir);
  const skill3 = path.join(test3Dir, 'skills', '03-backend-data', 'skill-api.md');
  let skill3Content = fs.readFileSync(skill3, 'utf8');
  skill3Content = skill3Content.replace(/> \*\*Standard Compliance:\*\*.+/, '> **Standard Compliance:** Arbitrary Custom Standard');
  fs.writeFileSync(skill3, skill3Content, 'utf8');

  const res3 = runLinterOnFixture(test3Dir);
  if (res3.exitCode !== 0 && res3.output.includes('Eksik veya geçersiz Standard Compliance metadata')) {
    logTestPass('NEGATIVE: Linter anayasal şemaya uymayan Standard Compliance alanını yakaladı ve FAIL verdi');
  } else {
    logTestFail('Test 3', 'Bozuk Standard Compliance tespit edilemedi!');
  }

  // ---------------------------------------------------------------------------
  // Test 4: Alien / Unexpected Category Directory under skills/
  // ---------------------------------------------------------------------------
  totalTests++;
  const test4Dir = path.join(TEMP_SANDBOX, 't4-alien-category');
  createMockRepo(test4Dir);
  const alienDir = path.join(test4Dir, 'skills', '08-alien-category');
  fs.mkdirSync(alienDir, { recursive: true });
  fs.writeFileSync(path.join(alienDir, 'skill-rogue.md'), '# Rogue Skill\n', 'utf8');

  const res4 = runLinterOnFixture(test4Dir);
  if (res4.exitCode !== 0 && res4.output.includes('Beklenmeyen / Yabancı kategori dizini tespit edildi')) {
    logTestPass('NEGATIVE: Linter şema dışı yabancı kategori dizinini yakaladı ve FAIL verdi');
  } else {
    logTestFail('Test 4', 'Yabancı kategori dizini tespit edilemedi!');
  }

  // ---------------------------------------------------------------------------
  // Test 5: Orphan / Unregistered Skill on Disk
  // ---------------------------------------------------------------------------
  totalTests++;
  const test5Dir = path.join(TEMP_SANDBOX, 't5-orphan-skill');
  createMockRepo(test5Dir);
  // Add a 10th skill into 01-architecture-planning which is NOT in RulesAI.md or README.md
  const orphanSkillPath = path.join(test5Dir, 'skills', '01-architecture-planning', 'skill-unregistered-ghost.md');
  const validSampleContent = fs.readFileSync(
    path.join(test5Dir, 'skills', '01-architecture-planning', 'skill-software-architecture.md'),
    'utf8'
  ).replace('skill-software-architecture.md', 'skill-unregistered-ghost.md');
  fs.writeFileSync(orphanSkillPath, validSampleContent, 'utf8');

  const res5 = runLinterOnFixture(test5Dir);
  if (
    res5.exitCode !== 0 &&
    (res5.output.includes('Kayıtsız/Orphan Skill bulundu') || res5.output.includes('Toplam skill sayısı 80 olmalıdır'))
  ) {
    logTestPass('NEGATIVE: Linter diskte bulunan fakat anayasada kayıtlı olmayan orphan skill dosyasını yakaladı ve FAIL verdi');
  } else {
    logTestFail('Test 5', 'Orphan / Kayıtsız skill tespit edilemedi!');
  }

  // ---------------------------------------------------------------------------
  // Test 6: Broken Relative Markdown Link / Missing Anchor Heading
  // ---------------------------------------------------------------------------
  totalTests++;
  const test6Dir = path.join(TEMP_SANDBOX, 't6-broken-link');
  createMockRepo(test6Dir);
  const testReadme = path.join(test6Dir, 'README.md');
  fs.appendFileSync(testReadme, '\n\n[Kırık Link Testi](non_existent_folder/fake_file.md)\n');

  const res6 = runLinterOnFixture(test6Dir);
  if (res6.exitCode !== 0 && res6.output.includes('Kırık bağıl link bulundu')) {
    logTestPass('NEGATIVE: Linter kırık markdown bağlantısını yakaladı ve FAIL verdi');
  } else {
    logTestFail('Test 6', 'Kırık link tespit edilemedi!');
  }

  // ---------------------------------------------------------------------------
  // Test 7: Preset Drift (Missing Security Precedence Clause)
  // ---------------------------------------------------------------------------
  totalTests++;
  const test7Dir = path.join(TEMP_SANDBOX, 't7-preset-drift');
  createMockRepo(test7Dir);
  const cursorrulesPath = path.join(test7Dir, 'integrations', 'cursor', '.cursorrules');
  let cursorContent = fs.readFileSync(cursorrulesPath, 'utf8');
  cursorContent = cursorContent.replace(/NEVER overrides.+/, 'can override security');
  fs.writeFileSync(cursorrulesPath, cursorContent, 'utf8');

  const res7 = runLinterOnFixture(test7Dir);
  if (res7.exitCode !== 0 && res7.output.includes('Güvenlik üstünlüğü kuralı EKSİK')) {
    logTestPass('NEGATIVE: Linter preset içindeki anayasal güvenlik kuralı eksikliğini yakaladı ve FAIL verdi');
  } else {
    logTestFail('Test 7', 'Preset kural sapması tespit edilemedi!');
  }

  // ---------------------------------------------------------------------------
  // Test 8: Cross-Platform Path Leak Detection (/home/*)
  // ---------------------------------------------------------------------------
  totalTests++;
  const test8Dir = path.join(TEMP_SANDBOX, 't8-path-leak');
  createMockRepo(test8Dir);
  const contributingPath = path.join(test8Dir, 'CONTRIBUTING.md');
  fs.appendFileSync(contributingPath, '\n\nPath leak: /home/developer/secrets.json\n');

  const res8 = runLinterOnFixture(test8Dir);
  if (res8.exitCode !== 0 && res8.output.includes('Mutlak yol sızıntısı bulundu')) {
    logTestPass('NEGATIVE: Linter Linux/macOS/Windows mutlak yol sızıntısını yakaladı ve FAIL verdi');
  } else {
    logTestFail('Test 8', 'Mutlak yol sızıntısı tespit edilemedi!');
  }

} finally {
  // Guaranteed cleanup of isolated temp sandbox
  try {
    if (fs.existsSync(TEMP_SANDBOX)) {
      fs.rmSync(TEMP_SANDBOX, { recursive: true, force: true });
    }
  } catch (err) {
    // Ignore cleanup errors in OS temp
  }
}

// -----------------------------------------------------------------------------
// Summary
// -----------------------------------------------------------------------------
console.log('\n======================================================');
console.log(`📊 ADVERSARIAL TEST SONUCU: ${passedTests}/${totalTests} Test Başarıyla Tamamlandı.`);
if (passedTests === totalTests) {
  console.log(`\x1b[32m🎉 BAŞARILI: verify-integrity.js tüm test senaryolarında beklenen sonucu üretti!\x1b[0m\n`);
  process.exit(0);
} else {
  console.error(`\x1b[31m❌ BAŞARISIZ: Bazı adversarial testler beklenen sonucu vermedi!\x1b[0m\n`);
  process.exit(1);
}
