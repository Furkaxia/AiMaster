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
\x1b[1m\x1b[36mAIMASTER CLI — Enterprise Agentic Engineering Operating System\x1b[0m
\x1b[90mMulti-Persona Governance & Invariant Enforcement for AI Coding Agents\x1b[0m
`;

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
    console.log(`\x1b[36m📦 Safety Backup directory initialized -> ${path.relative(TARGET_DIR, BACKUP_DIR)}\x1b[0m`);
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

function installPreset(key, force = false, dryRun = false) {
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
    return true;
  }

  const destDir = path.dirname(destPath);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  if (fs.existsSync(destPath)) {
    if (!force) {
      console.log(`\x1b[33m⚠ Skipped: ${preset.dest} already exists (use --force to overwrite)\x1b[0m`);
      return true;
    }
    backupExistingFile(destPath);
  }

  fs.copyFileSync(srcPath, destPath);
  console.log(`\x1b[32m✔ Installed ${preset.name} preset -> ${preset.dest}\x1b[0m`);
  return true;
}

function installRulesAI(force = false, dryRun = false) {
  const src = path.join(REPO_ROOT, 'RulesAI.md');
  const dest = path.join(TARGET_DIR, 'RulesAI.md');
  if (fs.existsSync(src)) {
    if (dryRun) {
      console.log(`\x1b[35m[DRY-RUN]\x1b[0m Would install Constitutional Rules -> RulesAI.md`);
      return;
    }
    if (!fs.existsSync(dest) || force) {
      if (fs.existsSync(dest) && force) {
        backupExistingFile(dest);
      }
      fs.copyFileSync(src, dest);
      console.log(`\x1b[32m✔ Installed Constitutional Rules -> RulesAI.md\x1b[0m`);
    } else {
      console.log(`\x1b[33m⚠ Skipped: RulesAI.md already exists (use --force to overwrite)\x1b[0m`);
    }
  }
}

function installProtocols(force = false, dryRun = false) {
  let count = 0;
  PROTOCOLS.forEach((file) => {
    const src = path.join(REPO_ROOT, file);
    const dest = path.join(TARGET_DIR, file);
    if (fs.existsSync(src)) {
      if (dryRun) {
        console.log(`\x1b[35m[DRY-RUN]\x1b[0m Would install protocol -> ${file}`);
        count++;
      } else if (!fs.existsSync(dest) || force) {
        if (fs.existsSync(dest) && force) {
          backupExistingFile(dest);
        }
        fs.copyFileSync(src, dest);
        count++;
      } else {
        console.log(`\x1b[33m⚠ Skipped: ${file} already exists (use --force to overwrite)\x1b[0m`);
      }
    }
  });
  if (count > 0 && !dryRun) {
    console.log(`\x1b[32m✔ Installed ${count} standard protocols (*-ai.md)\x1b[0m`);
  }
}

function installSkills(force = false, dryRun = false) {
  const src = path.join(REPO_ROOT, 'skills');
  const dest = path.join(TARGET_DIR, 'skills');
  if (fs.existsSync(src)) {
    if (dryRun) {
      console.log(`\x1b[35m[DRY-RUN]\x1b[0m Would install 80 domain skills to ./skills/`);
      return;
    }
    if (!fs.existsSync(dest) || force) {
      if (fs.existsSync(dest) && force) {
        console.log(`\x1b[33m⚠ --force active: Backing up existing ./skills/ directory before synchronizing...\x1b[0m`);
        backupExistingDirectory(dest);
      }
      console.log(`\x1b[36m⏳ Synchronizing 80 domain skills to ./skills/... \x1b[0m`);
      copyRecursiveSync(src, dest);
      console.log(`\x1b[32m✔ Synchronized 80 domain skills -> ./skills/\x1b[0m`);
    } else {
      console.log(`\x1b[33m⚠ Skipped: ./skills/ directory already exists (use --force to overwrite)\x1b[0m`);
    }
  }
}

async function promptSelectIDE() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    console.log(`\x1b[1mSelect your target IDE / AI environment:\x1b[0m`);
    const keys = Object.keys(PRESETS);
    keys.forEach((key, index) => {
      console.log(`  \x1b[36m${index + 1})\x1b[0m ${PRESETS[key].name} (\x1b[90m${PRESETS[key].dest}\x1b[0m)`);
    });
    console.log(`  \x1b[36m${keys.length + 1})\x1b[0m All IDEs & Configurations`);

    rl.question('\nEnter number [1-7] (default: 1): ', (answer) => {
      rl.close();
      const num = parseInt(answer.trim(), 10) || 1;
      if (num >= 1 && num <= keys.length) {
        resolve(keys[num - 1]);
      } else if (num === keys.length + 1) {
        resolve('all');
      } else {
        resolve('cursor');
      }
    });
  });
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
      console.log(`aimaster v${pkg.version}`);
    } catch {
      console.log('aimaster v1.0.0-rc.1');
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
  const withSkills = args.includes('--with-skills');
  const withProtocols = args.includes('--with-protocols');

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
    if (process.stdout.isTTY) {
      selectedIDE = await promptSelectIDE();
    } else {
      selectedIDE = 'cursor';
    }
  }

  console.log(`\n\x1b[1mInitializing AIMASTER configuration for: \x1b[36m${selectedIDE.toUpperCase()}\x1b[0m\n`);

  if (selectedIDE === 'all') {
    Object.keys(PRESETS).forEach((key) => installPreset(key, force, dryRun));
  } else {
    installPreset(selectedIDE, force, dryRun);
  }

  installRulesAI(force, dryRun);

  if (withProtocols) {
    installProtocols(force, dryRun);
  }

  if (withSkills) {
    installSkills(force, dryRun);
  }

  if (dryRun) {
    console.log(`
\x1b[1m\x1b[35m[DRY-RUN] Simulation complete. No changes written to disk.\x1b[0m
\x1b[90mRun again without --dry-run to apply changes.\x1b[0m
`);
  } else {
    console.log(`
\x1b[1m\x1b[32m✔ AIMASTER initialized successfully.\x1b[0m
\x1b[90mStart your AI IDE or open a new chat session to activate the Agentic Boardroom.\x1b[0m
- Constitutional Reference: \x1b[36mRulesAI.md\x1b[0m
- Documentation & Skills: \x1b[36mhttps://github.com/Furkaxia/AiMaster\x1b[0m
`);
  }
}

main().catch((err) => {
  console.error('\x1b[31m✖ Error during initialization:\x1b[0m', err.message);
  process.exit(1);
});
