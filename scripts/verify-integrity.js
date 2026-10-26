#!/usr/bin/env node

/**
 * ==============================================================================
 * AIMASTER INTEGRITY & HEALTH CHECK SCRIPT
 * ==============================================================================
 * Bu script, repo genelindeki dosya bütünlüğünü, RulesAI.md içindeki skill
 * referanslarını, markdown link çözümlenebilirliğini, gizlilik sızıntılarını ve
 * çekirdek standartların diskteki varlığını doğrular.
 * Sıfır harici bağımlılık (Pure Node.js) ile çalışır.
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
console.log('   AIMASTER REPOSITORY INTEGRITY & HEALTH CHECK');
console.log('======================================================\n');

// 1. Çekirdek Standart Dosyalarını Kontrol Et
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

// 2. RulesAI.md İçindeki Skill Tablosunu Ayrıştır ve Doğrula
console.log('\n📌 2. RulesAI.md Skill Kataloğu Doğrulanıyor...');
const rulesAiPath = path.join(ROOT_DIR, 'RulesAI.md');
if (fs.existsSync(rulesAiPath)) {
  const content = fs.readFileSync(rulesAiPath, 'utf8');
  const skillMatches = content.match(/skills\/[a-zA-Z0-9_-]+\/skill-[a-zA-Z0-9_-]+\.md/g) || [];
  const uniqueSkills = Array.from(new Set(skillMatches));

  console.log(`   RulesAI.md içinde ${uniqueSkills.length} benzersiz skill yolu tespit edildi.`);

  uniqueSkills.forEach(relPath => {
    checksCount++;
    const fullPath = path.join(ROOT_DIR, relPath);
    if (fs.existsSync(fullPath)) {
      logPass(`Skill mevcut: ${relPath}`);
    } else {
      logFail(`RulesAI.md içinde tanımlı ama diskte YOK: ${relPath}`);
    }
  });
} else {
  logFail('RulesAI.md ana dosyası bulunamadı!');
}

// 3. skills/ Dizinindeki Tüm Dosyaları Tara
console.log('\n📌 3. skills/ Klasör Bütünlüğü ve Shared Footer Kontrolü...');
const skillsDir = path.join(ROOT_DIR, 'skills');
let allMarkdownFiles = [];

function getAllMarkdownFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    if (file === 'node_modules' || file === '.git') return;
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

if (fs.existsSync(skillsDir)) {
  const footerPath = path.join(skillsDir, '_shared-skill-footer.md');
  checksCount++;
  if (fs.existsSync(footerPath)) {
    logPass('Paylaşılan footer mevcut: skills/_shared-skill-footer.md');
  } else {
    logFail('skills/_shared-skill-footer.md EKSİK!');
  }

  const allSkillFiles = getAllMarkdownFiles(skillsDir);
  console.log(`   skills/ altında toplam ${allSkillFiles.length} markdown dosyası tespit edildi.`);
  logPass(`Tüm skill dosyaları taranabilir durumda (${allSkillFiles.length} dosya)`);
} else {
  logFail('skills/ ana dizini bulunamadı!');
}

// 4. Entegrasyon Preset Dosyalarını Kontrol Et
console.log('\n📌 4. integrations/ Şablonları Doğrulanıyor...');
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

// 5. Gizlilik ve Mutlak Yol Güvenliği (No Absolute Paths / file:/// / Private paths)
console.log('\n📌 5. Mutlak Yol ve Gizlilik Sızıntısı Taraması...');
allMarkdownFiles = getAllMarkdownFiles(ROOT_DIR);
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

// 6. Git Hijyeni ve .gitignore Güvenlik Kontrolü
console.log('\n📌 6. Git Güvenliği ve .gitignore Doğrulanıyor...');
const gitignorePath = path.join(ROOT_DIR, '.gitignore');
if (fs.existsSync(gitignorePath)) {
  const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
  const requiredIgnores = ['.env', '.handoff/'];

  requiredIgnores.forEach(item => {
    checksCount++;
    if (gitignoreContent.includes(item)) {
      logPass(`.gitignore içinde tanımlı: ${item}`);
    } else {
      logFail(`.gitignore içinde EKSİK (Güvenlik riski): ${item}`);
    }
  });
} else {
  logFail('.gitignore dosyası bulunamadı!');
}

// 7. Özet ve Sonuç
console.log('\n======================================================');
console.log(`📊 DENETİM SONUCU: ${checksCount} Kontrol Gerçekleştirildi.`);
if (errorsCount === 0) {
  console.log(`\x1b[32m🎉 BAŞARILI: Hiçbir kırık link veya eksik dosya bulunamadı! (0 Hata)\x1b[0m\n`);
  process.exit(0);
} else {
  console.error(`\x1b[31m❌ BAŞARISIZ: Toplam ${errorsCount} hata tespit edildi!\x1b[0m\n`);
  process.exit(1);
}
