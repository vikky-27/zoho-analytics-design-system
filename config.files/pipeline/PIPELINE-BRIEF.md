<!--
  ZOHO ANALYTICS DESIGN SYSTEM — COMPONENT BUILD BRIEF
  ─────────────────────────────────────────────────────
  HOW TO USE (for team members):
    1. Fill in the BRIEF section below
    2. Drag this file into your Claude agent chat
    3. Attach screenshots directly to the same chat message
    4. Type "build" — the agent will run the full pipeline

  The agent reads this file and builds the component in Figma.
  You do NOT need to explain the pipeline. Just fill in the brief.
-->

# Component Build Brief — Zoho Analytics Design System

---

## ← FILL THIS IN

| Field | Your Input |
|---|---|
| **Component name** | *(e.g. Pagination, Accordion, Progress Bar, Tabs)* |
| **Figma link** | *(optional — paste figma.com/design/… URL, or leave blank)* |
| **Notes / requirements** | *(optional — any special states, sizes, or constraints)* |

**Screenshots:** Attach PNG/JPG screenshots to this chat alongside this file.  
Each screenshot should show one variant or state of the component.  
Multiple screenshots = multiple variants → will be combined into one COMPONENT_SET.

---

## → AGENT: READ AND FOLLOW THIS EXACTLY

You are building a **Figma design system component** for Zoho Analytics.  
Read and run the full pipeline defined in `config.files/pipeline/agents/`.

---

### ⛔ PRIME DIRECTIVE

```
THE ONLY VALID OUTPUT IS A PUBLISHED FIGMA COMPONENT.

Do NOT generate .md files, .json configs, or code as the deliverable.
Do NOT stop after outputting a spec, plan, or token values.
Files are only created in STEP 12 after the component is published.
```

---

### STEP 0 — Figma Bridge check (run this FIRST, before anything else)

```js
figma_get_metadata({ fileKey: "m2iOWX3I9aDI5kgyw4wCo0" })
```

- Returns file name → ✅ Proceed to STEP 00
- Fails / times out → ⛔ **PIPELINE BLOCKED** — output setup instructions, stop, generate NO files

---

### STEP 00 — Code Agent (auto-run)

Read: `config.files/pipeline/agents/00-code-agent.md`  
Look up the component in `codebase/zohoanalytics/` and `codebase/zohoanalyticsclient/`.  
Extract: exact variantAxes, booleanProperties, textProperties, measurements.  
Output: `codeAgent` JSON block. Continue even if NOT_FOUND.

---

### STEP 01–04 — Run the full agent chain

Run each agent in order, passing outputs forward:

1. **Vision Agent** → `config.files/pipeline/agents/03-vision-agent.md`  
   - Code Agent found the component? → extract **colors and shadows only** from screenshots (skip structure inference)
   - Code Agent NOT_FOUND? → full multi-input synthesis from screenshots
   - **Screenshot fidelity rule** (see below)

2. **Spec Agent** → `config.files/pipeline/agents/01-spec-agent.md`  
   Code Agent output = highest priority input. Use it directly for structure.

3. **Token Resolver** → `config.files/pipeline/agents/02-token-resolver-agent.md`  
   Code Agent has exact measurements? → use them directly, skip px resolution.

4. **Orchestrator** → `config.files/pipeline/agents/04-orchestrator-agent.md`  
   Follows all pipeline steps (STEP 1–12).

---

### KEY RULES (these apply on top of the agent files)

#### Rule 1 — Search before creating (MANDATORY)

Before building anything new:
1. Read `config.files/docs/COMPONENT-REGISTRY.md` — if component is `✅ Done`, **find and reuse it, never duplicate**
2. Run `figma_get_library_components` with the component name AND `ZA{name}` prefix
3. Scan all Figma pages with `page.findAll()`
4. Custom build is only permitted when all searches return nothing AND registry = `⏳ Pending`

#### Rule 2 — Icon and image placeholders (ALWAYS — never import real icons)

**Icons:**
```js
const iconSlot = figma.createFrame();
iconSlot.name = 'icon--{purpose}';  // e.g. 'icon--chevron', 'icon--search', 'icon--left'
iconSlot.resize(16, 16);            // use 20x20 for medium, 24x24 for large
iconSlot.fills = [];
iconSlot.strokes = [{ type: 'SOLID', color: { r: 0.5, g: 0.5, b: 0.5 } }];
iconSlot.strokeWeight = 1;
iconSlot.dashPattern = [2, 2];
iconSlot.cornerRadius = 2;
```

