# Toggle Button Component — Zoho Analytics Design System

> **File:** `components/toggle-button-config.json`
> **Figma Source:** [Design System – Zoho Analytics](https://www.figma.com/design/m2iOWX3I9aDI5kgyw4wCo0/Design-System--Zoho-Analytics)
> **Total Nodes:** `8`

---

## Component Selection & Pick — Hard Rules

### 0. ⛔ Search the library BEFORE creating this component

```js
figma_get_library_components({ libraryFileKey: "m2iOWX3I9aDI5kgyw4wCo0", query: "Toggle" })
// Local fallback:
const existing = await page.findOne(n => (n.type === 'COMPONENT_SET' || n.type === 'COMPONENT') && n.name.toLowerCase().includes('toggle'));
if (existing) { const inst = existing.type === 'COMPONENT_SET' ? existing.children[0].createInstance() : existing.createInstance(); }
```

---

### 1. How to export this component (Token Exporter Plugin)
| Step | Action |
|------|--------|
| 1 | Open **Figma Design System** file → select the Toggle Button component or instance |
| 2 | Run **Token & Component Exporter** plugin → go to **Selection** tab |
| 3 | Click **↓ Download** — saves as `toggle-button-config.json` |
| 4 | Place file in `config.files/tokens/components/` |

### 2. How to read the exported JSON
| JSON Field | What it means | How to use it |
|------------|---------------|---------------|
| `nodes[].id` | Node ID inside the *Design System* file | Reference only — do NOT use with `getNodeByIdAsync` in your working file |
| `nodes[].componentPropertyValues` | Current values for `ON`, `Enable`, `Oder`, `Text` | Read to know what properties exist and their types |
| `nodes[].fills[].color` | Toggle pill fill hex per state | Reference only |
| `statesAndOptions.componentSets[].variantAxes` | All variant dimensions: `ON`, `Enable`, `Oder` | Use to validate which combinations are valid |

### 3. Component pick rules — MUST follow
| Rule | ✅ Do | ❌ Never |
|------|-------|---------|
| **Source** | Always instantiate from the **Design System library** | Never build with `figma.createFrame()` + ellipse |
| **Key type** | Use a **variant key** (40-char hex string) | Never use component set key or node ID to instantiate |
| **Color** | Let the component carry its own fills | Never overwrite toggle pill colors after instantiation |
| **Order** | Set `"Oder"` property to control label vs toggle position | Never manually reorder children inside the instance |
| **Label** | Set `"Text#2677:0"` property for the label string | Never edit the text child node directly |
| **From scratch** | Only if component unavailable in the library | Must exactly match token values in the JSON |

### 4. Correct instantiation pattern
```js
// Step 1 — pick the right variant key from Library Component Keys table below
const instance = await figma_instantiate_component({
  componentKey: "9a8b55637d2aa338fe922c48be3beb522c2da356"  // ON+Enabled+Text Button
});

// Step 2 — position and resize to fill container
instance.x = 32;
instance.y = 100;
instance.resize(336, instance.height);  // fill width, keep component height

// Step 3 — set state and label via properties
instance.setProperties({
  "ON":           "ON",
  "Enable":       "ON",
  "Oder":         "Text Button",
  "Text#2677:0":  "Enable notifications"
});
```

### 5. Property types cheat sheet
| Property key pattern | Type | Valid values |
|----------------------|------|-------------|
| `ON` | `VARIANT` | `"ON"` (selected) · `"OFF"` (unselected) |
| `Enable` | `VARIANT` | `"ON"` (enabled) · `"OFF"` (disabled) |
| `Oder` | `VARIANT` | `"Text Button"` (label→toggle) · `"Button Text"` (toggle→label) |
| `Text#2677:0` | `TEXT` | Any label string |

---

## Style Hard Rules

| Rule | Detail |
|------|--------|
| **Height** | Never hardcode — always read from JSON (`20px` for row, `16px` for pill) |
| **Corner radius** | Toggle pill always `40` — full pill shape |
| **Colors** | Reference only from `toggle-button-config.json` — the real instance carries them |
| **Font** | `Zoho Puvi Regular`, `14px` |
| **Knob** | Always white `#FFFFFF`, `12×12` ellipse — managed by the component |

---

## Component Anatomy

```
Order: "Text Button"
┌──────────────────────────────────────┬──────────────────┐
│  Label text (14px)                   │  [  ●  ]  pill   │
└──────────────────────────────────────┴──────────────────┘
  width: 241 (text)                        30 × 16  (toggle)

Order: "Button Text"
┌──────────────────┬──────────────────────────────────────┐
│  [  ●  ]  pill   │  Label text (14px)                   │
└──────────────────┴──────────────────────────────────────┘
```

### Toggle Pill Layout
| Property | Value |
|----------|-------|
| Width | `30` |
| Height | `16` |
| Corner Radius | `40` (pill) |
| Direction | `HORIZONTAL` |
| Padding (all sides) | `2` |
| Item Spacing | `0` |
| Primary Axis Align | `MIN` |
| Counter Axis Align | `CENTER` |

### Knob (Ellipse)
| Property | Value |
|----------|-------|
| Size | `12 × 12` |
| Fill | `#FFFFFF` |
| Shape | `ELLIPSE` |
| Position ON | `x: 14, y: 2` |

### Outer Component Layout
| Property | Value |
|----------|-------|
| Total Width | `275` |
| Total Height | `20` *(read from JSON)* |
| Direction | `HORIZONTAL` |
| Padding | `0` all sides |
| Item Spacing | `{Spacing System.Padding! Gap! Spacing!.XXS}` → `4` |
| Primary Axis Align | `MIN` |
| Counter Axis Align | `CENTER` |

---

## Component Properties

| Property | Type | Options |
|----------|------|---------|
| `ON` | Variant | `ON` · `OFF` — toggle switched on or off |
| `Enable` | Variant | `ON` · `OFF` — enabled or disabled |
| `Oder` | Variant | `Text Button` · `Button Text` — label position |
| `Text#2677:0` | Text | Label text |

---

## State Color Reference

| ON State | Enable | Toggle Fill | Knob | Label Color | Description |
|----------|--------|-------------|------|-------------|-------------|
| `ON` | `ON` | `#2C66DD` | `#FFFFFF` | `#0C0E11` | Active / switched on |
| `OFF` | `ON` | `#A0ADBF` | `#FFFFFF` | `#0C0E11` | Inactive / switched off |
| `ON` | `OFF` | `#80A3EB` | `#FFFFFF` | `#93A2B6` | Disabled — on |
| `OFF` | `OFF` | `#C6CED9` | `#FFFFFF` | `#93A2B6` | Disabled — off |

---

## Full Variant × State Node ID Matrix

### Order: Text Button (label → toggle)

| ON State | Enable | Node ID | Toggle Fill |
|----------|--------|---------|-------------|
| `ON` | `ON` | `2609:3459` | `#2C66DD` |
| `OFF` | `ON` | `2609:3460` | `#A0ADBF` |
| `ON` | `OFF` | `2609:3461` | `#80A3EB` |
| `OFF` | `OFF` | `2609:3462` | `#C6CED9` |

### Order: Button Text (toggle → label)

| ON State | Enable | Node ID | Toggle Fill |
|----------|--------|---------|-------------|
| `ON` | `ON` | `2609:3463` | `#2C66DD` |
| `OFF` | `ON` | `2609:3464` | `#A0ADBF` |
| `ON` | `OFF` | `2609:3465` | `#80A3EB` |
| `OFF` | `OFF` | `2609:3466` | `#C6CED9` |

---

## When to Use Each State

| Situation | ON | Enable | Use Node |
|-----------|----|--------|----------|
| Feature is active | `ON` | `ON` | `2609:3459` / `2609:3463` |
| Feature is inactive | `OFF` | `ON` | `2609:3460` / `2609:3464` |
| Feature is locked — currently active | `ON` | `OFF` | `2609:3461` / `2609:3465` |
| Feature is locked — currently inactive | `OFF` | `OFF` | `2609:3462` / `2609:3466` |

---

## Library Component Keys

> **How to use:** Always instantiate from the design system library using `figma_instantiate_component` with the **variant key**. Never build toggles from scratch.

**Component Set:** `Toggle Button` · Node `2608:5626` · Set Key `67e0764bb4dc2542a3f9b4ce402aec59353d4baa`

| ON | Enable | Order | Variant Key | Node ID |
|----|--------|-------|-------------|---------|
| `ON` | `ON` | Text Button | `9a8b55637d2aa338fe922c48be3beb522c2da356` | `2608:5627` |
| `OFF` | `ON` | Text Button | `32b3f9729bebfa0abebcf9a8c1553ab1561e1e93` | `2608:5630` |
| `ON` | `OFF` | Text Button | `d0b5401ef18e3f75718dc9a9be7989349638ec6a` | `2608:5633` |
| `OFF` | `OFF` | Text Button | `328e6af4d8ebf73c1aa0297737cb20bc8ab5fab7` | `2608:5636` |
| `ON` | `ON` | Button Text | `432bc9d382c0f08cd46c3f81dbbe663cb6fb2d2a` | `2608:5639` |
| `OFF` | `ON` | Button Text | `0c8bd7583200a11718405785d71df2a9c5cecb4e` | `2608:5642` |
| `ON` | `OFF` | Button Text | `f43cca52df4c6ad8cbe5168ce19250ecaeb93332` | `2608:5645` |
| `OFF` | `OFF` | Button Text | `ea3afca5e7694180b577c58e0ca11b7d15fc210f` | `2608:5648` |

---

## Figma Console MCP — Usage

### 1. Instantiate from the design system library
```js
// ON + Enabled + Text Button (most common default)
const instance = await figma_instantiate_component({
  componentKey: "9a8b55637d2aa338fe922c48be3beb522c2da356"
});

// OFF + Enabled + Text Button
const instanceOff = await figma_instantiate_component({
  componentKey: "32b3f9729bebfa0abebcf9a8c1553ab1561e1e93"
});
```

### 2. Switch variant after instantiation
```js
instance.setProperties({
  "ON": "ON",
  "Enable": "ON",
  "Oder": "Text Button",
  "Text#2677:0": "Enable dark mode"
});
```

### 3. Quick variant key lookup
```
ON  + Enabled  + Text Button   → 9a8b55637d2aa338fe922c48be3beb522c2da356
OFF + Enabled  + Text Button   → 32b3f9729bebfa0abebcf9a8c1553ab1561e1e93
ON  + Disabled + Text Button   → d0b5401ef18e3f75718dc9a9be7989349638ec6a
OFF + Disabled + Text Button   → 328e6af4d8ebf73c1aa0297737cb20bc8ab5fab7

ON  + Enabled  + Button Text   → 432bc9d382c0f08cd46c3f81dbbe663cb6fb2d2a
OFF + Enabled  + Button Text   → 0c8bd7583200a11718405785d71df2a9c5cecb4e
ON  + Disabled + Button Text   → f43cca52df4c6ad8cbe5168ce19250ecaeb93332
OFF + Disabled + Button Text   → ea3afca5e7694180b577c58e0ca11b7d15fc210f
```

---

## Token Reference

| Token | Hex | Used For |
|-------|-----|----------|
| `Accent Colors.Blue.Accent Color` | `#2C66DD` | Toggle fill — ON + Enabled |
| `Token Colors.Light.Button Fill.ON OFF` | `#A0ADBF` | Toggle fill — OFF + Enabled |
| `Accent Colors.Blue.Disabled Light` | `#80A3EB` | Toggle fill — ON + Disabled |
| `Token Colors.Light.Button Fill.ON OFF Disabled` | `#C6CED9` | Toggle fill — OFF + Disabled |
| `Color.Base.White` | `#FFFFFF` | Knob fill (all states) |
| `Token Colors.Light.Text.Text Primary` | `#0C0E11` | Label — Enabled |
| `Token Colors.Light.Text.Text Disabled` | `#93A2B6` | Label — Disabled |
| `Spacing System.Padding.XXS` | `4` | Item spacing between label and toggle |

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
| Toggle ON + Enabled fill | `#2C66DD` | `ZA/Button/Button Fill/Button Primary` | `VariableID:577:38` |
| Toggle OFF + Enabled fill | `#A0ADBF` | `Color/Neutral/Tint/Neutral 40` | `VariableID:572:3687` |
| Toggle ON + Disabled fill | `#80A3EB` | `Color/Accent Colors/Blue/Tints/Blue 50` | `VariableID:391:117` |
| Toggle OFF + Disabled fill | `#C6CED9` | `Color/Neutral/Tint/Neutral 70` | `VariableID:572:3690` |
| Knob fill (all states) | `#FFFFFF` | `Color/Base/White` | `VariableID:189:170` |
| Label enabled | `#0C0E11` | `ZA/Text/Text Primary` | `VariableID:575:276` |
| Label disabled | `#93A2B6` | `Color/Neutral/Tint/Neutral 30` | `VariableID:572:3686` |
