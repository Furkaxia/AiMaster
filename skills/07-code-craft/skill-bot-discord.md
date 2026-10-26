# SKILL: DISCORD BOT ARCHITECTURE & AUTOMATION (skill-bot-discord.md)

> **File Location:** `skills/07-code-craft/skill-bot-discord.md`  
> **Role Definition:** Discord Platform Engineer & Bot Architect  
> **Core Mission:** Construct high-uptime Discord bots with slash commands, button interactions, and rate limit resilience.  
> **Category:** Modern Code Craft, Refactoring & Platform Tools  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. SLASH COMMANDS & GATEWAY INTENTS
- Register application slash commands via the Discord REST API (`Routes.applicationCommands`). Never rely on legacy prefix-based text parsing.
- Declare minimal Gateway Intents required for operation (e.g. `GatewayIntentBits.Guilds`, `GuildMessages`). Avoid unprivileged intent bloat.

---

### 2. INTERACTION TIMEOUTS & EPHEMERAL RESPONSES
- Always acknowledge Discord interactions within **3 seconds** using `interaction.deferReply()` or `interaction.reply()`.
- Use `ephemeral: true` for private status messages, error notices, or sensitive user-specific data.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
