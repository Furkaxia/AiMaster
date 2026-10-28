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

const ROOT_DIR = process.env.AIMASTER_TEST_ROOT ? path.resolve(process.env.AIMASTER_TEST_ROOT) : path.resolve(__dirname, '..');
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

// Helper to recursively collect markdown files with explicit error reporting
let scanErrorsCount = 0;
function getAllMarkdownFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  try {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      if (file === 'node_modules' || file === '.git' || file === '.handoff' || file === 'test md' || file === 'temp' || file === 'scratch' || file === '.internal' || file === 'internal' || file.startsWith('.')) return;
      const filePath = path.join(dir, file);
      try {
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
          results = results.concat(getAllMarkdownFiles(filePath));
        } else if (file.endsWith('.md')) {
          results.push(filePath);
        }
      } catch (e) {
        logFail(`Dosya okunamadı/taranamadı: ${filePath} (${e.message})`);
        scanErrorsCount++;
      }
    });
  } catch (err) {
    logFail(`Dizin içeriği okunamadı: ${dir} (${err.message})`);
    scanErrorsCount++;
  }
  return results;
}

// -----------------------------------------------------------------------------
// 1. Core Standards Verification
// -----------------------------------------------------------------------------
console.log('📌 1. Çekirdek Standart Dosyaları Doğrulanıyor...');
const isPackagedDistribution = !fs.existsSync(path.join(ROOT_DIR, '.git')) && !fs.existsSync(path.join(ROOT_DIR, '.gitignore'));

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
  ...(isPackagedDistribution ? [] : ['.gitignore']),
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

// 1. Recursive discovery of ALL skill-*.md files across the entire skills/ tree
function getSkillsOnDisk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        results = results.concat(getSkillsOnDisk(fullPath));
      } else if (entry.isFile() && entry.name.startsWith('skill-') && entry.name.endsWith('.md')) {
        const rel = path.relative(ROOT_DIR, fullPath).replace(/\\/g, '/');
        results.push(rel);
      }
    }
  } catch (err) {
    logFail(`Skill dizini okunamadı: ${dir} (${err.message})`);
    scanErrorsCount++;
  }
  return results;
}

const allSkillsOnDisk = getSkillsOnDisk(skillsDir);

// 2. Verify immediate subdirectories under skills/ — no unexpected categories allowed
const actualCategories = fs.existsSync(skillsDir)
  ? fs.readdirSync(skillsDir).filter(f => {
      const full = path.join(skillsDir, f);
      return fs.statSync(full).isDirectory();
    })
  : [];

let alienCategoriesCount = 0;
actualCategories.forEach(cat => {
  checksCount++;
  if (!EXPECTED_CATEGORIES[cat]) {
    logFail(`Beklenmeyen / Yabancı kategori dizini tespit edildi: skills/${cat}`);
    alienCategoriesCount++;
  }
});
if (alienCategoriesCount === 0) {
  checksCount++;
  logPass(`Tüm kategori dizinleri (${actualCategories.length}/7) anayasal şemayla tam eşleşiyor`);
}

// 3. Category count verification
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

// 4. Assert total recursive count matches exact diskSkills
checksCount++;
if (allSkillsOnDisk.length === 80 && diskSkills.length === 80) {
  logPass(`Tam olarak 80 skill disk üzerinde recursive olarak doğrulandı (${allSkillsOnDisk.length}/80)`);
} else {
  logFail(`Toplam skill sayısı 80 olmalıdır! Recursive bulunan: ${allSkillsOnDisk.length}, Kategorize: ${diskSkills.length}`);
}

const CATEGORY_NAMES = {
  '01-architecture-planning': 'Architecture, Planning & System Design',
  '02-frontend-ui': 'Frontend, UI/UX & Design Standards',
  '03-backend-data': 'Backend, Database & Data Processing',
  '04-security-audit': 'Security, Privacy & Vulnerability Auditing',
  '05-testing-quality': 'Testing, Quality Assurance & Bug Investigation',
  '06-devops-tooling': 'DevOps, Automation & Infrastructure Tooling',
  '07-code-craft': 'Modern Code Craft, Refactoring & Platform Tools'
};

