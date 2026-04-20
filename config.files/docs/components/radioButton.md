# Radio Button Component — Zoho Analytics Design System

> **File:** `components/radio-button-config.json`
> **Figma Source:** [Design System – Zoho Analytics](https://www.figma.com/design/m2iOWX3I9aDI5kgyw4wCo0/Design-System--Zoho-Analytics)
> **Total Nodes:** `4`

---

## Component Selection & Pick — Hard Rules

### 0. ⛔ Search the library BEFORE creating this component

```js
figma_get_library_components({ libraryFileKey: "m2iOWX3I9aDI5kgyw4wCo0", query: "Radio" })
// Local fallback:
const existing = await page.findOne(n => (n.type === 'COMPONENT_SET' || n.type === 'COMPONENT') && n.name.toLowerCase().includes('radio'));
if (existing) { const inst = existing.type === 'COMPONENT_SET' ? existing.children[0].createInstance() : existing.createInstance(); }
```

---

### 1. How to export this component (Token Exporter Plugin)
| Step | Action |
|------|--------|
| 1 | Open **Figma Design System** file → select the Radio Button component or instance |
| 2 | Run **Token & Component Exporter** plugin → go to **Selection** tab |
| 3 | Click **↓ Download** — saves as `radio-button-config.json` |
| 4 | Place file in `config.files/tokens/components/` |

### 2. How to read the exported JSON
| JSON Field | What it means | How to use it |
|------------|---------------|---------------|
| `nodes[].id` | Node ID inside the *Design System* file | Reference only — do NOT use with `getNodeByIdAsync` in your working file |
| `nodes[].componentPropertyValues` | Current values for `On`, `Enable`, `Text` | Read to know what properties exist |
| `nodes[].children[0].fills` | Radio circle fill (selected state) | Reference only |
| `nodes[].children[0].strokes` | Radio circle stroke (unselected state) | Reference only |
| `nodes[].children[1].fills` | Label text color | Reference only |
| `statesAndOptions.componentSets[].variantAxes` | All variant dimensions: `On`, `Enable` | Use to validate which combinations are valid |

### 3. Component pick rules — MUST follow
| Rule | ✅ Do | ❌ Never |
|------|-------|---------|
| **Source** | Always instantiate from the **Design System library** | Never build with `figma.createFrame()` + ellipse |
| **Key type** | Use a **variant key** (40-char hex string) | Never use component set key or node ID to instantiate |
| **Two variants** | Row with label (`Radio Button options`) vs standalone circle (`Radio Button`) | Pick the right component set for the context |
| **Color** | Let the component carry its own fills and strokes | Never overwrite radio circle colors after instantiation |
| **Label** | Set `"Text#2399:0"` property for the label string | Never edit the text child node directly |
| **From scratch** | Only if component unavailable in the library | Must exactly match token values in the JSON |

### 4. Correct instantiation pattern
```js
// Row with label — Selected + Enabled
const instance = await figma_instantiate_component({
  componentKey: "1de98209ee51df75f39ca825201019a9a10edc10"
});
instance.setProperties({
  "On":          "ON",
  "Enable":      "On",
  "Text#2399:0": "Choose this option"
});

// Standalone radio circle — Selected + Enabled
const circle = await figma_instantiate_component({
  componentKey: "b7ebf91a30f1945747d62115df31d7999b11f733"
});
circle.setProperties({ "On/off": "On", "Enable": "Yes" });
```

### 5. Property types cheat sheet
| Component | Property | Type | Valid values |
|-----------|----------|------|-------------|
| Row (options) | `On` | `VARIANT` | `"ON"` · `"OFF"` |
| Row (options) | `Enable` | `VARIANT` | `"On"` · `"Off"` |
| Row (options) | `Text#2399:0` | `TEXT` | Any label string |
| Circle only | `On/off` | `VARIANT` | `"On"` · `"Off"` |
| Circle only | `Enable` | `VARIANT` | `"Yes"` · `"No"` |

---

## Style Hard Rules

| Rule | Detail |
|------|--------|
| **Size** | Never hardcode — always read from JSON (`210 × 20` row · `12 × 12` circle) |
| **Corner radius** | Circle always `8` — creates perfect circle |
| **Colors** | Reference only from `radio-button-config.json` — the real instance carries them |
| **Font** | `Zoho Puvi Regular`, `14px` |
| **Label text** | Always set via `Text#2399:0` property — never edit child node |

---

## Component Anatomy

```
Radio Button Row (210 × 20):
◉  [  Label text (14px · 194 × 20)  ]
│
└─ Radio circle: 12 × 12, cornerRadius 8
   Selected:   fill + stroke = #2C66DD
   Unselected: no fill, stroke only
```

---

## Component Properties

| Property | Type | Values |
|----------|------|--------|
| `On` | Variant | `ON` (selected) · `OFF` (unselected) |
| `Enable` | Variant | `On` (enabled) · `Off` (disabled) |
| `Text#2399:0` | Text | Label string (customizable) |

---

## State Color Reference

### Radio Circle (12 × 12, cornerRadius 8)

| On | Enable | Fill | Stroke | Description |
|----|--------|------|--------|-------------|
| `ON` | `On` | `#2C66DD` | `#2C66DD` | Selected · enabled |
| `OFF` | `On` | — (transparent) | `#3D4653` | Unselected · enabled |
| `ON` | `Off` | `#2C66DD` | `#2C66DD` | Selected · disabled |
| `OFF` | `Off` | — (transparent) | `#C6C9D5` | Unselected · disabled |

### Label Text (194 × 20)

| Enable | Label Color | Token |
|--------|-------------|-------|
| `On` | `#FFFFFF` | `Token: Colors > Dark > Text > Text Primary` |
| `Off` | `#556274` | `Neutral.Shades.Neutral 50` (disabled) |

---

## Full Variant × State Node ID Matrix

| On | Enable | Node ID | Radio Fill | Radio Stroke | Label Color |
|----|--------|---------|------------|--------------|-------------|
| `ON` | `On` | `2609:4555` | `#2C66DD` | `#2C66DD` | `#FFFFFF` |
| `OFF` | `On` | `2609:4556` | — | `#3D4653` | `#FFFFFF` |
| `ON` | `Off` | `2609:4557` | `#2C66DD` | `#2C66DD` | `#556274` |
| `OFF` | `Off` | `2609:4558` | — | `#C6C9D5` | `#556274` |

---

## Layout Spec (from JSON)

### Row Container
| Property | Value |
|----------|-------|
| Width | `210` |
| Height | `20` *(read from JSON — never hardcode)* |
| Direction | `HORIZONTAL` |
| Item Spacing | `4` |
| Counter Axis Align | `CENTER` |

### Radio Circle
| Property | Value |
|----------|-------|
| Width | `12` |
| Height | `12` *(read from JSON)* |
| Corner Radius | `8` (makes 12×12 frame fully circular) |
| Stroke Weight | `1` |
| Selected Fill | `#2C66DD` |
| Selected Stroke | `#2C66DD` |
| Unselected Fill | — (transparent) |
| Unselected Enabled Stroke | `#3D4653` |
| Unselected Disabled Stroke | `#C6C9D5` |

### Label Text
| Property | Value |
|----------|-------|
| Width | `194` |
| Height | `20` |
| Font | `Zoho Puvi Regular` |
| Size | `14px` |
| Color Enabled | `#FFFFFF` |
| Color Disabled | `#556274` |

---

## When to Use Each State

| Situation | On | Enable | Node ID |
|-----------|----|--------|---------|
| Option is selected by user | `ON` | `On` | `2609:4555` |
| Option is not selected | `OFF` | `On` | `2609:4556` |
| Option is pre-selected and locked | `ON` | `Off` | `2609:4557` |
| Option is unavailable | `OFF` | `Off` | `2609:4558` |

---

## Library Component Keys

> **How to use:** Always instantiate from the design system library using `figma_instantiate_component` with the **variant key**. Never build radio buttons from scratch.

**Component Set:** `Radio Button options` · Node `2608:6587` · Set Key `1a1febfe50bad7bc85bae81b0a4e83c41acdd583`

| On | Enable | Variant Key | Node ID |
|----|--------|-------------|---------|
| `ON` | `On` | `1de98209ee51df75f39ca825201019a9a10edc10` | `2608:6588` |
| `OFF` | `On` | `c15fe678ad0a935e8a1faee5e130125aedecbce2` | `2608:6591` |
| `ON` | `Off` | `c7279ba40f4a1269a708f9d5b3371c4b7f84ab47` | `2608:6594` |
| `OFF` | `Off` | `528bd8ea2d80369d87c4cfefea5d6853201c3def` | `2608:6597` |

> Also available — standalone radio circle only:
> **Component Set:** `Radio Button` · Node `2608:6600` · Set Key `1a85379e9bacd33fee5b614ee09b0a96e3e64cef`

| On/off | Enable | Variant Key | Node ID |
|--------|--------|-------------|---------|
| `On` | `Yes` | `b7ebf91a30f1945747d62115df31d7999b11f733` | `2608:6601` |
| `On` | `No` | `3916d2587aeb524ccaf46bce8b100d7987bd89ea` | `2608:6603` |
| `Off` | `Yes` | `4ad1c3bda94608522a48aed21833c388c24f353d` | `2608:6605` |
| `Off` | `No` | `cd7b36cdf8e12c5c8032559fb8eaf7ce99aa4480` | `2608:6607` |

---

## Figma Console MCP — Usage

### 1. Instantiate from the design system library
```js
// Selected + Enabled (radio row with label)
const instance = await figma_instantiate_component({
  componentKey: "1de98209ee51df75f39ca825201019a9a10edc10"
});

// Unselected + Enabled (radio row with label)
const instanceOff = await figma_instantiate_component({
  componentKey: "c15fe678ad0a935e8a1faee5e130125aedecbce2"
});
```

### 2. Switch variant after instantiation
```js
instance.setProperties({
  "On": "ON",
  "Enable": "On",
  "Text#2399:0": "Choose this option"
});
```

### 3. Quick variant key lookup
```
Radio Row — ON  + Enabled   → 1de98209ee51df75f39ca825201019a9a10edc10
Radio Row — OFF + Enabled   → c15fe678ad0a935e8a1faee5e130125aedecbce2
Radio Row — ON  + Disabled  → c7279ba40f4a1269a708f9d5b3371c4b7f84ab47
Radio Row — OFF + Disabled  → 528bd8ea2d80369d87c4cfefea5d6853201c3def

Radio Circle — On  + Yes    → b7ebf91a30f1945747d62115df31d7999b11f733
Radio Circle — On  + No     → 3916d2587aeb524ccaf46bce8b100d7987bd89ea
Radio Circle — Off + Yes    → 4ad1c3bda94608522a48aed21833c388c24f353d
Radio Circle — Off + No     → cd7b36cdf8e12c5c8032559fb8eaf7ce99aa4480
```

---

## Token Reference

| Token | Hex | Used For |
|-------|-----|----------|
| `Accent Colors.Blue.Accent Color` | `#2C66DD` | Selected circle fill & stroke |
| `Token: Colors > Dark > Stroke > Stroke 1` | `#3D4653` | Unselected + enabled circle stroke |
| `Neutral.Shades.Neutral 30` | `#C6C9D5` | Unselected + disabled circle stroke |
| `Token: Colors > Dark > Text > Text Primary` | `#FFFFFF` | Enabled label color |
| `Neutral.Shades.Neutral 50` | `#556274` | Disabled label color |

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
| Selected circle fill & stroke | `#2C66DD` | `ZA/Button/Button Fill/Button Primary` | `VariableID:577:38` |
| Unselected + enabled stroke | `#556274` | `Color/Neutral/Shades/Neutral 40` | `VariableID:572:3675` |
| Unselected + disabled stroke | `#C6CED9` | `Color/Neutral/Tint/Neutral 70` | `VariableID:572:3690` |
| Enabled label | `#FFFFFF` | `Color/Base/White` | `VariableID:189:170` |
| Disabled label | `#556274` | `Color/Neutral/Shades/Neutral 40` | `VariableID:572:3675` |
