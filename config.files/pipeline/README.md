# Pipeline — Zoho Analytics Design System

> **Purpose:** AI agent chain that converts a component brief into a fully token-bound, quality-gated Figma component.  
> **Execution model:** 4 specialized agents in sequence. Only the Orchestrator makes Figma MCP write calls.

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
          │   01  SPEC AGENT               │  → validates brief
          │   agents/01-spec-agent.md      │  → outputs: component spec JSON
          │   Output: { status: "VALID" }  │
          └─────────────────┬──────────────┘
                            │
                            ▼
          ┌────────────────────────────────┐
          │   02  TOKEN RESOLVER AGENT     │  → resolves all token dot-paths
          │   02-token-resolver-agent.md   │  → outputs: hex/px + Figma RGB
          │   Output: { status: "RESOLVED"}│
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
  └─────────────────┬──────────────┘     │
                    └────────────┬───────┘
                                 │
                                 ▼
          ┌────────────────────────────────────────────────┐
          │   04  ORCHESTRATOR AGENT                        │
          │   04-orchestrator-agent.md                      │
          │                                                  │
          │   STEP 1   Validate all inputs                  │
          │   STEP 2   Resolve conflicts                    │
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

## Quality Gates

| Gate | Tool | Pass Criteria | Runs |
|---|---|---|---|
| **G2** Token Audit | `scripts/token-audit.js` | 0 FAIL issues | Before screenshot |
| **G1** Visual Diff | `config/verify-rubric.json` | Score ≥ 15 / 16 | After token audit |
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
| `agents/01-spec-agent.md` | Parses raw brief → validated component spec JSON |
| `agents/02-token-resolver-agent.md` | Resolves token dot-paths → hex/px/Figma RGB values |
| `agents/03-vision-agent.md` | Analyzes reference images → maps styles to token paths |
| `agents/04-orchestrator-agent.md` | Master coordinator — only agent with Figma MCP write access |
| `config/pipeline-config.json` | Global pipeline rules, iteration guard, quality gate order |
| `config/component-spec-schema.json` | JSON Schema validating component spec input contract |
| `config/verify-rubric.json` | 10-check visual verification rubric with scoring thresholds |
| `config/component-file-template.json` | Template for auto-generated component config JSON (Step 11) |
| `config/component-doc-template.md` | Template for auto-generated component doc MD (Step 11) |
| `scripts/token-audit.js` | Figma console script — detects hardcoded values in components |

---

## How to Start a Run

1. Feed your brief to **Spec Agent** (`01-spec-agent.md`)
2. Pass its `spec` output to **Token Resolver Agent** (`02-token-resolver-agent.md`)
3. Optionally pass a reference screenshot to **Vision Agent** (`03-vision-agent.md`)
4. Merge all outputs and start **Orchestrator Agent** (`04-orchestrator-agent.md`)
5. Review the plan → reply `proceed` → pipeline executes

> The Orchestrator will not make a single Figma MCP call until you reply `"proceed"` at Step 5.

---

## Key Source Files (referenced by agents)

| Reference | Path |
|---|---|
| Token lookup | `../tokens/resolved-tokens.json` |
| Auto-layout rules | `../tokens/components/auto-layout-rules.json` |
| Spec schema | `config/component-spec-schema.json` |
| Verify rubric | `config/verify-rubric.json` |
| Pipeline config | `config/pipeline-config.json` |
| Token audit script | `scripts/token-audit.js` |