// RulesAI.md catalog check
const rulesAiPath = path.join(ROOT_DIR, 'RulesAI.md');
let rulesAiContent = '';
if (!fs.existsSync(rulesAiPath)) {
  logFail('RulesAI.md dosyası EKSİK!');
} else {
  rulesAiContent = fs.readFileSync(rulesAiPath, 'utf8');
  const rulesMatches = rulesAiContent.match(/skills\/[a-zA-Z0-9_-]+\/skill-[a-zA-Z0-9_-]+\.md/g) || [];
  const uniqueRulesSkills = Array.from(new Set(rulesMatches));

  checksCount++;
  if (uniqueRulesSkills.length === 80) {
    logPass(`RulesAI.md içinde 80/80 skill kataloglanmış durumda`);
  } else {
    logFail(`RulesAI.md içinde 80 skill olmalı! Bulunan: ${uniqueRulesSkills.length}`);
  }
}

// Check every disk skill is cataloged in RulesAI.md and skills/README.md via exact path
const skillsReadmePath = path.join(skillsDir, 'README.md');
let skillsReadmeContent = '';
if (!fs.existsSync(skillsReadmePath)) {
  logFail('skills/README.md dosyası EKSİK!');
} else {
  skillsReadmeContent = fs.readFileSync(skillsReadmePath, 'utf8');
}

let orphanSkillsCount = 0;
diskSkills.forEach(skillRelPath => {
  if (rulesAiContent && !rulesAiContent.includes(skillRelPath)) {
    logFail(`Kayıtsız/Orphan Skill bulundu (RulesAI.md'de yok): ${skillRelPath}`);
    orphanSkillsCount++;
  }
  if (skillsReadmeContent && !skillsReadmeContent.includes(skillRelPath)) {
    logFail(`Kayıtsız/Orphan Skill bulundu (skills/README.md'de tam yol yok): ${skillRelPath}`);
    orphanSkillsCount++;
  }
});

checksCount++;
if (orphanSkillsCount === 0 && rulesAiContent && skillsReadmeContent) {
  logPass('Hiçbir kayıtsız/sahipsiz (orphan) skill bulunmuyor; tam dosya yollarıyla katalog %100 senkronize');
}