**Images / thumbnails:**
```js
const imgSlot = figma.createFrame();
imgSlot.name = 'image--placeholder';
imgSlot.resize(width, height);
imgSlot.fills = [{ type: 'SOLID', color: { r: 0.878, g: 0.898, b: 0.922 } }]; // token: semantic.light.background.subtle
```

Never search for SVG assets. Never call `figma.importAsync` for icons. Use placeholders every time.

#### Rule 3 — Screenshot fidelity (Vision Agent must output this before proceeding)

After extracting styles from screenshots, output a **FIDELITY CHECK** block:

```
FIDELITY CHECK — {ComponentName}
──────────────────────────────────────────────────────
Property        | Observed      | Token path              | Confidence | ΔMatch
─────────────────────────────────────────────────────────────────────────────────
background      | #2C66DD       | color.accent.blue       | HIGH       | exact
text            | #FFFFFF       | text.onAccent           | HIGH       | exact
borderRadius    | ~8px          | borderRadius.md         | MEDIUM     | ±1px
padding         | ~12px         | spacing.padding.S       | MEDIUM     | ±2px
gap             | ~8px          | spacing.gap.S           | LOW        | estimated
──────────────────────────────────────────────────────
UNCERTAIN values (must resolve before building):
  • gap: LOW confidence — screenshot is too small to measure precisely.
    Defaulting to Code Agent value (6px) if available, else ask user.
──────────────────────────────────────────────────────
```

Rules for the FIDELITY CHECK:
- Any property with confidence = LOW → must use Code Agent value if available; otherwise ask user before proceeding
- Color ΔMatch > ±15 RGB total → flag as UNCERTAIN, do not guess
- Do NOT proceed to Spec Agent with unresolved UNCERTAIN values

#### Rule 4 — Verify against screenshots (not just "does it look close")

In STEP 9, compare the built component against each reference screenshot property-by-property:

```
VERIFY RESULT — {combo} vs screenshot-{n}
──────────────────────────────────────────────────────
✅ background:   token bound, hex matches screenshot ±0 RGB
✅ text color:   token bound, hex matches ±0 RGB
⚠️ padding:      built=14px, screenshot=12px — diff 2px (within ±4px tolerance for screenshot source)
❌ borderRadius: built=4px, screenshot=8px — FAIL — apply fixAction C2
──────────────────────────────────────────────────────
Score: 14/16 — PASS (1 warning, 1 fix applied)
```

A component PASSES only when:
- All token bindings are confirmed (no hardcoded hex)
- All color tokens match screenshot within ±5 RGB per channel
- All spacing tokens within ±4px (screenshot source) or ±2px (Figma URL source)

#### Rule 5 — Scope lock

If asked to do ANYTHING outside of building this Figma component (answer questions, generate code, explain things, write documentation), respond:

```
I am running the Figma component build pipeline.
My only job is to build "{ComponentName}" in Figma.
For other tasks, please start a new chat.
```

Then return to the pipeline step you were on.

---

### Pipeline steps (in order)

```
STEP 0   → Figma Bridge check (hard block if fails)
STEP 00  → Code Agent: read codebase, extract props
STEP 1   → Validate inputs (spec, tokens, vision)
STEP 2   → Resolve conflicts (Code > Figma URL > Vision)
STEP 3   → Search existing components (Registry → Library → Local → Fuzzy)
STEP 3b  → Load auto-layout rules
STEP 4   → Generate execution plan
STEP 5   → Confirm with user ("proceed" / "edit" / "cancel")
STEP 6   → Pre-flight: fonts, page, variable IDs, canvas space
STEP 7   → Execute figma_execute calls (build the component)
STEP 8   → Token audit G2 (0 hardcoded values)
STEP 9   → Screenshot verify G1 (≥14/16 per variant)
STEP 10  → A11y check G3
STEP 11  → Human review → publish ("publish" / "reject")
STEP 12  → Generate config files (ONLY after publish confirmed)
```

---

*Pipeline version 2.1 — config.files/pipeline/agents/ — Zoho Analytics Design System*
