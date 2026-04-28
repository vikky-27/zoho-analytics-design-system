# Pipeline — Zoho Analytics Design System

> **Purpose:** AI agent chain that converts a component brief into a fully token-bound, quality-gated Figma component.  
> **Execution model:** 5 specialized agents in sequence. Only the Orchestrator makes Figma MCP write calls.

---

## Agent Chain

```
┌─────────────────────────────────────────────────────────────────────┐
│                        PIPELINE INPUT                                │
│  Text brief  /  Screenshot  /  Figma link  /  Partial JSON          │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
                           ▼
          ┌────────────────────────────────┐
          │   00  CODE AGENT               │  → reads codebase/ (READ ONLY)
          │   agents/00-code-agent.md      │  → extracts exact props/variants
          │   Output: { status: "COMPLETE"}│    from production source code
          └─────────────────┬──────────────┘
                            │
                            ▼
          ┌────────────────────────────────┐
          │   01  SPEC AGENT               │  → validates brief
          │   agents/01-spec-agent.md      │  → outputs: component spec JSON
          │   Output: { status: "VALID" }  │    (uses Code Agent output first)
          └─────────────────┬──────────────┘
                            │
                            ▼
          ┌────────────────────────────────┐
          │   02  TOKEN RESOLVER AGENT     │  → resolves all token dot-paths
          │   02-token-resolver-agent.md   │  → outputs: hex/px + Figma RGB
          │   Output: { status: "RESOLVED"}│    (uses exactMeasurements from 00)
          └─────────────────┬──────────────┘
                            │
               ┌────────────┴────────────┐
               │  (optional if you have  │
               │   a reference image)    │
               ▼                         │
  ┌────────────────────────────────┐     │
  │   03  VISION AGENT             │     │
  │   03-vision-agent.md           │     │
  │   Input: screenshot / figma    │     │
  │   Output: extractedStyles JSON │     │
  │   (skips structure if 00 ran)  │     │
  └─────────────────┬──────────────┘     │
                    └────────────┬───────┘
                                 │
                                 ▼
          ┌────────────────────────────────────────────────┐
          │   04  ORCHESTRATOR AGENT                        │
          │   04-orchestrator-agent.md                      │
          │                                                  │
          │   STEP 0   Figma MCP connectivity gate ⛔       │
          │   STEP 0b  Code Agent output ingestion          │
          │   STEP 1   Validate all inputs                  │
          │   STEP 2   Resolve conflicts (Code > URL > Vis) │
          │   STEP 3   Check library components             │
          │   STEP 4   Load auto-layout rules               │
          │   STEP 5   ── CONFIRM WITH USER ──              │
          │               "proceed" / "edit" / "cancel"     │
          │   STEP 6   Pre-flight (PF1–PF5) ← no iteration │
          │   STEP 7   Execute Figma MCP calls              │
          │   STEP 8   Token audit G2   ← no iteration     │
          │   STEP 9   Screenshot + verify G1  ← iterates  │
          │   STEP 10  A11y check G3                        │
          │   STEP 11  Human review → publish               │
          │   STEP 12  Auto-generate component files        │
          └────────────────────────────────────────────────┘
```

---

## ⛔ Prime Directive (Highest Priority Rule)

> **The only valid output of this pipeline is a published Figma component.**

| Input given | What the pipeline MUST do | What it must NEVER do |
|---|---|---|
| Screenshot | Build the component in Figma | Output .md or .json as a substitute |
| Figma link | Build/update the component in Figma | Treat "reading the link" as done |
| Description | Build the component in Figma | Output a spec JSON and stop |
| No Bridge connection | Output PIPELINE BLOCKED | Generate any files as fallback |

`.md` docs and `.json` configs are **only created in STEP 12**, after:
1. STEP 0 — Figma Bridge connected ✅
2. STEP 7 — Component built (`componentSetId` exists) ✅
3. STEP 11 — Published to library ✅

**Each upstream agent (00→03) outputs intermediate data — not a component. The pipeline is not done until STEP 11 completes.**

---

## Quality Gates

