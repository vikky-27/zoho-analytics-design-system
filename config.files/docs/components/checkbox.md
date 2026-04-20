# Checkbox Component — Zoho Analytics Design System

> **File:** `components/checkbox-config.json`
> **Figma Source:** [Design System – Zoho Analytics](https://www.figma.com/design/m2iOWX3I9aDI5kgyw4wCo0/Design-System--Zoho-Analytics)
> **Total Nodes:** `8` — 4 standalone boxes + 4 row (box + label)

---

## Component Selection & Pick — Hard Rules

### 0. ⛔ Search the library BEFORE creating this component

```js
figma_get_library_components({ libraryFileKey: "m2iOWX3I9aDI5kgyw4wCo0", query: "Check box" })
// Local fallback:
const existing = await page.findOne(n => (n.type === 'COMPONENT_SET' || n.type === 'COMPONENT') && n.name.toLowerCase().includes('check box'));
if (existing) { const inst = existing.type === 'COMPONENT_SET' ? existing.children[0].createInstance() : existing.createInstance(); }
```

---

### 1. How to export this component (Token Exporter Plugin)
| Step | Action |
|------|--------|
| 1 | Open **Figma Design System** file → select the Checkbox component or instance |
| 2 | Run **Token & Component Exporter** plugin → go to **Selection** tab |
| 3 | Click **↓ Download** — saves as `checkbox-config.json` |
| 4 | Place file in `config.files/tokens/components/` |

### 2. How to read the exported JSON
| JSON Field | What it means | How to use it |
|------------|---------------|---------------|
| `nodes[].id` | Node ID inside the *Design System* file | Reference only — do NOT use with `getNodeByIdAsync` in your working file |
| `nodes[].componentPropertyValues` | Current values for `Check`/`Enable` (box) or `ON`/`Enable` (row) | Read to know what properties exist |
| `nodes[].fills[].color` | Fill hex for the checked state | Reference only |
| `nodes[].strokes[].color` | Stroke hex for the unchecked state | Reference only |
| `statesAndOptions.componentSets[].variantAxes` | All variant dimensions | Use to validate which combinations are valid |

### 3. Component pick rules — MUST follow
| Rule | ✅ Do | ❌ Never |
|------|-------|---------|
| **Source** | Always instantiate from the **Design System library** | Never build with `figma.createFrame()` + vector |
| **Key type** | Use a **variant key** (40-char hex string) | Never use component set key or node ID to instantiate |
| **Two variants** | Standalone box (12×12) vs Row with label (242×20) — pick the right one | Never mix the two component sets |
| **Color** | Let the component carry its own fills and strokes | Never overwrite box colors after instantiation |
| **Checkmark** | Managed by the component as a vector child | Never add your own checkmark shape |
| **From scratch** | Only if component unavailable in the library | Must exactly match token values in the JSON |

### 4. Correct instantiation pattern
```js
// Standalone box — Checked + Enabled
const box = await figma_instantiate_component({
  componentKey: "9d7b1eee3169179e50ce57286b51af999466716b"
});
box.setProperties({ "Check": "Yes", "Enable": "Yes" });

// Row with label — On + Enabled
const row = await figma_instantiate_component({
  componentKey: "10ab51e4ea606e44fef73a8c6091a86a6a83afb3"
});
row.setProperties({ "ON": "On", "Enable": "ON" });
```

### 5. Property types cheat sheet
| Component | Property | Type | Valid values |
|-----------|----------|------|-------------|
| Standalone box | `Check` | `VARIANT` | `"Yes"` · `"No"` |
| Standalone box | `Enable` | `VARIANT` | `"Yes"` · `"No"` |
| Row with label | `ON` | `VARIANT` | `"On"` · `"Off"` |
| Row with label | `Enable` | `VARIANT` | `"ON"` · `"OFF"` |

---

## Style Hard Rules

| Rule | Detail |
|------|--------|
| **Size** | Never hardcode — always read from JSON (`12 × 12` box · `242 × 20` row) |
| **Corner radius** | Always `2px` — from JSON |
| **Checkmark** | `#FFFFFF` stroke vector — managed by the component |
| **Colors** | Reference only from `checkbox-config.json` — the real instance carries them |
| **Font** | `Zoho Puvi Regular`, `14px` for label |

---

## Component Anatomy

```
Standalone checkbox (12 × 12):
┌──────────┐   radius: 2
│  ✓ mark  │   fill: accent (checked) / transparent (unchecked)
└──────────┘   stroke: accent or neutral

Checkbox Row (242 × 20):
┌──────────┐   [  Label text (14px · 226 × 20)  ]
│  ✓ mark  │
└──────────┘
  12 × 12          itemSpacing: 4
```

---

## Component Properties

### Standalone Checkbox (`2609:4541` – `2609:4544`)

| Property | Type | Values |
|----------|------|--------|
| `Check` | Variant | `Yes` · `No` |
| `Enable` | Variant | `Yes` · `No` |

### Checkbox Row (`2609:4545` – `2609:4548`)

| Property | Type | Values |
|----------|------|--------|
| `ON` | Variant | `On` · `Off` |
| `Enable` | Variant | `ON` · `OFF` |

---

## State Color Reference

### Checkbox Box

| Check | Enable | Fill | Stroke | Checkmark | Description |
|-------|--------|------|--------|-----------|-------------|
| `Yes` | `Yes` | `#2C66DD` | `#2C66DD` | `#FFFFFF` | Checked · enabled |
| `Yes` | `No` | `#184091` | — | `#FFFFFF` | Checked · disabled |
| `No` | `Yes` | — (transparent) | `#556274` | — | Unchecked · enabled |
| `No` | `No` | — (transparent) | `#313842` | — | Unchecked · disabled |

### Checkbox Row Label Color

| Enable | Label Color | Token |
|--------|-------------|-------|
| `ON` | `#FFFFFF` | `Token: Colors > Dark > Text > Text Primary` |
| `OFF` | `#556274` | `Neutral.Shades.Neutral 50` (disabled) |

---

## Full Variant × State Node ID Matrix

### Standalone Checkbox Box (12 × 12)

| Check | Enable | Node ID | Fill | Stroke |
|-------|--------|---------|------|--------|
| `Yes` | `Yes` | `2609:4541` | `#2C66DD` | `#2C66DD` |
| `Yes` | `No` | `2609:4542` | `#184091` | — |
| `No` | `Yes` | `2609:4543` | — | `#556274` |
| `No` | `No` | `2609:4544` | — | `#313842` |

### Checkbox Row (242 × 20) — Box + Label

| ON | Enable | Node ID | Box Fill / Stroke | Label Color |
|----|--------|---------|-------------------|-------------|
| `On` | `ON` | `2609:4545` | fill `#2C66DD` · stroke `#2C66DD` | `#FFFFFF` |
| `Off` | `ON` | `2609:4546` | stroke `#556274` | `#FFFFFF` |
| `On` | `OFF` | `2609:4547` | fill `#184091` | `#556274` |
| `Off` | `OFF` | `2609:4548` | stroke `#313842` | `#556274` |

---

## Layout Spec (from JSON)

### Standalone Box
| Property | Value |
|----------|-------|
| Width | `12` |
| Height | `12` *(read from JSON)* |
| Corner Radius | `2` |
| Fill (checked + enabled) | `#2C66DD` |
| Stroke (unchecked) | `#556274` / `#313842` |
| Stroke weight | `1` |

### Checkmark Vector
| Property | Value |
|----------|-------|
| Name | `Vector 1` |
| Size | `6 × 6` (enabled) · `7 × 7` (disabled) |
| Stroke | `#FFFFFF` |
| Type | `VECTOR` |

### Row Container
| Property | Value |
|----------|-------|
| Width | `242` |
| Height | `20` *(read from JSON)* |
| Direction | `HORIZONTAL` |
| Item Spacing | `4` |
| Counter Axis Align | `CENTER` |

### Label Text
| Property | Value |
|----------|-------|
| Width | `226` |
| Height | `20` |
| Font | `Zoho Puvi Regular` |
| Size | `14px` |
| Color Enabled | `#FFFFFF` |
| Color Disabled | `#556274` |

---

## When to Use Each State

| Situation | Check | Enable | Node |
|-----------|-------|--------|------|
| Item is selected | `Yes` | `Yes` | `2609:4541` / `2609:4545` |
| Item is unselected | `No` | `Yes` | `2609:4543` / `2609:4546` |
| Pre-selected and locked | `Yes` | `No` | `2609:4542` / `2609:4547` |
| Unavailable / locked off | `No` | `No` | `2609:4544` / `2609:4548` |

---

## Library Component Keys

> **How to use:** Always instantiate from the design system library using `figma_instantiate_component` with the **variant key**. Never build checkboxes from scratch.

### Standalone Checkbox Box (12×12)
**Component Set:** `Check box` · Node `2608:6618` · Set Key `2c402e26ead22156c59e0344784194a88b44bf0b`

| Check | Enable | Variant Key | Node ID |
|-------|--------|-------------|---------|
| `Yes` | `Yes` | `9d7b1eee3169179e50ce57286b51af999466716b` | `2608:6619` |
| `Yes` | `No` | `a58fcb96b71b9b72b19a737bd0b7d580dc09a9ef` | `2608:6621` |
| `No` | `Yes` | `74e6ef1fc00fbeb6f054e5f841cff2458dc73e8c` | `2608:6623` |
| `No` | `No` | `71c97fd262fc8c21d49c8882548c12bbdaf204d1` | `2608:6625` |

### Checkbox Row with Label (242×20)
**Component Set:** `Check box` · Node `2608:6574` · Set Key `5d4c744a4d6a9ebde52b86cc4a008434b3b0ead1`

| ON | Enable | Variant Key | Node ID |
|----|--------|-------------|---------|
| `On` | `ON` | `10ab51e4ea606e44fef73a8c6091a86a6a83afb3` | `2608:6575` |
| `Off` | `ON` | `bfdd9a4ee061207a1a941528de2e8851a6fb2b9a` | `2608:6578` |
| `On` | `OFF` | `7f9d5118ed1a46760f0b6bce99bb17be30262b28` | `2608:6581` |
| `Off` | `OFF` | `e081c5867fa987f31f5caab0eea20f10ba288f4b` | `2608:6584` |

---

## Figma Console MCP — Usage

### 1. Instantiate from the design system library
```js
// Standalone — Checked + Enabled
const checkbox = await figma_instantiate_component({
  componentKey: "9d7b1eee3169179e50ce57286b51af999466716b"
});

// Row — On + Enabled (with label)
const checkboxRow = await figma_instantiate_component({
  componentKey: "10ab51e4ea606e44fef73a8c6091a86a6a83afb3"
});
```

### 2. Switch variant after instantiation
```js
// Standalone box
instance.setProperties({
  "Check": "Yes",
  "Enable": "Yes"
});

// Row with label
instance.setProperties({
  "ON": "On",
  "Enable": "ON"
});
```

### 3. Quick variant key lookup
```
Standalone — Checked   + Enabled   → 9d7b1eee3169179e50ce57286b51af999466716b
Standalone — Checked   + Disabled  → a58fcb96b71b9b72b19a737bd0b7d580dc09a9ef
Standalone — Unchecked + Enabled   → 74e6ef1fc00fbeb6f054e5f841cff2458dc73e8c
Standalone — Unchecked + Disabled  → 71c97fd262fc8c21d49c8882548c12bbdaf204d1

Row — On  + Enabled   → 10ab51e4ea606e44fef73a8c6091a86a6a83afb3
Row — Off + Enabled   → bfdd9a4ee061207a1a941528de2e8851a6fb2b9a
Row — On  + Disabled  → 7f9d5118ed1a46760f0b6bce99bb17be30262b28
Row — Off + Disabled  → e081c5867fa987f31f5caab0eea20f10ba288f4b
```

---

## Token Reference

| Token | Hex | Used For |
|-------|-----|----------|
| `Accent Colors.Blue.Accent Color` | `#2C66DD` | Checked + Enabled fill & stroke |
| `Color.Accent Colors.Blue.Shades.Blue 40` | `#184091` | Checked + Disabled fill |
| `Neutral.Shades.Neutral 50` | `#556274` | Unchecked + Enabled stroke · Row disabled label |
| `Neutral.Shades.Neutral 70` | `#313842` | Unchecked + Disabled stroke |
| `Color.Base.White` | `#FFFFFF` | Checkmark vector · Row enabled label |
| `Spacing System.Radius.XS` | `2` | Corner radius |

---

## ⚠️ HARD RULE — Token Usage (No Exceptions)

> **Every color applied in Figma MUST be bound to a Figma library variable via `figma.variables.setBoundVariableForPaint()`.  
> Hardcoded hex values (e.g. `#2C66DD`), raw `{r,g,b}` objects, or magic numbers are NEVER acceptable in component plugin code.**

Correct pattern:
```js
const varObj = await figma.variables.getVariableByIdAsync('VariableID:577:38');
const paint = figma.variables.setBoundVariableForPaint(
  { type: 'SOLID', color: { r: 0, g: 0, b: 0 } },
  'color', varObj
);
node.fills = [paint];
```

### Figma Variable Bindings

| Role | Hex | Variable Name | Variable ID |
|------|-----|---------------|-------------|
| Checked + enabled fill & stroke | `#2C66DD` | `ZA/Button/Button Fill/Button Primary` | `VariableID:577:38` |
| Checked + disabled fill | `#184091` | `Color/Accent Colors/Blue/Shades/Blue 40` | `VariableID:391:92` |
| Unchecked + enabled stroke | `#556274` | `Color/Neutral/Shades/Neutral 40` | `VariableID:572:3675` |
| Unchecked + disabled stroke | `#313842` | `Color/Neutral/Shades/Neutral 70` | `VariableID:572:3678` |
| Checkmark / enabled label | `#FFFFFF` | `Color/Base/White` | `VariableID:189:170` |
| Disabled label | `#556274` | `Color/Neutral/Shades/Neutral 40` | `VariableID:572:3675` |
