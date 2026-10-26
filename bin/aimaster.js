#!/usr/bin/env node

/**
 * AIMASTER CLI — Zero-Config Installer & Architecture Manager
 * https://github.com/Furkaxia/AiMaster
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const REPO_ROOT = path.resolve(__dirname, '..');
const TARGET_DIR = process.cwd();

const BANNER = `
\x1b[1m\x1b[36m⚡ AIMASTER CLI — Autonomous Agentic Engineering OS\x1b[0m
\x1b[90mTransforming AI Coding Models into a Disciplined Staff Engineering Council\x1b[0m
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
  npx aimaster init [options]
  aimaster init [options]

\x1b[1mOPTIONS:\x1b[0m
  --ide <name>      Target IDE: cursor, windsurf, antigravity, copilot, claude, chatgpt, all
  --with-skills     Install all 80 specialized domain skills to ./skills/
  --force           Overwrite existing preset files without prompting
  -h, --help        Display this help information
  -v, --version     Display version

\x1b[1mEXAMPLES:\x1b[0m
  npx aimaster init --ide cursor
  npx aimaster init --ide windsurf --with-skills
  npx aimaster init --ide all
`);
}

function installPreset(key, force = false) {
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

  const destDir = path.dirname(destPath);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  if (fs.existsSync(destPath) && !force) {
    console.log(`\x1b[33m⚠ Skipped: ${preset.dest} already exists (use --force to overwrite)\x1b[0m`);
    return true;
  }

  fs.copyFileSync(srcPath, destPath);
  console.log(`\x1b[32m✔ Installed ${preset.name} preset -> ${preset.dest}\x1b[0m`);
  return true;
}

function installRulesAI(force = false) {
  const src = path.join(REPO_ROOT, 'RulesAI.md');
  const dest = path.join(TARGET_DIR, 'RulesAI.md');
  if (fs.existsSync(src)) {
    if (!fs.existsSync(dest) || force) {
      fs.copyFileSync(src, dest);
      console.log(`\x1b[32m✔ Installed Constitutional Rules -> RulesAI.md\x1b[0m`);
    } else {
      console.log(`\x1b[33m⚠ Skipped: RulesAI.md already exists\x1b[0m`);
    }
  }
}

function installSkills(force = false) {
  const src = path.join(REPO_ROOT, 'skills');
  const dest = path.join(TARGET_DIR, 'skills');
  if (fs.existsSync(src)) {
    if (!fs.existsSync(dest) || force) {
      console.log(`\x1b[36m⏳ Copying 80 domain skills to ./skills/... \x1b[0m`);
      copyRecursiveSync(src, dest);
      console.log(`\x1b[32m✔ Installed 80 domain skills -> ./skills/\x1b[0m`);
    } else {
      console.log(`\x1b[33m⚠ Skipped: ./skills/ directory already exists\x1b[0m`);
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
      console.log('aimaster v1.0.0');
    }
    process.exit(0);
  }

  console.log(BANNER);

  const force = args.includes('--force');
  const withSkills = args.includes('--with-skills');

  let ideIndex = args.indexOf('--ide');
  let selectedIDE = ideIndex !== -1 && args[ideIndex + 1] ? args[ideIndex + 1].toLowerCase() : null;

  if (!selectedIDE) {
    if (process.stdout.isTTY) {
      selectedIDE = await promptSelectIDE();
    } else {
      selectedIDE = 'cursor';
    }
  }

  console.log(`\n\x1b[1m🚀 Initializing AIMASTER for: \x1b[36m${selectedIDE.toUpperCase()}\x1b[0m\n`);

  if (selectedIDE === 'all') {
    Object.keys(PRESETS).forEach((key) => installPreset(key, force));
  } else {
    installPreset(selectedIDE, force);
  }

  installRulesAI(force);

  if (withSkills) {
    installSkills(force);
  }

  console.log(`
\x1b[1m\x1b[32m🎉 AIMASTER successfully initialized!\x1b[0m
\x1b[90mStart your AI IDE or open a new chat session to activate the Agentic Boardroom.\x1b[0m
- Constitutional Reference: \x1b[36mRulesAI.md\x1b[0m
- Documentation & Skills: \x1b[36mhttps://github.com/Furkaxia/AiMaster\x1b[0m
`);
}

main().catch((err) => {
  console.error('\x1b[31m✖ Error during initialization:\x1b[0m', err.message);
  process.exit(1);
});
