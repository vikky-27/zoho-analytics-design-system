# Input Component — Zoho Analytics Design System

> **Figma Source:** [Design System – Zoho Analytics](https://www.figma.com/design/m2iOWX3I9aDI5kgyw4wCo0/Design-System--Zoho-Analytics?node-id=2603-4167)
> **Component Set ID:** `826:345`
> **Parent Frame (all inputs):** `2603:4167`

---

## Component Selection & Pick — Hard Rules

### 0. ⛔ Search the library BEFORE creating this component

```js
figma_get_library_components({ libraryFileKey: "m2iOWX3I9aDI5kgyw4wCo0", query: "Input" })
// Local fallback:
const existing = await page.findOne(n => (n.type === 'COMPONENT_SET' || n.type === 'COMPONENT') && n.name.toLowerCase().includes('input'));
if (existing) { const inst = existing.type === 'COMPONENT_SET' ? existing.children[0].createInstance() : existing.createInstance(); }
```

---

### 1. How to export this component (Token Exporter Plugin)
| Step | Action |
|------|--------|
| 1 | Open **Figma Design System** file → select the Input component or instance |
| 2 | Run **Token & Component Exporter** plugin → go to **Selection** tab |
| 3 | Click **↓ Download** — saves as `inputComponents.json` |
| 4 | Place file in `config.files/tokens/components/` |

### 2. How to read the exported JSON
| JSON Field | What it means | How to use it |
|------------|---------------|---------------|
| `nodes[].id` | Node ID inside the *Design System* file | Reference only — do NOT use with `getNodeByIdAsync` in your working file |
| `nodes[].componentPropertyValues` | Current values for `States`, `Show Right Option`, `Right Options`, `Input Text`, `Error Text` | Read to know what properties exist and their types |
| `nodes[].fills[].color` | Hex or token ref e.g. `{Color.Base.White}` | Reference only — never copy to build from scratch |
| `nodes[].strokes[].color` | Stroke hex per state | Reference only |
| `statesAndOptions.componentSets[].variantAxes` | All variant dimensions: `States`, `Show Right Option`, `Right Options` | Use to validate which combinations are valid |
| `statesAndOptions.instances[].allVariantOptions` | Full variant map for an instance | Use to validate `setProperties` calls |

### 3. Component pick rules — MUST follow
| Rule | ✅ Do | ❌ Never |
|------|-------|---------|
| **Source** | Always instantiate from the **Design System library** | Never build with `figma.createFrame()` |
| **Key type** | Use a **variant key** (40-char hex string) | Never use component set key or node ID to instantiate |
| **Color** | Let the component carry its own fills and strokes | Never overwrite fills/strokes after instantiation |
| **Size** | Read `width`/`height` from JSON for reference only | Never hardcode `32` — resize to fill container with `inst.resize(w, inst.height)` |
| **Properties** | Set via `setProperties({ "States": "Error" })` | Never edit child text nodes directly on an instance |
| **Error text** | Set `"Error Text#831:0"` property for error messages | Never add a separate text node below the input |
| **From scratch** | Only if component unavailable in the library | Must exactly match every token value in the JSON |

### 4. Correct instantiation pattern
```js
// Step 1 — pick the right variant key from Library Component Keys table below
const instance = await figma_instantiate_component({
  componentKey: "8fd07348a67bc5a1124009fed9fe74358033ea67"  // Default, no right option
});

// Step 2 — position and resize to fill container
instance.x = 32;
instance.y = 100;
instance.resize(336, instance.height); // fill width, keep component height

// Step 3 — set state / content via properties (never edit child nodes directly)
instance.setProperties({
  "States":             "Error",
  "Show Right Option":  "Yes",
  "Right Options":      "Icon search",
  "Input Text#807:10":  "invalid@email",
  "Error Text#831:0":   "Invalid email address",
  "Text#807:5":         true
});
```

### 5. Property types cheat sheet
| Property key pattern | Type | Valid values |
|----------------------|------|-------------|
| `States` | `VARIANT` | `"Default"` · `"Hover"` · `"Error"` · `"Disabled"` |
| `Show Right Option` | `VARIANT` | `"Yes"` · `"NO"` |
| `Right Options` | `VARIANT` | `"Arrow"` · `"Copy"` · `"Up Down Arrow"` · `"Line Arrow"` · `"Icon search"` |
| `Input Text#807:10` | `TEXT` | Any placeholder/value string |
| `Error Text#831:0` | `TEXT` | Error message string |
| `Text#807:5` | `BOOLEAN` | `true` (show text) · `false` (hide) |

---

## Style Hard Rules

| Rule | Detail |
|------|--------|
| **Height** | Never set manually — always read from JSON (`32px`) |
| **Colors** | Reference only from `inputComponents.json` — the real instance carries them |
| **Corner radius** | Always `{Spacing System.Radius.M}` → `8px` |
| **Font** | `Zoho Puvi Regular` — `14px` for input text, `12px` for error text |
| **Node IDs** | Reference only — never use `getNodeByIdAsync` across files |

---

## Component Anatomy

```
┌──────────────────────────────────────────────────────┐  h: 32  radius: 8
│  paddingLeft:0  [  Text area (padL:8)  ]  [Right]    │  paddingRight: 1
└──────────────────────────────────────────────────────┘  itemSpacing: 8
  Error message (12px · #CC3929 · y:33)                   ← Error state only
```

---

## State Color Reference

| State    | Fill      | Stroke    | Shadow                          | Text Color | Placeholder |
|----------|-----------|-----------|---------------------------------|------------|-------------|
| Default  | `#FFFFFF` | `#C6CED9` | None                            | `#0C0E11`  | `#93A2B6`   |
| Hover    | `#FFFFFF` | `#2C66DD` | `#00000014` offset(0,2) r:24   | `#0C0E11`  | `#93A2B6`   |
| Error    | `#FFFFFF` | `#CC3929` | None                            | `#0C0E11`  | `#93A2B6`   |
| Disabled | `#F5F7F9` | `#C6CED9` | None                            | `#93A2B6`  | `#93A2B6`   |

---

## Full Variant × State Node ID Matrix

> Use these node IDs to instantiate the exact component variant via Figma Console MCP.

### Variant: Default (No Right Option)

| State    | Text Visible | Node ID     | Fill      | Stroke    |
|----------|-------------|-------------|-----------|-----------|
| Default  | ✅ Yes       | `2603:4205` | —         | `#C6CED9` |
| Default  | ❌ No        | `2603:4208` | —         | `#C6CED9` |
| Default  | ❌ No        | `2603:4209` | —         | `#C6CED9` |
| Hover    | ✅ Yes       | `2603:4206` | —         | `#2C66DD` |
| Hover    | ❌ No        | `2603:4210` | —         | `#2C66DD` |
| Error    | ✅ Yes       | `2603:4207` | —         | `#CC3929` |
| Error    | ❌ No        | `2603:4211` | —         | `#CC3929` |

---

### Variant: Arrow

| State    | Show Right | Node ID     | Fill      | Stroke    |
|----------|-----------|-------------|-----------|-----------|
| Default  | Yes        | `2603:4192` | `#FFFFFF` | `#C6CED9` |
| Default  | Yes        | `2603:4214` | `#FFFFFF` | `#C6CED9` |
| Error    | Yes        | `2603:4216` | `#FFFFFF` | `#CC3929` |
| Disabled | Yes        | `2603:4217` | `#F5F7F9` | `#C6CED9` |
| Disabled | NO (text ✅) | `2603:4183` | `#F5F7F9` | `#C6CED9` |
| Disabled | NO (text ❌) | `2603:4184` | `#F5F7F9` | `#D2D9E2` |

---

### Variant: Copy

| State    | Node ID     | Fill      | Stroke    | Copy Button Fill | Divider Color |
|----------|-------------|-----------|-----------|------------------|---------------|
| Default  | `2603:4189` | `#FFFFFF` | `#C6CED9` | `#2C66DD`        | `#C6CED9`     |
| Hover    | `2603:4190` | `#FFFFFF` | `#2C66DD` | `#2C66DD`        | `#2C66DD`     |
| Error    | `2603:4191` | `#FFFFFF` | `#CC3929` | `#2C66DD`        | `#CC3929`     |
| Disabled | `2603:4196` | `#F5F7F9` | `#C6CED9` | `#2C66DD`        | `#C6CED9`     |

> Copy button text: `#FFFFFF`, font: `Zoho Puvi Regular 14px`, corner radius: `topRight:7 bottomRight:7`

---

### Variant: Up Down Arrow

| State    | Node ID     | Fill      | Stroke    |
|----------|-------------|-----------|-----------|
| Default  | `2603:4197` | `#FFFFFF` | `#C6CED9` |
| Hover    | `2603:4193` | `#FFFFFF` | `#2C66DD` |
| Hover    | `2603:4198` | `#FFFFFF` | `#2C66DD` |
| Error    | `2603:4194` | `#FFFFFF` | `#CC3929` |
| Error    | `2603:4199` | `#FFFFFF` | `#CC3929` |
| Disabled | `2603:4195` | `#F5F7F9` | `#C6CED9` |
| Disabled | `2603:4200` | `#F5F7F9` | `#C6CED9` |

---

### Variant: Line Arrow

| State    | Node ID     | Fill      | Stroke    |
|----------|-------------|-----------|-----------|
| Default  | `2603:4201` | `#FFFFFF` | `#C6CED9` |
| Hover    | `2603:4202` | `#FFFFFF` | `#2C66DD` |
| Error    | `2603:4203` | `#FFFFFF` | `#CC3929` |
| Disabled | `2603:4204` | `#F5F7F9` | `#C6CED9` |

---

### Variant: Icon Search

| State    | Node ID     | Fill      | Stroke    | Icon Color |
|----------|-------------|-----------|-----------|------------|
| Default  | `2603:4185` | `#FFFFFF` | `#C6CED9` | `#0C0E11`  |
| Hover    | `2603:4186` | `#FFFFFF` | `#2C66DD` | `#0C0E11`  |
| Error    | `2603:4187` | `#FFFFFF` | `#CC3929` | `#0C0E11`  |
| Disabled | `2603:4188` | `#F5F7F9` | `#C6CED9` | `#93A2B6`  |

---

## Error State — Extra Detail

When `States = "Error"`, a text node appears **below** the input box:

| Property   | Value                 |
|------------|-----------------------|
| Y position | `33` (1px below box)  |
| Height     | `16`                  |
| Font       | `Zoho Puvi Regular`   |
| Font size  | `12px`                |
| Color      | `#CC3929`             |
| Width      | Matches input width   |
| Token ref  | `Token: Colors > Light > Error` → `Accent Colors > Red` |

---

## Component Properties

| Property            | Type    | Options / Notes |
|---------------------|---------|-----------------|
| `States`            | Variant | `Default` · `Hover` · `Error` · `Disabled` |
| `Show Right Option` | Variant | `Yes` · `NO` |
| `Right Options`     | Variant | `Default` · `Arrow` · `Copy` · `Up Down Arrow` · `Line Arrow` · `Icon search` |
| `Text#807:5`        | Boolean | `true` = show placeholder · `false` = hide |
| `Input Text#807:10` | Text    | Editable input value |
| `Error Text#831:0`  | Text    | Error message (visible in Error state only) |

---

## Layout Spec (from JSON)

### Input Frame
| Property           | Value |
|--------------------|-------|
| Height             | `32` *(from JSON — do not hardcode)* |
| Corner Radius      | `8` → `{Spacing System.Radius.M}` |
| Direction          | `HORIZONTAL` |
| Padding Top/Bottom | `0` |
| Padding Left       | `0` |
| Padding Right      | `1` |
| Item Spacing       | `8` |
| Primary Align      | `MAX` |
| Counter Align      | `CENTER` |

### Inner Text Area Frame
| Property           | Value |
|--------------------|-------|
| Padding Left       | `8` |
| Padding Right      | `0` |
| Item Spacing       | `0` |
| Primary Align      | `MIN` |
| Counter Align      | `CENTER` |

---

## When to Use Each Variant

| Use Case                                      | Variant        |
|-----------------------------------------------|----------------|
| Plain text entry (name, email, notes)         | Default        |
| Select / dropdown field                       | Arrow          |
| Read-only value user may want to clipboard    | Copy           |
| Numeric input with increment/decrement        | Up Down Arrow  |
| Dropdown with a visible dropdown arrow button | Line Arrow     |
| Searchable field / typeahead / lookup         | Icon Search    |

## When to Use Each State

| Situation                                          | State    |
|----------------------------------------------------|----------|
| Field waiting for input                            | Default  |
| User has clicked in / field is focused             | Hover    |
| Validation failed (empty required, wrong format)   | Error    |
| Field is locked, pre-filled, or not applicable     | Disabled |

---

## Library Component Keys

> **How to use:** Always instantiate from the design system library using `figma_instantiate_component` with the **variant key**. Never build inputs from scratch.

**Component Set:** `Input` · Node `1512:1567` · Set Key `c8cb74a35dd905ce4f2c756d6e85f8594e2934da`

| State | Show Right Option | Right Option | Variant Key | Node ID |
|-------|-------------------|--------------|-------------|---------|
| `Default` | `NO` | Arrow | `8fd07348a67bc5a1124009fed9fe74358033ea67` | `2442:3610` |
| `Hover` | `NO` | Arrow | `1c6026d054d80f5de1eddcfcd9f9e42ba799f03d` | `2442:3614` |
| `Error` | `NO` | Arrow | `aac23123d6ff5ef136e327ff3ad0f11edf88aad7` | `2442:3618` |
| `Disabled` | `NO` | Arrow | `ec99bec2e696b8d39adc3714d10af06cd7f4d7fd` | `2442:3624` |
| `Default` | `Yes` | Arrow | `3af34512c3315cfd732511cb79b909fb3eee2033` | `1512:1568` |
| `Hover` | `Yes` | Arrow | `02b4dfeab7e89ae96c4e38378dd87a57de57860c` | `1512:1573` |
| `Error` | `Yes` | Arrow | `44c786a5733332a373cdfff3be00036f8487be6b` | `1512:1578` |
| `Disabled` | `Yes` | Arrow | `28b81ede352f0a67175eeb22b4763bce42a379f0` | `1512:1585` |
| `Default` | `Yes` | Icon search | `6b7eedc1b8e8a45f1a050432309157e5b7948309` | `1512:1590` |
| `Hover` | `Yes` | Icon search | `2ddbe58c556f12d6b406ff978cbe2000554f1c5f` | `1512:1597` |
| `Error` | `Yes` | Icon search | `fe3e11bc13f3571308dfb47475c53bf9aea32224` | `1512:1604` |
| `Disabled` | `Yes` | Icon search | `2591e2cda1e6cfbddb565a44c04f5f9d3f2507ba` | `1512:1613` |
| `Default` | `Yes` | Copy | `0ddd94c3464941f5ada5de385cc2e793982db6b8` | `1512:1620` |
| `Hover` | `Yes` | Copy | `bf63e9628d6b18a86ae2700978d68966cccefa81` | `1512:1627` |
| `Error` | `Yes` | Copy | `7599bd65ebb485bd294ad27b42e53fe82d27131e` | `1512:1634` |
| `Disabled` | `Yes` | Copy | `1a08f0e235ed45d358d222b52494e8eb0f9b1225` | `1512:1643` |
| `Default` | `Yes` | Up Down Arrow | `95e649ebf86d61ce6cf11bc67c93083ce58010d6` | `1512:1650` |
| `Hover` | `Yes` | Up Down Arrow | `12d820a3e20549e77152f79d4089ef7636db2449` | `1512:1659` |
| `Error` | `Yes` | Up Down Arrow | `dde75d41d21a539fcd732e443d6d9f6f30bc56f3` | `1512:1668` |
| `Disabled` | `Yes` | Up Down Arrow | `77bd17d654749a34e5a01df981120e82eb02db7f` | `1512:1679` |
| `Default` | `Yes` | Line Arrow | `8ccaee16b652e7f6c7852c4db798b5c0ee0cc029` | `1512:1688` |
| `Hover` | `Yes` | Line Arrow | `32d3a99c2d331ac6fecd12cd31e67764958380e3` | `1512:1695` |
| `Error` | `Yes` | Line Arrow | `e07d7a08b871589a95f45b2b646b067e3911b265` | `1512:1702` |
| `Disabled` | `Yes` | Line Arrow | `8dfb3e26aa3c3981db2642a09b1ce4c6609c41bd` | `1512:1711` |

---

## Figma Console MCP — Usage

### 1. Instantiate from the design system library
```js
// Default input, no right option
const instance = await figma_instantiate_component({
  componentKey: "8fd07348a67bc5a1124009fed9fe74358033ea67"
});

// Default input with Icon search
const instanceSearch = await figma_instantiate_component({
  componentKey: "6b7eedc1b8e8a45f1a050432309157e5b7948309"
});
```

### 2. Switch variant after instantiation
```js
instance.setProperties({
  "States": "Error",
  "Show Right Option": "Yes",
  "Right Options": "Icon search",
  "Error Text#831:0": "This field is required",
  "Input Text#807:10": "invalid@",
  "Text#807:5": true
});
```

### 3. Quick variant key lookup
```
Default, no right option     → 8fd07348a67bc5a1124009fed9fe74358033ea67
Hover,   no right option     → 1c6026d054d80f5de1eddcfcd9f9e42ba799f03d
Error,   no right option     → aac23123d6ff5ef136e327ff3ad0f11edf88aad7
Disabled, no right option    → ec99bec2e696b8d39adc3714d10af06cd7f4d7fd

Default, Icon search         → 6b7eedc1b8e8a45f1a050432309157e5b7948309
Hover,   Icon search         → 2ddbe58c556f12d6b406ff978cbe2000554f1c5f
Error,   Icon search         → fe3e11bc13f3571308dfb47475c53bf9aea32224
Disabled, Icon search        → 2591e2cda1e6cfbddb565a44c04f5f9d3f2507ba

Default, Copy                → 0ddd94c3464941f5ada5de385cc2e793982db6b8
Default, Up Down Arrow       → 95e649ebf86d61ce6cf11bc67c93083ce58010d6
Default, Line Arrow          → 8ccaee16b652e7f6c7852c4db798b5c0ee0cc029
Default, Arrow               → 3af34512c3315cfd732511cb79b909fb3eee2033
```

---

## Token Reference

| Token Path                               | Hex       | Used For                        |
|------------------------------------------|-----------|---------------------------------|
| `Color.Base.White`                       | `#FFFFFF` | Fill — Default, Hover, Error    |
| `Neutral.Tint.Neutral 100`               | `#F5F7F9` | Fill — Disabled                 |
| `Neutral.Tint.Neutral 70`                | `#C6CED9` | Stroke — Default / Disabled     |
| `Neutral.Tint.Neutral 80`                | `#D2D9E2` | Stroke — Disabled (alternate)   |
| `Color.Accent Colors.Blue`               | `#2C66DD` | Stroke — Hover · Copy btn fill  |
| `Color.Accent Colors.Red`                | `#CC3929` | Stroke + text — Error           |
| `Neutral.Shades.Neutral 95`              | `#0C0E11` | Input text (active states)      |
| `Neutral.Tint.Neutral 30`                | `#93A2B6` | Placeholder + disabled text     |
| `Spacing System.Radius.M`                | `8`       | Corner radius (all variants)    |

---

## ⚠️ HARD RULE — Token Usage (No Exceptions)

> **Every color applied in Figma MUST be bound to a Figma library variable via `figma.variables.setBoundVariableForPaint()`.  
> Hardcoded hex values (e.g. `#FFFFFF`), raw `{r,g,b}` objects, or magic numbers are NEVER acceptable in component plugin code.**

Correct pattern:
```js
const varObj = await figma.variables.getVariableByIdAsync('VariableID:189:170');
const paint = figma.variables.setBoundVariableForPaint(
  { type: 'SOLID', color: { r: 0, g: 0, b: 0 } },
  'color', varObj
);
node.fills = [paint];
```

### Figma Variable Bindings

| Role | Hex | Variable Name | Variable ID |
|------|-----|---------------|-------------|
| Default / Hover / Error fill | `#FFFFFF` | `Color/Base/White` | `VariableID:189:170` |
| Disabled fill | `#F5F7F9` | `ZA/Background/BG-Primary-Subtle` | `VariableID:575:275` |
| Default stroke | `#C6CED9` | `Color/Neutral/Tint/Neutral 70` | `VariableID:572:3690` |
| Hover / focus stroke | `#2C66DD` | `ZA/Button/Button Fill/Button Primary` | `VariableID:577:38` |
| Error stroke & text | `#CC3929` | `Color/Accent Colors/Red` | `VariableID:189:167` |
| Input text | `#0C0E11` | `ZA/Text/Text Primary` | `VariableID:575:276` |
| Placeholder / disabled text | `#93A2B6` | `Color/Neutral/Tint/Neutral 30` | `VariableID:572:3686` |
| Divider / separator | `#DFE4EB` | `ZA/stroke/Stroke 1` | `VariableID:579:41` |
