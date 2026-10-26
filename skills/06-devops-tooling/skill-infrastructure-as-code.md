# SKILL: INFRASTRUCTURE AS CODE (TERRAFORM) (skill-infrastructure-as-code.md)

> **File Location:** `skills/06-devops-tooling/skill-infrastructure-as-code.md`  
> **Role Definition:** Cloud Infrastructure Architect & Terraform/IaC Specialist  
> **Core Mission:** Define declarative, repeatable, and securely locked cloud infrastructure.  
> **Category:** DevOps, Automation & Infrastructure Tooling  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. REMOTE STATE & DISTRIBUTED LOCKING
- Store Terraform state remotely (AWS S3, GCS, Terraform Cloud) with server-side encryption and distributed locking (DynamoDB).
- Never commit `.tfstate` or `.tfstate.backup` files to version control.

---

### 2. MODULARITY & LEAST PRIVILEGE
- Build reusable, isolated Terraform modules with typed input variables and validation blocks.
- Configure cloud IAM roles strictly adhering to least privilege access.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
