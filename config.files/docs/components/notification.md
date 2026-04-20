# Notification Component — Zoho Analytics Design System

> **File:** `components/notification-config.json`
> **Figma Source:** [Design System – Zoho Analytics](https://www.figma.com/design/m2iOWX3I9aDI5kgyw4wCo0/Design-System--Zoho-Analytics)
> **Component Set ID:** `981:1372`
> **Total Variants:** `4` — Success · Error · Warning · Default

---

## Component Selection & Pick — Hard Rules

### 0. ⛔ Search the library BEFORE creating this component

```js
figma_get_library_components({ libraryFileKey: "m2iOWX3I9aDI5kgyw4wCo0", query: "Notification" })
// Local fallback:
const existing = await page.findOne(n => (n.type === 'COMPONENT_SET' || n.type === 'COMPONENT') && n.name.toLowerCase().includes('notification'));
if (existing) { const inst = existing.type === 'COMPONENT_SET' ? existing.children[0].createInstance() : existing.createInstance(); }
```

---

### 1. How to export this component (Token Exporter Plugin)
| Step | Action |
|------|--------|
| 1 | Open **Figma Design System** file → select the Notification component set or an instance |
| 2 | Run **Token & Component Exporter** plugin → go to **Selection** tab |
| 3 | Click **↓ Download** — saves as `notification-config.json` |
| 4 | Place file in `config.files/tokens/components/` |

### 2. How to read the exported JSON
| JSON Field | What it means | How to use it |
|------------|---------------|---------------|
| `id` | Component set node ID in the *Design System* file | Reference only — do NOT use with `getNodeByIdAsync` |
| `type` | `"COMPONENT_SET"` — top-level container | Not a list of nodes; contains `variants` array |
| `variants[].id` | Individual variant node ID | Reference only |
| `variants[].name` | Variant descriptor e.g. `"Type=Success"` | Use to identify the correct variant key |
| `componentPropertyDefinitions` | Property axes: `Type`, `Text` | Use to know all valid `Type` values |
| `fills[].color` / `strokes[].color` | Hex per variant | Reference only — the real instance carries them |

### 3. Component pick rules — MUST follow
| Rule | ✅ Do | ❌ Never |
|------|-------|---------|
| **Source** | Always instantiate from the **Design System library** | Never build with `figma.createFrame()` + colored rectangle |
| **Key type** | Use a **variant key** (40-char hex string) | Never use the component set key to instantiate |
| **Type** | Pick variant by `Type` value: Success / Error / Warning / Default | Never change the component fill color manually |
| **Text** | Set `"Text#2476:0"` for the notification message | Never add a separate text node inside the instance |
| **Colors** | Each type has its own accent color token — do not mix | Never mix success green on an error notification |
| **From scratch** | Only if component unavailable in the library | Must exactly match every token in the JSON |

### 4. Correct instantiation pattern
```js
// Success notification
const notif = await figma_instantiate_component({
  componentKey: "5e1d9ce18fb1a1a1af35bc16a0e3cce1e8af6c73"
});
notif.setProperties({
  "Type":         "Success",
  "Text#2476:0":  "Your changes have been saved."
});

// Error notification
const errNotif = await figma_instantiate_component({
  componentKey: "3df5d7de0f899d31f35b23f5e6a2e96df9a2c6d8"
});
errNotif.setProperties({
  "Type":         "Error",
  "Text#2476:0":  "An error occurred. Please try again."
});
```

### 5. Property types cheat sheet
| Property key pattern | Type | Valid values |
|----------------------|------|-------------|
| `Type` | `VARIANT` | `"Success"` · `"Error"` · `"Warning"` · `"Default"` |
| `Text#2476:0` | `TEXT` | Any notification message string |

---

## Style Hard Rules

| Rule | Detail |
|------|--------|
| **Size** | Never hardcode — always read from JSON (`430 × 304` for the component set frame) |
| **Corner radius** | Always `5` — from JSON |
| **Padding** | `20` all sides — from JSON |
| **Item spacing** | `24` — from JSON |
| **Colors** | Reference only — each `Type` maps to its own accent token; never mix |
| **Font** | `Zoho Puvi Regular` — set message via `Text#2476:0` property |
| **Stroke** | Always `#0C0E11`, weight `1` — managed by the component |

---

## Component Anatomy

```
Notification Card (430 × 304):
┌──────────────────────────────────────────┐  cornerRadius: 5
│  padding: 20                             │  fill: #FFFFFF
│                                          │  stroke: #0C0E11
│  [Icon]  [Title text]       [✕ Close]   │
│                                          │  ↕ itemSpacing: 24
│  [Description text body]                 │
│                                          │
│  [Action link / Button area]             │
└──────────────────────────────────────────┘
  Direction: VERTICAL
```

---

## Component Properties

| Property | Type | Values |
|----------|------|--------|
| `Property 1` | Variant | `Success` · `Error` · `Warning` · `Default` |
| `Text#2476:0` | Text | Notification message content (customizable) |

---

## Variant × Color Reference

Each variant maps to a system accent color token for its icon, accent bar, or highlight:

| Variant | Accent Color | Hex | Token |
|---------|-------------|-----|-------|
| `Success` | Green | `#0C8844` | `Accent Colors.Green.Accent Color` |
| `Error` | Red | `#CC3929` | `Accent Colors.Red.Accent Color` |
| `Warning` | Yellow | `#EBB625` | `Accent Colors.Yellow.Accent Color` |
| `Default` | Blue | `#2C66DD` | `Accent Colors.Blue.Accent Color` |

**Shared across all variants:**

| Property | Value | Token |
|----------|-------|-------|
| Container fill | `#FFFFFF` | `Color.Base.White` |
| Stroke | `#0C0E11` | `Neutral.Shades.Neutral 90` |
| Title text | `#0C0E11` | `Token: Colors > Light > Text > Text Primary` |
| Body text | `#556274` | `Token: Colors > Light > Text > Text Description` |

---

## Full Variant Node ID Matrix

| Variant | Node ID | Description |
|---------|---------|-------------|
| `Success` | `981:1373` | Green — action completed successfully |
| `Error` | `981:1383` | Red — action failed or critical issue |
| `Warning` | `981:1395` | Yellow — requires user attention |
| `Default` | `981:1405` | Blue — informational message |

---

## Layout Spec (from JSON)

### Container Frame
| Property | Value |
|----------|-------|
| Component Set ID | `981:1372` |
| Width | `430` *(read from JSON)* |
| Height | `304` *(read from JSON — never hardcode)* |
| Corner Radius | `5` |
| Fill | `#FFFFFF` |
| Stroke | `#0C0E11`, weight `1` |
| Direction | `VERTICAL` |
| Padding Top | `20` |
| Padding Right | `20` |
| Padding Bottom | `20` |
| Padding Left | `20` |
| Item Spacing | `24` |
| Primary Axis Align | `MIN` (top-aligned) |
| Counter Axis Align | `MIN` (left-aligned) |

---

## When to Use Each Variant

| Situation | Variant | Node ID |
|-----------|---------|---------|
| Form submitted, data saved, task completed | `Success` | `981:1373` |
| API error, validation failure, delete failed | `Error` | `981:1383` |
| Session about to expire, quota near limit | `Warning` | `981:1395` |
| Informational tip, system update, FYI message | `Default` | `981:1405` |

---

## Library Component Keys

> **How to use:** Always instantiate from the design system library using `figma_instantiate_component` with the **variant key**. Never build notifications from scratch.

**Component Set:** `Notification` · Node `981:1372` · Set Key `acdf7cef1d82caf1755e3a5b837add2ec03fe3e9`

| Variant | Variant Key | Node ID |
|---------|-------------|---------|
| `Success` | `5a317d5cb06122f6f8b61864c6e6127be9b41928` | `981:1373` |
| `Error` | `565663f1d9d980e69a9912b47146b6620f0fec3a` | `981:1383` |
| `Warning` | `4904d5afd5f42f463c3550a0ab134e0595368923` | `981:1395` |
| `Default` | `cd72c1c1e34f89af5440f946b0955380ff1a8256` | `981:1405` |

---

## Figma Console MCP — Usage

### 1. Instantiate from the design system library
```js
// Success notification
const instance = await figma_instantiate_component({
  componentKey: "5a317d5cb06122f6f8b61864c6e6127be9b41928"
});

// Error notification
const instanceError = await figma_instantiate_component({
  componentKey: "565663f1d9d980e69a9912b47146b6620f0fec3a"
});

// Warning notification
const instanceWarning = await figma_instantiate_component({
  componentKey: "4904d5afd5f42f463c3550a0ab134e0595368923"
});

// Default / informational
const instanceDefault = await figma_instantiate_component({
  componentKey: "cd72c1c1e34f89af5440f946b0955380ff1a8256"
});
```

### 2. Set message text after instantiation
```js
instance.setProperties({
  "Property 1": "Success",
  "Text#2476:0": "Your report has been saved successfully."
});
```

### 3. Quick variant key lookup
```
Success → 5a317d5cb06122f6f8b61864c6e6127be9b41928
Error   → 565663f1d9d980e69a9912b47146b6620f0fec3a
Warning → 4904d5afd5f42f463c3550a0ab134e0595368923
Default → cd72c1c1e34f89af5440f946b0955380ff1a8256
```

---

## Token Reference

| Token | Hex | Used For |
|-------|-----|----------|
| `Accent Colors.Green.Accent Color` | `#0C8844` | Success variant accent |
| `Accent Colors.Red.Accent Color` | `#CC3929` | Error variant accent |
| `Accent Colors.Yellow.Accent Color` | `#EBB625` | Warning variant accent |
| `Accent Colors.Blue.Accent Color` | `#2C66DD` | Default variant accent |
| `Color.Base.White` | `#FFFFFF` | Container background fill |
| `Neutral.Shades.Neutral 90` | `#0C0E11` | Container stroke |
| `Token: Colors > Light > Text > Text Primary` | `#0C0E11` | Title text |
| `Token: Colors > Light > Text > Text Description` | `#556274` | Body / description text |
| `Spacing System.Radius.XS` | `5` | Corner radius |

---

## ⚠️ HARD RULE — Token Usage (No Exceptions)

> **Every color applied in Figma MUST be bound to a Figma library variable via `figma.variables.setBoundVariableForPaint()`.  
> Hardcoded hex values (e.g. `#0C8844`), raw `{r,g,b}` objects, or magic numbers are NEVER acceptable in component plugin code.**

Correct pattern:
```js
const varObj = await figma.variables.getVariableByIdAsync('VariableID:189:168');
const paint = figma.variables.setBoundVariableForPaint(
  { type: 'SOLID', color: { r: 0, g: 0, b: 0 } },
  'color', varObj
);
node.fills = [paint];
```

### Figma Variable Bindings

| Role | Hex | Variable Name | Variable ID |
|------|-----|---------------|-------------|
| Success accent | `#0C8844` | `Color/Accent Colors/Green` | `VariableID:189:168` |
| Error accent | `#CC3929` | `Color/Accent Colors/Red` | `VariableID:189:167` |
| Warning accent | `#EBB625` | `Color/Accent Colors/Yellow` | `VariableID:189:169` |
| Info / default accent | `#2C66DD` | `ZA/Button/Button Fill/Button Primary` | `VariableID:577:38` |
| Container background | `#FFFFFF` | `Color/Base/White` | `VariableID:189:170` |
| Title text | `#0C0E11` | `ZA/Text/Text Primary` | `VariableID:575:276` |
| Body text | `#3D4653` | `ZA/Text/Text Description` | `VariableID:575:277` |
| Divider / stroke | `#DFE4EB` | `ZA/stroke/Stroke 1` | `VariableID:579:41` |
