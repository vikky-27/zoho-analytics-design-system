# Button Component — Zoho Analytics Design System

> **File:** `components/buttonComponent.json`
> **Figma Source:** [Design System – Zoho Analytics](https://www.figma.com/design/m2iOWX3I9aDI5kgyw4wCo0/Design-System--Zoho-Analytics)
> **Component Set ID:** `2608:4683`
> **Total Nodes:** `32`

---

## Component Selection & Pick — Hard Rules

### 0. ⛔ Search the library BEFORE creating this component

Run this search before writing any code. If a result is returned, import it — never rebuild.

```js
// Published library search
figma_get_library_components({
  libraryFileKey: "m2iOWX3I9aDI5kgyw4wCo0",
  query: "Button"
})
// → Found? Use importComponentByKeyAsync("<variantKey>").createInstance()

// Local fallback (if library search returns nothing)
const existing = await page.findOne(
  n => (n.type === 'COMPONENT_SET' || n.type === 'COMPONENT') &&
       n.name.toLowerCase().includes('button')
);
if (existing) { const inst = existing.type === 'COMPONENT_SET' ? existing.children[0].createInstance() : existing.createInstance(); }
```

Only if BOTH searches return nothing → use Section 7 of COMPONENT-CREATION-GUIDE.md to build from scratch.

---

### 1. How to export this component (Token Exporter Plugin)
| Step | Action |
|------|--------|
| 1 | Open **Figma Design System** file → select the Button component or instance |
| 2 | Run **Token & Component Exporter** plugin → go to **Selection** tab |
| 3 | Click **↓ Download** — saves as `buttonComponent.json` |
| 4 | Place file in `config.files/tokens/components/` |

### 2. How to read the exported JSON
| JSON Field | What it means | How to use it |
|------------|---------------|---------------|
| `nodes[].id` | Node ID inside the *Design System* file | Reference only — do NOT use with `getNodeByIdAsync` in your working file |
| `nodes[].componentPropertyValues` | All current property values (State, Primary, label, icon toggle) | Read to know what properties exist and their types |
| `nodes[].fills[].color` | Hex color or token reference e.g. `{Color.Accent Colors.Blue}` | Reference only — never copy-paste these to build from scratch |
| `nodes[].cornerRadius` | Radius value or token reference e.g. `{Spacing System.Radius.M}` | Reference only — the real component already has this applied |
| `statesAndOptions.componentSets[].variantAxes` | All available variant dimensions and their options | Use to know which `State` / `Primary` values are valid |
| `statesAndOptions.instances[].allVariantOptions` | Full variant map for an instance | Use to validate `setProperties` calls |

### 3. Component pick rules — MUST follow
| Rule | ✅ Do | ❌ Never |
|------|-------|---------|
| **Source** | Always instantiate from the **Design System library** | Never build with `figma.createFrame()` |
| **Key type** | Use a **variant key** (40-char hex string) | Never use component set key or node ID to instantiate |
| **Color** | Let the component carry its own fills | Never overwrite fills/strokes after instantiation |
| **Size** | Read `width`/`height` from JSON for reference | Never hardcode pixel sizes |
| **Properties** | Set via `setProperties({ "State": "Hover" })` | Never edit child text nodes directly on an instance |
| **From scratch** | Only if the component is unavailable in the library | Must exactly match every token value in the JSON |

### 4. Correct instantiation pattern
```js
// Step 1 — pick the right variant key from the Library Component Keys table below
const instance = await figma_instantiate_component({
  componentKey: "6d5926d43be8374d4fbeedc38146979ca6c6d14b"  // Default, Primary=Yes
});

// Step 2 — position in parent
instance.x = 32;
instance.y = 100;

// Step 3 — set state / label via properties (never edit child nodes directly)
instance.setProperties({
  "State":        "Default",
  "Primary":      "Yes",
  "Icon#832:22":  false,
  "Text#846:0":   "Save Changes"
});
```

### 5. Property types cheat sheet
| Property key pattern | Type | Set with |
|----------------------|------|----------|
| `State` | `VARIANT` | `"Default"` · `"Hover"` · `"Disabled"` · `"Tap"` |
| `Primary` | `VARIANT` | `"Yes"` · `"No"` |
| `Icon#832:22` | `BOOLEAN` | `true` (show icon) · `false` (hide) |
| `Text#846:0` | `TEXT` | Button label string (default: `"CTA Button"`) |

---

## Style Hard Rules

| Rule | Detail |
|------|--------|
| **Height** | Never hardcode — always read from JSON (`32px`) |
| **Corner radius** | Always `{Spacing System.Radius.M}` → `8px` |
| **Padding** | `{Spacing System.Padding! Gap! Spacing!.S}` → `12px` left/right |
| **Font** | `Zoho Puvi Regular`, `14px` |
| **Colors** | Reference only from `buttonComponent.json` — the real instance carries them |

---

## Component Anatomy

```
┌──────────────────────────────────────────┐  h: 32  radius: 8
│  [Icon 16×16]   [  Label text (14px)  ]  │  padL: 12  padR: 12
└──────────────────────────────────────────┘  itemSpacing: 10
```

### Layout (from JSON)
| Property | Value |
|----------|-------|
| Direction | `HORIZONTAL` |
| Height | `32` *(read from JSON — never hardcode)* |
| Corner Radius | `8` → `{Spacing System.Radius.M}` |
| Padding Left | `12` → `{Spacing System.Padding! Gap! Spacing!.S}` |
| Padding Right | `12` → `{Spacing System.Padding! Gap! Spacing!.S}` |
| Padding Top / Bottom | `0` |
| Item Spacing | `10` |
| Primary Axis Align | `CENTER` |
| Counter Axis Align | `CENTER` |

---

## Component Properties

| Property | Type | Options |
|----------|------|---------|
| `State` | Variant | `Default` · `Hover` · `Disabled` · `Tap` |
| `Primary` | Variant | `Yes` · `No` |
| `Text#846:0` | Text | Button label string (default: `"CTA Button"`) |
| `Icon#832:22` | Boolean | `true` = show icon · `false` = hide |
| `x#846:0` | Text | Button label (default: `"CTA Button"`) |

---

## Content Types

| Type | Icon | Text | Width |
|------|------|------|-------|
| Icon + Label | ✅ | ✅ | `124` |
| Icon + Label (compact) | ✅ | ✅ | `116` |
| Label only | ❌ | ✅ | `98` |
| Icon only | ✅ | ❌ | `32` |

---

## Primary = Yes (Filled Button)

| State | Fill | Text / Icon Color |
|-------|------|-------------------|
| Default | `#2C66DD` | `#FFFFFF` |
| Hover | `#1B49A6` | `#FFFFFF` |
| Tap | `#4276E0` | `#FFFFFF` |
| Disabled | `#80A3EB` | `#FFFFFF` |

### Node IDs — Primary = Yes

| State | Icon + Label (124) | Icon + Label (116) | Label only (98) | Icon only (32) |
|-------|--------------------|--------------------|-----------------|----------------|
| Default | `2609:3335` | `2609:3337` | `2609:3336` | `3992:3439` |
| Hover | `2609:3338` | `2609:3340` | `2609:3339` | `3992:3440` |
| Disabled | `2609:3341` | `2609:3343` | `2609:3342` | `3992:3441` |
| Tap | `2609:3344` | `2609:3346` | `2609:3345` | `3992:3442` |

---

## Primary = No (Secondary / Ghost Button)

| State | Fill | Stroke | Text / Icon Color |
|-------|------|--------|-------------------|
| Default | `#FFFFFF` | `#C6CED9` | `#0C0E11` |
| Hover | `#DFE4EB` | `#C6CED9` | `#0C0E11` |
| Tap | `#D2D9E2` | `#C6CED9` | `#0C0E11` |
| Disabled | `#F5F7F9` | `#D2D9E2` | `#93A2B6` |

### Node IDs — Primary = No

| State | Icon + Label (124) | Icon + Label (116) | Label only (98) | Icon only (32) |
|-------|--------------------|--------------------|-----------------|----------------|
| Default | `2609:3347` | `2609:3349` | `2609:3348` | `3992:3399` |
| Hover | `2609:3350` | `2609:3352` | `2609:3351` | `3992:3400` |
| Disabled | `2609:3353` | `2609:3355` | `2609:3354` | `3992:3401` |
| Tap | `2609:3356` | `2609:3358` | `2609:3357` | `3992:3402` |

---

## Full State × Variant Color Matrix

| State | Primary=Yes Fill | Primary=No Fill | Primary=No Stroke |
|-------|-----------------|-----------------|-------------------|
| Default | `#2C66DD` | `#FFFFFF` | `#C6CED9` |
| Hover | `#1B49A6` | `#DFE4EB` | `#C6CED9` |
| Tap | `#4276E0` | `#D2D9E2` | `#C6CED9` |
| Disabled | `#80A3EB` | `#F5F7F9` | `#D2D9E2` |

---

## Icon Child

| Property | Value |
|----------|-------|
| Size | `16 × 16` |
| Position | `x: 12, y: 8` |
| Stroke color | `#FFFFFF` (Primary=Yes) · `#0C0E11` (Primary=No) |
| Stroke weight | `1` |
| Corner radius | `1` |
| Main Component | `Icon/Upload` → `280:32` |

---

## Label Text

| Property | Value |
|----------|-------|
| Default text | `"CTA Button"` |
| Font | `Zoho Puvi Regular` |
| Size | `14px` |
| Color | `#FFFFFF` (Primary=Yes) · `#0C0E11` (Primary=No) |
| Align | `LEFT` |
| Frame size | `74 × 20` |

---

## Library Component Keys

> **How to use:** Always instantiate from the design system library using `figma_instantiate_component` with the **variant key** (not the component set key). Never build buttons from scratch.

**Component Set:** `Button` · Node `2608:4683` · Set Key `473d7bb16eaec790af1d2af4403a0737572373bb`

| State | Primary | Variant Key | Node ID |
|-------|---------|-------------|---------|
| `Default` | `Yes` | `6d5926d43be8374d4fbeedc38146979ca6c6d14b` | `2608:4684` |
| `Hover` | `Yes` | `ef8ba5c795781664938532396173bbacf03b6c1c` | `2608:4687` |
| `Disabled` | `Yes` | `83b02e74e0d9685de35fca884a4acebf9a8e6cef` | `2608:4690` |
| `Tap` | `Yes` | `47b8423b3307a2a7173d39143fb326ea2daeb61f` | `2608:4693` |
| `Default` | `No` | `1f752f95a6cace3a8601886da672412f32d3f2b3` | `2608:4696` |
| `Hover` | `No` | `b520c6b0f47264d52894c7a67ea362da459f3717` | `2608:4699` |
| `Disabled` | `No` | `a505655e993ef47ab72bb55c68138121566e1422` | `2608:4702` |
| `Tap` | `No` | `e3232a8d6cdffa4b841e915f117095ca22ed3140` | `2608:4705` |

---

## Figma Console MCP — Usage

### 1. Instantiate from the design system library
```js
// Primary filled button — Default state
const instance = await figma_instantiate_component({
  componentKey: "6d5926d43be8374d4fbeedc38146979ca6c6d14b"
});

// Secondary button — Default state
const instanceSecondary = await figma_instantiate_component({
  componentKey: "1f752f95a6cace3a8601886da672412f32d3f2b3"
});
```

### 2. Switch variant after instantiation
```js
instance.setProperties({
  "State": "Hover",
  "Primary": "Yes",
  "Text#846:0": "Save Changes",
  "Icon#832:22": true,
  "Text#3992:0": true
});
```

### 3. Label-only button
```js
instance.setProperties({
  "Icon#832:22": false,
  "Text#3992:0": true
});
```

### 4. Icon-only button
```js
instance.setProperties({
  "Icon#832:22": true,
  "Text#3992:0": false
});
```

### 5. Quick variant key lookup
```
Primary=Yes, Default   → 6d5926d43be8374d4fbeedc38146979ca6c6d14b
Primary=Yes, Hover     → ef8ba5c795781664938532396173bbacf03b6c1c
Primary=Yes, Disabled  → 83b02e74e0d9685de35fca884a4acebf9a8e6cef
Primary=Yes, Tap       → 47b8423b3307a2a7173d39143fb326ea2daeb61f

Primary=No, Default    → 1f752f95a6cace3a8601886da672412f32d3f2b3
Primary=No, Hover      → b520c6b0f47264d52894c7a67ea362da459f3717
Primary=No, Disabled   → a505655e993ef47ab72bb55c68138121566e1422
Primary=No, Tap        → e3232a8d6cdffa4b841e915f117095ca22ed3140
```

---

## Token Reference

| Token | Hex | Used For |
|-------|-----|----------|
| `Accent Colors.Blue.Accent Color` | `#2C66DD` | Primary=Yes · Default fill |
| `Accent Colors.Blue.Accent Hover state Light` | `#1B49A6` | Primary=Yes · Hover fill |
| `Accent Colors.Blue.Tap state` | `#4276E0` | Primary=Yes · Tap fill |
| `Accent Colors.Blue.Disabled Light` | `#80A3EB` | Primary=Yes · Disabled fill |
| `Color.Base.White` | `#FFFFFF` | Primary=Yes · fill / all text+icon |
| `Neutral.Tint.Neutral 90` | `#DFE4EB` | Primary=No · Hover fill |
| `Neutral.Tint.Neutral 80` | `#D2D9E2` | Primary=No · Tap fill / Disabled stroke |
| `Neutral.Tint.Neutral 100` | `#F5F7F9` | Primary=No · Disabled fill |
| `Neutral.Tint.Neutral 70` | `#C6CED9` | Primary=No · Default/Hover/Tap stroke |
| `Neutral.Shades.Neutral 95` | `#0C0E11` | Primary=No · text + icon color |
| `Neutral.Tint.Neutral 30` | `#93A2B6` | Primary=No · Disabled text color |
| `Spacing System.Radius.M` | `8` | Corner radius |
| `Spacing System.Padding.S` | `12` | Horizontal padding |

---

## ⚠️ HARD RULE — Token Usage (No Exceptions)

> **Every color applied in Figma MUST be bound to a Figma library variable via `figma.variables.setBoundVariableForPaint()`.  
> Hardcoded hex values (e.g. `#2C66DD`), raw `{r,g,b}` objects, or magic numbers are NEVER acceptable in component plugin code.**

Correct pattern — bind fills/strokes to library variables:
```js
// 1. Retrieve the library variable by its known ID
const varObj = await figma.variables.getVariableByIdAsync('VariableID:577:38');

// 2. Create a bound paint (the variable provides the actual color value)
const paint = figma.variables.setBoundVariableForPaint(
  { type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, // base paint (color overridden by variable)
  'color',
  varObj
);

// 3. Apply to any node
node.fills = [paint];
```

### Figma Variable Bindings

| Role | Hex | Variable Name | Variable ID |
|------|-----|---------------|-------------|
| Primary fill (default) | `#2C66DD` | `ZA/Button/Button Fill/Button Primary` | `VariableID:577:38` |
| White text / icon | `#FFFFFF` | `Color/Base/White` | `VariableID:189:170` |
| Primary disabled fill | `#80A3EB` | `Color/Accent Colors/Blue/Tints/Blue 50` | `VariableID:391:117` |
| Secondary stroke | `#C6CED9` | `Color/Neutral/Tint/Neutral 70` | `VariableID:572:3690` |
| Secondary hover fill | `#DFE4EB` | `ZA/stroke/Stroke 1` | `VariableID:579:41` |
| Secondary disabled fill | `#F5F7F9` | `ZA/Background/BG-Primary-Subtle` | `VariableID:575:275` |
| Disabled text | `#93A2B6` | `Color/Neutral/Tint/Neutral 30` | `VariableID:572:3686` |
| Primary text | `#0C0E11` | `ZA/Text/Text Primary` | `VariableID:575:276` |
