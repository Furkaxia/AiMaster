# SKILL: DESKTOP APPLICATION ARCHITECTURE (ELECTRON & TAURI) (skill-desktop-app.md)

> **File Location:** `skills/07-code-craft/skill-desktop-app.md`  
> **Role Definition:** Desktop Applications Architect (Electron / Tauri Specialist)  
> **Core Mission:** Engineer secure desktop apps with isolated IPC bridges, offline storage, and native OS integrations.  
> **Category:** Modern Code Craft, Refactoring & Platform Tools  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. SECURE INTER-PROCESS COMMUNICATION (IPC)
- Always isolate renderer processes: Enable `contextIsolation: true` and disable `nodeIntegration: false` in Electron webPreferences.
- Expose strictly typed APIs via `contextBridge.exposeInMainWorld`. Use bidirectional `ipcRenderer.invoke()` and `ipcMain.handle()`.

---

### 2. OFFLINE ASSETS & NATIVE INTEGRATION
- Bundle all frontend assets locally. Never rely on external CDN scripts that fail when the user is disconnected from the internet.
- Handle native window lifecycle, system tray, and keyboard accelerators natively.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
