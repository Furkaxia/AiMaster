#!/usr/bin/env bash
# ==============================================================================
# AIMASTER OS — Zero-Config Installer (install.sh)
# https://github.com/Furkaxia/AiMaster
#
# Usage:
#   curl -fsSL https://raw.githubusercontent.com/Furkaxia/AiMaster/main/install.sh | bash
#   curl -fsSL https://raw.githubusercontent.com/Furkaxia/AiMaster/main/install.sh | bash -s -- --ide cursor --with-skills
#   curl -fsSL https://raw.githubusercontent.com/Furkaxia/AiMaster/main/install.sh | bash -s -- --ide all --force
# ==============================================================================

set -e

CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${CYAN}"
echo "⚡ AIMASTER — Agentic Operating System & Multi-Persona Boardroom"
echo "Transforming AI Coding Models into a Disciplined Staff Engineering Council"
echo -e "${NC}"

REPO_URL="https://raw.githubusercontent.com/Furkaxia/AiMaster/main"
IDE="${IDE:-cursor}"
WITH_SKILLS=false
FORCE=false
BACKUP_DIR=""

while [[ $# -gt 0 ]]; do
  case $1 in
    --ide)
      IDE="$2"
      shift 2
      ;;
    --with-skills)
      WITH_SKILLS=true
      shift
      ;;
    --force)
      FORCE=true
      shift
      ;;
    *)
      shift
      ;;
  esac
done

echo -e "Installing AIMASTER configuration for: ${CYAN}${IDE}${NC}"

get_backup_dir() {
  if [ -z "$BACKUP_DIR" ]; then
    BACKUP_DIR=".aimaster-backup-$(date +%Y%m%d%H%M%S)"
    mkdir -p "$BACKUP_DIR"
    echo -e "${CYAN}📦 Safety Backup directory initialized: ${BACKUP_DIR}${NC}"
  fi
}

download_file() {
  local src_url="$1"
  local dest_path="$2"
  local dest_dir
  dest_dir=$(dirname "$dest_path")
  mkdir -p "$dest_dir"

  if [ -f "$dest_path" ]; then
    if [ "$FORCE" != true ]; then
      echo -e "${YELLOW}⚠ Skipped: ${dest_path} already exists (use --force to overwrite)${NC}"
      return 0
    fi
    get_backup_dir
    local backup_target="${BACKUP_DIR}/${dest_path}"
    mkdir -p "$(dirname "$backup_target")"
    cp "$dest_path" "$backup_target"
  fi

  if curl -fsSL "$src_url" -o "$dest_path"; then
    echo -e "${GREEN}✔ Installed: ${dest_path}${NC}"
  else
    echo -e "${RED}✖ Failed to download: ${src_url}${NC}"
    return 1
  fi
}

# 1. Download Constitutional RulesAI.md
download_file "${REPO_URL}/RulesAI.md" "RulesAI.md"

# 2. Download Selected IDE Preset
case "$IDE" in
  cursor)
    download_file "${REPO_URL}/integrations/cursor/.cursorrules" ".cursorrules"
    ;;
  windsurf)
    download_file "${REPO_URL}/integrations/windsurf/.windsurfrules" ".windsurfrules"
    ;;
  antigravity)
    download_file "${REPO_URL}/integrations/antigravity/GEMINI.md" "GEMINI.md"
    ;;
  copilot)
    download_file "${REPO_URL}/integrations/copilot/copilot-instructions.md" ".github/copilot-instructions.md"
    ;;
  claude)
    download_file "${REPO_URL}/integrations/claude/claude-project-prompt.md" "CLAUDE.md"
    ;;
  chatgpt)
    download_file "${REPO_URL}/integrations/chatgpt/custom-instructions.md" "aimaster-instructions.md"
    ;;
  all)
    download_file "${REPO_URL}/integrations/cursor/.cursorrules" ".cursorrules"
    download_file "${REPO_URL}/integrations/windsurf/.windsurfrules" ".windsurfrules"
    download_file "${REPO_URL}/integrations/antigravity/GEMINI.md" "GEMINI.md"
    download_file "${REPO_URL}/integrations/copilot/copilot-instructions.md" ".github/copilot-instructions.md"
    download_file "${REPO_URL}/integrations/claude/claude-project-prompt.md" "CLAUDE.md"
    download_file "${REPO_URL}/integrations/chatgpt/custom-instructions.md" "aimaster-instructions.md"
    ;;
  *)
    echo -e "${YELLOW}Unknown IDE '${IDE}', installing default Cursor rules.${NC}"
    download_file "${REPO_URL}/integrations/cursor/.cursorrules" ".cursorrules"
    ;;
esac

# 3. Optional Skills Installation
if [ "$WITH_SKILLS" = true ]; then
  echo -e "\n${CYAN}⏳ Fetching 80 domain skills...${NC}"
  if [ -d "skills" ]; then
    if [ "$FORCE" != true ]; then
      echo -e "${YELLOW}⚠ Skipped: ./skills/ already exists (use --force to overwrite)${NC}"
    else
      get_backup_dir
      cp -r skills "${BACKUP_DIR}/skills"
      echo -e "${CYAN}📦 Backed up existing ./skills/ to ${BACKUP_DIR}/skills${NC}"
      mkdir -p skills
      if curl -fsSL "https://github.com/Furkaxia/AiMaster/archive/refs/heads/main.tar.gz" | tar -xz --strip-components=1 "AiMaster-main/skills" 2>/dev/null; then
        echo -e "${GREEN}✔ Installed 80 domain skills -> ./skills/${NC}"
      else
        echo -e "${YELLOW}⚠ Tarball download failed. Run 'npx aimaster-os' to install skills cleanly.${NC}"
      fi
    fi
  else
    mkdir -p skills
    if curl -fsSL "https://github.com/Furkaxia/AiMaster/archive/refs/heads/main.tar.gz" | tar -xz --strip-components=1 "AiMaster-main/skills" 2>/dev/null; then
      echo -e "${GREEN}✔ Installed 80 domain skills -> ./skills/${NC}"
    else
      echo -e "${YELLOW}⚠ Tarball download failed. Run 'npx aimaster-os' to install skills cleanly.${NC}"
    fi
  fi
else
  echo -e "\n${CYAN}💡 Tip: Run with '--with-skills' or use 'npx aimaster-os' to include all 80 domain skills.${NC}"
fi

echo -e "\n${GREEN}🎉 AIMASTER successfully initialized!${NC}"
echo -e "Open your project in ${CYAN}${IDE}${NC} to activate the Boardroom protocol."
