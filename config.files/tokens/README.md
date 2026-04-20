# Design Tokens — Zoho Analytics

> **Figma Source:** [Design System – Zoho Analytics](https://www.figma.com/design/m2iOWX3I9aDI5kgyw4wCo0/Design-System--Zoho-Analytics)  
> **Purpose:** Design token JSON files — the single source of truth for all component values.  
> **Related:** [AI Pipeline](../pipeline/README.md) · [Component Docs](../docs/COMPONENT-CREATION-GUIDE.md) · [Master Index](../README.md)

---

## Component Selection & Pick — Global Hard Rules

These rules apply to **every component** in this design system. Individual files repeat the relevant subset. These are non-negotiable.

---

### Rule 1 — Search the Design System library BEFORE writing any component code

> **This is the most-violated rule.** Every component creation script must start with a library search. Building from scratch is only acceptable when both a published library search AND a local page scan return zero matches.

**Step 1 — Published library search (MCP tool):**

```js
figma_get_library_components({
  libraryFileKey: "m2iOWX3I9aDI5kgyw4wCo0",   // Design-System--Zoho-Analytics
  query: "Button"   // replace with the component name you need
})
// → If any COMPONENT result is returned, use its key with importComponentByKeyAsync
```

**Step 2 — Local page scan (fallback if library search returns nothing):**

```js
async function findComponentSet(name) {
  for (const page of figma.root.children) {
    await figma.setCurrentPageAsync(page);
    const found = page.findOne(
      n => (n.type === 'COMPONENT_SET' || n.type === 'COMPONENT') &&
           n.name.toLowerCase().includes(name.toLowerCase())
    );
    if (found) return found;
  }
  return null;
}
const existing = await findComponentSet('Check box');
if (existing) {
  const instance = existing.type === 'COMPONENT_SET'
    ? existing.children[0].createInstance()   // pick correct variant
    : existing.createInstance();
}
```

**Only if both searches return nothing → build from scratch** (Section 7 of COMPONENT-CREATION-GUIDE.md).

| ✅ Correct | ❌ Wrong |
|-----------|---------|
| Search library → `importComponentByKeyAsync` → `createInstance()` | Skip search, jump straight to `figma.createFrame()` |
| `setProperties()` to configure state after instantiation | Rebuild the component manually with raw shapes |
| Local page scan if library search fails | Assume the component doesn't exist without checking |

---

### Rule 2 — Use variant keys, not node IDs or component set keys

| Identifier | What it is | When to use it |
|------------|-----------|----------------|
| **Variant key** (40-char hex) | Key of a specific variant component | Pass to `figma_instantiate_component` |
| **Component set key** | Key of the parent grouping | Never use for instantiation — will fail |
| **Node ID** (`XXXX:YYYY`) | Position inside a *specific* Figma file | Reference only — use with `figma.getNodeByIdAsync` **only** in the same file |

```js
// ✅ Correct — variant key
figma_instantiate_component({ componentKey: "6d5926d43be8374d4fbeedc38146979ca6c6d14b" })

// ❌ Wrong — component set key
figma_instantiate_component({ componentKey: "2608:4683" })

// ❌ Wrong — node ID
figma.getNodeByIdAsync("2608:4683")  // only valid inside Design System file
```

---

### Rule 3 — Bind colors to Figma library variables (no raw hex anywhere)

Every fill and stroke in a Figma component script MUST be a bound variable paint — not a raw hex, not a `{r,g,b}` object, not `hexToRgb()`.

```js
// ✅ CORRECT — one-time helper, use throughout the script
async function boundPaint(variableId) {
  const v = await figma.variables.getVariableByIdAsync(variableId);
  return figma.variables.setBoundVariableForPaint(
    { type: 'SOLID', color: { r: 0, g: 0, b: 0 } },
    'color', v
  );
}

// Look up role → variableId in tokens/figma-variable-bindings.json → roleIndex
node.fills   = [await boundPaint('VariableID:577:38')];  // primaryButtonFill
node.strokes = [await boundPaint('VariableID:579:41')];  // stroke1
text.fills   = [await boundPaint('VariableID:575:276')]; // textPrimary

// ❌ WRONG — any of these forms are forbidden
node.fills = [{ type: 'SOLID', color: { r: 0.17, g: 0.40, b: 0.86 } }];
node.fills = [{ type: 'SOLID', color: hexToRgb('#2C66DD') }];
```

**Master variable ID map:** `tokens/figma-variable-bindings.json`  
Contains `roleIndex`, `hexIndex`, and full `bindings` object with names, hex values, and collection IDs.

---

### Rule 4 — JSON files are reference data, not building instructions

The files in `components/` are exported by the **Token & Component Exporter** plugin (Selection tab → Download). They describe what a component looks like — they are **not** instructions to recreate it from scratch.

| JSON field | Correct use | Incorrect use |
|------------|-------------|---------------|
| `fills[].color` | Verify design system color after instantiation | Copy hex to `figma.createRectangle().fills` |
| `cornerRadius` | Confirm expected shape | Set manually on a new node |
| `width` / `height` | Know the natural size for layout planning | `instance.resize()` unless fitting a container |
| `componentPropertyValues` | Know which `setProperties` keys exist | Try to replicate each property manually |
| `nodes[].id` | Understand which node was exported | Pass to `getNodeByIdAsync` in your file |

---

### Rule 5 — How to export component JSON (Token Exporter Plugin)

```
1. Open the Design System Figma file
2. Select the target component or one of its instances
3. Open: Plugins → Development → Token & Component Exporter
4. Click the "Selection" tab
5. Click "↓ Download" → file saves as <component-name>.json
6. Move the file to config.files/tokens/components/
```

---

### Rule 6 — How to set component properties after instantiation

```js
// Use setProperties() — the ONLY safe way to configure an instance
instance.setProperties({
  "State":          "Hover",         // VARIANT property
  "Show Icon":      false,           // BOOLEAN property
  "Label#1234:0":   "Submit",        // TEXT property — note the #nodeId suffix
});

// ❌ Never do this:
const textNode = instance.findOne(n => n.type === "TEXT");
textNode.characters = "Submit";  // breaks component link, silently fails on some builds
```

> **Note on TEXT property keys:** Plugin-exported JSON shows keys like `"Text#807:10"`. The `#807:10` suffix is the node ID of that text within the Design System file. Always copy the full key (including suffix) from the JSON `componentPropertyValues` object.

---

### Rule 7 — Component pick decision tree

```
Need a UI element?
│
├─ Is there a matching component in components/*.json?
│   ├─ YES → Use figma_instantiate_component with variant key from the MD file
│   └─ NO  → Check the Design System Figma file directly
│               └─ Found? → Export JSON, add to components/, update MD, then instantiate
│
└─ Is the component unavailable in the library?
    └─ Only then build from scratch — must match every token value in primitives.json
```

---

## Folder Structure

```
tokens/                              ← Token data layer (JSON only)
├── README.md                        ← You are here
├── resolved-tokens.json             ← Flat pre-resolved lookup (spacing, radius, shadow)
├── figma-variable-bindings.json     ← ★ Master Figma variable ID map — roleIndex / hexIndex / bindings
│
├── foundations/                     ← Raw token definitions (9 files)
│   ├── primitives.json              Base color palette + spacing scale
│   ├── token-colors.json            Semantic colors — Light & Dark mode
│   ├── accent-colors.json           Interactive state colors (Hover, Tap, Disabled)
│   ├── tokens-typography.json       Font families, scale, weights (Zoho Puvi + Lato)
│   ├── tokens-spacing.json          Padding, gap, radius per breakpoint
│   ├── tokens-border-radius.json    Corner radius tokens (none → full)
│   ├── tokens-border.json           Border width + style tokens
│   ├── tokens-shadow.json           Shadow tokens (none → xl, inner)
│   └── tokens-sizing.json           Component sizing (button, input, icon, avatar…)
│
└── components/                      ← Per-component configs + layout rules
    ├── auto-layout-rules.json       Auto-layout defaults per component type
    ├── buttonComponent.json         Button — all states × variants + figmaVariables
    ├── inputComponents.json         Input — all states × right-option variants + figmaVariables
    ├── toggle-button-config.json    Toggle — ON/OFF × Enable × Order + figmaVariables
    ├── checkbox-config.json         Checkbox — Check × Enable, standalone + row + figmaVariables
    ├── radio-button-config.json     Radio Button — On × Enable, row with label + figmaVariables
    ├── link-text-config.json        Link Text — Default · Hover + figmaVariables
    ├── notification-config.json     Notification — Success · Error · Warning · Default + figmaVariables
    └── list-view-config.json        ListView — Rows × Columns variants + figmaVariables

docs/                                ← Human-readable documentation (../docs/)
├── COMPONENT-CREATION-GUIDE.md     ← ★ START HERE — link/screenshot → Figma
├── foundations/
│   ├── primitives.md
│   ├── token-colors.md
│   ├── accent-colors.md
│   └── tokens-spacing.md
└── components/
    ├── buttonComponent.md
    ├── inputComponent.md
    ├── toggleButton.md
    ├── checkbox.md
    ├── radioButton.md
    ├── linkText.md
    ├── notification.md
    ├── catalogStatCard.md
    └── modalsDialogs.md
```

---

## Guides

| Guide | Purpose |
|-------|---------|
| [**Component Creation Guide**](../docs/COMPONENT-CREATION-GUIDE.md) | Turn a Figma link or screenshot into a real Figma screen — full token & variant workflow |
| [**AI Pipeline**](../pipeline/README.md) | Run the AI agent pipeline to auto-generate components |

---

## Token Hierarchy

```
primitives.json
      ↓ referenced by
accent-colors.json   token-colors.json   tokens-spacing.json
      ↓                    ↓                    ↓
           Components (buttonComponent, inputComponents)
```

---

## Foundations

### `primitives.json` · [View docs](../docs/foundations/primitives.md)
The raw base palette — every color value and spacing unit in the system.

| Contains | Description |
|----------|-------------|
| Accent Colors | Blue, Red, Green, Yellow with all Shades + Tints |
| Base Colors | White, Black, full Grey scale (Shades + Tints) |
| Neutral Colors | Neutral base + Shades + Tints (used for text, surfaces, strokes) |
| Other Zoho Colors | Extended brand palette (22 named colors) |
| Spacing Scale | 1 · 2 · 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 |

---

### `token-colors.json` · [View docs](../docs/foundations/token-colors.md)
Semantic color tokens for **Light** and **Dark** mode.

| Category | Key Tokens |
|----------|-----------|
| Background | `BG-Primary-Default`, `BG-Primary-Grey`, `BG-Primary-Subtle`, `BG-Primary-Raised` |
| Text | `Text Primary`, `Text Description`, `Text Disabled`, `Text Placeholder`, `Text On AccentColor` |
| Button Fill | `Button Primary`, `Secondary`, `Input Fill`, `Accent Hover`, `ON OFF` |
| Button Stroke | `Secondary`, `Secondary Disabled` |
| Stroke | `Stroke 1–3`, `Stroke Disabled` |
| Card | `BG-Primary`, `BG-Primary 2–4` |
| Other | `Error`, `Text Link`, `Hover`, `Dropshadow S/M/L`, `Tooltip` |

| Mode | Page BG | Text | Input Fill | Stroke | Link |
|------|---------|------|------------|--------|------|
| Light | `#FFFFFF` | `#0C0E11` | `#FFFFFF` | `#C6CED9` | `#006AFF` |
| Dark | `#0C0E11` | `#FFFFFF` | `#0C0E11` | `#3D4653` | `#00A6FF` |

---

### `accent-colors.json` · [View docs](../docs/foundations/accent-colors.md)
State-mapped tokens for each accent color — consumed by component definitions.

| Color | Default | Hover Light | Tap | Disabled Light |
|-------|---------|-------------|-----|----------------|
| Blue | `#2C66DD` | `#1B49A6` | `#4276E0` | `#80A3EB` |
| Red | `#CC3929` | `#95291D` | `#D14D3F` | `#E0887F` |
| Green | `#0C8844` | `#096633` | `#249457` | `#6DB88F` |
| Yellow | `#EBB625` | `#B98D11` | `#EDBD3B` | `#F3D37C` |

---

### `tokens-spacing.json` · [View docs](../docs/foundations/tokens-spacing.md)
Spacing scale for 3 breakpoints — Desktop (L), Tablet (M), Mobile (S).

| Token | Desktop | Tablet | Mobile | Use |
|-------|---------|--------|--------|-----|
| `Radius.M` | `8` | `8` | `8` | Input / Button radius |
| `Radius.XL` | `16` | `16` | `16` | Card radius |
| `Padding.S` | `12` | `12` | `8` | Button horizontal padding |
| `Padding.L` | `24` | `24` | `24` | Card padding |
| `Gap.M` | `8` | `12` | `8` | Inline element gap |
| `Width.M` | `1` | `1` | `1` | Border width |
| `DropShadow.M` | `8` | `8` | `8` | Card shadow blur |

---

## Components

### `buttonComponent.json` · [View docs](../docs/components/buttonComponent.md)

| Property | Value |
|----------|-------|
| Component Set ID | `2608:4683` |
| Instance Node ID | `2633:5033` |
| Height | `32` |
| Corner Radius | `8` (`Radius.M`) |
| States | `Default` · `Hover` · `Disabled` · `Tap` |
| Primary Variants | `Yes` (filled) · `No` (secondary) |

**Primary=Yes state colors**

| State | Fill |
|-------|------|
| Default | `#2C66DD` |
| Hover | `#1B49A6` |
| Tap | `#4276E0` |
| Disabled | `#80A3EB` |

---

### `toggle-button-config.json` · [View docs](../docs/components/toggleButton.md)

| Property | Value |
|----------|-------|
| Total Nodes | `8` |
| Height | `20` (component) · `16` (toggle pill) |
| Corner Radius | `40` (pill) |
| States | `ON` · `OFF` |
| Enable | `ON` (enabled) · `OFF` (disabled) |
| Order | `Text Button` · `Button Text` |

**State color summary**

| ON | Enable | Toggle Fill | Label |
|----|--------|-------------|-------|
| ON | ON | `#2C66DD` | `#0C0E11` |
| OFF | ON | `#A0ADBF` | `#0C0E11` |
| ON | OFF | `#80A3EB` | `#93A2B6` |
| OFF | OFF | `#C6CED9` | `#93A2B6` |

**Node ID quick lookup**

| State | Text Button | Button Text |
|-------|-------------|-------------|
| ON + Enabled | `2609:3459` | `2609:3463` |
| OFF + Enabled | `2609:3460` | `2609:3464` |
| ON + Disabled | `2609:3461` | `2609:3465` |
| OFF + Disabled | `2609:3462` | `2609:3466` |

---

### `notification-config.json` · [View docs](../docs/components/notification.md)

| Property | Value |
|----------|-------|
| Component Set ID | `981:1372` |
| Total Variants | `4` |
| Container Size | `430 × 304` |
| Corner Radius | `5` |
| Padding | `20` all sides |
| Item Spacing | `24` |
| Container Fill | `#FFFFFF` · Stroke `#0C0E11` |
| Property | `Property 1`: `Success` · `Error` · `Warning` · `Default` |

**Variant accent colors**

| Variant | Accent Color | Node ID |
|---------|-------------|---------|
| `Success` | `#0C8844` (Green) | `981:1373` |
| `Error` | `#CC3929` (Red) | `981:1383` |
| `Warning` | `#EBB625` (Yellow) | `981:1395` |
| `Default` | `#2C66DD` (Blue) | `981:1405` |

---

### `link-text-config.json` · [View docs](../docs/components/linkText.md)

| Property | Value |
|----------|-------|
| Total Nodes | `2` |
| Size | `58 × 20` (Default) · `57 × 20` (Hover) |
| Property | `Property 1`: `Default` · `Hover` |
| Text Color | `#00A6FF` (dark mode) · `#006AFF` (light mode) |
| Container Fill | `#FFFFFF` |

**Node ID quick lookup**

| State | Node ID |
|-------|---------|
| `Default` | `2610:3300` |
| `Hover` | `2610:3303` |

---

### `radio-button-config.json` · [View docs](../docs/components/radioButton.md)

| Property | Value |
|----------|-------|
| Total Nodes | `4` |
| Row Size | `210 × 20` |
| Radio Circle | `12 × 12`, cornerRadius `8` |
| Properties | `On`: `ON`/`OFF` · `Enable`: `On`/`Off` · `Text#2399:0`: label string |

**State color summary**

| On | Enable | Radio Fill | Radio Stroke | Label Color |
|----|--------|------------|--------------|-------------|
| `ON` | `On` | `#2C66DD` | `#2C66DD` | `#FFFFFF` |
| `OFF` | `On` | — | `#3D4653` | `#FFFFFF` |
| `ON` | `Off` | `#2C66DD` | `#2C66DD` | `#556274` |
| `OFF` | `Off` | — | `#C6C9D5` | `#556274` |

**Node ID quick lookup**

| On | Enable | Node ID |
|----|--------|---------|
| `ON` | `On` | `2609:4555` |
| `OFF` | `On` | `2609:4556` |
| `ON` | `Off` | `2609:4557` |
| `OFF` | `Off` | `2609:4558` |

---

### `checkbox-config.json` · [View docs](../docs/components/checkbox.md)

| Property | Value |
|----------|-------|
| Total Nodes | `8` — 4 standalone boxes + 4 rows (box + label) |
| Box Size | `12 × 12` |
| Row Size | `242 × 20` |
| Corner Radius | `2` |
| Properties (box) | `Check`: `Yes`/`No` · `Enable`: `Yes`/`No` |
| Properties (row) | `ON`: `On`/`Off` · `Enable`: `ON`/`OFF` |

**State color summary**

| Check | Enable | Fill | Stroke |
|-------|--------|------|--------|
| `Yes` | `Yes` | `#2C66DD` | `#2C66DD` |
| `Yes` | `No` | `#184091` | — |
| `No` | `Yes` | — | `#556274` |
| `No` | `No` | — | `#313842` |

**Node ID quick lookup**

| Variant | Check/ON | Enable | Node ID |
|---------|----------|--------|---------|
| Standalone | `Yes` | `Yes` | `2609:4541` |
| Standalone | `Yes` | `No` | `2609:4542` |
| Standalone | `No` | `Yes` | `2609:4543` |
| Standalone | `No` | `No` | `2609:4544` |
| Row | `On` | `ON` | `2609:4545` |
| Row | `Off` | `ON` | `2609:4546` |
| Row | `On` | `OFF` | `2609:4547` |
| Row | `Off` | `OFF` | `2609:4548` |

---

### `inputComponents.json` · [View docs](../docs/components/inputComponent.md)

| Property | Value |
|----------|-------|
| Component Set ID | `826:345` |
| Parent Frame | `2603:4167` |
| Height | `32` |
| Corner Radius | `8` (`Radius.M`) |
| States | `Default` · `Hover` · `Error` · `Disabled` |
| Right Options | `Default` · `Arrow` · `Copy` · `Up Down Arrow` · `Line Arrow` · `Icon search` |

**State color summary**

| State | Fill | Stroke |
|-------|------|--------|
| Default | `#FFFFFF` | `#C6CED9` |
| Hover | `#FFFFFF` | `#2C66DD` |
| Error | `#FFFFFF` | `#CC3929` |
| Disabled | `#F5F7F9` | `#C6CED9` |

**Node ID quick lookup**

| State + Right Option | Node ID |
|----------------------|---------|
| Default, no option | `2603:4205` |
| Default, Icon search | `2603:4185` |
| Hover, Icon search | `2603:4186` |
| Error, Icon search | `2603:4187` |
| Disabled, Icon search | `2603:4188` |
| Default, Copy | `2603:4189` |
| Hover, Copy | `2603:4190` |
| Error, Copy | `2603:4191` |
| Disabled, Copy | `2603:4196` |
| Default, Arrow | `2603:4192` |
| Default, Line Arrow | `2603:4201` |
| Default, Up Down Arrow | `2603:4197` |

---

### `catalog-stat-card-config.json` · [View docs](../docs/components/catalogStatCard.md)

> **Source:** [Catalog file](https://www.figma.com/design/bHcUW9bq4nglzklB5ohK0v/Catalog?node-id=2787-5662) — not a Design System library component. **Build from scratch** using token values.

| Property | Value |
|----------|-------|
| Original Figma node | `2787:5662` (Catalog file) |
| **Local Component Key** | `9af8f00eb13fff5e71e70d8601a3609c8557fb08` |
| **Local Node ID** | `12:561` |
| Size | `338 × 88` — width fills container, height fixed |
| Corner radius | `6` |
| Layout | Horizontal, SPACE_BETWEEN, padding `20` top/bottom · `9` left · `13` right |
| Background | `#F1EAF8` (lavender purple) |
| Stroke | `#B399CC`, weight `1`, inside |
| Drop shadow | `#B399CC` at `40%` opacity, offset `(0, 4)` |
| Count text | Zoho Puvi Semibold `22px`, `#000000` |
| Label text | Zoho Puvi Regular `14px`, `#000000` |
| Icon circle | `48×48` white ellipse `#FFFFFF` |
| Icon size | `20×20` centered inside circle |

**Documented variant**

| Variant | Label | Icon | Figma node |
|---------|-------|------|-----------|
| Columns | "Columns" | Table grid (header `#FFD494`) | `2787:5662` |

> Additional variants (Tables, Rows, Reports) may exist as sibling frames in the Catalog file — inspect nodes near `2787:5662`.

---

## Figma Console MCP — How to Use Components

> **Core principle:** Always instantiate real design system components from the library. Never build from scratch using raw shapes and colors.

### Correct Workflow

```js
// Step 1: Instantiate the component from the shared library using its variant key
const instance = await figma_instantiate_component({
  componentKey: "<variant-key-from-table-below>"
});

// Step 2: Position it on the canvas
instance.x = 100;
instance.y = 200;

// Step 3: Switch state or update text via setProperties
instance.setProperties({
  "State": "Hover",
  "Primary": "Yes",
  "x#846:0": "Save Changes"
});
```

### Why variant keys, not node IDs?
- **Node IDs** (`2608:4684`) — identify a node inside the *Design System file*. Useful for reference and lookup only.
- **Variant keys** (`6d5926d...`) — used with `figma_instantiate_component` to pull a live, editable instance of the component into *your working file*.
- **Component Set keys** — never use these directly; always pick a specific **variant key** from the table.

### All Component Library Keys — Quick Reference

| Component | Set Key (reference only) | Common Default Variant Key |
|-----------|--------------------------|---------------------------|
| **Button** | `473d7bb16eaec790af1d2af4403a0737572373bb` | Default+Primary=Yes → `6d5926d43be8374d4fbeedc38146979ca6c6d14b` |
| **Input** | `c8cb74a35dd905ce4f2c756d6e85f8594e2934da` | Default, no option → `8fd07348a67bc5a1124009fed9fe74358033ea67` |
| **Toggle Button** | `67e0764bb4dc2542a3f9b4ce402aec59353d4baa` | ON+Enabled+Text Button → `9a8b55637d2aa338fe922c48be3beb522c2da356` |
| **Checkbox (box)** | `2c402e26ead22156c59e0344784194a88b44bf0b` | Checked+Enabled → `9d7b1eee3169179e50ce57286b51af999466716b` |
| **Checkbox (row)** | `5d4c744a4d6a9ebde52b86cc4a008434b3b0ead1` | On+Enabled → `10ab51e4ea606e44fef73a8c6091a86a6a83afb3` |
| **Radio Button (row)** | `1a1febfe50bad7bc85bae81b0a4e83c41acdd583` | ON+Enabled → `1de98209ee51df75f39ca825201019a9a10edc10` |
| **Radio Button (circle)** | `1a85379e9bacd33fee5b614ee09b0a96e3e64cef` | On+Yes → `b7ebf91a30f1945747d62115df31d7999b11f733` |
| **Link Text** | `551f38a5801c84ea61e50de7793d5a241d608ac1` | Default → `767aa91db276d3066791c79f597b4243342598e3` |
| **Notification** | `acdf7cef1d82caf1755e3a5b837add2ec03fe3e9` | Success → `5a317d5cb06122f6f8b61864c6e6127be9b41928` |

> For full variant key tables, see each component's `.md` file in `docs/components/`.

---

## Font

All components use **`Zoho Puvi`** with styles: `Regular` · `Medium` · `Semibold`.

| Context | Style | Size |
|---------|-------|------|
| Input / Button text | Regular | 14px |
| Labels | Medium | 13px |
| Headings | Semibold | 16–22px |
| Error messages | Regular | 12px |
| Helper / hint text | Regular | 11px |
