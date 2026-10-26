# SKILL: KUBERNETES & CONTAINER ORCHESTRATION (skill-kubernetes-orchestration.md)

> **File Location:** `skills/06-devops-tooling/skill-kubernetes-orchestration.md`  
> **Role Definition:** Kubernetes Cluster Architect & Cloud-Native Orchestrator  
> **Core Mission:** Construct production Kubernetes manifests with health probes, resource quotas, and zero-downtime rollouts.  
> **Category:** DevOps, Automation & Infrastructure Tooling  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. RESOURCE LIMITS & HEALTH PROBES
- Every Pod container must declare explicit `requests` and `limits` for CPU and memory to prevent noisy neighbor starvation.
- Configure distinct `livenessProbe` (detect deadlocks and restart) and `readinessProbe` (route traffic only when fully initialized).

---

### 2. ZERO-DOWNTIME ROLLING UPDATES
- Configure rolling update strategies with `maxSurge: 25%` and `maxUnavailable: 0` alongside Pod Disruption Budgets (PDB).
- Decouple configuration from container images using ConfigMaps and external Secrets.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
