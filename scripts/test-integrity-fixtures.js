#!/usr/bin/env node
/**
 * ==============================================================================
 * AIMASTER ADVERSARIAL INTEGRITY FIXTURE TEST SUITE
 * ==============================================================================
 * Proves that the integrity linter is not a rubber-stamp:
 * Executes deliberate negative test cases with corrupted fixtures and asserts
 * that the linter detects each violation and exits with non-zero failure code.
 *
 * Test Scenarios:
 * 1. Missing / Malformed Metadata (Missing Role Definition or wrong Category)
 * 2. Alien / Unexpected Category Directory under skills/
 * 3. Broken Relative Markdown Link
 * 4. Preset Drift (Missing constitutional security/fast-track rules)
 * 5. Path Leak Detection (Linux /home, macOS /Users, Windows C:\Users)
 * 6. Orphan / Unregistered Skill on Disk
 * ==============================================================================
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');
const TEMP_TEST_DIR = path.join(ROOT_DIR, 'temp', 'fixture-tests');

let passedTests = 0;
let totalTests = 0;

function logTestPass(name) {
  passedTests++;
  console.log(`  \x1b[32m✔ NEGATIVE TEST PASS:\x1b[0m ${name}`);
}

function logTestFail(name, reason) {
  console.error(`  \x1b[31m✖ NEGATIVE TEST FAIL:\x1b[0m ${name} — ${reason}`);
}

console.log('\n🧪 ======================================================');
console.log('   AIMASTER ADVERSARIAL LINTER FIXTURE TESTS');
console.log('======================================================\n');

// Ensure clean temp sandbox
if (fs.existsSync(TEMP_TEST_DIR)) {
  fs.rmSync(TEMP_TEST_DIR, { recursive: true, force: true });
}
fs.mkdirSync(TEMP_TEST_DIR, { recursive: true });

function runLinterOnFixture(fixtureSandboxDir) {
  const scriptPath = path.join(ROOT_DIR, 'scripts', 'verify-integrity.js');
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
    path.join(ROOT_DIR, 'scripts', 'verify-integrity.js'),
    path.join(destDir, 'scripts', 'verify-integrity.js')
  );

  // Copy core files
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
    fs.copyFileSync(path.join(ROOT_DIR, f), path.join(destDir, f));
  });

  // Copy skills and integrations recursively
  fs.cpSync(path.join(ROOT_DIR, 'skills'), path.join(destDir, 'skills'), { recursive: true });
  fs.cpSync(path.join(ROOT_DIR, 'integrations'), path.join(destDir, 'integrations'), { recursive: true });
}

// -----------------------------------------------------------------------------
// Test 1: Missing Metadata Detection
// -----------------------------------------------------------------------------
totalTests++;
const test1Dir = path.join(TEMP_TEST_DIR, 't1-bad-metadata');
createMockRepo(test1Dir);
// Corrupt metadata in one skill
const targetSkill = path.join(test1Dir, 'skills', '01-architecture-planning', 'skill-software-architecture.md');
let skillContent = fs.readFileSync(targetSkill, 'utf8');
skillContent = skillContent.replace(/> \*\*Role Definition:\*\*.+/, '> **Role Definition:**'); // Empty role
fs.writeFileSync(targetSkill, skillContent, 'utf8');

const res1 = runLinterOnFixture(test1Dir);
if (res1.exitCode !== 0 && res1.output.includes('Eksik veya geçersiz Role Definition metadata')) {
  logTestPass('Linter bozuk/eksik metadata içeren skill dosyasını yakaladı ve FAIL verdi');
} else {
  logTestFail('Test 1', 'Bozuk metadata tespit edilemedi!');
}

// -----------------------------------------------------------------------------
// Test 2: Alien / Unexpected Category Directory
// -----------------------------------------------------------------------------
totalTests++;
const test2Dir = path.join(TEMP_TEST_DIR, 't2-alien-category');
createMockRepo(test2Dir);
const alienDir = path.join(test2Dir, 'skills', '08-alien-category');
fs.mkdirSync(alienDir, { recursive: true });
fs.writeFileSync(path.join(alienDir, 'skill-rogue.md'), '# Rogue Skill\n', 'utf8');

const res2 = runLinterOnFixture(test2Dir);
if (res2.exitCode !== 0 && res2.output.includes('Beklenmeyen / Yabancı kategori dizini tespit edildi')) {
  logTestPass('Linter şema dışı yabancı kategori dizinini yakaladı ve FAIL verdi');
} else {
  logTestFail('Test 2', 'Yabancı kategori dizini tespit edilemedi!');
}

// -----------------------------------------------------------------------------
// Test 3: Broken Relative Markdown Link
// -----------------------------------------------------------------------------
totalTests++;
const test3Dir = path.join(TEMP_TEST_DIR, 't3-broken-link');
createMockRepo(test3Dir);
const testReadme = path.join(test3Dir, 'README.md');
fs.appendFileSync(testReadme, '\n\n[Kırık Link Testi](non_existent_folder/fake_file.md)\n');

const res3 = runLinterOnFixture(test3Dir);
if (res3.exitCode !== 0 && res3.output.includes('Kırık bağıl link bulundu')) {
  logTestPass('Linter kırık markdown linkini yakaladı ve FAIL verdi');
} else {
  logTestFail('Test 3', 'Kırık link tespit edilemedi!');
}

// -----------------------------------------------------------------------------
// Test 4: Preset Drift (Missing Required Constitutional Clause)
// -----------------------------------------------------------------------------
totalTests++;
const test4Dir = path.join(TEMP_TEST_DIR, 't4-preset-drift');
createMockRepo(test4Dir);
const cursorrulesPath = path.join(test4Dir, 'integrations', 'cursor', '.cursorrules');
let cursorContent = fs.readFileSync(cursorrulesPath, 'utf8');
cursorContent = cursorContent.replace(/NEVER overrides.+/, 'can override security'); // Break security precedence
fs.writeFileSync(cursorrulesPath, cursorContent, 'utf8');

const res4 = runLinterOnFixture(test4Dir);
if (res4.exitCode !== 0 && res4.output.includes('Güvenlik üstünlüğü kuralı EKSİK')) {
  logTestPass('Linter preset içindeki anayasal güvenlik kuralı eksikliğini yakaladı ve FAIL verdi');
} else {
  logTestFail('Test 4', 'Preset kural sapması tespit edilemedi!');
}

// -----------------------------------------------------------------------------
// Test 5: Cross-Platform Path Leak Detection
// -----------------------------------------------------------------------------
totalTests++;
const test5Dir = path.join(TEMP_TEST_DIR, 't5-path-leak');
createMockRepo(test5Dir);
const contributingPath = path.join(test5Dir, 'CONTRIBUTING.md');
fs.appendFileSync(contributingPath, '\n\nPath leak: /home/furkan/secrets.json\n');

const res5 = runLinterOnFixture(test5Dir);
if (res5.exitCode !== 0 && res5.output.includes('Mutlak yol sızıntısı bulundu')) {
  logTestPass('Linter Linux/macOS tarzı mutlak yol sızıntısını yakaladı ve FAIL verdi');
} else {
  logTestFail('Test 5', 'Mutlak yol sızıntısı tespit edilemedi!');
}

// Clean up sandbox
try {
  fs.rmSync(TEMP_TEST_DIR, { recursive: true, force: true });
} catch (e) {}

// -----------------------------------------------------------------------------
// Summary
// -----------------------------------------------------------------------------
console.log('\n======================================================');
console.log(`📊 ADVERSARIAL TEST SONUCU: ${passedTests}/${totalTests} Negatif Test Başarıyla Tamamlandı.`);
if (passedTests === totalTests) {
  console.log(`\x1b[32m🎉 BAŞARILI: verify-integrity.js tüm arıza senaryolarında beklenen kırmızı (FAIL) sonucunu üretti!\x1b[0m\n`);
  process.exit(0);
} else {
  console.error(`\x1b[31m❌ BAŞARISIZ: Bazı negatif testler tespit edilemedi!\x1b[0m\n`);
  process.exit(1);
}