// -----------------------------------------------------------------------------
// 3. Semantic Metadata & Architecture Contract Linter (80 Skills)
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
  if (!fs.existsSync(fullPath)) {
    logFail(`Skill dosyası diskte bulunamadı: ${skillRelPath}`);
    semanticViolations++;
    return;
  }
  const content = fs.readFileSync(fullPath, 'utf8');
  const lines = content.split('\n').length;
  const bytes = Buffer.byteLength(content, 'utf8');
  const category = skillRelPath.split('/')[1];

  // 1. File Location assertion (exact relative path)
  const locMatch = content.match(/> \*\*File Location:\*\*[ \t]*`([^`]+)`/);
  if (!locMatch || locMatch[1].trim() !== skillRelPath) {
    logFail(`Geçersiz File Location başlığı: ${skillRelPath} (Bulunan: ${locMatch ? locMatch[1] : 'Yok'})`);
    semanticViolations++;
  }
  // 2. Role Definition assertion
  const roleMatch = content.match(/> \*\*Role Definition:\*\*[ \t]*(.+)/);
  if (!roleMatch || roleMatch[1].trim().length < 5) {
    logFail(`Eksik veya geçersiz Role Definition metadata: ${skillRelPath}`);
    semanticViolations++;
  }
  // 3. Core Mission assertion
  const missionMatch = content.match(/> \*\*Core Mission:\*\*[ \t]*(.+)/);
  if (!missionMatch || missionMatch[1].trim().length < 10) {
    logFail(`Eksik veya geçersiz Core Mission metadata: ${skillRelPath}`);
    semanticViolations++;
  }
  // 4. Category assertion (must match category folder mapping EXACTLY)
  const catMatch = content.match(/> \*\*Category:\*\*[ \t]*(.+)/);
  const expectedCatName = CATEGORY_NAMES[category];
  if (!catMatch || catMatch[1].trim() !== expectedCatName) {
    logFail(`Geçersiz Category metadata: ${skillRelPath} (Beklenen: "${expectedCatName}", Bulunan: "${catMatch ? catMatch[1].trim() : 'Yok'}")`);
    semanticViolations++;
  }
  // 5. Standard Compliance assertion (must match EXACTLY)
  const compMatch = content.match(/> \*\*Standard Compliance:\*\*[ \t]*(.+)/);
  const expectedCompliance = 'AIMASTER Architectural OS Model';
  if (!compMatch || compMatch[1].trim() !== expectedCompliance) {
    logFail(`Eksik veya geçersiz Standard Compliance metadata: ${skillRelPath} (Beklenen: "${expectedCompliance}", Bulunan: "${compMatch ? compMatch[1].trim() : 'Yok'}")`);
    semanticViolations++;
  }
  // 6. Core Principles assertion
  if (!content.includes('CORE PRINCIPLES')) {
    logFail(`Eksik CORE PRINCIPLES bölümü: ${skillRelPath}`);
    semanticViolations++;
  }
  // 7. Shared Footer reference assertion
  if (!content.includes('_shared-skill-footer.md')) {
    logFail(`Footer referansı eksik: ${skillRelPath}`);
    semanticViolations++;
  }
  // 8. Non-empty / non-stub assertion (>15 lines, >500 bytes)
  if (lines < 15 || bytes < 500) {
    logFail(`Yetersiz içerik / stub skill: ${skillRelPath} (${lines} satır, ${bytes} bayt)`);
    semanticViolations++;
  }
});

checksCount++;
if (semanticViolations === 0) {
  logPass('80 skill dosyasının tamamı zorunlu metadata ve yapısal sözleşme kontrollerini (Role, Mission, Category, Compliance, Principles) başarıyla karşıladı');
}

// -----------------------------------------------------------------------------
// 4. Cross-Language Documentation Synchronization & Section Parity
// -----------------------------------------------------------------------------
console.log('\n📌 4. Diller Arası Dokümantasyon Senkronizasyonu ve Bölüm Bütünlüğü (README.md <-> README.tr.md)...');
const readmeEnPath = path.join(ROOT_DIR, 'README.md');
const readmeTrPath = path.join(ROOT_DIR, 'README.tr.md');
if (fs.existsSync(readmeEnPath) && fs.existsSync(readmeTrPath)) {
  const enContent = fs.readFileSync(readmeEnPath, 'utf8');
  const trContent = fs.readFileSync(readmeTrPath, 'utf8');

  // Check 1: Skill and rule metrics
  checksCount++;
  const enSkillsMatch = enContent.includes('80 Specialized Skills') || enContent.includes('80 On-Demand');
  const trSkillsMatch = trContent.includes('80 Uzman Yetkinlik') || trContent.includes('80 Adet On-Demand') || trContent.includes('80 skill');
  if (enSkillsMatch && trSkillsMatch) {
    logPass('README.md ve README.tr.md skill sayıları (80 skill) senkronize');
  } else {
    logFail('README.md ile README.tr.md arasında skill sayısı uyumsuzluğu!');
  }

  // Check 2: Core structural section parity
  const structuralSections = [
    { name: 'Architecture / OS Title', en: 'AIMASTER — AGENTIC OPERATING SYSTEM', tr: 'AIMASTER — AGENTIC OPERATING SYSTEM' },
    { name: 'Problem Definition', en: 'THE PROBLEM', tr: 'PROBLEM' },
    { name: 'Solution Architecture', en: 'THE SOLUTION', tr: 'ÇÖZÜM' },
    { name: 'Token Economics', en: 'ESTIMATED TOKEN ECONOMICS', tr: 'TAHMİNİ TOKEN EKONOMİSİ' },
    { name: 'Boardroom Protocol', en: 'HOW THE AGENTIC BOARDROOM WORKS', tr: 'AGENTIC BOARDROOM NASIL ÇALIŞIR' },
    { name: 'Quickstart', en: 'QUICKSTART', tr: 'HIZLI BAŞLANGIÇ' },
    { name: 'Skills Directory', en: 'SKILLS DIRECTORY', tr: 'YETENEK KATALOĞU' },
    { name: 'Repository Architecture', en: 'REPOSITORY ARCHITECTURE', tr: 'SİSTEM MİMARİSİ VE DOSYA YAPISI' }
  ];

  structuralSections.forEach(sec => {
    checksCount++;
    const hasEn = enContent.toUpperCase().includes(sec.en);
    const hasTr = trContent.toUpperCase().includes(sec.tr);
    if (hasEn && hasTr) {
      logPass(`Çift dilli bölüm yapısı senkronize: [${sec.name}]`);
    } else {
      logFail(`Çift dilli bölüm eksik veya senkronize değil: [${sec.name}] (EN: ${hasEn}, TR: ${hasTr})`);
    }
  });
} else {
  checksCount++;
  logFail('README.md veya README.tr.md dosyalarından biri eksik!');
}

// -----------------------------------------------------------------------------
// 5. Deep CommonMark/GFM Markdown Relative Link & Anchor Heading Verification
// -----------------------------------------------------------------------------
console.log('\n📌 5. Derin Markdown Link Çözümleme ve Başlık Anchor Doğrulaması...');

/**
 * Supported CommonMark & GitHub Flavored Markdown (GFM) Syntax Subset:
 * 1. Links & Images:
 *    - Standard: [text](dest), ![alt](dest)
 *    - Destination with optional title: [text](dest "title"), [text](dest 'title'), [text](dest (title))
 *    - Angle bracket destinations: [text](<dest>), [text](<dest> "title")
 *    - Reference links: [label]: dest, [label]: <dest> "title"
 * 2. Code Fences:
 *    - Backtick fences: 3 or more backticks (```, ````, etc.)
 *    - Tilde fences: 3 or more tildes (~~~, ~~~~, etc.)
 *    - Info string validation (backtick fences cannot contain backticks in info string)
 *    - Matched closing fence rules (matching character, length >= opening length)
 * 3. Headings & Anchors:
 *    - ATX headings: # Heading
 *    - GitHub slugification (emoji removal, punctuation stripping, case folding)
 *    - ASCII normalization variants (Turkish characters: ı->i, ş->s, ğ->g, etc.)
 *    - Sequential duplicate anchor modeling (e.g. #heading, #heading-1, #heading-2)
 */

// Helper to strip all fenced code blocks (``` and ~~~ of any length >=3) and inline code
function stripCodeBlocks(content) {
  const lines = content.split('\n');
  const result = [];
  let openFenceChar = null;
  let openFenceLen = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(/^[ \t]{0,3}(`{3,}|~{3,})(.*)$/);
    if (match) {
      const fenceStr = match[1];
      const char = fenceStr[0];
      const len = fenceStr.length;
      const rest = match[2].trim();

      if (!openFenceChar) {
        if (char === '`' && rest.includes('`')) {
          result.push(line);
          continue;
        }
        openFenceChar = char;
        openFenceLen = len;
        result.push('');
        continue;
      } else {
        if (char === openFenceChar && len >= openFenceLen && rest === '') {
          openFenceChar = null;
          openFenceLen = 0;
          result.push('');
          continue;
        }
      }
    }

    if (openFenceChar) {
      result.push('');
    } else {
      const strippedLine = line.replace(/(`+)(?:(?!\1)[\s\S])*?\1/g, '');
      result.push(strippedLine);
    }
  }

  return result.join('\n');
}

