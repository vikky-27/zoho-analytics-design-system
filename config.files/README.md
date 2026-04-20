# Zoho Analytics Design System — AI Pipeline

> **Figma Source:** [Design System – Zoho Analytics](https://www.figma.com/design/m2iOWX3I9aDI5kgyw4wCo0/Design-System--Zoho-Analytics)  
> **Stack:** Claude + Figma MCP (Desktop Bridge Plugin)  
> **Purpose:** AI-driven pipeline to create pixel-perfect Figma components from design briefs, fully token-bound, zero hardcoded values.

---

## Folder Map

```
config.files/
├── pipeline/                ← AI agent pipeline (system prompts + config + scripts)
│   ├── README.md            ← Pipeline flow, agent chain, quick-start
│   ├── agents/              ← 4 specialized agent system prompts (ordered)
│   ├── config/              ← Runtime config (pipeline rules, spec schema, rubric)
│   └── scripts/             ← Figma console scripts (run via figma_execute)
│
├── tokens/                  ← Design token source of truth (JSON only)
│   ├── foundations/         ← Primitive + semantic token definitions (9 files)
│   ├── components/          ← Per-component token configs + auto-layout rules
│   └── resolved-tokens.json ← Flat pre-resolved lookup (agent single source of truth)
│
├── docs/                    ← Human-readable documentation
│   ├── foundations/         ← Token layer docs (colors, spacing, typography)
│   └── components/          ← Component usage docs (button, input, card, etc.)
│
└── allCollectionTokens.json ← Raw Figma collection export (reference data)
```

---

## Quick Links

| What you need | Where |
|---|---|
| Run the AI pipeline | [pipeline/README.md](pipeline/README.md) |
| Agent system prompts | [pipeline/agents/](pipeline/agents/) |
| Token lookup values | [tokens/resolved-tokens.json](tokens/resolved-tokens.json) |
| Component token configs | [tokens/components/](tokens/components/) |
| Build a component (manual) | [docs/COMPONENT-CREATION-GUIDE.md](docs/COMPONENT-CREATION-GUIDE.md) |
| Figma audit script | [pipeline/scripts/token-audit.js](pipeline/scripts/token-audit.js) |

---

## Three Non-Negotiable Rules

**1. Always instantiate from the library — never build from scratch.**  
Use `figma_instantiate_component({ componentKey: "..." })` with a variant key (40-char hex).

**2. All values must be token-bound — zero hardcoded hex/px.**  
Every fill, stroke, radius, padding, gap, font size must reference a path from `resolved-tokens.json`.

**3. Confirm before executing — never auto-publish.**  
The Orchestrator Agent outputs a full plan and waits for `"proceed"` before any Figma MCP write call.

---

## Pipeline at a Glance

```
Brief (text / screenshot / Figma link)
        │
        ▼
  [01] Spec Agent ──────────────── validates brief → component spec JSON
        │
        ▼
  [02] Token Resolver Agent ─────── resolves token paths → hex/px/Figma RGB
        │
        ▼
  [03] Vision Agent (optional) ──── reference image → style observations
        │
        ▼
  [04] Orchestrator Agent ───────── merges all → PLAN → proceed → MCP → audit → verify → publish
```

See [pipeline/README.md](pipeline/README.md) for the full 10-step execution flow.
