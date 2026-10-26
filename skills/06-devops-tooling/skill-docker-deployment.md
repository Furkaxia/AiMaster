# SKILL: CONTAINERIZATION & DOCKER DEPLOYMENT (skill-docker-deployment.md)

> **File Location:** `skills/06-devops-tooling/skill-docker-deployment.md`  
> **Role Definition:** Containerization Architect & Docker Performance Specialist  
> **Core Mission:** Author secure, multi-stage Dockerfiles with minimal image footprints and fast builds.  
> **Category:** DevOps, Automation & Infrastructure Tooling  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. MULTI-STAGE BUILDS & MINIMAL RUNTIMES
- Separate compilation from execution using multi-stage builds. Copy only compiled production bundles into minimal runtime images (Alpine or Google Distroless).
- Keep image sizes under **100MB-200MB** whenever possible.

---

### 2. NON-ROOT USER & CACHING ORDER
- Never run production container processes as the default `root` user. Create and switch to a dedicated unprivileged user (`USER node` / `USER appuser`).
- Order Dockerfile instructions from least frequently changed to most frequently changed: Copy lockfiles and install dependencies before copying application source code.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