// Helper to verify balanced code fences for both backtick and tilde blocks
function checkCodeFenceBalance(content) {
  const lines = content.split('\n');
  let openFenceChar = null;
  let openFenceLen = 0;
  let openLineNum = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(/^[ \t]{0,3}(`{3,}|~{3,})(.*)$/);
    if (match) {
      const fenceStr = match[1];
      const char = fenceStr[0];
      const len = fenceStr.length;
      const rest = match[2].trim();

      if (!openFenceChar) {
        if (char === '`' && rest.includes('`')) {
          continue;
        }
        openFenceChar = char;
        openFenceLen = len;
        openLineNum = i + 1;
      } else {
        if (char === openFenceChar && len >= openFenceLen && rest === '') {
          openFenceChar = null;
          openFenceLen = 0;
          openLineNum = 0;
        }
      }
    }
  }

  return {
    isBalanced: openFenceChar === null,
    openLineNum,
    openFenceChar,
    openFenceLen
  };
}

// Helper to extract clean destination URL from markdown target (handling titles & angle brackets)
function parseLinkDestination(rawTarget) {
  let trimmed = rawTarget.trim();
  if (!trimmed) return null;

  // Case 1: Enclosed in angle brackets: <destination> [optional title]
  if (trimmed.startsWith('<')) {
    const closeAngle = trimmed.indexOf('>');
    if (closeAngle !== -1) {
      return trimmed.slice(1, closeAngle).trim();
    }
  }

  // Case 2: Standard destination with optional title: destination "title" or 'title' or (title)
  const titleMatch = trimmed.match(/^([^\s]+)(?:\s+(?:"[^"]*"|'[^']*'|\([^)]*\)))?$/);
  if (titleMatch) {
    return titleMatch[1].trim();
  }

  return trimmed.split(/\s+/)[0].trim();
}

const allMarkdownFiles = getAllMarkdownFiles(ROOT_DIR);
let brokenLinksCount = 0;
let totalCheckedLinks = 0;

// Helper to extract anchors from markdown headings with GFM sequential duplicate numbering
const headingAnchorsCache = new Map();
function getHeadingAnchors(filePath) {
  if (headingAnchorsCache.has(filePath)) return headingAnchorsCache.get(filePath);
  const anchors = new Set();
  if (fs.existsSync(filePath)) {
    const content = stripCodeBlocks(fs.readFileSync(filePath, 'utf8'));
    const slugCounts = new Map();

    content.split(/\r?\n/).forEach(rawLine => {
      const line = rawLine.trim();
      const match = line.match(/^#{1,6}\s+(.+)$/);
      if (match) {
        let title = match[1].trim();
        // Remove markdown links [text](...) -> text
        title = title.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
        // Remove formatting
        title = title.replace(/[*_`]/g, '');
        // GitHub slugify: remove punctuation and emojis
        const baseSlug = title
          .toLowerCase()
          .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
          .replace(/[^\w\s\u00C0-\u024F\u1EA0-\u1EFF-]/gu, '')
          .trim()
          .replace(/\s+/g, '-');

        if (baseSlug) {
          const count = slugCounts.get(baseSlug) || 0;
          slugCounts.set(baseSlug, count + 1);

          // GFM sequential numbering: 1st is baseSlug, 2nd is baseSlug-1, 3rd is baseSlug-2, etc.
          const slug = count === 0 ? baseSlug : `${baseSlug}-${count}`;
          anchors.add(slug);
          anchors.add(`-${slug}`);

          // ASCII normalized variant
          const asciiBase = baseSlug
            .replace(/ı/g, 'i')
            .replace(/ş/g, 's')
            .replace(/ğ/g, 'g')
            .replace(/ç/g, 'c')
            .replace(/ü/g, 'u')
            .replace(/ö/g, 'o')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');

          const asciiSlug = count === 0 ? asciiBase : `${asciiBase}-${count}`;
          anchors.add(asciiSlug);
          anchors.add(`-${asciiSlug}`);
        }
      }
    });
  }
  headingAnchorsCache.set(filePath, anchors);
  return anchors;
}