| Gate | Tool | Pass Criteria | Runs |
|---|---|---|---|
| **G2** Token Audit | `scripts/token-audit.js` | 0 FAIL issues | Before screenshot |
| **G1** Visual Diff | `config/verify-rubric.json` | Score ≥ 14 / 16 | After token audit |
| **G3** A11y Check | Inline figma_execute checks | Contrast ≥ 4.5:1, targets ≥ 44px, labels named | After visual diff |

G2 runs first — no point screenshotting a component that still has hardcoded values.

---

## Fix Loop — Surgical Mode

Only Steps 7→8→9 count as one iteration. Pre-flight and token audit fixes are free.

```
Attempt 1 → FAIL → run fixActions for failed checks ONLY → re-verify
Attempt 2 → FAIL → same-check repeat? → PARTIAL ESCALATE that check
                   new failures? → run fixActions for new failures only
Attempt 3 → FAIL → ESCALATE TO HUMAN — all MCP execution stops
```

**Key rules:**
- Re-run **only** the `fixActions` code for failed check IDs — never rebuild passing checks
- C10 (naming) failure alone: fix inline, no iteration consumed (earlyWinRule)
- Same check failing twice in a row: escalate that check to human, continue for the rest
- PASS threshold: **14/16** (v2.0) — a single weight-2 miss is WARN not FAIL

Config: [config/pipeline-config.json](config/pipeline-config.json) → `iterationGuard`  
Rubric: [config/verify-rubric.json](config/verify-rubric.json) → `fixActions` per check

---

## Files in This Folder

| File | Purpose |
|---|---|
| `agents/00-code-agent.md` | Reads codebase/ (READ ONLY) → extracts exact props/variants from production source |
| `agents/01-spec-agent.md` | Parses raw brief → validated component spec JSON (uses Code Agent output first) |
| `agents/02-token-resolver-agent.md` | Resolves token dot-paths → hex/px/Figma RGB values |
| `agents/03-vision-agent.md` | Analyzes reference images → maps styles to token paths (structure from Code Agent) |
| `agents/04-orchestrator-agent.md` | Master coordinator — only agent with Figma MCP write access |
| `config/pipeline-config.json` | Global pipeline rules, iteration guard, quality gate order |
| `config/component-spec-schema.json` | JSON Schema validating component spec input contract |
| `config/verify-rubric.json` | 10-check visual verification rubric with scoring thresholds |
| `config/component-file-template.json` | Template for auto-generated component config JSON (Step 12) |
| `config/component-doc-template.md` | Template for auto-generated component doc MD (Step 12) |
| `scripts/token-audit.js` | Figma console script — detects hardcoded values in components |

---

## How to Start a Run

1. Run **Code Agent** (`00-code-agent.md`) — reads `codebase/` to extract exact props/variants for your component
2. Feed your brief to **Spec Agent** (`01-spec-agent.md`) — pass Code Agent output as highest-priority input
3. Pass its `spec` output to **Token Resolver Agent** (`02-token-resolver-agent.md`)
4. Optionally pass reference screenshots to **Vision Agent** (`03-vision-agent.md`) — structure comes from Code Agent, Vision only extracts colors/shadows
5. Merge all outputs and start **Orchestrator Agent** (`04-orchestrator-agent.md`)
6. Orchestrator runs STEP 0 (Figma MCP connectivity gate) — **pipeline hard-blocks if Bridge is not connected**
7. Review the plan → reply `proceed` → pipeline executes

> The Orchestrator will not make a single Figma MCP call until you reply `"proceed"` at STEP 5.  
> Config files are NEVER generated without a live Figma connection and a successfully published component.

---

## Key Source Files (referenced by agents)

| Reference | Path |
|---|---|
| **Product codebase (READ ONLY)** | `codebase/zohoanalytics/` and `codebase/zohoanalyticsclient/` |
| Token lookup | `../tokens/resolved-tokens.json` |
| Auto-layout rules | `../tokens/components/auto-layout-rules.json` |
| Spec schema | `config/component-spec-schema.json` |
| Verify rubric | `config/verify-rubric.json` |
| Pipeline config | `config/pipeline-config.json` |
| Token audit script | `scripts/token-audit.js` |

> `codebase/` contains the Zoho Analytics production repo — used by Code Agent (00) to extract exact `get attrs()` props, CSS class patterns, and SCSS measurements. **Never write to these directories.**
