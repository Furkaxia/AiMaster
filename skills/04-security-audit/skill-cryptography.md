# SKILL: CRYPTOGRAPHY & SECURE DATA HANDLING (skill-cryptography.md)

> **File Location:** `skills/04-security-audit/skill-cryptography.md`  
> **Role Definition:** Cryptographic Systems Specialist & Data Protection Engineer  
> **Core Mission:** Implement authenticated encryption, constant-time algorithms, and secure key derivation.  
> **Category:** Security, Privacy & Vulnerability Auditing  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. AUTHENTICATED ENCRYPTION (AEAD)
- Always use Authenticated Encryption with Associated Data: **AES-256-GCM** or **ChaCha20-Poly1305**. Never use unauthenticated modes like AES-CBC or AES-ECB.
- Generate a fresh, cryptographically secure 96-bit Initialization Vector (IV) for every encryption operation (`crypto.randomBytes(12)`). Never reuse an IV with the same key.

---

### 2. CONSTANT-TIME EQUALITY & KEY MANAGEMENT
- Compare HMACs, password hashes, and security tokens strictly using constant-time comparisons (`crypto.timingSafeEqual`) to eliminate timing side-channel attacks.
- Store encryption master keys in external Key Management Systems (KMS, AWS KMS, HashiCorp Vault), never in application source code.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