// Tokenizer to extract all markdown links handling nested brackets and titles
function extractAllMarkdownLinks(content) {
  const links = [];
  const clean = stripCodeBlocks(content);

  let i = 0;
  while (i < clean.length) {
    if (clean[i] === '[') {
      let depth = 1;
      let j = i + 1;
      while (j < clean.length && depth > 0) {
        if (clean[j] === '[') depth++;
        else if (clean[j] === ']') depth--;
        j++;
      }
      if (depth === 0 && j < clean.length && clean[j] === '(') {
        let parenDepth = 1;
        let k = j + 1;
        while (k < clean.length && parenDepth > 0) {
          if (clean[k] === '(') parenDepth++;
          else if (clean[k] === ')') parenDepth--;
          k++;
        }
        if (parenDepth === 0) {
          const rawTarget = clean.slice(j + 1, k - 1).trim();
          if (rawTarget) links.push(rawTarget);
          i = k;
          continue;
        }
      }
    }
    i++;
  }

  // Reference definitions: [ref]: target
  const refRegex = /^[ \t]*\[([^\]]+)\]:[ \t]+(\S+(?:[ \t]+(?:"[^"]*"|'[^']*'|\([^)]*\)))?)/gm;
  let refMatch;
  while ((refMatch = refRegex.exec(clean)) !== null) {
    links.push(refMatch[2].trim());
  }

  return links;
}

allMarkdownFiles.forEach(mdFile => {
  const content = fs.readFileSync(mdFile, 'utf8');
  const dir = path.dirname(mdFile);
  const relFile = path.relative(ROOT_DIR, mdFile).replace(/\\/g, '/');

  // Assert balanced code fences (``` and ~~~ with arbitrary lengths)
  const fenceCheck = checkCodeFenceBalance(content);
  if (!fenceCheck.isBalanced) {
    logFail(`Dengesiz kod çiti (unbalanced code fence) tespit edildi: [${relFile}] (Satır ${fenceCheck.openLineNum} üzerinde açılan ${fenceCheck.openFenceLen} karakterli '${fenceCheck.openFenceChar}' çiti kapatılmamış)`);
    brokenLinksCount++;
  }

  const rawLinks = extractAllMarkdownLinks(content);

  rawLinks.forEach(rawTarget => {
    const dest = parseLinkDestination(rawTarget);
    if (!dest) return;

    // Ignore external URLs, mailto, ftp, etc.
    if (dest.startsWith('http://') || dest.startsWith('https://') || dest.startsWith('mailto:') || dest.startsWith('ftp:')) {
      return;
    }

    totalCheckedLinks++;

    // Same-file anchor link: #some-anchor
    if (dest.startsWith('#')) {
      const anchor = dest.slice(1);
      const fileAnchors = getHeadingAnchors(mdFile);
      if (!fileAnchors.has(anchor)) {
        logFail(`Kırık dosya-içi anchor linki: [${relFile}] -> "${rawTarget}" (Hedef başlık bulunamadı: #${anchor})`);
        brokenLinksCount++;
      }
      return;
    }

    // Relative file link with optional #anchor: path/to/file.md#some-anchor
    const [pathPart, anchorPart] = dest.split('#');
    const cleanPath = pathPart.split('?')[0].trim();
    if (!cleanPath) return;

    const resolvedPath = path.resolve(dir, cleanPath);
    if (!fs.existsSync(resolvedPath)) {
      logFail(`Kırık bağıl link bulundu: [${relFile}] -> "${rawTarget}" (Hedef dosya yok: ${cleanPath})`);
      brokenLinksCount++;
      return;
    }

    // If an anchor was specified on another markdown file, verify heading exists in target
    if (anchorPart && cleanPath.endsWith('.md')) {
      const targetAnchors = getHeadingAnchors(resolvedPath);
      if (!targetAnchors.has(anchorPart)) {
        logFail(`Kırık başlık anchor linki: [${relFile}] -> "${rawTarget}" (Hedef dosyada #${anchorPart} başlığı yok)`);
        brokenLinksCount++;
      }
    }
  });
});

checksCount++;
if (brokenLinksCount === 0) {
  logPass(`Tüm bağıl markdown linkleri ve başlık anchor'ları (${totalCheckedLinks} link, ${allMarkdownFiles.length} dosya) başarıyla doğrulandı`);
}

// -----------------------------------------------------------------------------
// 6. Integration Presets & Semantic Parity Verification
// -----------------------------------------------------------------------------
console.log('\n📌 6. integrations/ IDE Preset Şablonları & Anayasal Parite Taraması...');
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
  if (!fs.existsSync(fullPath)) {
    logFail(`Preset EKSİK: ${preset}`);
    return;
  }
  logPass(`Preset dosyası mevcut: ${preset}`);

  const content = fs.readFileSync(fullPath, 'utf8');

  // 1. Minimal 1-3 skills directive
  checksCount++;
  if (content.includes('1–3') || content.includes('1-3')) {
    logPass(`[${preset}] -> Minimal 1-3 skill yükleme kuralı mevcut`);
  } else {
    logFail(`[${preset}] -> Minimal 1-3 skill kuralı EKSİK veya eski tekil skill kuralı taşıyor!`);
  }

  // 2. Auditor anti-hallucination / conditional flaw rule
  checksCount++;
  if (
    content.includes('IF material') ||
    content.includes('maddi risk varsa') ||
    content.includes('no material vulnerabilities identified') ||
    content.includes('maddi risk tespit edilmedi')
  ) {
    logPass(`[${preset}] -> Auditor anti-hallucination / koşullu bulgu kuralı mevcut`);
  } else {
    logFail(`[${preset}] -> Auditor kuralı koşulsuz kusur uydurma riski taşıyor!`);
  }

  // 3. Fast-Track vs Bug-Investigator distinction
  checksCount++;
  if (
    (content.includes('<5') || content.includes('<5 satır')) &&
    (content.includes('skill-bug-investigator') || content.includes('failing test'))
  ) {
    logPass(`[${preset}] -> Fast-Track (<5 satır) ve Bug-Investigator ayrımı mevcut`);
  } else {
    logFail(`[${preset}] -> Fast-Track / Bug-Investigator ayrımı EKSİK!`);
  }

  // 4. Non-negotiable security precedence clause
  checksCount++;
  if (content.includes('NEVER overrides') || content.includes('ASLA geçersiz kılamaz')) {
    logPass(`[${preset}] -> Tavizsiz güvenlik üstünlüğü (Security Precedence) mevcut`);
  } else {
    logFail(`[${preset}] -> Güvenlik üstünlüğü kuralı EKSİK!`);
  }

  // 5. Canonical QA test summary block
  checksCount++;
  if (content.includes('🧪 [QA TEST ÖZETİ]') || content.includes('🧪 [QA TEST SUMMARY]')) {
    logPass(`[${preset}] -> Kanonik QA test özeti şablonu mevcut`);
  } else {
    logFail(`[${preset}] -> Kanonik QA test özeti şablonu EKSİK!`);
  }

  // 6. Semantic Contradiction & Security Bypass Assertion
  // Ensures presets do not contain conflicting bypass instructions (e.g. "kullanıcı isterse güvenlik devre dışı", "disable security")
  checksCount++;
  const bypassPatterns = [
    /kullanıcı isterse.*güvenlik.*(?:devre dışı|iptal|esnet|atla|yoksay)/i,
    /user (?:can|may).*override.*security/i,
    /disable (?:all )?security/i,
    /bypass (?:all )?security/i,
    /güvenlik kontrollerini devre dışı/i,
    /güvenliği (?:devre dışı bırak|yoksay|atla)/i,
    /skip (?:all )?security checks/i
  ];

  let hasContradiction = false;
  for (const pattern of bypassPatterns) {
    if (pattern.test(content)) {
      logFail(`[${preset}] -> Semantik çelişki / Güvenlik bypass talimatı tespit edildi! Kural ihlali: "${content.match(pattern)[0]}"`);
      hasContradiction = true;
      break;
    }
  }
  if (!hasContradiction) {
    logPass(`[${preset}] -> Semantik çelişki / Güvenlik bypass taraması temiz`);
  }

  // 7. Top-Loaded Security Invariants check (First 1,500 characters)
  checksCount++;
  const headPrefix = content.slice(0, 1500);
  if (
    headPrefix.includes('TOP-LOADED SECURITY INVARIANTS') ||
    headPrefix.includes('GÖMÜLÜ GÜVENLİK VE GÜVENİLMEZ İÇERİK KALKANI')
  ) {
    logPass(`[${preset}] -> Top-Loaded Security Invariants ilk 1.500 karakter içinde mevcut (Fail-Closed koruması)`);
  } else {
    logFail(`[${preset}] -> Top-Loaded Security Invariants ilk 1.500 karakter içinde BULUNAMADI!`);
  }

  // 8. Preset Character Budget & Truncation Guard
  checksCount++;
  if (preset.includes('windsurf') && content.length > 6000) {
    logFail(`[${preset}] -> Windsurf Cascade kural sınırı aşıldı! (${content.length} > 6000 char)`);
  } else if (content.length > 8000) {
    logFail(`[${preset}] -> Preset boyut sınırı aşıldı! (${content.length} > 8000 char)`);
  } else {
    logPass(`[${preset}] -> Karakter bütçesi güvenli (${content.length} char)`);
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

  if (
    content.includes('file:///') ||
    content.match(/[a-zA-Z]:[\\/][Uu]sers/) ||
    content.match(/(?:^|[\s"'`])\/home\/[a-zA-Z0-9_-]+/m) ||
    content.match(/(?:^|[\s"'`])\/Users\/[a-zA-Z0-9_-]+/m)
  ) {
    logFail(`Mutlak yol sızıntısı bulundu (${relName}): file:///, C:\\Users, /home/* veya /Users/* referansı içeriyor`);
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
  // Parse active non-comment lines
  const activeIgnoreLines = gitignoreContent
    .split('\n')
    .map(l => l.trim())
    .filter(l => l && !l.startsWith('#'));

  const requiredIgnores = [
    '.env',
    '.env.*',
    '*.pem',
    '*.key',
    '*.p12',
    '*.pfx',
    'id_rsa',
    '*.log',
    '.handoff/',
    'ai-log.local.md'
  ];

  requiredIgnores.forEach(item => {
    checksCount++;
    if (activeIgnoreLines.includes(item)) {
      logPass(`.gitignore içinde aktif kural tanımlı: ${item}`);
    } else {
      logFail(`.gitignore içinde aktif kural EKSİK (veya yorum satırında): ${item}`);
    }
  });
} else if (isPackagedDistribution) {
  checksCount++;
  logPass('NPM Paket Dağıtımı: .git dizini ve .gitignore bulunmayan paket ortamında doğrulama zarifçe onaylandı (Packaged Context Safe)');
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
