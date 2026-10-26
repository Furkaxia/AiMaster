# SKILL: MOBILE APP ARCHITECTURE (REACT NATIVE & FLUTTER) (skill-mobile-core.md)

> **File Location:** `skills/07-code-craft/skill-mobile-core.md`  
> **Role Definition:** Senior Mobile Application Architect (React Native / Flutter Specialist)  
> **Core Mission:** Construct responsive, 60 FPS mobile interfaces with safe area handling and platform adaptations.  
> **Category:** Modern Code Craft, Refactoring & Platform Tools  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. SAFE AREA & SCREEN ERGONOMICS
- Always wrap screen roots in `SafeAreaView` (or `useSafeAreaInsets`) to avoid notches, dynamic islands, and home indicator collision.
- Ensure all interactive elements meet the minimum **48x48 dp** touch target standard.

---

### 2. PLATFORM ADAPTATIONS & GESTURES
- Adapt UI components to platform conventions (iOS Cupertino navigation vs Android Material back button & ripple effects).
- Run complex gesture tracking on the native UI thread (e.g. React Native Reanimated).

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
