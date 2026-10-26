#!/usr/bin/env bash
# ==============================================================================
# AIMASTER OS — Zero-Config Installer (install.sh)
# https://github.com/Furkaxia/AiMaster
#
# Usage:
#   curl -fsSL https://raw.githubusercontent.com/Furkaxia/AiMaster/main/install.sh | bash
#   curl -fsSL https://raw.githubusercontent.com/Furkaxia/AiMaster/main/install.sh | bash -s -- --ide cursor
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
    *)
      shift
      ;;
  esac
done

echo -e "Installing AIMASTER configuration for: ${CYAN}${IDE}${NC}"

download_file() {
  local src_url="$1"
  local dest_path="$2"
  local dest_dir
  dest_dir=$(dirname "$dest_path")
  mkdir -p "$dest_dir"
  
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

echo -e "\n${GREEN}🎉 AIMASTER successfully initialized!${NC}"
echo -e "Open your project in ${CYAN}${IDE}${NC} to activate the Boardroom protocol."
