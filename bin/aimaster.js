#!/usr/bin/env node

/**
 * AIMASTER CLI — Zero-Config Installer, Architecture Manager & Integrity Runner
 * https://github.com/Furkaxia/AiMaster
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { spawnSync } = require('child_process');

const REPO_ROOT = path.resolve(__dirname, '..');
const TARGET_DIR = process.cwd();

const BANNER = `
\x1b[38;2;79;70;229m   █████╗ ██╗███╗   ███╗ █████╗ ███████╗████████╗███████╗██████╗ \x1b[0m
\x1b[38;2;99;102;241m  ██╔══██╗██║████╗ ████║██╔══██╗██╔════╝╚══██╔══╝██╔════╝██╔══██╗\x1b[0m
\x1b[38;2;129;140;248m  ███████║██║██╔████╔██║███████║███████╗   ██║   █████╗  ██████╔╝\x1b[0m
\x1b[38;2;56;189;248m  ██╔══██║██║██║╚██╔╝██║██╔══██║╚════██║   ██║   ██╔══╝  ██╔══██╗\x1b[0m
\x1b[38;2;45;212;191m  ██║  ██║██║██║ ╚═╝ ██║██║  ██║███████║   ██║   ███████╗██║  ██║\x1b[0m
\x1b[38;2;16;185;129m  ╚═╝  ╚═╝╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═╝\x1b[0m
\x1b[90m        ─── \x1b[1m\x1b[38;2;56;189;248mA G E N T I C   O P E R A T I N G   S Y S T E M\x1b[0m\x1b[90m ───\x1b[0m
\x1b[90m        Multi-Persona Boardroom Governance • 80 Skills • Zero Rework\x1b[0m
`;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function detectLanguage() {
  const args = process.argv.slice(2);
  const langArg = args.find((a) => a.startsWith('--lang='));
  if (langArg) {
    const val = langArg.split('=')[1].toLowerCase();
    return val.startsWith('tr') ? 'tr' : 'en';
  }
  const langIdx = args.indexOf('--lang');
  if (langIdx !== -1 && args[langIdx + 1]) {
    return args[langIdx + 1].toLowerCase().startsWith('tr') ? 'tr' : 'en';
  }
  if (args.includes('--tr')) return 'tr';
  if (args.includes('--en')) return 'en';
  if (process.env.AIMASTER_LANG) {
    return process.env.AIMASTER_LANG.toLowerCase().startsWith('tr') ? 'tr' : 'en';
  }
  const envLocale = process.env.LANG || process.env.LC_ALL || process.env.LC_MESSAGES || '';
  if (/^tr/i.test(envLocale)) return 'tr';
  try {
    const intlLocale = Intl.DateTimeFormat().resolvedOptions().locale;
    if (/^tr/i.test(intlLocale)) return 'tr';
  } catch (e) {}
  return 'en';
}

const LANG = detectLanguage();

const MSG = {
  en: {
    selectConfig: 'Select your target configuration:',
    completeSuite: 'Complete Enterprise Suite (All IDEs + 80 Skills + 11 Protocols)',
    enterNumber: (max) => `\nEnter number [1-${max}] (default: 1): `,
    askSkills: '\n? Install 80 active domain skills into ./skills/? [Y/n] (default: Y): ',
    askProtocols: '? Install 11 Engineering Council protocols (*-ai.md)? [Y/n] (default: Y): ',
    dryRunSummary: '[DRY-RUN] Simulation complete. No changes written to disk.',
    dryRunHelp: 'Run again without --dry-run to apply changes.',
    successTitle: '✔ AIMASTER initialized successfully.',
    installSummary: '📦 INSTALLATION SUMMARY:',
    nextSteps: 'Next Steps:',
    step1: '1. Open your project in your AI IDE (Cursor, Windsurf, Antigravity, Copilot, etc.)',
    step2: "2. The AI assistant will automatically read your project's rules & protocols.",
    step3: '3. Explore specialized skills in ./skills/ or learn more at:',
    backupCreated: (rel) => `📦 Safety Backup directory initialized -> ${rel}`,
    initializing: (ide) => `\n\x1b[1mInitializing AIMASTER configuration for: \x1b[36m${ide}\x1b[0m\n`
  },
  tr: {
    selectConfig: 'Hedef IDE ve çalışma ortamınızı seçin:',
    completeSuite: 'Eksiksiz Kurumsal Paket (Tüm IDE\'ler + 80 Skill + 11 Protokol)',
    enterNumber: (max) => `\nSeçiminiz [1-${max}] (varsayılan: 1): `,
    askSkills: '\n? 80 aktif uzmanlık skill\'i ./skills/ klasörüne kurulsun mu? [E/h] (varsayılan: E): ',
    askProtocols: '? 11 Mühendislik Konseyi protokolü (*-ai.md) kurulsun mu? [E/h] (varsayılan: E): ',
    dryRunSummary: '[DRY-RUN] Simülasyon tamamlandı. Diske hiçbir dosya yazılmadı.',
    dryRunHelp: 'Değişiklikleri uygulamak için komutu --dry-run olmadan tekrar çalıştırın.',
    successTitle: '✔ AIMASTER başarıyla kuruldu.',
    installSummary: '📦 KURULUM ÖZETİ:',
    nextSteps: 'Sonraki Adımlar:',
    step1: '1. Projenizi AI IDE\'nizde açın (Cursor, Windsurf, Antigravity, Copilot vb.)',
    step2: '2. Yapay zeka asistanı kuralları ve protokolleri otomatik olarak kendi dilinizde okuyup uygulayacaktır.',
    step3: '3. ./skills/ altındaki uzmanlık kurallarını keşfedin veya detayları inceleyin:',
    backupCreated: (rel) => `📦 Güvenlik Yedekleme dizini oluşturuldu -> ${rel}`,
    initializing: (ide) => `\n\x1b[1mAIMASTER yapılandırması başlatılıyor: \x1b[36m${ide}\x1b[0m\n`
  }
};

function createSpinner(text) {
  const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  const dots = ['●○○○○', '●●○○○', '●●●○○', '●●●●○', '●●●●●', '○●●●●', '○○●●●', '○○○●●', '○○○○●'];
  let i = 0;
  let interval = null;

  if (process.stdout.isTTY) {
    interval = setInterval(() => {
      const frame = frames[i % frames.length];
      const dot = dots[i % dots.length];
      process.stdout.write(`\r\x1b[38;2;56;189;248m${frame}\x1b[0m ${text} \x1b[38;2;79;70;229m[${dot}]\x1b[0m`);
      i++;
    }, 80);
  } else {
    console.log(`\x1b[36m⏳\x1b[0m ${text}...`);
  }

  return {
    succeed: (msg) => {
      if (interval) clearInterval(interval);
      if (process.stdout.isTTY) {
        process.stdout.write(`\r\x1b[2K\x1b[32m✔\x1b[0m ${msg || text}\n`);
      } else {
        console.log(`\x1b[32m✔\x1b[0m ${msg || text}`);
      }
    },
    fail: (msg) => {
      if (interval) clearInterval(interval);
      if (process.stdout.isTTY) {
        process.stdout.write(`\r\x1b[2K\x1b[31m✖\x1b[0m ${msg || text}\n`);
      } else {
        console.log(`\x1b[31m✖\x1b[0m ${msg || text}`);
      }
    },
    warn: (msg) => {
      if (interval) clearInterval(interval);
      if (process.stdout.isTTY) {
        process.stdout.write(`\r\x1b[2K\x1b[33m⚠\x1b[0m ${msg || text}\n`);
      } else {
        console.log(`\x1b[33m⚠\x1b[0m ${msg || text}`);
      }
    }
  };
}

const PRESETS = {
  cursor: {
    name: 'Cursor IDE',
    src: 'integrations/cursor/.cursorrules',
    dest: '.cursorrules'
  },
  windsurf: {
    name: 'Windsurf Cascade',
    src: 'integrations/windsurf/.windsurfrules',
    dest: '.windsurfrules'
  },
  antigravity: {
    name: 'Google Antigravity & Gemini',
    src: 'integrations/antigravity/GEMINI.md',
    dest: 'GEMINI.md'
  },
  copilot: {
    name: 'GitHub Copilot',
    src: 'integrations/copilot/copilot-instructions.md',
    dest: '.github/copilot-instructions.md'
  },
  claude: {
    name: 'Claude Projects',
    src: 'integrations/claude/claude-project-prompt.md',
    dest: 'CLAUDE.md'
  },
  chatgpt: {
    name: 'ChatGPT Custom Instructions',
    src: 'integrations/chatgpt/custom-instructions.md',
    dest: 'aimaster-instructions.md'
  }
};

const PROTOCOLS = [
  'agent-boardroom-protocol-ai.md',
  'testing-protocol-ai.md',
  'ui-standards-ai.md',
  'performance-budget-ai.md',
  'dependency-policy-ai.md',
  'git-commit-convention-ai.md',
  'ai-communication-protocol-ai.md',
  'error-recovery-escalation-ai.md',
  'session-handoff-protocol-ai.md',
  'ai-log-ai.md',
  'project-architecture-ai.md'
];

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    const parentDir = path.dirname(dest);
    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true });
    }
    fs.copyFileSync(src, dest);
  }
}

function printHelp() {
  console.log(BANNER);
  console.log(`
\x1b[1mUSAGE:\x1b[0m
  npx aimaster-os init [options]
  aimaster-os init [options]
  aimaster-os list
  aimaster-os verify

\x1b[1mCOMMANDS:\x1b[0m
  init              Initialize AiMaster configuration in current repository
  list, --list      List all available IDE presets and destination paths
  verify, test      Run the enterprise integrity, fixture & adversarial benchmark suite

\x1b[1mOPTIONS:\x1b[0m
  --ide <name>      Target IDE: cursor, windsurf, antigravity, copilot, claude, chatgpt, all
  --with-skills     Install all 80 specialized domain skills to ./skills/
  --with-protocols  Install all 11 standard protocol specifications (*-ai.md)
  --force           Overwrite existing files (purges ./skills/ before re-copying)
  --dry-run         Simulate actions without writing any files to disk
  -h, --help        Display this help information
  -v, --version     Display version

\x1b[1mEXAMPLES:\x1b[0m
  npx aimaster-os init --ide cursor
  npx aimaster-os init --ide windsurf --with-skills
  npx aimaster-os init --ide all --with-skills --with-protocols
  npx aimaster-os init --dry-run --with-skills
  npx aimaster-os list
  npx aimaster-os verify

  # Direct zero-install execution via GitHub:
  npx github:Furkaxia/AiMaster init --ide cursor
`);
}

function printPresetList() {
  console.log(BANNER);
  console.log('\x1b[1mAvailable IDE Presets:\x1b[0m\n');
  Object.entries(PRESETS).forEach(([key, val]) => {
    console.log(`  \x1b[36m${key.padEnd(14)}\x1b[0m -> ${val.name.padEnd(30)} (\x1b[90m${val.dest}\x1b[0m)`);
  });
  console.log(`  \x1b[36m${'all'.padEnd(14)}\x1b[0m -> All IDEs & Configurations\n`);
}

function runVerify() {
  console.log(BANNER);
  console.log('\x1b[1mRunning AIMASTER Enterprise Integrity & Benchmark Suite...\x1b[0m\n');
  const testSteps = [
    { name: 'Enterprise Integrity Linter', script: path.join(REPO_ROOT, 'scripts', 'verify-integrity.js') },
    { name: 'Adversarial Fixtures Test', script: path.join(REPO_ROOT, 'scripts', 'test-integrity-fixtures.js') },
    { name: 'Behavioral Benchmark Evals', script: path.join(REPO_ROOT, 'scripts', 'test-adversarial-evals.js') },
    { name: 'Benchmark Engine Invariant Suite', script: path.join(REPO_ROOT, 'tests', 'test-benchmark-engine.mjs') },
    { name: 'Validator Adversarial Mutation Suite', script: path.join(REPO_ROOT, 'tests', 'test-validator-mutations.mjs') },
    { name: 'Empirical Benchmark Harness', script: path.join(REPO_ROOT, 'benchmarks', 'runner.mjs'), args: ['--mode=mock'] }
  ];

  for (const step of testSteps) {
    if (!fs.existsSync(step.script)) {
      console.error(`\x1b[31m✖ Test script not found: ${step.script}\x1b[0m`);
      process.exit(1);
    }
    const spawnArgs = [step.script, ...(step.args || [])];
    const result = spawnSync(process.execPath, spawnArgs, { stdio: 'inherit' });
    if (result.status !== 0) {
      console.error(`\n\x1b[31m✖ ${step.name} failed with status code ${result.status}\x1b[0m`);
      process.exit(result.status || 1);
    }
  }
  console.log(`\n\x1b[1m\x1b[32m✔ All AIMASTER integrity, fixture, adversarial and benchmark tests passed successfully.\x1b[0m\n`);
  process.exit(0);
}

let BACKUP_DIR = null;
function getOrCreateBackupDir() {
  if (!BACKUP_DIR) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    BACKUP_DIR = path.join(TARGET_DIR, `.aimaster-backup-${timestamp}`);
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
    const t = MSG[LANG] || MSG.en;
    console.log(`\x1b[36m${t.backupCreated(path.relative(TARGET_DIR, BACKUP_DIR))}\x1b[0m`);
  }
  return BACKUP_DIR;
}

function backupExistingFile(filePath) {
  if (fs.existsSync(filePath)) {
    const backupRoot = getOrCreateBackupDir();
    const rel = path.relative(TARGET_DIR, filePath);
    const backupTarget = path.join(backupRoot, rel);
    fs.mkdirSync(path.dirname(backupTarget), { recursive: true });
    fs.copyFileSync(filePath, backupTarget);
  }
}

function backupExistingDirectory(dirPath) {
  if (fs.existsSync(dirPath)) {
    const backupRoot = getOrCreateBackupDir();
    const rel = path.relative(TARGET_DIR, dirPath);
    const backupTarget = path.join(backupRoot, rel);
    fs.mkdirSync(backupTarget, { recursive: true });
    copyRecursiveSync(dirPath, backupTarget);
  }
}

const installedManifest = [];

async function installPreset(key, force = false, dryRun = false) {
  const preset = PRESETS[key];
  if (!preset) {
    console.error(`\x1b[31m✖ Unknown IDE preset: "${key}"\x1b[0m`);
    return false;
  }

  const srcPath = path.join(REPO_ROOT, preset.src);
  const destPath = path.join(TARGET_DIR, preset.dest);

  if (!fs.existsSync(srcPath)) {
    console.error(`\x1b[31m✖ Source template not found: ${srcPath}\x1b[0m`);
    return false;
  }

  if (dryRun) {
    console.log(`\x1b[35m[DRY-RUN]\x1b[0m Would install ${preset.name} preset -> ${preset.dest}`);
    installedManifest.push({ name: preset.name, dest: preset.dest, status: 'dry-run' });
    return true;
  }

  const spinner = createSpinner(`Configuring ${preset.name} preset (${preset.dest})`);
  await sleep(100);

  const destDir = path.dirname(destPath);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  if (fs.existsSync(destPath)) {
    if (!force) {
      spinner.warn(`Skipped: ${preset.dest} already exists (use --force to overwrite)`);
      installedManifest.push({ name: preset.name, dest: preset.dest, status: 'skipped' });
      return true;
    }
    backupExistingFile(destPath);
  }

  fs.copyFileSync(srcPath, destPath);
  spinner.succeed(`Configured ${preset.name} preset -> ${preset.dest}`);
  installedManifest.push({ name: preset.name, dest: preset.dest, status: 'installed' });
  return true;
}

async function installRulesAI(force = false, dryRun = false) {
  const src = path.join(REPO_ROOT, 'RulesAI.md');
  const dest = path.join(TARGET_DIR, 'RulesAI.md');
  if (fs.existsSync(src)) {
    if (dryRun) {
      console.log(`\x1b[35m[DRY-RUN]\x1b[0m Would install Constitutional Rules -> RulesAI.md`);
      installedManifest.push({ name: 'Constitutional Invariants', dest: 'RulesAI.md', status: 'dry-run' });
      return;
    }
    const spinner = createSpinner('Synthesizing Constitutional Invariants (RulesAI.md)');
    await sleep(100);
    if (!fs.existsSync(dest) || force) {
      if (fs.existsSync(dest) && force) {
        backupExistingFile(dest);
      }
      fs.copyFileSync(src, dest);
      spinner.succeed('Constitutional Rules verified & installed -> RulesAI.md');
      installedManifest.push({ name: 'Constitutional Invariants', dest: 'RulesAI.md', status: 'installed' });
    } else {
      spinner.warn('Skipped: RulesAI.md already exists (use --force to overwrite)');
      installedManifest.push({ name: 'Constitutional Invariants', dest: 'RulesAI.md', status: 'skipped' });
    }
  }
}

async function installProtocols(force = false, dryRun = false) {
  if (dryRun) {
    console.log(`\x1b[35m[DRY-RUN]\x1b[0m Would install 11 standard protocols (*-ai.md)`);
    installedManifest.push({ name: '11 Standard Protocols', dest: '*-ai.md (11 files)', status: 'dry-run' });
    return;
  }
  const spinner = createSpinner('Linking 11 Engineering Council Protocols (*-ai.md)');
  await sleep(100);
  let count = 0;
  PROTOCOLS.forEach((file) => {
    const src = path.join(REPO_ROOT, file);
    const dest = path.join(TARGET_DIR, file);
    if (fs.existsSync(src)) {
      if (!fs.existsSync(dest) || force) {
        if (fs.existsSync(dest) && force) {
          backupExistingFile(dest);
        }
        fs.copyFileSync(src, dest);
        count++;
      }
    }
  });
  if (count > 0) {
    spinner.succeed(`Installed ${count} Engineering Council Protocols (*-ai.md)`);
    installedManifest.push({ name: `${count} Council Protocols`, dest: '*-ai.md (11 files)', status: 'installed' });
  } else {
    spinner.warn('Skipped: Protocols already exist (use --force to overwrite)');
    installedManifest.push({ name: '11 Council Protocols', dest: '*-ai.md (11 files)', status: 'skipped' });
  }
}

async function installSkills(force = false, dryRun = false) {
  const src = path.join(REPO_ROOT, 'skills');
  const dest = path.join(TARGET_DIR, 'skills');
  if (fs.existsSync(src)) {
    if (dryRun) {
      console.log(`\x1b[35m[DRY-RUN]\x1b[0m Would install 80 domain skills to ./skills/`);
      installedManifest.push({ name: '80 Active Domain Skills', dest: './skills/ (7 Categories)', status: 'dry-run' });
      return;
    }
    const spinner = createSpinner('Compiling 80 Active Domain Skills into ./skills/ (7 Categories)');
    await sleep(150);
    if (!fs.existsSync(dest) || force) {
      if (fs.existsSync(dest) && force) {
        backupExistingDirectory(dest);
      }
      copyRecursiveSync(src, dest);
      spinner.succeed('Synchronized 80 Active Domain Skills -> ./skills/');
      installedManifest.push({ name: '80 Active Domain Skills', dest: './skills/ (7 Categories)', status: 'installed' });
    } else {
      spinner.warn('Skipped: ./skills/ directory already exists (use --force to overwrite)');
      installedManifest.push({ name: '80 Active Domain Skills', dest: './skills/ (7 Categories)', status: 'skipped' });
    }
  }
}

async function promptSelectConfiguration() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const ask = (q) => new Promise((resolve) => rl.question(q, resolve));

  const t = MSG[LANG] || MSG.en;
  console.log(`\x1b[1m${t.selectConfig}\x1b[0m`);
  const keys = Object.keys(PRESETS);
  keys.forEach((key, index) => {
    console.log(`  \x1b[36m${index + 1})\x1b[0m ${PRESETS[key].name} (\x1b[90m${PRESETS[key].dest}\x1b[0m)`);
  });
  console.log(`  \x1b[36m${keys.length + 1})\x1b[0m ${t.completeSuite}`);

  const rawAnswer = await ask(t.enterNumber(keys.length + 1));
  const num = parseInt(rawAnswer.trim(), 10) || 1;

  let chosenIDE = 'cursor';
  let installSkillsFlag = false;
  let installProtocolsFlag = false;

  if (num === keys.length + 1) {
    chosenIDE = 'all';
    installSkillsFlag = true;
    installProtocolsFlag = true;
  } else if (num >= 1 && num <= keys.length) {
    chosenIDE = keys[num - 1];
    const qSkills = (await ask(t.askSkills)).trim().toLowerCase();
    installSkillsFlag = qSkills === '' || qSkills.startsWith('y') || qSkills.startsWith('e');

    const qProtocols = (await ask(t.askProtocols)).trim().toLowerCase();
    installProtocolsFlag = qProtocols === '' || qProtocols.startsWith('y') || qProtocols.startsWith('e');
  }

  rl.close();
  return { chosenIDE, installSkillsFlag, installProtocolsFlag };
}

function printManifest(dryRun) {
  const t = MSG[LANG] || MSG.en;
  if (dryRun) {
    console.log(`
\x1b[1m\x1b[35m${t.dryRunSummary}\x1b[0m
\x1b[90m${t.dryRunHelp}\x1b[0m
`);
    return;
  }

  console.log(`
\x1b[1m\x1b[32m${t.successTitle}\x1b[0m
\x1b[90m────────────────────────────────────────────────────────────────────────\x1b[0m
\x1b[1m${t.installSummary}\x1b[0m`);

  installedManifest.forEach((item) => {
    const icon = item.status === 'installed' ? '\x1b[32m✔\x1b[0m' : '\x1b[33m⚠ (exists)\x1b[0m';
    console.log(`  ${icon} \x1b[1m${item.name.padEnd(30)}\x1b[0m -> \x1b[36m${item.dest}\x1b[0m`);
  });

  console.log(`\x1b[90m────────────────────────────────────────────────────────────────────────\x1b[0m
\x1b[1m${t.nextSteps}\x1b[0m
  ${t.step1}
  ${t.step2}
  ${t.step3}
     \x1b[36mhttps://github.com/Furkaxia/AiMaster\x1b[0m
`);
}

async function main() {
  const args = process.argv.slice(2);

  if (args.includes('-h') || args.includes('--help')) {
    printHelp();
    process.exit(0);
  }

  if (args.includes('-v') || args.includes('--version')) {
    try {
      const pkg = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, 'package.json'), 'utf8'));
      console.log(`aimaster-os v${pkg.version}`);
    } catch {
      console.log('aimaster-os v1.0.0-rc.2');
    }
    process.exit(0);
  }

  if (args.includes('list') || args.includes('--list')) {
    printPresetList();
    process.exit(0);
  }

  if (args.includes('verify') || args.includes('test') || args.includes('--verify')) {
    runVerify();
    return;
  }

  const dryRun = args.includes('--dry-run');
  const force = args.includes('--force');
  let withSkills = args.includes('--with-skills');
  let withProtocols = args.includes('--with-protocols');
  const noSkills = args.includes('--no-skills');
  const noProtocols = args.includes('--no-protocols');

  console.log(BANNER);
  if (dryRun) {
    console.log('\x1b[35m🔍 DRY-RUN MODE: No files will be created or modified on disk.\x1b[0m\n');
  }

  let ideIndex = args.indexOf('--ide');
  let selectedIDE = ideIndex !== -1 && args[ideIndex + 1] ? args[ideIndex + 1].toLowerCase() : null;

  if (!selectedIDE && !args.includes('init')) {
    const positional = args.find((a) => !a.startsWith('-') && a !== 'init');
    if (positional && (PRESETS[positional.toLowerCase()] || positional.toLowerCase() === 'all')) {
      selectedIDE = positional.toLowerCase();
    }
  }

  if (!selectedIDE) {
    if (process.stdout.isTTY && process.stdin.isTTY) {
      const config = await promptSelectConfiguration();
      selectedIDE = config.chosenIDE;
      if (!args.includes('--with-skills') && !noSkills) {
        withSkills = config.installSkillsFlag;
      }
      if (!args.includes('--with-protocols') && !noProtocols) {
        withProtocols = config.installProtocolsFlag;
      }
    } else {
      selectedIDE = 'cursor';
    }
  } else if (selectedIDE === 'all') {
    if (!noSkills && !args.includes('--with-skills')) withSkills = true;
    if (!noProtocols && !args.includes('--with-protocols')) withProtocols = true;
  }

  const t = MSG[LANG] || MSG.en;
  console.log(t.initializing(selectedIDE.toUpperCase()));

  if (selectedIDE === 'all') {
    for (const key of Object.keys(PRESETS)) {
      await installPreset(key, force, dryRun);
    }
  } else {
    await installPreset(selectedIDE, force, dryRun);
  }

  await installRulesAI(force, dryRun);

  if (withProtocols) {
    await installProtocols(force, dryRun);
  }

  if (withSkills) {
    await installSkills(force, dryRun);
  }

  printManifest(dryRun);
}

main().catch((err) => {
  console.error('\x1b[31m✖ Error during initialization:\x1b[0m', err.message);
  process.exit(1);
});

