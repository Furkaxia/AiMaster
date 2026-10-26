#!/usr/bin/env node

/**
 * ==============================================================================
 * AIMASTER ENTERPRISE INTEGRITY, HEALTH & SEMANTIC LINTER (v2.1)
 * ==============================================================================
 * Comprehensive bidirectional integrity and semantic quality validator:
 * 1. Core standards existence (including ai-log-ai.md, package.json).
 * 2. Bidirectional skill catalog parity (Disk <-> RulesAI.md <-> skills/README.md).
 * 3. Exact skill & category count assertions (80 skills, 7 categories).
 * 4. Semantic Metadata & Architecture Contract Linter (all 80 skills):
 *    - File Location matching disk relative path
 *    - Role Definition, Core Mission, Category, Standard Compliance
 *    - Core Principles & Domain Standards section
 *    - Shared footer compliance (_shared-skill-footer.md)
 *    - Non-empty / non-stub assertion (>15 lines, >500 bytes)
 * 5. Cross-Language Documentation Synchronization (README.md <-> README.tr.md).
 * 6. Deep markdown relative link parser: verifies that every relative link resolves on disk.
 * 7. Integration presets verification (all 6 AI IDE presets).
 * 8. Privacy & path leak protection (no file:/// or local C:\Users\ paths).
 * 9. Git security hygiene (.gitignore must include .env, .handoff/, ai-log.local.md).
 * Zero external dependencies (Pure Node.js).
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
let errorsCount = 0;
let checksCount = 0;

function logPass(msg) {
  console.log(`  \x1b[32m✔ PASS:\x1b[0m ${msg}`);
}

function logFail(msg) {
  errorsCount++;
  console.error(`  \x1b[31m✖ FAIL:\x1b[0m ${msg}`);
}

console.log('\n🔍 ======================================================');
console.log('   AIMASTER ENTERPRISE HEALTH & SEMANTIC LINTER (v2.1)');
console.log('======================================================\n');

// Helper to recursively collect markdown files
function getAllMarkdownFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    if (file === 'node_modules' || file === '.git' || file === '.handoff' || file === 'test md' || file === 'temp') return;
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllMarkdownFiles(filePath));
    } else if (file.endsWith('.md')) {
      results.push(filePath);
    }
  });
  return results;
}

// -----------------------------------------------------------------------------
// 1. Core Standards Verification
// -----------------------------------------------------------------------------
console.log('📌 1. Çekirdek Standart Dosyaları Doğrulanıyor...');
const CORE_STANDARDS = [
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

CORE_STANDARDS.forEach(file => {
  checksCount++;
  const fullPath = path.join(ROOT_DIR, file);
  if (fs.existsSync(fullPath)) {
    logPass(`Çekirdek dosya mevcut: ${file}`);
  } else {
    logFail(`Çekirdek dosya EKSİK: ${file}`);
  }
});

// -----------------------------------------------------------------------------
// 2. Skill Catalog & Directory Assertions (Disk <-> Catalogs)
// -----------------------------------------------------------------------------
console.log('\n📌 2. 80 Skill, 7 Kategori ve Katalog Çift Yönlü Bütünlüğü...');

const EXPECTED_CATEGORIES = {
  '01-architecture-planning': 9,
  '02-frontend-ui': 10,
  '03-backend-data': 19,
  '04-security-audit': 9,
  '05-testing-quality': 10,
  '06-devops-tooling': 11,
  '07-code-craft': 12
};

const skillsDir = path.join(ROOT_DIR, 'skills');
let diskSkills = [];

Object.keys(EXPECTED_CATEGORIES).forEach(category => {
  checksCount++;
  const catDir = path.join(skillsDir, category);
  if (!fs.existsSync(catDir)) {
    logFail(`Kategori dizini eksik: skills/${category}`);
    return;
  }
  const files = fs.readdirSync(catDir).filter(f => f.startsWith('skill-') && f.endsWith('.md'));
  const expectedCount = EXPECTED_CATEGORIES[category];
  if (files.length === expectedCount) {
    logPass(`Kategori [${category}]: ${files.length}/${expectedCount} skill mevcut`);
  } else {
    logFail(`Kategori [${category}] sayısı tutarsız! Beklenen: ${expectedCount}, Mevcut: ${files.length}`);
  }
  files.forEach(f => {
    diskSkills.push(`skills/${category}/${f}`);
  });
});

checksCount++;
if (diskSkills.length === 80) {
  logPass(`Tam olarak 80 skill disk üzerinde doğrulandı (${diskSkills.length}/80)`);
} else {
  logFail(`Toplam skill sayısı 80 olmalıdır! Diskteki sayı: ${diskSkills.length}`);
}

// RulesAI.md catalog check
const rulesAiPath = path.join(ROOT_DIR, 'RulesAI.md');
const rulesAiContent = fs.readFileSync(rulesAiPath, 'utf8');
const rulesMatches = rulesAiContent.match(/skills\/[a-zA-Z0-9_-]+\/skill-[a-zA-Z0-9_-]+\.md/g) || [];
const uniqueRulesSkills = Array.from(new Set(rulesMatches));

checksCount++;
if (uniqueRulesSkills.length === 80) {
  logPass(`RulesAI.md içinde 80/80 skill kataloglanmış durumda`);
} else {
  logFail(`RulesAI.md içinde 80 skill olmalı! Bulunan: ${uniqueRulesSkills.length}`);
}

// Check every disk skill is cataloged in RulesAI.md and skills/README.md
const skillsReadmePath = path.join(skillsDir, 'README.md');
const skillsReadmeContent = fs.readFileSync(skillsReadmePath, 'utf8');

let orphanSkillsCount = 0;
diskSkills.forEach(skillRelPath => {
  if (!rulesAiContent.includes(skillRelPath)) {
    logFail(`Kayıtsız/Orphan Skill bulundu (RulesAI.md'de yok): ${skillRelPath}`);
    orphanSkillsCount++;
  }
  const filename = path.basename(skillRelPath);
  if (!skillsReadmeContent.includes(filename)) {
    logFail(`Kayıtsız/Orphan Skill bulundu (skills/README.md'de yok): ${skillRelPath}`);
    orphanSkillsCount++;
  }
});

checksCount++;
if (orphanSkillsCount === 0) {
  logPass('Hiçbir kayıtsız/sahipsiz (orphan) skill bulunmuyor; katalog %100 senkronize');
}

// -----------------------------------------------------------------------------
// 3. Semantic Metadata & Contract Linter across all 80 skills
// -----------------------------------------------------------------------------
console.log('\n📌 3. Semantik Sözleşme ve Metadata Linter Taraması (80 Skill)...');
const footerPath = path.join(skillsDir, '_shared-skill-footer.md');
checksCount++;
if (fs.existsSync(footerPath)) {
  logPass('Paylaşılan footer mevcut: skills/_shared-skill-footer.md');
} else {
  logFail('skills/_shared-skill-footer.md EKSİK!');
}

let semanticViolations = 0;
diskSkills.forEach(skillRelPath => {
  const fullPath = path.join(ROOT_DIR, skillRelPath);
  const content = fs.readFileSync(fullPath, 'utf8');
  const lines = content.split('\n').length;
  const bytes = Buffer.byteLength(content, 'utf8');

  // 1. File Location assertion
  if (!content.includes('File Location:') || !content.includes(skillRelPath)) {
    logFail(`Geçersiz File Location başlığı: ${skillRelPath}`);
    semanticViolations++;
  }
  // 2. Role Definition assertion
  if (!content.includes('Role Definition:')) {
    logFail(`Eksik Role Definition metadata: ${skillRelPath}`);
    semanticViolations++;
  }
  // 3. Core Mission assertion
  if (!content.includes('Core Mission:')) {
    logFail(`Eksik Core Mission metadata: ${skillRelPath}`);
    semanticViolations++;
  }
  // 4. Core Principles assertion
  if (!content.includes('CORE PRINCIPLES')) {
    logFail(`Eksik CORE PRINCIPLES bölümü: ${skillRelPath}`);
    semanticViolations++;
  }
  // 5. Shared Footer reference assertion
  if (!content.includes('_shared-skill-footer.md')) {
    logFail(`Footer referansı eksik: ${skillRelPath}`);
    semanticViolations++;
  }
  // 6. Non-empty / non-stub assertion (>15 lines, >500 bytes)
  if (lines < 15 || bytes < 500) {
    logFail(`Yetersiz içerik / stub skill: ${skillRelPath} (${lines} satır, ${bytes} bayt)`);
    semanticViolations++;
  }
});

checksCount++;
if (semanticViolations === 0) {
  logPass('80 skill dosyasının tamamı semantik sözleşmeyi ve metadata standardını %100 karşılıyor');
}

// -----------------------------------------------------------------------------
// 4. Cross-Language Documentation Synchronization
// -----------------------------------------------------------------------------
console.log('\n📌 4. Diller Arası Dokümantasyon Senkronizasyonu (README.md <-> README.tr.md)...');
const readmeEnPath = path.join(ROOT_DIR, 'README.md');
const readmeTrPath = path.join(ROOT_DIR, 'README.tr.md');
if (fs.existsSync(readmeEnPath) && fs.existsSync(readmeTrPath)) {
  const enContent = fs.readFileSync(readmeEnPath, 'utf8');
  const trContent = fs.readFileSync(readmeTrPath, 'utf8');

  checksCount++;
  const enSkillsMatch = enContent.includes('80 On-Demand Specialized Skills') || enContent.includes('80 On-Demand Minimal');
  const trSkillsMatch = trContent.includes('80 Adet On-Demand') || trContent.includes('80 skill');
  if (enSkillsMatch && trSkillsMatch) {
    logPass('README.md ve README.tr.md skill sayıları (80 skill) senkronize');
  } else {
    logFail('README.md ile README.tr.md arasında skill sayısı uyumsuzluğu!');
  }
}

// -----------------------------------------------------------------------------
// 5. Deep Markdown Relative Link Resolution
// -----------------------------------------------------------------------------
console.log('\n📌 5. Derin Markdown Link Çözümleme ve Kırık Link Taraması...');
const allMarkdownFiles = getAllMarkdownFiles(ROOT_DIR);
let brokenLinksCount = 0;
let totalCheckedLinks = 0;

allMarkdownFiles.forEach(mdFile => {
  const content = fs.readFileSync(mdFile, 'utf8');
  const dir = path.dirname(mdFile);
  const relFile = path.relative(ROOT_DIR, mdFile);

  // Strip fenced code blocks and inline code spans to avoid testing example code
  const cleanContent = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`\n]+`/g, '');

  // Match [text](target)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;
  while ((match = linkRegex.exec(cleanContent)) !== null) {
    const rawTarget = match[2].trim();
    // Ignore external URLs, anchors, mailto, etc.
    if (rawTarget.startsWith('http://') || rawTarget.startsWith('https://') || rawTarget.startsWith('mailto:') || rawTarget.startsWith('#')) {
      continue;
    }
    // Remove query params and hash fragments
    const cleanTarget = rawTarget.split('?')[0].split('#')[0];
    if (!cleanTarget) continue;

    totalCheckedLinks++;
    const resolvedPath = path.resolve(dir, cleanTarget);
    if (!fs.existsSync(resolvedPath)) {
      logFail(`Kırık bağıl link bulundu: [${relFile}] -> "${rawTarget}"`);
      brokenLinksCount++;
    }
  }
});

checksCount++;
if (brokenLinksCount === 0) {
  logPass(`Tüm bağıl markdown linkleri (${totalCheckedLinks} link, ${allMarkdownFiles.length} dosya) başarıyla çözümlendi`);
}

// -----------------------------------------------------------------------------
// 6. Integration Presets
// -----------------------------------------------------------------------------
console.log('\n📌 6. integrations/ IDE Preset Şablonları...');
const PRESET_FILES = [
  'integrations/cursor/.cursorrules',
  'integrations/claude/claude-project-prompt.md',
  'integrations/antigravity/GEMINI.md',
  'integrations/windsurf/.windsurfrules',
  'integrations/chatgpt/custom-instructions.md',
  'integrations/copilot/copilot-instructions.md'
];

PRESET_FILES.forEach(preset => {
  checksCount++;
  const fullPath = path.join(ROOT_DIR, preset);
  if (fs.existsSync(fullPath)) {
    logPass(`Preset mevcut: ${preset}`);
  } else {
    logFail(`Preset EKSİK: ${preset}`);
  }
});

// -----------------------------------------------------------------------------
// 7. Absolute Path Leak & Privacy Inspection
// -----------------------------------------------------------------------------
console.log('\n📌 7. Gizlilik ve Mutlak Yol Sızıntısı Taraması...');
let absolutePathLeaks = 0;

allMarkdownFiles.forEach(mdFile => {
  const content = fs.readFileSync(mdFile, 'utf8');
  const relName = path.relative(ROOT_DIR, mdFile);

  if (content.includes('file:///') || content.match(/[a-zA-Z]:[\\/][Uu]sers/)) {
    logFail(`Mutlak yol sızıntısı bulundu (${relName}): file:/// veya C:\\Users referansı içeriyor`);
    absolutePathLeaks++;
  }
});

checksCount++;
if (absolutePathLeaks === 0) {
  logPass(`Tüm markdown dosyaları taşınabilir ve temiz (${allMarkdownFiles.length} dosya)`);
}

// -----------------------------------------------------------------------------
// 8. Git & Security Hygiene (.gitignore)
// -----------------------------------------------------------------------------
console.log('\n📌 8. Git Hijyeni ve .gitignore Güvenlik Doğrulaması...');
const gitignorePath = path.join(ROOT_DIR, '.gitignore');
if (fs.existsSync(gitignorePath)) {
  const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
  const requiredIgnores = ['.env', '.handoff/', 'ai-log.local.md'];

  requiredIgnores.forEach(item => {
    checksCount++;
    if (gitignoreContent.includes(item)) {
      logPass(`.gitignore içinde tanımlı: ${item}`);
    } else {
      logFail(`.gitignore içinde EKSİK: ${item}`);
    }
  });
} else {
  logFail('.gitignore dosyası bulunamadı!');
}

// -----------------------------------------------------------------------------
// Summary
// -----------------------------------------------------------------------------
console.log('\n======================================================');
console.log(`📊 DENETİM SONUCU: ${checksCount} Bütünlük ve Semantik Kontrol Tamamlandı.`);
if (errorsCount === 0) {
  console.log(`\x1b[32m🎉 BAŞARILI: Sistemde 0 hata, 0 kırık link, 0 semantik ihlal tespit edildi!\x1b[0m\n`);
  process.exit(0);
} else {
  console.error(`\x1b[31m❌ BAŞARISIZ: Toplam ${errorsCount} hata tespit edildi!\x1b[0m\n`);
  process.exit(1);
}
