# Component Creation Guide — From Figma Link or Screenshot

> **Purpose:** Step-by-step playbook for turning a Figma design link or screenshot into a fully implemented Figma screen using the **Cursor → Figma Console MCP** workflow, with tokens and library components from the Zoho Analytics Design System.
>
> **Design System:** [Design System – Zoho Analytics](https://www.figma.com/design/m2iOWX3I9aDI5kgyw4wCo0/Design-System--Zoho-Analytics)  
> **Token root:** `config.files/tokens/` · **AI Pipeline:** `config.files/pipeline/` · **Index:** [README](../README.md)

---

## Non-Negotiable Rules (read before anything else)

| Rule | Always | Never |
|------|--------|-------|
| **Search first** | Run `figma_get_library_components` / local page scan BEFORE writing any creation code | Skip the library check and build custom |
| **Source** | Instantiate from Design System library via `importComponentByKeyAsync` | Build with `createFrame()` + raw shapes |
| **Keys** | Use variant key (40-char hex) from library search results | Use node ID or component set key to instantiate |
| **Colors** | Bind fills/strokes to Figma library variables via `figma.variables.setBoundVariableForPaint()` | Hardcode any hex value or `{r,g,b}` object |
| **Variable IDs** | Look up the variable ID from `tokens/figma-variable-bindings.json` | Guess or copy variable IDs from another component |
| **Spacing** | Use token path from `resolved-tokens.json` (`borderRadius.*`, `spacing.*`) | Hardcode px values |
| **Fonts** | `Zoho Puvi` (Regular / Medium / Semibold) or `Lato` | Any other font family |
| **Sizing** | Resize width to fill container if needed | Resize height — always preserve natural component height |
| **TEXT properties** | Add every user-facing text as a TEXT component property via `cs.addComponentProperty(name, 'TEXT', default)` and bind text layers via `componentPropertyReferences` | Bury text in layers with no property exposure |
| **Text / state** | Set via `setProperties()` only | Edit child text nodes directly on instances |
| **Audit** | Run `token-audit.js` on every created component | Ship without an audit pass |

---

## ⛔ STOP — Search Before You Create

> ⛔ **HARD RULE: Building from scratch is FORBIDDEN if the component already exists in the design system.**  
> **Always check `docs/COMPONENT-REGISTRY.md` FIRST.** If the component is `✅ Done`, you MUST find and reuse it — never duplicate it.  
> A single failed search query does NOT mean the component doesn't exist. Run ALL search methods below before concluding "not found."

### Step 0 — Check the registry before any Figma call (MANDATORY)

Open `docs/COMPONENT-REGISTRY.md` and look up this component name.

| Status | What to do |
|---|---|
| `✅ Done` | Component exists. Run Search Methods 1 and 2 below to locate it. If both fail, **do not build** — ask the user to confirm the component's Figma location. |
| `🔄 Partial` | Component exists in Figma. Find it (Methods 1/2) and build only the missing config/doc. Do not rebuild the Figma component. |
| `⏳ Pending` or not listed | Component hasn't been built yet. Proceed through all search methods. If all return nothing → custom build is permitted. |

### Search Method 1 — Published Library (run ALL queries — do NOT stop on first result)

```js
// Run EVERY query — collect ALL results before picking
const queries = [
  "<ExactName>",     // "Checkbox"
  "ZA<ExactName>",   // "ZACheckbox" — Zoho Analytics prefix
  "<Spaced>",        // "Check box", "Check Box"
  "<Abbrev>",        // "CB", "Chk"
  "<Category>"       // "Form Control"
];

let allResults = [];
for (const q of queries) {
  const r = await figma_get_library_components({
    libraryFileKey: "m2iOWX3I9aDI5kgyw4wCo0",
    query: q,
    limit: 25
  });
  allResults = allResults.concat(r);
  // ⛔ DO NOT break early — run every query even when results are found
}

// Deduplicate by key
const seen = new Set();
const unique = allResults.filter(r => !seen.has(r.key) && seen.add(r.key));
```

**If a result is found → import and use it:**

```js
// Import the variant from the published library
const comp = await figma.importComponentByKeyAsync("<40-char-variant-key>");
const instance = comp.createInstance();
instance.x = targetX;
instance.y = targetY;

// Configure via setProperties ONLY
instance.setProperties({
  "State": "Default",
  "Label#123:0": "Click me"
});
```

### Search Method 2 — Local page scan (scan EVERY page — do NOT stop after first page)

```js
// Scan ALL pages for every name variant
async function scanAllPages(searchTerms) {
  const allFound = [];
  for (const page of figma.root.children) {
    await figma.setCurrentPageAsync(page);
    for (const term of searchTerms) {
      const found = page.findAll(n =>
        (n.type === 'COMPONENT_SET' || n.type === 'COMPONENT') &&
        n.name.toLowerCase().includes(term.toLowerCase())
      );
      allFound.push(...found);
    }
    // ⛔ DO NOT return early — scan every page for every term
  }
  return allFound;
}

const results = await scanAllPages(["Checkbox", "ZACheckbox", "Check box"]);
if (results.length > 0) {
  const cs = results.find(n => n.type === 'COMPONENT_SET') ?? results[0];
  const variant = cs.type === 'COMPONENT_SET'
    ? cs.children.find(c => c.name.includes('Check=Yes'))
    : cs;
  const instance = variant.createInstance();
  // position + setProperties...
}
```

### Component name → search term quick reference

| What you need | Search query | Where it lives |
|---|---|---|
| Primary / secondary button | `"Button"` | Page `01` · Component set `Check box` |
| Input field | `"Input"` or `"Text Field"` | Page `01` |
| Toggle switch | `"Toggle"` | Page `01` |
| Checkbox (box or row) | `"Check box"` | Page `01` |
| Radio button | `"Radio"` | Page `01` |
| Link text | `"Link"` | Page `01` |
| Notification / alert banner | `"Notification"` | Page `02` |
| Stat card | `"Catalog"` or `"Stat"` | Page `03` |
| Modal / dialog | `"Modal"` or `"Dialog"` | Page `02` |
| Badge / tag | `"Tag"` or `"Badge"` | Page `🟠 - Components` |
| Segmented control | `"Segmented"` | Page `Segmented Controls` |
| Tab bar | `"Tab"` | Page `Tabs` |

### Decision after search

```
Search result?
│
├─ Found in published library
│   └─ importComponentByKeyAsync → createInstance() → setProperties()
│
├─ Found on local page (scan fallback)
│   └─ createInstance() directly from the found node → setProperties()
│
├─ Partial match (wrong state / missing variant)
│   └─ Import closest variant → setProperties() to change state — never rebuild fills
│
└─ No match anywhere
    └─ Build from scratch — ONLY now is createFrame() acceptable
       Every fill/stroke MUST use setBoundVariableForPaint()
       Run token-audit.js before marking done
```

### ⚠️ Color Application — Mandatory Pattern

> This rule applies to **every component**, both library instances and custom-built shapes.  
> Every fill and stroke MUST be a Figma variable binding, not a raw hex or `{r,g,b}` value.

```js
// ──────────────────────────────────────────────────────────────────
// REQUIRED helper — call once at the top of every plugin script
// that creates or modifies component colors
// ──────────────────────────────────────────────────────────────────
async function boundPaint(variableId) {
  const v = await figma.variables.getVariableByIdAsync(variableId);
  return figma.variables.setBoundVariableForPaint(
    { type: 'SOLID', color: { r: 0, g: 0, b: 0 } },  // base (overridden by variable)
    'color',
    v
  );
}

// Usage — look up the ID in tokens/figma-variable-bindings.json → roleIndex
node.fills   = [await boundPaint('VariableID:577:38')];   // primary button fill
node.strokes = [await boundPaint('VariableID:579:41')];   // stroke 1
textNode.fills = [await boundPaint('VariableID:575:276')]; // text primary
```

All variable IDs are in `tokens/figma-variable-bindings.json → roleIndex`.

---

### ✏️ Text Content — Mandatory TEXT Property Binding

> **Every user-facing text string inside a component MUST be exposed as a TEXT component property on the `COMPONENT_SET`.** This gives designers and developers a clean input field in the Figma properties panel to edit label, description, placeholder, etc. — without touching layers.

#### Why this matters
Without TEXT properties, content is buried inside the component tree. Nobody can change "Button" to "Save" from the properties panel — they must double-click into nested layers. This makes components unusable for non-technical designers.

#### Source of truth
Read `tokens/components/auto-layout-rules.json → {ComponentName}.textProperties` for the list of properties to add. If the component is not in the file, derive the list from the design: every text layer that holds user-facing copy gets an entry.

#### Naming rule for text layers
All text layers holding user-facing copy **must** be named `label--{purpose}`:

| Purpose | Layer name |
|---|---|
| Button label | `label--button-text` |
| Field label above input | `label--field-label` |
| Placeholder text | `label--placeholder` |
| Error message | `label--error-message` |
| Helper / hint text | `label--helper-text` |
| Notification title | `label--notification-title` |
| Notification body | `label--notification-body` |
| Card title | `label--card-title` |
| Card description | `label--card-description` |
| Modal heading | `label--modal-title` |
| Modal body | `label--modal-body` |
| Toggle label | `label--toggle-text` |
| Checkbox label | `label--checkbox-text` |
| Radio label | `label--radio-text` |
| Link text | `label--link-text` |
| Stat card metric name | `label--stat-title` |
| Stat card value | `label--stat-value` |
| Badge / tag | `label--badge-text` |
| Column header | `label--col{N}-header` |
| Empty state message | `label--empty-state` |

#### Code pattern — add TEXT properties after `combineAsVariants`

```js
// ── Apply TEXT properties ──
// textProperties = array from auto-layout-rules.json[ComponentName].textProperties
const TEXT_PROPS = [
  { name: 'Label',       layerName: 'label--button-text', default: 'Button'      },
  { name: 'Description', layerName: 'label--desc',        default: 'Description' },
  // add all entries for this component from auto-layout-rules.json
];

for (const prop of TEXT_PROPS) {
  // Register the TEXT property on the component set
  cs.addComponentProperty(prop.name, 'TEXT', prop.default);

  // Bind each matching text layer across all variant components
  for (const comp of cs.children) {
    const textNode = comp.findOne(n => n.type === 'TEXT' && n.name === prop.layerName);
    if (!textNode) { console.warn(`Missing layer "${prop.layerName}" in "${comp.name}"`); continue; }

    textNode.characters = prop.default;

    // Link to the component property (key has a #nodeId suffix in Figma)
    const propKey = Object.keys(cs.componentPropertyDefinitions)
      .find(k => k.startsWith(prop.name + '#'));
    if (propKey) {
      textNode.componentPropertyReferences = {
        ...textNode.componentPropertyReferences,
        characters: propKey
      };
    }
  }
}
```

#### Validate before shipping
- [ ] Every text layer is named `label--{purpose}` — no generic `"Text"` or `"Label"` names
- [ ] Every text layer has a corresponding entry in `textProperties`
- [ ] `cs.componentPropertyDefinitions` contains TEXT entries for each property
- [ ] `textNode.componentPropertyReferences.characters` is set for every bound layer
- [ ] Default values are realistic (not `"text"`, `"label"`, or `"string"`)

---

## 0. Multi-Screenshot Rule — Read This Before Anything Else

> **When 2 or more screenshots of the same component are provided, they MUST be unified into a single `COMPONENT_SET` — not treated as separate components.**

### Why this happens / what to do

| Situation | Wrong approach | Correct approach |
|---|---|---|
| 2 screenshots: button in default + hover state | Create 2 separate button frames | One `COMPONENT_SET` with `State=Default` and `State=Hover` variants |
| 3 screenshots: card with icon, without icon, disabled | Create 3 separate card frames | One `COMPONENT_SET` with `Show Icon` boolean property + `State` axis |
| 4 screenshots: input in 4 states | 4 separate input frames | One `COMPONENT_SET` with 4 `State` values |

### How to identify what varies vs. what is shared

When you receive multiple screenshots, run this analysis **first** before writing any code:

```
For each pair of screenshots — ask:
│
├─ Same fill color but different opacity → State change (Disabled)
├─ Different fill color (blue vs white)  → Variant axis (Primary=Yes/No, Type=Primary/Secondary)
├─ Darker/lighter version of same color  → State change (Default vs Hover)
├─ Element present in some, absent in others → Boolean property (Show Icon, Show Tag, Show Badge)
├─ Red/green instead of blue             → Variant axis (Type=Danger/Success)
├─ Different label text only             → NOT a variant — same component, different label text
└─ Completely different structure        → Different component type — ask user to clarify
```

### Assigning each screenshot to a variant/state slot

Before building, map every screenshot to a `{property: value}` combination:

| Screenshot | What you see | Assigned to |
|---|---|---|
| Screenshot 1 | Blue fill, white text, icon left | `Primary=Yes, State=Default` |
| Screenshot 2 | Dark blue fill, white text | `Primary=Yes, State=Hover` |
| Screenshot 3 | White fill, blue border, dark text | `Primary=No, State=Default` |
| Screenshot 4 | Light grey fill, no icon | `Primary=No, State=Disabled` |

Everything that **differs** between screenshots → variant axis or boolean property.  
Everything that stays **the same** → shared component property.

### Naming pattern for multi-screenshot components

Axes become the naming format:
```
{ComponentName}/{Axis1Value}/{Axis2Value}
Examples:
  Button/Yes/Default
  Button/No/Hover
  Card/Primary/Hover
  StatusBadge/Success/Default
```

### Pipeline route for multi-screenshot input

```
Screenshots provided (2+)
│
└─ Code Agent (00) ← RUNS FIRST (reads codebase/)
    │  Outputs: exact variantAxes, booleanProperties, textProperties, measurements
    │  Source: production get attrs() — ground truth, no estimation
    │
    └─ Vision Agent (03) → Multi-Input Synthesis mode
        │  Code Agent present? → only extracts colors/shadows per variant (skips structure)
        │  No Code Agent?      → full synthesis: variantAxes, booleanProperties, perVariantStyles
        │  Outputs: perVariantStyles, sharedProperties (colors + shadows)
        │
        └─ Spec Agent (01) → Fast Path
            │  Merges: structure from Code Agent + colors from Vision Agent
            │  Outputs: unified spec with all axes and styles
            │
            └─ Orchestrator (04) → STEP 0 connectivity gate → Build ONE COMPONENT_SET
                │  Creates all variant combos with cartesian product of axes
                │  Measurements: from Code Agent exactMeasurements (height, padding, gap, radius)
                │  Applies perVariantStyles per combo via setBoundVariableForPaint()
                │  Adds booleanProperties at COMPONENT_SET level
                └─ Single showcase frame: rows=Axis1, cols=Axis2
```

---

## 1. Decision Flow — What's Your Input?

```
You receive a design to implement
│
├─ ALWAYS FIRST — Code Agent (00)
│   └─ Run 00-code-agent.md: reads codebase/zohoanalytics/ to extract exact component props
│       Output: variantAxes, booleanProperties, textProperties, measurements
│       If component found → use output as ground truth for structure
│       If not found → non-blocking, continue with other inputs
│
├─ ALWAYS SECOND — Search Design System library
│   └─ See "⛔ STOP — Search Before You Create" above
│
├─ Figma Link provided?
│   └─ → Follow Section 3 (Figma Link Workflow)
│
├─ Screenshot / image provided?
│   └─ → Follow Section 4 (Screenshot Workflow)
│       Code Agent ran? → Vision Agent extracts colors only
│       No Code Agent?  → Vision Agent does full synthesis
│
└─ Description only (text)?
    └─ → Code Agent output + library search → match to component → follow Section 5
```

**The mandatory pre-flight check (run before writing any creation code):**

```
1. figma_get_library_components({ libraryFileKey: "m2iOWX3I9aDI5kgyw4wCo0", query: "<name>" })
   │
   ├─ Results found?
   │   └─ Pick variant key → importComponentByKeyAsync → createInstance() → setProperties()
   │       DONE — do not write any figma.create*() code
   │
   └─ No results?
       └─ Run local page scan: findComponentSet("<name>")
           │
           ├─ Found locally?
           │   └─ createInstance() from local node → setProperties()
           │       DONE
           │
           └─ Still nothing?
               └─ Build from scratch — every fill/stroke via setBoundVariableForPaint()
                  Run token-audit.js before marking done
```

---

## 2. Token-First Lookup Process

**Every color, spacing, radius, shadow, and font value must come from `tokens/resolved-tokens.json`.**  
The workflow is always: intent → token path → resolved value — never intent → raw hex.

### Step 1 — Identify the property you need

| Property | Namespace to look in |
|---|---|
| Background fill | `semantic.light.background.*` or `semantic.light.card.*` |
| Text color | `semantic.light.text.*` |
| Primary button fill | `semantic.light.button.fillPrimary` |
| Border / stroke | `semantic.light.stroke.*` |
| Corner radius | `borderRadius.*` |
| Shadow | `shadow.*` |
| Padding / gap | `spacing.padding.*` / `spacing.gap.*` |
| Font size | `typography.scale.*` |
| Font weight | `typography.fontWeight.*` |
| Component height | `sizing.button.heightMd` etc. |

### Step 2 — Resolve the value

Look up the dot-path in `resolved-tokens.json`:

```
color.accent.blue              → "#2C66DD"
semantic.light.text.primary    → "#0C0E11"
borderRadius.md                → "8px"
spacing.padding.M              → "16px"
shadow.sm                      → { x:0, y:1, blur:4, spread:0, color:"#181C210A" }
```

### Step 3 — Apply as a Figma variable binding (MANDATORY — never raw)

```js
// ✅ CORRECT — bind to Figma library variable (updates automatically with theme changes)
// 1. Look up the role in tokens/figma-variable-bindings.json → roleIndex
// 2. Pass the variable ID to the boundPaint() helper

async function boundPaint(variableId) {
  const v = await figma.variables.getVariableByIdAsync(variableId);
  return figma.variables.setBoundVariableForPaint(
    { type: 'SOLID', color: { r: 0, g: 0, b: 0 } },
    'color', v
  );
}

frame.fills = [await boundPaint('VariableID:575:273')];   // ZA/Background/BG-Primary-Default (#FFFFFF)
text.fills  = [await boundPaint('VariableID:575:276')];   // ZA/Text/Text Primary (#0C0E11)

// ❌ WRONG — raw hex or {r,g,b} — NEVER do this
frame.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];  // ❌
frame.fills = [{ type: "SOLID", color: hexToFigmaRgb("#FFFFFF") }];  // ❌ still wrong — not a bound variable
```

### Step 4 — Quick variable ID lookup

Find the right variable ID in **`tokens/figma-variable-bindings.json → roleIndex`**:

| What you need | roleIndex key | Variable ID |
|---|---|---|
| Primary button / checked fill | `primaryButtonFill` | `VariableID:577:38` |
| White background | `white` | `VariableID:189:170` |
| Card / page background | `bgDefault` | `VariableID:575:273` |
| Subtle / disabled background | `bgSubtle` | `VariableID:575:275` |
| Primary text | `textPrimary` | `VariableID:575:276` |
| Secondary text | `textDescription` | `VariableID:575:277` |
| Disabled text / placeholder | `textDisabled` | `VariableID:575:278` |
| Link text | `textLink` | `VariableID:706:113` |
| Stroke / divider | `stroke1` | `VariableID:579:41` |
| Strong stroke | `stroke2` | `VariableID:579:42` |
| Accent blue | `accentBlue` | `VariableID:187:160` |
| Accent green (success) | `accentGreen` | `VariableID:189:168` |
| Accent red (error) | `accentRed` | `VariableID:189:167` |
| Accent yellow (warning) | `accentYellow` | `VariableID:189:169` |
| Blue disabled fill | `blueDisabledLight` | `VariableID:391:117` |
| Toggle OFF fill | `neutralToggleOff` | `VariableID:572:3687` |
| Default stroke | `neutralStrokeDefault` | `VariableID:572:3690` |
| Row hover highlight | `rowHover` | `VariableID:2168:2208` |

> **Full map with hex values, variable names, and collection IDs:**  
> `config.files/tokens/figma-variable-bindings.json`

### Color token quick lookup

| What you need | Dot-path in resolved-tokens.json | Resolved hex |
|---|---|---|
| Primary blue | `color.accent.blue` | `#2C66DD` |
| Blue hover | `color.accent.blueHover` | `#1E51B8` |
| Blue disabled | `color.accent.blueDisabled` | `#80A3EB` |
| Red (danger) | `color.accent.red` | `#CC3929` |
| Green (success) | `color.accent.green` | `#0C8844` |
| Yellow (warning) | `color.accent.yellow` | `#EBB625` |
| White | `semantic.light.background.default` | `#FFFFFF` |
| Subtle bg | `semantic.light.background.subtle` | `#F5F7F9` |
| Primary text | `semantic.light.text.primary` | `#0C0E11` |
| Description text | `semantic.light.text.description` | `#3D4653` |
| Placeholder | `semantic.light.text.placeholder` | `#93A2B6` |
| Stroke (default) | `semantic.light.stroke.stroke3` | `#C6CED9` |
| Stroke (hover) | `semantic.light.stroke.stroke1` | `#DFE4EB` |
| Button primary fill | `semantic.light.button.fillPrimary` | `#2C66DD` |
| Input fill (default) | `semantic.light.button.inputFill` | `#FFFFFF` |
| Card background | `semantic.light.card.bgPrimary` | `#FFFFFF` |

### Spacing token quick lookup

| What you need | Dot-path | Value |
|---|---|---|
| Button / input radius | `borderRadius.md` | `8px` |
| Card radius | `borderRadius.lg` | `12px` |
| Pill / full round | `borderRadius.full` | `9999px` |
| Button padding (horizontal) | `spacing.padding.S` | `12px` |
| Card padding | `spacing.padding.L` | `24px` |
| Inline gap | `spacing.gap.M` | `8px` |
| Border width | `border.width.sm` | `1px` |
| Button height (md) | `sizing.button.heightMd` | `32px` |
| Icon size (md) | `sizing.icon.md` | `16px` |

---

## 3. From a Figma Link

### Step 1 — Extract the node ID from the URL

```
https://www.figma.com/design/m2iOWX3I9aDI5kgyw4wCo0/Design-System--Zoho-Analytics?node-id=2603-4167
                                                                                         ↑
                                                                           node-id=2603-4167
                                                                           → nodeId: "2603:4167"
```

Replace `-` with `:` to get the nodeId used in tool calls.

### Step 2 — Get design context via MCP

```js
get_design_context({ nodeId: "2603:4167" })
```

The response gives you:
- Component type (`COMPONENT_SET`, `COMPONENT`, `INSTANCE`, `FRAME`)
- All variant axes and their values
- Property definitions
- Fill / stroke / spacing values with token names

### Step 3 — Identify the component and check ALL its variants

Match the design context output to an existing component:

| If `componentPropertyDefinitions` has… | Component | Config file |
|---|---|---|
| `State`, `Primary` | Button | `tokens/components/buttonComponent.json` |
| `States`, `Show Right Option`, `Right Options` | Input | `tokens/components/inputComponents.json` |
| `ON`, `Enable`, `Oder` | Toggle | `tokens/components/toggle-button-config.json` |
| `Check`, `Enable` (standalone) | Checkbox | `tokens/components/checkbox-config.json` |
| `On`, `Enable`, `Text` + circle | Radio Button | `tokens/components/radio-button-config.json` |
| `State` + link color | Link Text | `tokens/components/link-text-config.json` |
| `Property 1`: Success/Error/Warning/Default | Notification | `tokens/components/notification-config.json` |

**After identifying the component — check all variants:**

```js
// Always query the full variant list before picking one
figma_get_library_components({
  libraryFileKey: "m2iOWX3I9aDI5kgyw4wCo0",
  query: "<ComponentName>"
})
// → Returns all variant keys with their property combinations
```

See Section 5 for the complete variant tables for every component.

### Step 4 — Map fills to tokens (not raw hex)

When the design context returns fill hex values, look them up in `resolved-tokens.json` (Section 2) and reference the **token path**, not the raw value.

### Step 5 — Instantiate and configure

```js
// 1. Import the correct variant from the library
const instance = await figma_instantiate_component({
  componentKey: "<variant-key-from-section-5>"
});

// 2. Position the instance
instance.x = parentFrame.x + 32;
instance.y = parentFrame.y + 100;

// 3. Resize only if filling a container (width only — never change height)
instance.resize(containerWidth - 64, instance.height);

// 4. Set state, text, and options via setProperties ONLY
instance.setProperties({
  "State":             "Default",       // exact value from componentPropertyValues
  "Input Text#807:10": "Placeholder text",
  "Error Text#831:0":  ""
});
```

---

## 4. From a Screenshot

> ⛔ **If you have 2 or more screenshots of the same component, stop here.** Go to **Section 0 (Multi-Screenshot Rule)** and follow the multi-input synthesis path. Do NOT process each screenshot individually.

### Step 1 — Identify the component type visually

| Visual element | Component |
|---|---|
| Rectangular pill with text + optional icon | Button |
| Bordered rectangle with placeholder text, optional right icon | Input |
| Pill-shaped toggle with on/off knob | Toggle |
| Small square box, optionally with checkmark | Checkbox |
| Small circle with inner filled circle | Radio Button |
| Colored underlined text link | Link Text |
| Colored banner with icon and message text | Notification |

### Step 2 — Map visual color → token path (not raw hex)

| What you see | Token path | Component / state |
|---|---|---|
| Bright blue fill | `color.accent.blue` | Button primary default · Toggle ON |
| Darker blue fill | `color.accent.blueHover` | Button primary hover |
| Lighter blue fill | `color.accent.blueDisabled` | Button primary disabled |
| White + grey stroke | `semantic.light.button.inputFill` + `stroke.stroke3` | Input default |
| White + blue stroke | `semantic.light.button.inputFill` + `color.accent.blue` | Input hover |
| White + red stroke | `semantic.light.button.inputFill` + `color.accent.red` | Input error |
| Light grey + grey stroke | `semantic.light.background.subtle` + `stroke.stroke3` | Input disabled |
| Grey pill fill | `semantic.light.stroke.stroke3` | Toggle OFF |
| Red fill | `color.accent.red` | Notification error |
| Green fill | `color.accent.green` | Notification success |
| Yellow fill | `color.accent.yellow` | Notification warning |

### Step 3 — Identify size and spacing from screenshot

Compare visual proportions to natural component sizes:

| Component | Height | Notes |
|---|---|---|
| Button | `32px` (`sizing.button.heightMd`) | Resize width only |
| Input | `32px` (`sizing.input.heightMd`) | Resize width only |
| Toggle row | `20px` | Resize width to fill container |
| Checkbox (box) | `12px` | Never resize |
| Checkbox (row) | `20px` | Resize width to fill |
| Radio Button row | `20px` | Resize width to fill |
| Link Text | `20px` | Do not resize |
| Notification | `304px` | Do not resize |

### Step 4 — Match to variant, instantiate

1. Determine component type (Step 1)
2. Determine token path from color (Step 2) → this tells you the state
3. Open Section 5 — find the matching variant key
4. Instantiate and configure

---

## 5. Complete Variant Reference — All Components

> For any variant key listed as *"get from library"*, run:
> ```js
> figma_get_library_components({ libraryFileKey: "m2iOWX3I9aDI5kgyw4wCo0", query: "ComponentName" })
> ```

---

### Button

**Variant axes:** `State` × `Primary`  
**Use cases:** Form submit, actions, navigation triggers, modal confirm/cancel

| State | Primary | Use case | Variant key |
|---|---|---|---|
| `Default` | `Yes` | Primary CTA | `6d5926d43be8374d4fbeedc38146979ca6c6d14b` |
| `Hover` | `Yes` | Mouse over primary | get from library |
| `Disabled` | `Yes` | Action not available | get from library |
| `Tap` | `Yes` | Active press | get from library |
| `Default` | `No` | Secondary action | get from library |
| `Hover` | `No` | Mouse over secondary | get from library |
| `Disabled` | `No` | Secondary not available | get from library |
| `Tap` | `No` | Secondary pressed | get from library |

**Settable properties:**

| Property | Type | Values |
|---|---|---|
| `State` | VARIANT | `Default` · `Hover` · `Disabled` · `Tap` |
| `Primary` | VARIANT | `Yes` · `No` |
| `Text#3992:0` | BOOLEAN | `true` (show) · `false` (hide label) |
| `Icon#832:22` | BOOLEAN | `true` (show icon) · `false` (hide icon) |
| `x#846:0` | TEXT | Label string |

**Token bindings for custom builds:**

| Property | Token path | Value |
|---|---|---|
| Fill (primary default) | `semantic.light.button.fillPrimary` | `#2C66DD` |
| Fill (primary hover) | `color.accent.blueHover` | `#1E51B8` |
| Fill (primary disabled) | `color.accent.blueDisabled` | `#80A3EB` |
| Fill (secondary) | `semantic.light.background.default` | `#FFFFFF` |
| Stroke (secondary) | `semantic.light.stroke.stroke3` | `#C6CED9` |
| Text (on primary) | `semantic.light.text.onAccent` | `#FFFFFF` |
| Text (secondary) | `semantic.light.text.primary` | `#0C0E11` |
| Border radius | `borderRadius.md` | `8px` |
| Height | `sizing.button.heightMd` | `32px` |

---

### Input Field

**Variant axes:** `States` × `Show Right Option` × `Right Options`  
**Use cases:** Text entry, search, form fields, dropdowns, date pickers

| State | Right Option | Use case | Variant key |
|---|---|---|---|
| `Default` | none | Basic text entry | `8fd07348a67bc5a1124009fed9fe74358033ea67` |
| `Default` | `Icon search` | Search field | get from library |
| `Hover` | `Icon search` | Focused search | get from library |
| `Error` | `Icon search` | Invalid search | get from library |
| `Disabled` | `Icon search` | Read-only search | get from library |
| `Default` | `Copy` | Copyable value | get from library |
| `Hover` | `Copy` | Focused copy field | get from library |
| `Error` | `Copy` | Invalid copy field | get from library |
| `Disabled` | `Copy` | Read-only copy | get from library |
| `Default` | `Arrow` | Dropdown trigger | get from library |
| `Default` | `Up Down Arrow` | Number stepper | get from library |
| `Default` | `Line Arrow` | Inline dropdown | get from library |

**Settable properties:**

| Property | Type | Values |
|---|---|---|
| `States` | VARIANT | `Default` · `Hover` · `Error` · `Disabled` |
| `Show Right Option` | VARIANT | `Yes` · `NO` |
| `Right Options` | VARIANT | `Default` · `Arrow` · `Copy` · `Up Down Arrow` · `Line Arrow` · `Icon search` |
| `Input Text#807:10` | TEXT | Placeholder or typed value |
| `Error Text#831:0` | TEXT | Error message string |
| `Text#807:5` | BOOLEAN | `true` (show text) · `false` (hide) |

**Token bindings:**

| Property | Token path | Value |
|---|---|---|
| Fill (default/hover/error) | `semantic.light.button.inputFill` | `#FFFFFF` |
| Fill (disabled) | `semantic.light.background.subtle` | `#F5F7F9` |
| Stroke (default) | `semantic.light.stroke.stroke3` | `#C6CED9` |
| Stroke (hover) | `color.accent.blue` | `#2C66DD` |
| Stroke (error) | `color.accent.red` | `#CC3929` |
| Text (label) | `semantic.light.text.primary` | `#0C0E11` |
| Text (placeholder) | `semantic.light.text.placeholder` | `#93A2B6` |
| Border radius | `borderRadius.md` | `8px` |
| Height | `sizing.input.heightMd` | `32px` |

---

### Toggle Button

**Variant axes:** `ON` × `Enable` × `Oder`  
**Use cases:** Feature flags, settings switches, mode toggles, boolean controls

| ON | Enable | Oder | Use case | Variant key |
|---|---|---|---|---|
| `ON` | `ON` | `Text Button` | Active, label left | `9a8b55637d2aa338fe922c48be3beb522c2da356` |
| `ON` | `ON` | `Button Text` | Active, label right | get from library |
| `OFF` | `ON` | `Text Button` | Inactive, label left | get from library |
| `OFF` | `ON` | `Button Text` | Inactive, label right | get from library |
| `ON` | `OFF` | `Text Button` | Active, disabled | get from library |
| `ON` | `OFF` | `Button Text` | Active, disabled, label right | get from library |
| `OFF` | `OFF` | `Text Button` | Inactive, disabled | get from library |
| `OFF` | `OFF` | `Button Text` | Inactive, disabled, label right | get from library |

**Settable properties:**

| Property | Type | Values |
|---|---|---|
| `ON` | VARIANT | `ON` · `OFF` |
| `Enable` | VARIANT | `ON` · `OFF` |
| `Oder` | VARIANT | `Text Button` (label left) · `Button Text` (label right) |
| `Text#2677:0` | TEXT | Toggle label string |

**Token bindings:**

| Property | Token path | Value |
|---|---|---|
| Pill fill (ON) | `color.accent.blue` | `#2C66DD` |
| Pill fill (OFF) | `semantic.light.stroke.stroke3` | `#C6CED9` |
| Pill fill (ON+disabled) | `color.accent.blueDisabled` | `#80A3EB` |
| Text (enabled) | `semantic.light.text.primary` | `#0C0E11` |
| Text (disabled) | `semantic.light.text.placeholder` | `#93A2B6` |

---

### Checkbox

**Variant axes:** `Check` × `Enable` (standalone) or `ON` × `Enable` (row with label)  
**Use cases:** Multi-select lists, form agreements, filter options, settings

**Standalone box:**

| Check | Enable | Use case | Variant key |
|---|---|---|---|
| `Yes` | `Yes` | Checked, enabled | `9d7b1eee3169179e50ce57286b51af999466716b` |
| `No` | `Yes` | Unchecked, enabled | get from library |
| `Yes` | `No` | Checked, disabled | get from library |
| `No` | `No` | Unchecked, disabled | get from library |

**Row with label:**

| ON | Enable | Use case | Variant key |
|---|---|---|---|
| `On` | `ON` | Checked row, enabled | `10ab51e4ea606e44fef73a8c6091a86a6a83afb3` |
| `Off` | `ON` | Unchecked row, enabled | get from library |
| `On` | `OFF` | Checked row, disabled | get from library |
| `Off` | `OFF` | Unchecked row, disabled | get from library |

**Token bindings:**

| Property | Token path | Value |
|---|---|---|
| Box fill (checked) | `color.accent.blue` | `#2C66DD` |
| Box stroke (unchecked) | `semantic.light.stroke.stroke3` | `#C6CED9` |
| Box fill (disabled+checked) | `color.accent.blueDisabled` | `#80A3EB` |
| Label text | `semantic.light.text.primary` | `#0C0E11` |
| Corner radius | `borderRadius.sm` | `4px` |

---

### Radio Button

**Variant axes:** `On` × `Enable` (row or standalone circle)  
**Use cases:** Single-select options, settings choices, form option groups

**Row with label:**

| On | Enable | Use case | Variant key |
|---|---|---|---|
| `ON` | `On` | Selected, enabled | `1de98209ee51df75f39ca825201019a9a10edc10` |
| `OFF` | `On` | Unselected, enabled | get from library |
| `ON` | `Off` | Selected, disabled | get from library |
| `OFF` | `Off` | Unselected, disabled | get from library |

**Standalone circle:**

| On | Enable | Use case | Variant key |
|---|---|---|---|
| `On` | `Yes` | Selected circle | `b7ebf91a30f1945747d62115df31d7999b11f733` |
| `Off` | `Yes` | Unselected circle | get from library |
| `On` | `No` | Selected, disabled | get from library |
| `Off` | `No` | Unselected, disabled | get from library |

**Settable properties (row):**

| Property | Type | Values |
|---|---|---|
| `On` | VARIANT | `ON` · `OFF` |
| `Enable` | VARIANT | `On` · `Off` |
| `Text#2399:0` | TEXT | Option label string |

**Token bindings:**

| Property | Token path | Value |
|---|---|---|
| Circle fill (selected) | `color.accent.blue` | `#2C66DD` |
| Circle stroke (selected) | `color.accent.blue` | `#2C66DD` |
| Circle stroke (unselected) | `semantic.light.text.description` | `#3D4653` |
| Label text | `semantic.light.text.primary` | `#0C0E11` |

---

### Link Text

**Variant axes:** `State`  
**Use cases:** Inline hyperlinks, "View all", "Learn more", navigation text actions

| State | Use case | Variant key |
|---|---|---|
| `Default` | Regular link | `767aa91db276d3066791c79f597b4243342598e3` |
| `Hover` | Mouse over link | get from library |

**Settable properties:**

| Property | Type | Values |
|---|---|---|
| `State` | VARIANT | `Default` · `Hover` |
| `Text#2424:0` | TEXT | Link label string |

**Token bindings:**

| Property | Token path | Value |
|---|---|---|
| Text color (light mode) | `semantic.light.button.textLink` | `#006AFF` |
| Text color (dark mode) | `semantic.dark.button.textLink` | `#00A6FF` |

---

### Notification

**Variant axes:** `Property 1` (type)  
**Use cases:** System messages, form feedback, operation results, alerts

| Type | Use case | Variant key |
|---|---|---|
| `Success` | Operation completed | `5a317d5cb06122f6f8b61864c6e6127be9b41928` |
| `Error` | Operation failed | get from library |
| `Warning` | Caution or partial success | get from library |
| `Default` | Informational message | get from library |

**Settable properties:**

| Property | Type | Values |
|---|---|---|
| `Property 1` | VARIANT | `Success` · `Error` · `Warning` · `Default` |
| `Text#2476:0` | TEXT | Notification message string |

**Token bindings:**

| Property | Token path | Value |
|---|---|---|
| Accent (success) | `color.accent.green` | `#0C8844` |
| Accent (error) | `color.accent.red` | `#CC3929` |
| Accent (warning) | `color.accent.yellow` | `#EBB625` |
| Accent (default) | `color.accent.blue` | `#2C66DD` |
| Background | `semantic.light.card.bgPrimary` | `#FFFFFF` |
| Stroke | `semantic.light.text.primary` | `#0C0E11` |

---

## 6. Component Variant Showcase (Screenshot Groups)

When you need to see **all options for a component together** — or verify the entire component visually — build a single showcase frame instead of separate disconnected frames.

### What a showcase is

A showcase is a named Figma frame that contains every variant and state of one component, organized in a grid:
- **Rows** = one dimension (e.g. variant type, `Primary=Yes` vs `Primary=No`)
- **Columns** = another dimension (e.g. state: Default, Hover, Disabled)

```
Button/Showcase
┌─────────────────────────────────────────────────────────────────────┐
│  Primary=Yes │  [Default]   [Hover]    [Disabled]  [Tap]            │
│  Primary=No  │  [Default]   [Hover]    [Disabled]  [Tap]            │
└─────────────────────────────────────────────────────────────────────┘

Input/Showcase
┌─────────────────────────────────────────────────────────────────────┐
│  Default     │  [no opt]   [Search]   [Arrow]  [Copy]  [UpDown]     │
│  Hover       │  [no opt]   [Search]   [Arrow]  [Copy]  [UpDown]     │
│  Error       │  [no opt]   [Search]   [Arrow]  [Copy]  [UpDown]     │
│  Disabled    │  [no opt]   [Search]   [Arrow]  [Copy]  [UpDown]     │
└─────────────────────────────────────────────────────────────────────┘
```

### How to build a showcase via Figma MCP

```js
// ─── BUTTON SHOWCASE ────────────────────────────────────────────────

// Required helper
async function boundPaint(variableId) {
  const v = await figma.variables.getVariableByIdAsync(variableId);
  return figma.variables.setBoundVariableForPaint(
    { type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', v
  );
}

// 1. Create the outer showcase frame
const showcase = figma.createFrame();
showcase.name = "Button/Showcase";
showcase.layoutMode = "VERTICAL";
showcase.itemSpacing = 24;
showcase.paddingTop = showcase.paddingBottom = 24;
showcase.paddingLeft = showcase.paddingRight = 32;
showcase.counterAxisSizingMode = "AUTO";
showcase.primaryAxisSizingMode = "AUTO";
// ✅ Bind to library variable — bgSubtle = #F5F7F9
showcase.fills = [await boundPaint('VariableID:575:275')];
// ↑ roleIndex key: "bgSubtle" → ZA/Background/BG-Primary-Subtle

// 2. Loop through primary variants as rows
const primaries = ["Yes", "No"];
const states = ["Default", "Hover", "Disabled", "Tap"];

for (const primary of primaries) {
  // Row frame
  const row = figma.createFrame();
  row.name = `Primary=${primary}`;
  row.layoutMode = "HORIZONTAL";
  row.itemSpacing = 16;
  row.paddingTop = row.paddingBottom = 8;
  row.counterAxisSizingMode = "AUTO";
  row.primaryAxisSizingMode = "AUTO";
  row.fills = [];

  for (const state of states) {
    const btn = await figma_instantiate_component({
      componentKey: getButtonKey(state, primary)  // use Section 5 keys
    });
    btn.setProperties({ "State": state, "Primary": primary, "x#846:0": state });
    row.appendChild(btn);
  }
  showcase.appendChild(row);
}
```

### Showcase naming convention

| Component | Showcase frame name |
|---|---|
| Button | `Button/Showcase` |
| Input | `Input/Showcase` |
| Toggle | `Toggle/Showcase` |
| Checkbox | `Checkbox/Showcase` |
| Radio Button | `RadioButton/Showcase` |
| Link Text | `LinkText/Showcase` |
| Notification | `Notification/Showcase` |

### Showcase layouts per component

| Component | Rows | Columns |
|---|---|---|
| Button | Primary (Yes/No) | State (Default/Hover/Disabled/Tap) |
| Input | State (Default/Hover/Error/Disabled) | Right Option (none/Search/Arrow/Copy/UpDown/LineArrow) |
| Toggle | Enable (ON/OFF) | ON × Oder (Text Button / Button Text) |
| Checkbox (box) | Enable (Yes/No) | Check (Yes/No) |
| Checkbox (row) | Enable (ON/OFF) | ON (On/Off) |
| Radio Button | Enable (On/Off) | On (ON/OFF) |
| Link Text | — | State (Default/Hover) |
| Notification | — | Type (Success/Error/Warning/Default) |

### When to build a showcase

- When you want to verify all variants before a design review
- When the pipeline runs screenshot verification (Vision Agent uses the showcase for rubric checks)
- When documenting a component for handoff
- When testing a new component you've built from scratch

---

## 7. Building Custom Components (Not in Library)

> **This section is the LAST resort.** You may only reach here after completing ALL three checks:
> 1. `figma_get_library_components({ libraryFileKey: "m2iOWX3I9aDI5kgyw4wCo0", query: "<name>" })` → no match
> 2. Local page scan `findComponentSet("<name>")` across all pages → no match
> 3. Checked all pages manually: `01`, `02`, `03`, `🟠 - Components`, `Segmented Controls`, `Tabs`
>
> If you skipped any of these steps, go back to the "⛔ STOP — Search Before You Create" section.

**Every value must come from `resolved-tokens.json` (spacing/radius) and `figma-variable-bindings.json` (colors). No exceptions.**

### Checklist before building

- [ ] `figma_get_library_components` search ran and returned no match
- [ ] `findComponentSet()` local page scan ran and returned no match
- [ ] All Figma pages checked manually
- [ ] Have a spec with all values as token dot-paths (no raw hex or px)
- [ ] All fills/strokes will use `setBoundVariableForPaint()` — confirmed

### Custom build pattern

```js
// ─── CUSTOM COMPONENT — variable bindings from figma-variable-bindings.json ─

// Required helper — include at the top of every plugin script
async function boundPaint(variableId) {
  const v = await figma.variables.getVariableByIdAsync(variableId);
  return figma.variables.setBoundVariableForPaint(
    { type: 'SOLID', color: { r: 0, g: 0, b: 0 } },
    'color', v
  );
}

// ── Load fonts before creating text nodes ──
await figma.loadFontAsync({ family: 'Lato', style: 'Regular' });
await figma.loadFontAsync({ family: 'Lato', style: 'Bold' });

const tokens = resolvedTokens;  // from tokens/resolved-tokens.json (spacing/radius/shadow)

const card = figma.createFrame();
card.name = "StatCard/Custom";
card.cornerRadius = parseInt(tokens.borderRadius.lg);                       // 12
card.paddingTop = card.paddingBottom = parseInt(tokens.spacing.padding.M);  // 16
card.paddingLeft = card.paddingRight = parseInt(tokens.spacing.padding.M);  // 16
card.itemSpacing = parseInt(tokens.spacing.gap.M);                          // 8
card.layoutMode = "VERTICAL";
card.counterAxisSizingMode = "FIXED";
card.primaryAxisSizingMode = "AUTO";

// ✅ Background — bound to Figma library variable (NEVER hardcode)
// roleIndex key: "bgDefault" → VariableID:575:273
card.fills = [await boundPaint('VariableID:575:273')];

// ✅ Stroke — bound to Figma library variable
card.strokes = [await boundPaint('VariableID:579:42')];   // stroke2 → #C6CED9
card.strokeWeight = 1;

// ✅ Text — bound to Figma library variable
const label = figma.createText();
label.characters = "42";
label.fills = [await boundPaint('VariableID:575:276')];   // textPrimary → #0C0E11

// Shadow — from token (shadows are not variable-bindable, use resolved value)
const shadow = tokens.shadow.md;
card.effects = [{
  type: "DROP_SHADOW",
  visible: true,
  color: { r: 0.094, g: 0.110, b: 0.129, a: 0.04 },  // from tokens.shadow.md.color
  offset: { x: shadow.x, y: shadow.y },
  radius: shadow.blur,
  spread: shadow.spread
}];
```

> **Rule:** Shadows and blur effects cannot be bound to variables — use the resolved value from `tokens.shadow.*`. All fills and strokes MUST use `setBoundVariableForPaint()`.

### After building — mandatory token audit

```js
// Run this via figma_execute with the new component selected
figma_execute({ code: require("pipeline/scripts/token-audit.js") })
// Must return status: PASS before the component is considered done
```

---

## 8. When a Component Is Not in the Library

1. Open the Design System Figma file directly
2. Navigate to the component visually
3. Use the **Token & Component Exporter** plugin → Selection tab → **↓ Download**
4. Save the JSON to `config.files/tokens/components/`
5. Create a new `.md` in `docs/components/` following the existing format
6. Add the component to the quick reference table in `tokens/README.md`
7. Then follow the normal instantiation workflow

---

## 9. Full Worked Examples

### Example A — Figma link → Sign-up form input (with error state)

```
1. Extract nodeId: "2603:4185"
2. get_design_context({ nodeId: "2603:4185" })
   → States: "Default", Right Options: "Icon search"
3. Token check:
   - Fill:   semantic.light.button.inputFill → #FFFFFF
   - Stroke: semantic.light.stroke.stroke3   → #C6CED9
   - Radius: borderRadius.md                → 8px
4. Variant: Default + Icon search (key from Section 5 or library query)
5. Instantiate + setProperties
```

```js
const input = await figma_instantiate_component({
  componentKey: "<key-default-icon-search>"
});
input.x = 32;
input.y = 100;
input.resize(336, input.height);
input.setProperties({
  "States":            "Default",
  "Show Right Option": "Yes",
  "Right Options":     "Icon search",
  "Input Text#807:10": "Search reports..."
});
```

---

### Example B — Screenshot → Toggle row (ON state)

```
1. Visual: blue pill → color.accent.blue → Toggle ON
           label on right → Oder = "Button Text"
2. ON = "ON", Enable = "ON", Oder = "Button Text"
3. Variant key from Section 5
```

```js
const toggle = await figma_instantiate_component({
  componentKey: "<key-ON-enabled-button-text>"
});
toggle.setProperties({ "ON": "ON", "Enable": "ON", "Oder": "Button Text", "Text#2677:0": "Enable Dark Mode" });
```

---

### Example C — Build a complete Notification showcase

```js
// All 4 notification types in one frame
const showcase = figma.createFrame();
showcase.name = "Notification/Showcase";
showcase.layoutMode = "VERTICAL";
showcase.itemSpacing = 16;
showcase.paddingTop = showcase.paddingBottom = 24;
showcase.paddingLeft = showcase.paddingRight = 32;
showcase.counterAxisSizingMode = "AUTO";
showcase.primaryAxisSizingMode = "AUTO";
// ✅ Bind to library variable — bgSubtle (#F5F7F9)
showcase.fills = [await boundPaint('VariableID:575:275')];

const types = ["Success", "Error", "Warning", "Default"];
const keys = {
  "Success": "5a317d5cb06122f6f8b61864c6e6127be9b41928",
  "Error":    "<get-from-library>",
  "Warning":  "<get-from-library>",
  "Default":  "<get-from-library>"
};

for (const type of types) {
  const notif = await figma_instantiate_component({ componentKey: keys[type] });
  notif.setProperties({
    "Property 1":  type,
    "Text#2476:0": `This is a ${type.toLowerCase()} message.`
  });
  showcase.appendChild(notif);
}
```

---

## 10. Token Files Reference

| What you need | File | Section |
|---|---|---|
| **★ Figma variable IDs for all colors** | **`tokens/figma-variable-bindings.json`** | **`roleIndex` + `hexIndex` + `bindings`** |
| Flat resolved lookup (spacing/radius/shadow) | `tokens/resolved-tokens.json` | All sections |
| Raw brand palette (hex) | `tokens/foundations/primitives.json` | `Color.Accent`, `Color.Base` |
| Semantic colors (light/dark) | `tokens/foundations/token-colors.json` | Background, Text, Button, Stroke |
| Interactive state colors | `tokens/foundations/accent-colors.json` | Blue/Red/Green/Yellow × state |
| Spacing, radius, gap | `tokens/foundations/tokens-spacing.json` | Padding, Gap, Radius, Width |
| Typography (Zoho Puvi + Lato) | `tokens/foundations/tokens-typography.json` | Scale, fontWeight, fontFamily |
| Border width + style | `tokens/foundations/tokens-border.json` | width, style |
| Corner radius tokens | `tokens/foundations/tokens-border-radius.json` | none → full |
| Shadow tokens | `tokens/foundations/tokens-shadow.json` | none → xl, inner |
| Component sizing | `tokens/foundations/tokens-sizing.json` | button, input, icon, avatar |
| Auto-layout defaults | `tokens/components/auto-layout-rules.json` | per-component layout |
| Button states + keys | `tokens/components/buttonComponent.json` | `statesAndOptions` + `figmaVariables` |
| Input states + keys | `tokens/components/inputComponents.json` | `statesAndOptions` + `figmaVariables` |
| Toggle states + keys | `tokens/components/toggle-button-config.json` | `statesAndOptions` + `figmaVariables` |
| Checkbox states + keys | `tokens/components/checkbox-config.json` | `statesAndOptions` + `figmaVariables` |
| Radio button states + keys | `tokens/components/radio-button-config.json` | `statesAndOptions` + `figmaVariables` |
| Link text states | `tokens/components/link-text-config.json` | `statesAndOptions` + `figmaVariables` |
| Notification variants | `tokens/components/notification-config.json` | `variants` + `figmaVariables` |
| ListView variants | `tokens/components/list-view-config.json` | `variants` + `figmaVariables` |

> **When creating any new component**, always open `figma-variable-bindings.json` first. Look up the `roleIndex` for the variable ID you need, then use `boundPaint()`. Never guess or hardcode.
