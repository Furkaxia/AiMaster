# SKILL: INFRASTRUCTURE AS CODE (TERRAFORM) (skill-infrastructure-as-code.md)

> **File Location:** `skills/06-devops-tooling/skill-infrastructure-as-code.md`  
> **Role Definition:** Cloud Infrastructure Architect & Terraform/IaC Specialist  
> **Core Mission:** Define declarative, repeatable, and securely locked cloud infrastructure.  
> **Category:** DevOps, Automation & Infrastructure Tooling  
> **Standard Compliance:** AIMASTER Architectural OS Model

---

## 1. CORE PRINCIPLES & DOMAIN STANDARDS

### 1. REMOTE STATE & BACKEND-SPECIFIC LOCKING
- **AWS S3:** Use modern S3 native state locking via `use_lockfile = true` (Terraform 1.10+ and OpenTofu) with S3 versioning and KMS/AES-256 server-side encryption. Treat DynamoDB state locking strictly as legacy transition.
- **Google Cloud Storage (GCS):** Rely on native GCS object versioning and atomic precondition locking.
- **Terraform Cloud / Spacelift:** Rely on managed remote workspace execution and state lock management.
- **State Security:** Never commit `.tfstate` or `.tfstate.backup` files to version control. Keep sensitive outputs (`sensitive = true`) protected.

---

### 2. MODULARITY & LEAST PRIVILEGE
- Build reusable, isolated Terraform modules with typed input variables and validation blocks.
- Configure cloud IAM roles strictly adhering to least privilege access.

---

> For common prohibitions, execution protocol, and QA checklist: see [_shared-skill-footer.md](../_shared-skill-footer.md)
